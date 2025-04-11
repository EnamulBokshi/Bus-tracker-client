import { baseUrl,apiKey } from "@/exporter";
import { GoogleGenAI } from "@google/genai";
import {SSEClientTransport} from "@modelcontextprotocol/sdk/client/sse.js";
import { MCP_BASE_URL } from '@/exporter';
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { config } from "dotenv";



console.log("MCP_BASE_URL", MCP_BASE_URL);

const mcpClient=  new Client({
    name: "mcpclient",
    version: "0.0.1",
});

mcpClient.connect(new SSEClientTransport(new URL(`${MCP_BASE_URL}/sse`)))
.then(async ()=>{
    console.log("Connected to MCP server");
    const tools = (await mcpClient.listTools()).tools;
    console.log("Tools:", tools);

})

export const askAI  = async (prompt:string):Promise<any> =>{

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
