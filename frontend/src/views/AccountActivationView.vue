<template>
    <div>
        <span >{{message}}</span>
    </div>
</template>
<script lang="ts" setup>
import { useApi } from '@/composables/useApi';
import { AxiosError } from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();
const message = ref('Account wird aktiviert..');
const email = route.params.email.toString();
const token = route.query.token?.toString() || '';

onMounted(() => {
    useApi().users(token).activateUser(email)
    .then(() => {
        message.value = 'Account aktiviert. Sie können sich jetzt anmelden.'
    })
    .catch((error: AxiosError) => {
        message.value = 'Der Account konnte nicht aktiviert werden: ' + error.message;
    })

})

</script>