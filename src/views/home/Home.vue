<script setup lang="ts">
    import { onBeforeMount, onMounted, ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { HomeViewModel } from "./Home.viewmodel"
    import NavbarMenu from '@/components/NavbarMenu.vue'
    import TextHeader from '@/components/TextHeader.vue'
    import History from '@/components/History.vue'
    import Card from '@/components/Card.vue'

    const router = useRouter()
    const vm = ref(new HomeViewModel)
    const cards = ref()
    const transactions = ref()

    onBeforeMount(() => {
        if(vm.value.getUser().isLogin !== true) {
            router.push({
                path: "/"
            })
        }
    })

    async function getTrasaction() {
        const res = await vm.value.getTransaction()
        transactions.value = res
    }

    onMounted(async () => {
        cards.value = await vm.value.getCard()
    })
</script>

<template>
    <div>
        <nav>
            <NavbarMenu />
        </nav>

        <header>
            <TextHeader>
                <template #text-left><p class="font-bold text-xl max-sm:text-lg">My cards</p></template>
                <template #text-right><p class="text-xs">Hi, {{ vm.getUser().data.username }}</p></template>
            </TextHeader>
        </header>

        <main class="mb-28">
            <div class="cards flex overflow-x-scroll scrollbar-hide scrollbar-none">
                <div v-for="card in cards">
                    <div class="Card mx-10 max-sm:mx-5" @click="vm.card.id = card.id; getTrasaction();">
                        <div class="Card flex justify-between text-white w-96 rounded-lg bg-gradient-to-tl " :class="card.from+' '+card.via+' '+card.to">
                            <Card>
                                <template #card-header>
                                    <TextHeader>
                                        <template #text-left>
                                            <p class="mt-1.5">{{ card.name }}</p>
                                        </template>
                                        <template #text-right>
                                            <router-link :to="`/card/${card.id}`">
                                                <font-awesome-icon icon="fa-solid fa-gear" class="bg-[#0000002c] text-sm rounded-full px-2 py-2" />
                                            </router-link>
                                        </template>
                                    </TextHeader>
                                </template>

                                <template #card-body>
                                    <TextHeader>
                                        <template #text-left>
                                            <p>
                                                <span>Balance</span><br>
                                                <span class="font-semibold text-xl">${{ new Intl.NumberFormat().format(card.balance) }}</span>
                                            </p>
                                        </template>
                                    </TextHeader>
                                </template>

                                <template #card-footer>
                                    <TextHeader>
                                        <template #text-left>
                                            <p>
                                                <span class="font-bold text-xl tracking-[0.2rem]">....</span>
                                                <span>{{ card.card_number.substring(4, 8) }}</span>
                                            </p>
                                        </template>
                                        <template #text-right>
                                            <img src="@/assets/images/card_system/master_card.png" :alt="card.payment_system" class="w-10" v-if="card.payment_system === 'Mastercard'">
                                            <img src="@/assets/images/card_system/visa.png" :alt="card.payment_system" class="w-10" v-else-if="card.payment_system === 'Visa'">
                                            <img src="@/assets/images/card_system/american_express.png" :alt="card.payment_system" class="w-10" v-else>
                                        </template>
                                    </TextHeader>
                                </template>
                            </Card>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="Card mx-10 max-sm:mx-5">
                        <div class="Card flex justify-between px-5 py-[5.2rem] w-96 rounded-lg bg-zinc-100 border-2 border-emerald-500 border-dashed">
                            <Card></Card>
                        </div>
                    </div>
                </div>
            </div>

            <TextHeader class="bg-zinc-200 rounded-lg mx-10 max-sm:mx-5 my-5">
                <template #text-left><font-awesome-icon icon="fa-regular fa-credit-card" class="my-2 text-2xl mx-sm:text-xl" /></template>
                <template #text-right>
                    <div class="flex-col px-5 space-y-1">
                        <p class="font-bold text-sm">Card has been ordered!</p>
                        <p class="font-medium text-[.73rem] text-zinc-500">It will be posted to you within ? business days</p>
                    </div>
                </template>
            </TextHeader>

            <TextHeader>
                <template #text-left>
                    <p class="font-semibold text-md py-1.5">Recent transactions</p>
                </template>
    
                <template #text-right>
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="font-thin text-xs bg-zinc-100 px-3 py-3 rounded-full text-zinc-600" />
                </template>
            </TextHeader>

            <div class="history">
                <History v-for="transaction in transactions"> <!--  v-for="trans in transactions" :key="trans.id" -->
                    <template #history-detail>
                        <div class="w-12 h-12 overflow-hidden rounded-full bg-zinc-300">
                        </div>

                        <p class="ml-5">
                            <span class="font-medium">{{ transaction.reciver }}</span><br> <!-- {{trans.recipient_name}} -->
                            <span class="font-light text-sm text-zinc-500">{{ transaction.description }}</span>
                        </p>
                    </template>

                    <template #history-nominal>
                        <p class="font-medium text-xl py-2" v-if="transaction.transaction_type === 'transfer'">-{{ new Intl.NumberFormat().format(transaction.payment) }}</p><!-- ${{ new Intl.NumberFormat().format(trans.payment) }} -->
                        <p class="font-medium text-xl py-2" v-else>+{{ new Intl.NumberFormat().format(transaction.payment) }}</p><!-- ${{ new Intl.NumberFormat().format(trans.payment) }} -->
                    </template>
                </History>
            </div>
        </main>
    </div>
</template>

<style scoped>

</style>