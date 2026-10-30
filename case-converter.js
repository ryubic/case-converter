#!/usr/bin/env node

import { execFileSync } from "node:child_process";

function copyToClipboard(text) {
  const platform = process.platform;

  try {
    switch (platform) {
      case "win32":
        execFileSync("clip", [], { input: text });
        break;

      case "linux":
        try {
          execFileSync("wl-copy", [], { input: text });
        } catch {
          execFileSync("xclip", ["-selection", "clipboard"], { input: text });
        }
        break;

      case "darwin":
        execFileSync("pbcopy", [], { input: text });
        break;

      default:
        throw new Error("Unsupported platform");
    }
  } catch (err) {
    console.error("Failed to copy to clipboard:", err.message);
  }
}

function convertCase(string, targetCase) {
  const words = string
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((word) => word.toLowerCase());

  const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

  if (words.length === 0 || words[0] === "") return string;

  switch (targetCase) {
    case "lowercase":
      return words.join(" ");

    case "UPPERCASE":
      return words.join(" ").toUpperCase();

    case "camelCase":
      return words[0] + words.slice(1).map(capitalize).join("");

    case "PascalCase":
      return words.map(capitalize).join("");

    case "snake_case":
      return words.join("_");

    case "SCREAMING_SNAKE_CASE":
      return words.join("_").toUpperCase();

    case "kebab-case":
      return words.join("-");

    case "TRAIN-CASE":
      return words.map(capitalize).join("-").toUpperCase();

    case "dot.case":
      return words.join(".");

    case "path/case":
      return words.join("/");

    case "Title Case":
      return words.map(capitalize).join(" ");

    case "Sentence case":
      return capitalize(words.join(" "));

    default:
      return string;
  }
}

const rawArgs = process.argv.slice(2);
let targetCase = "kebab-case"; // default
const positionalArgs = [];

for (const arg of rawArgs) {
  if (arg.startsWith("-")) {
    switch (arg) {
      case "-low":
        targetCase = "lowercase";
        break;
      case "-upp":
        targetCase = "UPPERCASE";
        break;
      case "-cam":
        targetCase = "camelCase";
        break;
      case "-pas":
        targetCase = "PascalCase";
        break;
      case "-sna":
        targetCase = "snake_case";
        break;
      case "-ssna":
        targetCase = "SCREAMING_SNAKE_CASE";
        break;
      case "-keb":
        targetCase = "kebab-case";
        break;
      case "-tra":
        targetCase = "TRAIN-CASE";
        break;
      case "-dot":
        targetCase = "dot.case";
        break;
      case "-pat":
        targetCase = "path/case";
        break;
      case "-tit":
        targetCase = "Title Case";
        break;
      case "-sen":
        targetCase = "Sentence case";
        break;
      default:
        console.error(`Unknown argument: ${arg}`);
        process.exit(1);
    }
  } else {
    positionalArgs.push(arg);
  }
}

const string = positionalArgs.join(" ").trim();

if (!string) {
  console.log("Please enter a non-empty valid string.");
  process.exit(1);
}

const convertedString = convertCase(string, targetCase);
console.log(convertedString);
copyToClipboard(convertedString);
