<template>
	<TheHeader @navigate="navigate" />

	<main class="flex flex-grow flex-col">
		<TheTimeline
			v-show="currentPage === PAGE_TIMELINE"
			:timeline-items="timelineItems"
			:current-page="currentPage"
			ref="timelineRef"
		/>
		<TheActivities
			v-show="currentPage === PAGE_ACTIVITIES"
			:activities="activities"
		/>
		<TheProgress v-show="currentPage === PAGE_PROGRESS" />
	</main>

	<TheNav :current-page="currentPage" @navigate="navigate" />
</template>

<script setup>
import { ref, computed, provide } from "vue";

import TheHeader from "./components/TheHeader.vue";
import TheNav from "./components/TheNav.vue";
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from "./constants";
import {
	generateTimelineItems,
	generateActivitySelectOptions,
	generateActivities,
	generatePeriodSelectOptions,
} from "./functions";
import { currentPage, navigate, timelineRef } from "./router.js";
import TheActivities from "./pages/TheActivities.vue";
import TheProgress from "./pages/TheProgress.vue";
import TheTimeline from "./pages/TheTimeline.vue";

const activities = ref(generateActivities());

const timelineItems = ref(generateTimelineItems(activities.value));

const activitySelectOptions = computed(() =>
	generateActivitySelectOptions(activities.value),
);

function createActivity(activity) {
	activities.value.push(activity);
}

function deleteActivity(activity) {
	timelineItems.value.forEach((timelineItem) => {
		if (timelineItem.activityId === activity.id) {
			timelineItem.activityId = null;
			timelineItem.activitySeconds = 0;
		}
	});
	activities.value.splice(activities.value.indexOf(activity), 1);
}

function setTimelineItemActivity(timelineItem, activityId) {
	timelineItem.activityId = activityId;
}

function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
	timelineItem.activitySeconds += activitySeconds;
}

function setActivitySecondsToComplete(activity, secondsToComplete) {
	activity.secondsToComplete = secondsToComplete;
}

provide("updateTimelineItemActivitySeconds", updateTimelineItemActivitySeconds);
provide("setTimelineItemActivity", setTimelineItemActivity);
provide("setActivitySecondsToComplete", setActivitySecondsToComplete);
provide("createActivity", createActivity);
provide("deleteActivity", deleteActivity);
provide("timelineItems", timelineItems.value);
provide("activitySelectOptions", activitySelectOptions.value);
provide("periodSelectOptions", generatePeriodSelectOptions());
</script>

<style scoped></style>
