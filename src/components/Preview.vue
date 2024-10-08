<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useTranspiler } from "../composition/useTranspiler";

const { htmlPreview, js } = useTranspiler();
const previewRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (previewRef.value) {
    const script = document.createElement("script");
    script.text = js.value;
    previewRef.value.appendChild(script);
  }
});
</script>
<template>
  <div ref="previewRef" v-html="htmlPreview" />
</template>
