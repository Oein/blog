import { writeFile, mkdir, readFile, readdir } from "node:fs/promises";
import { existsSync } from "fs";
import { createLogger } from "vite";
import { join } from "path";
import { BUILD_DIR, CONTENTS_DIR } from "./dirConfig.js";
import { parseNotedown } from "notedown-parser";
import { compress } from "lz4js";

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

const pagesData = {};
const searchData = [];

const Base64 = {
  _Rixits: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/",
  fromNumber: function (number) {
    if (
      isNaN(Number(number)) ||
      number === null ||
      number === Number.POSITIVE_INFINITY
    )
      throw "The input is not valid";
    if (number < 0) throw "Can't represent negative numbers now";

    var rixit;
    var residual = Math.floor(number);
    var result = "";
    while (true) {
      rixit = residual % 64;
      result = this._Rixits.charAt(rixit) + result;
      residual = Math.floor(residual / 64);
      if (residual == 0) break;
    }
    return result;
  },
};

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
    metaInfo.title,
    metaInfo.category || "",
    metaInfo.writeAt
      ? (() => {
          let t = new Date();
          try {
            t = new Date(metaInfo.writeAt);
          } catch (e) {}
          try {
            t = new Date(parseInt(metaInfo.writeAt));
          } catch (e) {}
          try {
            t.toISOString();
            return Base64.fromNumber(t.getTime());
          } catch (e) {
            return "";
          }
          return "";
        })()
      : "",
  ]);
}

async function crawlPages() {
  const files = await readdir(CONTENTS_DIR);
  logger.info(`Crawling ${files.length} pages...`);

  await Promise.all(
    files
      .filter((x) => x.endsWith(".nd"))
      .map((file) => crawlContent(join(CONTENTS_DIR, file)))
  );

  searchData.sort((a, b) => {
    if (!a[3] && b[3]) return 1;
    if (a[3] && !b[3]) return -1;

    if (!a[3] && !b[3]) {
      return a[1][0].localeCompare(b[1][0]);
    }

    return (b[3] ? b[3] : 0) - (a[3] ? a[3] : 0);
  });

  const searchContent = Buffer.from(
    searchData
      .flat()
      .map((x) => encodeURIComponent(x))
      .join("\n")
  );
  await writeFile(join(BUILD_DIR, "search.lz4"), compress(searchContent));

  for (const [slug, content] of Object.entries(pagesData)) {
    await writeFile(
      join(BUILD_DIR, `content-${slug}.json`),
      JSON.stringify(content)
    );
  }
}

export default async function ensure() {
  if (!existsSync(BUILD_DIR)) await mkdir(BUILD_DIR, { recursive: true });
  if (
    existsSync(join(BUILD_DIR, "gt.txt")) &&
    (await readFile(join(BUILD_DIR, "gt.txt"), "utf-8")) === process.env.GT
  ) {
    const eData = await readFile(join(BUILD_DIR, "ensure.json"), "utf-8");
    return JSON.parse(eData);
  }
  await crawlPages();
  await writeFile(join(BUILD_DIR, "gt.txt"), process.env.GT);

  const res = {
    paths: [...searchData.map((x) => "/" + x[0])],
  };

  await writeFile(join(BUILD_DIR, "ensure.json"), JSON.stringify(res));

  return res;
}
