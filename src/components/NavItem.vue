<template>
	<li class="flex-1">
		<a
			:href="`#${navItem.page}`"
			:class="classes"
			@click="handleClick"
		>
			<BaseIcon :name="navItem.icon" class="h-6 w-6" /> {{ navItem.page }}
		</a>
	</li>
</template>

<script setup>
import { computed } from "vue";
import { navigate, currentPage } from "../router.js";
import { isNavItemValid } from "../validators.js";
import BaseIcon from "./BaseIcon.vue";
import { PAGE_TIMELINE } from "../constants";
import { scrollToCurrentHour } from "../timeline-items";

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
			"bg-gray-200":
				props.navItem.page === currentPage.value,
		},
	];
});

function handleClick() {
	currentPage.value === PAGE_TIMELINE && props.navItem.page === PAGE_TIMELINE
		? scrollToCurrentHour(true)
		: navigate(props.navItem.page);
}
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
