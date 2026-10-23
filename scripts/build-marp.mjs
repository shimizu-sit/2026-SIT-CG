import { readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, resolve, dirname, basename } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const theme = "themes/marp-themes/themes/sit-lecture.css";
const browserCandidates = [
  process.env.MARP_BROWSER_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
].filter(Boolean);
const browserPath = browserCandidates.find((path) => existsSync(path));
const marpCommand = join(
  root,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "marp.cmd" : "marp",
);

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

function lectureFiles() {
  return walk(join(root, "lectures")).filter(isLecture).sort();
}

function assignmentFiles() {
  return walk(join(root, "assignments")).filter(isAssignment).sort();
}

function outputPath(source) {
  return join(dirname(source), basename(source, ".md") + ".pdf");
}

function selectFiles(mode, argument) {
  if (mode === "lectures") return lectureFiles();
  if (mode === "assignments") return assignmentFiles();
  if (mode === "all") return [...lectureFiles(), ...assignmentFiles()];

  if (mode === "lecture") {
    if (!argument) {
      throw new Error("Usage: npm run build:lecture -- lectures/NN-topic/NN-topic.md");
    }
    const source = resolve(root, argument);
    if (!existsSync(source) || !isLecture(source)) {
      throw new Error(`Not a lecture Markdown path: ${argument}`);
    }
    return [source];
  }

  if (mode === "assignment") {
    if (!argument) {
      throw new Error("Usage: npm run build:assignment -- assignments/NN/NN.md");
    }
    const source = resolve(root, argument);
    if (!existsSync(source) || !isAssignment(source)) {
      throw new Error(`Not an assignment Markdown path: ${argument}`);
    }
    return [source];
  }

  throw new Error(`Unknown build target: ${mode}`);
}

const mode = process.argv[2] ?? "all";
const argument = process.argv[3];

if (!existsSync(marpCommand)) {
  throw new Error("Local Marp CLI is not installed. Run: npm install");
}

const sources = selectFiles(mode, argument);
if (sources.length === 0) {
  throw new Error(`No Markdown files matched build target: ${mode}`);
}

for (const source of sources) {
  const output = outputPath(source);
  const result = spawnSync(
    marpCommand,
    [
      "--pdf",
      "--allow-local-files",
      "--theme",
      theme,
      "--browser",
      "chrome",
      ...(browserPath ? ["--browser-path", browserPath] : []),
      "--output",
      output,
      source,
    ],
    { cwd: root, stdio: "inherit" },
  );

  if (result.error) throw result.error;
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log(`Generated ${sources.length} PDF file(s).`);
