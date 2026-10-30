import { createHash } from "node:crypto";
import { readdirSync, statSync, existsSync, readFileSync } from "node:fs";
import { join, relative, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function walk(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(path));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(path);
    }
  }
  return files;
}

function walkFiles(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(path));
    } else if (entry.isFile()) {
      files.push(path);
    }
  }
  return files;
}

function relativePath(path) {
  return relative(root, path).split("\\").join("/");
}

function isLecture(path) {
  return /^lectures\/([0-9]{2}-[a-z0-9-]+)\/\1\.md$/.test(relativePath(path));
}

function isAssignment(path) {
  return /^assignments\/([0-9]{2})\/\1\.md$/.test(relativePath(path));
}

function isImage(path) {
  return /\.(png|jpe?g|gif|webp|svg)$/i.test(path);
}

function sourceFiles() {
  return [
    ...walk(join(root, "lectures")).filter(isLecture),
    ...walk(join(root, "assignments")).filter(isAssignment),
  ].sort();
}

function pdfPath(source) {
  return join(dirname(source), source.split(/[\\/]/).pop().replace(/\.md$/, ".pdf"));
}

function checkImages(source) {
  const markdown = readFileSync(source, "utf8");
  const imagePattern = /!\[[^\]]*\]\(\s*<?([^>\s)]+)>?/g;
  const missing = [];
  const outsideAssets = [];
  for (const match of markdown.matchAll(imagePattern)) {
    const reference = match[1];
    if (/^(https?:|data:|#)/i.test(reference)) continue;
    const localReference = decodeURIComponent(reference.split(/[?#]/, 1)[0]);
    const imagePath = resolve(dirname(source), localReference);
    if (!existsSync(imagePath)) missing.push(reference);
    if (isLecture(source)) {
      const relativeToLecture = relative(dirname(source), imagePath)
        .split("\\")
        .join("/");
      if (
        relativeToLecture !== "assets" &&
        !relativeToLecture.startsWith("assets/")
      ) {
        outsideAssets.push(reference);
      }
    }
  }
  return { missing, outsideAssets };
}

function assignmentMarpDirectiveFailures(source) {
  const markdown = readFileSync(source, "utf8");
  const failures = [];
  if (/(?:^|\n)\s*marp\s*:\s*true\s*(?:\r?\n|$)/i.test(markdown)) {
    failures.push(`${relativePath(source)}: assignments must not use marp: true`);
  }
  if (/<!--\s*_class\s*:/i.test(markdown)) {
    failures.push(`${relativePath(source)}: assignments must not use Marp _class directives`);
  }
  return failures;
}

function sha256(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function duplicateImageWarnings() {
  const byHash = new Map();
  for (const path of walkFiles(join(root, "lectures")).filter(isImage)) {
    const hash = sha256(path);
    const paths = byHash.get(hash) ?? [];
    paths.push(path);
    byHash.set(hash, paths);
  }

  return [...byHash.entries()]
    .filter(([, paths]) => paths.length > 1)
    .map(([hash, paths]) => ({
      hash,
      paths: paths.map(relativePath).sort(),
    }));
}

function sourcesFailures() {
  const failures = [];
  const lecturesRoot = join(root, "lectures");
  for (const entry of readdirSync(lecturesRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const assets = join(lecturesRoot, entry.name, "assets");
    if (existsSync(assets) && !existsSync(join(assets, "SOURCES.md"))) {
      failures.push(`${relativePath(assets)}: SOURCES.md is missing`);
    }
  }
  return failures;
}

const sources = sourceFiles();
const failures = [];

for (const source of sources) {
  const imageCheck = checkImages(source);
  for (const reference of imageCheck.missing) {
    failures.push(`${relativePath(source)}: missing local image ${reference}`);
  }
  for (const reference of imageCheck.outsideAssets) {
    failures.push(
      `${relativePath(source)}: local image is outside assets/: ${reference}`,
    );
  }

  if (isAssignment(source)) {
    failures.push(...assignmentMarpDirectiveFailures(source));
  }

  const pdf = pdfPath(source);
  if (!existsSync(pdf)) {
    failures.push(`${relativePath(source)}: corresponding PDF is missing`);
    continue;
  }

  const markdownTime = statSync(source).mtimeMs;
  const pdfTime = statSync(pdf).mtimeMs;
  if (pdfTime < markdownTime) {
    failures.push(`${relativePath(source)}: PDF is older than Markdown`);
  }

}

failures.push(...sourcesFailures());

const assignmentReadmes = walk(join(root, "assignments")).filter((path) =>
  /\/README\.md$/.test(path),
);
const generatedAssignmentSources = new Set(
  sources.filter(isAssignment).map((path) => relativePath(path)),
);
for (const readme of assignmentReadmes) {
  if (generatedAssignmentSources.has(relativePath(readme))) {
    failures.push(`${relativePath(readme)}: evaluation README must not be a PDF target`);
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

const duplicates = duplicateImageWarnings();
if (duplicates.length > 0) {
  console.warn("Image SHA-256 duplicates (warning only):");
  for (const duplicate of duplicates) {
    console.warn(`- ${duplicate.hash}`);
    for (const path of duplicate.paths) console.warn(`  - ${path}`);
  }
}

console.log(`Checked ${sources.length} material Markdown file(s).`);
console.log("- corresponding PDFs exist and are not older than Markdown");
console.log("- local image references exist");
console.log("- lecture local image references stay under assets/");
console.log("- lecture assets/SOURCES.md files exist");
console.log("- assignment README.md files are excluded");
console.log("- assignment Markdown files do not use Marp directives");
