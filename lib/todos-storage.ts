import type { Todo } from "@/lib/todos";

const STORAGE_KEY = "bpds-todos";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readTodosFromStorage(): Todo[] {
  if (typeof window === "undefined") {
    throw new Error("El almacenamiento del navegador no está disponible.");
  }

  const storedTodos = window.localStorage.getItem(STORAGE_KEY);

  if (storedTodos === null) {
    return [];
  }

  const parsedTodos: unknown = JSON.parse(storedTodos);

  if (!Array.isArray(parsedTodos)) {
    throw new Error("Los datos guardados de tareas no tienen un formato válido.");
  }

  return parsedTodos.map((value): Todo => {
    if (
      !isRecord(value) ||
      typeof value.id !== "string" ||
      typeof value.title !== "string" ||
      typeof value.completed !== "boolean" ||
      typeof value.createdAt !== "string" ||
      (value.deleted !== undefined && typeof value.deleted !== "boolean") ||
      (value.deletedAt !== undefined &&
        value.deletedAt !== null &&
        typeof value.deletedAt !== "string")
    ) {
      throw new Error("Una tarea guardada no tiene un formato válido.");
    }

    return {
      id: value.id,
      title: value.title,
      completed: value.completed,
      createdAt: value.createdAt,
      deleted: value.deleted === true,
      deletedAt: typeof value.deletedAt === "string" ? value.deletedAt : null,
    };
  });
}

function writeTodosToStorage(todos: Todo[]): void {
  if (typeof window === "undefined") {
    throw new Error("El almacenamiento del navegador no está disponible.");
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function getTodoListsFromStorage() {
  const todos = readTodosFromStorage();
  const newestFirst = (first: Todo, second: Todo) =>
    second.createdAt.localeCompare(first.createdAt);

  return {
    active: todos.filter((todo) => todo.deleted !== true).sort(newestFirst),
    deleted: todos.filter((todo) => todo.deleted === true).sort(newestFirst),
  };
}

export function createTodoInStorage(title: string): Todo {
  if (typeof title !== "string" || title.trim() === "") {
    throw new Error("El título de la tarea no puede estar vacío.");
  }

  const todos = readTodosFromStorage();
  const newTodo: Todo = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    title: title.trim(),
    completed: false,
    deleted: false,
    deletedAt: null,
    createdAt: new Date().toISOString(),
  };

  writeTodosToStorage([...todos, newTodo]);
  return newTodo;
}

export function updateTodoInStorage(
  id: string,
  changes: Partial<Pick<Todo, "title" | "completed">>
): void {
  if (!id) {
    throw new Error("El identificador de la tarea es obligatorio.");
  }

  const todos = readTodosFromStorage();
  const todoExists = todos.some((todo) => todo.id === id);

  if (!todoExists) {
    throw new Error("No se encontró la tarea.");
  }

  writeTodosToStorage(
    todos.map((todo) => (todo.id === id ? { ...todo, ...changes } : todo))
  );
}

export function deleteTodoInStorage(id: string): void {
  if (!id) {
    throw new Error("El identificador de la tarea es obligatorio.");
  }

  const todos = readTodosFromStorage();
  const todoExists = todos.some((todo) => todo.id === id);

  if (!todoExists) {
    throw new Error("No se encontró la tarea.");
  }

  writeTodosToStorage(
    todos.map((todo) =>
      todo.id === id
        ? { ...todo, deleted: true, deletedAt: new Date().toISOString() }
        : todo
    )
  );
}

export function restoreTodoInStorage(id: string): Todo | null {
  if (!id) {
    throw new Error("El identificador de la tarea es obligatorio.");
  }

  const todos = readTodosFromStorage();
  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    return null;
  }

  const restoredTodo = { ...todo, deleted: false, deletedAt: null };
  writeTodosToStorage(
    todos.map((item) => (item.id === id ? restoredTodo : item))
  );

  return restoredTodo;
}
