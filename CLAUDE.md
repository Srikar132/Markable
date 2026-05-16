# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server with HMR
npm run build     # tsc -b && vite build
npm run lint      # ESLint
npm run preview   # preview production build
```

No test framework configured.

## Stack

React 18 + TypeScript + Vite. Tailwind CSS + shadcn/ui (Radix primitives). Marked + Highlight.js + DOMPurify for markdown rendering. Path alias `@` → `src/`.

## Architecture

Single-page markdown editor. State lives in `App.tsx` as a single `useState` string, persisted to `localStorage.MARKDOWN`.

**Data flow:** user types → `Editor` textarea → App state → `Preview` renders sanitized HTML

Key files:
- `src/App.tsx` — root state, grid layout (1-col mobile / 2-col desktop)
- `src/components/Editor.tsx` — textarea, controlled input
- `src/components/Preview.tsx` — marked.Renderer + highlight.js + DOMPurify → `dangerouslySetInnerHTML`
- `src/components/Header.tsx` — save (drawer) + clear (alert-dialog) actions with hover tooltips
- `src/lib/utils.ts` — default markdown guide shown to new users

## Styling

Dark mode via Tailwind `class` strategy. Custom CSS vars for colors in `index.css`. Markdown preview styles (code blocks, blockquotes, headings) also in `index.css`, not component-scoped.
