<template>
	<form
		@submit.prevent="submit"
		class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4"
	>
		<input
			type="text"
			v-model="name"
			class="w-full rounded border px-4 text-xl"
			placeholder="Activity name"
		/>
		<BaseButton :disabled="name.trim() === ''">
			<BaseIcon :name="ICON_PLUS" />
		</BaseButton>
	</form>
</template>

<script setup>
import { nextTick, ref } from "vue";
import BaseButton from "./BaseButton.vue";
import BaseIcon from "./BaseIcon.vue";
import { id } from "../functions";
import { createActivity } from "../activities";
import { ICON_PLUS } from "../icons";

const name = ref("");

async function submit() {
	createActivity({
		id: id(),
		name: name.value,
		secondsToComplete: 0,
	});

	name.value = "";

	/* nextTick(() => {
		window.scrollTo(0, document.body.scrollHeight);
	}); */

	await nextTick();
	window.scrollTo(0, document.body.scrollHeight);
}
</script>
