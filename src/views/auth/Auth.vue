<script setup lang="ts">
    import { onMounted, Ref, ref } from "vue"
    import { useRouter } from "vue-router"
    import TextInput from "@/components/Text.input.vue"
    import Title from "@/components/Title.vue"
    import { AuthViewModel } from "./Auth.viewmodel"

    const router = useRouter()
    const vm = ref(new AuthViewModel())
    const user = JSON.parse(localStorage.getItem("user") || "{}")

    if(user.isLogin == true) {
        router.push({
            path: "/home"
        })
    }
    
    async function login(): Promise<void> {
        try {
            await vm.value.login()
            router.push({
                path: "/home"
            })
        } catch(e) {
            if(e instanceof Error) {
                alert(e.message)
            }
        }
    }

    async function registration() {
        router.push({
            path: "/registration"
        })
    }
</script>

<template>
    <div class="flex-col justify-between space-y-12 px-5 py-10">
        <header>
            <div class="flex justify-center">
                <img src="@/assets/images/logo.png" alt="" class="w-[10rem]">
            </div>
        </header>

        <main class="container mx-auto">
            <div class="flex justify-center">
                <div class="flex-col space-y-10">
                    <div class="flex-col space-y-5">
                        <Title>
                            <template #title>Welcome to Lumkin</template>
                        </Title>

                        <TextInput
                            type="text"
                            placeholder="Username"
                            :value="vm.auth.username"
                            @input="(v) => (vm.auth.username = v)"
                        />

                        <TextInput
                            type="password"
                            placeholder="Password"
                            :value="vm.auth.password"
                            @input="(v) => (vm.auth.password = v)"
                            @keypress.enter="login"
                        />
                    </div>

                    <div class="flex-col space-y-3 w-full">
                        <button
                            type="button"
                            class="w-full font-medium text-white bg-[#1EB17D] py-3 rounded-xl"
                            @click="login"
                        >
                            Login
                        </button>

                        <button
                            type="button"
                            class="w-full font-medium text-black bg-zinc-300 py-3 rounded-xl"
                            @click="registration"
                        >
                            Registration
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped></style>
