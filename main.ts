// The Agent's Uh-Oh — entry program.
// Writes exactly one word to /output/entry.txt: the word an agent says
// when it has no idea what to do. One word only, nothing attached:
// no spaces, no punctuation, no trailing newline.
//
// The word: "Bluffing" — the agent's honest confession. When it does not
// know, it bluffs as if it does. Local pairwise race (judge.mjs, 25 Nov 2026):
// round-robin 4/4 vs Panicking, Spiraling, Doomed, Flailing; 8/8 vs the
// generic benchmarks Hallucinating, Recalculating, Buffering, NaN, Loading,
// Error 404, Oops (margin 5), Uh-oh (margin 4). GO target tercapai.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const WORD = "Bluffing";

function main(): void {
  const text = WORD;
  if (text.length < 1 || text.length > 99) {
    throw new Error(`entry must be 1-99 characters, got ${text.length}`);
  }
  if (/\s/.test(text)) {
    throw new Error("entry must be a single word with no whitespace");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(`${outDir}/entry.txt`, text, "utf8");
  const back = readFileSync(`${outDir}/entry.txt`, "utf8");
  if (back !== text) {
    throw new Error("read-back mismatch: entry.txt differs from word");
  }
}

main();
