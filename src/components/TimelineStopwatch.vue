<template>
	<div class="flex w-full gap-2">
		<BaseButton
			:type="BUTTON_TYPE_DANGER"
			:disabled="!seconds"
			@click="reset"
		>
			<BaseIcon :name="ICON_ARROW_PATH" />
		</BaseButton>
		<div
			class="flex flex-grow items-center rounded bg-gray-100 font-mono text-3xl"
		>
			{{ formatSeconds(seconds) }}
		</div>
		<BaseButton v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
			<BaseIcon :name="ICON_PAUSE" />
		</BaseButton>
		<BaseButton
			v-else
			:type="BUTTON_TYPE_SUCCESS"
			:disabled="timelineItem.hour !== currentHour()"
			@click="start"
		>
			<BaseIcon :name="ICON_PLAY" />
		</BaseButton>
	</div>
</template>

<script setup>
import { watch } from "vue";
import {
	BUTTON_TYPE_DANGER,
	BUTTON_TYPE_WARNING,
	BUTTON_TYPE_SUCCESS,
} from "../constants.js";
import { formatSeconds, currentHour } from "../functions";
import { isTimelineItemValid } from "../validators";
import { updateTimelineItem } from "../timeline-items";
import { useStopwatch } from "../composables/stopwatch";
import BaseButton from "./BaseButton.vue";
import BaseIcon from "./BaseIcon.vue";
import { ICON_PLAY, ICON_PAUSE, ICON_ARROW_PATH } from "../icons";

const props = defineProps({
	timelineItem: {
		type: Object,
		required: true,
		validator: isTimelineItemValid,
	},
});

const { seconds, isRunning, start, stop, reset } = useStopwatch(
	props.timelineItem.activitySeconds,
	updateTimelineItemActivitySeconds,
);

watch(
	() => props.timelineItem.activityId,
	updateTimelineItemActivitySeconds,
);

function updateTimelineItemActivitySeconds() {
	updateTimelineItem(props.timelineItem, {
		activitySeconds: seconds.value,
	});
}
</script>
