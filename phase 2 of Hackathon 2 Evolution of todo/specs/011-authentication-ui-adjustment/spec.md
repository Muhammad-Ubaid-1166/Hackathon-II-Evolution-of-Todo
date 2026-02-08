# Authentication Pages Theme Alignment — Specification

## Objective
Ensure the **Login** and **Signup (Register)** pages have a cohesive look and feel that matches the application’s **Hero Section** and overall dark theme.

## Context
The hero section uses a dark, modern theme with a specific color palette dominated by:
- Backgrounds: `bg-slate-950`, `bg-slate-900`
- Primary accents: `violet-400`
- Text: white for high contrast, `slate-400` for secondary text
- Buttons: white background with dark text

Authentication pages previously had inconsistent styling. The goal is to align them with the hero page’s theme.

## Style Guidelines

### Colors & Backgrounds
- Page background: `bg-slate-950`
- Sidebars/panels: `bg-slate-900`
- Text:
  - Main text: white
  - Secondary text: `slate-400`
- Accent / primary interactive elements: `violet-400`

### Inputs
- Background: `bg-slate-800`
- Borders: `border-slate-700`
- Text: light (inherited from dark backgrounds)

### Buttons
- Primary / action buttons: white backgrounds
- Button text: dark text
- Hover/active states should preserve accessibility contrast

## Components Targeted
- Signin component (`frontend/src/components/auth/signin.tsx`)
- Signup component (`frontend/src/components/auth/signup.tsx`)

## Success Criteria
- Visual consistency across Hero, Signup, Login pages
- Adherence to the defined color palette and theme
- Usable and accessible form elements
- Easy to maintain and extend theme consistency

## Constraints
- Tailwind utility classes must be used for styling
- Theme must be responsive for mobile and desktop
