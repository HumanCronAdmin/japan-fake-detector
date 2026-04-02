# Japan Fake & Scam Detector for Goods — MVP Spec
<!-- APPROVED 2026-04-01 -->

## Basic Info
- **Name:** Japan Fake & Scam Detector
- **One-liner:** Searchable whitelist/blacklist of shops selling Japanese goods (figures, clothing, trading cards, misc) so overseas buyers avoid fakes and scams.
- **Need:** Reddit 229 upvotes / 173 comments across 8 posts — buyers cannot tell trusted shops from scam sites.
- **Type:** Static site
- **Deploy:** GitHub Pages (`humancronadmin/japan-fake-detector`)

---

## Code to Use

### Main: japan-scam-checker (own repo)
- **URL:** `https://github.com/humancronadmin/japan-scam-checker`
- **Why:** Same search-UI + filter + JSON-DB pattern. Proven, deployed.
- **License:** Own code

### GitHub Search: No usable external repos found
3 queries (`fake product checker`, `bootleg detector anime`, `counterfeit product database`) — 0 relevant results.

---

## Build Steps

### Step 1: Copy from japan-scam-checker
Copy `index.html`, `data/`, `favicon.svg`, `manifest.json`, `sw.js`, `track.js`, `robots.txt`, `sitemap.xml`.

### Step 2: File Changes

| File | Change |
|------|--------|
| `index.html` | Rewrite per HTML structure in `build_details.txt` |
| `data/shops.json` | New — whitelist + blacklist (schema in `build_details.txt`) |
| `data/guides.json` | New — fake-spotting guides per category (schema in `build_details.txt`) |
| `favicon.svg` | New icon (shield + magnifying glass) |
| `manifest.json` | Update name/description/colors |
| `sitemap.xml` | Update URLs |

### Step 3: Data Collection
Sources and schema details in `build_details.txt`. Key points:
- Whitelist: BuyFags Guide (70+ shops), r/AnimeFigures wiki, MFC shop list
- Blacklist: Reddit scam threads (Anime Ape, SORA clothing, Kazemode, etc.)
- Guides: MFC Bootleg Finders, Solaris Japan blog, Neokyo guide
- **Every URL must return HTTP 200 before inclusion**

### Step 4: Deploy
GitHub Pages on `main` branch root. Commands in `build_details.txt`.

---

## Update Mechanism
- **User reports:** Google Form linked in footer (same pattern as japan-scam-checker)
- **Monthly review:** Form responses + Reddit threads, update shops.json
- **Every entry has `last_verified` date** — stale data is visible to users

---

## Revenue Model
- **Initial:** Free (user acquisition via Reddit + SEO)
- **Revenue:** Affiliate links to trusted shops (AmiAmi, CDJapan, Solaris Japan). Each marked `(affiliate)` for transparency.
- **Supplementary:** Display ads after 10k/month traffic
- **6mo:** $30-50/mo | **12mo:** $100-340/mo

---

## Publish Info
- **URL:** `https://humancronadmin.github.io/japan-fake-detector/`
- **Target:** Overseas anime fans, Japanese fashion buyers, trading card collectors
- **Hook:** "Before you buy Japanese goods online, check if the shop is legit."
- **Subreddits:** r/AnimeFigures, r/MangaCollectors, r/AnimeMerchandise, r/PokemonTCG, r/Streetwear
- **note angle:** "How I built a fake goods detector for Japan shopping in 1 day"

---

## MVP Exclusions
- Photo comparison / image-based detection → full version
- User-submitted reviews / ratings → full version
- Chrome extension → full version
- Automated scraping / API blacklist updates → full version

## Risks
- **Accuracy:** Misjudging a shop harms credibility. Multiple sources required + prominent disclaimer.
- **Legal:** Blacklisted shops may complain. Cite public sources only, factual language, honor removal requests.
- **Staleness:** `last_verified` on every entry + monthly review cycle.

## Disclaimer (must appear on site)
> This tool provides community-sourced information for reference only — not guarantees. Always do your own research before purchasing. We are not responsible for any losses. Affiliate links are clearly marked.
