<template>
  <a-layout class="h-screen">
    <a-layout-sider
      :theme="theme.themeMode"
      :width="theme.themeSetting.asiderWidth"
      :collapsed="theme.themeSetting.collapsed"
      collapsible
      breakpoint="lg"
      @collapse="onCollapse"
    >
      <Logo />
      <Menus />
    </a-layout-sider>
    <a-layout>
      <Header />
      <a-layout class="overflow-auto app-scrollbar" :style="{ height: `calc(100vh - ${theme.themeSetting.headerHeight || 60}px)` }">
        <a-layout-content class="scrollbar"> <custom-router-view /> </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import Header from "@/layouts/Header/index.vue";
import Menus from "@/layouts/Menus/index.vue";
import Logo from "@/layouts/Logo/index.vue";
import { useThemeStore } from "@/store";

// import { useRouter } from "vue-router";
// const router = useRouter();
// console.log(router.getRoutes());

const theme = useThemeStore();

const onCollapse = (val: boolean) => {
  theme.themeSetting.collapsed = val;
};
</script>
<style lang="scss">
.app-main-container {
}
</style>
