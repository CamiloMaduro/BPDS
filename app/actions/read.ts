"use server";

import { promises as fs } from "fs";
import path from "path";

const todosFilePath = path.join(process.cwd(), "data", "todos.json");

export async function getTodos() {
  try {
    const data = await fs.readFile(todosFilePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}