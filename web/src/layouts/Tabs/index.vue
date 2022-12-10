<template>
  <div class="space-x-3 tabs-container">
    <a-tag
      size="large"
      v-for="(item, index) of appStore.routerHistory"
      :key="item.name"
      :color="appStore.currentPointer === index ? successColor : ''"
    >
      {{ item.title }}
    </a-tag>
  </div>
</template>
<script setup lang="ts">
import { useAppStore } from "@/store";

const successColor = "#165DFF";

const appStore = useAppStore();
</script>

<style>
.tabs-container {
  display: flex;
  align-items: center;

  padding: 3px 2px;
  box-sizing: border-box;
}
</style>
