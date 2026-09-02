'use server';

import { createTodo, Todo } from '@/lib/todos';

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
        if (!title || title.trim() === '' || typeof title !== 'string') {
            return { success: false, error: 'Task title is required and cannot be empty' };
        }
        const newTodo = await createTodo(title);
        return { success: true, data: newTodo };


    } catch (error) {
        console.error('Error in addTodo Server Action', error);
        return {success: false, error: 'An error occurred while creating the todo item'};
    }
}