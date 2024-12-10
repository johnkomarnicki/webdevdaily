import type { Database, Tables } from "../../types/database.types";
type UserWithSubscription = Tables<"profiles"> & {
  subscription?: Tables<"subscriptions">;
};

export const useUserStore = defineStore("user", () => {
  const supabase = useSupabaseClient<Database>();
  const userInfo = ref<UserWithSubscription>();

  async function getUser(userId: string) {
    const { data: profileData, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    // Check for pro subscription
    const { data: subscriptionData, error: subscriptionError } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    let proSchedule;
    // if (subscriptionData && subscriptionData?.stripe_id && subscriptionData.type !== "lifetime") {
    //   const { schedule } = await $fetch(
    //     `/api/plan/${subscriptionData?.price_id}?subscriptionId=${subscriptionData?.stripe_id}`
    //   );
    //   proSchedule = schedule;
    // }

    // Set default user settings
    if (!profileData?.editor_settings) {
      if (profileData)
        profileData.editor_settings = {
          theme: "vs-code-dark",
          fontSize: 15,
          formatOnSave: true,
        };
    }

    if (profileData && subscriptionData) {
      userInfo.value = {
        ...profileData,
        subscription: subscriptionData,
        // ...proSchedule,
      };
    } else if (profileData) {
      userInfo.value = { ...profileData };
    }
  }

  return {
    userInfo,
    getUser,
  };
});
