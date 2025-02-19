# Freedium Redirect Extension

<img src="icons/icon128.png" alt="Freedium Extension Icon" width="64"/>

A Chrome extension that adds a "Read on Freedium" button to Medium articles with paywalls, allowing you to read them for free via [Freedium](https://freedium.cfd).

## What is Freedium?

[Freedium](https://github.com/Freedium-cfd) is a service created to help users read Medium paywalled posts. Initially developed in mid-2023 when Medium changed their paywall method, Freedium now provides access to Medium content through paid subscriptions that are shared through their service.

The project is open source and maintained by the Freedium team, who created this service to help users access educational content on Medium. While the original version used reverse-engineered GraphQL endpoints, the current version works by sharing legitimate Medium subscriptions through their service.

## Features

- Automatically detects Medium paywalled articles
- Adds a "Read on Freedium" button to bypass the paywall
- Works on Medium.com and various Medium-based publication sites

## Important Limitation

### Publisher Domain Management
Due to Chrome's extension manifest limitations, we cannot use wildcard patterns like `*://medium.*.com/*` to match all Medium publisher domains. Chrome's match patterns only allow wildcards in specific positions:

- ✅ Allowed patterns:
  - `*://*.medium.com/*` (wildcard for subdomains)
  - `*://medium.com/*` (specific domain)

- ❌ Not allowed:
  - `*://medium.*.com/*` (wildcard in middle of hostname)

This means we need to manually add each Medium publisher domain to the manifest.json file. Some examples of these domains include:
- datadriveninvestor.com
- towardsai.net
- plainenglish.io
- betterprogramming.pub
- and many more...

If you encounter a Medium publication site that doesn't work with the extension, please:
1. Open an issue with the domain name
2. Submit a pull request adding the domain to the `matches` array in `manifest.json`

## Contributing
Found a new Medium publication domain? Please help by:
1. Forking the repository
2. Adding the domain to the `matches` array in `manifest.json`:
   ```json
   "matches": [
     "*://*.newpublisher.com/*"
   ]
   ```
3. Submitting a pull request

## Installation

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory

## Usage

1. Visit any Medium article
2. If you encounter a paywall, a green "Read on Freedium" button will appear in the bottom right corner
3. Click the button to open the article on Freedium in a new tab

## Credits

This extension integrates with [Freedium](https://github.com/Freedium-cfd), a community-driven project that helps users access Medium content. Special thanks to the Freedium team for providing and maintaining the service that makes this extension possible.

## License

MIT