# Portfolio Project - AI Coding Agent Instructions

## Project Overview

A responsive, personalized portfolio website built with React + TypeScript, showcasing projects, skills, and contact details. Uses Vite for bundling, SCSS for styling, and i18next for internationalization.

## Architecture

### Directory Structure & Ownership

- **`src/pages/`** - Page-level components (Landing, About, Contact, Causes) mounted in `App.tsx` via `AppLayout`
- **`src/components/`** - Reusable UI components with BEM-based SCSS scoping
- **`src/base/`** - Constant definitions, enums, and TypeScript types for domain objects
- **`src/assets/scss/`** - Global SCSS variables, mixins, and utilities
- **`src/config/`** - Configuration (i18n setup, environment detection)
- **`src/common/utils/`** - Shared utility functions

### Key Design Patterns

**Component Structure**: Each component lives in `src/components/<ComponentName>/` with three files:

```
ComponentName/
  ├── index.ts (exports component)
  ├── ComponentName.tsx (component logic)
  └── ComponentName.scss (scoped styles)
```

**Path Aliases**: Vite aliases in `vite.config.ts` enable clean imports:

- `@components`, `@pages`, `@assets`, `@config`, `@base`, `@common`

**Styling with SCSS**:

- BEM naming convention (e.g., `app-layout__content`)
- Z-index layering via `_variables.scss` ($z-index--l0 to l6)
- Global SCSS imports available in all component files
- Color, typography, and mixin definitions in `src/assets/scss/`

**Internationalization**: i18next with HTTP backend

- Locale files: `public/locales/[language]/common.json`
- Usage: `useTranslation('common')` hook in components
- Environment check in `src/config/i18n.ts` handles dev/prod modes

## Critical Patterns & Conventions

### Type System

- Domain types (e.g., `Skill`) defined in `src/base/type/` with clear interfaces
- Icon types from `@hugeicons/react` (IconSvgElement)
- Use TypeScript's `type` keyword for type aliases

### Utilities

- **classnames.ts**: Custom BEM class builder - converts object mapping to string
  ```typescript
  classnames({ "btn--primary": isPrimary, "btn--disabled": isDisabled });
  ```
- Create new utilities in `src/common/utils/` and export via `index.ts`

### Component Props Pattern

- Use `FC<PropsType>` from React for function components
- Props interfaces include className for styling flexibility
- Destructure props in function signature

## Build & Development

**Scripts**:

- `npm start` - Vite dev server (port 3001)
- `npm run build` - TypeScript type-check + Vite optimize build
- `npm run lint` - ESLint (strict React hooks & refresh rules)
- `npm run preview` - Local production bundle preview

**Dependencies to Know**:

- **@hugeicons/react** - Icon library (HugeiconsIcon component for rendering)
- **react-markdown** - Markdown rendering support
- **babel-plugin-react-compiler** - React 19 compiler optimization
- **sass-embedded** - SCSS compilation

## Common Workflows

### Adding a New Page

1. Create `src/pages/PageName/index.ts`, `PageName.tsx`, `PageName.scss`
2. Import and mount in `src/App.tsx` within `<AppLayout>`
3. Add navigation entry in `src/base/const/index.ts` (Navigation array)
4. Add i18n labels to `public/locales/en/common.json`

### Adding a Page-Specific Component

1. Create `src/pages/PageName/ComponentName/index.ts`, `ComponentName.tsx`, `ComponentName.scss`
2. Export via `src/pages/PageName/ComponentName/index.ts`
3. Import directly in `PageName.tsx` and use as needed
4. Style with BEM in local SCSS
5. The component must be maintainable and stateless whenever possible
6. Create a common component only if it could be reused across multiple pages and has very generic logic

### Adding a New Component

1. Create folder in `src/components/ComponentName/` with three files
2. Export via `src/components/index.ts`
3. Use path alias `@components` for imports
4. Apply BEM naming in SCSS for style isolation

### Adding Hooks

1. Create in `src/common/hooks/` with descriptive name
2. Export via `src/common/hooks/index.ts`
3. Use in components as needed
4. Ensure hooks are reusable and follow React hook rules
5. Add documentation comments for usage and only for complex logic

### Styling Tips

- Import global SCSS variables/mixins at component file top (auto-available)
- Use z-index constants from `_variables.scss` for layering
- Font utilities defined in `_typography.scss`

## Content Data Flow

- **Navigation**: Defined as constant array in `src/base/const/about.ts` (or contact.ts)
- **Skills**: Typed via `src/base/type/about.ts` (Skill interface with rating/experience)
- **Localization**: All user-facing strings source from `public/locales/en/common.json`

## Linting & Code Quality

- ESLint enforces React hooks rules and refresh plugin patterns
- TypeScript strict mode enabled (tsconfig.json)
- No auto-formatting specified - maintain consistency with existing code style
- Flatten imports using path aliases (no `../../../`)

## When Adding Features

- Keep components small and focused
- Leverage i18n for all user-visible text
- Type all props and return values
- Follow existing BEM class naming (lowercase, hyphens for nested)
- Reuse Button/Input/etc from `src/components/` before creating new base elements
