<template>
	<li class="flex-1">
		<a :href="`#${page}`" :class="classes" @click="navigate(page)">
			<slot></slot>
		</a>
	</li>
</template>

<script setup>
import { computed } from "vue";
import { navigate, currentPage } from "../router.js";
import { isPageValid } from "../validators.js";

const props = defineProps({
	page: {
		type: String,
		required: true,
		validator: isPageValid,
	},
});

const classes = computed(() => {
	return [
		"flex flex-col items-center p-2 text-sm capitalize",
		{ "bg-gray-200 pointer-events-none": props.page === currentPage.value },
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
