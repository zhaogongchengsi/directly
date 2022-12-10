<template>
  <div class="tabs-container">
    <a-tag
      size="large"
      class="cursor-pointer"
      closable
      v-for="(item, index) of tabsStore.routerHistory"
      :key="item.name"
      :color="tabsStore.currentPointer === index ? success : ''"
      @close="tabsStore.deleteTab(item.name!, item.path)"
      @click="clickTag(item)"
    >
      {{ item.title }}
    </a-tag>
  </div>
</template>
<script setup lang="ts">
import { useTabsStore, HistoryRecord } from "@/store";
import { useRouter } from "vue-router";
const success = "#1D4ED8";
const tabsStore = useTabsStore();
const router = useRouter();

const clickTag = (item: HistoryRecord) => {
  router.push(item.path);
};
</script>

<style>
.tabs-container {
  padding: 8px 4px;
  box-sizing: border-box;

  width: 100%;
  overflow-x: auto;

  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
