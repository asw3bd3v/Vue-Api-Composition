import { createApp } from 'vue';
import { loadState, saveState } from './storage.js';
import './style.css';
import App from './App.vue';

loadState();

document.addEventListener('visibilitychange', () => {
    document.visibilityState === 'visible'
        ? loadState()
        : saveState();
});

createApp(App).mount('#app')
