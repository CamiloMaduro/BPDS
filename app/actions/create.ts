import type { Todo } from "@/lib/todos";
import { createTodoInStorage } from "@/lib/todos-storage";

export interface CreateTodoActionData {
    success: boolean;
    data?: Todo;
    error?: string;
}


export async function createTodoAction(title: string): Promise<CreateTodoActionData> {
    try {
        if (typeof title !== 'string' || title.trim() === '') {
            return { success: false, error: 'Task title is required and cannot be empty' };
        }

        const newTodo = createTodoInStorage(title);
        return { success: true, data: newTodo };
    } catch (error) {
        console.error('Error creating todo:', error);
        return {
            success: false,
            error: error instanceof Error
                ? error.message
                : 'An error occurred while creating the todo item',
        };
    }
}
