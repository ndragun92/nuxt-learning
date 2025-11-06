import { useToastStore } from "~/store/toastStore";

export default function useErrorHandler() {
  const handleError = (_error: string) => {
    const toastStore = useToastStore();
    if (import.meta.browser) {
      toastStore.error({
        text: _error || "Something went wrong",
      });
    } else {
      console.error(_error);
    }
  };

  return { handleError };
}
