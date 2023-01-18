<template>
    <div class="relative z-0  mt-1.5">
        <input class="block py-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:border-primary focus:outline-none focus:ring-0 peer" :class="{'border-error focus:border-error': v.$error}" placeholder=" " v-bind="attrs" v-model="v.modelValue.$model" @blur="v.$touch"  />
        <label class="absolute text-sm duration-300 text-gray-400 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" :class="{'text-error peer-focus:text-error': v.$error}">{{attrs.label}}</label>
        <span class="label-text-alt text-error" v-if="v.$error">{{v.$errors[0].$message}}</span>
    </div>
</template>

<script lang="ts">
import { toRefs } from '@vue/reactivity';
import useVuelidate, { ValidationRule } from '@vuelidate/core';
import { useVModel } from '@vueuse/core';
import { defineComponent, PropType, reactive, watch } from 'vue';

export default defineComponent({
    props: {
        modelValue: {
            default: () => ''
        },
        error: {
            type: String,
            default: ''
        },
        validationRules: {
            type: Object as PropType<Record<any, ValidationRule>>,
            default: () => {}
        }
    },
    inheritAttrs: false,
    setup(props, { emit, attrs }) {
        const { error } = toRefs(props);

        const modelValue = useVModel(props, 'modelValue', emit);
        const state = reactive({
            modelValue: modelValue.value? modelValue.value : ''
        });

        watch(modelValue, (newValue) => {
            if(state.modelValue != newValue)
                state.modelValue = newValue;
        });
        const rules = {
            modelValue: {...props.validationRules}
        };
        const v = useVuelidate(rules, state);
        return { attrs, error, v };
    }
})

</script>
