<script setup lang="ts">
import { NConfigProvider } from "naive-ui";
import { onMounted } from "vue";
import Setting from "./components/Setting.vue";
import { usePostmate } from "./composition/usePostmate";
import useStore from "./store";
import { theme } from "./utils/theme";

const { handshake, emitCode } = usePostmate();
const store = useStore();

onMounted(() => {
  handshake?.then(async (parent: any) => {
    console.log("model", parent.model?.elementStore);
    if (parent.model.elementStore) {
      if (parent?.model?.elementStore?.defaultStyles) {
        store.defaultStyles.value = parent?.model?.elementStore?.defaultStyles;
      }
      if (parent?.model?.elementStore?.plans) {
        store.plans.value = parent?.model?.elementStore?.plans;
      }
    } else {
      emitCode();
    }
  });
});
</script>

<template>
  <NConfigProvider :theme="theme" class="h-screen">
    <Setting />
  </NConfigProvider>
</template>

<style scoped></style>
