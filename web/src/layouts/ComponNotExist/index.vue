<template>
  <div class="w-full p-10">
    <div class="flex justify-center flex-col items-center space-y-10">
      <div class="i-tabler-error-404-off icon w-120 h-120"></div>

      <div class="flex items-center">
        <div class="i-tabler-bolt-off icon w-10 h-10"></div>
        <h1 class="text-3xl ml-3">组件不存在 请检查组件路径是否正确 组件是否存在</h1>
      </div>

      <div class="flex items-center text-xl font-sans font-semibold">
        <span class="mr-5">文件路径</span>
        <code class="px-3 py-0.5 border-rd-2 bg-gray-400 text-gray-50 dark:bg-gray-900 border border-gray-400">{{ props.componentPath }}</code>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  componentPath: String,
});
</script>
<style lang="scss"></style>
