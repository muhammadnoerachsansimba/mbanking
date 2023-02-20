<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import NavbarMenu from '@/components/NavbarMenu.vue'
    import TextHeader from '@/components/TextHeader.vue'
    import Title from '@/components/Title.vue'
    import { AuthViewModel } from "@/views/auth/Auth.viewmodel"
    import { ref } from 'vue'

    const router = useRouter()
    const user = JSON.parse(localStorage.getItem("user") || '{}')
    const vm = ref(new AuthViewModel())

    if(user.isLogin  != true) {
        router.push({
            path: "/"
        })
    }
    
    async function logout(): Promise<void> {
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
                <Title>
                    <template #title>{{ user.data.first_name + " " + user.data.last_name }}</template>
                </Title>
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