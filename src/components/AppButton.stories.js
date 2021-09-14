import AppButton from "./AppButton.vue";

export default {
    title: "forms/AppButton",
    component: AppButton,
    argTypes: {
        type: {
            control: {
                type: "select",
            },
            options: ["primary", "secondary", "tertiary"],
        },
        size: {
            control: {
                type: "select",
            },
            options: ["small", "medium", "large"],
        },
        default: {
            control: "text",
        },
        loader: {
            control: "text",
        },
    },
};

const Template = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { AppButton },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        return { args };
    },
    // And then the `args` are bound to your component with `v-bind="args"`
    template: `
        <AppButton v-bind="args">
            <template v-if="args.icon"><i className="fa fa-smile"></i></template>
            <template v-else>{{ args.default }}</template>
        </AppButton>
    `,
});

export const Base = Template.bind({});
Base.args = {
    type: "primary",
    size: "medium",
    icon: false,
    disabled: false,
    loading: false,
    default: "Click Me!",
    loader: `<i class="text-lg fas fa-spinner fa-pulse"></i>`,
};
