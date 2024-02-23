<template>
	<div class="flex w-full gap-2">
		<BaseButton
			:type="BUTTON_TYPE_DANGER"
			:disabled="!timelineItem.activitySeconds"
			@click="resetTimelineItemTimer(timelineItem)"
		>
			<BaseIcon :name="ICON_ARROW_PATH" />
		</BaseButton>
		<div
			class="flex flex-grow items-center rounded bg-gray-100 font-mono text-3xl"
		>
			{{ formatSeconds(timelineItem.activitySeconds) }}
		</div>
		<BaseButton
			v-if="timelineItemTimer && timelineItem.hour === now.getHours()"
			:type="BUTTON_TYPE_WARNING"
			@click="stopTimelineItemTimer(timelineItem)"
		>
			<BaseIcon :name="ICON_PAUSE" />
		</BaseButton>
		<BaseButton
			v-else
			:type="BUTTON_TYPE_SUCCESS"
			:disabled="timelineItem.hour !== now.getHours()"
			@click="startTimelineItemTimer(timelineItem)"
		>
			<BaseIcon :name="ICON_PLAY" />
		</BaseButton>
	</div>
</template>

<script setup>
import {
	BUTTON_TYPE_DANGER,
	BUTTON_TYPE_WARNING,
	BUTTON_TYPE_SUCCESS,
} from "../constants.js";
import { formatSeconds } from "../functions";
import { isTimelineItemValid } from "../validators";
import {
	timelineItemTimer,
	startTimelineItemTimer,
	stopTimelineItemTimer,
	resetTimelineItemTimer,
} from "../timeline-items";
import BaseButton from "./BaseButton.vue";
import BaseIcon from "./BaseIcon.vue";
import { ICON_PLAY, ICON_PAUSE, ICON_ARROW_PATH } from "../icons";
import { now } from "../time";

defineProps({
	timelineItem: {
		type: Object,
		required: true,
		validator: isTimelineItemValid,
	},
});
</script>
