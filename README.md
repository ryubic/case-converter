# Case Converter CLI

A lightweight, zero-dependency Node.js CLI tool that converts text strings across different casing formats (such as `camelCase`, `snake_case`, `kebab-case`, and `Title Case`) and automatically copies the result to your system clipboard.

## Usage

```bash
node script.js [flag] "your text here"

```

### Example

```bash
node script.js -cam "hello world application"
# Output: helloWorldApplication (and copied to clipboard)

```

## Available Flags

* `-keb` (default) → `kebab-case`
* `-cam` → `camelCase`
* `-pas` → `PascalCase`
* `-sna` → `snake_case`
* `-ssna` → `SCREAMING_SNAKE_CASE`
* `-tra` → `TRAIN-CASE`
* `-dot` → `dot.case`
* `-pat` → `path/case`
* `-low` → `lowercase`
* `-upp` → `UPPERCASE`
* `-tit` → `Title Case`
* `-sen` → `Sentence case`