<script setup lang="ts">
    import { onMounted, Ref, ref } from "vue"
    import { useRouter } from "vue-router"
    import TextInput from "@/components/Text.input.vue"
    import Title from "@/components/Title.vue"
    import { useAuthStore } from "@/stores/auth"

    const router = useRouter();
    const auth = useAuthStore()

    if(auth.isLogIn == true) {
        router.push({
            path: "/home"
        })
    }
    async function login() {
        const data = await auth.login()
        if(data.length > 0) {
            router.push({
                path: "/home"
            })
        } else {
            alert("Sorry, username and password is wrong!")
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
                            :value="auth.username"
                            @input="(v) => (auth.username = v)"
                        />

                        <TextInput
                            type="password"
                            placeholder="Password"
                            :value="auth.password"
                            @input="(v) => (auth.password = v)"
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
