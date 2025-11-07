export type TUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

const user = ref<TUser | null>(null);
export default function useUser() {
  const setUser = (_user: TUser) => {
    user.value = _user;
  };

  const fullName = computed(() => {
    return `${user.value?.firstName} ${user.value?.lastName}`;
  });

  return {
    user,
    fullName,
    setUser,
  };
}
