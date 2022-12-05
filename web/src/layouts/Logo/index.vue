<template>
  <div
    class="w-full h-15"
    :style="{ height: theme.themeSetting.headerHeight + 'px' }"
  >
    <img class="border-rd" src="/vite.svg" alt="logo" />
  </div>
</template>
<script setup lang="ts">
import { useThemeStore } from "@/store";
const theme = useThemeStore();
</script>
<style lang="scss"></style>
