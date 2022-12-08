<template>
  <template
    v-for="menu of menuTree"
    :key="menu.name"
  >
    <a-sub-menu v-if="menu.children && menu.children.length > 0">
      <template #icon>{{ menu.icon }}</template>
      <template #title>{{ menu.title }}</template>
      <base-menu :menus="menu.children" />
    </a-sub-menu>
    <a-menu-item v-else>{{ menu.title }}</a-menu-item>
  </template>
</template>
<script lang="ts">
import { MenuInfo } from "@/types/user";
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "BaseMenu",
  props: {
    menus: {
      type: Array,
      default: [],
    },
  },
  setup(props) {
    const menuTree = computed(() => props.menus) as unknown as MenuInfo[];
    return {
      menuTree: menuTree,
    };
  },
});
</script>
<style lang=""></style>
