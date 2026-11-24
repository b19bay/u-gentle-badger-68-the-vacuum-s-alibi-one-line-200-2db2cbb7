// The Vacuum's Alibi — one line, 200 characters at most.
// Writes the robot vacuum's excuse for a missed spot to /output/entry.txt.
// Deterministic: no clock, no randomness, no environment-dependent output.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My sensors classified the spot as furniture. It has now been promoted to rug, and rugs are not my department.";

// The sealed gate scores the file Valid only when it is 1-200 UTF-8
// characters and not only white space. Fail loudly here rather than ship
// an entry the gate would refuse.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`entry line must be 1-200 characters, got ${LINE.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
