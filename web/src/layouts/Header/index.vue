<template>
  <a-layout-header
    :style="{ height: setting.themeSetting.headerHeight + 'px' }"
    :class="['shadow', `header-${setting.themeMode}-bg`]"
  >
    <div class="h-full flex justify-between items-center border-box pl-5 pr-10">
      <div class="cursor-pointer" @click="setsider">
        <div
          :class="[
            setting.themeSetting.collapsed ? 'i-tabler-arrows-right' : 'i-tabler-arrows-left',
            'icon',
          ]"
        />
      </div>
      <div class="right-header">
        <a-space size="large">
          <Mode />
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
import { useThemeStore } from "@/store";
import Mode from "@/layouts/Mode.vue";
const setting = useThemeStore();
const setsider = () => {
  setting.themeSetting.collapsed = !setting.themeSetting.collapsed;
};
</script>
<style lang="scss">
.header-light-bg {
  background-color: var(--color-menu-light-bg);
}
.header-dark-bg {
  background-color: var(--color-menu-dark-bg);
}
</style>
