<script setup lang="ts">
    import { onBeforeMount, onMounted, ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { AuthViewModel } from "@/views/auth/Auth.viewmodel"
    import NavbarMenu from '@/components/NavbarMenu.vue'
    import TextHeader from '@/components/TextHeader.vue'
    import Title from '@/components/Title.vue'

    const router = useRouter()
    const vm = ref(new AuthViewModel())
    const name = ref("")

    onBeforeMount(() => {
        if(vm.value.getUser().isLogin !== true) {
            router.push({
                path: "/"
            })
        }
    })
    
    onMounted(async () => {
        name.value = await vm.value.getUser().data.first_name + " " + vm.value.getUser().data.last_name
    })
    
    function logout(): void {
        vm.value.logout()
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
                <template #text-left>
                    <router-link to="/">
                        <font-awesome-icon icon="fa-solid fa-arrow-left-long" class="font-bold text-xl max-sm:text-lg" />
                    </router-link>
                </template>
            </TextHeader>
        </header>

        <main>
            <div class="px-10 max-sm:px-5 text-center mt-5">
                <div class="space-y-2">
                    <p class="text-center text-lg">Hi,</p>
                    <Title>
                        <template #title>{{ name }}</template>
                    </Title>
                    <p class="text-xs">username: {{ vm.getUser().data.username }}</p>
                </div>
                <button type="button" class="mt-10 py-3 bg-red-500 w-full text-white font-semibold rounded-full" @click="logout">
                    Logout
                </button>
            </div>
        </main>

        <main>
        </main>
    </div>
</template>

<style scoped>

</style>