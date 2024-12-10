<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { seoConfig } from "~/utils/seo.config";

useSeoMeta({
  title: "WebDevDaily | Login",
  description: seoConfig.description,
  ogTitle: "WebDevDaily | Login",
  ogDescription: seoConfig.description,
  ogImage: "https://webdevdaily.io/webdevdaily_logo.png",
  ogUrl: "https://webdevdaily.io/",
  twitterTitle: "WebDevDaily | Login",
  twitterDescription: seoConfig.description,
  twitterImage: "https://webdevdaily.io/webdevdaily_logo.png",
  twitterCard: "summary",
});

definePageMeta({
  layout: "auth",
});

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string(),
});

type Schema = z.output<typeof schema>;

const { auth } = useSupabaseClient();
const formState = reactive({
  email: undefined,
  password: undefined,
});
const toast = useToast();
const router = useRouter();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  signIn(event.data);
}

async function signIn(formData: Schema) {
  try {
    const { error } = await auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (error) throw error;
    router.push("/");
  } catch (error) {
    const err = error as Error;
    toast.add({
      color: "red",
      icon: "i-heroicons-exclamation-triangle-20-solid",
      title: err.message,
    });
  }
}

async function signUpOAuth() {
  try {
    const { error } = await auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${useRuntimeConfig().public.apiBase}/confirm`,
      },
    });
    if (error) throw error;
  } catch (error) {
    toast.add({ color: "red", icon: "i-fluent-checkmark-circle-12-filled", title: error.message });
  }
}
</script>

<template>
  <div
    class="flex flex-col gap-6 rounded-md bg-white p-8 text-xs text-[#292727] shadow-md sm:p-12 sm:text-sm"
  >
    <div>
      <h1 class="text-xl sm:text-2xl">Sign in</h1>
      <p>Choose your preferred sign in method</p>
    </div>
    <UButton
      color="abbey"
      @click="signUpOAuth"
      icon="i-logos-google-icon"
      label="Sign in with Google"
      block
      size="lg"
    />
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-[#292727]"></div>
      </div>
      <div class="relative flex justify-center">
        <span class="bg-white px-2 text-sm text-[#292727]"> or continue with </span>
      </div>
    </div>
    <UForm
      :schema="schema"
      :state="formState"
      @submit.prevent="onSubmit"
      class="flex flex-col gap-3"
    >
      <div class="flex flex-col">
        <UFormGroup label="Email" name="email">
          <UInput v-model="formState.email" />
        </UFormGroup>
      </div>
      <div class="flex flex-col">
        <UFormGroup label="Password" name="password">
          <UInput autocomplete v-model="formState.password" type="password" />
        </UFormGroup>
      </div>
      <UButton class="mt-3" type="submit" label="Sign in" block size="lg" />
    </UForm>
  </div>
</template>

<style scoped></style>
