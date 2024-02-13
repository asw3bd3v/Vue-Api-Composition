import { APP_NAME } from './constants.js';
import { isToday, today } from './time.js';
import { activities } from './activities.js';
import { timelineItems } from './timeline-items.js';

export function loadState() {
    const serializedState = localStorage.getItem(APP_NAME);

    const state = serializedState ? JSON.parse(serializedState) : {};

    timelineItems.value = isToday(new Date(state.date)) ? state.timelineItems : timelineItems.value;
    activities.value = state.activities || activities.value;
}


export function saveState() {
    localStorage.setItem(
        APP_NAME,
        JSON.stringify({
            timelineItems: timelineItems.value,
            activities: activities.value,
            date: today(),
        })
    );
}