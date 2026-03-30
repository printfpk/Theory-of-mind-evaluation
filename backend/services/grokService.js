const axios = require("axios");

async function grokService(prompt, modelName) {
    try {
        const response = await axios.post(
            "https://api.x.ai/v1/chat/completions",
            {
                model: modelName,
                messages: [{ role: "user", content: prompt }],
                temperature: 0
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.GROK_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const result = response.data.choices[0].message.content;
        return result;
    } catch (error) {
        console.error("Grok Service Error:", error.response ? error.response.data : error.message);
        throw error;
    }
}

module.exports = grokService;