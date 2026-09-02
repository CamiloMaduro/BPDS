"use server";

import { promises as fs } from "fs";
import path from "path";

const todosFilePath = path.join(process.cwd(), "data", "todos.json");

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export async function removeTodo(id: string) {
  const data = await fs.readFile(todosFilePath, "utf-8");
  const todos: Todo[] = JSON.parse(data);

  const updatedTodos = todos.filter((todo) => todo.id !== id);

  await fs.writeFile(
    todosFilePath,
    JSON.stringify(updatedTodos, null, 2)
  );
}