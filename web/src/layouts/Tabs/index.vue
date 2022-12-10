<template>
  <div class="p-2">
    <a-space>
      <a-tag v-for="item in appStore.routerHistory" closable>{{ item.title }}</a-tag>
    </a-space>
  </div>
</template>
<script setup lang="ts">
import { useAppStore } from "@/store";

const appStore = useAppStore();

console.log(appStore.routerHistory);
</script>
<style lang="scss"></style>
