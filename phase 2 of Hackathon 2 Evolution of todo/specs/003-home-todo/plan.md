# Implementation Plan

## Phase 1: Initialization & Configuration
1.  Initialize Next.js project with TypeScript and Tailwind CSS.
2.  Install core dependencies (`motion`, `lenis`, `lucide-react`, `clsx`, `tailwind-merge`).
3.  Configure global styles in `globals.css` (Dark mode base, selection colors).
4.  Create folder structure for components (`layout`, `home`, `providers`).

## Phase 2: Core Layout & Providers
1.  **Smooth Scroll:** Create `SmoothScroll` provider using Lenis and wrap `layout.tsx`.
2.  **Navbar:** Build sticky header with glassmorphism and animated entrance.
3.  **Footer:** Build 4-column footer matching the dark theme.

## Phase 3: Static Home Components
1.  **Hero Section:** Implement gradients, staggered text animations using `motion/react`, and call-to-action buttons.
2.  **Features Grid:** Create data-driven card layout with hover lift effects and icon integration.
3.  **CTA Banner:** Build the bottom conversion section with glowing background effects.

## Phase 4: The Interactive Demo (Kanban)
1.  **Structure:** Create `DemoSection` container.
2.  **State Management:** Define Types (`CardType`, `ColumnType`) and initial state.
3.  **Drag Logic:** Implement HTML5 Drag and Drop API handlers (`onDragStart`, `onDragOver`, `onDrop`).
4.  **Desktop View:** Implement horizontal scroll container with fixed-width columns.
5.  **Mobile View:** Implement vertical stack logic (`flex-col`, `w-full`) for mobile breakpoints.
6.  **Burn Barrel:** Create the delete zone logic and ensure responsive positioning (right side vs bottom).
7.  **Animations:** Add `motion.div` layout animations for smooth card reordering and entering/exiting.

## Phase 5: Final Polish
1.  **Responsiveness:** Verify mobile vs desktop layouts (specifically the Kanban board transition).
2.  **Assets:** Ensure all Lucide icons are correct.
3.  **Cleanup:** Remove unused code and ensure strict strict type safety.