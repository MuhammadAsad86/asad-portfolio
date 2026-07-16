# Muhammad Asad — Portfolio

A premium, animated personal portfolio built with **React (Vite)**, **Tailwind CSS v4**, and **Framer Motion** for Muhammad Asad, MERN Stack Developer.

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4 (CSS-first `@theme` config, no `tailwind.config.js` needed)
- Framer Motion (all animation)
- React Icons
- React Router (home + 404 route)
- EmailJS (contact form)

## Features

- Animated hero with typing effect, canvas particle background and gradient blobs
- Dark / light mode with `localStorage` persistence
- Custom cursor (desktop only), scroll progress bar, back-to-top button
- Loading screen on first load
- Skills with animated progress bars, grouped by category
- Projects grid with **category filter + live search**
- Experience/education timeline + live **GitHub stats** (via github-readme-stats)
- Certificates grid
- Contact form with validation, loading/success/error states, EmailJS integration (falls back to a `mailto:` link if EmailJS isn't configured yet — the form always works)
- Embedded Google Map, resume download button
- SEO: meta tags, Open Graph, Twitter Card, JSON-LD `Person` schema, `robots.txt`
- Error boundary + custom 404 page
- Fully responsive from 320px to 4K
- Respects `prefers-reduced-motion`

## Getting Started

```bash
npm install
npm run dev       # start local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
npm run lint       # oxlint (fast, ESLint-rule-compatible)
```

## Connecting the Contact Form (EmailJS)

The form works out of the box using a `mailto:` fallback. To send messages directly without opening the user's email client:

1. Create a free account at [emailjs.com](https://www.emailjs.com).
2. Add an **Email Service** (e.g. Gmail) and a **Template** with `from_name`, `from_email`, `message` variables.
3. Copy `.env.example` to `.env` and fill in your IDs:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

4. Restart `npm run dev`. Real emails will now be sent through EmailJS.

## Project Structure

```
src/
  components/
    sections/     Hero, About, Skills, Projects, Experience, Certificates, Contact, GithubStats
    ui/            CustomCursor, ScrollProgress, BackToTop, LoadingScreen, SectionHeading, ParticleBackground
    Navbar.jsx, Footer.jsx, ErrorBoundary.jsx
  pages/           Home.jsx, NotFound.jsx
  hooks/           useTypingEffect, useScrollProgress, useActiveSection, useCountUp
  data/            skills.js, projects.js, experience.js
  context/         ThemeContext.jsx
  utils/           sendEmail.js
  index.css        Tailwind v4 theme tokens + global styles
public/
  images/profile.png
  Muhammad_Asad_CV.pdf
```

## Customizing Content

All personal content lives in `src/data/*.js` — edit these files to update skills, projects, experience, and certificates without touching components. Colors and fonts are defined once in `src/index.css` under the `@theme` block.

## Deployment

**Vercel**
```bash
npm i -g vercel
vercel
```
`vercel.json` is already configured for SPA routing.

**Netlify**
- Build command: `npm run build`
- Publish directory: `dist`
- `public/_redirects` is already set up for SPA routing.

**GitHub Pages**
```bash
npm run build
# push the dist/ folder to a gh-pages branch, or use the gh-pages package
```

## Notes on the "95+ Lighthouse" targets

The site is built lean (code-split by Vite, lazy-loaded images, system-font fallbacks, semantic HTML, ARIA labels on icon buttons, visible focus states) to make hitting 95+ Performance/Accessibility/Best-Practices and 100 SEO realistic. Actual scores depend on your hosting/CDN — run Lighthouse against your deployed URL and tune image sizes if needed.

---

Built by Muhammad Asad — MERN Stack Developer, Multan, Pakistan.
