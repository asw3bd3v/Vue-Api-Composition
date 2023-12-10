<template>
  <div class="flex gap-2">
    <BaseButton @click="emit('select', null)">
      <XMarkIcon class="h-8" />
    </BaseButton>
    <select
      class="w-full truncate rounded bg-gray-100 py-1 px-2 text-2xl"
      @change="emit('select', +$event.target.value)"
    >
      <option :selected="isNotSelected" disabled value="">
        {{ placeholder }}
      </option>
      <option
        v-for="{ value, label } in options"
        :key="value"
        :value="value"
        :selected="value === selected"
      >
        {{ label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { computed } from "vue";
import BaseButton from "./BaseButton.vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { validateSelectOptions, isUndefinedOrNull, isNumberOrNull } from "../validators";

const props = defineProps({
  selected: Number,
  placeholder: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
    validator: validateSelectOptions,
  },
});

const emit = defineEmits({
  /* select(value) {
    return typeof value === "number";
  }, */
  select: isNumberOrNull
});

const isNotSelected = computed(() => isUndefinedOrNull(props.selected));
</script>
