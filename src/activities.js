import { ref, computed } from "vue";
import { id } from "./functions";
import {
    SECONDS_IN_HOUR,
    HUNDRED_PERCENT,
} from "./constants";

export const activities = ref(generateActivities());

export const trackedActivities = computed(() =>
    activities.value.filter(({ secondsToComplete }) => secondsToComplete)
);

export const activitySelectOptions = computed(() =>
    generateActivitySelectOptions(activities.value),
);

export function createActivity(activity) {
    activities.value.push(activity);
}

export function updateActivity(activity, fields) {
    return Object.assign(activity, fields);
}

export function deleteActivity(activity) {
    activities.value.splice(activities.value.indexOf(activity), 1);
}

export function calculateActivityCompletionPercentage({ secondsToComplete }, trackedSeconds) {
    return Math.floor(
        (trackedSeconds * HUNDRED_PERCENT) / secondsToComplete,
    );
}

function generateActivities() {
    return ['Coding', 'Reading', 'Training'].map((name, hours) => ({
        id: id(),
        name,
        secondsToComplete: 15 * 60 // hours * SECONDS_IN_HOUR
    }));
}

function generateActivitySelectOptions(activities) {
    return activities.map((activity) => ({ label: activity.name, value: activity.id }));
}