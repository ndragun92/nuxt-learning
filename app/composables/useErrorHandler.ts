export default function useErrorHandler() {
  const toastStore = useToastStore();
  const handleError = (_error: string) => {
    toastStore.error({
      text: _error || "Something went wrong",
    });
  };

  return { handleError };
}
