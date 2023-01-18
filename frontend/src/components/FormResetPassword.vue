<template>
    <div class="flex flex-col space-y-4 p-2">
        <InputField type="password" v-model="password" :validation-rules="{ passwordRequired }" :label="$t('input.label.password')" class="w-full" />
        <InputField type="password" v-model="retypePassword" :validation-rules="{ sameAsPassword }" label="Retype password" class="w-full" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, sameAs } from '@vuelidate/validators'
import { useVModel } from '@vueuse/core'
import InputField from './FieldInput.vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    }
});
const { t }  = useI18n();

const password = useVModel(props, 'modelValue');
const passwordRequired = {...required};
const sameAsPassword = {...sameAs(password)};
passwordRequired.$message = t('input.error.required', {label: t('input.label.password')})
const retypePassword = ref('');
/*eslint-disable*/
const v = useVuelidate();
/*eslint-enable*/

</script>