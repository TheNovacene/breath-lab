# Breath Lab

Breath Lab is a small, focused nervous system dashboard built with React, Vite, Tailwind CSS, and canvas animations.

It offers guided breath patterns with soft, symbolic visuals — designed for learners, parents, and educators who need a quick way to regulate **without noise, ads, logins, or behavioural capture**.

Live demo: https://thenovacene.github.io/breath-lab/

---

## Features

- 🔄 Multiple breath patterns:
  - 4–4–6 (Calming)
  - 4–7–8 (Sleep)
  - Box breathing (4–4–4–4)
  - Power / energising breaths
  - Coherent breathing (5–5) and anxiety-focused patterns
- 🎨 Animated canvas visualisations (spiral, moon, box, wave, heart, fire, shield)
- 📱 Responsive layout (desktop + mobile)
- 🧠 Gentle, non-gamified interface focused on regulation, not metrics

---

## Data + consent

Breath Lab is designed as **consent-first, low-data infrastructure**.

- **No accounts.** No logins, profiles, or user IDs.
- **No tracking by Breath Lab.** Breath Lab does **not** collect or store breathing history, usage patterns, biometrics, or behavioural data.
- **No analytics (by default).** This project does not include analytics libraries.
- **No notifications.** Breath Lab will not nudge, ping, or pull you back in.
- **Local-only state.** If the app remembers preferences (e.g. last-selected pattern), this should be via local device storage only (e.g. `localStorage`) and not transmitted anywhere.

### Note on hosting logs (GitHub Pages)

If you use the live demo via GitHub Pages, GitHub (like any host) may process standard server logs and basic operational data. Breath Lab itself does not add extra tracking on top.

If you fork and self-host, you control the hosting layer and can choose an approach aligned with your own data posture.

---

## Tech stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/)

---

## Getting started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Install dependencies

```bash
npm install
```
Run the dev server
```bash
Copy code
npm run dev
```
Then open the printed localhost URL in your browser.

##Build for production
```bash
Copy code
npm run build
```
Preview the production build
```bash
Copy code
npm run preview
```
## Deployment
This repo is configured to deploy to GitHub Pages using GitHub Actions.

Vite base is set to /breath-lab/ in vite.config.js

The workflow file lives at .github/workflows/deploy.yml

On every push to main, the site builds and deploys to:

https://thenovacene.github.io/breath-lab/

## Licence
All code and content in this repository are shared under:

Creative Commons Attribution–NonCommercial–ShareAlike 4.0 International (CC BY-NC-SA 4.0)

This means you are free to:

Share — copy and redistribute the material in any medium or format

Adapt — remix, transform, and build upon the material

Under the following terms:

Attribution — Give appropriate credit and link back here.

NonCommercial — You may not use the material for commercial purposes.

ShareAlike — If you remix, transform, or build upon it, you must distribute your contributions under the same licence.

Full legal code: https://creativecommons.org/licenses/by-nc-sa/4.0/

## Health disclaimer
Breath Lab is a calming/educational tool, not medical advice.

It is not a substitute for professional mental health or medical support.

If you have respiratory, cardiovascular, or anxiety-related conditions, use with care.

Stop immediately if you feel dizzy, distressed, or unwell, and seek appropriate help.

## Contributing
Pull requests and forks are welcome, especially if you:

Improve accessibility or clarity of cues

Add trauma-informed options or educator notes

Extend the visuals while keeping the interface calm and non-addictive

By contributing, you agree that your contributions will be licensed under the same CC BY-NC-SA 4.0 licence.
