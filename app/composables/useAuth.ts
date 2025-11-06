export default function useAuth() {
  const token = useCookie("token");

  const setToken = (_token: string) => {
    useCookie("token", {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    }).value = _token;
  };

  const onLogout = () => {
    setToken("");
    navigateTo("/auth/login");
  };

  return {
    token,
    setToken,
    onLogout,
  };
}
