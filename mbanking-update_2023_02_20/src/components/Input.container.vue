<script lang="ts" setup>
    defineProps<{
        disabledAutoPadding?: boolean
    }>()
</script>

<template>
    <div
        class="flex bg-zinc-100 w-[22rem] rounded-sm"
        :class="disabledAutoPadding ? '' : 'px-5 py-3'"
    >
        <slot></slot>
    </div>
</template>