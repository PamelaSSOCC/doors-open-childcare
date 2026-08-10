# Doors Open Childcare — Richmond (static site)

Five pages, no build step, no dependencies. Just HTML/CSS/JS files you can open,
edit in any text editor, and host free on Cloudflare Pages.

```
index.html         Home / landing (open-door hero)
locations.html     Participating programs (+ optional map)
philosophies.html  Care philosophies explainer
event.html         The pro-D event
what-to-ask.html   Parent checklist
styles.css         Shared styling (all pages)
site.js            Mobile menu + renders the locations list
data.js            <-- your list of participating centres
```

## 1. Fill in the blanks first

Every spot that needs your input is highlighted in yellow on the page and marked
`[ LIKE THIS ]`. Search the files for `todo` or `[ ` to find them all. They are:

- Event **date, time, venue, cost, registration link** (in `index.html` and `event.html`)
- **Event email** — set to `hello@doorsopenchildcarerichmond.ca`. This address needs a mailbox before it can receive mail — set up free forwarding (see note below).
- **Session topics** on the pro-D page (`event.html`)
- **Participating centres** — edit `data.js` (see below)

## 2. Add your centres (`data.js`)

Open `data.js` and replace the three EXAMPLE blocks with your real programs — one
`{ }` block per centre, separated by commas. Leave a field as `""` to hide it.
The Locations page builds itself from this list; you never touch HTML for it.

## 3. Add the map (optional, recommended)

1. Go to **google.com/mymaps** → create a new map (free).
2. Search each centre's address and "Add to map".
3. Share → "Anyone with the link".
4. Menu (⋮) → "Embed on my site" → copy the `<iframe>`.
5. In `locations.html`, replace the `<div class="map-placeholder">…</div>` with that iframe.

## 4. Publish on Cloudflare Pages (free)

**Easiest — direct upload (no accounts to wire together):**
1. Create a free account at **dash.cloudflare.com**.
2. Left sidebar → **Workers & Pages** → **Create** → **Pages** → **Upload assets**.
3. Name the project (e.g. `open-doors`), then drag in **all the files in this folder**
   (the files themselves, not the folder). Click **Deploy**.
4. You're live at `https://open-doors.pages.dev` (free, HTTPS included).

To update later: same screen → **Create new deployment** → drag the files again.

**Custom domain (only cost is the domain, ~$12–18/yr):**
1. Buy a domain (Cloudflare Registrar, Porkbun, Namecheap — at-cost registrars).
2. In your Pages project → **Custom domains** → **Set up a domain** → enter it.
3. Follow the DNS prompt. If you bought it at Cloudflare it's basically automatic.

**Alternative — GitHub-connected (better if you'll edit often):**
Put this folder in a GitHub repo, then in Cloudflare Pages choose "Connect to Git".
Every push auto-deploys. More setup up front; less clicking later.

---
Content is original and editable. The affordability wording is deliberately framed as
"ask about" so it won't go stale as BC programs change.


## Email forwarding (free)
To make `hello@doorsopenchildcarerichmond.ca` actually reach you, use **Cloudflare Email Routing** (free): in the Cloudflare dashboard, pick your domain → **Email** → **Email Routing** → add a rule forwarding `hello@` to whatever inbox you already check. No mailbox hosting or cost required.
