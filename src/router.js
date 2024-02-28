import { ref } from "vue";
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from "./constants";
import { isPageValid } from "./validators.js";
import TheActivities from "./pages/TheActivities.vue";
import TheProgress from "./pages/TheProgress.vue";
import TheTimeline from "./pages/TheTimeline.vue";

export const routes = {
	[PAGE_ACTIVITIES]: TheActivities,
	[PAGE_PROGRESS]: TheProgress,
	[PAGE_TIMELINE]: TheTimeline,
};

export const currentPage = ref(normalizePageHash());

export function navigate(page) {
	document.body.scrollIntoView();

	currentPage.value = page;
}

export function normalizePageHash() {
	const page = window.location.hash.slice(1);

	if (isPageValid(page)) {
		return page;
	}

	window.location.hash = PAGE_TIMELINE;

	return PAGE_TIMELINE;
}
