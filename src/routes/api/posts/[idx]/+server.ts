import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";

import { readFile } from "fs/promises";
import { read } from "$app/server";
import { config } from "../../../config";
import { existsSync } from "fs";
import { disassemble } from "es-hangul";

import { BUILD_DIR } from "../../../../../svelteConfig/dirConfig";

export const GET: RequestHandler = async ({ params, url }) => {
  const page = parseInt(params["idx"] || "1");
  const LIMIT = config.api.POSTS_PER_PAGE;
  const OFFSET = (page - 1) * LIMIT;
  const SEARCH_KEYWORD = disassemble(
    url.searchParams.get("search") || ""
  ).replace(/\s/g, "");

  if (!process.env.VERCEL && !existsSync(BUILD_DIR + "/search.json")) {
    return json([false]);
  }
  const pages = JSON.parse(
    process.env.VERCEL
      ? await read("build/search.json").text()
      : await readFile(BUILD_DIR + "/search.json", "utf-8")
  ).filter(
    (x: [string, [string, string], [string?, string?], string?]) =>
      x[1][1].includes(SEARCH_KEYWORD) ||
      (x[2][1] && x[2][1].includes(SEARCH_KEYWORD))
  );
  const posts = pages
    .slice(OFFSET, OFFSET + LIMIT)
    .map((x: [string, [string, string], [string?, string?], string?]) => [
      x[0],
      x[1][0],
      x[2][0],
      x[3],
    ])
    .flat();

  const res = [...posts, pages.length > OFFSET + LIMIT];
  return json(res);
};
