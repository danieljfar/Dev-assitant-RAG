import config from "../config.js";
import { client } from "./anthropic.client.js";

export async function streamClaude(prompt: string, systemPrompt?: string): Promise<string> {
    const response = await client.messages.create({
        model: config.anthropicModel,
        max_tokens: 1024,
        ...(systemPrompt && { system: systemPrompt }),
        messages: [
            {
                role: "user",
                content: prompt,
            }
        ]
    })
    const textBlock = response.content.find((block) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
        throw new Error("Invalid response content from Anthropic");
    }
    return textBlock.text;
}