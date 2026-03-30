const openaiService = require("./openaiService");
const grokService = require("./grokService");
const anthropicService = require("./anthropicService");
const geminiService = require("./geminiService");
const groqService = require("./groqService");

async function callModel(modelName, prompt) {
    const lowerModelName = modelName.toLowerCase();

    // Route based on model name prefix or specific name
    if (lowerModelName.includes("gpt")) {
        return await openaiService(prompt, modelName);
    } else if (lowerModelName.includes("grok")) {
        return await grokService(prompt, modelName);
    } else if (lowerModelName.includes("claude")) {
        return await anthropicService(prompt, modelName);
    } else if (lowerModelName.includes("gemini")) {
        return await geminiService(prompt, modelName);
    } else if (lowerModelName.includes("llama") || lowerModelName.includes("mixtral") || lowerModelName.includes("gemma")) {
        // Assume running open weight models on Groq for speed
        return await groqService(prompt, modelName);
    }

    // Default to OpenAI service if unknown
    console.warn(`Model ${modelName} not explicitly routed, defaulting to OpenAI service.`);
    return await openaiService(prompt, modelName);
}

module.exports = callModel;
