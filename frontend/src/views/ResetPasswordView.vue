<template>
    <div class="flex justify-center items-center my-auto">
        <div class="card w-96 bg-base-100 shadow-md">
            <div class="card-body">
                <h1 class="flex-1">Reset password</h1>
                <FormResetPassword v-model="newPassword" class="w-full max-w-md"></FormResetPassword>
                <div class="flex-1 flex justify-end">
                    <small class="w-full"><RouterLink class="link" :to="{ name: 'auth' }">Back to login</RouterLink></small>
                    <button class="btn btn-primary w-36 float-right " @click.prevent="resetPassword">Reset</button>
                </div>
                <div v-if="!!successMessage" class="text-sm text-center">{{ successMessage }}</div>
                <div v-if="!!errorMessage" class="text-error text-sm text-center">{{ errorMessage }}</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import FormResetPassword from '@/components/FormResetPassword.vue';
import { useApi } from '@/composables/useApi';
import useVuelidate from '@vuelidate/core';
import { AxiosError } from 'axios';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const email = route.params.email.toString();
const newPassword = ref('');
const token = route.query.token?.toString() || '';
const successMessage = ref('');
const errorMessage = ref('');
const v = useVuelidate()

async function resetPassword() {
    if(!(await v.value.$validate()))
        return;
    useApi().users(token).resetPassword(email, { password: newPassword.value })
    .then((resp) => {
        successMessage.value = 'Succesfully updated password.' + newPassword.value;
        console.log('updated password for user: ', resp.data);
        errorMessage.value = '';
    })
    .catch((error: AxiosError) => {
        successMessage.value = '';
        errorMessage.value = error.message;
    });
}


</script>