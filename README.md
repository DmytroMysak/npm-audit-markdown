# npm-audit-markdown

A simple tool to create an NPM audit report in markdown language. Especially useful to post reports to communicators supporting markdown. Just make more suitable for CI

## Getting Started

```bash script
npm install -g npm-audit-markdown
```

## Usage

To generate a report, run the following:

```bash script
npm audit --json | npm-audit-markdown
```

By default the report will be saved to npm-audit.md

If you want to specify the output file, add the --output option:

```bash script
npm audit --json | npm-audit-markdown --output report.md
```

## CI

```bash script
npm audit --json | npx npm-audit-markdown --output report.md
```

## Acknowledgements

Forked from https://gitlab.com/engrave/npm-audit-markdown

## Licence
MIT
