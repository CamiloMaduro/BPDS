'use client';

import { useState } from 'react';
import { deleteTodoAction } from '@/app/actions/delete';

interface DeleteTodoButtonProps {
  id: string;
}

export default function DeleteTodoButton({
  id,
}: DeleteTodoButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      'Are you sure you want to delete this todo?'
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    const result = await deleteTodoAction(id);

    setIsDeleting(false);

    if (!result.success) {
      window.alert(result.message);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      aria-label="Delete todo"
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
}