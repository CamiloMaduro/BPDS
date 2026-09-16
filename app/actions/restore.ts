"use server";

import { revalidatePath } from "next/cache";
import { restoreTodo } from "@/lib/todos";

export async function restoreTodoAction(id: string) {
  try {
    if (!id) {
      return { success: false, error: "Todo id is required" };
    }

    const restoredTodo = await restoreTodo(id);

    if (!restoredTodo) {
      return { success: false, error: "Todo not found" };
    }

    revalidatePath("/");
    return { success: true, data: restoredTodo };
  } catch (error) {
    console.error("Error restoring todo:", error);
    return { success: false, error: "Could not restore the todo" };
  }
}
