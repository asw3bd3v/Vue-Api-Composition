<template>
	<li class="flex flex-col gap-2 p-4">
		<div class="flex items-center gap-2">
			<BaseButton :type="BUTTON_TYPE_DANGER" @click="emit('delete')">
				<TrashIcon class="h-8" />
			</BaseButton>
			<span class="truncate text-xl">{{ activity.name }}</span>
		</div>
		<div>
			<BaseSelect
				class="font-mono"
				placeholder="h:mm"
				:selected="activity.secondsToComplete || null"
				:options="PERIOD_SELECT_OPTIONS"
				@select="emit('setSecondsToComplete', $event || 0)"
			/>
		</div>
	</li>
</template>

<script setup>
import { TrashIcon } from "@heroicons/vue/24/outline";
import BaseSelect from "./BaseSelect.vue";
import BaseButton from "./BaseButton.vue";
import { PERIOD_SELECT_OPTIONS, BUTTON_TYPE_DANGER } from "../constants";
import { isActivityValid, isNumber, isUndefined } from "../validators";

const emit = defineEmits({
	delete: isUndefined,
	setSecondsToComplete: isNumber
});

defineProps({
	activity: {
		type: Object,
		required: true,
		validator: isActivityValid,
	},
});
</script>
