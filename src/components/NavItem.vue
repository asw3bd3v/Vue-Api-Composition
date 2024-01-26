<template>
	<li class="flex-1">
		<a
			:href="`#${navItem.page}`"
			:class="classes"
			@click="navigate(navItem.page)"
		>
			<component :is="navItem.icon" class="h-6 w-6" /> {{ navItem.page }}
		</a>
	</li>
</template>

<script setup>
import { computed } from "vue";
import { navigate, currentPage } from "../router.js";
import { isNavItemValid } from "../validators.js";

const props = defineProps({
	navItem: {
		type: Object,
		required: true,
		validator: isNavItemValid,
	},
});

const classes = computed(() => {
	return [
		"flex flex-col items-center p-2 text-sm capitalize",
		{
			"bg-gray-200 pointer-events-none":
				props.navItem.page === currentPage.value,
		},
	];
});
</script>

<script>
/**
export default {
	// отключаем наследование атрибутов корневым элементом,
	// т.к. применяем атрибуты на элементе <a>
	inheritAttrs: false,
};
*/
</script>
