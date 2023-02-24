<script setup lang="ts">
    import { onBeforeMount, onMounted, ref } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { CardViewModel } from './Card.viewmodel'
    import TextHeader from '@/components/TextHeader.vue'
    import Card from '@/components/Card.vue'
    import TextInput from '@/components/Text.input.vue'

    const vm = ref(new CardViewModel())
    const routes = useRoute()
    const router = useRouter()
    
    onBeforeMount(() => {
        if(vm.value.getUser().isLogin !== true) {
            router.push({
                path: "/"
            })
        }
    })
    
    async function getCard(): Promise<object> {
        const id: number = Number(routes.params.id)
        const card = await vm.value.getCardById(id)
        return card
    }

    async function topUp(): Promise<void> {
        const res = await vm.value.addTopUp()
        if(res === "Success") {
            router.push({
                path: "/home"
            })
        }
        alert(res)
    }

    onMounted(async () => {
        await getCard()
    })
</script>

<template>
    <div>
        <header>
            <TextHeader>
                <template #text-left>
                    <RouterLink to="/">
                        <font-awesome-icon icon="fa-solid fa-arrow-left-long" class="font-bold text-xl max-sm:text-lg" />
                    </RouterLink>
                </template>
            </TextHeader>
        </header>

        <main>
            <div class="cards flex overflow-x-hide">
                <div class="Card mx-10 max-sm:mx-5 w-full">
                    <div class="Card flex justify-between text-white w-full rounded-lg bg-gradient-to-tl" :class="vm.card.from+' '+vm.card.via+' '+vm.card.to">
                        <Card>
                            <template #card-header>
                                <TextHeader>
                                    <template #text-left>
                                        <p class="mt-1.5">{{ vm.card.name }}</p>
                                    </template>
                                </TextHeader>
                            </template>

                            <template #card-body>
                                <TextHeader>
                                    <template #text-left>
                                        <p>
                                            <span>Balance</span><br>
                                            <span class="font-semibold text-xl">${{ new Intl.NumberFormat().format(vm.card.balance) }}</span>
                                        </p>
                                    </template>
                                </TextHeader>
                            </template>

                            <template #card-footer>
                                <TextHeader>
                                    <template #text-left>
                                        <p>
                                            <span class="font-bold text-xl tracking-[0.2rem]">....</span>
                                            <span>{{ vm.card.card_number.toString().substring(4, 8) }}</span>
                                        </p>
                                    </template>
                                    <template #text-right>
                                        <img src="@/assets/images/card_system/master_card.png" :alt="vm.card.payment_system" class="w-10" v-if="vm.card.payment_system === 'Mastercard'">
                                        <img src="@/assets/images/card_system/visa.png" :alt="vm.card.payment_system" class="w-10" v-else-if="vm.card.payment_system === 'Visa'">
                                        <img src="@/assets/images/card_system/american_express.png" :alt="vm.card.payment_system" class="w-10" v-else>
                                    </template>
                                </TextHeader>
                            </template>
                        </Card>
                    </div>
                </div>
            </div>

            <div class="flex justify-center mt-8">
                <div class="felx-col space-y-5">
                    <TextInput
                        type="text"
                        :value="vm.topUp.amount"
                        placeholder="Top up"
                        @input="(v) => (vm.topUp.amount = v)" />

                    <button
                        type="button"
                        class="w-[22rem] font-normal text-md text-white py-3 rounded-2xl bg-[#1EB17D]"
                        :disabled="vm.btnTopUpDisabled"
                        @click="topUp"
                    >
                        Top up
                    </button>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped>

</style>