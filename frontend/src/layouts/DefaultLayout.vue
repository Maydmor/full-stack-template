<template>
    <div>
        <div class="h-12 bg-base-200 w-full flex items-center px-2">
            <div class="flex-1"></div>
            <button class="btn btn-primary btn-sm" v-if="isLoggedIn" @click.prevent="logout">Logout</button>
            <button class="btn btn-primary btn-sm" v-else>Login/Register</button>
            
        </div>
        <RouterView></RouterView>
    </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';


const router = useRouter();
const { isLoggedIn } = storeToRefs(useAuthStore());
function logout() {
    useAuthStore().setUserToken(null);
    router.push({name: 'auth'})    
}
</script>