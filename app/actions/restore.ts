import { restoreTodoInStorage } from "@/lib/todos-storage";

export async function restoreTodoAction(id: string) {
  try {
    if (!id) {
      return { success: false, error: "Todo id is required" };
    }

    const restoredTodo = restoreTodoInStorage(id);

    if (!restoredTodo) {
      return { success: false, error: "Todo not found" };
    }

    return { success: true, data: restoredTodo };
  } catch (error) {
    console.error("Error restoring todo:", error);
    return { success: false, error: "Could not restore the todo" };
  }
}
