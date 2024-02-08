import { computed, ref, watchEffect, } from "vue";
import {
    HUNDRED_PERCENT,
    MILLISECONDS_IN_SECOND,
    MINUTES_IN_HOUR,
    SECONDS_IN_DAY,
    SECONDS_IN_MINUTE,
} from "./constants";

// количество секунд прошедших с полночи
function calculateSecondsSinceMidnight() {
    const now = new Date();

    return (
        SECONDS_IN_MINUTE * MINUTES_IN_HOUR * now.getHours() +
        SECONDS_IN_MINUTE * now.getMinutes() +
        now.getSeconds()
    );
}

const secondsSinceMidnight = ref(calculateSecondsSinceMidnight());

export const secondsSinceMidnightInPercentage = computed(
    () => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY,
);

watchEffect(() => {
    if (secondsSinceMidnight.value > SECONDS_IN_DAY) {
        secondsSinceMidnight.value = 0;
    }
});

let timer = null;

export function startTimer() {
    secondsSinceMidnight.value = calculateSecondsSinceMidnight();

    timer = setInterval(
        () => secondsSinceMidnight.value++,
        MILLISECONDS_IN_SECOND,
    );
}

export function stopTimer() {
    clearInterval(timer);
}