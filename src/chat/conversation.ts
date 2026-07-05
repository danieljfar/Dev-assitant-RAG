import config from "../config.js";
import { client } from "../llm/anthropic-client.js";
import { Message } from "../types.js";

const CHARS_PER_TOKEN = 4;

export class Conversation {
    private messages: Message[] = [];
    private systemPromp: string;
    private totalInputsToken: number = 0;
    private totalOutputsTokens: number = 0;

    constructor(systemPrompt: string = '') {
        this.systemPromp = systemPrompt;
    }

    addUserMessage(text: string): void {
        this.messages.push({ role: 'user', content: text });
    }

    addAssistantMessage(text: string): void {
        this.messages.push({ role: 'assistant', content: text });
    }

    async send(): Promise<string> {
        const response = await client.messages.create({
            model: config.anthropicModel,
            max_tokens: 1024,
            ...(this.systemPromp && { system: this.systemPromp }),
            messages: this.messages,
        })

        this.addusage(response.usage.input_tokens, response.usage.output_tokens);

        const textBlock = response.content.find((block) => block.type === 'text');
        if (!textBlock || textBlock.type !== 'text') {
            return "Claude no retorno un bloque de texto en la respuesta"
        }
        const responseText = textBlock.text;
        this.addAssistantMessage(responseText);
        return responseText;
    }
    addusage(input_tokens: number, output_tokens: number) {
        this.totalInputsToken += input_tokens
        this.totalOutputsTokens += output_tokens
    }
    clear(): void {
        this.messages = [];
        this.totalInputsToken = 0;
        this.totalOutputsTokens = 0;
        console.log('Conversacion reiniciada')
    }
    getTurnCount(): number {
        return Math.floor(this.messages.length / 2);
    }
    estimateCurrentTokens(): number {
        const totalChars = this.messages.reduce((sum, msg) => sum + msg.content.length, 0);
        return Math.floor(totalChars / CHARS_PER_TOKEN);
    }
    getStats(): { inputTokens: number, outputTokens: number, turns: number, estimateCurrentTokens: number } {
        return {
            inputTokens: this.totalInputsToken,
            outputTokens: this.totalOutputsTokens,
            turns: this.getTurnCount(),
            estimateCurrentTokens: this.estimateCurrentTokens()
        }
    }
    getHistory(): Message[] {
        return [...this.messages];
    }
}