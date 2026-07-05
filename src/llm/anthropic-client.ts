import Anthropic from "@anthropic-ai/sdk";
import config from "../config.js";

export const client = new Anthropic({
    apiKey: config.anthropicApiKey,
})

export async function askClaude(prompt: string, systemPrompt?: string): Promise<string> {
    let fullResponse = "";
    const responseStream = client.messages.stream({
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
    responseStream.on("text", (chunk) => {
        process.stdout.write(chunk);
        fullResponse += chunk;
    })
    await responseStream.finalMessage();
    process.stdout.write("\n");
    return fullResponse;
}
