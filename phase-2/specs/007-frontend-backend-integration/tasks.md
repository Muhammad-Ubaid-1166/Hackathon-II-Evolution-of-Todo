# Task Breakdown: Frontend–Backend Integration

**Related Spec**: spec.md  
**Plan Reference**: plan.md  
**Feature Branch**: `007-frontend-backend-integration`

---

## Phase 1: Environment Setup

- [X] Create `.env.local` file in frontend root
- [X] Add `NEXT_PUBLIC_NEXT_PUBLIC_BACKEND_URL=<NEXT_PUBLIC_BACKEND_URL>`
- [X] Verify environment variable access in Next.js
- [X] Document environment setup steps

---

## Phase 2: API Service Layer

- [X] Create a centralized API utility file
- [X] Implement base fetch wrapper using NEXT_PUBLIC_BACKEND_URL
- [X] Handle JSON headers and parsing
- [X] Add basic error handling (network + non-200 responses)

---

## Phase 3: CRUD API Integration

### Todos API
- [X] Implement GET `/todos`
- [X] Implement POST `/todos`
- [X] Implement PUT `/todos/{id}`
- [X] Implement DELETE `/todos/{id}`

---

## Phase 4: UI Integration

- [X] Connect todo list UI to GET API
- [X] Connect add-todo form to POST API
- [X] Connect edit-todo functionality to PUT API
- [X] Connect delete action to DELETE API
- [X] Add loading indicators
- [X] Display success and error messages

---

## Phase 5: Error & Edge Case Handling

- [X] Handle backend unavailability
- [X] Handle invalid or malformed responses
- [X] Handle request timeouts
- [X] Add fallback UI states

---

## Phase 6: Documentation Verification

- [X] Use context7 MCP to fetch backend API docs
- [X] Verify endpoint paths and payloads
- [X] Compare documentation with `main.py`
- [X] Update frontend assumptions if needed

---

## Phase 7: Testing & Validation

- [X] Test CRUD operations manually
- [X] Validate NEXT_PUBLIC_BACKEND_URL switching
- [X] Test failure scenarios (backend down / wrong URL)
- [X] Confirm UI feedback accuracy

---

## Definition of Done

- [X] Frontend successfully communicates with backend
- [X] All CRUD operations work correctly
- [X] Environment-based configuration is stable
- [X] Errors are handled gracefully
- [X] Documentation is verified and aligned
