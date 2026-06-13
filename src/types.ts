export type Role = "user" | "assitant";
export interface Message {
    role: String;
    content: String;
}
export interface toolDefinition {
    name: string;
    description: string;
    input_schema: {
        type: "object";
        properties: Record<string, unknown>;
        required?: string[];
    }
}
export interface toolResult {
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
