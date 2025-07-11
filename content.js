function getNearbyText(link) {
    const parent = link.closest("div, li, p") || link.parentElement;
    return parent ? parent.innerText : link.innerText;
}

window.addEventListener("load", () => {
    const links = document.querySelectorAll("a");

    links.forEach(link => {
        const contextText = getNearbyText(link);
        if (contextText.length < 3) return;

        const sentiment = getSentiment(contextText);

        const badge = document.createElement("span");
        badge.className = "jobvibe-badge";

        if (sentiment === "positive") {
            badge.textContent = "🟢 Sponsorship";
            badge.title = "Visa sponsorship likely available";
        } else if (sentiment === "negative") {
            badge.textContent = "🔴 No Sponsorship";
            badge.title = "Visa sponsorship not available";
        } else {
            return;
        }

        link.insertAdjacentElement("afterend", badge);
    });
});
