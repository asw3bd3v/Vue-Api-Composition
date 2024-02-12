import { createApp } from 'vue';
import * as storage from './storage.js';
import { activities } from './activities.js';
import { timelineItems } from './timeline-items.js';
import { isToday } from './time.js';
import './style.css';
import App from './App.vue';

loadState();

document.addEventListener('visibilitychange', () => {
    document.visibilityState === 'visible'
        ? loadState()
        : saveState();
});

function saveState() {
    storage.save({
        timelineItems: timelineItems.value,
        activities: activities.value,
    });
}

function loadState() {
    const state = storage.load();

    timelineItems.value = isToday(new Date(state.date)) ? state.timelineItems : timelineItems.value;
    activities.value = state.activities || activities.value;
}

createApp(App).mount('#app')
