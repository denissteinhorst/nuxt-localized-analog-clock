<template>
  <div class="main-view">
    <div class="main-view__wrapper">

      <!-- Error message -->
      <template v-if="error">
        <h1>404 - Seite nicht gefunden</h1>
        <TheButton target="/">Zurück zur Übersicht</TheButton>
      </template>

      <!-- Main content -->
      <template v-else>
        <h1 v-text="cityName" />
        <hr />
        <TheClock :city="slug" :format="currentFormat" />
        <div style="display: flex; gap: 1rem;">
          <span class="the-button the-button--outline" @click.prevent="changeFormat">
            Format: {{ currentFormat !== 24 ? "12 Stunden" : "24 Stunden" }}
          </span>
          <TheButton target="/">Zurück zur Übersicht</TheButton>
        </div>
      </template>

    </div>
  </div>
</template>

<script setup lang="ts">
import TheButton from "~/components/TheButton/TheButton.vue";

const slug = useRoute().params.slug as string
const error = !["duisburg", "sydney", "new-york"].includes(slug)
const cityName = ref()
const currentFormat = ref(24)

const changeFormat = () => {
  currentFormat.value = currentFormat.value === 24 ? 12 : 24
}

if (!error) {
  cityName.value = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}
</script>

<style lang="scss">
$block: "main-view";

.#{$block} {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 640px;
    height: 480px;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 0;
    font-weight: 400;
    font-family: "Helvetica Neue", sans-serif;
  }

  hr {
    width: 443px;
    margin: 2rem 0;
  }

  .the-button {
    margin-top: 2rem;
  }
}
</style>