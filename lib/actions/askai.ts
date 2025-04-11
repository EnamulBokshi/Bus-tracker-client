import {apiKey, MCP_BASE_URL } from "@/exporter";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

const mcpClient = new Client({
    name: "mcpclient",
    version: "0.0.1",
});
const chatHistory = [];
const tools = [];


let isInitialized = false;
const initializeMCPClient = async () => {
    if (isInitialized) return;
    console.log("Initializing MCP Client");
    try {
        await mcpClient.connect(new SSEClientTransport(new URL(`${MCP_BASE_URL}/sse`)))
        console.log("Connected to MCP server");
        const listed = await mcpClient.listTools();
        tools.push(...listed.tools.map((tool) => {
            return {
                name: tool.name || "Unnamed",
                description: tool.description || "No description",
                parameters: {
                    type: tool.inputSchema?.type,
                    properties: tool.inputSchema?.properties,
                    required: Array.isArray(tool.inputSchema?.required) ? tool.inputSchema.required : [],
                }
            }
        }))
        console.log("Tools initialized");
        isInitialized = true;

    } catch (error) {
        console.error("Error initializing MCP Client:", error);
        throw error;
    }

}



export const askAI  = async (prompt:string):Promise<any> =>{
    // if (!isInitialized) {
    //     await initializeMCPClient();
    // }
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        "model": "deepseek/deepseek-chat-v3-0324:free",
        "messages":[
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": prompt
              }
            ]
          }
        ]
      })
    })
    const data = await response.json();
    if (response.ok) {
      return data.choices[0].message.content;
    }
    throw new Error(data.error || 'Something went wrong');
}
export const askGemini = async (prompt: string) : Promise<any> => {
  console.log("Gemini Prompt:", prompt);
  const response = await fetch (`${process.env.NEXT_PUBLIC_MCP_SERVER_URL}/ai/generate`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify({
      prompt,
    })
  })
  const data = await response.json();
  if (response.ok) {
    return data.response;
  }
  throw new Error(data.error || 'Something went wrong');
}


