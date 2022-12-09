<template>
  <div class="w-full p-10">
    <div class="flex justify-center flex-col items-center space-y-10">
      <div class="i-tabler-error-404-off icon w-120 h-120"></div>

      <div class="flex items-center">
        <div class="i-tabler-bolt-off icon w-10 h-10"></div>
        <h1 class="text-3xl ml-3">组件不存在 请检查组件路径是否正确 组件是否存在</h1>
      </div>

      <div class="flex items-center text-xl font-sans font-semibold space-x-20">
        <code class="px-3 py-0.5 border-rd-2 bg-gray-400 text-gray-50 dark:bg-gray-900 border border-gray-400 truncate max-w-150">{{
          props.componentPath
        }}</code>
        <ul class="space-y-1 max-w-100 max-h-100 overflow-y-auto app-scrollbar">
          <li class="truncate" v-for="item in props.modules">{{ item }}</li>
          <li class="truncate" v-for="item in props.modules">{{ item }}</li>
        </ul>
      </div>

      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  componentPath: String,
  modules: {
    type: Array,
    default: () => [],
  },
});
</script>
<style lang="scss"></style>
