import fs from 'fs/promises';
import path from 'path';


// TypeScript interface defining the Todo entity structure
export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    created_at: string;
}


// Fefine the absolute file path to the local JSON storage

const filePath = path.join(process.cwd(), 'data', 'todos.json');


/**
 * Reusable helper function to read and parse the todos.json file.
 * Returns an array if the file does not exist or fails to read.
 */


export async function readTodosFile(): Promise<Todo[]> {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data) as Todo[];
    } catch (error) {
        console.error('Error reading todos file:', error);
        return [];
    }
}

// Saves the todos array back into todos.json
export async function writeTodosFile(todos: Todo[]): Promise<void> {
    try {
        // null and 2 make the JSON easy to read
        await fs.writeFile(filePath, JSON.stringify(todos, null, 2), 'utf-8');
    } catch (error) {
        // we throw here so the caller knows the todo was not saved
        console.error('Error writing todos file:', error);
        throw error;
    }
}

// Deletes a todo by id and verifies that it was removed
export async function deleteTodo(id: string): Promise<void> {
  const todos = await readTodosFile();

  // Validate that the todo exists
  const todoExists = todos.some((todo) => todo.id === id);

  if (!todoExists) {
    throw new Error('Todo not found');
  }

  // Remove the todo with the matching id
  const updatedTodos = todos.filter((todo) => todo.id !== id);

  await writeTodosFile(updatedTodos);

  // Verify that the todo was actually deleted
  const remainingTodos = await readTodosFile();

  const stillExists = remainingTodos.some((todo) => todo.id === id);

  if (stillExists) {
    throw new Error('Todo could not be deleted');
  }
}