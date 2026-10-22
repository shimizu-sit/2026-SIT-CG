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

function relativePath(path) {
  return relative(root, path).split("\\").join("/");
}

function isLecture(path) {
  return /^lectures\/([0-9]{2}-[a-z0-9-]+)\/\1\.md$/.test(relativePath(path));
}

function isAssignment(path) {
  return /^assignments\/([0-9]{2})\/\1\.md$/.test(relativePath(path));
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
  for (const match of markdown.matchAll(imagePattern)) {
    const reference = match[1];
    if (/^(https?:|data:|#)/i.test(reference)) continue;
    const localReference = decodeURIComponent(reference.split(/[?#]/, 1)[0]);
    const imagePath = resolve(dirname(source), localReference);
    if (!existsSync(imagePath)) missing.push(reference);
  }
  return missing;
}

const sources = sourceFiles();
const failures = [];

for (const source of sources) {
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

  for (const reference of checkImages(source)) {
    failures.push(`${relativePath(source)}: missing local image ${reference}`);
  }
}

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

console.log(`Checked ${sources.length} material Markdown file(s).`);
console.log("- corresponding PDFs exist and are not older than Markdown");
console.log("- local image references exist");
console.log("- assignment README.md files are excluded");
