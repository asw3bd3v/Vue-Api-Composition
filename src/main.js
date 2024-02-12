import { createApp } from 'vue'
import * as storage from './storage.js';
import { activities } from './activities.js';
import { timelineItems } from './timeline-items.js';
import './style.css'
import App from './App.vue'

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        saveState();
    }
});

function saveState() {
    storage.save({
        timelineItems: timelineItems.value,
        activities: activities.value,
    });
}

createApp(App).mount('#app')
