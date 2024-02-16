import { APP_NAME, MILLISECONDS_IN_SECOND, SECONDS_IN_HOUR } from './constants.js';
import { isToday, today } from './time.js';
import { activities } from './activities.js';
import { timelineItems } from './timeline-items.js';

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
    let idleMilliseconds = today() - lastActiveAt;

    if (lastActiveAt.getHours() !== today().getHours()) {
        idleMilliseconds = getEndOfIdleHour(lastActiveAt) - lastActiveAt;
    }

    return idleMilliseconds / MILLISECONDS_IN_SECOND;
}

function getEndOfIdleHour(lastActiveAt) {
    const endOfIdleHour = new Date(lastActiveAt);

    endOfIdleHour.setTime(endOfIdleHour.getTime() + SECONDS_IN_HOUR);

    endOfIdleHour.setMinutes(0, 0, 0);

    return endOfIdleHour;
}