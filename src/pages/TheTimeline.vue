<template>
	<div class="mt-7">
		<ul>
			<TimelineItem
				v-for="timelineItem in timelineItems"
				:key="timelineItem.hour"
				:timeline-item="timelineItem"
				ref="timelineItemRefs"
				@scroll-to-hour="scrollToHour"
			/>
		</ul>
	</div>
</template>

<script setup>
import { nextTick, ref, watchPostEffect } from "vue";
import TimelineItem from "../components/TimelineItem.vue";
import { validateTimelineItems } from "../validators";
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from "../constants";
import { currentPage } from "../router.js";

defineExpose({ scrollToHour });

defineProps({
	timelineItems: {
		type: Array,
		required: true,
		validator: validateTimelineItems,
	},
});

const timelineItemRefs = ref([]);

watchPostEffect(async () => {
	if (currentPage.value === PAGE_TIMELINE) {
		await nextTick();

		scrollToHour(null, false);
	}
});

function scrollToHour(hour = null, isSmooth = true) {
	hour ??= new Date().getHours();

	const el =
		hour === MIDNIGHT_HOUR
			? document.body
			: timelineItemRefs.value[hour - 1].$el;

	el.scrollIntoView({ behavior: isSmooth ? "smooth" : "instant" });
}
</script>
