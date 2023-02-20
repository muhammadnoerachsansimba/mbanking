<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { useAuthStore } from '@/stores/auth'
    import TextHeader from '@/components/TextHeader.vue'
    import { AuthViewModel } from "../auth/Auth.viewmodel"
    import { ref } from 'vue';

    const router = useRouter()
    const auth = useAuthStore()
    const user = JSON.parse(localStorage.getItem("user") || '{}')
    const vm = ref(new AuthViewModel())

    if(user.isLogin  == false) {
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
        <TextHeader />
        <button type="button" @click="logout">
            logout
        </button>
    </div>
</template>

<style scoped>

</style>