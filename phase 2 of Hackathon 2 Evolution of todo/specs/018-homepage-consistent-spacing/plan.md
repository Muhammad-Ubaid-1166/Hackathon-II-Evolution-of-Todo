# Homepage Spacing Standardization - Implementation Plan

## Information Gathered

### Current Implementation Analysis
- Before standardization, section padding varied between `py-12`, `py-24`, and `pb-24`.
- Heading margins were inconsistent (`mb-12` vs `mb-16`).
- The main layout container in `page.tsx` had a `gap-8` which conflicted with individual section padding, creating double spacing in some areas.
- The `FeatureGrid` had an extra `pt-10` wrapper div.

### Requirements Analysis
- Implement a consistent `py-24` padding for all home sections.
- Standardize the Hero section as the primary entry point with `pt-32 pb-24`.
- Ensure all major h2 headings have a consistent `mb-16` margin.
- Standardize grid gaps to `gap-8`.
- Remove redundant spacing logic from the main layout.

## Plan

### Phase 1: Layout & Hero Refinement
- Modify `app/page.tsx` to remove the global `gap-8` and redundant wrapper divs.
- Update `components/home/hero.tsx` with the new spacing scale.

### Phase 2: Section Standardization
- Update `ProductMockup`, `StatSection`, `FeatureGrid`, `Testimonials`, and `Pricing` to use the unified `py-24` padding and standard margins.
- Ensure grid gaps in `FeatureGrid` and `Pricing` are consistent.

### Phase 3: Final Polish
- Review `CtaBanner` and ensure it fits the new rhythm.
- Verify that sections with background accents (like `StatSection`) transition smoothly under the new padding.

## Dependent Files Edit List
- `app/page.tsx`: Root layout of the landing page.
- `components/home/hero.tsx`: Hero section adjustments.
- `components/home/product-mockup.tsx`: Padding and heading margin fix.
- `components/home/stat-section.tsx`: Padding increase.
- `components/home/feature-grid.tsx`: Grid gap standardization.
- `components/home/testimonials.tsx`: Heading margin fix.
- `components/home/pricing.tsx`: Toggle spacing and heading check.
- `components/home/cta-banner.tsx`: Section padding verification.
