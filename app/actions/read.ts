import type { Todo } from "@/lib/todos";
import { getTodoListsFromStorage } from "@/lib/todos-storage";

export interface TodoLists {
    active: Todo[];
    deleted: Todo[];
}

// Returns the todos in the trash, newest first
export async function getDeletedTodos(): Promise<Todo[]> {
    return getTodoListsFromStorage().deleted;
}

// Returns both lists, so the page can read them in one call
export async function getTodoLists(): Promise<TodoLists> {
    return getTodoListsFromStorage();
}

// Returns all the todos, newest first
export async function getTodos(): Promise<Todo[]> {
    return getTodoListsFromStorage().active;
}
