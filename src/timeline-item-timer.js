import { ref, watchEffect } from "vue";
import { MILLISECONDS_IN_SECOND } from "./constants";
import { updateTimelineItem, activeTimelineItem } from "./timeline-items";
import { now } from "./time";

watchEffect(() => {
	if (
		activeTimelineItem.value &&
		activeTimelineItem.value.hour !== now.value.getHours()
	) {
		stopTimelineItemTimer();
	}
});

const timelineItemTimer = ref(false);

export function startTimelineItemTimer(timelineItem) {
	timelineItem = timelineItem ?? activeTimelineItem.value;

	updateTimelineItem(timelineItem, {
		isActive: true,
	});

	timelineItemTimer.value = setInterval(() => {
		updateTimelineItem(timelineItem, {
			activitySeconds: timelineItem.activitySeconds + 1,
		});
	}, MILLISECONDS_IN_SECOND);
}

export function stopTimelineItemTimer() {
	updateTimelineItem(activeTimelineItem.value, {
		isActive: false,
	});

	clearInterval(timelineItemTimer.value);

	timelineItemTimer.value = false;
}

export function resetTimelineItemTimer(timelineItem) {
	updateTimelineItem(timelineItem, {
		activitySeconds: 0,
	});

	if (activeTimelineItem.value) {
		stopTimelineItemTimer();
	}
}
