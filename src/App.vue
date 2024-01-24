<template>
	<TheHeader />

	<main class="flex flex-grow flex-col">
		<TheTimeline
			v-show="currentPage === PAGE_TIMELINE"
			:timeline-items="timelineItems"
			ref="timelineRef"
		/>
		<TheActivities
			v-show="currentPage === PAGE_ACTIVITIES"
			:activities="activities"
		/>
		<TheProgress v-show="currentPage === PAGE_PROGRESS" />
	</main>

	<TheNav />
</template>

<script setup>
import { ref, provide, readonly } from "vue";

import TheHeader from "./components/TheHeader.vue";
import TheNav from "./components/TheNav.vue";
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from "./constants";
import {
	generateTimelineItems,
	generatePeriodSelectOptions,
} from "./functions";
import { currentPage, timelineRef } from "./router.js";
import * as keys from "./keys.js";
import {
	setActivitySecondsToComplete,
	activitySelectOptions,
	createActivity,
	deleteActivity,
	activities,
} from "./activities.js";
import TheActivities from "./pages/TheActivities.vue";
import TheProgress from "./pages/TheProgress.vue";
import TheTimeline from "./pages/TheTimeline.vue";

const timelineItems = ref(generateTimelineItems(activities.value));

function setTimelineItemActivity(timelineItem, activityId) {
	timelineItem.activityId = activityId;
}

function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
	timelineItem.activitySeconds += activitySeconds;
}

provide(
	keys.updateTimelineItemActivitySecondsKey,
	updateTimelineItemActivitySeconds,
);
provide(keys.setTimelineItemActivityKey, setTimelineItemActivity);
provide(keys.setActivitySecondsToCompleteKey, setActivitySecondsToComplete);
provide(keys.createActivityKey, createActivity);
provide(keys.deleteActivityKey, deleteActivity);
provide(keys.timelineItemsKey, readonly(timelineItems.value));
provide(keys.activitySelectOptionsKey, readonly(activitySelectOptions.value));
provide(keys.periodSelectOptionsKey, readonly(generatePeriodSelectOptions()));
</script>

<style scoped></style>
