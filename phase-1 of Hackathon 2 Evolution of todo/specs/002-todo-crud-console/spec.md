# Feature Specification: Phase-I Todo In-Memory Console Application

**Feature Branch**: `002-todo-crud-console`  
**Created**: 2025-12-07  
**Updated**: 2025-12-08  
**Status**: Draft  
**Input**: Phase-I requirements for Todo In-Memory Python Console App (Basic Level)

---

# User Scenarios & Testing _(mandatory)_

The Todo application must work fully from the console and keep all tasks **in memory**. It must support:

- Adding tasks
- Viewing tasks
- Updating task details
- Deleting tasks
- Marking tasks as complete/incomplete

The application features an enhanced UI with:

- Emoji icons for better visual recognition
- Styled headers and borders using Unicode box-drawing characters
- Clear section separators and visual feedback
- Input validation with helpful error messages
- Confirmation prompts for destructive actions

---

## User Story 1 — Add a Task (Priority: P1)

As a user, I want to add a new todo task with a title and description so that I can keep track of my tasks.

**Why this priority**: This is the core functionality of the application.

**Independent Test**:  
Run the app → choose "Add Task" (option 1 with ➕ icon) → provide title/description → confirm that the task appears when listing tasks.

### Acceptance Scenarios

1. **Given** the user chooses "➕ Add Task" (option 1),  
   **When** a title and description are entered,  
   **Then** a new task is added with a unique ID and default `completed=False`, and a success message "✓ Task added successfully!" is displayed.

2. **Given** the user tries to add a task with an empty title,  
   **When** they submit,  
   **Then** the system displays "✗ Title cannot be empty!" and returns to the menu.

3. **Given** the user leaves the description empty,  
   **When** they submit,  
   **Then** the system accepts an empty description and creates the task.

---

## User Story 2 — View All Tasks (Priority: P1)

As a user, I want to view all tasks along with their status so I can see my progress.

**Independent Test**:  
After adding tasks, run "View Tasks" (option 2 with 📋 icon) and verify IDs, titles, descriptions, and completion markers.

### Acceptance Scenarios

1. **Given** there are tasks in memory,  
   **When** the user selects "📋 View Tasks" (option 2),  
   **Then** the system prints every task with its ID and completion status (`[✓]` or `[ ]`) under a styled "YOUR TASKS" header.

2. **Given** there are no tasks,  
   **When** the user selects "📋 View Tasks",  
   **Then** the system displays "No tasks found".

---

## User Story 3 — Update Task (Priority: P2)

As a user, I want to update an existing task's title or description.

**Independent Test**:  
Add a task → run Update (option 3 with ✏️ icon) → check if the changes appear when listed.

### Acceptance Scenarios

1. **Given** a valid task ID,  
   **When** the user updates title/description under the "UPDATE TASK" section,  
   **Then** changes are saved in memory and "✓ Task updated successfully!" is displayed.

2. **Given** an invalid task ID or non-numeric input,  
   **When** the user attempts update,  
   **Then** the system displays "✗ Invalid task ID!" and returns to menu.

3. **Given** the user presses Enter without input for title or description,  
   **When** updating,  
   **Then** those fields remain unchanged (skip update for that field).

---

## User Story 4 — Delete Task (Priority: P1)

As a user, I want to delete a task by ID so I can remove tasks that are no longer needed.

**Independent Test**:  
Add a task → delete it (option 4 with 🗑️ icon) → view tasks → confirm removal.

### Acceptance Scenarios

1. **Given** a valid ID,  
   **When** Delete is selected and user confirms with "y",  
   **Then** the task is removed and "✓ Task deleted successfully!" is displayed.

2. **Given** a valid ID but user cancels with "n",  
   **When** attempting delete,  
   **Then** "Deletion cancelled" is shown and task remains.

3. **Given** an invalid ID or non-numeric input,  
   **When** attempting delete,  
   **Then** the system shows "✗ Invalid task ID!" error message.

---

## User Story 5 — Mark Task Complete/Incomplete (Priority: P1)

As a user, I want to mark a task as completed or incomplete.

**Independent Test**:  
Add → mark complete (option 5 with ✅ icon) → view → ensure `[✓]` is shown.

### Acceptance Scenarios

1. **Given** a task exists,  
   **When** the user marks it complete with "y" or incomplete with "n",  
   **Then** `completed=True/False` updates correctly and "✓ Task marked as complete/incomplete!" is displayed.

2. **Given** a non-existing ID or non-numeric input,  
   **Then** "✗ Invalid task ID!" error message is shown.

3. **Given** the user enters invalid input (not 'y' or 'n'),  
   **Then** "✗ Invalid input! Please enter 'y' or 'n'" is displayed.

---

## User Story 6 — Exit Application (Priority: P1)

As a user, I want to cleanly exit the application.

**Independent Test**:  
Select option 6 (🚪 Exit) → verify goodbye message appears.

### Acceptance Scenarios

1. **Given** the user selects "🚪 Exit" (option 6),  
   **When** confirmed,  
   **Then** a styled goodbye message "👋 Thank you for using Todo App! Goodbye!" is displayed and the application terminates.

---

## Edge Cases

- User enters a non-numeric ID → app displays "✗ Invalid task ID!" gracefully.
- User enters an empty input where text is required → app shows appropriate error message.
- Application should not crash if user types an unknown menu option → shows "✗ Invalid option! Please select 1-6."
- All data resets when the app restarts (in-memory requirement).
- Exception handling wraps all user operations with try-catch blocks.
- User must press Enter to continue after each operation (except Exit).

---

# Requirements _(mandatory)_

## Functional Requirements

---

## **todo.py (Task Model and Manager)**

- **FR-001**: MUST define a `Task` class with attributes: `id`, `title`, `description`, `completed`.
- **FR-002**: MUST maintain tasks inside an in-memory list or dictionary.
- **FR-003**: MUST expose functions:
  - `add_task(title, description)`
  - `get_all_tasks()`
  - `update_task(task_id, title, description)`
  - `delete_task(task_id)`
  - `mark_complete(task_id, completed)`
- **FR-004**: MUST auto-generate incremental integer IDs.
- **FR-005**: MUST return clear success/error responses.

---

## **main.py (Console Interface)**

- **FR-006**: MUST provide an enhanced console-driven menu with visual styling:

  1. ➕ Add Task
  2. 📋 View Tasks
  3. ✏️ Update Task
  4. 🗑️ Delete Task
  5. ✅ Mark Complete/Incomplete
  6. 🚪 Exit

- **FR-007**: MUST validate user input before forwarding to `todo.py` functions with helpful error messages.
- **FR-008**: MUST correctly print task lists with completion indicators (`[✓]` or `[ ]`).
- **FR-009**: MUST never crash due to bad input; always handle exceptions gracefully with try-catch blocks.
- **FR-010**: MUST display styled headers using Unicode box-drawing characters:
  - Main header: "📋 TODO APP MANAGER" centered with "=" borders
  - Menu: bordered box with "┌─┐└─┘│" characters
  - Section headers: "─" separator lines
- **FR-011**: MUST provide visual feedback for all operations:
  - Success messages: "✓ [action] successfully!"
  - Error messages: "✗ [error description]"
  - Input prompts: "🔹 [prompt text]"
- **FR-012**: MUST implement helper functions for consistent UI:
  - `print_header()` - styled app header
  - `print_menu()` - bordered menu display
  - `get_input()` - consistent input prompting
  - `print_success()` - success message formatting
  - `print_error()` - error message formatting
- **FR-013**: MUST pause with "Press Enter to continue..." after each operation (except Exit).
- **FR-014**: MUST implement confirmation prompt for delete operations.
- **FR-015**: MUST handle empty/optional inputs gracefully (e.g., skipping updates, allowing empty descriptions).

---

# Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Users can add tasks with title+description 100% of the time with immediate visual feedback.
- **SC-002**: The task list shows accurate completion states with clear visual indicators.
- **SC-003**: Updates and deletes work correctly for both valid and invalid IDs with appropriate error messages.
- **SC-004**: Application runs entirely via console with enhanced UI and resets when closed.
- **SC-005**: Code follows clean structure:
  - `todo.py` → business logic
  - `main.py` → console interface with UI helper functions
- **SC-006**: Works in UV virtual environment on Python 3.13+.
- **SC-007**: All user operations provide clear visual feedback (success/error messages).
- **SC-008**: Input validation prevents crashes and guides users with helpful messages.
- **SC-009**: UI uses consistent styling with emojis, borders, and formatted sections.
- **SC-010**: Error handling covers all edge cases without application crashes.

---

# UI/UX Enhancements

### Visual Design Elements

- **Emojis**: ➕ 📋 ✏️ 🗑️ ✅ 🚪 for menu options, ✓ ✗ for feedback, 🔹 for prompts, 👋 for goodbye
- **Box Drawing**: Unicode characters (═─│┌┐└┘) for borders and separators
- **Formatting**: Centered headers, aligned menu items, section separators
- **Feedback**: Color-coded conceptually (✓ success, ✗ error)

### User Experience Improvements

- **Input Validation**: Check for empty, non-numeric, and out-of-range inputs
- **Confirmation Prompts**: Prevent accidental deletions
- **Skip Options**: Allow pressing Enter to skip optional fields
- **Pause Between Actions**: "Press Enter to continue" for better flow
- **Helpful Error Messages**: Specific guidance on what went wrong and how to fix it
- **Consistent Interaction**: All prompts follow the same pattern
