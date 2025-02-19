// Function to check if the current page is a Medium site
function isMediumSite() {
    const mediumDomains = [
        'medium.com',
        '.medium.com', // Catches subdomains like betterprogramming.pub.medium.com
    ];

    const hostname = window.location.hostname;

    // Check for medium.com and its subdomains
    if (mediumDomains.some(domain =>
        hostname === domain ||
        hostname.endsWith(domain))) {
        return true;
    }

    // Check for medium.*.com pattern
    if (/^medium\.[^.]+\.com$/.test(hostname)) {
        return true;
    }

    return false;
}

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
function addRedirectButton(isError = false) {
    // Check if button already exists
    if (document.getElementById('freedium-redirect-btn')) {
        return;
    }

    const button = document.createElement('button');
    button.id = 'freedium-redirect-btn';
    button.textContent = isError ? 'Report Freedium Error' : 'Read on Freedium';
    button.className = 'freedium-redirect-button';

    // Add error styling if it's an error case
    if (isError) {
        button.style.backgroundColor = '#ff0000';
        button.style.position = 'fixed';
        button.style.top = '10px';
        button.style.right = '10px';
        button.style.zIndex = '9999';
        button.style.padding = '10px 20px';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.color = 'white';
        button.style.cursor = 'pointer';
    }

    button.addEventListener('click', () => {
        if (isError) {
            // Open GitHub issues page for error reporting
            window.open('https://github.com/yourusername/freedium-extension/issues', '_blank');
        } else {
            const currentUrl = window.location.href;
            const freediumUrl = `https://freedium.cfd/${currentUrl}`;
            window.open(freediumUrl, '_blank');
        }
    });

    document.body.appendChild(button);
}

// Function to initialize the extension
function init() {
    // Check immediately
    if (hasPaywall()) {
        addRedirectButton(false);
    }

    // Log for debugging
    console.log('Hostname:', window.location.hostname);
    console.log('Has paywall:', hasPaywall());

    // Also check after a short delay to handle dynamic content
    setTimeout(() => {
        if (hasPaywall()) {
            addRedirectButton(false);
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