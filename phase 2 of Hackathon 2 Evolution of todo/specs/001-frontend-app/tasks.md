# Task List: 001-frontend-app

## Phase 1: Project Setup & Initialization

- [ ] Initialize Next.js Application
  - Run `npx create-next-app@latest frontend --typescript --tailwind --eslint --app`
  - Verify `package.json` reflects Next.js 15+ and React 19+
- [ ] Clean Workspace
  - Remove boilerplate assets in `/public`
  - Clear `app/page.tsx` and `app/globals.css`
- [ ] Configure Tailwind Theme
  - Update `tailwind.config.ts` with custom brand colors (Slate and Indigo/blue)
  - Define custom animations for fade-in effects
- [ ] Install Utility Dependencies
  - `npm install lucide-react clsx tailwind-merge`

## Phase 2: Core UI Components (Shared)

- [ ] Create `components/ui/Container.tsx` to handle max-width and horizontal padding
- [ ] Create `components/ui/Button.tsx`
  - Support variants: `primary`, `outline`, `ghost`
  - Support sizes: `sm`, `md`, `lg`
- [ ] Create `components/ui/Logo.tsx` using a Lucide icon and stylized text

## Phase 3: Global Layout Elements

    - Desktop: Horizontal links with hover effects
    - Mobile: Mobile-only menu using a slide-down or overlay transition
    - Add "Sticky" logic with a border-bottom appearing on scroll
    - Copyright dynamic year display
    - Social/Policy links placeholders

- [ ] Update `app/layout.tsx`
  - Add Google Fonts (Geist/Inter) via `next/font`
  - Set up metadata (Title, Description)
  - Integrate Navbar/Footer/Main layout structure

## Phase 4: Hero Section & Landing Page

- [ ] Build `components/home/Hero.tsx`
  - Implement H1 with `tracking-tight` and `leading-tight`
  - Implement responsive font sizes (e.g., `text-4xl` to `text-6xl`)
  - Add Primary CTA: "Get Started" and Secondary: "View Features"
- [ ] Finalize `app/page.tsx`
  - Import and arrange the Hero section
  - Add a "Sub-hero" placeholder section for future feature lists

## Phase 5: Testing & Refinement

- [ ] **Responsiveness Audit**
  - Test on Small (iPhone SE), Medium (iPad), and Large (Ultrawide) breakpoints
- [ ] **Accessibility (A11y) Check**
  - Ensure all buttons have descriptive labels
  - Verify keyboard navigation (Tab through Navbar links)
- [ ] **Performance Check**
  - Check image optimization (if any) and font loading performance
- [ ] **Edge Case Handling**
  - Ensure the layout doesn't break if text content is longer than expected
