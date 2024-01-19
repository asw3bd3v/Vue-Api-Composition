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
			@select="setTimelineItemActivity(timelineItem, $event)"
		/>
		<TimelineStopwatch :timeline-item="timelineItem" />
	</li>
</template>

<script setup>
import { inject } from "vue";
import { isTimelineItemValid, isHourValid } from "../validators";
import BaseSelect from "./BaseSelect.vue";
import TimelineHour from "./TimelineHour.vue";
import TimelineStopwatch from "./TimelineStopwatch.vue";
import {
	setTimelineItemActivityKey,
	activitySelectOptionsKey,
} from "../keys.js";

const emit = defineEmits({
	scrollToHour: isHourValid,
});

const setTimelineItemActivity = inject(setTimelineItemActivityKey);
const activitySelectOptions = inject(activitySelectOptionsKey);

defineProps({
	timelineItem: {
		type: Object,
		required: true,
		validator: isTimelineItemValid,
	},
});
</script>
