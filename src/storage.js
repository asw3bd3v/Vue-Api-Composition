import { APP_NAME } from './constants.js';
import { isToday, today, endOfHour, toSeconds } from './time.js';
import { activities } from './activities.js';
import { timelineItems } from './timeline-items.js';
import { activeTimelineItem } from './timeline-items.js';
import {
    startTimelineItemTimer,
    stopTimelineItemTimer,

} from "./timeline-item-timer.js";

export function syncState(shouldLoad = true) {
    shouldLoad ? loadState() : saveState();

    if (activeTimelineItem.value) {
        shouldLoad
            ? startTimelineItemTimer(activeTimelineItem.value)
            : stopTimelineItemTimer(activeTimelineItem.value);
    }
}

export function loadState() {
    const serializedState = localStorage.getItem(APP_NAME);

    const state = serializedState ? JSON.parse(serializedState) : {};

    activities.value = state.activities || activities.value;

    // дата последней активности приложения
    const lastActiveAt = new Date(state.lastActiveAt);

    timelineItems.value = isToday(lastActiveAt)
        ? syncIdleSeconds(state.timelineItems, lastActiveAt)
        : timelineItems.value;
}


export function saveState() {
    localStorage.setItem(
        APP_NAME,
        JSON.stringify({
            timelineItems: timelineItems.value,
            activities: activities.value,
            lastActiveAt: today(),
        })
    );
}

function syncIdleSeconds(timelineItems, lastActiveAt) {
    const activeTimelienItem = timelineItems.find(({ isActive }) => isActive);

    if (activeTimelienItem) {
        activeTimelienItem.activitySeconds += calculateIdleSeconds(lastActiveAt);
    }

    return timelineItems;
}

function calculateIdleSeconds(lastActiveAt) {

    return lastActiveAt.getHours() === today().getHours()
        ? toSeconds(today() - lastActiveAt)
        : toSeconds(endOfHour(lastActiveAt) - lastActiveAt);
}