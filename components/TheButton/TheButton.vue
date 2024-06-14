<template>
  <nuxt-link :to="props.target" class="the-button the-button--outline">
    <slot />
  </nuxt-link>
</template>

<script setup lang="ts">
const props = defineProps<{
  target: string;
}>();
</script>

<style lang="scss">
$block: "the-button";

.#{$block} {
  padding: 1rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  color: black;
  font-family: "Helvetica Neue", sans-serif;
  text-align: center;
  display: block;
  width: inherit;
  cursor: pointer;
  user-select: none;
  z-index: 5;

  &--outline {
    border: 2px solid black;
    background-color: white;
  }

  &:hover {
    background-color: black;
    color: white;
  }
}
</style>