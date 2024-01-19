import { ref } from "vue";
import { normalizePageHash } from "./functions.js";
import { PAGE_TIMELINE } from "./constants.js";

export const timelineRef = ref();

export const currentPage = ref(normalizePageHash());

export function navigate(page) {
    if (currentPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE) {
        timelineRef.value.scrollToHour();
    } else if (page !== PAGE_TIMELINE) {
        document.body.scrollIntoView();
    }

    currentPage.value = page;
}