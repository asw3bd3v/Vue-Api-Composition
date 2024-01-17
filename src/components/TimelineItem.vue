<template>
	<li
		class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4"
	>
		<TimelineHour
			:hour="timelineItem.hour"
			@click.prevent="emit('scrollToHour', timelineItem.hour)"
		/>
		<BaseSelect
			:selected="timelineItem.activityId"
			:options="activitySelectOptions"
			placeholder="Rest"
			@select="selectActivity"
		/>
		<TimelineStopwatch
			:seconds="timelineItem.activitySeconds"
			:hour="timelineItem.hour"
			@update-seconds="emit('updateActivitySeconds', $event)"
		/>
	</li>
</template>

<script setup>
import {
	isActivityValid,
	isTimelineItemValid,
	validateSelectOptions,
	validateActivities,
	isHourValid,
	isNumber,
} from "../validators";
import BaseSelect from "./BaseSelect.vue";
import TimelineHour from "./TimelineHour.vue";
import TimelineStopwatch from "./TimelineStopwatch.vue";
import { NULLABLE_ACTIVITY } from "../constants.js";

const emit = defineEmits({
	selectActivity: isActivityValid,
	scrollToHour: isHourValid,
	updateActivitySeconds: isNumber,
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
