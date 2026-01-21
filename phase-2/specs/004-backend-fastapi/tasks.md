# Development Tasks

## Setup
- [X] Install `uv` globally
- [X] Initialize Python project using `uv init`
- [X] Create and activate virtual environment
- [X] Install `fastapi` and `uvicorn`
- [X] Verify Python version compatibility

## Application: Infrastructure
- [X] Create `main.py`
- [X] Initialize FastAPI application instance
- [X] Configure application entry point
- [X] Add root health-check endpoint (`GET /`)

## Data Model
- [X] Create `TodoItem` Pydantic model
- [X] Add `id` field (integer)
- [X] Add `title` field (string)
- [X] Add `category` field with Literal values:
  - backlog
  - todo
  - doing
  - done
- [X] Set default category to `backlog`

## In-Memory Storage
- [X] Initialize empty `todos` list
- [X] Ensure todos are stored in application memory
- [X] Verify data resets on server restart

## CRUD Endpoints

### Read
- [X] Implement `GET /todos`
- [X] Return full list of todos

### Create
- [X] Implement `POST /todos`
- [X] Accept `TodoItem` request body
- [X] Append todo to in-memory list
- [X] Return created todo

### Update
- [X] Implement `PUT /todos/{id}`
- [X] Locate todo by ID
- [X] Update todo title
- [X] Return updated todo

### Delete
- [X] Implement `DELETE /todos/{id}`
- [X] Locate todo by ID
- [X] Remove todo from list
- [X] Return updated todos list

## Testing
- [X] Run development server using `uvicorn`
- [X] Open Swagger UI (`/docs`)
- [X] Test create todo flow
- [X] Test update todo flow
- [X] Test delete todo flow

## Validation & Review
- [X] Verify API responses match expected structure
- [X] Confirm category defaults work correctly
- [X] Check behavior when list is empty

## Future Improvements
- [X] Add error handling for invalid IDs
- [X] Prevent duplicate todo IDs
- [X] Add response status codes
- [X] Add persistent database storage
- [X] Add pagination and filtering
