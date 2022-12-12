<template>
  <div
    class="tabs-container tabs-container-border app-scrollbar-level-hover"
    :style="{
      '--tabs-pane-height': poros.height + 'px',
      '--tabs-px': poros.paddingY + 'px',
      height: `calc(${poros.height}px + ${poros.paddingY * 2}px + var(--scrollbar-hright))`,
    }"
  >
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

const poros = defineProps({
  height: {
    type: Number,
    default: 30,
  },
  paddingY: {
    type: Number,
    default: 8,
  },
});

const clickTag = (item: HistoryRecord) => {
  router.push(item.path);
};
</script>

<style lang="scss">
.tabs-container {
  --tabs-px: 8px;
  --tabs-py: 5px;

  /**
   *
   * 30px 也是.tabs-pane 的高度 最好是和上面的  --tabs-pane-height 数值保持一致
   * 此处需要计算高度 因为当标签过多 需要出现横向滚动条 会影响高度 出现页面抖动 避免这种情况 需要把滚动条设置为
   * 不占有内容高度 但是会遮挡标签 所以让其等于外部容器的内边距高度 就不会遮挡内容
   * see https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-gutter
   * height: y轴滚动条高度 + .tabs-pane(内容的高度) + 滚动条的高度
   */
  box-sizing: border-box;

  padding-left: var(--tabs-px);
  padding-right: var(--tabs-px);
  padding-top: var(--tabs-px);

  width: 100%;
  overflow-x: auto;

  display: flex;
  gap: 10px;

  &-border {
    border-bottom: 1px solid rgba(rgb(207, 206, 206), 0.2);
  }

  .tabs-pane {
    height: var(--tabs-pane-height);
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0 8px;
    background-color: var(--tabs-pane-background);
    color: var(--tabs-pane-color);
    transition: all 0.1s cubic-bezier(0, 0, 1, 1);
    flex-shrink: 0;

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
