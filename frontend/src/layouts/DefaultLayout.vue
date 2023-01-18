<template>
    <div>
        <div class="h-12 bg-base-200 w-full flex items-center px-2 space-x-2">
            <div class="flex-1"></div>
            <button class="btn btn-primary btn-sm" v-if="isLoggedIn" @click.prevent="logout">{{$t('button.logout')}}</button>
            <button class="btn btn-link btn-sm" @click.prevent="navigateRegister" v-if="!isLoggedIn">{{$t('button.register')}}</button>
            <RouterLink class="btn btn-primary btn-sm" :to="{name: 'auth', params: {intent: 'login'}}" v-if="!isLoggedIn">{{$t('button.login')}}</RouterLink>
            
        </div>
        <RouterView></RouterView>
    </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';


const router = useRouter();
function navigateRegister() {
    router.push({name: 'auth', params: { intent: 'register' }})
}
const { isLoggedIn } = storeToRefs(useAuthStore());
function logout() {
    useAuthStore().setUserToken(null);
    router.push({name: 'auth'})    
}
</script>