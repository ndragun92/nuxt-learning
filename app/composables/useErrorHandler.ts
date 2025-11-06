export default function useErrorHandler() {
  const toastStore = useToastStore();
  const handleError = (error: string) => {
    toastStore.error({
      text: error || "Something went wrong",
    });
  };

  return { handleError };
}
