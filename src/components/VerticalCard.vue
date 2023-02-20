<script setup lang="ts">
    defineProps<{
        from: string,
        via: string,
        to: string,
    }>()
</script>

<template>
    <div
        :class="'w-64 h-96 bg-gradient-to-tr ' + from + ' ' + via + ' ' + to"
    >
        <p class="font-semibold text-white rotate-90 mt-10 ml-48">Standard</p>
        <img src="@/assets/images/card_system/vertical_master_card.png" alt="vertical master card" class="h-11 mt-64 ml-5">
    </div>
</template>

<style scoped>

</style>