'use server';

import { deleteTodo } from '@/lib/todos';
import { revalidatePath } from 'next/cache';

export async function deleteTodoAction(id: string) {
  try {
    if (!id) {
      throw new Error('Todo id is required');
    }

    await deleteTodo(id);
    revalidatePath('/');

    return {
      success: true,
      message: 'Todo deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting todo:', error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred',
    };
  }
}
