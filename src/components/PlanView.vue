<script setup lang="ts">
import { Add, CreateOutline, Trash } from "@vicons/ionicons5";
import { NButton, NCard, NIcon } from "naive-ui";
import { ref } from "vue";
import { usePostmate } from "../composition/usePostmate";
import useStore from "../store";
import { PlanInterface } from "../types";
import AddEditPlan from "./AddEditPlan.vue";

const { plans } = useStore();
const selectedPlan = ref<PlanInterface>();
const { emitCode } = usePostmate();
const showAddEditPlan = ref(false);

const addPlan = () => {
  selectedPlan.value = undefined;
  showAddEditPlan.value = true;
};

const showOverview = () => {
  showAddEditPlan.value = false;
};

const editPlan = (plan: PlanInterface) => {
  selectedPlan.value = plan;
  showAddEditPlan.value = true;
};

const deletePlan = (plan: PlanInterface) => {
  const index = plans.value.findIndex((item) => item.name === plan.name);
  plans.value.splice(index, 1);
  emitCode();
};

const onSave = (payload: PlanInterface) => {
  if (selectedPlan.value) {
    const index = plans.value.findIndex(
      (plan) => plan.name === selectedPlan.value?.name
    );
    plans.value[index] = payload;
  } else {
    plans.value.push(payload);
  }
  showOverview();

  emitCode();
};
</script>

<template>
  <AddEditPlan
    v-if="showAddEditPlan"
    :plan="selectedPlan"
    @success="onSave"
    @close="showOverview"
  />
  <div v-else class="p-8">
    <div class="text-2xl font-bold">Plans</div>
    <div class="flex justify-end my-5">
      <NButton @click="addPlan" type="info">
        <template #icon>
          <NIcon><Add /></NIcon>
        </template>
        Add Plan
      </NButton>
    </div>
    <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
      <NCard
        v-for="item in plans"
        :key="item.name"
        :title="item.name"
        class="w-full"
      >
        <template #header-extra>
          <NButton @click="editPlan(item)" :bordered="false">
            <template #icon>
              <NIcon><CreateOutline /></NIcon>
            </template>
          </NButton>

          <NButton
            @click="deletePlan(item)"
            :bordered="false"
            :disabled="plans.length === 3"
          >
            <template #icon>
              <NIcon><Trash /></NIcon>
            </template>
          </NButton>
        </template>
        <p class="text-lg font-bold text-blue-600">{{ item.price }}</p>
        <p class="font-semibold text-gray-500 text-md">
          {{ item.annualPrice }}
        </p>
        <p v-if="item.mostPopular" class="mt-2 text-xl font-bold text-red-500">
          Most Popular
        </p>
      </NCard>
    </div>
  </div>
</template>

<style scoped></style>
