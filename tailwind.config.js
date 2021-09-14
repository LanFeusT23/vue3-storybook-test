module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {
            backgroundOpacity: ["active"],
        },
    },
    plugins: [require("@tailwindcss/line-clamp")],
};
