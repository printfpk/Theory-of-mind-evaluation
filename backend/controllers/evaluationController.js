const Scenario = require("../models/Scenario");
const Evaluation = require("../models/Evaluation");
const callModel = require("../services/modelRouter");
const calculateConsistency = require("../utils/consistencyEngine");

exports.evaluateScenario = async (req, res) => {

    try {
        const { scenarioId, modelName, story, title, evaluationType } = req.body;

        if (!modelName) {
            return res.status(400).json({ message: "modelName is required." });
        }

        let scenario;
        
        if (scenarioId) {
            scenario = await Scenario.findById(scenarioId);
            if (!scenario) {
                return res.status(404).json({ message: "Scenario not found" });
            }
        } else if (story) {
            // Create ad-hoc scenario
            scenario = await Scenario.create({
                title: title || "Custom Scenario",
                description: evaluationType || "A user-generated custom scenario.",
                story: story,
                complexity: "Basic"
            });
        } else {
            return res.status(400).json({ message: "Either scenarioId or story must be provided." });
        }

        const beliefPrompt = `${scenario.story}\nWhat does the character believe?`;

        const actionPrompt = `${scenario.story}\nWhat action will the character take?`;

        const belief = await callModel(modelName, beliefPrompt);
        const action = await callModel(modelName, actionPrompt);

        const score = calculateConsistency(belief, action);

        const evaluation = await Evaluation.create({
            scenarioId: scenario._id,
            modelName,
            beliefResponse: belief,
            actionResponse: action,
            consistencyScore: score
        });

        res.json(evaluation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.getEvaluations = async (req, res) => {
    try {
        const evaluations = await Evaluation.find().populate('scenarioId').sort({ createdAt: -1 });
        res.json(evaluations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
