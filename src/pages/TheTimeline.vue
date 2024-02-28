<template>
	<div class="relative mt-7">
		<TheTimelineIndicator />
		<ul>
			<TimelineItem
				v-for="timelineItem in timelineItems"
				:key="timelineItem.hour"
				:timeline-item="timelineItem"
				ref="timelineItemRefs"
			/>
		</ul>
	</div>
</template>

<script setup>
import { onActivated } from "vue";
import TimelineItem from "../components/TimelineItem.vue";
import TheTimelineIndicator from "../components/TheTimelineIndicator.vue";
//import { PAGE_TIMELINE } from "../constants";
//import { currentPage } from "../router.js";
import {
	timelineItems,
	timelineItemRefs,
	scrollToCurrentHour,
} from "../timeline-items.js";

/* watchPostEffect(async () => {
	if (currentPage.value === PAGE_TIMELINE) {
		await nextTick();

		scrollToCurrentHour(false);
	}
}); */

/* onActivated(async () => {
	scrollToCurrentHour(false);
}); */

onActivated(scrollToCurrentHour);
</script>
