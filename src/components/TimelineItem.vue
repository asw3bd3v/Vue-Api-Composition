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
import { NULLABLE_ACTIVITY } from "../constants.js";

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
