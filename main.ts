import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "My smart doorbell recognized me, then asked if I was here to see the homeowner.";

function validateLine(line: string): void {
  const charLength = [...line].length;
  const byteLength = Buffer.byteLength(line, "utf8");
  if (charLength < 1 || charLength > 140) {
    throw new Error(`Line length ${charLength} is outside 1-140`);
  }
  if (byteLength < 1 || byteLength > 140) {
    throw new Error(`Line byte length ${byteLength} is outside 1-140`);
  }
}

function writeEntry(line: string): void {
  validateLine(line);
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), line, "utf8");
}

writeEntry(LINE);
