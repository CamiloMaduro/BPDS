'use server';

import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'todos.json');

export async function updateTodo(id: string, newTitle: string) {
  try {
    const fileData = await fs.readFile(filePath, 'utf8');
    const todos = JSON.parse(fileData);

    const updatedTodos = todos.map((todo: any) => {
      if (todo.id === id) {
        return { ...todo, title: newTitle };
      }
      return todo;
    });

    await fs.writeFile(filePath, JSON.stringify(updatedTodos, null, 2));

    return { success: true };
  } catch (error) {
    console.error('Error al actualizar:', error);
    return { success: false, error: 'No se pudo actualizar la tarea' };
  }
}