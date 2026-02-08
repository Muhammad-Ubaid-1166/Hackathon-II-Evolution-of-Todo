# Development Tasks

## Setup
- [X] Run `npx create-next-app@latest my-hackathon-app --typescript --tailwind --eslint`
- [X] Run `npm install motion lenis lucide-react clsx tailwind-merge`
- [X] Clean up default `page.tsx` and `globals.css`
- [X] Set `body` background to `bg-slate-950` and text to `text-slate-50` in `layout.tsx`

## Components: Infrastructure
- [X] Create `components/providers/smooth-scroll.tsx` and implement `ReactLenis`.
- [X] Wrap `children` in `app/layout.tsx` with `<SmoothScroll>`.
- [X] Create `components/layout/navbar.tsx` (Glass effect, Logo, Links).
- [X] Create `components/layout/footer.tsx` (Socials, Links, Copyright).

## Components: Homepage Sections
- [X] **Hero:**
    - [X] Create `components/home/hero.tsx`.
    - [X] Add background glow blobs.
    - [X] Add `motion` initial/animate props for staggered text reveal.
- [X] **Features:**
    - [X] Create `components/home/feature-grid.tsx`.
    - [X] Map through feature data.
    - [X] Add hover scale/border effects.
- [X] **CTA:**
    - [X] Create `components/home/cta-banner.tsx`.
    - [X] Add gradient background and generic link handlers.

## Feature: Interactive Kanban Demo (`components/home/demo-section.tsx`)
- [X] **Scaffolding:**
    - [X] Create `DemoSection` shell.
    - [X] Create `Board`, `Column`, `Card`, `BurnBarrel`, `AddCard` sub-components.
- [X] **Logic:**
    - [X] Implement `handleDragStart`, `handleDragOver`, `handleDragEnd`.
    - [X] Implement `getNearestIndicator` algorithm for precise dropping.
    - [X] Implement `handleAddCard` and `setCards` state.
- [X] **Responsiveness (Crucial):**
    - [X] Set Board container to `flex flex-col md:flex-row`.
    - [X] Set Column width to `w-full md:w-56`.
    - [X] Ensure Mobile view scrolls vertically (`overflow-y-auto`).
    - [X] Ensure Desktop view scrolls horizontally (`overflow-x-auto`).
- [X] **Burn Barrel:**
    - [X] Place `BurnBarrel` at the end of the flex row for Desktop.
    - [X] Place `BurnBarrel` at the bottom of the column stack for Mobile.
    - [X] Implement trash/delete logic on drop.

## Final Assembly
- [X] Import all sections into `app/page.tsx`.
- [X] Arrange order: Hero -> Demo -> Features -> CTA.
- [X] Verify `next build` passes without type errors.
- [X] Test drag-and-drop on mobile touch simulation.