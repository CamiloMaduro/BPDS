import { updateTodoInStorage } from "@/lib/todos-storage";

type TodoChanges = {
  title?: string;
  completed?: boolean;
};

export async function updateTodo(id: string, changes: TodoChanges) {
  try {
    if (!id) {
      return { success: false, error: "Todo id is required" };
    }

    updateTodoInStorage(id, changes);

    return { success: true };
  } catch (error) {
    console.error("Error al actualizar:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "No se pudo actualizar la tarea",
    };
  }
}
