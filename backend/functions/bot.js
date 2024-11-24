const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("##");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

async function botResponse(prompt) {
    const llm='gemini';

    if (llm ==='gemini'){
        const result = await model.generateContent(prompt);
        const response = result.response.text()
        return response;
    }
    else if(llm === 'llama'){
        return 'llama under progress'
    }
    
}


module.exports = { botResponse };