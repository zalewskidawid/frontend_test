<template>
    <div class="button-block-wrapper">
        <p class="button-block-wrapper__title title">BLOK DRUGI</p>
        <div class="button-block-container">
            <button class="button-block-container__btn" @click="replaceContent">ZASTĄP</button>
            <button class="button-block-container__btn" @click="appendContent">DOKLEJ</button>
        </div>
    </div>
</template>

<script setup>
import { EventBus } from '@/utils/EventBus.js';

function replaceContent() {
    EventBus.emit('replaceContent');
}

function appendContent() {
    EventBus.emit('appendContent');
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/main.scss";

.button-block-wrapper {
    text-align: center;
    flex: 0 0 33.3333%;
    .button-block-container {
        &__btn {
            cursor: pointer;
            color: $lighten-gray;
            font-weight: bold;
            border: 1px solid $main-text;
            background-color: transparent;
            padding: 0.8em 3.5em;
            font-size: 0.9em;
            @include transition(all, .5s);
            border-radius: 5px;
            &:hover {
                background-color: $primary-color;
                color: $main-text;
            }
            &:first-child {
                margin-right: 3em;
            }
        }
    }
}
</style>