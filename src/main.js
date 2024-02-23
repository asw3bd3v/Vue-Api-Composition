import { createApp } from 'vue';
import { loadState, saveState } from './storage.js';
import { activeTimelineItem } from './timeline-items.js';
import { startTimelineItemTimer } from './timeline-item-timer.js';
import './style.css';
import App from './App.vue';

loadState();

if (activeTimelineItem.value) {
    startTimelineItemTimer(activeTimelineItem.value);
}

document.addEventListener('visibilitychange', () => {
    document.visibilityState === 'visible'
        ? loadState()
        : saveState();
});

createApp(App).mount('#app')
