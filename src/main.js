import { createApp } from "vue";
import { syncState } from "./storage.js";
import { startCurrentDateTimer } from "./time.js";
import "./style.css";
import App from "./App.vue";

syncState();

startCurrentDateTimer();

document.addEventListener("visibilitychange", () => {
	syncState(document.visibilityState === "visible");
});

createApp(App).mount("#app");
