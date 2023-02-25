<script setup lang="ts">
    import InputContainer from './Input.container.vue';

    defineProps<{
        type: string
        value: string
        placeholder?: string
        disabledAutoPadding?: boolean
    }>();

    defineEmits<{
        (e: "input", value: string): void
    }>();
</script>

<template>
    <InputContainer :disabled-auto-padding="disabledAutoPadding">
        <input
            :type ="type"
            class="bg-transparent w-full focus:outline-none"
            :value="value"
            :placeholder="placeholder ?? '...'"
            @input="$emit('input', ($event.target as HTMLInputElement).value)"
        />
    </InputContainer>
</template>

<style scoped>
</style>