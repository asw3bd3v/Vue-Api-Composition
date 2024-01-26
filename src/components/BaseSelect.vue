<template>
	<div class="flex gap-2">
		<BaseButton @click="select(null)" :type="BUTTON_TYPE_NEUTRAL">
			<BaseIcon :name="ICON_X_MARK" />
		</BaseButton>
		<select
			class="w-full truncate rounded bg-gray-100 py-1 px-2 text-2xl"
			@change="select($event.target.value)"
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
import BaseIcon from "./BaseIcon.vue";
import {
	validateSelectOptions,
	isUndefinedOrNull,
	isSelectValueValid,
} from "../validators";
import { BUTTON_TYPE_NEUTRAL } from "../constants";
import { ICON_X_MARK } from "../icons";
import { normalizeSelectValue } from "../functions";

const props = defineProps({
	selected: [String, Number],
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
	select: isSelectValueValid,
});

const isNotSelected = computed(() => isUndefinedOrNull(props.selected));

function select(value) {
	emit("select", normalizeSelectValue(value));
}
</script>
