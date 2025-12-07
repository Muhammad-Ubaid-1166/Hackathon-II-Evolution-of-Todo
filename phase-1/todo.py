from typing import List

class Task:
    def __init__(self, task_id: int, title: str, description: str):
        self.id = task_id
        self.title = title
        self.description = description
        self.completed = False

    def __str__(self):
        status = "✅" if self.completed else "❌"
        return f"[{status}] {self.id}. {self.title}: {self.description}"


class TodoApp:
    def __init__(self):
        self.tasks: List[Task] = []
        self.next_id: int = 1

    def add_task(self, title: str, description: str):
        task = Task(self.next_id, title, description)
        self.tasks.append(task)
        self.next_id += 1
        print(f"Task '{title}' added successfully!")

    def view_tasks(self):
        if not self.tasks:
            print("No tasks available.")
        for task in self.tasks:
            print(task)

    def update_task(self, task_id: int, title: str = None, description: str = None):
        task = self._find_task(task_id)
        if task:
            if title:
                task.title = title
            if description:
                task.description = description
            print(f"Task {task_id} updated successfully!")
        else:
            print(f"Task {task_id} not found.")

    def delete_task(self, task_id: int):
        task = self._find_task(task_id)
        if task:
            self.tasks.remove(task)
            print(f"Task {task_id} deleted successfully!")
        else:
            print(f"Task {task_id} not found.")

    def mark_complete(self, task_id: int, completed: bool = True):
        task = self._find_task(task_id)
        if task:
            task.completed = completed
            state = "completed" if completed else "incomplete"
            print(f"Task {task_id} marked as {state}.")
        else:
            print(f"Task {task_id} not found.")

    def _find_task(self, task_id: int) -> Task:
        for task in self.tasks:
            if task.id == task_id:
                return task
        return None
