# Plan for Authentication Theme Alignment

## Overview
This plan outlines a phased approach to update the Login and Signup pages so they match the hero section’s dark theme and visual language.

## Phase 1 — Define Design Standards
1. Document the color palette used in the hero page:
   - `bg-slate-950`, `bg-slate-900`
   - `white`, `slate-400`
   - `violet-400` for accents
2. Specify how inputs, buttons, and layout should render under the theme.

## Phase 2 — Update Signin Component
1. Update page background
2. Adjust left sidebar styles
3. Update form text colors
4. Apply dark themed input styles
5. Style primary interaction elements (buttons/links)
6. Test for responsiveness and accessibility

## Phase 3 — Update Signup Component
1. Repeat theme adjustments for signup page
2. Sync text and input styles with signin implementation
3. Align button and link styling
4. Test UI on multiple screen sizes and states (errors, focused fields)

## Phase 4 — QA & Accessibility Testing
1. Confirm color contrast ratios
2. Test keyboard navigation and focus states
3. Verify consistency across pages
4. Fix any inconsistencies

## Tools & Tech
- Tailwind CSS utilities
- Next.js/React components
- Browser dev tools for style debugging

## Timeline
- Day 1: Write design spec + confirm styling
- Day 2: Implement signin updates
- Day 3: Implement signup updates
- Day 4: Responsive + accessibility testing
