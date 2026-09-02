"use server";

import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "todos.json");

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type TodoChanges = {
  title?: string;
  completed?: boolean;
};

export async function updateTodo(id: string, changes: TodoChanges) {
  try {
    const fileData = await fs.readFile(filePath, "utf8");
    const todos: Todo[] = JSON.parse(fileData);

    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, ...changes } : todo
    );

    await fs.writeFile(
      filePath,
      JSON.stringify(updatedTodos, null, 2)
    );

    return { success: true };
  } catch (error) {
    console.error("Error al actualizar:", error);
    return { success: false, error: "No se pudo actualizar la tarea" };
  }
}