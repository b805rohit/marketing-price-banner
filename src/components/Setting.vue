<script setup lang="ts">
import {
  BrowsersOutline,
  ColorPaletteOutline,
  TicketOutline,
} from "@vicons/ionicons5";
import { NIcon, NLayout, NLayoutSider, NMenu } from "naive-ui";
import { h, ref } from "vue";
import useStore from "../store";
import PlanView from "./PlanView.vue";
import Preview from "./Preview.vue";
import StyleView from "./StyleView.vue";

const { plans } = useStore();
const selectedMenu = ref("plans");

const menuOptions = [
  {
    label: "Style & Options",
    key: "style-option",
  },
  {
    label: "Plans",
    key: "plans",
  },
];

// if query param has showPreview
if (new URLSearchParams(location.search).get("showPreview")) {
  menuOptions.push({
    label: "Preview",
    key: "preview",
  });
}

const renderIcon = (option: any) => {
  if (option.key === "plans") {
    return h(NIcon, null, { default: () => h(TicketOutline) });
  } else if (option.key === "preview") {
    return h(NIcon, null, { default: () => h(BrowsersOutline) });
  }
  return h(NIcon, null, { default: () => h(ColorPaletteOutline) });
};
</script>

<template>
  <div class="size-full">
    <n-layout class="h-full" has-sider>
      <n-layout-sider
        collapse-mode="width"
        :collapsed-width="64"
        show-trigger
        content-class="mt-1"
        bordered
        width="190"
      >
        <n-menu
          :options="menuOptions"
          v-model:value="selectedMenu"
          :render-icon="renderIcon"
          :collapsed-width="64"
        />
      </n-layout-sider>
      <n-layout class="overflow-hidden bg-gray-100">
        <PlanView v-if="selectedMenu === 'plans'" v-model:plans="plans" />
        <StyleView v-else-if="selectedMenu === 'style-option'" />
        <div v-else-if="selectedMenu === 'preview'" class="p-8">
          <div class="text-2xl font-bold">Preview</div>
          <Preview />
        </div>
      </n-layout>
    </n-layout>
  </div>
</template>

<style scoped></style>
