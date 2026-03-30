const axios = require("axios");

async function anthropicService(prompt, modelName) {
    try {
        const response = await axios.post(
            "https://api.anthropic.com/v1/messages",
            {
                model: modelName,
                messages: [{ role: "user", content: prompt }],
                max_tokens: 1024,
                temperature: 0
            },
            {
                headers: {
                    "x-api-key": process.env.ANTHROPIC_API_KEY,
                    "anthropic-version": "2023-06-01",
                    "Content-Type": "application/json"
                }
            }
        );

        const result = response.data.content[0].text;
        return result;
    } catch (error) {
        console.error("Anthropic Service Error:", error.response ? error.response.data : error.message);
        throw error;
    }
}

module.exports = anthropicService;