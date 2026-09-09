# NeuroMatch 💌

A gimmicky, funny, fully-scripted "AI dating app" built as a gift. No real AI, no backend, no database — everything is hardcoded. It's a static site: HTML + CSS + vanilla JS, nothing to build or compile.

**Flow:** fake face scan → "hello gorgeous" welcome → AI "thinking"/checklist → swipeable match deck (14 fictional/mythological characters) → match animation → pick a chat tone (Flirty / Casual / Mischievous) → scripted two-sided chat plays out → bittersweet "we're from different universes" ending. After she finishes 5 conversations, a bonus "Match #∞" unlocks with a reveal that it was you all along.

---

## 1. Run it locally in VS Code

No install, no build step, no `npm install` needed for the app itself.

1. Open the `neuromatch` folder in VS Code.
2. Install the **Live Server** extension (by Ritwick Dey) from the Extensions tab, if you don't have it.
3. Right-click `index.html` → **Open with Live Server**.
4. It'll open in your browser at `http://127.0.0.1:5500`. Resize your browser window narrow (or open dev tools device toolbar, e.g. iPhone 14) to see it mobile-sized — it's designed mobile-first and will center itself in a "phone frame" on wider screens.

If you don't want to use an extension, any static file server works, e.g. from a terminal in the folder:
```
python3 -m http.server 8080
```
then open `http://localhost:8080`.

---

## 2. Personalize it

**`js/config.js`** — the one file you'll definitely want to edit:
- `HER_NAME` — shown in the face-scan and welcome screen. Currently a placeholder.
- `YOUR_SIGNOFF` — your name/nickname, used in the bonus finale message.
- `REVEAL_UNLOCK_COUNT` — how many finished conversations unlock the bonus finale (default 5 of 14).
- `REVEAL_PHOTO` — optional path to a real photo of you for the finale reveal.

**`js/data.js`** — all the character profiles and chat scripts. Each entry in `MATCHES` has a `bio`, `tags`, an `opener` (shared sweet intro), `tones.flirty` / `tones.casual` / `tones.mischievous` (only one plays, whichever she picks), and a `closer` (the bittersweet goodbye). Edit any text freely — it's just arrays of `{ from: "match" | "her", text: "..." }` objects.

### Adding your real cosplay photos
Right now every card shows a placeholder (a big emoji + "photo coming soon" badge) so the app is fully functional without any images.

To swap in a real photo for a character:
1. Drop the image into `assets/photos/` (create that folder), e.g. `assets/photos/ember.jpg`.
2. In `js/data.js`, find that character's entry and set `photo: "assets/photos/ember.jpg"`.
3. Portrait orientation (roughly 3:4) works best with the card layout. Keep each file under ~300KB so it loads fast on mobile data — any photo editor's "export for web" or a quick `sips -Z 1000 photo.jpg` (Mac) / online compressor works fine.

Leave `photo` unset (or `null`) for any character you haven't shot yet — the placeholder looks intentional, not broken.

---

## 3. Deploy to Azure (free)

**Azure Static Web Apps' Free tier costs $0/month** — 100 GB of bandwidth and free SSL, which is wildly more than one person swiping on their phone will ever use. This is a static site with no server, so there's genuinely no ongoing cost here.

### Current setup: GitHub-connected deploy (this repo)

This repo is already connected to an Azure Static Web App via GitHub Actions — Azure committed a workflow file at `.github/workflows/azure-static-web-apps-*.yml` when it was set up. That means:

- **`git push` (or merging a PR) to `main` is the whole deploy process.** No manual commands needed.
- Every push to `main` kicks off the `Azure Static Web Apps CI/CD` workflow, which builds (no real build step for a static site) and uploads the site.
- Every pull request against `main` also gets its own temporary preview deployment, which is automatically torn down when the PR closes.

**How to know when a deployment is done:** go to the repo's **Actions** tab on GitHub.
- A yellow/orange dot = still running.
- A green check = deployed successfully — that push is now live.
- A red X = it failed; click into the run to see which step errored (usually a bad token or a syntax issue in the workflow file itself, not your site code).

Deploys of this static site are fast — typically under a minute (see the `50s` / `1m 8s` durations in the Actions history). Once it's green, refresh your live URL (Azure Portal → the Static Web App resource → **Overview** → **URL**, or `*.azurestaticapps.net`) to see the change.

### Alternative: deploy straight from your machine (no GitHub needed)

Useful if you ever want to push a one-off change without going through Git, or you're setting this up fresh without connecting GitHub at all.

1. **Install the Azure CLI** if you don't have it: https://learn.microsoft.com/cli/azure/install-azure-cli
2. Log in:
   ```
   az login
   ```
3. Find your existing Static Web App's name (Azure auto-generates one like `calm-cliff-00f3a0b0f` when connected via the Portal/GitHub flow — it won't necessarily be `neuromatch-app`):
   ```
   az staticwebapp list -o table
   ```
   Or, to create a brand new one from scratch instead:
   ```
   az group create --name neuromatch-rg --location eastus2

   az staticwebapp create \
     --name neuromatch-app \
     --resource-group neuromatch-rg \
     --location eastus2 \
     --sku Free
   ```
4. Get the deployment token (a secret key that lets you push files to it):
   ```
   az staticwebapp secrets list --name <your-app-name> --resource-group <your-resource-group> --query "properties.apiKey" -o tsv
   ```
5. From inside the project folder, deploy the files directly using the SWA CLI (this runs via `npx`, no permanent install needed):
   ```
   npx @azure/static-web-apps-cli deploy ./ --deployment-token <paste-token-here> --env production
   ```
6. It'll print your live URL. Open it on her phone (text her the link, or generate a QR code for it) and you're done.

**Note:** if this app is already GitHub-connected (see above), the next automatic push-triggered deploy will simply overwrite whatever you push manually — so pick one method as your primary path to avoid confusing yourself about which version is live.

### Optional: custom domain
Both paths support attaching a custom domain for free SSL if you own one (e.g. `ourlittlecorner.com`) — do this from the Static Web App's **Custom domains** blade in the Azure Portal. Entirely optional; the default `*.azurestaticapps.net` URL works fine and costs nothing.

---

## 4. A few notes

- **Progress is saved locally on her phone** (via `localStorage`) — if she closes the tab and comes back later, her swipes and finished conversations are still there. There's a small reset icon (↻) top-right if she wants to start fresh.
- **"Add to Home Screen"** works out of the box (there's a `manifest.json` + icon) — on iPhone: Share → Add to Home Screen. It'll launch full-screen like a real app, no browser chrome.
- Everything is scripted and hardcoded — there's no API key, no AI calls, no data collection. It's just HTML/CSS/JS reacting to taps.
