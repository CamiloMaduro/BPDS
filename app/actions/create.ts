'use server';

import { createTodo, Todo } from '@/lib/todos';
import { revalidatePath } from 'next/cache';

export interface CreateTodoActionData {
    success: boolean;
    data?: Todo;
    error?: string;
}


/**
 * Server Action to handle the creation of a new Todo item
 */
export async function createTodoAction(title: string): Promise<CreateTodoActionData> {
    try {
        if (typeof title !== 'string' || title.trim() === '') {
            return { success: false, error: 'Task title is required and cannot be empty' };
        }

        const newTodo = await createTodo(title);

        revalidatePath('/'); // Revalidate the root path to update the list of todos

        return { success: true, data: newTodo };


    } catch (error) {
        console.error('Error in createTodo Server Action', error);
        return {success: false, error: 'An error occurred while creating the todo item'};
    }
}
