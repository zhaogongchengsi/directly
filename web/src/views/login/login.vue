<template>
  <div class="w-full h-screen relative dark:bg-#232324 flex">
    <div class="flex-1">123</div>
    <div class="flex-1">123</div>
    <div class="fixed right-0 top-0 login-mode-card">
      <Mode></Mode>
    </div>
  </div>
</template>
<script setup lang="ts">
import Mode from "@/layouts/mode.vue";
</script>
<style lang="scss" scoped>
.login-mode-card {
  border-radius: 0% 100% 0% 100% / 1% 0% 100% 99%;
  width: 60px;
  height: 60px;
  background-color: #08aeea;
  background-image: linear-gradient(0deg, #08aeea 0%, #2af598 100%);
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 10px;
}
</style>
