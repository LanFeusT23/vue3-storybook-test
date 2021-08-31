import AppButton from "./AppButton.vue";

export default {
    title: "Forms/AppButton",
    component: AppButton,
    argTypes: {
        type: {
            control: { type: "select", options: ["primary", "secondary"] },
        },
        size: {
            control: { type: "select", options: ["small", "medium", "large"] },
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
    template: `<AppButton v-bind="args">${args.slotTemplate}</AppButton>`,
});

export const Base = Template.bind({});
Base.args = {
    type: "primary",
    size: "medium",
    slotTemplate: "some button",
};
