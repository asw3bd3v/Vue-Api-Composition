<template>
	<li
		class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4"
	>
		<TimelineHour :hour="timelineItem.hour" />
		<BaseSelect
			:selected="timelineItem.activityId"
			:options="activitySelectOptions"
			placeholder="Rest"
			@select="selectActivity"
		/>
		<div class="flex w-full gap-2">
			<BaseButton :type="BUTTON_TYPE_DANGER">
				<ArrowPathIcon class="h-8" />
			</BaseButton>
			<div
				class="flex flex-grow items-center rounded bg-gray-100 font-mono text-3xl"
			>
				00:00:00
			</div>
			<BaseButton :type="BUTTON_TYPE_WARNING">
				<PauseIcon class="h-8" />
			</BaseButton>
			<BaseButton :type="BUTTON_TYPE_SUCCESS">
				<PlayIcon class="h-8" />
			</BaseButton>
		</div>
	</li>
</template>

<script setup>
import {
	isActivityValid,
	isTimelineItemValid,
	validateSelectOptions,
	validateActivities,
} from "../validators";
import BaseSelect from "./BaseSelect.vue";
import TimelineHour from "./TimelineHour.vue";
import {
	NULLABLE_ACTIVITY,
	BUTTON_TYPE_DANGER,
	BUTTON_TYPE_WARNING,
	BUTTON_TYPE_SUCCESS,
} from "../constants.js";
import BaseButton from "./BaseButton.vue";
import { ArrowPathIcon, PauseIcon, PlayIcon } from "@heroicons/vue/24/outline";

const emit = defineEmits({
	selectActivity: isActivityValid,
});

const props = defineProps({
	timelineItem: {
		type: Object,
		required: true,
		validator: isTimelineItemValid,
	},
	activities: {
		type: Array,
		required: true,
		validator: validateActivities,
	},
	activitySelectOptions: {
		type: Array,
		required: true,
		validator: validateSelectOptions,
	},
});

function selectActivity(id) {
	emit("selectActivity", findActivityById(id));
}

function findActivityById(id) {
	return (
		props.activities.find((activity) => activity.id === id) ||
		NULLABLE_ACTIVITY
	);
}
</script>
