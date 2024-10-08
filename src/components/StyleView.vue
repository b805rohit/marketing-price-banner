<script setup lang="ts">
import { SaveOutline } from "@vicons/ionicons5";
import {
  FormInst,
  NButton,
  NColorPicker,
  NForm,
  NFormItem,
  NIcon,
  NSelect,
} from "naive-ui";
import { onMounted, reactive, ref } from "vue";
import { usePostmate } from "../composition/usePostmate";
import useStore from "../store";
import { fontSizes, fontWeights, googleFonts } from "../utils/const"; // Assuming fontWeights is an array of available font weights

const form = reactive({
  headlineFont: "",
  headlineWeight: "",
  contentFont: "",
  contentWeight: "",
  textColor: "",
  borderColor: "#e5e7eb",
  contentFontSize: "16px",
  headlineFontSize: "24px",
  mostPopularBorderColor: "#2563eb",
  mostPopularBgColor: "#eff6ff",
  mostPopularLabelColor: "#2563eb",
  annualPriceColor: "#6b7280",
  buttonBgColor: "black",
  mostPopularButtonBgColor: "#2563eb",
  featureUnavailableColor: "#9ca3af",
});

const { defaultStyles } = useStore();
const { emitCode } = usePostmate();

const formRef = ref<FormInst | null>(null);

const rules = {
  headlineFont: [
    {
      required: true,
      message: "Please select a headline font",
      trigger: "blur",
    },
  ],
  headlineWeight: [
    {
      required: true,
      message: "Please select a headline font weight",
      trigger: "blur",
    },
  ],
  contentFont: [
    {
      required: true,
      message: "Please select a content font",
      trigger: "blur",
    },
  ],
  contentWeight: [
    {
      required: true,
      message: "Please select a content font weight",
      trigger: "blur",
    },
  ],
  textColor: [
    {
      required: true,
      message: "Please select a text color",
      trigger: "blur",
    },
  ],
  borderColor: [
    {
      required: true,
      message: "Please select a border color",
      trigger: "blur",
    },
  ],
  contentFontSize: [
    {
      required: true,
      message: "Please select a content font size",
      trigger: "blur",
    },
  ],
  headlineFontSize: [
    {
      required: true,
      message: "Please select a headline font size",
      trigger: "blur",
    },
  ],
  mostPopularBorderColor: [
    {
      required: true,
      message: "Please select a most popular border color",
      trigger: "blur",
    },
  ],
  mostPopularBgColor: [
    {
      required: true,
      message: "Please select a most popular background color",
      trigger: "blur",
    },
  ],
  mostPopularLabelColor: [
    {
      required: true,
      message: "Please select a most popular label color",
      trigger: "blur",
    },
  ],
  annualPriceColor: [
    {
      required: true,
      message: "Please select an annual price color",
      trigger: "blur",
    },
  ],
  buttonBgColor: [
    {
      required: true,
      message: "Please select a button background color",
      trigger: "blur",
    },
  ],
  mostPopularButtonBgColor: [
    {
      required: true,
      message: "Please select a most popular button background color",
      trigger: "blur",
    },
  ],
  featureUnavailableColor: [
    {
      required: true,
      message: "Please select a feature unavailable color",
      trigger: "blur",
    },
  ],
};

const saveSettings = async () => {
  try {
    await formRef.value?.validate();
    defaultStyles.value = {
      ...defaultStyles.value,
      ...form,
    };

    emitCode();
  } catch (e) {
    console.error(e);
  }
};

onMounted(() => {
  form.headlineFont = defaultStyles.value.headlineFont;
  form.headlineWeight = defaultStyles.value.headlineWeight;
  form.contentFont = defaultStyles.value.contentFont;
  form.contentWeight = defaultStyles.value.contentWeight;
  form.textColor = defaultStyles.value.textColor;
  form.borderColor = defaultStyles.value.borderColor;
  form.contentFontSize = defaultStyles.value.contentFontSize;
  form.headlineFontSize = defaultStyles.value.headlineFontSize;
  form.mostPopularBorderColor = defaultStyles.value.mostPopularBorderColor;
  form.mostPopularBgColor = defaultStyles.value.mostPopularBgColor;
  form.mostPopularLabelColor = defaultStyles.value.mostPopularLabelColor;
  form.annualPriceColor = defaultStyles.value.annualPriceColor;
  form.buttonBgColor = defaultStyles.value.buttonBgColor;
  form.mostPopularButtonBgColor = defaultStyles.value.mostPopularButtonBgColor;
  form.featureUnavailableColor = defaultStyles.value.featureUnavailableColor;
});
</script>

<template>
  <div class="p-8">
    <div class="text-2xl font-bold">Style and options</div>
    <NForm
      class="grid grid-cols-1 gap-4 py-5 md:grid-cols-2 lg:grid-cols-3"
      ref="formRef"
      :model="form"
      :rules="rules"
    >
      <!-- Font Settings -->
      <div class="col-span-1 md:col-span-2 lg:col-span-3">
        <div class="text-xl font-semibold">Font Settings</div>
      </div>
      <NFormItem label="Headline Font" path="headlineFont">
        <NSelect
          v-model:value="form.headlineFont"
          :options="googleFonts"
          filterable
          placeholder="Select headline font"
        />
      </NFormItem>
      <NFormItem label="Headline Font Weight" path="headlineWeight">
        <NSelect
          v-model:value="form.headlineWeight"
          :options="fontWeights"
          filterable
          placeholder="Select headline font weight"
        />
      </NFormItem>
      <NFormItem label="Content Font" path="contentFont">
        <NSelect
          v-model:value="form.contentFont"
          :options="googleFonts"
          filterable
          placeholder="Select content font"
        />
      </NFormItem>
      <NFormItem label="Content Font Weight" path="contentWeight">
        <NSelect
          v-model:value="form.contentWeight"
          :options="fontWeights"
          filterable
          placeholder="Select content font weight"
        />
      </NFormItem>
      <NFormItem label="Content Font Size" path="contentFontSize">
        <NSelect
          v-model:value="form.contentFontSize"
          :options="fontSizes"
          filterable
          placeholder="Select content font size"
        />
      </NFormItem>
      <NFormItem label="Headline Font Size" path="headlineFontSize">
        <NSelect
          v-model:value="form.headlineFontSize"
          :options="fontSizes"
          filterable
          placeholder="Select headline font size"
        />
      </NFormItem>

      <!-- Color Settings -->
      <div class="col-span-1 md:col-span-2 lg:col-span-3">
        <div class="text-xl font-semibold">Color Settings</div>
      </div>
      <NFormItem label="Text Color" path="textColor">
        <NColorPicker v-model:value="form.textColor" />
      </NFormItem>
      <NFormItem label="Border Color" path="borderColor">
        <NColorPicker v-model:value="form.borderColor" />
      </NFormItem>
      <NFormItem
        label="Most Popular Border Color"
        path="mostPopularBorderColor"
      >
        <NColorPicker v-model:value="form.mostPopularBorderColor" />
      </NFormItem>
      <NFormItem
        label="Most Popular Background Color"
        path="mostPopularBgColor"
      >
        <NColorPicker v-model:value="form.mostPopularBgColor" />
      </NFormItem>
      <NFormItem label="Most Popular Label Color" path="mostPopularLabelColor">
        <NColorPicker v-model:value="form.mostPopularLabelColor" />
      </NFormItem>
      <NFormItem label="Annual Price Color" path="annualPriceColor">
        <NColorPicker v-model:value="form.annualPriceColor" />
      </NFormItem>
      <NFormItem label="Button Background Color" path="buttonBgColor">
        <NColorPicker v-model:value="form.buttonBgColor" />
      </NFormItem>
      <NFormItem
        label="Most Popular Button Background Color"
        path="mostPopularButtonBgColor"
      >
        <NColorPicker v-model:value="form.mostPopularButtonBgColor" />
      </NFormItem>
      <NFormItem
        label="Feature Unavailable Color"
        path="featureUnavailableColor"
      >
        <NColorPicker v-model:value="form.featureUnavailableColor" />
      </NFormItem>

      <!-- Save Button -->
      <div class="flex justify-end col-span-1 mt-4 md:col-span-2 lg:col-span-3">
        <NButton size="large" type="primary" @click="saveSettings"
          >Save Settings
          <template #icon>
            <NIcon><SaveOutline /></NIcon>
          </template>
        </NButton>
      </div>
    </NForm>
  </div>
</template>

<style scoped></style>
