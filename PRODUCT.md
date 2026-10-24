# Rakshak 2.0 product brief

## Product

Rakshak is a brand-governance review desk for teams that want to check marketing assets against company rules before publishing. A reviewer selects a company and destination, adds draft copy and a logo, reviews findings against that company’s guidelines, and decides which suggested changes to use.

## Round 2 prototype

### Core journey

1. Open the browser app and choose a sample company workspace.
2. Paste copy or upload a text file or selectable-text PDF. Add a logo if one is part of the draft.
3. Select a destination channel and run the review.
4. Inspect highlighted text and sequential findings. Each finding identifies the matched words, explains the risk, links to a source, and offers an editable suggestion.
5. Apply changes that make sense, review the revised copy, then copy it or download a report.

### Shipped scope

- Responsive dark brand-review interface using the supplied Rakshak mark.
- Demo-only company selector and visible access codes.
- Mozilla rules tied to the supplied Trademark Guidelines, Mailchimp voice checks inspired by its public guide, and a clearly synthetic Acme example pack.
- Browser-side PDF text extraction with bundled PDF.js, plus text file and pasted-copy intake.
- Browser-only logo file checks for dimensions, size, and approximate transparent/clear space.
- Destination selector for Website, LinkedIn, Instagram, X, and Facebook. Output is a formatting preview, not a platform integration.
- Human decisions, session-only review history, and downloadable text report.

### Plan changes

The Round 1 concept explored local models and desktop packaging. For this prototype, the app is a static browser site so judges can open a link without installing Tauri, downloading a model, or configuring a local service. Deterministic checks make the demo predictable and keep document contents in the browser. The sample password screen demonstrates company selection only; it does not provide real authentication or authorization. Full PDF analysis, OCR, logo identity matching, other file types, enterprise controls, and automatic publishing remain future work.

## Round 3: three substantive improvements

### 1. Multimodal document and asset analysis

Process full PDFs with OCR and page-level evidence, plus DOCX, presentations, and social image formats. Compare logos against organization-approved assets, flag incorrect variants and clear-space violations, and check accessible color contrast. Let reviewers open each finding at its source location and export annotated files.

### 2. Enterprise governance and auditable approvals

Add SSO, role-based access, isolated company workspaces, encrypted storage, configurable retention, versioned guideline packs, reviewer assignments, approval states, and immutable decision/audit history. Make permissions, retention, and rule sources visible to administrators. Use OWASP ASVS 5.0.0 as the security verification baseline.

### 3. Approved publishing integrations and quality measurement

Connect approved CMS and social channels through scoped OAuth grants. Allow only reviewed content to publish, with previews, scheduling, revocation, rollback, and a complete audit trail. Add evaluation dashboards for rule coverage, misses, false positives, channel constraints, and reviewer overrides. Any AI suggestion layer should be optional, cite the rule and source passages it used, and never publish without human approval.

## Architecture direction

**Round 2:** static HTML, CSS, and JavaScript with deterministic rules; PDF text extraction through Mozilla PDF.js. Files and session history stay in browser memory. Fonts are fetched from Google Fonts, with system fallbacks. No database, API server, model, social account, or CMS is required.

**Later production service:** authenticated frontend; tenant-aware API; encrypted object storage and short-lived uploads; document parsing/OCR workers; versioned rule-pack service; approval and audit event store; optional model gateway with source-grounded output; connector service using least-privilege tokens. Isolate tenants and validate all uploads. Select hosting and data residency to fit each customer’s retention and regulatory needs.

## Quality and safety principles

- A rule match is a review prompt, not a legal conclusion or publishing approval.
- Keep original copy visible, link every rule to its source and version, and let reviewers accept, edit, or dismiss suggestions.
- Show supported formats and extraction limitations before a reviewer relies on the result.
- Do not use demonstration credentials or browser memory as a security boundary.
- Follow WCAG 2.2 for accessibility, OWASP ASVS 5.0.0 for application security, and OAuth 2.0 Security BCP (RFC 9700) for future integrations.
- Use NIST AI RMF to guide AI risk identification, governance, and evaluation if an AI layer is added.

## Reference sources

- [Mozilla PDF.js](https://mozilla.github.io/pdf.js/getting_started/)
- [Mozilla Trademark Policy](https://www.mozilla.org/foundation/trademarks/policy/)
- [Mailchimp Style Guide](https://styleguide.mailchimp.com/)
- [W3C WCAG 2.2](https://www.w3.org/TR/wcag/)
- [OWASP ASVS 5.0.0](https://asvs.owasp.org/)
- [IETF RFC 9700, OAuth 2.0 Security Best Current Practice](https://datatracker.ietf.org/doc/html/rfc9700)
- [NIST AI Risk Management Framework](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/)
