import adapterAuto from "@sveltejs/adapter-auto";
import adapterVercel from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

import "dotenv/config";
import { readFile } from "fs/promises";
import ensure from "./svelteConfig/ensureBuildData.js";
import { BUILD_DIR } from "./svelteConfig/dirConfig.js";

let ensureRes = await (process.env.VERCEL === "true"
  ? async () => {
      const data = await readFile(`${BUILD_DIR}/ensure.json`, "utf-8");
      return JSON.parse(data);
    }
  : ensure)();

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: process.env.VERCEL ? adapterVercel() : adapterAuto(),

    prerender: {
      crawl: true,
      entries: ["*", ...ensureRes.paths],
    },
  },
};

export default config;
