const axios = require("axios");

async function geminiService(prompt, modelName) {
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0 }
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const result = response.data.candidates[0].content.parts[0].text;
        return result;
    } catch (error) {
        console.error("Gemini Service Error:", error.response ? error.response.data : error.message);
        throw error;
    }
}

module.exports = geminiService;