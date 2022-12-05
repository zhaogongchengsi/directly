<template>
  <a-layout-header
    :style="{ height: setting.themeSetting.headerHeight + 'px' }"
    :class="['shadow', `header-${setting.themeMode}-bg`]"
  >
    <div class="h-full flex justify-between items-center border-box pl-5 pr-10">
      <div class="cursor-pointer" @click="setsider">
        <icon-menu-unfold
          v-if="setting.themeSetting.collapsed"
          :size="menuSize"
        />
        <icon-menu-fold :size="menuSize" v-else />
      </div>
      <div class="right-header">
        <a-space size="large">
          <div class="cursor-pointer" @click="setting.setMode()">
            <icon-moon-fill v-if="setting.themeMode === 'light'" size="25" />
            <icon-sun-fill
              class="text-white"
              size="25"
              v-if="setting.themeMode === 'dark'"
            />
          </div>
          <a-dropdown trigger="hover">
            <div class="w-20 flex justify-center">
              <a-avatar> <img src="/vite.svg" alt="avatar" /> </a-avatar>
            </div>
            <template #content>
              <a-doption>Option 1</a-doption>
              <a-doption>注销登录</a-doption>
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
  IconSunFill,
} from "@arco-design/web-vue/es/icon";
import { useThemeStore } from "@/store";
const setting = useThemeStore();

const setsider = () => {
  setting.themeSetting.collapsed = !setting.themeSetting.collapsed;
};

const menuSize = 30;
</script>
<style lang="scss">
.header-light-bg {
  background-color: var(--color-menu-light-bg);
}
.header-dark-bg {
  background-color: var(--color-menu-dark-bg);
}
</style>
