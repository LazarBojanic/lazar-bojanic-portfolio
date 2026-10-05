import {readdir, rename, readFile, writeFile} from "node:fs/promises";
import path from "node:path";

const projectsDir = path.resolve("src/projects");

// ------------------------------------------------------------
// Parse arguments
// ------------------------------------------------------------

const args = process.argv.slice(2);

let position = null;
let title = null;
const positional = [];

for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "--") {
        positional.push(...args.slice(i + 1));
        break;
    }

    // --title=value / --position=value
    if (arg.startsWith("--")) {
        const option = arg.slice(2);

        if (option.includes("=")) {
            const [key, ...valueParts] = option.split("=");
            const value = valueParts.join("=");

            if (key === "title") {
                if (title !== null) {
                    console.error("Title specified more than once.");
                    process.exit(1);
                }

                title = value;
            } else if (key === "position") {
                if (position !== null) {
                    console.error("Position specified more than once.");
                    process.exit(1);
                }

                position = Number(value);
            } else {
                console.error(`Unknown option: --${key}`);
                process.exit(1);
            }

            continue;
        }

        // --title value / --position value
        if (option === "title" || option === "position") {
            const value = args[++i];

            if (value === undefined) {
                console.error(`Missing value for --${option}.`);
                process.exit(1);
            }

            if (option === "title") {
                if (title !== null) {
                    console.error("Title specified more than once.");
                    process.exit(1);
                }

                title = value;
            } else {
                if (position !== null) {
                    console.error("Position specified more than once.");
                    process.exit(1);
                }

                position = Number(value);
            }

            continue;
        }

        console.error(`Unknown option: --${option}`);
        process.exit(1);
    }

    positional.push(arg);
}

// ------------------------------------------------------------
// Parse positional arguments
//
// 0 args:
//     append, default title
//
// 1 number:
//     insert at position, default title
//
// 1 string:
//     append, given title
//
// 2 args:
//     number + title
// ------------------------------------------------------------

if (positional.length > 2) {
    console.error("Too many positional arguments.");
    process.exit(1);
}

if (positional.length === 1) {
    const arg = positional[0];

    if (/^\d+$/.test(arg)) {
        if (position !== null) {
            console.error("Position specified more than once.");
            process.exit(1);
        }

        position = Number(arg);
    } else {
        if (title !== null) {
            console.error("Title specified more than once.");
            process.exit(1);
        }

        title = arg;
    }
}

if (positional.length === 2) {
    if (!/^\d+$/.test(positional[0])) {
        console.error(
            "When using two positional arguments, the first must be a number."
        );
        process.exit(1);
    }

    if (position !== null) {
        console.error("Position specified more than once.");
        process.exit(1);
    }

    if (title !== null) {
        console.error("Title specified more than once.");
        process.exit(1);
    }

    position = Number(positional[0]);
    title = positional[1];
}

// ------------------------------------------------------------
// Validate position
// ------------------------------------------------------------

if (
    position !== null &&
    (!Number.isInteger(position) || position < 1)
) {
    console.error("Position must be a positive integer.");
    process.exit(1);
}

// ------------------------------------------------------------
// Read existing projects
// ------------------------------------------------------------

const files = await readdir(projectsDir);

const projects = files
    .filter(file => /^\d{3}-.+\.md$/.test(file))
    .sort((a, b) => {
        const numberA = Number(a.slice(0, 3));
        const numberB = Number(b.slice(0, 3));

        return numberA - numberB;
    });

const projectCount = projects.length;

// No position = append.
if (position === null) {
    position = projectCount + 1;
}

if (position > projectCount + 1) {
    console.error(
        `Position ${position} is invalid. ` +
        `Valid positions are 1-${projectCount + 1}.`
    );
    process.exit(1);
}

// ------------------------------------------------------------
// Determine project number
// ------------------------------------------------------------

const projectNumber = String(position).padStart(3, "0");

// ------------------------------------------------------------
// Determine title and filename
// ------------------------------------------------------------

let filename;

if (title === null) {
    title = "New Project";

    // Try:
    //
    // 012-new-project.md
    // 012-new-project-001.md
    // 012-new-project-002.md
    // ...

    const baseFilename = `${projectNumber}-new-project`;

    let suffix = 0;

    while (true) {
        const suffixString =
            suffix === 0
                ? ""
                : `-${String(suffix).padStart(3, "0")}`;

        filename = `${baseFilename}${suffixString}.md`;

        if (!files.includes(filename)) {
            break;
        }

        suffix++;
    }
} else {
    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    if (!slug) {
        console.error("Title produces an invalid filename.");
        process.exit(1);
    }

    filename = `${projectNumber}-${slug}.md`;

    if (files.includes(filename)) {
        console.error(`Project already exists: ${filename}`);
        process.exit(1);
    }
}

// ------------------------------------------------------------
// Shift existing projects forward
// ------------------------------------------------------------

for (let i = projects.length - 1; i >= position - 1; i--) {
    const oldFilename = projects[i];

    const oldNumber = String(i + 1).padStart(3, "0");
    const newNumber = String(i + 2).padStart(3, "0");

    const newFilename = oldFilename.replace(
        new RegExp(`^${oldNumber}-`),
        `${newNumber}-`
    );

    const oldPath = path.join(projectsDir, oldFilename);
    const newPath = path.join(projectsDir, newFilename);

    // Rename the file.
    await rename(oldPath, newPath);

    // Update its order value.
    let content = await readFile(newPath, "utf8");

    content = content.replace(
        /^order:\s*\d+\s*$/m,
        `order: ${i + 2}`
    );

    await writeFile(newPath, content, "utf8");
}

// ------------------------------------------------------------
// Create project from template
// ------------------------------------------------------------

const template = `---
title: "${title}"
description: ""
image: ""
url: ""
tags: []
date: "${new Date().toISOString().slice(0, 10)}"
order: ${position}
---
`;

await writeFile(
    path.join(projectsDir, filename),
    template,
    "utf8"
);

console.log(`Created ${filename}`);