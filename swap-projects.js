import {readdir, rename, readFile, writeFile} from "node:fs/promises";
import path from "node:path";

const projectsDir = path.resolve("src/projects");

// ------------------------------------------------------------
// Parse arguments
// ------------------------------------------------------------

const args = process.argv.slice(2);

if (args.length !== 2) {
    console.error("Usage: pnpm swap-projects <num1> <num2>");
    process.exit(1);
}

const num1 = Number(args[0]);
const num2 = Number(args[1]);

if (
    !Number.isInteger(num1) ||
    !Number.isInteger(num2) ||
    num1 < 1 ||
    num2 < 1
) {
    console.error("Both arguments must be positive integers.");
    process.exit(1);
}

if (num1 === num2) {
    console.error("The two project numbers must be different.");
    process.exit(1);
}

// ------------------------------------------------------------
// Find projects
// ------------------------------------------------------------

const files = await readdir(projectsDir);

const projects = files.filter(file => /^\d{3}-.+\.md$/.test(file));

const filename1 = projects.find(
    file => Number(file.slice(0, 3)) === num1
);

const filename2 = projects.find(
    file => Number(file.slice(0, 3)) === num2
);

if (!filename1) {
    console.error(`Project ${num1} does not exist.`);
    process.exit(1);
}

if (!filename2) {
    console.error(`Project ${num2} does not exist.`);
    process.exit(1);
}

// ------------------------------------------------------------
// Temporary filenames
//
// We need temporary names because directly renaming A -> B
// would collide with the existing B.
// ------------------------------------------------------------

const tempFilename1 = `.__swap-project-${num1}.tmp`;
const tempFilename2 = `.__swap-project-${num2}.tmp`;

const path1 = path.join(projectsDir, filename1);
const path2 = path.join(projectsDir, filename2);

const tempPath1 = path.join(projectsDir, tempFilename1);
const tempPath2 = path.join(projectsDir, tempFilename2);

// ------------------------------------------------------------
// Extract the filename suffixes
//
// 002-infoplan.md -> infoplan.md
// 007-directory-handler.md -> directory-handler.md
// ------------------------------------------------------------

const suffix1 = filename1.replace(/^\d{3}-/, "");
const suffix2 = filename2.replace(/^\d{3}-/, "");

const newFilename1 =
    `${String(num1).padStart(3, "0")}-${suffix2}`;

const newFilename2 =
    `${String(num2).padStart(3, "0")}-${suffix1}`;

const newPath1 = path.join(projectsDir, newFilename1);
const newPath2 = path.join(projectsDir, newFilename2);

// ------------------------------------------------------------
// Read project contents
// ------------------------------------------------------------

let content1 = await readFile(path1, "utf8");
let content2 = await readFile(path2, "utf8");

// Update internal order.
content1 = content1.replace(
    /^order:\s*\d+\s*$/m,
    `order: ${num2}`
);

content2 = content2.replace(
    /^order:\s*\d+\s*$/m,
    `order: ${num1}`
);

// ------------------------------------------------------------
// Rename to temporary files
// ------------------------------------------------------------

await rename(path1, tempPath1);
await rename(path2, tempPath2);

// ------------------------------------------------------------
// Rename to final filenames
// ------------------------------------------------------------

await rename(tempPath1, newPath2);
await rename(tempPath2, newPath1);

// ------------------------------------------------------------
// Write updated order values
// ------------------------------------------------------------

await writeFile(newPath2, content1, "utf8");
await writeFile(newPath1, content2, "utf8");

console.log(
    `Swapped projects ${num1} and ${num2}.`
);