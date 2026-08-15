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

### Easiest path: deploy straight from your machine (no GitHub needed)

1. **Install the Azure CLI** if you don't have it: https://learn.microsoft.com/cli/azure/install-azure-cli
2. Log in:
   ```
   az login
   ```
3. Create a resource group (a free-form container for the resource) and the Static Web App itself:
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
   az staticwebapp secrets list --name neuromatch-app --resource-group neuromatch-rg --query "properties.apiKey" -o tsv
   ```
5. From inside the `neuromatch` folder, deploy the files directly using the SWA CLI (this runs via `npx`, no permanent install needed):
   ```
   npx @azure/static-web-apps-cli deploy ./ --deployment-token <paste-token-here> --env production
   ```
6. It'll print your live URL — something like `https://neuromatch-app.azurestaticapps.net`. Open it on her phone (text her the link, or generate a QR code for it) and you're done.

To push an update later (new photos, edited scripts), just re-run the `npx ... deploy` command from step 5.

### Alternative: GitHub-connected deploy (better if you'll keep tweaking it over time)

1. Push this folder to a new GitHub repo (can be private).
2. In the [Azure Portal](https://portal.azure.com), create a resource → **Static Web App**.
3. Choose the **Free** plan, connect your GitHub account, and select the repo/branch.
4. Build details: **App location** = `/`, **Output location** = leave blank (no build step).
5. Azure automatically commits a GitHub Actions workflow to your repo that deploys on every push to that branch — from then on, `git push` is your whole deploy process.

### Optional: custom domain
Both paths support attaching a custom domain for free SSL if you own one (e.g. `ourlittlecorner.com`) — do this from the Static Web App's **Custom domains** blade in the Azure Portal. Entirely optional; the default `*.azurestaticapps.net` URL works fine and costs nothing.

---

## 4. A few notes

- **Progress is saved locally on her phone** (via `localStorage`) — if she closes the tab and comes back later, her swipes and finished conversations are still there. There's a small reset icon (↻) top-right if she wants to start fresh.
- **"Add to Home Screen"** works out of the box (there's a `manifest.json` + icon) — on iPhone: Share → Add to Home Screen. It'll launch full-screen like a real app, no browser chrome.
- Everything is scripted and hardcoded — there's no API key, no AI calls, no data collection. It's just HTML/CSS/JS reacting to taps.
