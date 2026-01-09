from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, Field, create_engine, Session, select
from enum import Enum
from typing import Optional
import uuid
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)


class Priority(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"


class Task(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True, index=True)
    title: str = Field(index=True)
    completed: bool = Field(default=False)
    priority: Priority = Field(default=Priority.medium)
    dueDate: str = Field(default="")
    createdAt: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


class TaskCreate(SQLModel):
    title: str
    priority: Priority = Priority.medium
    dueDate: str = ""


SQLModel.metadata.create_all(bind=engine)

app = FastAPI(title="TodoApp API")

# Add CORS middleware to allow only the specified frontend URL to make API calls
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Health check endpoint
@app.get("/")
def get_api():
    return {"message": "API is running", "status": "healthy"}


@app.get("/tasks")
def get_tasks() -> list[Task]:
    """Get all tasks"""
    with Session(engine) as session:
        tasks = session.exec(select(Task)).all()
        return tasks


@app.post("/tasks")
def create_task(task: TaskCreate):
    """Create a new task"""
    with Session(engine) as session:
        db_task = Task(
            title=task.title,
            priority=task.priority,
            dueDate=task.dueDate or datetime.utcnow().isoformat()
        )
        session.add(db_task)
        session.commit()
        session.refresh(db_task)
        return db_task


@app.put("/tasks/{id}")
def update_task(id: str, update_data: Task) -> Task | dict:
    """Update a task by ID"""
    with Session(engine) as session:
        db_task = session.exec(select(Task).where(Task.id == id)).first()
        if db_task:
            db_task.title = update_data.title
            db_task.completed = update_data.completed
            db_task.priority = update_data.priority
            db_task.dueDate = update_data.dueDate
            session.commit()
            session.refresh(db_task)
            return db_task
        return {"error": "Task not found"}


@app.patch("/tasks/{id}/toggle")
def toggle_task_completion(id: str) -> Task | dict:
    """Toggle task completion status"""
    with Session(engine) as session:
        db_task = session.exec(select(Task).where(Task.id == id)).first()
        if db_task:
            db_task.completed = not db_task.completed
            session.commit()
            session.refresh(db_task)
            return db_task
        return {"error": "Task not found"}


@app.delete("/tasks/{id}")
def delete_task(id: str) -> dict:
    """Delete a task by ID"""
    with Session(engine) as session:
        db_task = session.exec(select(Task).where(Task.id == id)).first()
        if db_task:
            session.delete(db_task)
            session.commit()
            return {"message": "Task deleted", "id": id}
        return {"error": "Task not found"}


@app.get("/tasks/stats")
def get_task_stats():
    """Get task statistics"""
    with Session(engine) as session:
        tasks = session.exec(select(Task)).all()
        
        total_tasks = len(tasks)
        completed_tasks = sum(1 for task in tasks if task.completed)
        pending_tasks = total_tasks - completed_tasks
        
        today = datetime.utcnow().date()
        today_tasks = sum(1 for task in tasks if datetime.fromisoformat(task.createdAt).date() == today)
        
        high_priority_tasks = sum(1 for task in tasks if task.priority == Priority.high and not task.completed)
        
        return {
            "total_tasks": total_tasks,
            "completed_tasks": completed_tasks,
            "pending_tasks": pending_tasks,
            "today_tasks": today_tasks,
            "high_priority_tasks": high_priority_tasks,
            "completion_rate": round((completed_tasks / total_tasks * 100) if total_tasks > 0 else 0, 1)
        }
