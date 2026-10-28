# Rakshak 2.0

Rakshak is a brand review desk prototype for checking marketing copy and logo file quality before publication. It is being built from scratch for the Round 2 demonstration.

## Run the prototype

Serve the `web` folder over HTTP (do not open `index.html` as a `file://` URL; browser PDF workers require HTTP):

```sh
python -m http.server 8000 --directory web
```

Then open <http://localhost:8000>.

## Live demo

**Live app:** https://hariharan-007design.github.io/Rakshak2.0/

## AI tools used

- **Hermes Agent (Nous Research)** — used to plan, scaffold, and edit the prototype.
- **Claude (Anthropic)** — used for code assistance and copy review.
- In-app (optional): AI polish calls an OpenAI-compatible API (Groq by default) using a key you provide; sends the revised draft + rule context to that provider; output requires human review.

## Demo workspaces

| Company | Access code | Rule pack |
| --- | --- | --- |
| Mozilla | `MOZ-2026` | Supplied Mozilla Trademark Guidelines and heuristic text rules |
| Mailchimp | `MAIL-2026` | Demo checks inspired by the public Mailchimp Style Guide |
| Acme SaaS | `ACME-2026` | Synthetic product-claim checks |
| Pharma MLR | `PHARMA-2026` | Medical, legal, regulatory pre-screening (FDA-style) |
| Chemical GHS | `GHS-2026` | GHS hazard communication and safety claims |
| FINRA | `FINRA-2026` | Financial industry regulatory pre-screening |

These codes are visible demo credentials. They are not authentication and must never protect real company information.

## What works in this build

- Select a demo company and open its workspace.
- Paste or upload `.txt` / `.md` copy, or upload a text-based PDF. PDF text is extracted in-browser with the locally bundled Mozilla PDF.js library. Files are not sent to a server.
- Compare draft text against the active sample rules. Findings appear in order and are highlighted in the draft. Open a finding to see its matched text, explanation, source link, and editable suggestion.
- Apply suggestions, review the resulting draft for Website, LinkedIn, Instagram, X, or Facebook, copy it, or download a plain-text review report.
- Upload a PNG, JPEG, WEBP, or SVG logo for basic dimensions, file size, and transparent/clear-space checks. These checks do not establish brand identity or approve artwork.
- Preview the supplied Mozilla Trademark Guidelines PDF and view the demo rule pack.
- Review history is held in memory for the current tab only.

## What this prototype does not do

The rule checks are curated demonstrations, not a legal or brand-compliance certification. They can miss issues or flag wording that is acceptable in context. The current PDF reader cannot OCR scanned pages and does not preserve page locations. The channel formatter only changes paragraph breaks; it does not publish to social platforms or log in to company accounts. The shared demo codes provide no data security. Do not enter confidential drafts.

The build uses no LLM for the deterministic rule scan and needs no network for it. All checks run in the browser; uploaded material never leaves the browser for the scan. An optional **AI polish** tab calls an external OpenAI-compatible API (Groq by default) using a key you provide; it sends the revised draft and rule context to that provider. The API key is stored in browser localStorage (not a secure vault). Do not submit confidential material to AI polish without authorization. The page also loads fonts from Google Fonts (network).

## How to try this demo

1. Open the live app: https://hariharan-007design.github.io/Rakshak2.0/
2. Choose a company workspace and enter its demo access code (Mozilla `MOZ-2026`, Mailchimp `MAIL-2026`, Acme SaaS `ACME-2026`).
3. Click **Load sample draft** or paste/upload a `.txt`, `.md`, or text-based PDF.
4. Click **Analyze draft**. Open each finding to see matched text, explanation, source link, and editable suggestion.
5. Apply or dismiss suggestions, review the revised draft, then copy or download the report.

**Supported files:** `.txt`, `.md`, text-based PDF (no OCR). Logos: PNG/JPEG/WEBP/SVG (file-quality checks only).

**Known limits:** curated demo rules, not legal/brand compliance; no OCR; session-only history; demo codes are not authentication.

## Round 3 product improvements

1. **Full document and asset review:** OCR for scanned PDFs and images, DOCX and slide ingestion, page/element-level citations, brand logo matching against approved assets, color/contrast checks, and downloadable annotated files.
2. **Enterprise governance and audit:** real SSO and role-based permissions, tenant isolation, versioned and editable rule packs, reviewer assignments and approvals, complete decision history, retention controls, and security verification against OWASP ASVS 5.0.0.
3. **Connected publishing with measurable quality:** permission-scoped CMS and social integrations, draft previews and scheduled publishing only after approval, rollback and audit trails, plus evaluation dashboards for rule coverage, false positives, and reviewer overrides. **Grounded advisory AI (planned):** an optional layer that retrieves the most relevant brand rules for a draft using keyword/vector search over the rule pack, then proposes rewrites via a local or hosted model, with every suggestion citing the rule ID and source passage. Human review required before any change is applied.

These are roadmap commitments, not features in this prototype. Accessibility should be built and checked against [WCAG 2.2](https://www.w3.org/TR/wcag/). Enterprise application security should use [OWASP ASVS 5.0.0](https://asvs.owasp.org/). Connected publishing should follow the [OAuth 2.0 Security Best Current Practice, RFC 9700](https://datatracker.ietf.org/doc/html/rfc9700). AI risk management can use the [NIST AI Risk Management Framework](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/).

## Sources

- [Mozilla PDF.js documentation](https://mozilla.github.io/pdf.js/getting_started/) — bundled browser PDF reader; version 6.4.299.
- [Mozilla Trademark Policy](https://www.mozilla.org/foundation/trademarks/policy/).
- [Mailchimp Style Guide](https://styleguide.mailchimp.com/).
- [W3C Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/wcag/).
- [OWASP Application Security Verification Standard](https://asvs.owasp.org/) — stable 5.0.0.
- [OAuth 2.0 Security Best Current Practice](https://datatracker.ietf.org/doc/html/rfc9700).
- [NIST AI Risk Management Framework](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/).

## Repository layout

```text
web/
  app.js
  index.html
  styles.css
  assets/rakshak-logo.png
  guidelines/mozilla-trademark-guidelines.pdf
  vendor/                 # PDF.js browser bundle
PRODUCT.md                # Product scope and round-by-round plan
```
