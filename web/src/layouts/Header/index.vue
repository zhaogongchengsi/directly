<template>
  <a-layout-header
    :style="{ height: themeSetting.themeSetting.headerHeight + 'px' }"
    class="shadow"
  >
    <div class="h-full flex justify-between items-center border-box pl-5 pr-10">
      <div class="cursor-pointer" @click="setsider">
        <icon-menu-unfold
          v-if="themeSetting.themeSetting.collapsed"
          :size="menuSize"
        />
        <icon-menu-fold :size="menuSize" v-else />
      </div>
      <div class="right-header">
        <a-space size="large">
          <icon-moon-fill class="cursor-pointer" size="25" />
          <a-dropdown trigger="hover">
            <div class="w-20 flex justify-center">
              <a-avatar> <img src="/vite.svg" alt="avatar" /> </a-avatar>
            </div>
            <template #content>
              <a-doption>Option 1</a-doption>
            </template>
          </a-dropdown>
        </a-space>
      </div>
    </div>
  </a-layout-header>
</template>
<script setup lang="ts">
import {
  IconMenuFold,
  IconMenuUnfold,
  IconMoonFill,
} from "@arco-design/web-vue/es/icon";
import { useThemeStore } from "@/store";
const themeSetting = useThemeStore();

const setsider = () => {
  themeSetting.themeSetting.collapsed = !themeSetting.themeSetting.collapsed;
};

const menuSize = 30;
</script>
<style lang="scss"></style>
