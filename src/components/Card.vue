<script setup lang="ts">
</script>

<template>
<<<<<<< Updated upstream
    <div class="flex justify-center">
        <div class="flex-col space-y-5">
        </div>
    </div>
=======
    <!-- <div class="Card mx-5"> -->
        <!-- <div class="Card flex justify-between px-5 py-5 w-96 h-52 max-h-52 rounded-lg bg-zinc-100 border-2 border-emerald-500 border-dashed"> bg-gradient-to-br from-emerald-900 via-emerald-700 to-emerald-500 w-96 h-52 max-h-60 rounded-lg text-white" || hover:from-emerald-700 hover:via-emerald-500 hover:to-emerald-300 -->
            <div class="card-right flex-col justify-between w-full">
                <slot name="card-header"></slot>
                <slot name="card-body">
                    <div class="text-center mx-auto my-auto">
                        <router-link to="/add_card">
                            <font-awesome-icon icon="fa-solid fa-plus" class="border-2 border-emerald-500 px-1.5 py-1.5 rounded-full text-emerald-500" />
                            <p>Add Card</p>
                        </router-link>
                    </div>
                </slot>
                <slot name="card-footer"></slot>
            </div>
        <!-- </div>
    </div> -->
>>>>>>> Stashed changes
</template>

<style scoped></style>