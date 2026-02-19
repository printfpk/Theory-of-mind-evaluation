const mongoose = require('mongoose');

const scenarioSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    story: {
        type: String,
        required: true
    },
    complexity: {
        type: String,
        enum: ['Basic', 'Intermediate', 'Advanced'],
        default: 'Basic'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Scenario', scenarioSchema);
