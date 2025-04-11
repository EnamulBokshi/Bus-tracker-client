
// import { baseUrl, apiKey, MCP_BASE_URL,GeminiApiKey } from "@/exporter";
// import { config } from "dotenv";
// import { FunctionDeclaration, GoogleGenAI, Type } from "@google/genai";
// import { Client } from "@modelcontextprotocol/sdk/client/index.js";
// import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";


// config();

// const ai = new GoogleGenAI({
//     apiKey: GeminiApiKey!,
// });

// const mcpClient = new Client({
//     name: "mcpclient",
//     version: "0.0.1",
// });

// let tools: FunctionDeclaration[] = [];
// const chatHistory: any[] = [];

// mcpClient
//     .connect(new SSEClientTransport(new URL(`${MCP_BASE_URL}/sse`)))
//     .then(async () => {
//         console.log("Connected to MCP server");

//         const listed = await mcpClient.listTools();
//         // tools = listed.tools.map((tool) => ({
//         //     name: tool.name || "No name available",
//         //     description: tool.description || "No description available",
//         //     parameters: {
//         //         type: tool.inputSchema?.type || "object",
//         //         properties: tool.inputSchema?.properties || {},
//         //         required: Array.isArray(tool.inputSchema?.required) ? tool.inputSchema.required : [],
//         //     },
//         // }));
//         tools = listed.tools.map((tool): FunctionDeclaration => ({
//             name: tool.name || "Unnamed",
//             description: tool.description || "No description",
//             parameters: {
//                 type:  (tool.inputSchema?.type as Type) || Type.OBJECT,
//                 properties: (tool.inputSchema?.properties as Record<string, any>) || {},
//                 required: Array.isArray(tool.inputSchema?.required) ? tool.inputSchema.required : [],
//             },
//         }))

//         console.log("Tools:", tools);
//     })
//     .catch((err) => {
//         console.error("Error connecting to MCP:", err);
//     });

// export const askGemini = async (prompt: string): Promise<any> => {
//     try {
//         const response = await ai.models.generateContent({
//             model: "gemini-2.0-flash",
//             contents: [{ role: "user", parts: [{ text: prompt }] }],
//             config: {            
//             tools: [
//                 {
//                     functionDeclarations: tools,
//                 },
//             ],
//         },
//         });
//         return response;
//     } catch (error) {
//         console.error("Error generating content:", error);
//         throw error;
//     }
// };


// export const askAI  = async (prompt:string):Promise<any> =>{

//     const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${apiKey}`,
//         "Content-Type": "application/json"
//       },
//       body:JSON.stringify({
//         "model": "deepseek/deepseek-chat-v3-0324:free",
//         "messages":[
//           {
//             "role": "user",
//             "content": [
//               {
//                 "type": "text",
//                 "text": prompt
//               }
//             ]
//           }
//         ]
//       })
//     })
//     const data = await response.json();
//     if (response.ok) {
//       return data.choices[0].message.content;
//     }
//     throw new Error(data.error || 'Something went wrong');
// }
// export const mcpClientInstance = mcpClient;
