<script setup lang="ts"></script>

<template>
  <div class="flex min-h-screen flex-col bg-white">
    <UNotifications />
    <div class="flex flex-1 flex-col items-center bg-[#f1f1f1] px-6 py-10">
      <div class="flex w-full max-w-[600px] flex-col gap-8">
        <ULink to="/" class="flex gap-2 self-start">
          <div class="flex items-center gap-2">
            <NuxtImg
              format="webp"
              src="/webdevdaily_logo.png"
              alt="WebDevDaily Logo"
              class="h-auto w-[55px]"
            />
            <p class="text-2xl text-[#292727]">WebDevDaily</p>
          </div>
        </ULink>
        <slot />
      </div>
    </div>
  </div>
</template>
