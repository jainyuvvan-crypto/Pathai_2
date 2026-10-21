# PathAI

PathAI is a dependency-free front-end prototype for an AI-powered learning roadmap product.

## Included in this prototype

- Pixel-grid, white-paper landing page with a generated roadmap preview
- Phone-shaped onboarding survey with selectable answers
- Workspace with prompt composer, roadmap progress, streak tracker, and recent paths
- Roadmaps, resources, and community tabs
- Pricing section with free and Pro trial messaging
- Responsive layouts for desktop and mobile
- Reduced-motion support and visible focus states

## Run locally

```bash
cp .env.example .env   # then add one AI key (see below)
npm run dev
```

Then open `http://localhost:4173`. `server.js` is a dependency-free Node server (Node 18+) that serves the static files and the AI endpoint.

## AI roadmaps

`POST /api/roadmaps/generate` sends the learner's goal to an LLM, which writes a roadmap for that exact subject: phases, steps, exercises, 2–3 resources per step, and a video query per step. The server then:

- checks every resource URL and drops broken links;
- attaches a real YouTube video to each step when `YOUTUBE_API_KEY` is set (about 100 searches/day on the default quota), or otherwise a YouTube search link.

Keys live only in `.env` (gitignored, never served):

| Variable | Purpose |
| --- | --- |
| `GEMINI_API_KEY` | Google Gemini (free tier via https://aistudio.google.com/apikey) |
| `OPENAI_API_KEY` | OpenAI, alternative |
| `ANTHROPIC_API_KEY` | Anthropic, alternative |
| `YOUTUBE_API_KEY` | Optional, real embedded videos per step |
| `AI_PROVIDER`, `AI_MODEL`, `PORT` | Optional overrides |

Restart the server after editing `.env`. `GET /api/status` shows what is active.

Without a key, or if the AI call fails, the workspace falls back to offline templates. These are topic-aware: languages such as Spanish get a language-learning path, and unknown subjects get a generic path. The roadmap header shows **AI-generated** or **Offline template**. To point the front end at another backend, set `window.PATHAI_API_URL`.

## Color system (workspace)

The workspace ships two appearances that share one token vocabulary: **Light Paper** (default) and **Night Study** (`body[data-theme="dark"]`, chosen in Settings → Appearance, persisted in `localStorage` under `pathai.theme`).

Styles are organised in three layers, all declared in `src/workspace.css`:

1. **Brand palette** — raw hues only: `--color-ink`, `--color-paper`, `--color-white`, `--color-lime`, `--color-pink`, `--color-blue`, `--color-cream`.
2. **Semantic tokens** — what a surface is *for*. Every token that paints a background ships a matching text token, so a component can never pick a readable-looking colour that is unreadable on it:
   - Surfaces: `--surface-page`, `--surface-shell`, `--surface-card`, `--surface-sunken`, `--surface-input`, `--surface-hover`, `--surface-inverse`, `--surface-canvas`
   - Text: `--text-primary`, `--text-secondary`, `--text-faint`, `--text-on-inverse`, `--text-on-inverse-soft`, `--text-accent`
   - Lines: `--border-default`, `--border-strong`, `--border-inverse`, `--dot-grid`, `--inverse-line`, `--inverse-grid`, `--inverse-track`
   - Ordered ramps, 1 → 4 with paired text: `--chip-N` / `--chip-N-text` (badges), `--phase-N` / `--phase-N-text` (mindmap phases), `--tint-N` / `--tint-N-text` (feature cards)
   - States: `--state-complete` (+ `-text`), `--state-progress` (+ `-text`), `--state-saved`, `--state-danger`
   - Shadows: `--shadow-accent`, `--shadow-soft`, `--shadow-block`
3. **Legacy aliases** — `--ink`, `--paper`, `--white`, `--line`, `--soft`, `--lime`, `--pink`, `--lime-deep` now point at Layer 2. They exist only so older rules keep working; new rules should use semantic tokens.

Rules for adding or changing UI:

- Colour elements with Layer 2 tokens, never hex values or Layer 3 aliases.
- When a rule sets a tinted `background`, set `color` from the paired `-text` token in the same declaration.
- Secondary text on a tinted surface uses `color-mix(in srgb, currentColor N%, transparent)`; icon-box borders on varying surfaces use `border: 1px solid currentColor`.
- Night Study is monochrome: its light chips (`--chip-1`, `--phase-1`, `--state-complete`) keep `#111` text, while charcoal chips (`--chip-2/3`, `--phase-2/3/4`, `--tint-2/3/4`) flip to `#f4f4ef`.
- The dark theme is a **token remap only** (`workspace-overrides.css`, one `body[data-theme="dark"]` block). Never add `body[data-theme="dark"] .some-component` colour overrides — remap or add a token instead. The only permitted dark exceptions are pixel-icon `filter: invert(...)` rules, because the glyphs are authored black.
- Aliases must be re-declared inside the dark block: custom properties resolve where declared, so a `:root` alias like `--ink: var(--text-primary)` would otherwise stay pinned to its Light Paper value.
- After editing any workspace CSS, bump the `?v=` query on that stylesheet in `workspace.html`, and switch themes once (Settings → Appearance) to force a reload — the choice is applied on page load.
