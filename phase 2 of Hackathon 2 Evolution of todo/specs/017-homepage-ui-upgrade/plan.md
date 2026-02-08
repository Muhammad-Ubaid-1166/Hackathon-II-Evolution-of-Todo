# TaskGenie Landing Page Enhancement - Implementation Plan

## Information Gathered

### Current Implementation Analysis
- Core brand components (Navbar, Hero, FeatureGrid, CtaBanner) are developed with a Slate/Violet/Indigo theme.
- The application uses Next.js 15+ App Router and Framer Motion for high-fidelity animations.
- The UI follows a modern SaaS aesthetic with glassmorphism and gradient accents.
- Landing page structure currently lacks deep product visualization and social proof.

### Requirements Analysis
- Need to implement a responsive Product Mockup to showcase the actual dashboard interface.
- Add an interactive AI Simulator to demonstrate the core value proposition (AI task prioritization).
- Integrate social proof through a "Wall of Love" (Testimonials) and high-authority Stat Section.
- Provide clear pricing tiers with a monthly/yearly billing toggle to drive conversions.
- Ensure all new components are fully responsive across mobile, tablet, and desktop.

### Technical Considerations
- Use `motion/react` (Framer Motion) for scroll-triggered entrance animations.
- Tailwind CSS `bg-linear` and `backdrop-blur` utilities for consistent glassmorphic styling.
- Lucide React for consistent iconography across all new sections.
- Implementation of a custom toggle switch for pricing logic using React state.

## Plan

### Phase 1: Integration of Core Layout and Visual Proof
- Update `app/page.tsx` to include the new component architecture.
- Implement the `ProductMockup` component featuring responsive grid layouts (hiding sidebars on mobile).
- Add the `StatSection` immediately below the mockup to establish immediate authority.
- Ensure the Hero section flows naturally into the visual product demonstration.

### Phase 2: Value Delivery and Interactive Experience
- Refine the `FeatureGrid` with hover-active states and specific Lucide icons.
- Build the `AISimulator` component to allow users to test "messy thought" processing.
- Implement simulated "Magic" loading states and result cards with metadata (priority/dates).
- Verify that interactivity does not disrupt the scroll performance on mobile devices.

### Phase 3: Conversion Optimization and Social Proof
- Implement the `Testimonials` grid using a 3-column layout with user avatars.
- Create the `Pricing` section with a functional monthly/yearly billing toggle.
- Add "Most Popular" badges and visual hierarchy to the "Genie Pro" tier.
- Update the `CtaBanner` to serve as the final closing pitch after the user has reviewed pricing.

## Dependent Files to be edited
- `app/page.tsx`: Main entry point for the landing page structure.
- `components/home/product-mockup.tsx`: New component for dashboard visualization.
- `components/home/ai-simulator.tsx`: New component for interactive demo.
- `components/home/stat-section.tsx`: New component for performance metrics.
- `components/home/testimonials.tsx`: New component for social proof.
- `components/home/pricing.tsx`: New component for billing tiers.

## Followup steps
- Test all animations for performance bottlenecks on lower-end devices.
- Verify that the "Genie Pro" pricing toggle correctly updates prices.
- Ensure the AI Simulator's mobile layout handles long input text correctly.
- Review the accessibility (Aria labels) for the new pricing toggle and interactive simulator.
