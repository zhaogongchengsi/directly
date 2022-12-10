<template>
  <div class="tabs-container tabs-container-border">
    <div
      v-for="(item, index) of tabsStore.routerHistory"
      :key="item.name"
      :class="['tabs-pane', { 'tabs-pane-active': tabsStore.currentPointer === index }]"
      @click="clickTag(item)"
    >
      <span class="tab-laber">
        {{ item.title }}
      </span>
      <div class="tab-icon" @click.stop="tabsStore.deleteTab(item.name!, item.path)">
        <div class="i-tabler-x icon"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useTabsStore, HistoryRecord } from "@/store";
import { useRouter } from "vue-router";
const tabsStore = useTabsStore();
const router = useRouter();

const clickTag = (item: HistoryRecord) => {
  router.push(item.path);
};
</script>

<style lang="scss">
.tabs-container {
  --tabs-container-height: var(--tabs-height, 30px);
  height: var(--tabs-container-height);
  box-sizing: border-box;

  width: 100%;
  overflow-x: auto;

  display: flex;
  align-items: center;
  gap: 10px;

  &-border {
    border-bottom: 1px solid rgba(rgb(207, 206, 206), 0.2);
  }

  .tabs-pane {
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0 8px;
    background-color: var(--tabs-pane-background);
    color: var(--tabs-pane-color);
    transition: all 0.1s cubic-bezier(0, 0, 1, 1);

    &-active {
      background-color: var(--tabs-pane-background-active);
      color: var(--tabs-pane-color-active);
      .tab-icon {
        color: var(--tabs-pane-color-active);
      }
    }

    .tab-laber {
      margin-right: 8px;
      font-size: 12px;
    }

    .tab-icon {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: inherit;

      .icon {
        color: inherit;
      }

      &:hover {
        border: 1px solid #ccc;
      }
    }
  }
}
</style>
