<script setup lang="ts">
import { useUserStore } from "~/store/user";
const userStore = useUserStore();
const user = useSupabaseUser();

await useAsyncData("user", async () => {
  if (user.value) {
    await userStore.getUser(user.value.id).then(() => true);
  }
});
</script>

<template>
  <div class="font-Exo">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
