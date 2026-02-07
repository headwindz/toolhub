# Toolhub

![toolhub](https://github.com/user-attachments/assets/82538cc2-203c-49b1-a98d-726a7e08090f)

[toolhub.run](https://toolhub.run/)

Toolhub is a collection of fast, privacy‑friendly web utility tools. The goal is to provide small, focused tools that run fully in the browser whenever possible, minimizing data transfer and keeping workflows snappy. It is designed for developers, designers, and everyday users who need quick, reliable utilities such as formatters, generators, converters, and lookups.

## Features

- 🧩 Modular tool pages and shared UI components
- 🌗 Theme support
- ✅ TypeScript throughout
- 🔒 Privacy‑friendly, client‑first approach where feasible
- 📚 Knowledge sections to explain concepts behind tools

## Tech stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind css
- Pnpm

## Getting started

### Prerequisites

- Node.js 18+
- Pnpm 8+

### Install

```bash
pnpm install
```

### Run in development

```bash
pnpm dev
```

### Build and start

```bash
pnpm build
pnpm start
```

## Project structure

```bash
app/                  # App Router pages and layouts
	tools/              # Individual tools
components/           # Shared UI components
constants/            # Tool metadata and categories
lib/                  # Utilities
public/               # Static assets
styles/               # Global styles
```

## Tool coverage

Toolhub includes (but isn’t limited to):

- Encoding and conversion utilities
- Formatters and validators
- Generators (UUID, password, QR, etc.)
- Inspectors and parsers (JSON, JWT, URL, user-agent)
- Visual aids (color tools, SVG preview)
- Learning and practice tools (quizzes, typing exercises)

## Adding a new tool

1. Create a new folder under `app/tools/<tool-name>`.
2. Add a `page.tsx` entry point.
3. (Optional) Add a `knowledge.tsx` for documentation content.
4. Register the tool in `constants/tools.tsx` and assign a category in `constants/categories.tsx` if needed.

## Deployment

This project is ready for deployment on Vercel or any platform that supports Next.js.

## Attributes

Powered by [v0.app](https://v0.app) and [GitHub Copilot](https://github.com/features/copilot)
