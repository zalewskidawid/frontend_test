<template>
    <div class="content-block-wrapper">
        <p class="content-block-wrapper__title title">BLOK Z DŁUGĄ NAZWĄ KTÓRA SAMA SIĘ PRZYTNIE LOREM IPSUM LOREM IPSUM</p>
        <div class="content-block-container">
            <p v-for="(text, index) in displayedContent" :key="index" class="content-block-container__text">{{ text }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { EventBus } from '@/utils/EventBus.js';
import contentData from '@/utils/content.json';

const displayedContent = ref([]);

function getContentFromLocalStorage() {
    return JSON.parse(localStorage.getItem('content')) || [];
}

function replaceContent(selectedOption) {
    const contentData = getContentFromLocalStorage();
    if (contentData.length > 0 && selectedOption) {
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
                displayedContent.value = [newContent];
            }
        }
    }
}

function appendContent(selectedOption) {
    const contentData = getContentFromLocalStorage();
    if (contentData.length > 0 && selectedOption) {
        if (displayedContent.value.length >= contentData.length) {
            alert('Wszystkie treści zostały już dodane.');
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
            if (selectedContent && selectedContent.content && !displayedContent.value.includes(selectedContent.content)) {
                newContent = selectedContent.content;
                displayedContent.value.push(newContent);
            }
        }
        if (newContent) {
            displayedContent.value.sort((a, b) => a.localeCompare(b));
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
    localStorage.setItem('content', JSON.stringify(contentData));
});

EventBus.on('optionSelected', (selectedOption) => {
    localStorage.setItem('selectedOption', selectedOption);
});

onMounted(() => {
    const initialContent = getContentFromLocalStorage();
    if (!initialContent.length) {
        localStorage.setItem('content', JSON.stringify(contentData));
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
</style>