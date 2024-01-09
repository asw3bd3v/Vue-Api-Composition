<template>
	<TheHeader @navigate="goTo($event)" />

	<main class="flex flex-grow flex-col">
		<TheTimeline
			v-show="currentPage === PAGE_TIMELINE"
			:timeline-items="timelineItems"
			:activities="activities"
			:activity-select-options="activitySelectOptions"
			:current-page="currentPage"
			@set-timeline-item-activity="setTimelineItemActivity"
		/>
		<TheActivities
			v-show="currentPage === PAGE_ACTIVITIES"
			:activities="activities"
			@create-activity="createActivity"
			@delete-activity="deleteActivity"
			@set-activity-seconds-to-complete="setActivitySecondsToComplete"
		/>
		<TheProgress v-show="currentPage === PAGE_PROGRESS" />
	</main>

	<TheNav :current-page="currentPage" @navigate="goTo($event)" />
</template>

<script setup>
import { ref, computed } from "vue";

import TheHeader from "./components/TheHeader.vue";
import TheNav from "./components/TheNav.vue";
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from "./constants";
import {
	normalizePageHash,
	generateTimelineItems,
	generateActivitySelectOptions,
	generateActivities,
} from "./functions";
import TheActivities from "./pages/TheActivities.vue";
import TheProgress from "./pages/TheProgress.vue";
import TheTimeline from "./pages/TheTimeline.vue";

const currentPage = ref(normalizePageHash());

const activities = ref(generateActivities());

const timelineItems = ref(generateTimelineItems(activities.value));

const activitySelectOptions = computed(() =>
	generateActivitySelectOptions(activities.value),
);

function goTo(page) {
	currentPage.value = page;
}

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

function setTimelineItemActivity(timelineItem, activity) {
	timelineItem.activityId = activity.id;
}

function setActivitySecondsToComplete(activity, secondsToComplete) {
	activity.secondsToComplete = secondsToComplete;
}
</script>

<style scoped></style>
