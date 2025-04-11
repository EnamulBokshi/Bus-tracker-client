import dotenv from "dotenv";
dotenv.config()

const baseUrl = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || 'https://openrouter.ai/api/v1/chat/completions';
const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
const MCP_BASE_URL = process.env.NEXT_PUBLIC_MCP_SERVER_URL;
const GeminiApiKey = process.env.GEMINI_API_KEY;

export {
    baseUrl,
    apiKey,
    MCP_BASE_URL,
    GeminiApiKey
}