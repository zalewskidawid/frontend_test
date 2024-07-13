<template>
    <div class="first-block-wrapper">
        <p class="first-block-wrapper__text title">BLOK PIERWSZY</p>
        <div class="options-container">
            <label><input type="radio" v-model="selectedOption" value="1" class="options-container__option"> Opcja pierwsza</label>
            <label><input type="radio" v-model="selectedOption" value="2" class="options-container__option"> Opcja druga</label>
            <label><input type="radio" v-model="selectedOption" value="random" class="options-container__option"> Opcja losowa</label>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { EventBus } from '@/utils/EventBus.js';

const selectedOption = ref(null);

watch(selectedOption, (newValue) => {
    EventBus.emit('optionSelected', newValue);
});

EventBus.on('reset-settings', () => {
    selectedOption.value = null;
});
</script>

<style scoped lang="scss">
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

.first-block-wrapper {
    width: 100%;
    text-align: center;
    &__text {
        color: $main-text;
        margin-bottom: 66px;
    }
    .options-container {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        &:nth-last-child(n) {
            margin-bottom: 0;
        }
        label {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            color: $main-text;
            font-weight: 200;
        }
    }
}

</style>