/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                bgc: {
                    DEFAULT: "#FFFFFF",
                    dark: "#1E293B",
                    bgSelect: "#1b3145",
                    select: "#0C4A5E",
                },
                fgc: {
                    DEFAULT: "#F3F6FF",
                    dark: "#18212F",
                },
                text: {
                    DEFAULT: "#111827",
                    text: "#69696",
                    dark: "#F9F8F8",
                    textSecondary: "#BBBBBB",
                    primaryText: "#E5FFFF",
                    placeholder: "#999999",
                },
                textSecondary: {
                    DEFAULT: "#111827",
                    dark: "#1BA5D0",
                },
                primary: {
                    DEFAULT: "#137492",
                    tabbg: "#DBE9F5",
                    side: "#0C4A5E",
                    dark: "#137492",
                    disabled: "#85B6C5",
                },
                primaryActive: {
                    DEFAULT: "#C7FEFF",
                    dark: "#C7FEFF",
                },
                border: {
                    DEFAULT: "#E6E9F4",
                    dark: "#2B3B54",
                },
                disable: {
                    DEFAULT: "#d1d5db",
                    btn: "#7dd3fc",
                    dark: "#475569",
                },
                bgHeader: {
                    DEFAULT: "#2d3040",
                    dark: "#1E293B",
                },
                bgText: {
                    DEFAULT: "#1B3145",
                },
                icon: {
                    DEFAULT: "#D7D6D6",
                    primary: "#BEBDBD",
                    icon: "#DC1717",
                },
                theme: {
                    1: "#1BA5D0",
                    2: "#DB6565",
                    3: "#F6B40C",
                    4: "#5562CF",
                    5: "#9747FF",
                    6: "#2DAA50",
                    7: "#BD4CAB",
                },
                green: "#16A34A",
                online: "#16A34A",
                offline: "red",
                away: "yellow",
            },
        },
    },
    plugins: [],
};
