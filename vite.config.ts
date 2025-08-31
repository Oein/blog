import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import ViteRestart from "vite-plugin-restart";

export default defineConfig({
  plugins: [
    sveltekit(),
    ViteRestart({
      restart: ["contents/*.nd"],
    }),
  ],
});
