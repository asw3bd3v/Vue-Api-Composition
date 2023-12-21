<template>
	<TheHeader @navigate="goTo($event)" />

	<main class="flex flex-grow flex-col">
		<TheTimeline
			v-show="currentPage === PAGE_TIMELINE"
			:timeline-items="timelineItems"
			:activity-select-options="activitySelectOptions"
		/>
		<TheActivities
			v-show="currentPage === PAGE_ACTIVITIES"
			:activities="activities"
			@delete-activity="deleteActivity"
		/>
		<TheProgress v-show="currentPage === PAGE_PROGRESS" />
	</main>

	<TheNav :current-page="currentPage" @navigate="goTo($event)" />
</template>

<script setup>
import { ref } from "vue";

import TheHeader from "./components/TheHeader.vue";
import TheNav from "./components/TheNav.vue";
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from "./constants";
import {
	normalizePageHash,
	generateTimelineItems,
	generateActivitySelectOptions,
} from "./functions";
import TheActivities from "./pages/TheActivities.vue";
import TheProgress from "./pages/TheProgress.vue";
import TheTimeline from "./pages/TheTimeline.vue";

const currentPage = ref(normalizePageHash());
const timelineItems = generateTimelineItems();
const activities = ref(["Coding", "Reading", "Training"]);
const activitySelectOptions = generateActivitySelectOptions(activities.value);

function goTo(page) {
	currentPage.value = page;
}

function deleteActivity(activity) {
	activities.value.splice(activities.value.indexOf(activity), 1);
}
</script>

<style scoped></style>
