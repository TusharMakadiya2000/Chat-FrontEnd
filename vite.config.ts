// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
export default defineConfig({
    plugins: [react()],
    root: ".",
    base: "/",
    css: {
        postcss: {
            plugins: [tailwindcss(), require("autoprefixer")],
        },
    },
    server: {
        host: true,
        port: 3000,
    },
});
