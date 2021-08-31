<template>
    <button class="relative rounded-md" :class="cssClasses">
        <slot></slot>
    </button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs } from "vue";

export default defineComponent({
    props: {
        type: {
            type: String as PropType<"primary" | "secondary">,
            default: "primary",
        },
        size: {
            type: String as PropType<"small" | "medium" | "large">,
            default: "medium",
        },
        danger: Boolean,
        disabled: Boolean,
    },
    setup(props) {
        const { type, size, danger, disabled } = toRefs(props);

        const cssClasses = computed(() => {
            return {
                "app-button": true,
                "app-button--primary": type.value === "primary",
                "app-button--secondary": type.value === "secondary",
                "app-button--small": size.value === "small",
                "app-button--medium": size.value === "medium",
                "app-button--large": size.value === "large",
                "app-button--danger": danger.value,
                "app-button--disabled": disabled.value,
            };
        });

        return {
            cssClasses,
        };
    },
});
</script>

<style lang="scss" scoped>
.app-button {
    $self: &;
    @apply text-white px-4 text-base;

    &#{$self}--small {
        @apply text-xs;
    }

    &#{$self}--large {
        @apply text-3xl;
    }

    &#{$self}--primary {
        @apply bg-blue-500;

        &:active {
            @apply bg-opacity-30;
        }
    }

    &#{$self}--secondary {
        @apply border-2 border-blue-500 text-blue-500;

        &:active {
            @apply bg-blue-500 bg-opacity-30;
        }
    }

    &#{$self}--disabled {
        @apply bg-gray-800;
    }

    &#{$self}--danger {
        @apply bg-red-800;

        &:active {
            @apply bg-opacity-30;
        }
    }
}
</style>
