// Lists every [bracketed] placeholder left in string literals under src/content/.
// Fails only for production builds (VERCEL_ENV=production) unless ALLOW_PLACEHOLDERS is set.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = join(import.meta.dirname, "..");
const contentDir = join(root, "src", "content");

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : /\.(ts|tsx|json|md)$/.test(name) ? [path] : [];
  });
}

const STRING = /(['"`])((?:\\.|(?!\1)[^\\])*)\1/g;
const BRACKET = /\[[^\]\n]+\]/g;

const found: string[] = [];
for (const file of files(contentDir)) {
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (line.trim().startsWith("//")) return;
      for (const [, , str] of line.matchAll(STRING)) {
        for (const [ph] of str.matchAll(BRACKET)) {
          found.push(`${relative(root, file)}:${i + 1}  ${ph}`);
        }
      }
    });
}

if (found.length === 0) {
  console.log("check-placeholders: no placeholders left.");
  process.exit(0);
}

console.log(`check-placeholders: ${found.length} placeholder(s) still to fill:\n`);
console.log(found.map((f) => `  ${f}`).join("\n"));

const isProduction = process.env.VERCEL_ENV === "production";
if (isProduction && !process.env.ALLOW_PLACEHOLDERS) {
  console.error("\nProduction build blocked: fill the placeholders above, or set ALLOW_PLACEHOLDERS=1.");
  process.exit(1);
}
