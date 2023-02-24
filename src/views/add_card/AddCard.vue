<script setup lang="ts">
    import TextHeader from '@/components/TextHeader.vue'
    import VerticalCard from '@/components/VerticalCard.vue'
    import { AddCardViewModel } from './AddCard.viewmodel'
    import { ref } from 'vue'
    import TextInput from '@/components/Text.input.vue'
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const selectColor = ref(3)
    const selectPage = ref("select-card")
    const selectType = ref("")
    const selectPayment = ref("")
    const vm = ref(new AddCardViewModel())
    const user = JSON.parse(localStorage.getItem("user") || '{}')
    type cardType = "Credit" | "Debit"

    if(user.isLogin !== true) {
        router.push({
            path: "/"
        })
    }

    async function setColor(id: number): Promise<void> {
        selectColor.value = id
        vm.value.convertColor(id)
    }

    async function setPage(page: string): Promise<void> {
        selectPage.value = page
    }

    async function setCardType(type: cardType): Promise<void> {
        selectType.value = type
        vm.value.Card.card_type = type
    }

    async function setPaymentSystem(payment: string): Promise<void> {
        selectPayment.value = payment
        vm.value.Card.payment_system = payment
    }

    async function addCard(): Promise<void> {
        const res = await vm.value.createCard()
        if(res == "Success") {
            alert(res)
            router.push({
                path: "/"
            })
        } else {
            alert(res)
        }
    }
</script>

<template>
    <div>
        <header :class="selectPage == 'select-card' ? '' : 'hidden'">
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
                    Continue
                </button>
            </div>
        </main>

        <main :class="selectPage == 'select-payment' ? '' : 'hidden'">
            <div class="mx-10 mt-5 max-sm:mx-5 space-y-8">
                <div class="space-y-3">
                    <p class="text-zinc-500">Card name</p>
                    <TextInput
                        type="text"
                        :value="vm.Card.card_name"
                        @input="(v) => (vm.Card.card_name = v)"
                        placeholder="Card name"
                        class="rounded-lg"
                        />
                </div>

                <div class="space-y-3">
                    <p class="text-zinc-500">Card type</p>
                    <div class="flex space-x-5">
                        <div class="px-10 py-3 border border-zinc-300 rounded-xl" @click="setCardType('Credit')" :class="selectType == 'Credit' ? 'boder border-emerald-400 bg-emerald-50' : ''">
                            <p class="text-zinc-500 text-sm">Credit Card</p>
                        </div>

                        <div class="px-10 py-3 border border-zinc-300 rounded-xl" @click="setCardType('Debit')" :class="selectType == 'Debit' ? 'boder border-emerald-400 bg-emerald-50' : ''">
                            <p class="text-zinc-500 text-sm">Debit Card</p>
                        </div>
                    </div>
                </div>

                <div class="space-y-3">
                    <p class="text-zinc-500">Payment system</p>
                    <div class="flex justify-between">
                        <div class="w-[7.05rem] h-28 border border-zinc-300 rounded-xl text-center space-y-3" @click="setPaymentSystem('Visa')" :class="selectPayment == 'Visa' ? 'boder border-emerald-400 bg-emerald-50' : ''">
                            <img src="@/assets/images/card_system/visa.png" alt="" class="w-20 mx-auto mt-7">
                            <p class="text-zinc-500 text-xs">Visa</p>
                        </div>

                        <div class="w-[7.05rem] h-28 border border-zinc-300 rounded-xl text-center space-y-2" @click="setPaymentSystem('Mastercard')" :class="selectPayment == 'Mastercard' ? 'boder border-emerald-400 bg-emerald-50' : ''">
                            <img src="@/assets/images/card_system/master_card.png" alt="" class="w-14 mx-auto mt-6">
                            <p class="text-zinc-500 text-xs">Mastercard</p>
                        </div>

                        <div class="w-[7.05rem] h-28 border border-zinc-300 rounded-xl text-center" @click="setPaymentSystem('American Express')" :class="selectPayment == 'American Express' ? 'boder border-emerald-400 bg-emerald-50' : ''">
                            <img src="@/assets/images/card_system/american_express.png" alt="" class="w-20 mx-auto mt-4">
                            <p class="text-zinc-500 text-xs">American Express</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="fixed px-10 pb-10 max-sm:px-5 bottom-0 left-0 right-0 bg-white space-y-2">
                <button
                    type="button"
                    class="bg-emerald-500 hover:bg-emerald-600 text-white w-full py-2 rounded-xl"
                    @click="addCard"
                    :disabled="vm.btnAddCardDisable"
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