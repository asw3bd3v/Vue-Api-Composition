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

		<TheActivityForm @submit="emit('createActivity', $event)" />
	</div>
</template>

<script setup>
import ActivityItem from "../components/ActivityItem.vue";
import TheActivityForm from "../components/TheActivityForm.vue";
import { validateActivities, isActivityValid } from "../validators";

const emit = defineEmits({
	createActivity: isActivityValid,
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
