<template>
	<a :href="`#${PAGE_TIMELINE}`" @click="handleClick">
		<img src="../assets/img/logo.png" alt="Logo" class="h-9" />
	</a>
</template>

<script setup>
import { PAGE_TIMELINE } from "../constants";
import { currentPage, navigate } from "../router.js";
import { scrollToHour } from "../timeline-items.js";

function handleClick() {
	currentPage.value === PAGE_TIMELINE
		? scrollToHour()
		: navigate(PAGE_TIMELINE);
}
</script>
