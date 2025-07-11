function getNearbyText(link) {
    const parent = link.closest("div, li, p") || link.parentElement;
    return parent ? parent.innerText : link.innerText;
}

function addBadge(link, sentiment, source = 'inline') {
    const badge = document.createElement("span");
    badge.className = "jobvibe-badge";

    if (sentiment === "positive") {
        badge.textContent = "🟢 Sponsorship";
        badge.title = `Visa sponsorship likely available (${source})`;
    } else if (sentiment === "negative") {
        badge.textContent = "🔴 No Sponsorship";
        badge.title = `Visa sponsorship not available (${source})`;
    } else {
        return;
    }

    link.insertAdjacentElement("afterend", badge);
}

function tryFetchPageAndAnalyze(link, fallbackText) {
    const url = link.href;
    fetch(url)
        .then(res => res.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const pageText = doc.body ? doc.body.innerText : '';
            const sentiment = getSentiment(pageText);
            if (sentiment !== "neutral") {
                addBadge(link, sentiment, "page");
            } else {
                const fallbackSentiment = getSentiment(fallbackText);
                if (fallbackSentiment !== "neutral") {
                    addBadge(link, fallbackSentiment, "inline");
                }
            }
        })
        .catch(() => {
            // fallback if CORS or network error
            const sentiment = getSentiment(fallbackText);
            if (sentiment !== "neutral") {
                addBadge(link, sentiment, "inline");
            }
        });
}

window.addEventListener("load", () => {
    const links = document.querySelectorAll("a");

    links.forEach(link => {
        const contextText = getNearbyText(link);
        if (link.href && link.href.startsWith("http")) {
            tryFetchPageAndAnalyze(link, contextText);
        } else {
            const sentiment = getSentiment(contextText);
            if (sentiment !== "neutral") {
                addBadge(link, sentiment, "inline");
            }
        }
    });
});
