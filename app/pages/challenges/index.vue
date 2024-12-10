<script setup lang="ts">
import type { Database } from "../../../types/database.types";
import { formatDistance } from "date-fns";
import { seoConfig } from "~/utils/seo.config";

useSeoMeta({
  title: "WebDevDaily | Challenges",
  description: seoConfig.description,
  ogTitle: "WebDevDaily | Challenges",
  ogDescription: seoConfig.description,
  ogImage: "https://www.webdevdaily.io/home_page.png?4362984378",
  ogUrl: seoConfig.ogUrl,
  twitterTitle: "WebDevDaily | Challenges",
  twitterDescription: seoConfig.description,
  twitterImage: "https://www.webdevdaily.io/home_page.png?4362984378",
  twitterCard: "summary_large_image",
});

const user = useSupabaseUser();
const client = useSupabaseClient<Database>();
// const editorStore = useEditorStore();
const { timeRemaining } = useCalcCountdown();

const { data, error, refresh } = await useAsyncData(async () => {
  const { data: challenge, error } = await $fetch("/api/challenge");
  const {
    data: submissions,
    error: submissionsError,
    count,
  } = await $fetch(`/api/submissions?param=${challenge?.param}`, {
    method: "POST",
  });
  return { challenge, error, submissions, submissionsError, count };
});

const toast = useToast();
const loadingCreateChallenge = ref(false);
async function createChallenge() {
  try {
    loadingCreateChallenge.value = true;

    const { data: userChallenge } = await client
      .from("challenge_entries")
      .select("*")
      .eq("user_id", user.value?.id as string)
      .eq("challenge_id", data.value?.challenge?.challenge_id as number)
      .single();

    if (userChallenge) {
      navigateTo(`/challenges/${data.value?.challenge?.param}/${userChallenge.id}`);
      return;
    }

    // editorStore.setDefaultContent(false);
    // const challenge = await editorStore.createChallenge(data.value?.challenge);
    // navigateTo(`/challenges/${data.value?.challenge?.param}/${challenge.id}`);
  } catch {
    toast.add({
      color: "red",
      title: "Something went wrong. Unable to start challenge.",
      icon: "i-fluent-checkmark-circle-12-filled",
      timeout: 1500,
    });
  }
}
</script>

<template>
  <section class="pb-8 pt-36 md:pb-[70px]">
    <div class="container flex max-w-screen-lg flex-col items-center">
      <h2 class="mb-4 text-center text-xl font-medium uppercase text-font-color sm:text-2xl">
        Current UI Challenge
      </h2>
      <p class="text-balance max-w-screen-md items-center text-center text-font-color">
        Practice your <b>HTML</b>, <b>CSS</b>, and <b>Javascript</b> skills by building practical
        components. We handle the design aspect, allowing you to focus solely on coding.
      </p>
    </div>
    <div
      class="mx-auto flex max-w-screen-lg flex-col items-center justify-center gap-x-6 gap-y-12 px-8 py-8"
    >
      <div
        class="flex flex-col gap-16 rounded-md border-[0.5px] w-full border-slate-300/90 bg-[#fafafa] p-8 shadow md:flex-row md:gap-24"
      >
        <template v-if="data">
          <div class="basis-[50%] self-center md:order-2">
            <NuxtImg
              :src="data.challenge?.image_url"
              format="webp"
              class="w-100% relative z-10 h-[100%] rounded-md shadow-md"
            />
          </div>
          <div class="flex basis-[50%] flex-col justify-center gap-8 md:order-1">
            <div class="flex flex-col gap-6 rounded-md text-font-color">
              <div class="flex flex-col gap-2">
                <div class="flex gap-2">
                  <h2 class="text-xl font-semibold sm:text-2xl">
                    {{ data?.challenge?.title }}
                  </h2>
                  <div
                    v-if="data?.challenge?.design_link"
                    class="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white shadow-md"
                  >
                    <UTooltip text="Figma design available with Pro">
                      <Icon name="logos:figma" class="h-5 w-5" />
                    </UTooltip>
                  </div>
                  <div
                    v-else
                    class="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white shadow-md"
                  >
                    <UTooltip text="Challenge .png available">
                      <Icon name="ph:image" class="h-5 w-5" />
                    </UTooltip>
                  </div>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <span> Challenge #{{ data?.challenge?.challenge_id }} </span>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                  <Icon class="text-primary-blue-500 w-6 h-6" name="ph:note-pencil-duotone" />
                  <h2 class="text-lg font-semibold">Objective</h2>
                </div>
                <p class="text-sm md:text-base">
                  Convert this design to code, attempting to get it as close as possible using HTML
                  and CSS.
                </p>
              </div>
              <!-- Submission -->
              <div
                v-if="data?.challenge?.userSubmission"
                class="flex items-center gap-2 rounded-md bg-gray-200 px-2 py-3 text-sm shadow"
              >
                <Icon class="text-primary-blue-500 w-6 h-6" name="mdi:information-outline" />
                <p>
                  <span v-if="data?.challenge.userSubmission.published">
                    It looks like you've already completed this challenge.
                  </span>
                  <span v-else> It looks like you've already started this challenge. </span>
                </p>
              </div>
              <!-- Not logged in? -->
              <UButton v-if="!user" to="/login" class="self-start" icon="i-mdi-login" size="xl">
                <span>Login To Start</span>
              </UButton>
              <!-- Already started challenge? -->
              <UButton
                v-else-if="data?.challenge?.userSubmission"
                :to="{
                  name: 'challenges-slug-id',
                  params: {
                    slug: data?.challenge.param,
                    id: data?.challenge.userSubmission?.id,
                  },
                }"
                class="self-start"
                icon="i-fluent-code-20-filled"
                size="xl"
              >
                <span v-if="data.challenge.userSubmission.published"> View Your Solution </span>
                <span v-else>Continue Challenge</span>
              </UButton>
              <!-- Start challenge -->
              <UButton
                v-else
                :loading="loadingCreateChallenge"
                @click="createChallenge"
                class="self-start"
                icon="i-fluent-code-20-filled"
                size="xl"
              >
                <span>Start Challenge</span>
              </UButton>
              <p class="text-xs sm:text-sm">
                Join
                <span class="font-bold text-primary-blue-500">
                  {{ data?.count }}
                </span>
                others already participating. Challenge ends in:
                <ClientOnly>
                  <span class="font-bold text-primary-blue-500">
                    {{ timeRemaining }}
                  </span>
                </ClientOnly>
              </p>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="text-font-color">
            <h1 class="text-3xl font-bold mb-2">Opps!</h1>
            <p class="text-lg mb-4">It appears something went wrong. Please try again.</p>
            <UButton size="xl" label="Reload" @click="refresh" />
          </div>
        </template>
      </div>
    </div>
  </section>
  <section class="container max-w-screen-lg">
    <hr />
  </section>
  <section class="container mx-auto max-w-screen-lg py-[70px]">
    <h2 class="mb-8 text-left text-xl font-medium uppercase text-font-color sm:text-2xl">
      {{ data?.challenge?.title }} Solutions
    </h2>
    <div
      v-if="data?.submissions && data?.submissions?.length > 0"
      class="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
    >
      <UChallengeCard
        v-for="solution in data.submissions"
        page="challenges-slug-id"
        :params="{ slug: solution.param, id: solution.id }"
        :cardImage="solution?.user_thumbnail || data.challenge?.image_url"
      >
        <template v-slot:card-content>
          <div class="flex flex-col">
            <p class="mb-1 text-xs opacity-60">
              Submitted
              {{
                formatDistance(solution.published_at as string, new Date(), {
                  addSuffix: true,
                })
              }}
            </p>
            <hr class="my-3" />
            <div class="flex items-center">
              <ULink
                :to="{
                  name: 'profile-profileId',
                  params: {
                    profileId: solution.username ? solution.username : solution.user_id,
                  },
                }"
                class="flex items-center gap-4"
              >
                <UAvatar
                  size="md"
                  chip-color="primary"
                  chip-position="bottom-right"
                  chip-text="Pro"
                  :alt="`${solution.first_name} ${solution.last_name}`"
                  :src="(solution.avatar_url as string)"
                />
                <p class="text-sm opacity-60">
                  <span v-if="solution.username">{{ solution.username }} </span>
                  <span v-else class="capitalize">
                    {{ solution.first_name }} {{ solution.last_name }}
                  </span>
                </p>
              </ULink>
              <div class="ml-auto flex gap-1.5">
                <Icon name="mdi:heart" class="h-6 w-6 cursor-pointer text-primary-blue-500" />
                <span>{{ solution.like_count }}</span>
              </div>
            </div>
          </div>
        </template>
      </UChallengeCard>
    </div>
    <div v-else>
      <p class="text-left">No solutions exist yet for this challenge, check back soon!</p>
    </div>
  </section>
</template>
