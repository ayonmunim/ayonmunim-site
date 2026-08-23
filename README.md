# Ayon Munim — Portfolio

Personal portfolio site of MD Munim Ahmed (Ayon Munim) — bio, projects, awards, press/media, and experience.

Built with **React 19**, **TanStack Start**, **Vite 7**, **Tailwind CSS v4**, and **shadcn/ui**.

## Requirements

- [Bun](https://bun.sh) 1.1+ (recommended) or Node.js 20+
- Git

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/ayonmunim/<repo-name>.git
cd <repo-name>

# 2. Install dependencies
bun install
# or: npm install
```

## Environment variables

Create a `.env` file in the project root if you need backend features:

```bash
# Optional — only required when backend/AI features are used
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

The site renders fully without these values.

## Run locally

```bash
bun run dev
```

The app starts at http://localhost:8080

## Available scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Start the dev server with hot reload |
| `bun run build` | Production build |
| `bun run preview` | Preview the production build locally |
| `bun run lint` | Run ESLint |
| `bun run format` | Format the codebase with Prettier |

## Project structure

```
src/
├─ routes/                 # File-based routes (TanStack Router)
│  ├─ __root.tsx           # App shell + head metadata
│  └─ index.tsx            # Home page
├─ components/portfolio/   # Hero, Bio, Projects, Awards, Media, Experience, Footer
├─ data/                   # Resume and project content
├─ assets/                 # Images, awards, press
└─ styles.css              # Tailwind v4 theme tokens
```

## Deployment

Any static/edge host works. Build with `bun run build` and deploy the generated output.

## License

All rights reserved © Ayon Munim 2026.
