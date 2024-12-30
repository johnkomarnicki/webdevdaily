<script setup lang="ts">
import { useUserStore } from "../store/user";
const emit = defineEmits(["toggleMobileNav"]);

const userStore = useUserStore();
const user = useSupabaseUser();
const proUser = isProUser().value;

const userInfo = computed(() => {
  return userStore.userInfo;
});

function toggleNav() {
  emit("toggleMobileNav");
}

async function logout() {
  // await useLogout();
}

const profileUrl = computed(() => {
  return user.value ? user.value.id : null;
});
const items: any = [
  [
    {
      label: user.value ? user.value.email : "",
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "Profile",
      icon: "i-heroicons-user-20-solid",
      // to: {
      //   name: "profile-profileId",
      //   params: {
      //     profileId: profileUrl.value,
      //   },
      // },
    },
    {
      label: "Settings",
      icon: "i-heroicons-cog-8-tooth",
      to: "/profile/settings",
    },
  ],
  [
    {
      label: "Sign out",
      slot: "signout",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: logout,
    },
  ],
];
const challengeItems = [
  [
    {
      label: "Current UI Challenge",
      click: () => {
        navigateTo("/challenges");
      },
    },
    {
      label: "All UI Challenges",
      click: () => {
        navigateTo("/challenges/all");
      },
    },
  ],
];

// Mobile
const showMobileNav = ref(false);
function toggleMobileNav() {
  showMobileNav.value = !showMobileNav.value;
}
</script>

<template>
  <header class="z-30 w-full text-font-color bg-white shadow-sm">
    <nav
      class="container mx-auto flex max-w-screen-lg items-center py-3 font-medium text-font-color"
    >
      <ULink to="/dashboard/home">
        <nuxt-img
          format="webp"
          src="webdevdaily_logo.png"
          height="50"
          width="50"
          alt="WebDevDaily Logo"
        />
      </ULink>
      <div class="ml-auto flex items-center">
        <ul
          class="mr-8 hidden flex-1 items-center gap-6 text-sm font-semibold uppercase md:flex"
        >
          <UDropdown
            label="UI Challenges"
            mode="hover"
            :items="challengeItems"
            :popper="{ placement: 'bottom-end' }"
          >
            <UButton
              to="/challenges"
              variant="ghost"
              color="white"
              :ui="{
                base: 'uppercase',
                font: 'font-semibold',
                padding: {
                  sm: 'px-0 py-0',
                },
                color: {
                  white: {
                    ghost: 'bg-transparent hover:bg-transparent',
                  },
                },
              }"
              label="UI Challenges"
              trailing-icon="i-heroicons-chevron-down-20-solid"
            />
          </UDropdown>
          <ULink class="flex items-center gap-1" to="/projects">
            Projects
          </ULink>
          <ULink
            :to="{
              path: '/leaderboard',
              query: { type: 'challenges' },
            }"
          >
            Leaderboard
          </ULink>
          <UProButton v-if="user && !proUser" to="/pro" />
          <UButton
            v-if="!user"
            size="md"
            class="normal-case"
            icon="i-mdi-login"
            to="/login"
          >
            Login
          </UButton>
        </ul>
        <div class="flex items-center">
          <UDropdown
            v-if="userInfo"
            :items="items"
            :ui="{ item: { disabled: 'cursor-text select-text' } }"
            :popper="{ placement: 'bottom-start', arrow: true }"
            class="hidden md:flex"
          >
            <UAvatar
              size="md"
              :chip-color="proUser ? 'primary' : ''"
              chip-position="bottom-right"
              chip-text="Pro"
              :alt="`${userInfo.first_name} ${userInfo.last_name}`"
              :src="userInfo.avatar_url"
            />
            <template #account="{ item }">
              <div class="truncate text-left">
                <p>Signed in as</p>
                <p
                  class="truncate font-medium text-gray-900 dark:text-white"
                >
                  {{ item.label }}
                </p>
              </div>
            </template>
            <template #item="{ item }">
              <span class="truncate">{{ item.label }}</span>
              <UIcon
                :name="item.icon"
                class="ms-auto h-4 w-4 flex-shrink-0 text-gray-400 dark:text-gray-500"
              />
            </template>
          </UDropdown>
          <div class="block md:hidden" @click="toggleMobileNav">
            <Icon
              name="prime:bars"
              class="h-8 w-8 cursor-pointer duration-300"
              :class="{ 'rotate-180': showMobileNav }"
              style="color: #000"
            />
          </div>
        </div>
      </div>
    </nav>
    <!-- Mobile -->
    <div v-if="showMobileNav" class="flex bg-white shadow-md">
      <ul
        class="flex flex-1 flex-col justify-center text-sm font-semibold uppercase"
      >
        <ULink
          @click="toggleNav"
          class="flex items-center gap-3 border-b px-4 py-5"
          to="/challenges"
        >
          <Icon name="clarity:bullseye-line" width="20" height="20" />
          <span>Challenges</span>
        </ULink>
        <ULink
          @click="toggleNav"
          class="flex items-center gap-3 border-b px-4 py-5"
          to="/projects"
        >
          <Icon
            name="icon-park-outline:add-computer"
            class="h-5 w-5"
          />
          <span class="flex items-center gap-2"> Projects </span>
        </ULink>
        <ULink
          @click="toggleNav"
          class="flex items-center gap-3 border-b px-4 py-5"
          :to="{
            path: '/leaderboard',
            query: { type: 'challenges' },
          }"
        >
          <Icon name="iconoir:leaderboard-star" class="h-5 w-5" />
          <span> Leaderboard </span>
        </ULink>
        <ULink
          @click="toggleNav"
          class="flex items-center gap-3 border-b px-4 py-5"
          to="/pro"
        >
          <Icon name="iconoir:rocket" class="h-5 w-5" />
          <span>Go Pro</span>
        </ULink>
        <ULink
          class="flex items-center gap-3 px-4 py-5"
          @click="toggleNav"
          v-if="!user"
          to="/login"
        >
          <Icon name="mdi:login" class="h-5 w-5" />
          <span> Login</span>
        </ULink>
        <div v-if="user && userInfo" class="flex flex-col">
          <div class="flex items-center gap-3 border-b px-4 py-5">
            <UAvatar
              size="sm"
              :alt="`${userInfo.first_name} ${userInfo.last_name}`"
              :src="userInfo.avatar_url"
              :chip-color="proUser ? 'primary' : null"
              chip-position="bottom-right"
              chip-text="Pro"
            />
            <span>My Profile</span>
          </div>
          <ul class="px-11">
            <li
              v-for="link in links"
              class="flex flex-col gap-3 border-b px-4 py-5"
            >
              <div
                v-if="link.slot === 'account' && user"
                class="text-xs normal-case"
              >
                <p class="mb-1">Signed in as</p>
                <p
                  class="truncate font-medium text-gray-900 dark:text-white"
                >
                  {{ link.label }}
                </p>
              </div>
              <ULink
                class="flex gap-3"
                v-else-if="link.to"
                :to="link.to"
                @click="toggleNav"
              >
                <Icon class="h-5 w-5" :name="link.icon" />
                <span>{{ link.label }}</span>
              </ULink>
              <div v-else class="flex gap-3" @click="logout">
                <Icon class="h-5 w-5" :name="link.icon" />
                <span>{{ link.label }}</span>
              </div>
            </li>
          </ul>
        </div>
      </ul>
    </div>
  </header>
</template>
