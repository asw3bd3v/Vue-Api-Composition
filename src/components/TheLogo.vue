<template>
	<a :href="`#${PAGE_TIMELINE}`" @click="handleClick">
		<img src="../assets/img/logo.png" alt="Logo" class="h-9" />
	</a>
</template>

<script setup>
import { PAGE_TIMELINE } from "../constants";
import { currentPage, navigate } from "../router.js";
import { scrollToCurrentHour } from "../timeline-items.js";

function handleClick() {
	currentPage.value === PAGE_TIMELINE
		? scrollToCurrentHour()
		: navigate(PAGE_TIMELINE);
}
</script>
