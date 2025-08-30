import { writeFile, mkdir, readFile, readdir } from "node:fs/promises";
import { existsSync } from "fs";
import { createLogger } from "vite";
import { join } from "path";

import { disassemble } from "es-hangul";

import { parseNotedown } from "notedown-parser";

const origLogger = createLogger("info", {
  prefix: "[notedown]",
});

const logger = {
  ...origLogger,
  info: (msg, options) => origLogger.info(msg, { timestamp: true, ...options }),
  warn: (msg, options) => origLogger.warn(msg, { timestamp: true, ...options }),
  error: (msg, options) =>
    origLogger.error(msg, { timestamp: true, ...options }),
};

const CONTENTS_DIR = "./contents";
const BUILD_DIR = ".svelte-kit/output/server";

const pagesData = {};
const searchData = [];

async function crawlContent(file) {
  logger.info(`Crawling ${file}...`);
  const content = await readFile(file, "utf-8");
  const parsed = parseNotedown(content);
  const metaInfo = parsed.meta || {};
  if (!("slug" in metaInfo)) {
    logger.error(`==> No slug found in ${file}`);
    return;
  }
  if (!("title" in metaInfo)) {
    logger.error(`==> No title found in ${file}`);
    return;
  }
  pagesData[metaInfo.slug] = parsed;
  searchData.push([
    metaInfo.slug,
    [metaInfo.title, disassemble(metaInfo.title).replace(/\s/g, "")],
    [
      metaInfo.category,
      disassemble(metaInfo.category || "").replace(/\s/g, ""),
    ],
    metaInfo.writeAt,
  ]);
}

async function crawlPages() {
  const files = await readdir(CONTENTS_DIR);
  logger.info(`Crawling ${files.length} pages...`);

  for (const file of files) {
    if (!file.endsWith(".nd")) continue;
    await crawlContent(join(CONTENTS_DIR, file));
  }

  // sort searchData
  searchData.sort((a, b) => {
    // no date posts to end
    if (!a[3] && b[3]) return 1;
    if (a[3] && !b[3]) return -1;

    // if both doesn't have date
    // sort by name
    if (!a[3] && !b[3]) {
      return a[1][0].localeCompare(b[1][0]);
    }

    // sort by date
    return (b[3] ? b[3] : 0) - (a[3] ? a[3] : 0);
  });

  await writeFile(join(BUILD_DIR, "pages.json"), JSON.stringify(pagesData));
  await writeFile(join(BUILD_DIR, "search.json"), JSON.stringify(searchData));

  for (const [slug, content] of Object.entries(pagesData)) {
    await writeFile(
      join(BUILD_DIR, `content-${slug}.json`),
      JSON.stringify(content)
    );
  }
}

export default async function ensure() {
  if (!existsSync(BUILD_DIR)) await mkdir(BUILD_DIR);
  await crawlPages();

  return {
    paths: [],
  };
}
