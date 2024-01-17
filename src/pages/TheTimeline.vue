<template>
	<div class="mt-7">
		<ul>
			<TimelineItem
				v-for="timelineItem in timelineItems"
				:key="timelineItem.hour"
				:timeline-item="timelineItem"
				:activities="activities"
				:activity-select-options="activitySelectOptions"
				ref="timelineItemRefs"
				@scroll-to-hour="scrollToHour"
				@select-activity="
					emit('setTimelineItemActivity', timelineItem, $event)
				"
				@update-activity-seconds="
					emit(
						'updateTimelineItemActivitySeconds',
						timelineItem,
						$event,
					)
				"
			/>
		</ul>
	</div>
</template>

<script setup>
import { nextTick, ref, watchPostEffect } from "vue";
import TimelineItem from "../components/TimelineItem.vue";
import {
	validateTimelineItems,
	validateSelectOptions,
	validateActivities,
	isTimelineItemValid,
	isActivityValid,
	isPageValid,
	isNumber,
} from "../validators";
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from "../constants";

const emit = defineEmits({
	setTimelineItemActivity(timelineItem, activity) {
		return [
			isTimelineItemValid(timelineItem),
			isActivityValid(activity),
		].every(Boolean);
	},
	updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
		return [
			isTimelineItemValid(timelineItem),
			isNumber(activitySeconds),
		].every(Boolean);
	},
});

defineExpose({ scrollToHour });

const props = defineProps({
	timelineItems: {
		type: Array,
		required: true,
		validator: validateTimelineItems,
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
	currentPage: {
		type: String,
		required: true,
		validator: isPageValid,
	},
});

const timelineItemRefs = ref([]);

watchPostEffect(async () => {
	if (props.currentPage === PAGE_TIMELINE) {
		await nextTick();

		scrollToHour(null, false);
	}
});

function scrollToHour(hour = null, isSmooth = true) {
	hour ??= new Date().getHours();

	const options = { behavior: isSmooth ? "smooth" : "instant" };
	if (hour === MIDNIGHT_HOUR) {
		document.body.scrollIntoView(options);
	} else {
		timelineItemRefs.value[hour - 1].$el.scrollIntoView(options);
	}
}
</script>
