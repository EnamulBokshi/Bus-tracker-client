
import {config} from 'dotenv'
import {GoogleGenAI} from "@google/genai";
import {Client} from "@modelcontextprotocol/sdk/client/index.js";
import {SSEClientTransport} from "@modelcontextprotocol/sdk/client/sse.js";
import { MCP_BASE_URL } from '@/exporter';
config();


const mcpClient=  new Client({
    name: "mcpclient",
    version: "0.0.1",
});

mcpClient.connect(new SSEClientTransport(new URL(`${MCP_BASE_URL!}/sse`)))
.then(async ()=>{
    console.log("Connected to MCP server");
    const tools = (await mcpClient.listTools()).tools;
    console.log("Tools:", tools);

})


export const mcpClientInstance = mcpClient;