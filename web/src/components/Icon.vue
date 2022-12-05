<template>
  <div
    :class="[`i-tabler-${props.name}`, 'icon']"
    :style="{ color: props.color, fontSize: props.size + 'px' }"
  ></div>
</template>
<script setup lang="ts">
const props = defineProps({
  name: String,
  size: {
    type: String,
    defaule: "20",
  },
  color: {
    type: String,
    defaule: "#333333",
  },
});
</script>
<style lang="scss">
.icon {
  font-size: 2rem;
}

.dark .icon {
  color: #fff;
}

.light .icon {
  color: #333;
}
</style>
