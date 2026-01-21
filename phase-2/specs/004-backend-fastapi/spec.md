# Backend Specification – FastAPI Todo API

## Overview
This backend service is a simple Todo API built using FastAPI. It is designed for learning and prototyping purposes and uses in-memory storage to manage todo items.

## Technology Stack
- Python 3.x
- FastAPI
- Pydantic
- uv (Python environment and dependency manager)

## Data Model

### TodoItem
Each todo item consists of the following fields:

- **id** (integer)  
  Unique identifier for the todo item

- **title** (string)  
  Title or description of the todo

- **category** (string)  
  Allowed values:
  - backlog
  - todo
  - doing
  - done

The default category value is `backlog`.

## API Endpoints

### Root Endpoint
**GET /**  
Returns a message confirming that the API is running.

### Get All Todos
**GET /todos**  
Returns a list of all todo items stored in memory.

### Create Todo
**POST /todos**  
Creates a new todo item and stores it in the in-memory list.

### Update Todo
**PUT /todos/{id}**  
Updates the title of an existing todo item identified by its ID.

### Delete Todo
**DELETE /todos/{id}**  
Deletes a todo item by its ID and returns the updated list.

## Storage Behavior
- Todos are stored in an in-memory Python list
- Data is not persistent
- Restarting the server clears all todos

## Limitations
- No validation for duplicate IDs
- No error handling for missing IDs
- No authentication or authorization
- Not intended for production use
