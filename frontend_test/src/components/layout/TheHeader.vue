<template>
  <header class="header-wrapper">
    <div class="header-logo-container">
    <a href="/" class="header-logo-container__logo">
      <font-awesome-icon :icon="['fab', 'html5']" />
    </a>
    </div>
    <div class="header-text-container">
      <p class="header-text-container__text">Zadanie <b>rekrutacyjne</b></p>
      <div class="header-text-container__fullname" v-if="personalData">{{ personalData }}</div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { EventBus } from '@/utils/EventBus.js';

const personalData = ref('');

onMounted(() => {
  EventBus.on('show-personal-data', () => {
    personalData.value = 'Dawid Zalewski';
  });

  EventBus.on('reset-settings', () => {
    personalData.value = '';
  });
});
</script>

<style scoped lang="scss">
@import "../../assets/styles/main.scss";

.header-wrapper {
  position: fixed;
  top: 0;
  width: 100%;
  height: 110px;
  background: black;
  color: $main-text;
  display: flex;
  align-items: center;
  padding: 16px 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  .header-logo-container {
    position: relative;
      &__logo {
        padding:12px;
        border-radius: 50%;
        display: block;
        background-color: #303030;
        @include transition(background-color, .5s);
        svg {
          display: block;
          color: $main-text;
          height: 3.5em;
          width: 3.5em;
        }
        &:hover {
            background-color: $primary-color;
          }
      }
  }
  .header-text-container {
    &__text {
      font-size: 1.8em;
    }
    &__fullname {
      text-align: end;
      font-size: 1.8em;
    }
  }
}

//Mobile responsive

@include breakpoint(md) {
  .header-wrapper {
    padding: 20px 16px;
      .header-text-container {
        &__text, &__fullname {
          font-size: 1.4em;
      }
    }
  }
}

</style>