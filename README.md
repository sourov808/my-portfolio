# Next.js Developer Portfolio

A modern, responsive, and visually accessible developer portfolio built with Next.js and Tailwind CSS.

## 🚀 Core Features

- **Modern Tech Stack**: Built with [Next.js](https://nextjs.org/) (App Router), React, and [Tailwind CSS](https://tailwindcss.com/) for rapid and scalable UI development.
- **Theme Toggling**: First-class support for both Light and Dark modes. Light mode is set as the default, with user preferences saved seamlessly using `localStorage` and a custom `ThemeContext`.
- **Responsive Design**: Fully optimized across all screen sizes (mobile, tablet, desktop) using Tailwind's utility classes.
- **SEO Optimized**: Pre-configured metadata in the root layout including Open Graph tags, Twitter cards, keywords, and description for better visibility and sharing.
- **Dynamic Sections**:
  - `Hero`: Catchy introduction.
  - `About`: Personal background and professional journey.
  - `Skills`: Highlighted technical competencies (frontend, backend, tools).
  - `Projects`: Showcases of previous work with links and images.
  - `Timeline/Experience`: Chronological professional history.
  - `Contact`: A clean semantic form for getting in touch, accompanied by styled social links.
- **Creative Branding**: Uses custom typography (`Inter` and `Space Grotesk` from `next/font`), deep gradients, and a bespoke SVG animated favicon.

## ⚙️ Quick Start

First, install the necessary dependencies:

```bash
npm install
# or
pnpm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `app/`: Next.js App Router files, global CSS (`globals.css`), and the root layout (`layout.tsx`).
- `app/components/`: Reusable React components that make up the different sections of the portfolio.
- `app/context/`: Contains React context providers, such as the `ThemeContext` for managing light/dark mode variations.
- `public/`: Static assets like images and the custom `favicon.svg`.

## 🛠️ Customization

To personalize this portfolio:

1. Update `app/layout.tsx` to reflect your name and SEO metadata.
2. Edit the components in `app/components/` (like `Hero.tsx`, `About.tsx`, `Projects.tsx`) with your own information and images.
3. Update brand colors in `tailwind.config.ts` or `app/globals.css`.


