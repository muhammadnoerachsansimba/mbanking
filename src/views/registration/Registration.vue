<script setup lang="ts">
    import { onMounted, Ref, ref } from "vue";
    import { useRouter } from "vue-router";
    import TextInput from "@/components/Text.input.vue";
    import Title from "@/components/Title.vue";
    import { AuthViewModel } from "@/views/auth/Auth.viewmodel";

    const router = useRouter();
    const vm = ref(new AuthViewModel());
    const error = ref(false)

    async function registration(): Promise<void> {
        if(vm.value.regist.password.length < 6) {
            error.value = true
        }
        error.value = false
        try{
            const res = await vm.value.registration()
            alert(res)
            router.push({
                path: "/"
            })
        } catch(error) {
            alert(error)
        }
    }

    function checkInput(): void {
        if(vm.value.regist.first_name !== "" && vm.value.regist.last_name !== "" && vm.value.regist.username !== "" && vm.value.regist.password !== "" && vm.value.regist.password.length > 6) {
            vm.value.btnRegistDisable = false
        } else {
            vm.value.btnRegistDisable = true
        }
    }

    function backToLogin(): void {
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
                            :value="vm.regist.first_name"
                            @input="(v) => (vm.regist.first_name = v)"
                            @change="checkInput"
                        />

                        <TextInput
                            type="text"
                            placeholder="Last Name"
                            :value="vm.regist.last_name"
                            @input="(v) => (vm.regist.last_name = v)"
                            @change="checkInput"
                        />

                        <TextInput
                            type="text"
                            placeholder="Username"
                            :value="vm.regist.username"
                            @input="(v) => (vm.regist.username = v)"
                            @change="checkInput"
                        />

                        <div>
                            <TextInput
                                type="password"
                                placeholder="Password"
                                :value="vm.regist.password"
                                @input="(v) => (vm.regist.password = v)"
                                @change="checkInput"
                            />
                            <p class="text-xs text-red-600 ml-2 mt-1" :class="error ? '' : 'hide'">min.6 character</p>
                        </div>
                    </div>

                    <div class="fixed w-full text-center bottom-0 right-0 py-10 space-y-5">
                        <button
                            type="button"
                            class="w-[22rem] font-normal text-md text-white py-3 rounded-2xl"
                            :class="vm.btnRegistDisable == false ? 'bg-[#1EB17D]' : 'bg-[#1eb17d4b]'"
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