# Microfyxd — Give me the problem. I'll handle it.

A precision‑built Next.js platform engineered for real‑world micro‑problem automation, designed with operator‑grade clarity and zero noise.

**Live:** [https://microfyxd-site.vercel.app](https://microfyxd-site.vercel.app)

## What is Microfyxd?

Microfyxd is your tactical problem‑solver. We handle three core areas:

- **Bureaucratic & Admin** — Forms, appeals, disputes, letters, documentation. We turn red tape into checklists and get it done.
- **Digital & Technical** — Accounts, logins, setups, troubleshooting, workflows. If it lives on a screen, we can stabilize it.
- **Life Operations** — Scheduling, research, planning, coordination. You tell us the outcome; we map the path.

No fluff. No vague promises. You submit the problem, we return a concrete path or a completed result.

## Project Structure

```
microfyxd-site/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page (renders Hero component)
│   ├── layout.tsx         # Root layout with metadata
│   └── globals.css        # Global styles
├── components/
│   └── Hero.tsx           # Hero section component
├── public/                # Static assets
├── package.json           # Dependencies
├── tailwind.config.ts     # Tailwind CSS config
├── tsconfig.json          # TypeScript config
└── README.md              # This file
```

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) — React with server-side rendering
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com) — Utility-first CSS
- **Font:** [Geist](https://vercel.com/font) — Modern typeface from Vercel
- **Language:** TypeScript — Type-safe JavaScript
- **Hosting:** Vercel — Optimized for Next.js deployments

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/craighindle5-peckerwood23/microfyxd-site.git
cd microfyxd-site

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result. The page will auto-update as you edit files.

### Build

```bash
npm run build
npm start
```

## Components

### Hero Component
**Location:** `components/Hero.tsx`

The main landing page component featuring:
- Bold headline: "Any task. Any problem. Fixed."
- Dual call-to-action buttons
- Three service category cards
- Operator-grade execution section
- Responsive design with dark mode support
- Tailwind CSS utility classes

**Key Features:**
- Gradient text effects
- Hover states on cards and buttons
- Mobile-first responsive layout
- Dark/light theme support
- Semantic HTML structure

## Design Philosophy

**Operator-grade clarity.** Every element serves a purpose. No decorative fluff. The design communicates value immediately and guides users toward action.

- **Hierarchy:** Bold headlines, clear hierarchy, obvious CTAs
- **Simplicity:** Minimal colors (black, white, zinc, blue/cyan accents)
- **Responsiveness:** Works seamlessly on mobile, tablet, and desktop
- **Accessibility:** Semantic HTML, sufficient contrast, keyboard navigation

## Related Projects

- **[bestMicrofyxdweb](https://github.com/craighindle5-peckerwood23/bestMicrofyxdweb)** — Original static site version
- **[microfyxd-backend](https://github.com/craighindle5-peckerwood23/microfyxd-backend)** — Backend structure (TypeScript)
- **[Microfyxd](https://github.com/craighindle5-peckerwood23/Microfyxd)** — Core project repository

## Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy is using [Vercel Platform](https://vercel.com):

1. Push your changes to GitHub
2. Connect the repository to Vercel
3. Vercel automatically detects Next.js and configures build settings
4. Your site deploys on every push to `main`

[Deploy this project](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app)

### Self-Hosted

For other hosting options:

```bash
npm run build
npm start
```

Then configure your hosting platform to serve the `.next` directory.

**See:** [Next.js Deployment Documentation](https://nextjs.org/docs/app/building-your-application/deploying)

## Development

### Code Style
- ESLint configuration included
- TypeScript for type safety
- Tailwind CSS for styling (no inline styles)

### Running Linter

```bash
npm run lint
```

### Editing the Hero Page

To customize the hero section:

1. Edit `components/Hero.tsx`
2. Update the headline, description, or service cards
3. Modify button links to point to actual pages
4. Changes reflect immediately in development mode

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Learning](https://nextjs.org/learn)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

## License

This project is part of the Microfyxd ecosystem.

## Support

For issues or questions:
- GitHub Issues: [microfyxd-site/issues](https://github.com/craighindle5-peckerwood23/microfyxd-site/issues)
- Contact: Check your related projects for support channels

---

**Microfyxd** — tactical problem‑solving on demand.