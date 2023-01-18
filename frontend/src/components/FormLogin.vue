<template>
    <div class="flex flex-col space-y-4 p-2">
        <InputField type="email" v-model="user!.email" :validation-rules="{ emailRequired, emailInvalid }" label="E-Mail" class="w-full" />
        <InputField type="password" v-model="user!.password" :validation-rules="{ passwordRequired }" :label="$t('input.label.password')" class="w-full" />
    </div>
</template>

<script lang="ts" setup>
import { reactive, watch, type PropType } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { ProfileType, type UserCreate } from '@/api/internal/v1'
import { useVModel } from '@vueuse/core'
import InputField from './FieldInput.vue'
import { useI18n } from 'vue-i18n'
const props = defineProps({
    modelValue: {
        type: Object as PropType<{email: string, password: string}>
    }
});
const { t }  = useI18n();

const emailInvalid = {...email};
const emailRequired = {...required};
const passwordRequired = {...required};
passwordRequired.$message = t('input.error.required', {label: t('input.label.password')})
emailInvalid.$message = t('input.error.email.invalid');
emailRequired.$message = t('input.error.email.required');

const user = useVModel(props, 'modelValue');
const v = useVuelidate();

</script>