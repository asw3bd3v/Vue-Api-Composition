<template>
	<div class="flex flex-col grow">
		<ul v-if="activities.length" class="divide-y grow">
			<ActivityItem
				v-for="activity in activities"
				:key="activity.id"
				:activity="activity"
				@delete="emit('deleteActivity', activity)"
			/>
		</ul>
		<TheActivitiesEmptyState v-else />
		<TheActivityForm />
	</div>
</template>

<script setup>
import ActivityItem from "../components/ActivityItem.vue";
import TheActivityForm from "../components/TheActivityForm.vue";
import TheActivitiesEmptyState from "../components/TheActivitiesEmptyState.vue";
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
