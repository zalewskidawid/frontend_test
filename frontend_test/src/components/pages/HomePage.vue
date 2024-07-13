<template>
    <TheHeader></TheHeader>
    <div class="main-content-wrapper">
        <RadioBlock></RadioBlock>
    </div>
    <TheFooter></TheFooter>
</template>



<script setup>
    import TheHeader from '../layout/TheHeader.vue';
    import TheFooter from '../layout/TheFooter.vue';
    import RadioBlock from '../homepage/RadioBlock.vue';
</script>



<style lang="scss">
.main-content-wrapper {
    padding: 16px 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    height: calc(100vh - 230px);
}
</style>