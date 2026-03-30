function calculateConsistency(belief, action) {
    if (!belief || !action) return 0;

    const b = belief.toLowerCase();
    const a = action.toLowerCase();

    let score = 0;

    // 1. False Belief Task (Sally-Anne)
    if ((b.includes('basket') || b.includes('left') || b.includes('original') || b.includes('still in') || b.includes('thinks') || b.includes('doesn\'t know')) &&
        (a.includes('basket') || a.includes('original') || a.includes('first place') || a.includes('look in') || a.includes('search'))) {
        score = Math.max(score, 1.0);
    }

    // 2. Faux Pas Task
    if ((b.includes('doesn\'t know') || b.includes('unaware') || b.includes('didn\'t know') || b.includes('not know') || b.includes('clueless')) &&
        (a.includes('silent') || a.includes('upset') || a.includes('awkward') || a.includes('nothing') || a.includes('apologize'))) {
        score = Math.max(score, 1.0);
    }

    // 3. Hidden Emotion Task
    if ((b.includes('sad') || b.includes('upset') || b.includes('disappointed') || b.includes('hurt')) &&
        (a.includes('smile') || a.includes('hide') || a.includes('pretend') || a.includes('laugh') || a.includes('act happy'))) {
        score = Math.max(score, 1.0);
    }

    // 4. Generic overlap fallback
    if (score === 0) {
        const words = b.replace(/[^\w\s]/gi, '').split(/\s+/).filter(w => w.length > 4);
        let matchCount = 0;
        for (const word of words) {
            if (a.includes(word)) matchCount++;
        }

        if (matchCount >= 3) score = 0.9;
        else if (matchCount === 2) score = 0.7;
        else if (matchCount === 1) score = 0.5;
    }

    console.log('[Scores] Calculated ' + score);
    return score;
}

module.exports = calculateConsistency;

module.exports = calculateConsistency;
