import { createApp } from 'vue';
import { loadState, saveState } from './storage.js';
import { startTimelineItemTimer, findActiveTimelineItem } from './timeline-items.js';
import './style.css';
import App from './App.vue';

loadState();

const activeTimelineItem = findActiveTimelineItem();

if (activeTimelineItem) {
    startTimelineItemTimer(activeTimelineItem);
}

document.addEventListener('visibilitychange', () => {
    document.visibilityState === 'visible'
        ? loadState()
        : saveState();
});

createApp(App).mount('#app')
