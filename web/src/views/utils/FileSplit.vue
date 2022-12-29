<template>
  <div class="p-3 flex items-center justify-center flex-col">
    <div class="w-50 h-50 m-15 flex items-center justify-center rounded border border-gray-100 border-dashed cursor-pointer" ref="dropZoneRef">
      拖拽上传
    </div>
    <a-button @click="click">切分</a-button>
  </div>
</template>
<script setup lang="ts">
import { fileSplit } from "@/utils/file";
import { ref } from "vue";
import { useDropZone } from "@vueuse/core";

const dropZoneRef = ref();

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);

async function onDrop(files: File[] | null) {
  if (!files) {
    return;
  }
  const [file] = files;

  const filearr = await fileSplit(file, {
    quantity: 3,
    onChanged(indx) {
      console.log("indx", indx);
    },
  });

  console.log(filearr);
}

const click = () => {
  //   const fileWork = fileSplit();
};
</script>
<style lang="scss"></style>
