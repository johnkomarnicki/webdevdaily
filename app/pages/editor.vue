<script setup>
import { emmetHTML, emmetCSS, emmetJSX } from "emmet-monaco-es";

const monaco = useMonaco();
// Add other languages here
onMounted(() => {
  emmetHTML(monaco);
});

definePageMeta({
  layout: "editor",
});

const editorOptions = {
  automaticLayout: true,
  minimap: {
    enabled: true,
  },
  guides: {
    indentation: false,
  },
  overviewRulerBorder: false,
  overviewRulerLanes: 0,
  renderLineHighlight: "none",
  theme: "vs-dark",
  fontSize: 18,
  fontFamily: "Menlo, Monaco, 'Courier New', monospace",
  lineHeight: 1.5,
  language: "html",
  scrollBeyondLastLine: false,
  lineNumbers: "on",
  padding: {
    top: 8,
    bottom: 8,
  },
};

const code = ref("");
const files = [
  {
    title: "index.html",
    icon: "material-symbols:html",
    type: "html",
  },
  { title: "style.css", icon: "material-symbols:css", type: "css" },
  {
    title: "script.js",
    icon: "material-symbols:javascript",
    type: "javascript",
  },
];
const activeTab = ref(files[0]);
const currentFileType = computed(() => activeTab.value.type);
</script>

<template>
  <!-- TODO: Add The Vue Pane Package -->
  <!-- Is it possible to add React? Maybe we add options for frameworks on the side panel here? -->

  <div class="h-full flex flex-1">
    <div
      class="flex flex-col justify-center bg-[#181818] border-r border-[#333] px-2 pt-4 pb-0"
    >
      <!-- TODO: Add WebDevLogo here? Make this the navigation maybe? -->
      <div class="flex flex-col gap-4">
        <NuxtLink to="/">
          <NuxtImg
            src="/webdevdaily_logo.png"
            width="36px"
            height="36px"
          />
        </NuxtLink>
        <UIcon
          name="material-symbols:file-copy-outline"
          class="cursor-pointer h-9 w-9 text-white"
        />
      </div>
      <div class="mt-auto">
        <UIcon
          name="material-symbols:settings-outline"
          class="cursor-pointer h-9 w-9 text-white"
        />
      </div>
    </div>
    <div
      class="text-sm flex flex-col bg-[#181818] text-white border-r border-[#333] min-w-[300px] pt-2"
    >
      <div class="flex items-center gap-1">
        <UIcon
          name="material-symbols:keyboard-arrow-down"
          class="w-5 h-5"
        />
        <!-- TODO: Challenge title? -->
        <p class="text-sm uppercase">Christmas_Recipe_UI</p>
      </div>
      <ul class="pt-2">
        <li
          v-for="(file, index) in files"
          :key="index"
          @click="activeTab = file"
          :class="{ 'bg-[#333]': currentFileType === file.type }"
          class="flex items-center px-4 py-1 gap-2 hover:bg-[#333] cursor-pointer"
        >
          <UIcon :name="file.icon" class="w-5 h-5" />
          <p>{{ file.title }}</p>
        </li>
      </ul>
      <!-- TODO: Move user info here? -->
      <div
        class="flex items-center justify-center border-t border-[#333] mt-auto py-2"
      >
        Enter the user info here
      </div>
    </div>
    <div class="flex flex-col flex-1">
      <ul class="flex bg-[#181818] border-[#333] border-b">
        <li
          class="border-[#333] border-r py-3 px-5 flex gap-2 items-center text-white"
        >
          <UIcon :name="activeTab.icon" class="w-6 h-6" />
          <p>{{ activeTab.title }}</p>
        </li>
      </ul>
      <ClientOnly>
        <MonacoEditor
          class="h-full w-full"
          v-model="code"
          :lang="currentFileType"
          :options="editorOptions"
        />
      </ClientOnly>
    </div>
  </div>
</template>
