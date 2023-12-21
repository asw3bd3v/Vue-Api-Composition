<template>
	<div>
		<ul class="divide-y">
			<ActivityItem
				v-for="activity in activities"
				:key="activity"
				:activity="activity"
				@delete="emit('deleteActivity', activity)"
			/>
		</ul>

		<form class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4">
			<input type="text" class="w-full rounded border px-4 text-xl" placeholder="Activity name" />
			<BaseButton>
				<PlusIcon class="h-8" />
			</BaseButton>
		</form>
	</div>
</template>

<script setup>
import ActivityItem from "../components/ActivityItem.vue";
import BaseButton from "../components/BaseButton.vue";
import { PlusIcon } from "@heroicons/vue/24/outline";
import { validateActivities, isActivityValid } from "../validators";

const emit = defineEmits({
	deleteActivity: isActivityValid,
});

defineProps({
	activities: {
		type: Array,
		required: true,
		validator: validateActivities,
	},
});
</script>
