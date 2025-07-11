function getSentiment(text) {
    const positiveVisaPhrases = [
        "sponsorship available",
        "visa sponsorship provided",
        "we sponsor",
        "visa support",
        "will sponsor",
        "sponsorship provided",
        "eligible for sponsorship"
    ];

    const negativeVisaPhrases = [
        "no sponsorship",
        "sponsorship not available",
        "must have work authorization",
        "cannot sponsor",
        "no visa support",
        "no work permit",
        "must be eligible to work without sponsorship"
    ];

    const lower = text.toLowerCase();

    if (negativeVisaPhrases.some(phrase => lower.includes(phrase))) return "negative";
    if (positiveVisaPhrases.some(phrase => lower.includes(phrase))) return "positive";
    return "neutral";
}
