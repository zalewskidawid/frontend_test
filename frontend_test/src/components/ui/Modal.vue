<template>
    <transition name="modal">
        <div v-if="visible" class="modal-wrapper" @click.self="closeModal">
            <div class="modal-container">
                <header class="modal-header">
                    <h2 class="modal-header__title">{{ title }}</h2>
                    <button class="modal-header__btn" @click="closeModal"></button>
                </header>
                <section class="modal-content">
                    <p class="modal-content__text">{{ message }}</p>
                </section>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { EventBus } from '@/utils/EventBus.js';

const visible = ref(false);
const title = ref('');
const message = ref('');

function showModal({ title: modalTitle, message: modalMessage }) {
    title.value = modalTitle;
    message.value = modalMessage;
    visible.value = true;
}

function closeModal() {
    visible.value = false;
}

onMounted(() => {
    EventBus.on('showModal', showModal);
});

onUnmounted(() => {
    EventBus.off('showModal', showModal);
});
</script>

<style scoped lang="scss">
@import "../../assets/styles/main.scss";

.modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    .modal-container {
        background: $main-text;
        border-radius: 8px;
        width: 300px;
        max-width: 80%;
        z-index: 1000;
        .modal-header {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            background-color: $light-gray;
            color: $main-text;
            &__title {
                font-size: 1.5em;
            }
            &__btn {
                position: relative;
                width: 20px;
                height: 20px;
                background-color: transparent;
                border: 0;
                cursor: pointer;
                &:after, &:before {
                    content: '';
                    display: block;
                    position: absolute;
                    background-color: $main-text;
                    width: 20px;
                    height: 2px;
                    border: 0;
                }
                &:after {
                        transform: rotate(45deg);
                    }
                &:before {
                    transform: rotate(135deg);
                }
            }
        }
        .modal-content {
            padding: 16px;
            &__text {
                color: $light-gray;
            }
        }
    }
}

.modal-enter-active, .modal-leave-active {
    @include transition(opacity, 0.5s);
}

.modal-enter-from, .modal-leave-to {
    opacity: 0;
}
</style>