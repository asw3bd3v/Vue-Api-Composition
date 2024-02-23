import { createApp } from 'vue';
import { syncState } from './storage.js';
import './style.css';
import App from './App.vue';

syncState();

document.addEventListener('visibilitychange', () => {
    syncState(document.visibilityState === 'visible');
});

createApp(App).mount('#app')
