<template>
    <div class="flex justify-center items-center my-auto">
        <div class="card w-96 bg-base-100 shadow-md" v-if="intent == Mode.register">
            <div class="card-body">
                <h1 class="flex-1">Register</h1>
                <FormRegister v-model="newUser" class="w-full max-w-md"></FormRegister>
                <div class="flex-1 flex justify-end">
                    <small class="w-full">Sie haben bereits ein Konto? <button class="link" @click.prevent="intent = Mode.login">Jetzt einloggen!</button></small>
                    <button class="btn btn-primary w-36 float-right " @click.prevent="register">{{$t('button.label.register')}}</button>
                </div>
                <div v-if="registerMessage" class="text-sm text-center">{{ registerMessage }}</div>
                <button v-if="!!registeredUserEmail" class="text-sm link" @click.prevent="sendActivationEmail">Resend email</button>
                <div v-if="registerError" class="text-error text-sm text-center">{{ registerError }}</div>
            </div>
        </div>
        <div class="card w-96 bg-base-100 shadow-md" v-if="intent == Mode.login">
            <div class="card-body">
                <h1 class="flex-1">Login</h1>
                <FormLogin v-model="loginUser" class="w-full max-w-md"></FormLogin>
                <div class="flex-1 flex justify-end"><button class="link text-xs" @click="intent = Mode.resetPassword">Passwort vergessen?</button></div>
                <div class="flex-1 flex justify-end">
                    <small class="w-full">Sie haben noch kein Konto? <button class="link" @click.prevent="intent = Mode.register">Jetzt registrieren!</button></small>
                    <button class="btn btn-primary w-36  float-right " @click.prevent="login">{{$t('button.label.login')}}</button>
                </div>
                <div v-if="loginError" class="text-error text-sm text-center">{{ loginError }}</div>
            </div>
        </div>
        <div class="card w-96 bg-base-100 shadow-md" v-if="intent == Mode.resetPassword">
            <div class="card-body">
                <h1 class="flex-1">Reset password</h1>
                <FieldInput v-model="resetPasswordEmail" :validation-rules="{ emailValidation, required }" label="E-Mail" class="w-full max-w-md"/>
                <div class="flex-1 flex justify-end">
                    <small class="w-full"><button class="link" @click.prevent="intent = Mode.login">Back to login</button></small>
                    <button class="btn btn-primary w-40  float-right " @click.prevent="sendResetPasswordMail">Reset password</button>
                </div>
                <div v-if="!!resetPasswordMessage" class="text-sm text-center">{{ resetPasswordMessage }}</div>
                <div v-if="!!resetPasswordError" class="text-error text-sm text-center">{{ resetPasswordError }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ProfileType, UserCreate } from '@/api/internal/v1';
import FieldInput from '@/components/FieldInput.vue';
import FormLogin from '@/components/FormLogin.vue';
import FormRegister from '@/components/FormRegister.vue';
import { useApi } from '@/composables/useApi';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import useVuelidate from '@vuelidate/core';
import { AxiosError } from 'axios';
import { reactive, ref } from 'vue';
import { email as emailValidation, required } from '@vuelidate/validators';

const enum Mode {
    login = 'login',
    register = 'register',
    resetPassword = 'reset-password'
} 
const newUser = reactive({
    email: '',
    password: '',
    profileType: ProfileType.User
} as UserCreate);

const loginUser = reactive({
    email: '',
    password: ''
});

const resetPasswordEmail = ref('');
emailValidation.$message = 'Ungültige E-Mail Adresse';
required.$message = 'E-Mail wird benötigt';

const resetPasswordMessage = ref('');
const resetPasswordError = ref('');

const registeredUserEmail = ref<null|string>(null);
const registerMessage = ref('');
const registerError = ref('');

const loginError = ref('');

const intent = ref(Mode.login);
const v = useVuelidate();

async function sendActivationEmail() {
    const api = useApi().users();
    api.sendActivationEmail(registeredUserEmail.value!)
    .then(() => {
        registerMessage.value = 'Check your email inbox to activate your account.'
    })
    .catch((error: AxiosError) => {
        registerError.value = error.message;
    })

}

function sendResetPasswordMail() {
    if (!v.value.$validate()) {
        return;
    }
    const api = useApi().users()
    api.sendResetPasswordEmail(resetPasswordEmail.value)
    .then(() => {
        resetPasswordMessage.value = 'Check your email inbox for further instructions.'
    })
    .catch((error: AxiosError) => {
        resetPasswordError.value = error.message;
    })
}

async function register() {
    if (!(await v.value.$validate())) {
        console.log('Form invalid');
        return;
    }
    const api = useApi().users();
    api.createUser(newUser).then((response) => {
        console.log('Created user: ', response.data);
        registeredUserEmail.value = response.data.email;
        sendActivationEmail();
        registerMessage.value = 'User succesfully created. Check your email inbox to activate your account.';
    })
    .catch((error: AxiosError) => {
        if (error.response?.status == 409) {
            registerError.value = 'The user with the given email already exists';
        }
        else {
            registerError.value = error.message;
        }
    });
}

async function login() {
    if (!(await v.value.$validate())) {
        console.log('Login form invalid');
        return;
    }
    
    useApi().security().login(loginUser.email, loginUser.password)
    .then((response) => {
        console.log('retrieved access token: ', response.data.accessToken);
        useAuthStore().setUserToken(response.data.accessToken);
        router.push({name: 'home'});
    })
    .catch((error: AxiosError) => {
        if(error.response?.status == 401) {
            loginError.value = 'Wrong email or password provided';
        }
        else {
            loginError.value = error.message;
        }
    });
    
}

</script>