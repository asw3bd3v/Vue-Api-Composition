<template>
  <li class="flex-1">
    <a
      v-bind="$attrs"
      class="flex flex-col items-center p-2 text-sm capitalize"
    >
      <slot></slot>
    </a>
  </li>
</template>
<script>
export default {
  // отключаем наследование атрибутов корневым элементом,
  // т.к. применяем атрибуты на элементе <a>
  inheritAttrs: false,
};
</script>
