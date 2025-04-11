import { GoogleGenAI } from "@google/genai";
import { FunctionDeclaration, Type } from "@google/genai";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import type { NextApiRequest, NextApiResponse } from 'next';
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";


const MCP_BASE_URL = process.env.NEXT_PUBLIC_MCP_SERVER_URL;
const GeminiApiKey = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({
    apiKey: GeminiApiKey!,
})
const mcpClient = new Client({
    name: "mcpclient",
    version: "0.0.1",
});
const chatHistory: any[] = [];
const tools: FunctionDeclaration[] = [];

const isInitialized = false;

async function initializeMCPClient() {
    if (isInitialized) return;
    try {
        await mcpClient.connect(new SSEClientTransport(new URL(`${MCP_BASE_URL}/sse`)));
        console.log("Connected to MCP server");
        const listed = await mcpClient.listTools();
        tools.push(...listed.tools.map((tool):FunctionDeclaration =>{
            return {
                name: tool.name || "Unnamed",
                description: tool.description || "No description",
                parameters: {
                    type: (tool.inputSchema?.type as Type) || Type.OBJECT,
                    properties: (tool.inputSchema?.properties as Record<string, any>) || {},
                    required: Array.isArray(tool.inputSchema?.required) ? tool.inputSchema.required : [],
                }
            }
        }))

        console.log("Loaded tools:", tools);
            
    } catch (error) {
        console.error("Error initializing MCP client:", error);
    }

}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Only POST allowed" })
    }
    const { prompt } = req.body;

    try {
        await initializeMCPClient();
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            config: {
                tools: [
                    {
                        functionDeclarations: tools,
                    }
                ]
            }
        })

        const responseText = response.text;
        res.status(200).json({ response: responseText });
    }
    catch (error) {
        console.error("Error generating content:", error);
        return res.status(500).json({ error: "Error generating content" });
    }
}
