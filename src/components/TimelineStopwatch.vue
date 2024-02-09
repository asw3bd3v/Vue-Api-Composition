<template>
	<div class="flex w-full gap-2">
		<BaseButton
			:type="BUTTON_TYPE_DANGER"
			:disabled="!timelineItem.activitySeconds"
			@click="reset"
		>
			<BaseIcon :name="ICON_ARROW_PATH" />
		</BaseButton>
		<div
			class="flex flex-grow items-center rounded bg-gray-100 font-mono text-3xl"
		>
			{{ formatSeconds(timelineItem.activitySeconds) }}
		</div>
		<BaseButton v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
			<BaseIcon :name="ICON_PAUSE" />
		</BaseButton>
		<BaseButton
			v-else
			:type="BUTTON_TYPE_SUCCESS"
			:disabled="timelineItem.hour !== now.getHours()"
			@click="start"
		>
			<BaseIcon :name="ICON_PLAY" />
		</BaseButton>
	</div>
</template>

<script setup>
import { watchEffect } from "vue";
import {
	BUTTON_TYPE_DANGER,
	BUTTON_TYPE_WARNING,
	BUTTON_TYPE_SUCCESS,
} from "../constants.js";
import { formatSeconds } from "../functions";
import { isTimelineItemValid } from "../validators";
import { updateTimelineItem } from "../timeline-items";
import { useStopwatch } from "../composables/stopwatch";
import BaseButton from "./BaseButton.vue";
import BaseIcon from "./BaseIcon.vue";
import { ICON_PLAY, ICON_PAUSE, ICON_ARROW_PATH } from "../icons";
import { now } from "../time";

const props = defineProps({
	timelineItem: {
		type: Object,
		required: true,
		validator: isTimelineItemValid,
	},
});

const { seconds, isRunning, start, stop, reset } = useStopwatch(
	props.timelineItem.activitySeconds,
);

watchEffect(() => {
	if (props.timelineItem.hour !== now.value.getHours() && isRunning.value) {
		stop();
	}
});

// watchEffect работает по след. принципу:
// если какая-то реактивная переменная, которая используется в замыкании (например seconds)
// меняет свое значение, то все это замыкание будет запущено снова.
watchEffect(() =>
	updateTimelineItem(props.timelineItem, {
		activitySeconds: seconds.value,
	}),
);
</script>
