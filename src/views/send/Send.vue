<script setup lang="ts">
    import { onBeforeMount, onMounted, Ref, ref } from 'vue'
    import { SendViewModel } from "./Send.viewmodel"
    import { useRouter } from 'vue-router'
    import TextHeader from '@/components/TextHeader.vue'
    import TextInput from '@/components/Text.input.vue'
    import NavbarMenu from '@/components/NavbarMenu.vue'
    import Card from '@/components/Card.vue'

    const vm = ref(new SendViewModel())
    const router = useRouter()
    const cards = ref()

    async function send() {
        const res = await vm.value.send()
        if(res === "Success") {
            router.push({
                path: '/home'
            })
        }
        alert(res)
    }

    onBeforeMount(() => {
        if(vm.value.getUser().isLogin !== true) {
            router.push({
                path: "/"
            })
        }
    })

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
                <template #text-left>
                    <router-link to="/">
                        <font-awesome-icon icon="fa-solid fa-arrow-left-long" class="font-bold text-xl max-sm:text-lg" />
                    </router-link>
                </template>
            </TextHeader>
        </header>

        <main class="flex-col space-y-8">
            <div class="cards flex overflow-x-scroll scrollbar-hide scrollbar-none">
                <div v-for="card in cards" :key="card.id">
                    <div class="Card mx-10 max-sm:mx-5" @click="vm.dataSend.id_card = card.id">
                        <div class="Card flex justify-between text-white w-96  rounded-lg" :class="vm.dataSend.id_card === card.id ? 'bg-zinc-400' : 'bg-gradient-to-tl '+card.from+' '+card.via+' '+card.to">
                            <Card>
                                <template #card-header>
                                    <TextHeader>
                                        <template #text-left>
                                            <p class="mt-1.5">{{ card.name }}</p>
                                        </template>
                                        <template #text-right>
                                            <router-link to="/">
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
                                    </TextHeader>
                                </template>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-center">
                <div class="flex-col space-y-4">
                    <TextInput
                        type="text"
                        :value="vm.dataSend.reciver"
                        @input="(v) => (vm.dataSend.reciver = v)"
                        placeholder="Receiver"
                        class="rounded-lg"
                        />
                    <TextInput
                        type="text"
                        :value="vm.dataSend.payment"
                        @input="(v) => (vm.dataSend.payment = v)"
                        placeholder="Amount"
                        class="rounded-lg"
                        />
                    <TextInput
                        type="text"
                        :value="vm.dataSend.description"
                        @input="(v) => (vm.dataSend.description = v)"
                        placeholder="Description"
                        class="rounded-lg"
                        />
                </div>
            </div>

            <div class="px-10 pb-10 max-sm:px-5 bottom-0 left-0 right-0 bg-white space-y-2">
                <button
                    type="button"
                    class="bg-emerald-500 hover:bg-emerald-600 text-white w-full py-2 rounded-xl"
                    @click="send"
                >
                    Send
                </button>
            </div>
        </main>
    </div>
</template>

<style scoped>

</style>