<script setup lang="ts">
import { seoConfig } from "~/utils/seo.config";

useSeoMeta({
  title: "WebDevDaily | Frontend Coding Challenges",
  description: seoConfig.description,
  ogTitle: "WebDevDaily | Frontend Coding Challenges",
  ogDescription: seoConfig.description,
  ogImage: "https://www.webdevdaily.io/home_page.png?4362984378",
  ogUrl: seoConfig.ogUrl,
  twitterTitle: "WebDevDaily | Frontend Coding Challenges",
  twitterDescription: seoConfig.description,
  twitterImage: "https://www.webdevdaily.io/home_page.png?4362984378",
  twitterCard: "summary_large_image",
});

definePageMeta({});

const client = useSupabaseClient();
const { data } = await useAsyncData("home_data", async () => {
  const { data: challenge_data, error: challenge_error } = await $fetch("/api/challenges?limit=1");
  const { data: user_count } = await client.rpc("get_profile_count");
  return { user_count, challenge_data, challenge_error };
});

const userAvatars = [
  "https://fmpffrpcrpptmolosdes.supabase.co/storage/v1/object/public/avatars/7be4f415-2ff9-4e42-930a-d65cafd26bf2/user-avatar",
  "https://fmpffrpcrpptmolosdes.supabase.co/storage/v1/object/public/avatars/cf7a7db6-68ec-4b2a-9988-68be2f9c2311/user-avatar",
  "https://lh3.googleusercontent.com/a/ACg8ocIwLoI1i-bJkqsSNuSIUaEqjzU6HqbVxvx_UaW4n0R6C34=s96-c",
  "https://lh3.googleusercontent.com/a/AAcHTtezRNjnG1lSAYEA-5LQFQ-SGtm29K1zAdv2jnyeYvYa-yPX=s96-c",
  "https://fmpffrpcrpptmolosdes.supabase.co/storage/v1/object/public/avatars/32691f98-f8fe-4d96-bad2-1e741347b619/user-avatar",
];

const features = [
  {
    title: "Participate in weekly challenges",
    description:
      "Tackle skill-enhancing design-to-code challenges. These challenges are designed to refine your abilities and showcase your expertise.",
    image: "/weekly-challenge.png",
  },
  {
    title: "Build real-word projects",
    description:
      "Build projects that are worthy of your portfolio, to showcase your abilities to potential employers.",
    image: "/projects.png",
  },
  {
    title: "Online Playground",
    description:
      "Explore our innovative, integrated VS Code-like browser IDE. It's perfect for experimenting, learning, and showcasing your coding skills.",
    image: "/dailies.png",
  },
  {
    title: "Code more, worry less",
    description:
      "Discovering the next idea can be challenging. We take care of the design aspect, allowing you to broaden your skill set and advance your coding journey.",
    image: "/code-more.png",
  },
];

const howItWorks = ref([
  {
    label: "Choose a Challenge or Project",
    defaultOpen: true,
    content:
      "Explore our assortment of projects and challenges, and select the one that aligns with your current skill level.",
    icon: "how-it-works-1.png",
    image: "how-it-works-challenges.png",
  },
  {
    label: "Start Coding",
    content:
      "Start coding immediately within our integrated browser IDE or use an editor of your choice.",
    icon: "how-it-works-2.png",
    image: "how-it-works-coding.png",
  },
  {
    label: "Submit and Rate",
    content:
      "Submit your challenge or project and receive ratings from our incredible community of developers.",
    icon: "how-it-works-3.png",
    image: "how-it-works-portfolio.png",
  },
  {
    label: "Build a Portfolio",
    content:
      "With each challenge or project you complete, you build up your profile and create a portfolio to showcase your work!",
    icon: "how-it-works-4.png",
    image: "how-it-works-rate.png",
  },
]);
const howItWorksIndex = ref(0);
function updateHowItWorks(index: number) {
  howItWorksIndex.value = index;
}
const activeHowItWorks = computed(() => {
  return howItWorks.value[howItWorksIndex.value];
});
</script>

<template>
  <main>
    <section class="bg-hero-bg bg-cover bg-bottom bg-no-repeat">
      <div
        class="container flex flex-col items-center gap-10 py-32 text-center sm:gap-16 sm:pb-36 sm:pt-36 base:flex-row base:text-left"
      >
        <div class="flex flex-1 flex-col items-center text-font-color base:items-start">
          <h1 class="text-balance text-3xl font-medium sm:text-4xl md:text-5xl md:leading-[3.5rem]">
            Improve your coding skills with hands-on
            <span class="font-semibold text-primary-blue-500">challenges</span>
            and real-world
            <span class="font-semibold text-primary-blue-500">projects.</span>
          </h1>
          <p class="text-balance mt-4 sm:text-lg">
            Enhance your HTML, CSS, and JavaScript skills through realistic frontend coding
            challenges and projects. We handle the design, allowing you to focus on coding and work
            like a professional developer.
          </p>
          <div
            class="mt-4 flex flex-col items-center gap-4 rounded-md py-3 base:flex-row base:gap-6"
          >
            <div class="flex items-center">
              <UAvatarGroup size="md">
                <UAvatar v-for="(img, index) in userAvatars" :src="img" />
              </UAvatarGroup>
            </div>
            <p class="text-balance flex-1 text-sm md:text-base">
              Join
              <span class="font-bold">{{ data?.user_count }}+</span>
              developers boosting their coding skills by completing challenges and projects.
            </p>
          </div>
        </div>
        <div class="flex w-[90%] flex-col tablet:w-[70%] base:w-[50%]">
          <NuxtImg src="/hero.png" format="webp" sizes="sm:60vw" />
        </div>
      </div>
    </section>
    <section class="container max-w-screen-sm py-20 md:max-w-screen-base">
      <div class="flex flex-col gap-20">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="flex flex-col items-center gap-10 md:flex-row md:gap-24"
        >
          <div
            class="relative flex flex-1"
            :class="index % 2 === 0 ? 'md:order-1 md:justify-start' : 'md:order-2 md:justify-end'"
          >
            <ClientOnly v-if="index === 0">
              <div class="absolute bottom-8 z-20 flex w-full flex-1 justify-center md:absolute">
                <div class="rounded-md bg-white px-4 py-[6px] text-custom-blue shadow-md lg:py-2">
                  <p>
                    New Challenge in
                    <!-- <span class="font-bold">
                      {{ timeRemaining }}
                    </span> -->
                  </p>
                </div>
              </div>
            </ClientOnly>
            <NuxtImg
              sizes="sm:100vw md:50vw"
              format="webp"
              class="rounded-md"
              :src="feature.image"
            />
          </div>
          <div
            class="flex flex-1 flex-col items-center text-center text-font-color md:items-start md:text-start"
            :class="index % 2 === 0 ? 'md:order-2' : 'md:order-1'"
          >
            <h3 class="text-balance mb-2 text-2xl font-medium tablet:text-3xl lg:text-4xl">
              {{ feature.title }}
            </h3>
            <p class="text-balance lg:text-lg">
              {{ feature.description }}
            </p>
            <div class="mt-4 flex items-center gap-2" v-if="index === 0">
              <UButton
                :to="{
                  name: 'challenges',
                }"
                icon="i-clarity-bullseye-line"
                size="lg"
              >
                Current Challenge
              </UButton>
            </div>
            <div class="mt-4 flex items-center gap-2" v-if="index === 1">
              <UButton
                :to="{
                  name: 'challenges',
                }"
                icon="i-icon-park-outline-add-computer"
                size="lg"
              >
                Projects
              </UButton>
            </div>
            <div class="mt-4 flex items-center gap-2" v-if="index === 2">
              <!-- TODO: Re-add -->
              <!-- <UButton
                :to="{
                  name: 'challenges',
                }"
                icon="i-fluent-code-20-filled"
                size="lg"
              >
                New Daily
              </UButton> -->
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-[#fafafa] py-20">
      <div class="container max-w-screen-sm items-center lg:max-w-screen-base">
        <h2
          class="mb-6 text-center text-2xl font-medium uppercase text-font-color tablet:text-3xl lg:text-left"
        >
          How it works
        </h2>
        <div class="flex flex-col gap-16 py-8 lg:flex-row lg:gap-20">
          <UAccordion
            color="white"
            :items="howItWorks"
            :ui="{
              wrapper: 'order-2 flex-1 lg:order-2',
              container:
                'bg-white p-4 rounded-md shadow mb-5 data-[headlessui-state=open]:blue-shadow duration-200',
              item: {
                padding: 'pt-3 pb-0',
              },
            }"
          >
            <template #default="{ item, index, open }">
              <div class="flex cursor-pointer items-center gap-3" @click="updateHowItWorks(index)">
                <NuxtImg
                  :src="`/${item.icon}`"
                  width="30"
                  height="30"
                  format="webp"
                  loading="lazy"
                />
                <h2 class="text-lg text-font-color">{{ item.label }}</h2>
              </div>
            </template>
          </UAccordion>
          <div class="order-1 flex flex-1 self-start lg:order-2">
            <NuxtImg
              :src="`/${activeHowItWorks?.image}`"
              sizes="sm:100vw md:50vw"
              format="webp"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
    <section class="border-b-[1px]">
      <div class="container flex flex-col items-center py-20 text-center">
        <Icon name="logos:discord" class="mb-4 h-10 w-52 sm:h-14 sm:w-72" />
        <p class="text-balance mt-3 max-w-screen-md text-lg text-font-color tablet:mt-6">
          Join a community of like-minded developers, engage in knowledge sharing, participate in
          discussions about our challenges and projects.
        </p>
        <hr class="my-8 h-[1px] w-full max-w-screen-md bg-font-color" />
        <UButton to="https://discord.gg/NVnga5KGyj" size="xl"> Join Official Server </UButton>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
