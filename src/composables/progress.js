import { computed } from "vue";
import { calculateActivityCompletionPercentage } from "../activities";
import { getProgressColorClass } from "../functions";
import {
    calculateTrackedActivitySeconds,
    timelineItems,
} from "../timeline-items";

export function useProgress(activity) {
    const colorClass = computed(() => {
        return getProgressColorClass(percentage.value);
    });

    const percentage = computed(() =>
        calculateActivityCompletionPercentage(
            // вычисление общего процента выполнения
            activity, // время отведенное на активность
            trackedSeconds.value, // все время, которое было потрачено на активность
        ),
    );

    const trackedSeconds = computed(() =>
        calculateTrackedActivitySeconds(timelineItems.value, activity),
    );

    return {
        colorClass,
        percentage,
        trackedSeconds,
    };
}