import dotenv from "dotenv";
dotenv.config()

const baseUrl = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || 'https://openrouter.ai/api/v1/chat/completions';
const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
console.log("Base URL:", baseUrl);
console.log("API Key:", apiKey);

export {
    baseUrl,
    apiKey
}