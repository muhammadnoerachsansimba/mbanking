<script setup lang="ts">
    import { onMounted, Ref, ref } from "vue";
    import { useRouter } from "vue-router";
    import TextInput from "@/components/Text.input.vue";
    import Title from "@/components/Title.vue";
    import { AuthViewModel } from "@/views/auth/Auth.viewmodel";

    const router = useRouter();
    const vm = ref(new AuthViewModel());
    const error = ref(false)

    async function registration() {
        if(vm.value.auth.password.length < 6) {
            error.value = true
        } else {
            error.value = false
            const res = await vm.value.registration()
            if(res == "Success") {
                alert(res)
                router.push({
                    path: "/"
                })
            } else {
                alert(res)
            }
        }
    }

    async function backToLogin() {
        router.push({
            path: "/"
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
                            placeholder="First Name"
                            :value="vm.auth.first_name"
                            @input="(v) => (vm.auth.first_name = v)"
                        />

                        <TextInput
                            type="text"
                            placeholder="Last Name"
                            :value="vm.auth.last_name"
                            @input="(v) => (vm.auth.last_name = v)"
                        />

                        <TextInput
                            type="text"
                            placeholder="Username"
                            :value="vm.auth.username"
                            @input="(v) => (vm.auth.username = v)"
                        />

                        <div>
                            <TextInput
                                type="password"
                                placeholder="Password"
                                :value="vm.auth.password"
                                @input="(v) => (vm.auth.password = v)"
                            />
                            <p class="text-xs text-red-600 ml-2 mt-1" :class="error ? '' : 'hide'">min.6 character</p>
                        </div>
                    </div>

                    <div class="fixed w-full text-center bottom-0 right-0 py-10 space-y-5">
                        <button
                            type="button"
                            class="w-[22rem] font-normal text-md text-white py-3 rounded-2xl"
                            :class="vm.auth.first_name != '' && vm.auth.last_name != '' && vm.auth.username != '' && vm.auth.password != '' ? 'bg-[#1EB17D]' : 'bg-[#1eb17d4b]'"
                            :disabled="vm.btnRegistDisable"
                            @click="registration"
                        >
                            Create account
                        </button><br>

                        <button
                            type="button"
                            class="w-[22rem] bg-zinc-300 font-normal text-md text-black py-3 rounded-2xl"
                            @click="backToLogin"
                        >
                            Back to login
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped>
    .hide {
        visibility: hidden;
    }
</style>