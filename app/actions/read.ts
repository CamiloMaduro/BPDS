'use server';
// everything here runs on the server, because readTodosFile uses fs

import { readTodosFile, Todo } from '@/lib/todos';

// Returns all the todos, newest first
export async function getTodos(): Promise<Todo[]> {
    // gets the array from todos.json
    const todos = await readTodosFile();

    // the json could be broken, so we check it is really an array
    if (!Array.isArray(todos)) {
        console.error('todos.json is not an array');
        return [];
    }

    // b before a puts the newest ones on top
    return todos.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
