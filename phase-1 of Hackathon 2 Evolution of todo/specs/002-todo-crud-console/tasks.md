# Phase-I Todo App — Task Breakdown

**Feature Branch**: `002-todo-crud-console`  
**Created**: 2025-12-07  
**Updated**: 2025-12-08  
**Status**: Draft  
**Related Plan**: `plan.md`  
**Related Spec**: `spec.md`

---

# Task List (Detailed and Actionable)

---

## 🟦 Task Group 1 — Project Setup (P1)

### ✔️ Task 1.1 — Initialize UV Project

- Create environment using `uv venv`.
- Generate `pyproject.toml`.

### ✔️ Task 1.2 — Create initial folder structure

- Root directory only (no `src/` folder).
- Add placeholder files:
  - `main.py`
  - `todo.py`

### ✔️ Task 1.3 — Add required metadata files

- Create `constitution.json`
- Create `README.md`
- Create `CLAUDE.md`

---

## 🟩 Task Group 2 — Implement `todo.py` Logic (P1)

### ✔️ Task 2.1 — Create Task model

- Define class `Task`
- Fields: `id`, `title`, `description`, `completed`

### ✔️ Task 2.2 — Create in-memory storage

- A list or dictionary to store tasks.
- Implement ID auto-increment.

### ✔️ Task 2.3 — Implement CRUD operations

- `add_task(title, description)`
- `get_all_tasks()`
- `update_task(task_id, title, description)` - with optional parameters support
- `delete_task(task_id)`

### ✔️ Task 2.4 — Implement completion toggle

- `mark_complete(task_id, completed)` - single function with boolean parameter
- Support both marking complete (True) and incomplete (False)

### ✔️ Task 2.5 — Error handling for invalid IDs

- Safe lookups
- Return meaningful messages
- Handle None values for optional parameters

---

## 🟧 Task Group 3 — Implement `main.py` Enhanced Console UI (P1)

### ✔️ Task 3.1 — Create UI helper functions

- `print_header()` - display centered "📋 TODO APP MANAGER" with "=" borders
- `print_menu()` - render bordered menu with Unicode box-drawing (┌─┐└─┘│)
- `get_input(prompt, allow_empty)` - consistent input collection with 🔹 icon
- `print_success(message)` - display success feedback with ✓ icon
- `print_error(message)` - display error feedback with ✗ icon

### ✔️ Task 3.2 — Build main menu loop with enhanced UI

- Options 1–6 with emoji icons:
  1. ➕ Add Task
  2. 📋 View Tasks
  3. ✏️ Update Task
  4. 🗑️ Delete Task
  5. ✅ Mark Complete/Incomplete
  6. 🚪 Exit
- Use `print_header()` and `print_menu()` for display

### ✔️ Task 3.3 — Implement Add Task (Option 1)

- Display "ADD NEW TASK" section header
- Get title with validation (reject empty)
- Get description (allow empty)
- Call `add_task()` from `todo.py`
- Display success message with `print_success()`
- Show "✗ Title cannot be empty!" error if needed

### ✔️ Task 3.4 — Implement View Tasks (Option 2)

- Display "YOUR TASKS" section header
- Call `get_all_tasks()` from `todo.py`
- Format output with `[✓]` or `[ ]` icons
- Show ID, title, description for each task
- Display "No tasks found" if empty

### ✔️ Task 3.5 — Implement Update Task (Option 3)

- Display "UPDATE TASK" section header
- Get task ID with validation (numeric check)
- Get optional new title (press Enter to skip)
- Get optional new description (press Enter to skip)
- Call `update_task()` with None for skipped fields
- Display success or error message
- Show "✗ Invalid task ID!" for invalid input

### ✔️ Task 3.6 — Implement Delete Task (Option 4)

- Display "DELETE TASK" section header
- Get task ID with validation (numeric check)
- Add confirmation prompt "Are you sure? (y/n)"
- Only delete if user confirms with "y"
- Show "Deletion cancelled" if user enters "n"
- Display success or error message
- Show "✗ Invalid task ID!" for invalid input

### ✔️ Task 3.7 — Implement Mark Complete/Incomplete (Option 5)

- Display "MARK TASK STATUS" section header
- Get task ID with validation (numeric check)
- Get completion status "Mark as complete? (y/n)"
- Validate y/n input
- Call `mark_complete()` with boolean value
- Display success message with status (complete/incomplete)
- Show "✗ Invalid input! Please enter 'y' or 'n'" for invalid input
- Show "✗ Invalid task ID!" for invalid ID

### ✔️ Task 3.8 — Implement Exit (Option 6)

- Display styled goodbye message with 👋 emoji
- "Thank you for using Todo App! Goodbye!" centered with borders
- Clean termination of application

### ✔️ Task 3.9 — Add comprehensive input validation

- Validate task IDs are numeric before conversion
- Block empty titles in add operation
- Allow empty descriptions
- Handle invalid menu choices (not 1-6)
- Validate y/n responses for confirmations
- Use `get_input()` helper for consistency

### ✔️ Task 3.10 — Implement exception handling

- Wrap all operations in try-catch blocks
- Catch ValueError for invalid conversions
- Catch general Exception for unexpected errors
- Display appropriate error messages using `print_error()`
- Never crash the application

### ✔️ Task 3.11 — Add user flow enhancements

- Add "Press Enter to continue..." pause after each operation (except Exit)
- Clear visual separation between operations with section headers
- Consistent use of separators (─ lines) for sections
- Ensure all operations return to main menu smoothly

---

## 🟨 Task Group 4 — Testing & QA (P1)

### ✔️ Task 4.1 — Functional tests for each operation

- **Add Task**: Valid title+description, empty title (error), empty description (allowed)
- **View Tasks**: With tasks present, empty list display
- **Update Task**: Valid ID, invalid ID, skip fields, non-numeric input
- **Delete Task**: Valid ID with confirm, cancel deletion, invalid ID
- **Mark Complete**: Toggle to complete, toggle to incomplete, invalid ID, invalid y/n
- **Exit**: Clean termination with goodbye message

### ✔️ Task 4.2 — UI/UX verification tests

- Verify all emoji icons display correctly (➕ 📋 ✏️ 🗑️ ✅ 🚪 ✓ ✗ 🔹 👋)
- Check Unicode box-drawing characters render properly (═─│┌┐└┘)
- Confirm headers are centered and formatted
- Verify section separators appear between operations
- Test success messages use ✓ icon
- Test error messages use ✗ icon
- Confirm input prompts show 🔹 icon
- Verify "Press Enter to continue" pause works

### ✔️ Task 4.3 — Scenario tests (end-to-end workflows)

- Add multiple tasks → View → Update one → Mark complete → View → Delete one → View
- Test error recovery: Invalid input → Returns to menu → Continue normally
- Test all operations in sequence without crashes

### ✔️ Task 4.4 — Edge-case tests

- Invalid task ID (non-numeric)
- Invalid task ID (out of range)
- Empty title in add operation
- Empty description in add operation (should work)
- No tasks available when viewing
- No tasks available when updating/deleting/marking
- Invalid menu choice (not 1-6)
- Invalid confirmation responses (not y/n)
- Exception handling (ensure no crashes)

### ✔️ Task 4.5 — Visual styling consistency check

- All helper functions used consistently
- No raw print statements for UI elements
- All success messages use `print_success()`
- All error messages use `print_error()`
- All inputs use `get_input()`
- Headers and menus use dedicated functions
- Section separators formatted uniformly

---

## 🟪 Task Group 5 — Final Polish (P2)

### ✔️ Task 5.1 — Write comprehensive documentation

- **README.md**:
  - Setup steps with UV commands
  - Requirements (Python 3.13+)
  - Usage guide with menu explanation
  - Feature list including UI enhancements
  - Example workflows with screenshots/examples
  - Visual elements description (emojis, borders)

### ✔️ Task 5.2 — Update CLAUDE.md

- Add Claude Code automation instructions
- Document Spec-Kit Plus workflow
- Include development best practices

### ✔️ Task 5.3 — Code cleanup and refactoring

- Remove any debug print statements
- Ensure consistent code style
- Verify all helper functions are utilized
- Check for code duplication
- Validate error handling coverage
- Confirm input validation patterns

### ✔️ Task 5.4 — Save spec history

- Move finalized `spec.md` to `specs_history/`
- Move finalized `plan.md` to `specs_history/`
- Move finalized `tasks.md` to `specs_history/`
- Add timestamp to archived files

---

# Completion Criteria

The feature is considered **Done** when:

- All tasks are checked (✔️).
- Console app runs smoothly without crashes.
- All features meet acceptance criteria in `spec.md`.
- UI/UX enhancements are fully implemented:
  - All emoji icons display correctly
  - Box-drawing borders render properly
  - Success/error messages formatted consistently
  - Helper functions used throughout
  - Input validation prevents crashes
  - Exception handling covers all cases
  - Confirmation prompts work for deletes
  - "Press Enter to continue" flow implemented
- All testing categories pass:
  - Functional tests
  - UI/UX verification
  - Scenario tests
  - Edge-case tests
  - Visual consistency check
- Documentation is complete and accurate.
- Code is clean and refactored.
- Spec history is properly archived.

---

# Task Progress Tracking

| Task Group         | Total Tasks | Completed | Status        |
| ------------------ | ----------- | --------- | ------------- |
| 1. Project Setup   | 3           | 0         | ☐ Not Started |
| 2. `todo.py` Logic | 5           | 0         | ☐ Not Started |
| 3. `main.py` UI    | 11          | 0         | ☐ Not Started |
| 4. Testing & QA    | 5           | 0         | ☐ Not Started |
| 5. Final Polish    | 4           | 0         | ☐ Not Started |
| **TOTAL**          | **28**      | **0**     | **0%**        |
