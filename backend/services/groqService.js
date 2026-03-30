const axios = require("axios");

async function groqService(prompt, modelName) {
    try {
        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: modelName,
                messages: [{ role: "user", content: prompt }],
                temperature: 0
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const result = response.data.choices[0].message.content;
        return result;
    } catch (error) {
        console.error("Groq Service Error:", error.response ? error.response.data : error.message);
        throw error;
    }
}

module.exports = groqService;