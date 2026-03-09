# Stitch: AI Chat for Portfolio — Exploration Prompt

Paste the prompt below into **Stitch** (e.g. “Generate from text” or your Stitch MCP `generate_screen_from_text` prompt) to explore the design options from the plan.

### Stitch MCP setup (Cursor)

The Stitch backend often **rejects API keys** (“API keys are not supported… Expected OAuth2”). Use the **stdio proxy** instead so Cursor talks to Stitch via gcloud OAuth.

1. **One-time: Google Cloud + Stitch**
   - Install [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) (e.g. `brew install --cask google-cloud-sdk`).
   - Log in and set Application Default Credentials:
     ```bash
     gcloud auth login
     gcloud auth application-default login
     gcloud config set project YOUR_GOOGLE_CLOUD_PROJECT_ID
     gcloud auth application-default set-quota-project YOUR_GOOGLE_CLOUD_PROJECT_ID
     gcloud services enable stitch.googleapis.com --project=YOUR_GOOGLE_CLOUD_PROJECT_ID
     ```
   - Replace `YOUR_GOOGLE_CLOUD_PROJECT_ID` in the commands above and in `.cursor/mcp.json` → `stitch.env.GOOGLE_CLOUD_PROJECT`.

2. **Config:** `.cursor/mcp.json` is set to use the proxy (`@_davideast/stitch-mcp`). No API key in the file.

3. **Restart Cursor** fully after any change to `.cursor/mcp.json`.

4. **Verify:** In a new agent chat, ask: “List my Stitch projects” or “Create a Stitch project named Test”.

---

## Master prompt (one screen to explore all options)

Use this in Stitch to generate a single exploration screen:

```
Design exploration: AI chat for a product designer’s portfolio site.

Context: A recruiter-facing chat that slides in from the right on desktop and goes full-screen on mobile. The AI answers only from curated “about the designer” content (bio, experience, projects).

Show these options on one exploration screen (clearly labeled):

1) TRIGGER PLACEMENT
- Option A: Header CTA — “Ask about Steven” or “Ask AI” next to nav (desktop + mobile).
- Option B: Fixed bottom-right FAB — icon + optional “Ask AI” label.
- Option C: Floating pill at bottom center — “Questions about Steven? Ask the AI.”

2) DESKTOP PANEL
- Right-edge panel, ~400px wide, slide-in animation.
- Header: “Ask about Steven” + close button.
- Body: message list (welcome + 1–2 sample Q&A) + fixed input at bottom.
- Optional: dimmed or pushed main content behind.

3) MOBILE
- Same trigger as chosen in (1); tap opens full-screen chat (no side panel).
- Same header + message list + input; close returns to site.
- Touch-friendly (44px targets), safe-area padding.

4) EMPTY STATE (first open)
- One line: “Ask me anything about Steven’s experience and work.”
- 2–3 suggestion chips: e.g. “What’s your design process?”, “Recent projects”, “How to contact?”

Style: Clean, minimal, aligned with a modern portfolio (serif or sans-serif, plenty of whitespace). Match a product-design portfolio aesthetic, not a generic chatbot.
```

---

## Alternative: separate prompts per option

Use these one at a time in Stitch to get separate screens.

**Screen 1 — Trigger options**
```
Three variants for the same portfolio header/footer: (A) Header CTA “Ask about Steven” next to nav, (B) bottom-right FAB with “Ask AI”, (C) bottom-center floating pill “Questions about Steven? Ask the AI.” Label each. Minimal portfolio chrome, focus on the trigger.
```

**Screen 2 — Desktop chat panel**
```
Desktop layout: main portfolio content on the left (slightly dimmed), right-edge panel ~400px with chat UI. Panel header “Ask about Steven” + close. Body: short welcome, 2 message bubbles (user + AI), input at bottom. Clean, minimal.
```

**Screen 3 — Mobile full-screen chat**
```
Mobile full-screen chat UI: “Ask about Steven” header with close, welcome line, 3 suggestion chips, then 2 message bubbles and fixed bottom input. 44px touch targets, safe areas. No side panel—full screen.
```

**Screen 4 — Empty state**
```
Single state: chat panel with no history. Title “Ask about Steven”. Subtitle “Ask me anything about Steven’s experience and work.” Three suggestion chips: “What’s your design process?”, “Recent projects”, “How to contact?”. One primary CTA or input hint. Minimal, portfolio-style.
```

---

## Use Stitch via MCP (after restarting Cursor)

**Note:** Stitch only appears in Cursor’s MCP list after a full restart. Once it’s connected:

1. **Create the project** — In agent chat say:  
   *“Create a Stitch project named ‘Portfolio AI Chat - Options’.”*  
   The agent will call `create_project` and return a `project_id`.

2. **Generate a screen** — Say (use the `project_id` from step 1):  
   *“In my Stitch project [project_id], generate a screen from this prompt: [paste the Master prompt above, or one of the 4 screen prompts in ‘Alternative: separate prompts per option’].”*  
   The agent will call `generate_screen_from_text` with `project_id`, `prompt`, and optionally `model_id` (e.g. `GEMINI_3_FLASH` or `GEMINI_3_PRO`).

3. **Open in Stitch** — Use the project URL from the response, or go to [stitch.withgoogle.com](https://stitch.withgoogle.com) and open **Portfolio AI Chat - Options** to review and edit the generated screens.

---

*Generated from the AI Chat Brainstorm and Mockups plan. Use in Google Stitch to explore trigger placement, desktop panel, mobile full-screen, and empty state.*
