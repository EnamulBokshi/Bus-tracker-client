import { baseUrl,apiKey } from "@/exporter";


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
    console.log("Response from AI:", data);
    if (response.ok) {
      return data.choices[0].message.content;
    }
    throw new Error(data.error || 'Something went wrong');
}
// fetch("https://openrouter.ai/api/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Authorization": "Bearer <OPENROUTER_API_KEY>",
//       "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
//       "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       "model": "google/gemini-2.5-pro-exp-03-25:free",
//       "messages": [
//         {
//           "role": "user",
//           "content": [
//             {
//               "type": "text",
//               "text": "What is in this image?"
//             },
//             {
//               "type": "image_url",
//               "image_url": {
//                 "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"
//               }
//             }
//           ]
//         }
//       ]
//     })
//   });