import { config as loadDotEnv } from "dotenv";

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