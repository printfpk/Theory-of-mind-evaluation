const openaiService = require("./openaiService");

async function callModel(modelName, prompt) {
    // Strategy pattern could verify modelName here and choose service
    // For now, defaulting to openaiService as per user code
    return await openaiService(prompt, modelName);
}

module.exports = callModel;
