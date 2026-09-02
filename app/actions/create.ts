"use server";

import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

const todosFilePath = path.join(process.cwd(), "data", "todos.json");

export async function addTodo(title: string) {
  let todos = [];

  try {
    const data = await fs.readFile(todosFilePath, "utf-8");
    todos = JSON.parse(data);
  } catch {
    await fs.mkdir(path.dirname(todosFilePath), { recursive: true });
  }

  const newTodo = {
    id: randomUUID(),
    title,
    completed: false,
  };

  todos = [newTodo, ...todos];

  await fs.writeFile(todosFilePath, JSON.stringify(todos, null, 2));

  return newTodo;
}