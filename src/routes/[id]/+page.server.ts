import { error } from "@sveltejs/kit";
import crypto from "crypto";
import { existsSync } from "fs";
import { readFile } from "fs/promises";

const load: import("./$types").PageServerLoad = async function ({ params }) {
  const slug = params.id;
  const path = `static/content-${slug}.json`;
  if (!existsSync(path)) return error(404, "Not found");
  const data = JSON.parse(await readFile(path, "utf-8"));
  return {
    data,
  };
};

export { load };
