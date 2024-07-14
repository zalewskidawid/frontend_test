<template>
    <div class="content-block-wrapper">
        <p class="content-block-wrapper__title title">
            BLOK Z DŁUGĄ NAZWĄ KTÓRA SAMA SIĘ PRZYTNIE LOREM IPSUM LOREM IPSUM
        </p>
        <div class="content-block-container">
            <p v-for="(text, index) in displayedContent" :key="index" class="content-block-container__text">
            {{ text }}
            </p>
        </div>
        <Modal />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { EventBus } from '@/utils/EventBus.js';
import contentData from '@/utils/content.json';
import Modal from '../ui/Modal.vue';

const displayedContent = ref([]);
const localStorageContentKey = 'storedContent';
const localStorageDisplayedKey = 'displayedContent';

function getContentFromLocalStorage() {
    return JSON.parse(localStorage.getItem(localStorageContentKey)) || [];
}

function getDisplayedContentFromLocalStorage() {
    return JSON.parse(localStorage.getItem(localStorageDisplayedKey)) || [];
}

function showModal(title, message) {
    EventBus.emit('showModal', { title, message });
}

function saveDisplayedContentToLocalStorage() {
    localStorage.setItem(localStorageDisplayedKey, JSON.stringify(displayedContent.value));
}

function replaceContent(selectedOption) {
    const contentData = getContentFromLocalStorage();
    if (!selectedOption || selectedOption === 'null') {
        showModal('Błąd', 'Nie wybrano żadnej opcji.');
        return;
    }
    if (contentData.length > 0) {
        let newContent = '';
        if (selectedOption === 'random') {
            const randomContent = contentData[Math.floor(Math.random() * contentData.length)];
        if (randomContent && randomContent.content) {
            newContent = randomContent.content;
            displayedContent.value = [newContent];
        }
        } else {
            const selectedContent = contentData.find(c => c.id == selectedOption);
            if (selectedContent && selectedContent.content) {
                newContent = selectedContent.content;
                if (displayedContent.value.includes(newContent)) {
                    showModal('Informacja', 'Wybrany element już istnieje w treści.');
                    return;
                }
                displayedContent.value = [newContent];
            }
        }
    saveDisplayedContentToLocalStorage();
    }
}

function appendContent(selectedOption) {
    const contentData = getContentFromLocalStorage();
    if (!selectedOption || selectedOption === 'null') {
        showModal('Błąd', 'Nie wybrano żadnej opcji.');
        return;
    }
    if (contentData.length > 0) {
        if (displayedContent.value.length >= contentData.length) {
            showModal('Informacja', 'Wszystkie treści zostały już dodane.');
            return;
        }
        let newContent = '';
        if (selectedOption === 'random') {
            let randomContent;
            do {
                randomContent = contentData[Math.floor(Math.random() * contentData.length)];
            } while (randomContent && displayedContent.value.includes(randomContent.content));
            if (randomContent && randomContent.content) {
                newContent = randomContent.content;
                displayedContent.value.push(newContent);
            }
        } else {
            const selectedContent = contentData.find(c => c.id == selectedOption);
            if (selectedContent && selectedContent.content) {
                if (displayedContent.value.includes(selectedContent.content)) {
                    showModal('Informacja', 'Wybrany element już istnieje w treści.');
                    return;
                }
                newContent = selectedContent.content;
                displayedContent.value.push(newContent);
            }
        }
        if (newContent) {
            displayedContent.value.sort((a, b) => a.localeCompare(b));
            saveDisplayedContentToLocalStorage();
        }
    }
}

EventBus.on('replaceContent', () => {
    const selectedOption = localStorage.getItem('selectedOption');
    replaceContent(selectedOption);
});

EventBus.on('appendContent', () => {
    const selectedOption = localStorage.getItem('selectedOption');
    appendContent(selectedOption);
});

EventBus.on('reset-settings', () => {
    displayedContent.value = [];
    localStorage.clear();
    localStorage.setItem(localStorageContentKey, JSON.stringify(contentData));
    localStorage.removeItem(localStorageDisplayedKey);
});

EventBus.on('optionSelected', (selectedOption) => {
    localStorage.setItem('selectedOption', selectedOption);
});

onMounted(() => {
    const initialContent = getContentFromLocalStorage();
    if (!initialContent.length) {
        localStorage.setItem(localStorageContentKey, JSON.stringify(contentData));
    }
    const storedDisplayedContent = getDisplayedContentFromLocalStorage();
    if (storedDisplayedContent.length) {
        displayedContent.value = storedDisplayedContent;
    }
});
</script>

<style scoped lang="scss">
@import "../../assets/styles/main.scss";

.content-block-wrapper {
        flex: 1 1 33.3333%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        max-width: 50%;
        &__title {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 25.3em;
        }
        .content-block-container {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        &__text {
            color: $lighten-gray;
            font-size: 1em;
            text-align: center;
        }
    }
}

@include breakpoint(xl) {
    .content-block-wrapper {
        flex: 1 1 50%;
        margin-top: 58px;
    }
}

@include breakpoint(md) {
    .content-block-wrapper {
        flex: 1 1 100%;
        max-width: 100%;
    }
}

@include breakpoint(xs) {
    .content-block-wrapper {
        align-items: flex-start;
        &__title {
            font-size: 1em;
            width: 100%;
        }
    }
}
</style>