# 📋 Phase-I: Enhanced Command-Line Todo Application

A beautiful, feature-rich command-line todo application written in Python with an enhanced user interface. Manage your tasks efficiently from the terminal with visual feedback, emojis, and intuitive controls.

## ✨ Features

- **➕ Add Task**: Create new tasks with title and optional description
- **📋 View Tasks**: Display all tasks with completion status indicators `[✓]` or `[ ]`
- **✏️ Update Task**: Modify existing task details with optional field updates
- **🗑️ Delete Task**: Remove tasks with confirmation prompt
- **✅ Mark Complete/Incomplete**: Toggle task completion status
- **🚪 Exit**: Clean application termination with goodbye message

### 🎨 Enhanced UI Features

- **Visual Styling**: Unicode box-drawing characters for borders and separators
- **Emoji Icons**: Intuitive icons for all menu options and feedback
- **Success/Error Messages**: Clear feedback with ✓ and ✗ indicators
- **Input Validation**: Prevents crashes with helpful error messages
- **Confirmation Prompts**: Safeguards against accidental deletions
- **Pause Flow**: "Press Enter to continue" for better user experience

## 🚀 Getting Started

### Prerequisites

- Python 3.13 or higher
- `uv` package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Awaisprogram/Hackathon-II-Evolution-of-Todo.git
   cd Hackathon-II-Evolution-of-Todo
   ```

2. **Create virtual environment:**
   ```bash
   uv venv
   ```

3. **Activate the environment:**
   - On Windows:
     ```bash
     .venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source .venv/bin/activate
     ```

4. **Install dependencies:**
   ```bash
   uv pip sync
   ```

### Running the Application

To start the todo application, run:

```bash
python main.py
```

You will see a beautiful menu interface with 6 options:

```text
==================================================
           📋  TODO APP MANAGER
==================================================

┌────────────────────────────────────────────────┐
│ 1. ➕ Add Task                                  │
│ 2. 📋 View Tasks                                │
│ 3. ✏️  Update Task                              │
│ 4. 🗑️  Delete Task                              │
│ 5. ✅ Mark Complete/Incomplete                  │
│ 6. 🚪 Exit                                      │
└────────────────────────────────────────────────┘

🔹 Select an option (1-6):
```

## 📖 Usage Examples

### Adding a Task
1. Select option **1** (➕ Add Task)
2. Enter task title (required)
3. Enter description (optional, press Enter to skip)
4. Receive confirmation: `✓ Task added successfully!`

### Viewing Tasks
Select option **2** (📋 View Tasks) to see all tasks:

```text
──────────────────────────────────────────────────
  YOUR TASKS
──────────────────────────────────────────────────
[✓] 1. Complete project - Finish the todo app
[ ] 2. Review code - Check for bugs
[ ] 3. Write documentation
```

### Updating a Task
1. Select option **3** (✏️ Update Task)
2. Enter task ID
3. Enter new title (press Enter to skip)
4. Enter new description (press Enter to skip)
5. Receive confirmation: `✓ Task updated successfully!`

### Deleting a Task
1. Select option **4** (🗑️ Delete Task)
2. Enter task ID
3. Confirm with `y` or cancel with `n`
4. Receive confirmation: `✓ Task deleted successfully!`

### Marking Complete/Incomplete
1. Select option **5** (✅ Mark Complete/Incomplete)
2. Enter task ID
3. Enter `y` to mark complete or `n` to mark incomplete
4. Receive confirmation: `✓ Task marked as complete!`

## 🏗️ Development Process

This project is developed using Claude Code and follows Spec-Driven Development (SDD) principles.

### Project Structure

```text
.
├── main.py              # Enhanced console UI with helper functions
├── todo.py              # Core business logic (Task & TodoApp classes)
├── pyproject.toml       # Project metadata and dependencies
├── .python-version      # Python version specification
├── uv.lock              # UV package manager lock file
├── CLAUDE.md            # Claude Code automation instructions
├── constitution.json    # Project constitution and rules
├── specs/               # Feature specifications
│   ├── spec.md          # Feature specification
│   ├── plan.md          # Development plan
│   └── tasks.md         # Task breakdown
└── specs_history/       # Archived specifications
```

### Development Workflow

- **/specs**: Contains specifications, plans, and tasks for features under development
- **/specs_history**: Archives completed feature specifications
- **CLAUDE.md**: Rules and guidelines for AI-assisted development
- **constitution.json**: Project principles and coding standards

## 🛠️ Technical Details

### Architecture

- **Separation of Concerns**:
  - `todo.py`: Pure business logic with no UI code
  - `main.py`: Enhanced console interface with visual styling
- **In-Memory Storage**: All tasks stored in memory (resets on restart)
- **Error Handling**: Comprehensive try-catch blocks prevent crashes
- **Input Validation**: All inputs validated before processing

### Code Quality

- **Type Hints**: Full type annotations for better code clarity
- **Clean Code**: Helper functions for consistent UI rendering
- **Return Values**: Boolean returns for operation success/failure
- **Modular Design**: Easy to extend and maintain

## 🤝 Contributing

Contributions are welcome! Please feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes following the project's coding standards
4. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with Python 3.13
- Developed using Claude Code and Spec-Driven Development
- Part of the **Hackathon-II-Evolution-of-Todo**
- Made with ❤️ and ☕ by **Awais Mehmood**
