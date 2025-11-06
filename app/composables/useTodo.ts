import { useToastStore } from "~/store/toastStore";

export type TTodo = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: number;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function useTodo() {
  const { handleError } = useErrorHandler();
  const { $api } = useNuxtApp();
  const toastStore = useToastStore();

  const onAddTodo = async () => {
    const [error] = await catchError(
      $api<{ todos: TTodo[] }>("/api/todos", {
        method: "POST",
        body: {
          title: "Test",
          description: "Test",
          dueDate: "2024-01-01",
          priority: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      }),
    );

    if (error) {
      handleError(error._message);
      return;
    }

    toastStore.success({
      text: "Successfully added new task",
    });
    await refreshNuxtData("todos");
  };

  const onToggleCompletedState = async (_id: TTodo["id"], _todo: TTodo) => {
    const newState = !_todo.completed;
    const [error] = await catchError(
      $api<{ todos: TTodo[] }>(`/api/todos/${_id}`, {
        method: "PATCH",
        body: {
          completed: newState,
        },
      }),
    );
    if (error) {
      handleError(error._message);
      return;
    }

    toastStore.success({
      text: `Successfully marked task as ${newState ? "completed" : "incomplete"}`,
    });

    // If _todo is present then make optimistic update
    if (_todo) {
      _todo.completed = newState;
    } else {
      await refreshNuxtData("todos");
    }
  };

  return { onAddTodo, onToggleCompletedState };
}
