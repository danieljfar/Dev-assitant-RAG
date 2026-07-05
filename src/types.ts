export type Role = "user" | "assitant";
export interface Message {
    role: String;
    content: String;
}
export interface ToolDefinition {
    name: string;
    description: string;
    input_schema: {
        type: "object";
        properties: Record<string, unknown>;
        required?: string[];
    }
}
export interface ToolResult {
    toolName: string;
    toolUseId: string;
    result: string;
    isError: boolean;
}
export interface Chunk {
    id: string;
    content: string;
    metadata: {
        source: string;
        heading: string;
        position: number;
        charCount: number;
    };
}
export interface RetrievedChunk extends Chunk {
    score: number;
}
export interface SearchResult {
    chunks: Chunk;
    score: number;
}
export type ModelProvider = "anthropic" | "openai";

export interface AppConfig {
    provider: ModelProvider;
    openaiApiKey: string;
    anthropicApiKey: string;
    anthropicModel: string;
    openaiModel: string;
    openaiEmbeddingModel: string;
    docsPath: string;
    dbPath: string;
    ragTopK: number;
}

export interface AgentResponse {
    text: string;
    toolsUsed: string[];
    inputTokens: number;
    outputTokens: number;
}