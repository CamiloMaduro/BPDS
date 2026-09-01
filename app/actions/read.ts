'use server';
// everything here runs on the server, because readTodosFile uses fs

import { readTodosFile, Todo } from '@/lib/todos';

// Returns all the todos, newest first
export async function getTodos(): Promise<Todo[]> {
    // gets the array from todos.json
    const todos = await readTodosFile();
    // b before a puts the newest ones on top
    return todos.sort((a, b) => b.created_at.localeCompare(a.created_at));
}
