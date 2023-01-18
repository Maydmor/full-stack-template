<template>
    <div class="flex flex-col space-y-4 p-2">
        <InputField type="email" v-model="user!.email" :validation-rules="{ emailRequired, emailInvalid }" label="E-Mail" class="w-full" />
        <InputField type="password" v-model="user!.password" :validation-rules="{ passwordRequired }" :label="$t('input.label.password')" class="w-full" />
        <InputField type="password" v-model="retypePassword" :validation-rules="{ sameAsPassword }" label="Retype password" class="w-full" />
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, type PropType } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs } from '@vuelidate/validators'
import { type UserCreate } from '@/api/internal/v1'
import { useVModel } from '@vueuse/core'
import InputField from './FieldInput.vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
    modelValue: {
        type: Object as PropType<UserCreate>
    }
});
const { t }  = useI18n();

const emailInvalid = {...email};
const user = useVModel(props, 'modelValue');
const emailRequired = {...required};
const passwordRequired = {...required};
const password = computed(() => user.value?.password);
const sameAsPassword = {...sameAs(password)};
passwordRequired.$message = t('input.error.required', {label: t('input.label.password')})
emailInvalid.$message = t('input.error.email.invalid');
emailRequired.$message = t('input.error.email.required');

const retypePassword = ref('');
/*eslint-disable*/
const v = useVuelidate();
/*eslint-enable*/

</script>