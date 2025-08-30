import { writeFileSync } from "fs";

for (let i = 0; i < 100; i++) {
  const randomID =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  writeFileSync(
    "./contents/" + randomID + ".nd",
    `\\meta title=Title ${randomID}\n\\meta slug=${randomID}\n\\meta writeAt=${Date.now()}\n\\meta\n\n\n# Body ${randomID}`
  );
}
