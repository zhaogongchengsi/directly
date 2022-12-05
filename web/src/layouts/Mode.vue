<template>
  <div class="cursor-pointer" @click="setting.setMode()">
    <Icon v-if="setting.themeMode === 'light'" name="moon-stars"></Icon>
    <Icon v-if="setting.themeMode === 'dark'" name="sun-high"></Icon>
  </div>
</template>
<script setup lang="ts">
import { useThemeStore } from "@/store";
const setting = useThemeStore();
</script>
