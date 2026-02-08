const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"
export interface Todo {
  id: number;
  title: string;
  category: "backlog" | "todo" | "doing" | "done";
}

class TodoAPI {
  static getHeaders(token: string) {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  static async getTodos(token: string): Promise<Todo[]> {
    const response = await fetch(`${BACKEND_URL}/todos`, {
      headers: this.getHeaders(token),
    });
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    return await response.json();
  }

  static async createTodo(
    todo: { title: string; category: string },
    token: string
  ): Promise<Todo> {
    const response = await fetch(`${BACKEND_URL}/todos`, {
      method: "POST",
      headers: this.getHeaders(token),
      body: JSON.stringify(todo),
    });
    return await response.json();
  }

  static async updateTodo(
    id: number,
    todo: Todo,
    token: string
  ): Promise<Todo> {
    const response = await fetch(`${BACKEND_URL}/todos/${id}`, {
      method: "PUT",
      headers: this.getHeaders(token),
      body: JSON.stringify(todo),
    });
    return await response.json();
  }

  static async deleteTodo(id: number, token: string): Promise<any> {
    const response = await fetch(`${BACKEND_URL}/todos/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(token),
    });
    return await response.json();
  }
}

export default TodoAPI;
