 Rakshak 2.0 — Round 3 Submission

Futurestack Hackathon — We Code Coders
Team: ssshariharan82 | Leader: Hariharan S | College: St. Joseph's College of Engineering
Email: ssshariharan82@gmail.com

Live prototype: https://hariharan-007design.github.io/Rakshak2.0/
Repository: https://github.com/hariharan-007design/Rakshak2.0

---

## Problem Statement — The Knowledge-to-Action Gap

### Core Problem

Organizations have brand guidelines, tone rules, terminology standards, and legal disclaimers. They live in static PDFs, wikis, and Figma libraries that creators never open while writing. The rules are not machine-readable, not queryable, and not enforced at creation time.

### Three Structural Taxes Every Team Pays

| Tax | What it looks like | Source |
|---|---|---|
| Search tax | Copywriter hunts a 40-page PDF for "latest disclaimer," finds 3 versions, guesses | Interview observation (3/5 practitioners) |
| Error tax | Wrong logo stretch, banned phrase ("guaranteed ROI"), missing CAN-SPAM footer ships to review | Interview observation (4/5 practitioners) |
| Latency tax | MLR/brand/legal queue forms; same rule checked repeatedly; reviewers burn out | Interview observation (2/5 practitioners) |

### First User and Exact Workflow

User: marketing reviewer at a small-mid org (startup, agency, internal team) publishing 5–20 pieces a week. No dedicated brand or compliance team. Uses Google Docs, Notion, Canva, LinkedIn, CMS.

Moment of failure: they paste a draft into a tool and need to know right now — "Does this violate our rules? Which rule? What's the fix?"

Current options all fail for this user:

| Solution | Why it fails |
|---|---|
| Brand portals (Bynder, Frontify) | Repositories only. No scanning, no fixes, no integration. $50k+/yr. |
| AI writers (Writer, Jasper, Grammarly) | Cloud = data leaves. Generic rules. Hallucinate citations. No diff UI. |
| ChatGPT / Custom GPT | IP leak. No deterministic layer. No rule citation. No memory. |
| MLR platforms (Veeva) | Pharma-only. Routes for approval — does not check while writing. |

### What the User Actually Needs

A standalone local checker that accepts pasted text or files, loads their rules, scans the draft, returns cited findings with fixes, lets them accept or ignore each, and exports clean text plus an audit report. 100% offline. No account. No cloud.

---

## Proposed Solution — Rakshak 2.0

One-sentence summary: a local-first checker that loads a brand rule pack, scans a text draft via deterministic checks plus an optional AI layer, shows rule-cited findings with suggested fixes, and exports corrected text plus a report — all offline.

### Agent Architecture (MVP Scope)

"Agent" here means the review loop: it selects relevant rules, runs deterministic and contextual checks, produces structured findings, proposes fixes, records human decisions, and uses accepted terminology preferences in later scans. Autonomy stays limited on purpose, to keep humans in control.

Check types — reliability is surfaced, not hidden:

| Type | Examples | Reliability | UI badge |
|---|---|---|---|
| Deterministic | Banned phrases, required disclaimers, exact terminology, color hex, date/cert expiry | High — exact match against a configured rule | Rule match |
| Advisory (LLM+RAG) | Tone alignment, clarity, inclusivity, fair-language heuristics | Context-dependent; can miss or invent | AI assessment — verify |

The tool never says "compliant" or "approved." It only reports "no deterministic violations found; X advisory items flagged for review." It is a pre-screening aid, not a compliance guarantee.

---

## Demo Strategy — Proof on Public Brands

Three hand-curated rule packs, source-verified:

| Pack | Public source | Rules | Purpose |
|---|---|---|---|
| Mozilla | mozilla.org/brand + Trademark Policy | 12 | Tone, terminology, trademark attribution, implied endorsement |
| Mailchimp | styleguide.mailchimp.com | 14 | Voice, accessibility, CAN-SPAM footer |
| Acme SaaS | Synthetic (simulates a real org) | 10 | Primary demo pack; matches the target user's actual guidelines |

No affiliation. No logos redistributed. Text-only seeded examples. Neutral placeholders for visuals.

Seeded test set (measurable protocol):

- 12 violations (4 per pack): banned phrases, wrong terminology, missing disclaimers, tone drift — each mapped to one expected rule ID.
- 20 clean control passages with no intended violations.
- Target: detect 11/12 violations (90% recall); false discovery proportion under 10%.
- TP: finding identifies the correct span and the correct rule category.
- FP: finding on a clean passage, or a finding tied to the wrong rule.
- Measured: TP/FP/FN, scan time (deterministic vs LLM), hardware, rule-pack version, model tag, context length, offline verification (Wi-Fi off after model setup).

---

## What Was Delivered in Round 3

Round 2 proved the idea runs. Round 3 was about making it a product. With 72 hours and one developer, the honest call was to finish what was already shipped rather than start three new systems. Here is what actually landed.

### Reliability Under Normal Use

- Saved-files loading fixed (drawFindings), industry filter, company name, PDF ref upload.
- Drag-and-drop upload fixed; step indicator added (Draft → Review → Approve).
- Analyze button disabled when the textarea is empty.
- Removed the navigator.onLine check that blocked AI; clearer voice network error message.
- Dark mode CSS variables for the workspace.
- Modal z-index, clickable login form, pointer-events fixes.

### Usability

- Sidebar maximize workspace, theme toggle in the topbar, logo alignment, login redesign.
- Left-aligned logo, quote/login blur box, interactive dot grid.

### Documentation

- README with run instructions, demo workspaces, access codes, known limits, and the Round 3 roadmap. A judge can clone and run from it.

### The Three Improvements Named at Round 2 — Status

1. Multimodal document and asset review (OCR, page-level evidence, approved-logo matching, accessibility checks): not delivered. Reason: one developer in 72 hours could not responsibly ship OCR, page-region citations, and approved-asset matching with tests. Declared as roadmap instead of half-working code. Partial progress already exists: text-based PDF extraction works, and logo file-quality heuristics work.
2. Enterprise governance and audit (real auth, RBAC, isolated workspaces, versioned rules, auditable approval history): not delivered as real security. Reason: the demo codes are documented as not authentication and must never protect real data. Shipping fake auth would mislead judges. Workspaces and decision history exist in memory only.
3. Controlled publishing and quality measurement (approval-before-publishing, audit trails, FP/reviewer-override metrics): partially delivered. The approval step indicator and in-memory decision history exist. Publishing to platforms is not implemented — only channel preview with paragraph-break changes. Metrics are not tracked beyond the seeded test numbers from Round 2.

Honest note: Round 3 went into finishing and hardening what Round 2 shipped. That matches the Round 3 brief — close loose ends, make it hold up without us.

---

## Complete List of Features Built

- Select a demo company workspace (Mozilla, Mailchimp, Acme SaaS, Pharma MLR, Chemical GHS, FINRA) using a demo access code.
- Paste or upload .txt / .md copy, or a text-based PDF. PDF text extracted in-browser via bundled PDF.js.
- Compare draft against the active rule pack. Findings shown in order, highlighted in the draft. Each finding shows matched text, explanation, source link, editable suggestion.
- Apply or dismiss suggestions; review revised draft; copy or download a plain-text review report.
- Upload PNG/JPEG/WEBP/SVG logo for file-quality checks: dimensions, file size, transparency/clear-space heuristics. Labelled preliminary, not brand approval.
- Preview the supplied Mozilla Trademark Guidelines PDF and view the demo rule pack.
- Optional AI polish (BYO Groq/OpenAI-compatible key) rewrites a flagged sentence; key stays in browser; deterministic rules remain source of truth; output marked AI-generated and re-checkable.
- Channel preview for Website, LinkedIn, Instagram, X, Facebook (paragraph-break changes only).
- Saved files per industry stored in IndexedDB; saved-files view.
- Light/dark theme toggle.
- Sidebar maximize workspace, step indicator (Draft → Review → Approve).
- Drag-and-drop upload, empty-state handling, Analyze disabled when textarea empty.

---

## Technical Architecture and Implementation

- Layer: static web app (HTML/CSS/JS). No build step. Served over HTTP. Hosted on GitHub Pages.
- Document handling: PDF.js (bundled, v6.4.299) extracts selectable text in-browser; explicit size/page limits surfaced.
- Deterministic checks: regex against configured rule packs (JSON). High confidence for explicit rules; fast and predictable.
- Findings/fixes: structured objects with rule ID + source URL. Side-by-side revised draft + downloadable report.
- Optional AI: OpenAI-compatible API (Groq), BYO key. Key in localStorage. Output marked AI-generated, human-reviewed.
- Storage: localStorage (session only) + IndexedDB for saved files. No account, no server. Review history not saved after tab closes.
- Original Round 1 target stack (Tauri v2 + Ollama + sqlite-vec) remains the post-hackathon desktop plan. Browser prototype chosen so judges can use it on any device with zero install.

### Existing Solution Comparison

| Solution | Checks at creation | User-owned rules | Local/private | Cited findings | Human-controlled fixes |
|---|---|---|---|---|---|
| Brand portals (Bynder, Frontify) | No | Partial | No | No | No |
| AI writing (Writer, Jasper) | No | Partial | Limited | Often weak | Partial |
| Custom GPT | Manual | Yes | No | Unreliable | No |
| MLR workflow (Veeva) | No — post-creation | Yes | Enterprise-dependent | Partial | Yes |
| Rakshak 2.0 (MVP) | Yes | Yes | Yes | Yes | Yes |

---

## Known Limitations (Honest Boundaries)

- Language: English only in this build.
- Rule quality: demo packs are hand-curated; production PDF→JSON extraction is post-hackathon.
- Scanned PDFs: not supported (no OCR yet); selectable-text PDFs work.
- Logo checks: file-quality heuristics only — not approval of an approved brand asset.
- AI polish: optional and BYO-key; a fluent rewrite can still violate a rule, so output is re-checkable and human-reviewed.
- Scope: pre-screening aid only — does not replace MLR, legal, regulatory, or accessibility approval.

---

## Testing Details

Seeded test protocol (from Round 2, re-run after fixes):

- Violations detected (recall): 12/12 on the seeded set (4 violations per pack, each mapped to one rule ID).
- False discovery: 0/20 clean control passages produced spurious findings.
- Deterministic scan speed: under 1 second on a representative draft.
- Offline operation: deterministic scan runs with no network; only optional AI polish calls an external API.

Manual end-to-end checks after fixes:

- Empty textarea → Analyze disabled.
- Drag-and-drop upload of .txt/.md/.pdf.
- Refresh behaviour: review history is in-memory only (documented).
- Repeat action (Analyze twice) → no crash, findings re-render.
- Bad input (empty, oversized PDF) → surfaced limits, no hang.
- Theme toggle light/dark → workspace readable in both.

---

## Documentation

README.md covers: how to run (`python -m http.server 8000 --directory web`), live demo link, demo workspaces with access codes, what works, what it does not do, how to try, Round 3 roadmap, sources, repository layout. A judge can clone and run from the README.

---

## Product Roadmap and Future Development

- v0.2: VS Code / Figma / Chrome plugins sharing the agent core.
- v0.3: encrypted team vault (Syncthing/iCloud/Drive, no server).
- v1.0: optional SaaS dashboard for admins (opt-in).
- Community packs: Pharma MLR, Chem GHS/REACH, Fintech FINRA contributed back.
- Deliver the three Round-2-named improvements as real features (OCR + page citations; real auth/RBAC; publishing + metrics) in a follow-up release, not as half-working demo code.

Accessibility should be built and checked against WCAG 2.2. Enterprise application security should use OWASP ASVS 5.0.0. Connected publishing should follow OAuth 2.0 Security Best Current Practice (RFC 9700). AI risk management can use the NIST AI Risk Management Framework.

---

## Visuals — Architecture & Flows

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser (GitHub Pages)                   │
├─────────────────────────────────────────────────────────────┤
│  index.html  │  app.js  │  styles.css  │  vendor/pdfjs     │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │ Rule Packs   │  │  Scan Engine │  │  UI Layer       │   │
│  │ (JSON)       │  │  (regex)     │  │  (shadcn-like)  │   │
│  │ Mozilla      │  │  banned      │  │  findings panel │   │
│  │ Mailchimp    │  │  phrases,    │  │  diff view      │   │
│  │ Acme SaaS    │  │  terms,      │  │  theme toggle   │   │
│  │ Pharma MLR   │  │  disclaimers │  │                 │   │
│  │ Chemical GHS │  │  color hex   │  │                 │   │
│  │ FINRA        │  │  date/cert   │  │                 │   │
│  └──────────────┘  └──────────────┘  └─────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │ PDF.js       │  │  AI Polish   │  │  Storage        │   │
│  │ (text-based) │  │  (BYO Groq   │  │  localStorage  │   │
│  │              │  │  key, opt-in)│  │  IndexedDB     │   │
│  └──────────────┘  └──────────────┘  └─────────────────┘   │
└─────────────────────────────────────────────────────────────┘
        │                                    │
        ▼                                    ▼
   No backend, no server, no cloud for deterministic scan.
   Optional: external OpenAI-compatible API (Groq) for AI polish only.
```

### Main Review Flow (User Journey)

```
┌─────────┐     ┌──────────────┐     ┌─────────────┐
│  Start  │────▶│  Select      │────▶│  Enter      │
│         │     │  Company     │     │  Access     │
│         │     │  Workspace   │     │  Code       │
└─────────┘     └──────────────┘     └──────┬──────┘
                                            │
                                            ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Review      │◀────│  Analyze     │◀────│  Paste /     │
│  Findings    │     │  Draft       │     │  Upload      │
│  (accept/    │     │  (regex      │     │  .txt/.md/   │
│   ignore)    │     │   scan)      │     │  .pdf        │
└──────┬───────┘     └──────────────┘     └──────────────┘
       │
       ▼
┌──────────────┐     ┌──────────────┐
│  Apply       │────▶│  Export      │
│  Fixes       │     │  Revised     │
│  (edited)    │     │  Draft +     │
└──────────────┘     │  Audit Report│
                     └──────────────┘
```

### Data Flow

```
Draft Input (.txt/.md/PDF)
        │
        ▼
   ┌─────────┐
   │ PDF.js  │  (if PDF) → extract text
   └────┬────┘
        │
        ▼
   ┌─────────────────────────────┐
   │  Load Active Rule Pack      │
   │  (JSON: rule ID, pattern,   │
   │   explanation, source URL)  │
   └────┬────────────────────────┘
        │
        ▼
   ┌─────────────────────────────┐
   │  Deterministic Scan         │
   │  regex match per rule       │
   │  → structured findings      │
   │     (rule ID, span, fix)    │
   └────┬────────────────────────┘
        │
        ├──────────────────────┐
        ▼                      ▼
   ┌─────────┐          ┌──────────────┐
   │ Findings│          │  AI Polish   │  (optional, BYO key)
   │ Panel   │          │  Groq/OpenAI │
   │ (UI)    │          │  rewrite     │
   └────┬────┘          └──────┬───────┘
        │                      │
        ▼                      ▼
   ┌─────────────────────────────────┐
   │  Human Decision (accept/ignore) │
   └────┬────────────────────────────┘
        │
        ▼
   ┌─────────────────────────────────┐
   │  Revised Draft + Audit Report   │
   │  (download / copy)              │
   └─────────────────────────────────┘
```

### Round 3 Hardening Flow (What Shipped)

```
Round 2 Prototype
        │
        ├── Reliability fixes ──┐
        │   (drag-drop, empty    │
        │    state, modal z,     │
        │    dark mode)          │
        │                        │
        ├── Usability fixes ─────┤──▶  Round 3 Final Product
        │   (sidebar, theme,     │      (deployed, documented,
        │    logo, login)        │       tested, honest limits)
        │                        │
        └── Documentation ───────┘
            (README, access codes,
             known limits, roadmap)
```

### Three Named Improvements — Delivery Status

```
Round 2 Commitment          Round 3 Outcome
─────────────────────────   ──────────────────────────────────
1. Multimodal review        NOT delivered (OCR, page citations,
   (OCR, logo matching)     asset matching). Partial: text-PDF
                            extraction + logo heuristics exist.

2. Enterprise governance    NOT delivered (real auth/RBAC).
   (auth, RBAC, audit)     Demo codes documented as non-auth.
                            Workspaces + history in-memory only.

3. Controlled publishing    PARTIAL (approval step indicator +
   (publish, metrics)       in-memory history). No real
                            publishing; metrics not tracked.
```

### Deployment Architecture

```
Source: github.com/hariharan-007design/Rakshak2.0
        │
        ├── GitHub Pages ──▶ https://hariharan-007design.github.io/Rakshak2.0/
        │                   (static, no build, no backend)
        │
        └── Local run: python -m http.server 8000 --directory web
            (PDF.js requires HTTP, not file://)
```

---

## Team and Participant Details

| Field | Value |
|---|---|
| Team Name | ssshariharan82 |
| Project Name | Rakshak 2.0 |
| Team Leader | Hariharan S |
| Leader Email | ssshariharan82@gmail.com |
| Team Members | Hariharan S |
| College | St. Joseph's College of Engineering |

Why us: Chemical-engineering background (GHS/SDS/regulatory rigor) plus hackathon project experience (dashboard/workflow/system design) = domain credibility for future regulated packs and execution capability for this build.

---

## Sources

- Mozilla PDF.js documentation — bundled browser PDF reader; version 6.4.299.
- Mozilla Trademark Policy.
- Mailchimp Style Guide.
- W3C Web Content Accessibility Guidelines (WCAG) 2.2.
- OWASP Application Security Verification Standard — stable 5.0.0.
- OAuth 2.0 Security Best Current Practice (RFC 9700).
- NIST AI Risk Management Framework.

## Repository Layout

```
web/
  app.js
  index.html
  styles.css
  assets/rakshak-logo.png
  guidelines/mozilla-trademark-guidelines.pdf
  vendor/                 # PDF.js browser bundle
PRODUCT.md                # Product scope and round-by-round plan
```
