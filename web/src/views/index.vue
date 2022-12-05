<template>
  <a-layout>
    <a-layout-sider
      :theme="theme.themeMode"
      breakpoint="lg"
      :width="220"
      collapsible
      :collapsed="collapsed"
      @collapse="onCollapse"
      class="h-screen"
    >
      <div class="w-full h-15 bg-gray-300">logo</div>
      <a-menu
        :defaultOpenKeys="['1']"
        :defaultSelectedKeys="['0_2']"
        @menuItemClick="onClickMenuItem"
      >
        <a-menu-item key="0_2">
          <IconCalendar />
          Menu 2
        </a-menu-item>
        <a-sub-menu key="1">
          <template #title>
            <span><IconCalendar />Navigation 1</span>
          </template>
          <a-menu-item key="1_1">Menu 1</a-menu-item>
          <a-menu-item key="1_2">Menu 2</a-menu-item>
          <a-sub-menu key="2" title="Navigation 2">
            <a-menu-item key="2_1">Menu 1</a-menu-item>
            <a-menu-item key="2_2">Menu 2</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="3" title="Navigation 3">
            <a-menu-item key="3_1">Menu 1</a-menu-item>
            <a-menu-item key="3_2">Menu 2</a-menu-item>
            <a-menu-item key="3_3">Menu 3</a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
        <a-sub-menu key="4">
          <template #title>
            <span><IconCalendar />Navigation 4</span>
          </template>
          <a-menu-item key="4_1">Menu 1</a-menu-item>
          <a-menu-item key="4_2">Menu 2</a-menu-item>
          <a-menu-item key="4_3">Menu 3</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <button @click="theme.setMode()">切换</button>
      </a-layout-header>
      <a-layout style="padding: 0 24px">
        <a-layout-content> <HelloWorld msg="Hello Anya" /></a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
import { IconCalendar } from "@arco-design/web-vue/es/icon";
import { Message } from "@arco-design/web-vue";
import { ref } from "vue";
import { useThemeStore } from "@/store";

const theme = useThemeStore();


const collapsed = ref(false);
const onCollapse = (val: boolean, type: string) => {
  const content = type === "responsive" ? "触发响应式收缩" : "点击触发收缩";
  Message.info({
    content,
    duration: 2000,
  });
  collapsed.value = val;
};

const onClickMenuItem = (key: any) => {
  Message.info({ content: `You select ${key}`, showIcon: true });
};
</script>
<style lang="scss"></style>
