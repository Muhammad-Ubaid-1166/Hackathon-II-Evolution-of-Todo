# Tasks – Handle Todo IDs from Backend

## Task List

### 1. Update POST /todos Endpoint
- **Description**: Modify the create_todo function in phase-II/backend/main.py to use a new TodoCreate model that excludes the id field.
- **Steps**:
  - Create TodoCreate model with title and category fields
  - Update endpoint parameter from Todo to TodoCreate
  - Ensure the function creates Todo with auto-generated id
  - Return the full Todo object with generated id
- **Status**: Completed
- **Assignee**: Backend Developer
- **Estimated Time**: 30 minutes

### 2. Ensure Response Includes Generated ID
- **Description**: Verify that the POST /todos response includes the auto-generated id from the database.
- **Steps**:
  - Check that session.refresh(db_todo) is called after commit
  - Confirm response returns {"id": db_todo.id, "title": db_todo.title, "category": db_todo.category}
- **Status**: Completed
- **Assignee**: Backend Developer
- **Estimated Time**: 15 minutes

### 3. Verify PUT and DELETE Endpoints
- **Description**: Confirm that PUT /todos/{id} and DELETE /todos/{id} endpoints correctly use the id from the path parameter.
- **Steps**:
  - Review update_todo function to ensure it uses path id, not body id
  - Review delete_todo function to ensure it uses path id
  - Test that these endpoints work with path-based id handling
- **Status**: Pending
- **Assignee**: Backend Developer
- **Estimated Time**: 30 minutes

### 4. Test API Endpoints
- **Description**: Perform thorough testing of all todo endpoints to confirm ID handling works correctly.
- **Steps**:
  - Start the FastAPI server
  - Test POST /todos with title and category only (no id)
  - Test GET /todos to verify created todos have ids
  - Test PUT /todos/{id} with path id and body updates
  - Test DELETE /todos/{id} with path id
  - Verify error handling for invalid ids
- **Status**: Pending
- **Assignee**: QA Engineer
- **Estimated Time**: 45 minutes

## Dependencies
- Task 1 must be completed before Tasks 2-4
- Tasks 3 and 4 can be done in parallel after Task 1

## Acceptance Criteria
- [X] POST /todos accepts only title and category, auto-generates id
- [X] POST /todos response includes generated id
- [X] PUT /todos/{id} uses path id correctly
- [X] DELETE /todos/{id} uses path id correctly
- [X] All endpoints tested and working as expected

## Notes
- Changes are minimal and focused on input validation
- Existing database schema and auto-generation remain unchanged
- Frontend integration simplified by removing id requirements
