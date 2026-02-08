# Task List: 002-todo-dashboard-enhancement

## Phase 1: Environment, Typing & Mock Data
- [ ] **Define Type Definitions** 
    - Create `types/todo.ts`
    - Define `Priority` as `'Low' | 'Medium' | 'High'`
    - Define `Task` interface (id, title, priority, dueDate, isCompleted, createdAt)
    - Define `Stats` interface (total, completed, pending, todayCount)
- [ ] **Establish Mock Data Layer** 
    - Create `lib/mock-data.ts`
    - Generate an array of 5-10 tasks covering different priorities and completion statuses
    - Create a mock `user` object with name and "joined" date
- [ ] **Install Core Dependencies**
    - `npm install lucide-react` (icons)
    - `npm install framer-motion` (animations)
    - `npm install sonner` (lightweight toast notifications)
    - `npm install date-fns` (easy date formatting)

## Phase 2: Top-Level Dashboard Structure
- [ ] **Page Layout Implementation** 
    - Create `app/dashboard/page.tsx`
    - Implement a centralized container with responsive padding (`px-4 sm:px-6 lg:px-8`)
    - Set up a background with a subtle gradient or slate-50 for depth
- [ ] **Welcome Section Component** 
    - Create `components/dashboard/WelcomeHeader.tsx`
    - Implement time-based greeting logic (Morning/Afternoon/Evening)
    - Format and display today's date (e.g., "Thursday, Dec 25")
    - Add a rotating motivational subtitle (e.g., "Let's make today productive!")

## Phase 3: Statistics & Insights
- [ ] **Stats Card Primitive** 
    - Create `components/dashboard/StatsCard.tsx`
    - Support props for icon, label, value, and trend color
    - Add hover scales and subtle shadow transitions
- [ ] **Stats Grid Integration** 
    - Create `components/dashboard/StatsGrid.tsx`
    - Arrange cards for: Total Tasks, Completed, Pending, and Today's Tasks
    - Ensure grid is `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- [ ] **Productivity Progress Bar** 
    - Create `components/dashboard/ProductivityInsights.tsx`
    - Calculate percentage of tasks completed
    - Implement a smooth-filling progress bar using Tailwind `transition-all`

## Phase 4: Task Input & Controls
- [ ] **Task Creation Form** 
    - Create `components/dashboard/TaskForm.tsx`
    - Implement Title input with `focus:ring-2` styling
    - Create a custom Priority Select dropdown (Low/Med/High) with colored indicators
    - Add a visual Due Date picker (native date input or custom)
- [ ] **Form Submission Logic** 
    - Add `onKeyDown` listener to handle "Enter" key submission
    - Implement a local `loading` state for the "Add Task" button
    - Trigger a "Success" toast from `sonner` upon submission
- [ ] **Filter Navigation** 
    - Create `components/dashboard/TaskFilters.tsx`
    - Implement a horizontal tab bar (All, Today, Upcoming, Completed, High Priority)
    - Use `framer-motion` for a sliding background indicator on the active tab

## Phase 5: Task List & Interaction Design
- [ ] **Task Card (Item) Component**
    - Create `components/dashboard/TaskItem.tsx`
    - Implement custom checkbox with "Check" animation
    - Add priority badges with logic-based colors (Red/Amber/Emerald)
    - Display Due Date with a "calendar" icon
- [ ] **Task Actions (Edit/Delete)** 
    - Implement a "hidden-until-hover" action group for Edit and Delete
    - Add a delete confirmation toast
- [ ] **Main Task List View**
    - Create `components/dashboard/TaskList.tsx`
    - Handle empty states with a "No tasks found" illustration and CTA
    - Use `AnimatePresence` for smooth task removal and entry animations
    - Implement "Completed" styling (opacity reduction and strike-through)

## Phase 6: UX Refinement & Polish
- [ ] **Skeleton Loaders** 
    - Create `components/dashboard/DashboardSkeleton.tsx`
    - Mimic the layout of Stats cards and Task list using pulsing grey boxes
- [ ] **Dark Mode Support** 
    - Audit all components for `dark:` class compliance
    - Ensure background contrast is sufficient for accessibility (AA/AAA)
- [ ] **Accessibility (A11y) Audit** 
    - Add `aria-label` to all icon buttons (Edit, Delete, Close)
    - Ensure proper `label` associations for all form inputs
    - Check focus-visible rings for keyboard-only users
- [ ] **Performance & Responsive Check**
    - Test layout on iPhone SE (320px) to ensure no horizontal overflow
    - Optimize re-renders by memoizing the Filter components

---

### Implementation Notes for the Developer:

*   **Priority Styling**:
    *   *High*: `border-l-red-500 bg-red-50/50 dark:bg-red-900/10`
    *   *Medium*: `border-l-amber-500 bg-amber-50/50 dark:bg-amber-900/10`
    *   *Low*: `border-l-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10`
*   **Sticky Controls**: Consider making the Task Form and Filters `sticky top-0` (below the Navbar) to keep them accessible while scrolling long task lists.
*   **Animations**: Keep `framer-motion` durations between `0.2s` and `0.3s`. Anything slower feels sluggish in a productivity app.
*   **Keyboard Support**: In the `TaskForm`, the "Escape" key should clear the current input for a better UX.