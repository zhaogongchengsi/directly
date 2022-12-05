<template>
  <a-menu :defaultOpenKeys="['1']" :defaultSelectedKeys="['0_2']">
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
  </a-menu>
</template>
<script setup lang="ts">
import { IconCalendar } from "@arco-design/web-vue/es/icon";
</script>
<style lang="scss"></style>
