# Little Desk

A cozy room builder, daily planner and focus space by Audrey.

- **Your room:** move objects with a mouse, touch or arrow keys; select one to store it away, then place it again from Storage. Pip sits on the desk and the chair is tucked aside. Saved positions appear in wallpaper exports.
- **Your mood:** 16 palettes grouped into Light & airy and Deep & cozy, plus a slider-built custom palette. Walls, curtains, furniture and interface follow the palette.
- **Your plan:** ten editable starter tasks, School / Work / Home / Personal categories, and up to 60 tasks.
- **Your focus:** arbitrary whole-minute focus lengths from 1–180 minutes; short/long breaks from 1–90. Pause, resume and reload paused. Settings are saved.
- **Your rewards:** 23 collectible items including a free, movable Pip. Ticks earn no coins. Focus sessions of at least ten minutes plus a reflection earn capped coins (maximum 60 daily). Shorter sessions still record progress. Coins have no cash value.
- **Your companion:** Pip, an original little sprout with optional encouragement and practical tips.
- **Your laptop:** choose from five wallpapers, pick a colour, add a caption or upload your own PNG/JPEG/WebP. Photos are resized locally and stored with the room; no photo is uploaded as source code.
- **Your soundtrack:** a collapsible corner player with locally generated soft keys, rain, forest and brown noise, plus official Spotify embeds for playlist/album/song links. Nothing autoplays.
- **Your exports:** a 2560 × 1600 PNG of your arranged room, including your laptop wallpaper, and an A4 planner matching your theme.
- **Little Timetable:** a new, separately branded copy of the timetable app, with its original schedule/homework functions. Its own storage key protects the original app's saved plan.
- **Little Focus:** a separate window-and-landscape music retreat with a large customizable timer, a soundtrack panel, rain and fullscreen controls. It has no desk builder, shop or task board. Focus reflections save into the guest-room record.

The original `23akoh/AceMyGCSEs` and `23akoh/lofi` repositories are separate from this project.

## Run and edit

Serve this folder with `python3 -m http.server 8000`, then open `http://localhost:8000`.
No dependency installation or API key is needed for guest mode.

| File | Purpose |
| --- | --- |
| `index.html`, `styles.css` | Desk structure and styles |
| `suite.js` | Shared palettes, categories and item catalog |
| `model.js` | Task, reward, purchase, migration and placement rules |
| `scene.js` | Original SVG illustration and collectible art |
| `app.js` | Desk interface, dragging, custom colours, laptop wallpapers, timer and exports |
| `music-widget.html`, `music.js` | Shared soundtrack controls, generated audio and Spotify embeds |
| `focus-template.html`, `focus.css`, `focus.js` | Independent lofi retreat structure, styling and timer |
| `planner.js` | Dependency-free PDF generator |
| `cloud.js`, `cloud-schema.sql` | Optional managed accounts and per-user room access |
| `timetable.html`, `focus.html` | Separate companion pages |

`node checks.cjs` runs the model's failure-case checks. `node build-suite.cjs`
regenerates the portable desk and the independent focus page from `focus-template.html`. The pages share `music-widget.html`, `music.js` and palette/model code. Runtime assets receive content-hash query versions so returning visitors get the current code.
`python3 build-timetable.py` regenerates the themed timetable from the retained
public original. Rebuild both companion pages after changing shared palettes or
account configuration.

## Accounts: integration prepared, not enabled

Guest mode works now. Real sign-up, sign-in, password recovery and cloud save/load
require a connected Supabase project. No passwords are collected by the
unconfigured preview. There is no fake local-password login.

Apply `cloud-schema.sql` to that project. It enables Row Level Security and allows
signed-in users to read/write only their own room. Set the project URL and **public
publishable key** in `cloud.js`; never put a secret or service-role key in browser
code. Configure the actual site URL and allowed email-confirmation/recovery redirect
URLs in Supabase. Rebuild the focus page, then test two separate users and password
recovery before enabling accounts for others.

Cloud save/load is explicit. Signing out restores the guest room; account rooms use
separate local keys. Guest data is per browser/origin. Back it up before clearing
browser storage. Timers resume paused after reload. Only personal progress is tracked:
client-controlled timers and coins cannot prove that someone actually did the work.

[Supabase authentication documentation](https://supabase.com/docs/guides/auth/passwords)
· [Public keys and RLS](https://supabase.com/docs/guides/getting-started/api-keys)

## Assets and authorship

Concept and direction: Audrey. Initial implementation and original SVG artwork are
AI-assisted. Future personal changes and learning should be described accurately in
portfolio notes. Fonts load from Google Fonts with system fallbacks. Spotify loads
only after the visitor requests it. There are no analytics or payments in this build.

This is a free portfolio prototype. GitHub Pages is not suitable for running an
online shop or commercial SaaS; review its [usage policy](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
before commercialising the product. No open-source license has been selected.

Spotify playlist playback uses its official embed. This build does not claim a Spotify OAuth connection or private-library import. A full [Spotify Web Playback integration](https://developer.spotify.com/documentation/web-playback-sdk/howtos/web-app-player/) requires a registered application, user authorization and Premium. Visitors can sign in through Spotify’s own player or open Spotify alongside their desk.
