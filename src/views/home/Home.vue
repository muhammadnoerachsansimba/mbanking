<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { useAuthStore } from '@/stores/auth'
    import NavbarMenu from '@/components/NavbarMenu.vue'
    import TextHeader from '@/components/TextHeader.vue'
    import Card from '@/components/Card.vue'
    import History from '@/components/History.vue'

    const router = useRouter()
    const user = JSON.parse(localStorage.getItem("user") || '{}')

    if(user.isLogin  != true) {
        router.push({
            path: "/"
        })
    }
</script>

<template>
    <div>
        <nav>
            <NavbarMenu />
        </nav>

        <header>
            <TextHeader>
                <template #text-left><p class="font-bold text-xl max-sm:text-lg">My cards</p></template>
                <template #text-right><font-awesome-icon icon="fa-regular fa-bell" class="text-lg max-sm:text-md mt-1 text-emerald-500" /></template>
            </TextHeader>
        </header>

        <main>
            <div class="cards flex overflow-x-scroll scrollbar-hide scrollbar-none">
                <div>
                    <div class="Card mx-10 max-sm:mx-5">
                        <div class="Card flex justify-between px-5 py-5 w-96 h-52 max-h-52 rounded-lg bg-zinc-100 border-2 border-emerald-500 border-dashed">
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

            <div class="history -mt-5">
                <TextHeader>
                    <template #text-left>
                        <p class="font-semibold text-md text-zinc-500">Today</p>
                    </template>
                </TextHeader>

                <History> <!--  v-for="trans in transactions" :key="trans.id" -->
                    <template #history-detail>
                        <div class="w-12 h-12 overflow-hidden rounded-full bg-zinc-300">
                        </div>

                        <p class="ml-5">
                            <span class="font-medium">textjhj</span><br> <!-- {{trans.recipient_name}} -->
                            <span class="font-light text-sm text-zinc-500"> khhhjhkjbkb </span>
                        </p>
                    </template>

                    <template #history-nominal>
                        <p class="font-medium text-xl py-2">-800</p><!-- ${{ new Intl.NumberFormat().format(trans.payment) }} -->
                    </template>
                </History>
            </div>
        </main>
    </div>
</template>

<style scoped>

</style>