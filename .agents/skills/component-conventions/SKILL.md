---
name: component-conventions
description: >-
  Use this skill when creating, moving, or scaffolding any React component in
  this portfolio project. It defines which layer a component belongs to
  (base, components, or features), the required file structure, naming rules,
  import paths, and SCSS conventions. Activate whenever the user asks to add
  a new component, refactor an existing one, or asks where a component should live.
---

# Component Conventions — Portfolio Project

## Layer Architecture

```
src/
├── components/base/     ← primitive atoms (no component-level deps)
├── components/          ← composite/custom reusable components
└── features/<name>/     ← feature-specific orchestration, never reusable
```

### Rules

| Layer | Lives in | May import from | Never imports from |
|---|---|---|---|
| **Base** | `components/base/` | `@common/utils`, `@common/types`, `@assets`, external libs | `@components` (non-base) |
| **Component** | `components/` | `@components/base`, `@common/*`, `@assets`, external libs | `@features` |
| **Feature** | `features/<name>/` | `@components`, `@components/base`, `@common/*`, `@assets` | other `@features` |

> A component is **base** if it is a single-responsibility primitive with no dependency
> on other components in this project (e.g. Button, Icon, Chip, Loader, Input, TextArea).
>
> A component is **composite** (root of `components/`) if it composes base components
> or has domain-aware props but no feature-specific hook dependencies
> (e.g. ChatInput, MessageBubble, StreamRenderer, SuggestionChips, Modal).
>
> A component is **feature-specific** if it calls feature hooks (e.g. `useChat`)
> or is tightly coupled to one feature's data flow (e.g. ChatContainer, MessageList).

---

## File Structure

Every component, at every layer, follows this structure:

```
ComponentName/
├── ComponentName.tsx    ← component implementation
├── ComponentName.scss   ← scoped BEM styles
└── index.ts             ← re-export (and type exports if needed)
```

Co-located utilities are allowed when tightly coupled to one component:

```
StreamRenderer/
├── StreamRenderer.tsx
├── StreamRenderer.scss
├── streamParser.ts      ← only used by StreamRenderer; not a generic util
└── index.ts
```

---

## Naming

- **Folder & file**: `PascalCase` matching the component name exactly.
- **CSS class root**: `kebab-case` version of the component name (e.g. `ChatInput` → `.chat-input`).
- **BEM**: `block__element--modifier` (e.g. `.chat-input__btn--stop`).
- **Props type**: `ComponentNameProps` defined in the same `.tsx` file, exported if consumers need it.

---

## Scaffolding a New Component

### 1. Decide the layer

Ask: does it use a feature hook? → **feature**. Does it compose other components or have domain props? → **component**. Is it a primitive atom? → **base**.

### 2. Create the files

```
# Example: new base atom
src/components/base/Badge/Badge.tsx
src/components/base/Badge/Badge.scss
src/components/base/Badge/index.ts

# Example: new composite
src/components/Tooltip/Tooltip.tsx
src/components/Tooltip/Tooltip.scss
src/components/Tooltip/index.ts
```

### 3. `index.ts` template

```ts
export { default } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';  // only if external consumers need the type
```

### 4. Register in the barrel

- **Base**: add to `src/components/base/index.ts`
- **Composite**: add to `src/components/index.ts`
- **Feature**: no barrel needed; import directly by path within the feature

### 5. Component template

```tsx
import type { FC } from 'react';
import { classnames } from '@common/utils';
import './ComponentName.scss';

export type ComponentNameProps = {
  className?: string;
  // ... other props with defaults documented
};

const ComponentName: FC<ComponentNameProps> = ({
  className = '',
  // ... destructured with defaults
}) => {
  const rootClass = classnames({
    'component-name': true,
    [className]: !!className.trim(),
  });

  return (
    <div className={rootClass}>
      {/* content */}
    </div>
  );
};

export default ComponentName;
```

---

## Import Path Rules

```ts
// ✅ Correct
import Button from '@components/base/Button';
import { Loader } from '@components/base';          // via base barrel
import ChatInput from '@components/ChatInput';
import { classnames } from '@common/utils';

// ❌ Wrong — base components imported from root barrel
import { Button } from '@components';

// ❌ Wrong — importing across feature boundaries
import SomeWidget from '@features/other-feature/Widget';
```

---

## SCSS Conventions

- One `.scss` file per component, same name as the component folder.
- Use the component's kebab-case name as the BEM block root.
- No global selectors; all styles scoped under the block class.
- State modifiers via `--modifier` suffix (e.g. `--disabled`, `--streaming`, `--active`).
