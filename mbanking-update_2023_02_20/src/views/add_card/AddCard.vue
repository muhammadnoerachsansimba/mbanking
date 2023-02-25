<script setup lang="ts">
    import TextHeader from '@/components/TextHeader.vue'
    import VerticalCard from '@/components/VerticalCard.vue'
    import { AddCardViewModel } from './AddCard.viewmodel'
    import { ref } from 'vue'

    const selectColor = ref(3)
    const selectPage = ref("select-card")
    const vm = ref(new AddCardViewModel())

    async function setColor(id: number): Promise<void> {
        selectColor.value = id
        vm.value.convertColor(id)
    }

    async function setPage(page: string) {
        selectPage.value = page
    }
</script>

<template>
    <div>
        <header>
            <TextHeader>
                <template #text-left>
                    <router-link to="/">
                        <font-awesome-icon icon="fa-solid fa-arrow-left-long" class="font-bold text-xl max-sm:text-lg" />
                    </router-link>
                </template>
            </TextHeader>
        </header>

        <main :class="selectPage == 'select-card' ? '' : 'hidden'">
            <div class="flex-col justify-center px-10 max-sm:px-5 space-y-10 max-sm:mb-32">
                <div class="flex justify-center">
                    <VerticalCard
                        :from="vm.Card.color.from"
                        :via="vm.Card.color.via"
                        :to="vm.Card.color.to"
                        />
                </div>

                <div class="px-10 max-sm:px-5 text-center space-y-3">
                    <p class="font-semibold">{{ vm.Card.service_type }}</p>
                    <p class="text-zinc-500 text-sm">Some card's description for whom and for which purpose (max 2 rows)</p>
                </div>

                <div class="flex justify-center space-x-8">
                    <div class="w-10 h-10 bg-gradient-to-r from-zinc-500 to-zinc-400 rounded-full cursor-pointer" :class="selectColor == 1 ? 'outline outline-4 outline-sky-500' : '' " @click="setColor(1)"></div>
                    <div class="w-10 h-10 bg-gradient-to-r from-emerald-700 to-emerald-600 rounded-full cursor-pointer" :class="selectColor == 2 ? 'outline outline-4 outline-sky-500' : '' " @click="setColor(2)"></div>
                    <div class="w-10 h-10 bg-gradient-to-r from-[#B98A84] to-[#CBA7A3] rounded-full cursor-pointer" :class="selectColor == 3 ? 'outline outline-4 outline-sky-500' : '' " @click="setColor(3)"></div>
                </div>
            </div>
            <div class="fixed px-10 pb-10 max-sm:px-5 bottom-0 left-0 right-0 bg-white">
                <button
                    type="button"
                    class="bg-emerald-500 hover:bg-emerald-600 text-white w-full py-2 rounded-xl"
                    @click="setPage('select-payment')"
                >
                    Continues
                </button>
            </div>
        </main>

        <main :class="selectPage == 'select-payment' ? '' : 'hidden'">
            <div class="mx-5">
                <p>Payment card</p>
            </div>
            <div class="fixed px-10 pb-10 max-sm:px-5 bottom-0 left-0 right-0 bg-white space-y-2">
                <button
                    type="button"
                    class="bg-emerald-500 hover:bg-emerald-600 text-white w-full py-2 rounded-xl"
                >
                    Create card
                </button>
                <button
                    type="button"
                    class="bg-zinc-500 hover:bg-zinc-600 text-white w-full py-2 rounded-xl"
                    @click="setPage('select-card')"
                >
                    Back
                </button>
            </div>
        </main>
    </div>
</template>

<style scoped>

</style>