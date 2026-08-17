# Doors Open Childcare — Richmond (static site)

Plain HTML / CSS / JS. No build step, no dependencies. Open and edit any file in a
text editor, and host it free on Cloudflare Pages.

## Files
```
index.html                   Home / landing
what-to-ask.html             Choosing Childcare (what to consider)
educational-approaches.html  Educational approaches explainer
locations.html               Participating programs — cards, day + approach filters, map
event.html                   Professional Development (pro-D) + passport
styles.css                   Shared styling (all pages)
site.js                      Mobile menu + renders and filters the locations list
data.js                      Your list of participating programs   <-- edit this
locations-for-map.csv        Import into Google My Maps to plot all programs at once
```

## Updating the list of programs
Edit `data.js` — one `{ }` block per program, the same fields each time. Leave any
field as `""` to hide it. The Locations page rebuilds itself; you never touch HTML.
**Photos:** drop each image in a `photos/` folder next to these files and put the
filename in that program's `photo:` field (landscape ~3:2 looks best).

## The map (Google My Maps — free, no API key)
1. Go to **google.com/mymaps** → **Create a new map** → **Import**.
2. Choose `locations-for-map.csv` → set **Address** as the location column and **Name** as the title.
3. **Share** → "Anyone with the link".
4. **⋮ menu → Embed on my site** → copy the `<iframe>`.
5. In `locations.html`, replace the `<div class="map-placeholder">…</div>` with that iframe.
(Every card also has a "Map ↗" link, so locations are clickable even before you embed the map.)

## The pro-D passport
`event.html` links to `passport.pdf`. Add that file to this folder so the
"Download your passport" button works.

## Publish / update on Cloudflare Pages (free)
**Direct upload — simplest:**
1. **dash.cloudflare.com** → **Workers & Pages** → **Create** → **Pages** → **Upload assets**.
2. Name the project, then drag in **all the files in this folder** (the files themselves, not the folder). **Deploy**.
3. You're live at `https://<name>.pages.dev` (HTTPS included).
4. **To update later:** open the same project → **Create new deployment** → drag the files in again.

**Custom domain:** Pages project → **Custom domains** → add `doorsopenchildcarerichmond.ca` → follow the DNS prompt.

**Prefer Git?** Put this folder in a GitHub repo and choose "Connect to Git" in Pages —
every push then auto-deploys.
