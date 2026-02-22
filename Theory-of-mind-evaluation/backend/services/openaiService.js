const axios = require("axios");
const { getCache, setCache } = require("./redisService");

async function openaiService(prompt, modelName) {

    const cacheKey = `${modelName}:${prompt}`;

    const cached = await getCache(cacheKey);
    if (cached) {
        return JSON.parse(cached); // Note: stored as stringified JSON in setCache? No, user code sets JSON.stringify(result). Result is content string. So this is correct.
    }

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: modelName,
                messages: [{ role: "user", content: prompt }],
                temperature: 0
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
                }
            }
        );

        const result = response.data.choices[0].message.content;

        await setCache(cacheKey, JSON.stringify(result));

        return result;
    } catch (error) {
        console.error("OpenAI Service Error:", error.response ? error.response.data : error.message);
        throw error;
    }
}

module.exports = openaiService;
