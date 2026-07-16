const fs = require("node:fs");
const path = require("node:path");

// PM2 always starts this stable file. Each worker resolves the current release
// once at boot, so graceful reloads can switch the symlink without making
// running workers depend on a directory that may later be pruned.
const currentLink = path.join(__dirname, ".deploy", "current");
const releaseRoot = fs.realpathSync(currentLink);
const nextBinary = path.join(
  releaseRoot,
  "node_modules",
  "next",
  "dist",
  "bin",
  "next",
);

if (!fs.existsSync(nextBinary)) {
  throw new Error(`Next.js executable not found in active release: ${nextBinary}`);
}

process.chdir(releaseRoot);
process.argv = [process.execPath, nextBinary, "start"];

require(nextBinary);
