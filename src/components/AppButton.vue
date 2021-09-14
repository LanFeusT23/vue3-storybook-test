<template>
    <button
        v-bind="attrs"
        :aria-disabled="disabled"
        :class="cssClasses"
        class="relative flex items-center justify-center h-10 px-2 py-2 text-sm tracking-wide rounded-full"
    >
        <span :class="{ 'opacity-0': loading }" class="flex items-center gap-2">
            <slot></slot>
        </span>
        <span
            v-if="loading"
            class="absolute top-0 bottom-0 left-0 right-0 grid custom-button__loading place-items-center"
        >
            <slot name="loader">
                <i class="text-lg fas fa-spinner fa-pulse"></i>
            </slot>
        </span>
    </button>
</template>

<script lang="ts">
import { computed, toRefs, defineComponent, PropType } from "vue";

export default defineComponent({
    name: "AppButton",
    props: {
        type: {
            type: String as PropType<"primary" | "secondary" | "tertiary">,
            default: "primary",
        },
        size: {
            type: String as PropType<"small" | "medium" | "large">,
            default: "medium",
        },
        icon: Boolean,
        danger: Boolean,
        loading: Boolean,
        disabled: Boolean,
    },
    setup(props, { attrs }) {
        const { type, size, disabled, danger, icon, loading } = toRefs(props);

        const cssClasses = computed(() => {
            return {
                "custom-button": true,
                "custom-button--primary": type.value === "primary",
                "custom-button--secondary": type.value === "secondary",
                "custom-button--tertiary": type.value === "tertiary",
                "custom-button--small": size.value === "small",
                "custom-button--large": size.value === "large",
                "custom-button--danger": danger.value,
                "custom-button--disabled": disabled.value,
                "custom-button--icon": icon.value,
            };
        });

        return {
            loading,
            cssClasses,
            attrs,
        };
    },
});
</script>

<style lang="scss">
.custom-button {
    $self: &;

    &#{$self} {
        @apply text-base h-11 px-6;

        &--icon {
            @apply px-0 h-11 w-11;
        }

        &--large {
            @apply h-12;

            &#{$self}--icon {
                @apply h-12 w-12;
            }
        }

        &--small {
            @apply h-10 text-sm;

            &#{$self}--icon {
                @apply h-10 w-10;
            }
        }

        &--disabled {
            @apply cursor-default;
        }

        &--primary {
            @apply text-gray-100 bg-yellow-500 border border-yellow-500 hover:bg-opacity-80 active:bg-opacity-60;

            &:focus {
                outline-color: var(--bg-yellow-500);
            }

            &#{$self} {
                &--danger {
                    @apply bg-red-500 border-red-500 hover:bg-red-200;
                }

                &--disabled {
                    @apply bg-gray-400 text-gray-500 border-gray-400 hover:bg-gray-400;
                }
            }
        }

        &--secondary {
            @apply text-gray-700 border-2 border-yellow-500 bg-transparent hover:bg-opacity-40;

            &:focus {
                outline-color: var(--color-red-500);
            }

            &#{$self} {
                &--danger {
                    @apply border-red-500 hover:bg-red-200;
                }

                &--disabled {
                    @apply border-gray-500 text-gray-500 hover:border-gray-500 hover:bg-transparent;
                }
            }
        }

        &--tertiary {
            @apply text-yellow-500 border-transparent bg-transparent hover:text-gray-700;

            &#{$self} {
                &--danger {
                    @apply text-red-500 hover:text-red-200;
                }

                &--disabled {
                    @apply text-gray-500 hover:text-gray-500;
                }
            }
        }
    }
}
</style>
