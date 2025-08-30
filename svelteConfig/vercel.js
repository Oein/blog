import ensure from "./ensureBuildData.js";
import { BUILD_DIR } from "./dirConfig.js";

import { writeFile } from "fs/promises";
import { join } from "path";

(async () => {
  const eData = await ensure();
  await writeFile(join(BUILD_DIR, "ensure.json"), JSON.stringify(eData));
})();
