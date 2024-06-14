<template>
  <div class="landing-page">
    <div class="landing-page__wrapper">
      <div class="landing-page__body">
        <h1>NUXT Localized Analog Clock</h1>
        <hr />
        <ul>
          <li v-for="(city, target) in targets">
            <TheButton :target="target">{{ city }}</TheButton>
          </li>
        </ul>
        <blockquote>
          <b>When reality outsmarts expectation</b><br />
          When the moment of truth arrives, it's not uncommon for our expectations to be subverted, leading to a vastly different outcome than we initially prepared for.<br /><br />
          And this is what this repo is about! 😅
        </blockquote>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheButton from "~/components/TheButton/TheButton.vue";

const targets = ref({
    "duisburg": "Duisburg",
    "sydney": "Sydney",
    "new-york": "New York",
});
</script>

<style lang="scss">
$block: "landing-page";

.#{$block} {
  height: 100svh;
  width: 100svw;

  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__body {
    width: 640px;
    height: 480px;
    background-color: white;
    border-radius: 4px;
    margin: 2rem;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
    width: 80%;
  }

  li {
    margin: 1rem 0;
  }

  blockquote {
    font-style: italic;
    font-size: 1.5rem;
    margin-top: 5rem;
    text-align: center;
    line-height: 28px;
    position: relative;

    &::before {
      position: absolute;
      content: "❝";
      font-size: 6rem;
      height: 4rem;
      width: 4rem;
      display: block;
      bottom: -10px;
      color: gray;
      top: -2rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>