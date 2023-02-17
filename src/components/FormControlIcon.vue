<script setup lang="ts"></script>

<template>
    <div class="flex bg-zinc-100 w-96 px-5 py-3 rounded-sm space-x-5">
        <div class="text-zinc-500">
            <slot name="icon"></slot>
        </div>
        <div class="w-full">
            <slot name="input"></slot>
        </div>
    </div>
</template>


<style scoped>
</style>