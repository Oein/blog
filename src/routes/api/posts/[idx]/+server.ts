import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";

import { readFile } from "fs/promises";
import { config } from "../../../config";
import { existsSync } from "fs";
import { disassemble } from "es-hangul";

export const GET: RequestHandler = async ({ params, url }) => {
  const page = parseInt(params["idx"] || "1");
  const LIMIT = config.api.POSTS_PER_PAGE;
  const OFFSET = (page - 1) * LIMIT;
  const SEARCH_KEYWORD = disassemble(
    url.searchParams.get("search") || ""
  ).replace(/\s/g, "");

  if (!existsSync(".svelte-kit/output/client/_app/search.json")) {
    return json([false]);
  }
  const pages = JSON.parse(
    await readFile(".svelte-kit/output/client/_app/search.json", "utf-8")
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
