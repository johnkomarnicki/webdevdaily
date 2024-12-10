<script setup lang="ts">
type Props = {
  page: string;
  params: object;
  cardImage: string | undefined;
  published?: boolean | undefined | null;
  orientation?: string;
};

const props = withDefaults(defineProps<Props>(), {
  orientation: "vertical",
});

function routeNavigate() {
  navigateTo({ name: props.page, params: { ...props.params } });
}
</script>

<template>
  <div
    @click="routeNavigate"
    class="relative flex w-full cursor-pointer flex-col self-start rounded-md border-[0.5px] border-slate-300/90 bg-white p-3 shadow duration-300 hover:bg-slate-50"
    :class="{ '!flex-row': orientation === 'horizontal' }"
  >
    <div class="relative">
      <slot name="badge"></slot>
      <div class="relative">
        <NuxtImg
          v-if="cardImage"
          :src="cardImage"
          format="webp"
          loading="lazy"
          sizes="100vw sm:50vw"
          :class="{ 'h-[90px] !max-w-[150px]': orientation === 'horizontal' }"
          class="h-full w-full rounded-md shadow"
        />
        <NuxtImg
          v-else
          src="/images/image-placeholder.png"
          placeholder
          format="webp"
          loading="lazy"
          :class="{ 'h-[90px]': orientation === 'horizontal' }"
          class="rounded-md shadow"
        />
      </div>
      <div
        v-if="published"
        class="absolute top-0 flex h-full w-full items-center justify-center rounded-md bg-black/45"
      >
        <Icon
          name="material-symbols:check-circle"
          class="h-12 w-12 rounded-full bg-white"
          style="color: #4ade80"
        />
      </div>
    </div>
    <div class="mt-2 p-2" :class="{ '!mt-0': orientation === 'horizontal' }">
      <slot name="card-content"></slot>
    </div>
  </div>
</template>
