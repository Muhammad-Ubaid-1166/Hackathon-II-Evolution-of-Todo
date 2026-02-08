# Frontend-Backend Integration

This feature connects the Next.js frontend with the FastAPI backend to enable seamless communication between the two services.

## Setup

1. The backend URL is configured in `frontend/.env.local`:
   ```
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
   ```

2. The frontend uses the API service at `frontend/src/services/api.ts` to make calls to the backend endpoints:
   - GET `/todos` - Get all todos
   - POST `/todos` - Create a new todo
   - PUT `/todos/{id}` - Update an existing todo
   - DELETE `/todos/{id}` - Delete a todo

## Backend Configuration

The FastAPI backend in `backend/main.py` has been updated with CORS middleware to allow requests from the frontend:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Frontend Integration

The Kanban board in `frontend/src/components/home/demo-section.tsx` has been updated to:
- Fetch todos from the backend on initial load
- Create new todos via the backend API
- Update todo status (move between columns) via the backend API
- Delete todos via the backend API
- Handle loading states and error conditions

## API Endpoints Used

- Root: `GET /` - Check if API is running
- Todos: `GET /todos` - Get all todos
- Create: `POST /todos` - Create a new todo
- Update: `PUT /todos/{id}` - Update a todo
- Delete: `DELETE /todos/{id}` - Delete a todo