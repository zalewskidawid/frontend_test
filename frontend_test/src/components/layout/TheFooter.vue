<template>
    <footer :class="{ 'rotate-active': rotate360 }">
        <div class="footer-container-box" :class="{ 'rotate-active': rotate360 }" @mouseover="rotate360 = true" @mouseleave="rotate360 = false">
            <span class="footer-container-box__text">CSS<br/>IS<br/>AWESOME</span>
        </div>
        <div class="footer-container-company">
            <p class="footer-container-company__name">nabthat</p>
        </div>
        <div class="footer-container-option">
            <button class="footer-container-option__btn" @click="toggleOptions" :disabled="isAnimating">
                POKAŻ<font-awesome-icon :icon="['fas', 'angle-up']" :class="{ 'rotate-icon': showPanel }"/>
            </button>
        </div>
        <transition name="slide" @before-enter="startAnimation" @after-enter="endAnimation" @before-leave="startAnimation" @after-leave="endAnimation">
            <div class="footer-container-options-panel" v-show="showPanel" @click.self="hideOptions">
                <button class="footer-container-options-panel__btn" @click="resetSettings"><font-awesome-icon :icon="['fas', 'angle-right']" />ZRESETUJ USTAWIENIA</button>
                <button class="footer-container-options-panel__btn" @click="showPersonalData"><font-awesome-icon :icon="['fas', 'angle-right']" />POKAŻ DANE OSOBOWE</button>
            </div>
        </transition>
    </footer>
</template>

<script setup>
import { ref } from 'vue';
import { EventBus } from '@/utils/EventBus.js';

const rotate360 = ref(false);
const showPanel = ref(false);
const isAnimating = ref(false);

function toggleOptions() {
    if (!isAnimating.value) {
        showPanel.value = !showPanel.value;
    }
}

function hideOptions() {
    if (!isAnimating.value) {
        showPanel.value = false;
    }
}

function resetSettings() {
    if (!isAnimating.value) {
        EventBus.emit('reset-settings');
        hideOptions();
    }
}

function showPersonalData() {
    if (!isAnimating.value) {
        EventBus.emit('show-personal-data');
        hideOptions();
    }
}

function startAnimation() {
    isAnimating.value = true;
}

function endAnimation() {
    isAnimating.value = false;
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/main.scss";

footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 120px;
    background: #15161a;
    color: $main-text;
    text-align: center;
    padding: 16px 50px 16px 55px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .footer-container-box {
        position: relative;
        text-align: left;
        color: $light-gray;
        cursor: pointer;
        @include transition(color, .5s);

        &::after {
            content: '';
            position: absolute;
            display: block;
            border: 1px solid $light-gray;
            height: 5.6em;
            width: 5.8em;
            left: -5px;
            top: -3px;
            transform-origin: center;
        }

        &.rotate-active::after {
            animation: rotate360 1s normal ease-in-out;
            border-color: $primary-color;
        }

        &__text {
            font-size: 1.5em;
            line-height: 28px;
        }

        &:hover {
            color: $lighten-gray;
        }
    }

    .footer-container-options-panel {
        background: $main-text;
        color: black;
        position: absolute;
        bottom: 120px;
        width: 215px;
        right: 50px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
        border-top: 1px solid #ccc;
        z-index: 10;
        font-weight: 600;

        &__btn {
            cursor: pointer;
            background-color: transparent;
            color: black;
            border: 0;
            font-weight: bold;
            @include transition(color, .5s);

            svg {
                padding-right: 8px;
            }

            &:hover {
                color: $primary-color;
            }
        }
    }

    .footer-container-company {
        position: relative;

        &__name {
            font-size: 1.4em;
            color: $light-gray;
        }

        &::after, &::before {
            content: '';
            display: block;
            position: absolute;
            right: -55px;
            width: 50px;
            height: 1px;
            background-color: $light-gray;
            top: 50%;
            bottom: 50%;
        }

        &::before {
            right: 0;
            left: -55px;
        }
    }

    .footer-container-option {
        &__btn {
            cursor: pointer;
            color: $lighten-gray;
            font-weight: bold;
            border: 1px solid $light-gray;
            background-color: transparent;
            padding: 0.6em 4.9em;
            font-size: 0.9em;
            @include transition(all, .5s);

            &:hover {
                color: $main-text;
                border-color: $main-text;
            }

            svg {
                padding-left: 12px;
                transition: transform 0.3s ease;
            }

            .rotate-icon {
                transform: scaleY(-1);
            }
        }
    }
}

footer.rotate-active {
    overflow: hidden;
}

// Animations 

@keyframes rotate360 {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.slide-enter-active, .slide-leave-active {
    @include transition(all, .5s);
}

.slide-enter-from, .slide-leave-to {
    transform: translateY(100%);
    opacity: 0;
    pointer-events: none;
}

.slide-enter-to, .slide-leave-from {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
}

//Mobile Responsive

@include breakpoint(md) {
    footer {
        padding: 16px 20px 16px 25px;
        .footer-container-company {
            display: none;
        }
        .footer-container-options-panel {
            right: 20px;
        }
    }
}

@include breakpoint(sm) {
    footer {
        .footer-container-options-panel {
            right: 20px;
            width: 195px;
        }  
        .footer-container-option {
            &__btn {
                padding: 0.6em 4.2em;
            }
        }
    }
}

@include breakpoint(xs) {
    footer {
        .footer-container-options-panel {
            right: 0;
            width: 100%;
        }
        .footer-container-option {
            &__btn {
                padding: 0.6em 2.6em;
            }
        }
    }
}
</style>