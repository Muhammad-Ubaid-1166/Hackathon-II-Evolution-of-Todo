# Project Constitution

## 1. Technology Stack
- **Language:** Python 3.13+
- **Package Manager:** UV
- **Interface:** CLI (Console)
- **Storage:** In-Memory (List/Dict) for Phase 1

## 2. Coding Standards
- **Type Hinting:** All functions must have type hints.
- **Docstrings:** All classes and public methods require docstrings.
- **Formatting:** Follow PEP 8.
- **Architecture:** Separation of concerns (Model -> Service -> View).

## 3. Workflow
- **Spec-Driven:** No code is written without a corresponding file in the `specs/` folder.
- **Git:** Commit messages must reference the spec ID (e.g., "feat: implement spec 001").

## 4. Mandatory Requirements
- **Core Features:** Must implement all 5 Basic Level features:
  1. Add Task
  2. Delete Task
  3. Update Task
  4. View Tasks
  5. Mark Complete/Incomplete
- **Deliverables:** Repository must contain `constitution.md`, `specs/` history, `src/` source code, `README.md`, and `CLAUDE.md`.
- **Execution:** Application must be runnable via `uv run`.