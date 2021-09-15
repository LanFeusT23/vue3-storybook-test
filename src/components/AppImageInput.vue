<template>
    <div class="relative" :class="cssClasses">
        <div v-if="hasTitleSlot" class="text-sm">
            <slot name="title"></slot>
        </div>

        <div
            class="flex flex-col gap-2 px-4 py-2 border rounded-md outline-none app-file-input__wrapper"
            @click="focusInput"
        >
            <input
                :disabled="disabled"
                class="hidden"
                ref="fileInput"
                type="file"
                :accept="acceptedFormats"
                @change="handleImageChange"
            />
            <div class="flex flex-wrap items-center gap-2">
                <AppButton
                    class="app-file-input__button"
                    @click="selectImage"
                    :disabled="disabled"
                >
                    <i class="fas fa-image"></i>
                    {{ placeholder }}
                </AppButton>

                <span class="text-sm">{{ fileName }}</span>
            </div>
            <div class="max-w-md" v-if="imageValue">
                <img
                    class="grid filter drop-shadow-lg place-items-center"
                    :src="imageValue"
                />
            </div>
        </div>
        <div
            v-if="hasError"
            class="text-sm text-red-500"
            :class="{ absolute: absoluteErrors }"
        >
            <slot name="error">There are errors!</slot>
        </div>
    </div>
</template>

<script lang="ts">
import AppButton from "@/components/AppButton.vue";
import { computed, defineComponent, ref, toRefs, onMounted, watch } from "vue";
export default defineComponent({
    name: "AppImageInput",
    components: {
        AppButton,
    },
    props: {
        modelValue: String,
        placeholder: {
            type: String,
            default: "Select an image",
        },
        hasError: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        absoluteErrors: {
            type: Boolean,
            default: false,
        },
        acceptedFormats: {
            type: String,
            default: "image/*",
        },
    },
    emits: ["update:modelValue"],
    setup(props, { emit, slots }) {
        const {
            modelValue,
            placeholder,
            hasError,
            disabled,
            absoluteErrors,
            acceptedFormats,
        } = toRefs(props);
        const hasTitleSlot = slots.title != null;

        const cssClasses = computed(() => {
            return {
                "app-file-input": true,
                "app-file-input--error": hasError.value,
                "app-file-input--disabled": disabled.value,
            };
        });

        const fileInput = ref();
        const focusInput = () => {
            fileInput.value.focus();
        };

        const selectImage = () => {
            fileInput.value.click();
        };

        const fileName = ref();
        const handleImageChange = (e: any) => {
            var reader = new FileReader();
            fileName.value = e.target?.files[0]?.name;

            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                if (!disabled.value) {
                    emit("update:modelValue", reader.result);
                }
            };
        };

        const imageValue = computed({
            get: () => {
                console.log(modelValue?.value);

                return modelValue?.value;
            },
            set: (val) => {
                if (!disabled.value) {
                    emit("update:modelValue", val);
                }
            },
        });

        return {
            focusInput,
            selectImage,
            handleImageChange,
            fileName,
            fileInput,
            cssClasses,
            imageValue,
            placeholder,
            disabled,
            hasError,
            hasTitleSlot,
            absoluteErrors,
            acceptedFormats,
        };
    },
});
</script>

<style lang="scss" scoped>
.app-file-input {
    $self: &;

    &__wrapper {
        @apply border-gray-400 bg-gray-300 hover:border-gray-400 focus:border-yellow-500;
    }

    &#{$self} {
        &--error {
            #{$self}__wrapper {
                @apply border-red-500;
            }
        }

        &--disabled {
            #{$self}__button {
                @apply text-gray-200 bg-gray-200;
            }
        }
    }
}
</style>
