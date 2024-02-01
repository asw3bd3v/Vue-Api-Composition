<template>
	<li
		class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4"
	>
		<TimelineHour :hour="timelineItem.hour" />
		<BaseSelect
			:selected="timelineItem.activityId"
			:options="activitySelectOptions"
			placeholder="Rest"
			@select="updateTimelineItem(timelineItem, { activityId: $event })"
		/>
		<TimelineStopwatch :timeline-item="timelineItem" />
	</li>
</template>

<script setup>
import { isTimelineItemValid } from "../validators";
import BaseSelect from "./BaseSelect.vue";
import TimelineHour from "./TimelineHour.vue";
import TimelineStopwatch from "./TimelineStopwatch.vue";
import { updateTimelineItem } from "../timeline-items.js";
import { activitySelectOptions } from "../activities.js";

defineProps({
	timelineItem: {
		type: Object,
		required: true,
		validator: isTimelineItemValid,
	},
});
</script>
