<template>
  <div class="the-clock" v-if="localTime">
    <div class="the-clock__wrapper">
      <div class="the-clock__watchface">

        <!-- Clock hands -->
        <div class="the-clock__hand-wrapper">
          <div ref="handHours" class="the-clock__hand the-clock__hand--animate the-clock__hand--hour" :data-hours="hours"></div>
          <div ref="handMinutes" class="the-clock__hand the-clock__hand--animate the-clock__hand--minute" :data-minutes="minutes"></div>
          <div ref="handSeconds" class="the-clock__hand the-clock__hand--animate the-clock__hand--second" :data-minutes="seconds"></div>
        </div>

        <!-- Clock markers -->
        <div class="the-clock__marker">
          <template v-for="i in 12" :key="i">
            <div class="the-clock__hours">{{ i }}</div>
          </template>
          <template v-for="i in 60" :key="i">
            <div class="the-clock__minutes" :data-index="i">|</div>
          </template>
        </div>

        <!-- digital clock -->
        <div class=the-clock__digital-time>
          {{ full }}
        </div>

      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { City, Format } from '@/types/types';
import { useGetLocalTime } from "~/composables/useGetLocalTime";

const props = defineProps({
  city: {
    type: String as () => City,
    required: true,
  },
  format: {
    type: Number as () => Format,
    required: true,
    default: 24,
    validator: (value: number) => [12, 24].includes(value),
  },
})

const { makeTime, localTime } = useGetLocalTime();

const handHours = ref<HTMLElement>();
const handMinutes = ref<HTMLElement>();
const handSeconds = ref<HTMLElement>();
const localTimeRef = ref(localTime);
const clockSetInitial = ref(false);

const full = computed(() => localTimeRef.value.full);
const hours = computed(() => localTimeRef.value.hours);
const minutes = computed(() => localTimeRef.value.minutes);
const seconds = computed(() => localTimeRef.value.seconds
    .replace(' AM', '')
    .replace(' PM', ''));

const moveClockHands = () => {
  if (!handHours.value || !handMinutes.value || !handSeconds.value) return;

  handHours.value.style.transform = `rotate(${parseInt(hours.value) * 30}deg)`;
  handMinutes.value.style.transform = `rotate(${parseInt(minutes.value) * 6}deg)`;
  handSeconds.value.style.transform = `rotate(${parseInt(seconds.value) * 6}deg)`;

  if(clockSetInitial.value) {
    [handHours, handMinutes, handSeconds].forEach((hand) => {
      hand.value?.classList.remove('the-clock__hand--animate');
    });
  }

  clockSetInitial.value = true;
};

const applyDemoTime = () => {
  localTimeRef.value = {
    full: '10:09:28',
    hours: "10",
    minutes: "9",
    seconds: "28",
  };
  moveClockHands();
};

const updateClock = () => {
  setInterval(() => {
    makeTime(props.city, props.format)
    moveClockHands();
  }, 1000);
};

onMounted(updateClock) // applyDemoTime
</script>

<style lang="scss">
@import "@/assets/scss/_mixins.scss";

$block: "the-clock";

.#{$block} {
  &__wrapper,
  &__hand-wrapper,
  &__marker {
    @include flex-center;
    height: 100%;
  }

  &__marker {
    transform: rotate(30deg);
    position: relative;
    top: -100%;
  }

  &__watchface {
    @include size(256px);
    @include border-radius(50%);
    background-color: white;
    border: 4px solid black;
    position: relative;
    box-shadow: 5px 5px 10px rgba(black, 0.25);

    &::before {
      @include absolute-center;
      content: 'STEINHORST';
      width: fit-content;
      height: 2rem;
      font-family: "Helvetica Neue", sans-serif;
      user-select: none;
      top: 5rem;
    }

    &::after {
      @include absolute-center;
      content: '';
      @include size(1rem);
      background-color: black;
      border-radius: 500px;
      z-index: 3;
    }
  }

  &__hand {
    position: absolute;
    width: 4px;
    bottom: 50%;
    transform-origin: 50% 100%;
    transform: rotate(0deg);
    background-color: black;
    border-radius: 500px;
    background-blend-mode: multiply;
    opacity: .7;
    z-index: 4;

    &--hour {
      height: 4.5rem;
    }

    &--minute {
      height: 6rem;
    }

    &--second {
      width: 1px;
      height: 6.75rem;
      background-color: red;
    }

    &--animate {
      transition: transform 0.5s ease-in-out;
    }
  }

  &__hours,
  &__minutes {
    position: absolute;
    bottom: 50%;
    transform-origin: 50% 100%;
    z-index: 1;
    user-select: none;

    @for $i from 1 through 12 {
      &:nth-child(#{$i}) {
        transform: rotate(#{($i - 1) * 30}deg) translateY(-6.90rem);
      }
    }
  }

  &__hours {
    font-family: monospace;
    font-size: .65rem;
    font-weight: bolder;
    color: black;
    background-color: white;
    z-index: 3;
  }

  &__minutes {
    font-family: monospace;
    font-size: .5rem;
    color: black;

    @for $i from 1 through 72 {
      &:nth-child(#{$i}) {
        transform: rotate(#{($i - 1) * 6}deg) translateY(-7rem);
      }
    }
  }

  &__digital-time {
    font-family: monospace;
    font-size: .75rem;
    text-align: center;
    margin-top: 2rem;
    height: 15px;
    width: fit-content;
    background-color: lightgrey;
    color: black;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid silver;
    z-index: 1;
    position: absolute;
    bottom: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    user-select: none;
    cursor: default;
  }
}
</style>