<template>
    <TheHeader></TheHeader>
    <div class="main-content-wrapper">
        <h1 class="main-content-wrapper__headline">Nagłówek H1</h1>
        <hr>
        <div class="main-content-container">
            <RadioBlock></RadioBlock>
            <ButtonBlock></ButtonBlock>
            <ContentBlock></ContentBlock>
        </div>
    </div>
    <TheFooter></TheFooter>
</template>



<script setup>
    import TheHeader from '../layout/TheHeader.vue';
    import TheFooter from '../layout/TheFooter.vue';
    import RadioBlock from '../homepage/RadioBlock.vue';
    import ButtonBlock from '../homepage/ButtonBlock.vue';
    import ContentBlock from '../homepage/ContentBlock.vue';
</script>



<style lang="scss">
@import "../../assets/styles/main.scss";

.main-content-wrapper {
    padding: 66px 50px;
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: calc(100vh - 230px);
    width:100%;
    background-color: #2a2d36;
    &__headline {
        color: $main-text;
        font-weight: normal;
        margin-bottom: 0.5em;
    }
    hr {
        height: 2px;
        width: 150px;
        margin-bottom: 90px;
    }
    .main-content-container {
        display: flex;
        align-items: flex-start;
        justify-content: space-around;
        flex-direction: row;
        flex-wrap: wrap;
        width:100%;
    }
}

// Mobile responsive

@include breakpoint(md) {
    .main-content-wrapper {
        padding: 28px 20px 36px 20px;
        hr {
            margin-bottom: 65px;
        }
        &__headline {
            font-size: 1.8em;
        }
    }
}
</style>