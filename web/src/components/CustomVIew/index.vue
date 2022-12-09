<template>
  <router-view v-slot="{ Component, route }">
    <transition name="jump" mode="out-in">
      <keep-alive>
        <suspense>
          <template #default>
            <component :is="Component" :key="route.meta.usePathKey ? route.path : undefined" />
          </template>
          <template #fallback> Loading... </template>
        </suspense>
      </keep-alive>
    </transition>
  </router-view>
</template>
<script setup lang="ts"></script>
<style lang="scss">
.jump-enter-active,
.jump-leave-active {
  transition: opacity 0.3s ease;
}

.jump-enter-from,
.jump-leave-to {
  opacity: 0;
}
</style>
