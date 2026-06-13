import { config as loadDotEnv } from "dotenv";
import { AppConfig } from "./types.js";

loadDotEnv();

function getRequiredEnvVar(name: string, defaultValue?: string): string {
    const value = process.env[name] ?? defaultValue;
    if (value === undefined) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

function validateProvider(provider: string): "anthropic" | "openai" {
    if (provider !== "anthropic" && provider !== "openai") {
        throw new Error(`Invalid provider: ${provider}, it must be either "anthropic" or "openai"`);
    }
    return provider;
}

const rawProvider = process.env['MODEL_PROVIDER'] ?? "anthropic";

export const config: AppConfig = {
    provider: validateProvider(rawProvider),
    openaiApiKey: getRequiredEnvVar("OPENAI_API_KEY"),
    anthropicApiKey: getRequiredEnvVar("ANTHROPIC_API_KEY"),
    anthropicModel: getRequiredEnvVar("ANTHROPIC_MODEL", "claude-sonnet-4-6"),
    openaiModel: getRequiredEnvVar("OPENAI_MODEL", "gpt-4o-mini"),
    openaiEmbeddingModel: getRequiredEnvVar("OPENAI_EMBEDDING_MODEL", "text-embedding-3-small"),
    docsPath: getRequiredEnvVar("DOCS_PATH", "./docs/sample-project"),
    dbPath: getRequiredEnvVar("DB_PATH", "./data/vectors.db"),
    ragTopK: parseInt(getRequiredEnvVar("RAG_TOP_K", "5"), 10),
}

export function validateConfig(): void {
    switch (config.provider) {
        case "anthropic":
            if (!config.anthropicApiKey) {
                throw new Error("ANTHROPIC_API_KEY is required for Anthropic provider");
            }
            break;
        case "openai":
            if (!config.openaiApiKey) {
                throw new Error("OPENAI_API_KEY is required for OpenAI provider");
            }
            break;
        default:
            throw new Error(`Invalid provider: ${config.provider}`);
    }
}

export default config;