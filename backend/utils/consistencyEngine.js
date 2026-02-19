function calculateConsistency(belief, action) {

    if (!belief || !action) return 0;

    belief = belief.toLowerCase();
    action = action.toLowerCase();

    // Simple keyword matching logic from user requirement
    if (belief.includes("oat") && action.includes("oat")) return 1;
    if (belief.includes("almond") && action.includes("almond")) return 1;

    return 0;
}

module.exports = calculateConsistency;
