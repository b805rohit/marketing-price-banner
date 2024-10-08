<script setup lang="ts">
import { Trash } from "@vicons/ionicons5";
import {
  FormInst,
  NButton,
  NCheckbox,
  NForm,
  NFormItem,
  NIcon,
  NInput,
} from "naive-ui";
import { onMounted, ref } from "vue";
import { FeatureInterface, PlanInterface } from "../types";

const props = defineProps<{
  plan?: PlanInterface;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "success", payload: PlanInterface): void;
}>();

const newPlan = ref<PlanInterface>({
  name: "",
  price: "",
  annualPrice: "",
  buttonText: "",
  buttonAction: "",
  mostPopular: false,
  features: [],
});

const formRef = ref<FormInst | null>(null);

const addFeature = () => {
  newPlan.value.features.push({ text: "", available: false });
};

const addPlan = async () => {
  try {
    await formRef.value?.validate();
    newPlan.value.features = newPlan.value.features.filter(
      (feature) => feature.text
    );
    emit("success", newPlan.value);
  } catch (e) {
    console.error(e);
    return;
  }
};

const rules = {
  name: [{ required: true, message: "Name is required", trigger: "blur" }],
  price: [{ required: true, message: "Price is required", trigger: "blur" }],
  annualPrice: [
    { required: true, message: "Annual Price is required", trigger: "blur" },
  ],
  buttonText: [
    { required: true, message: "Button Text is required", trigger: "blur" },
  ],
  buttonAction: [
    { required: true, message: "Button Action is required", trigger: "blur" },
  ],
};

const resetForm = () => {
  formRef.value?.restoreValidation();
  newPlan.value = {
    name: "",
    price: "",
    annualPrice: "",
    buttonText: "",
    buttonAction: "",
    mostPopular: false,
    features: [] as FeatureInterface[],
  };
  emit("close");
};

const removeFeature = (index: number) => {
  newPlan.value.features.splice(index, 1);
};

onMounted(() => {
  if (props.plan) {
    newPlan.value = { ...props.plan };
  }
});
</script>

<template>
  <div class="flex justify-center min-h-full py-10">
    <NForm
      class="w-full max-w-xs p-8 bg-white rounded-lg shadow-md h-fit lg:max-w-lg"
      :rules="rules"
      :model="newPlan"
      ref="formRef"
    >
      <h2 class="mb-6 text-2xl font-semibold text-center text-gray-800">
        {{ props.plan ? "Edit Plan" : "Add New Plan" }}
      </h2>
      <NFormItem label="Name" path="name">
        <NInput v-model:value="newPlan.name" />
      </NFormItem>
      <NFormItem label="Price" path="price">
        <NInput v-model:value="newPlan.price" />
      </NFormItem>
      <NFormItem label="Annual Price" path="annualPrice">
        <NInput v-model:value="newPlan.annualPrice" />
      </NFormItem>
      <NFormItem label="Button Text" path="buttonText">
        <NInput v-model:value="newPlan.buttonText" />
      </NFormItem>
      <NFormItem label="Button Action" path="buttonAction">
        <NInput v-model:value="newPlan.buttonAction" />
      </NFormItem>
      <NFormItem label="Most Popular" path="mostPopular">
        <NCheckbox v-model:checked="newPlan.mostPopular">Yes</NCheckbox>
      </NFormItem>
      <NFormItem label="Features" path="features">
        <div class="flex flex-col w-full">
          <div
            v-for="(feature, index) in newPlan.features"
            :key="index"
            class="flex items-center w-full p-2 mb-2 rounded-lg shadow-sm bg-gray-50"
          >
            <NInput
              v-model:value="feature.text"
              placeholder="Feature text"
              class="flex-1"
            />
            <NCheckbox
              v-model:checked="feature.available"
              class="mx-2"
            ></NCheckbox>
            <NButton :bordered="false" @click="removeFeature(index)">
              <template #icon>
                <NIcon>
                  <Trash />
                </NIcon>
              </template>
            </NButton>
          </div>
          <NButton type="primary" @click="addFeature" class="mt-2"
            >Add Feature</NButton
          >
        </div>
      </NFormItem>
      <div class="flex justify-end mt-6">
        <NButton @click="resetForm" type="default" class="mr-2">
          Close
        </NButton>
        <NButton @click="addPlan" type="primary" htmlType="submit">
          {{ props.plan ? "Update Plan" : "Add Plan" }}
        </NButton>
      </div>
    </NForm>
  </div>
</template>

<style scoped></style>
