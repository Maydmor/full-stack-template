<template>
    <div>
        Activate account
        <span >{{message}}</span>
    </div>
</template>
<script lang="ts" setup>
import { useApi } from '@/composables/useApi';
import { useAuthStore } from '@/stores/auth';
import { Axios, AxiosError } from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();
const message = ref('activating account..');
const email = route.params.email.toString();
const token = route.query.token?.toString() || '';
console.log('Activagte user with email ', email, ' and token=', token);

onMounted(() => {
    useApi().users(token).activateUser(email)
    .then((response) => {
        message.value = 'account activated. you can now login.'
    })
    .catch((error: AxiosError) => {
        message.value = 'could not activate account: ' + error.message;
    })

})

</script>