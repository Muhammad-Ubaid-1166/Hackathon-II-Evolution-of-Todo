# Homepage Spacing Standardization Specification

## Project Overview
This specification covers the standardization of vertical padding, element gaps, and section margins across the TaskGenie landing page to ensure a consistent visual rhythm and professional aesthetic.

## Spacing System
A unified spacing scale has been implemented to replace ad-hoc values:
- **Major Section Padding:** `py-24` (96px) for standard sections.
- **Hero Section Padding:** `pt-32 pb-24` (Hero requires extra top padding for fixed navigation).
- **Section Title Bottom Margin:** `mb-16` (64px) constant for consistency across all h2 headings.
- **Grid Gaps:** `gap-8` (32px) for major component grids (Features, Pricing, Stats).
- **Interactive Element Gaps:** `mt-12` or `mt-8` based on the hierarchy of the call-to-action or toggle.

## Core Components Affected
1. **Hero:** Adjusted vertical padding and internal element margins (Badge, Paragraph, CTA group).
2. **Product Mockup:** Standardized section padding and heading margin.
3. **Stat Section:** Increased vertical padding from `py-12` to `py-24`.
4. **Feature Grid:** Standardized grid gap to `gap-8`.
5. **Testimonials:** Standardized heading margin to `mb-16`.
6. **Pricing:** Standardized billing toggle margin to `mt-12`.
7. **CTA Banner:** Verified consistent section padding.
8. **Main Layout (`page.tsx`):** Removed redundant gaps and wrapper divs that caused uneven spacing.
