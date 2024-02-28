import { computed } from "vue";
import {
	calculateCompletionPercentage,
	trackedActivities,
} from "../activities";
import { getProgressColorClass } from "../functions";
import {
	calculateTrackedActivitySeconds,
	timelineItems,
} from "../timeline-items";

export function useTotalProgress() {
	const colorClass = computed(() => {
		return getProgressColorClass(percentage.value);
	});

	const totalTrackedSeconds = computed(() => {
		return trackedActivities.value
			.map((activity) =>
				Math.min(
					calculateTrackedActivitySeconds(
						timelineItems.value,
						activity,
					),
					activity.secondsToComplete,
				),
			)
			.reduce((total, seconds) => total + seconds, 0);
	});

	const percentage = computed(() =>
		calculateCompletionPercentage(totalTrackedSeconds.value),
	);

	return {
		colorClass,
		percentage,
	};
}
