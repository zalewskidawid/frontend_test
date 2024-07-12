<template>
    <footer :class="{ 'rotate-active': rotate360 }">
        <div class="footer-wrapper">
            <div class="footer-container-box" :class="{ 'rotate-active': rotate360 }" @mouseover="rotate360 = true" @mouseleave="rotate360 = false">
                <span class="footer-container-box__text">CSS<br/>IS<br/>AWESOME</span>
            </div>
            <div class="footer-container-company">
                <p class="footer-container-company__name">nabthat</p>
            </div>
            <div class="footer-container-option">
                <button class="footer-container-option__button" @click="toggleOptions">
                    POKAŻ<font-awesome-icon :icon="['fas', 'angle-up']" :class="{ 'rotate-icon': showPanel }"/>
                </button>
            </div>
            <transition name="slide">
                <div class="footer-container-options-panel" v-show="showPanel" @click.self="hideOptions">
                    <button @click="resetSettings">Zresetuj ustawienia</button>
                    <button @click="showPersonalData">Pokaż dane osobowe</button>
                </div>
            </transition>
        </div>
    </footer>
</template>

<script setup>
import { ref } from 'vue';
import { EventBus } from '@/utils/EventBus.js';

const rotate360 = ref(false);
const showPanel = ref(false);

function toggleOptions() {
    showPanel.value = !showPanel.value;
}

function hideOptions() {
    showPanel.value = false;
}

function resetSettings() {
    EventBus.emit('reset-settings');
}

function showPersonalData() {
    EventBus.emit('show-personal-data');
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 120px;
    background: #15161a;
    color: #fff;
    text-align: center;
    padding: 16px 50px 16px 55px;
    .footer-wrapper {
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
            position: absolute;
	        top: -3.7rem;
	        right: 1rem;
	        display: flex;
	        flex-direction: column;
	        width: 192px;
	        border-radius: 2px;
	        overflow: hidden;
	        box-shadow: 0 0 20px black;
	        background-color: #fff;

            &.hide {
                bottom: -100%; 
                z-index: -1; 
            }

            &.show {
                bottom: 115px; /* Moves the panel above the footer */
                z-index: 10; /* Ensure it is on top */
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
            &__button {
                cursor: pointer;
                color: $lighten-gray;
                font-weight: bold;
                border: 1px solid $light-gray;
                background-color: transparent;
                padding: 9px 70px;
                font-size: 0.9em;
                @include transition(all, .5s);

                &:hover {
                    color: white;
                    border-color: white;
                }

                svg {
                    padding-left: 12px;
                    transition: transform 0.3s ease; /* Add transition for rotation */
                }

                .rotate-icon {
                    transform: rotate(180deg); /* Rotate icon in place */
                }
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
    transition: transform .5s ease-in-out;
}

.slide-enter-from, .slide-leave-to {
    transform: translateY(100%) !important;
}

.slide-enter-to, .slide-leave-from {
    transform: translateY(0) !important;
}
</style>