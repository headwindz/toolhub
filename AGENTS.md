# AGENTS

This repository is maintained with automated coding agents. Use the guidance below when making changes.

## Scope

- Prefer small, focused changes and keep diffs minimal.
- Preserve existing code style and public APIs unless a change explicitly requires updates.
- Avoid formatting-only edits.
- Prefer incremental, reversible changes.
- Keep UI/UX consistent with existing tools.

## Project notes

- Framework: Next.js app router with TypeScript.
- Package manager: Pnpm.
- Tools live under `app/tools/<tool-name>` with a `page.tsx` entry.
- Shared UI components live under `components/`.
- Tool metadata is in `constants/`.
- Global styles live in `app/globals.css` and `styles/globals.css`.
- Shared layout and navigation live in `components/`.

## Conventions

- Use functional React components.
- Keep UI responsive and accessible.
- Prefer client-side processing for tool logic when feasible.
- Use TypeScript types for props and tool state.
- Reuse existing UI components from `components/ui` before adding new ones.
- Follow existing naming and folder conventions for tool files (e.g., `knowledge.tsx`, `utils.ts`).

## Running

- Install: `pnpm install`
- Dev: `pnpm dev`
- Build: `pnpm build`
- Start: `pnpm start`

## Typical tool structure

- `page.tsx`: Main UI and layout for the tool.
- `knowledge.tsx`: Optional educational content for the tool.
- `utils.ts` or `<tool>.ts`: Shared logic and helpers.
- Small, focused components may live next to the tool.

## Editing guidance

- Update `constants/tools.tsx` when adding, removing, or renaming tools.
- Keep tool routes stable; avoid breaking URL paths.
- Use the existing `ToolLayout` when possible to maintain consistent layout and SEO.
- Ensure buttons, inputs, and forms use shared UI components.
- Prefer controlled inputs and debounced updates for heavy computations.

## Quality checklist

- The tool page renders without console errors.
- Inputs handle empty and invalid states gracefully.
- Results update quickly and predictably.
- Copy and download actions use existing `CopyButton` when applicable.
- Accessibility: labels for inputs and proper button semantics.

## Content and copy

- Keep labels short and clear.
- Prefer sentence case for headings and labels.
- Use concise helper text; avoid long paragraphs in the UI.

## Tests and Validation

- There is no formal test suite; rely on type checks and manual verification.
- Run `pnpm build` if a change is large or touches shared components.

## Write content or comments

- Use sentence case (only first letter capitalized)
- Correct: `## Getting started`, `### Using the API`
- Incorrect: `## Getting Started`, `### Using The API`
