<script setup lang="ts">
</script>

<template>
    <div class="History flex justify-between px-10 max-sm:px-5 py-2">
        <div class="flex justify-between">
            <slot name="history-detail"></slot>
        </div>
        <slot name="history-nominal"></slot>
    </div>
</template>

<style scoped>

</style>