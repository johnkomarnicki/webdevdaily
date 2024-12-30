<script setup lang="ts">
import { format } from "date-fns";

const proUser = isProUser().value;
const fetchedPages = ref<{ [key: number]: any }>({});
const fetchingData = ref(false);
const page = ref<number>(1);
const offset = ref<number>(26);
const limit = ref<number>(24);

const { data: challenges } = await useAsyncData(
  "challenges",
  async () => {
    const {
      data: challenges,
      error: challengesError,
      count,
    } = await $fetch("/api/challenges?limit=12");
    return { challenges, challengesError, count };
  }
);

fetchedPages.value[page.value] = challenges.value?.challenges;
const activePage = ref(fetchedPages.value[page.value]);

const searchQuery = ref<string>("");
const searchCount = ref<number>(0);
const searchDebounce = ref<ReturnType<typeof setTimeout> | null>(
  null
);

async function fetchSearchChallenges() {
  if (searchDebounce.value) {
    clearTimeout(searchDebounce.value);
  }

  searchDebounce.value = setTimeout(async () => {
    try {
      if (searchQuery.value === "") {
        fetchChallenges();
        return;
      }

      fetchingData.value = true;

      const {
        data: searchResults,
        error: searchError,
        count,
      } = await $fetch(
        `/api/challenges?search=${searchQuery.value}&limit=${limit.value}`
      );
      if (searchError) {
        throw new Error(searchError.message);
      }
      searchCount.value = count as number;
      activePage.value = searchResults;
    } catch (err) {
      console.warn(err);
    } finally {
      fetchingData.value = false;
    }
  }, 500);
}
async function fetchChallenges() {}
</script>

<template>
  <main>
    <section class="flex min-h-screen flex-col pb-8 pt-36 md:pb-20">
      <div class="container mx-auto flex max-w-screen-lg flex-col">
        <div class="flex flex-col" ref="allChallenges">
          <h2
            class="mb-4 text-xl font-medium uppercase text-font-color sm:text-2xl"
          >
            Challenges
          </h2>
          <div class="flex items-center gap-4">
            <UInput
              icon="i-heroicons-magnifying-glass-20-solid"
              size="lg"
              color="white"
              placeholder="Search ui challenges..."
              class="w-full max-w-[400px]"
              v-model="searchQuery"
              @input="fetchSearchChallenges"
            />
            <!-- TODO -->
            <!-- <p class="ml-auto font-medium">
              Showing
              <span>{{ searchQuery === "" ? limit : searchCount }} </span>
              <span v-if="searchQuery === ''"> of {{ challenges.count }} </span>
              challenges
            </p> -->
          </div>
        </div>

        <div
          class="mb-8 grid grid-cols-1 gap-6 pt-8 sm:grid-cols-2 md:grid-cols-3"
          v-if="activePage.length > 0"
        >
          <UChallengeCard
            v-for="challenge in activePage"
            page="challenges-slug"
            :params="{ slug: challenge.param }"
            :cardImage="challenge.image_url"
          >
            <template v-slot:card-content>
              <div class="flex flex-col">
                <div class="mb-1 flex items-center gap-2">
                  <div
                    class="flex gap-2 text-xs font-medium opacity-75"
                  >
                    <span>
                      Challenge #{{ challenge.challenge_id }}
                    </span>
                    |
                    <span>
                      {{
                        format(
                          new Date(challenge.updatedDate),
                          "MMM do"
                        )
                      }}
                    </span>
                  </div>
                  <div class="ml-auto flex gap-2">
                    <UBadge
                      v-if="!proUser && challenge.pro_challenge"
                      class="self-start"
                      label="Pro"
                    />
                    <div
                      v-if="challenge.design_link"
                      class="flex h-[24px] w-[24px] items-center justify-center rounded-full border-[0.5px] border-slate-300/90 bg-white shadow-md"
                    >
                      <Icon
                        name="logos:figma"
                        width="14"
                        height="14"
                      />
                    </div>
                    <div
                      v-else
                      class="flex h-[24px] w-[24px] items-center justify-center rounded-full border-[0.5px] border-slate-300/90 bg-white shadow-md"
                    >
                      <Icon name="ph:image" width="16" height="16" />
                    </div>
                  </div>
                </div>
                <h3 class="text-lg">{{ challenge.title }}</h3>
              </div>
            </template>
          </UChallengeCard>
        </div>
        <div class="mt-auto self-center">
          <template v-if="challenges && challenges.count">
            <UPagination
              size="md"
              v-model="page"
              :page-count="12"
              :total="challenges.count"
            />
          </template>
        </div>
      </div>
    </section>
  </main>
</template>
