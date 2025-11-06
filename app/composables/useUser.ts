export type TUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

const user = ref<TUser | null>(null);
export default function useUser() {
  const setUser = (u: TUser) => {
    user.value = u;
  };

  return {
    user,
    setUser,
  };
}
