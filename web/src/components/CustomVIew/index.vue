<template>
  <div>
    <router-view v-slot="{ Component, route }">
      <transition
        :name="route.meta.transition || 'fade'"
        mode="out-in"
      >
        <keep-alive>
          <suspense>
            <template #default>
              <component
                :is="Component"
                :key="route.meta.usePathKey ? route.path : undefined"
              />
            </template>
            <template #fallback> Loading... </template>
          </suspense>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss"></style>
