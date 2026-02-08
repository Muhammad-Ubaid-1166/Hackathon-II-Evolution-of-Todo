# TODO: Update main.py to properly use SQLModel

- [x] Update imports: add from enum import Enum, from typing import Optional
- [x] Define Category enum
- [x] Redefine Todo as SQLModel with table=True, using Field for attributes
- [x] Update database creation to SQLModel.metadata.create_all(bind=engine)
- [x] Remove SQLBase, TodoItem, SessionLocal
- [x] Update get_todos endpoint to return list of Todo objects
- [x] Update create_todo endpoint to use Todo model with id optional
- [x] Update update_todo endpoint to use Todo model
- [x] Update delete_todo endpoint to use session.exec and session.delete
- [x] Test the updated code
