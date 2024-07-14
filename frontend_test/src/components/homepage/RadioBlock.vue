<template>
    <div class="options-block-wrapper">
        <p class="options-block-wrapper__text title">BLOK PIERWSZY</p>
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
@import "../../assets/styles/main.scss";

.options-block-wrapper {
    text-align: center;
    flex: 1 0 33.3333%;
    .options-container {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        label {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            color: $main-text;
            font-weight: 200;
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}

//Media responsive

@include breakpoint(md) {
    .options-block-wrapper {
        &__text {
            text-align: start;
        }
        .options-container {
            label {
                margin-bottom: 22px;
            }
        }
    }
}

@include breakpoint(xs) {
    .options-block-wrapper {
        flex: 1 1 100%;
    }
}

</style>