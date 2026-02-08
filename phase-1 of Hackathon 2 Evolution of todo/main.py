from todo import TodoApp

def print_header():
    """Print a styled header for the app"""
    print("\n" + "=" * 50)
    print("📋  TODO APP MANAGER".center(50))
    print("=" * 50)

def print_menu():
    """Print a styled menu"""
    menu_options = [
        ("1", "➕ Add Task"),
        ("2", "📋 View Tasks"),
        ("3", "✏️  Update Task"),
        ("4", "🗑️  Delete Task"),
        ("5", "✅ Mark Complete/Incomplete"),
        ("6", "🚪 Exit")
    ]
    
    print("\n┌" + "─" * 48 + "┐")
    for key, action in menu_options:
        print(f"│ {key}. {action:<44} │")
    print("└" + "─" * 48 + "┘")

def get_input(prompt, allow_empty=False):
    """Get user input with consistent styling"""
    value = input(f"\n🔹 {prompt} ").strip()
    if not allow_empty and not value:
        return None
    return value

def print_success(message):
    """Print success message"""
    print(f"\n✓ {message}")

def print_error(message):
    """Print error message"""
    print(f"\n✗ {message}")

def main():
    app = TodoApp()

    while True:
        print_header()
        print_menu()

        choice = get_input("Select an option (1-6):")

        try:
            if choice == "1":
                print("\n" + "─" * 50)
                print("  ADD NEW TASK")
                print("─" * 50)
                title = get_input("Enter task title:")
                if not title:
                    print_error("Title cannot be empty!")
                    continue
                description = get_input("Enter task description:", allow_empty=True)
                app.add_task(title, description or "")
                print_success("Task added successfully!")

            elif choice == "2":
                print("\n" + "─" * 50)
                print("  YOUR TASKS")
                print("─" * 50)
                app.view_tasks()

            elif choice == "3":
                print("\n" + "─" * 50)
                print("  UPDATE TASK")
                print("─" * 50)
                task_id = get_input("Enter task ID to update:")
                if not task_id or not task_id.isdigit():
                    print_error("Invalid task ID!")
                    continue
                title = get_input("Enter new title (press Enter to skip):", allow_empty=True)
                description = get_input("Enter new description (press Enter to skip):", allow_empty=True)
                app.update_task(
                    int(task_id),
                    title if title else None,
                    description if description else None
                )
                print_success("Task updated successfully!")

            elif choice == "4":
                print("\n" + "─" * 50)
                print("  DELETE TASK")
                print("─" * 50)
                task_id = get_input("Enter task ID to delete:")
                if not task_id or not task_id.isdigit():
                    print_error("Invalid task ID!")
                    continue
                confirm = get_input("Are you sure? (y/n):")
                if confirm and confirm.lower() == "y":
                    app.delete_task(int(task_id))
                    print_success("Task deleted successfully!")
                else:
                    print("Deletion cancelled.")

            elif choice == "5":
                print("\n" + "─" * 50)
                print("  MARK TASK STATUS")
                print("─" * 50)
                task_id = get_input("Enter task ID:")
                if not task_id or not task_id.isdigit():
                    print_error("Invalid task ID!")
                    continue
                completed_input = get_input("Mark as complete? (y/n):")
                if completed_input and completed_input.lower() in ['y', 'n']:
                    completed = completed_input.lower() == "y"
                    app.mark_complete(int(task_id), completed)
                    status = "complete" if completed else "incomplete"
                    print_success(f"Task marked as {status}!")
                else:
                    print_error("Invalid input! Please enter 'y' or 'n'")

            elif choice == "6":
                print("\n" + "=" * 50)
                print("👋 Thank you for using Todo App! Goodbye!".center(50))
                print("=" * 50 + "\n")
                break

            else:
                print_error("Invalid option! Please select 1-6.")

        except ValueError as e:
            print_error(f"Invalid input: {e}")
        except Exception as e:
            print_error(f"An error occurred: {e}")

        # Pause before showing menu again
        if choice != "6":
            input("\nPress Enter to continue...")

if __name__ == "__main__":
    main()