const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
    scenarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scenario',
        required: true
    },
    modelName: {
        type: String,
        required: true
    },
    beliefResponse: {
        type: String,
        required: false
    },
    actionResponse: {
        type: String,
        required: false
    },
    consistencyScore: {
        type: Number,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Evaluation', evaluationSchema);
