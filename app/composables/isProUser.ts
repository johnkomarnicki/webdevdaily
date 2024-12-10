import { useUserStore } from "~/store/user";

export const isProUser = () => {
  const userStore = useUserStore();

  return computed(() => {
    return userStore.userInfo ? userStore.userInfo.subscription?.stripe_status === "active" : null;
  });
};
