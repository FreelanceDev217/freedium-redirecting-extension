// Function to check if the page has a paywall
function hasPaywall() {
    const paywallSelectors = [
        'div[class*="paywall"]',
        'h2:contains("Member-only story")',
        'div[class*="membership-prompt"]',
        'div.meteredContent',
        // Add more specific selectors
        'div[class*="gate-module"]',
        'h2.pw-post-title',
        'div[class*="postFade"]',
        'section[class*="gate"]'
    ];

    // Check text content for common paywall phrases
    const paywallPhrases = [
        'Member-only story',
        'become a member',
        'Subscribe to read',
        'Open in app'
    ];

    // Check for selectors
    const hasPaywallElement = paywallSelectors.some(selector => {
        try {
            const elements = document.querySelectorAll(selector);
            return Array.from(elements).some(el => el.offsetParent !== null); // Check if visible
        } catch {
            return false;
        }
    });

    // Check for phrases in the page content
    const hasPaywallPhrase = paywallPhrases.some(phrase =>
        document.body.innerText.toLowerCase().includes(phrase.toLowerCase())
    );

    return hasPaywallElement || hasPaywallPhrase;
}

// Function to create and add the redirect button
function addRedirectButton() {
    // Check if button already exists
    if (document.getElementById('freedium-redirect-btn')) {
        return;
    }

    const button = document.createElement('button');
    button.id = 'freedium-redirect-btn';
    button.textContent = 'Read on Freedium';
    button.className = 'freedium-redirect-button';

    button.addEventListener('click', () => {
        const currentUrl = window.location.href;
        const freediumUrl = `https://freedium.cfd/${currentUrl}`;
        window.open(freediumUrl, '_blank');
    });

    document.body.appendChild(button);
}

// Function to initialize the extension
function init() {
    // Check immediately
    if (hasPaywall()) {
        addRedirectButton();
    }

    // Also check after a short delay to handle dynamic content
    setTimeout(() => {
        if (hasPaywall()) {
            addRedirectButton();
        }
    }, 1500);
}

// Run initialization
init();

// Watch for dynamic content changes
const observer = new MutationObserver(() => {
    if (hasPaywall()) {
        addRedirectButton();
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
});