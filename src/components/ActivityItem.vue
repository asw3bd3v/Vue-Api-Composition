<template>
	<li class="flex flex-col gap-2 p-4">
		<div class="flex items-center gap-2">
			<BaseButton
				:type="BUTTON_TYPE_DANGER"
				@click="deleteAndResetActivity(activity)"
			>
				<BaseIcon :name="ICON_TRASH" />
			</BaseButton>
			<span class="truncate text-xl">{{ activity.name }}</span>
		</div>
		<div class="flex gap-2">
			<BaseSelect
				class="font-mono grow"
				placeholder="hh:mm"
				:selected="activity.secondsToComplete || null"
				:options="PERIOD_SELECT_OPTIONS"
				@select="
					updateActivity(activity, { secondsToComplete: $event || 0 })
				"
			/>
			<ActivitySecondsToComplete
				v-if="activity.secondsToComplete"
				:activity="activity"
			/>
		</div>
	</li>
</template>

<script setup>
import BaseSelect from "./BaseSelect.vue";
import BaseButton from "./BaseButton.vue";
import BaseIcon from "./BaseIcon.vue";
import ActivitySecondsToComplete from "./ActivitySecondsToComplete.vue";
import { BUTTON_TYPE_DANGER, PERIOD_SELECT_OPTIONS } from "../constants";
import { ICON_TRASH } from "../icons";
import { isActivityValid } from "../validators";
import { updateActivity, deleteActivity } from "../activities.js";
import { resetTimelineItemActivities } from "../timeline-items";

defineProps({
	activity: {
		type: Object,
		required: true,
		validator: isActivityValid,
	},
});

function deleteAndResetActivity(activity) {
	resetTimelineItemActivities(activity);
	deleteActivity(activity);
}
</script>
