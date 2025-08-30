import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

import "dotenv/config";
import ensure from "./svelteConfig/ensureBuildData.js";

const ensureRes = await ensure();

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),

    prerender: {
      crawl: true,
      entries: ["*", ...ensureRes.paths],
    },
  },
};

export default config;
