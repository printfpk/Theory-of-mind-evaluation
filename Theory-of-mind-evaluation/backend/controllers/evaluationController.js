const Scenario = require("../models/Scenario");
const Evaluation = require("../models/Evaluation");
const callModel = require("../services/modelRouter");
const calculateConsistency = require("../utils/consistencyEngine");

exports.runEvaluation = async (req, res) => {

    try {
        const { scenarioId, modelName } = req.body;

        const scenario = await Scenario.findById(scenarioId);
        if (!scenario) {
            return res.status(404).json({ message: "Scenario not found" });
        }

        const beliefPrompt = `${scenario.story}\nWhat does the character believe?`;

        const actionPrompt = `${scenario.story}\nWhat action will the character take?`;

        const belief = await callModel(modelName, beliefPrompt);
        const action = await callModel(modelName, actionPrompt);

        const score = calculateConsistency(belief, action);

        const evaluation = await Evaluation.create({
            scenarioId,
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
