/* eslint-disable import/no-unresolved,import/extensions */
import chalk from 'chalk';
import { writeFile } from 'fs/promises';
import { readFile } from 'node:fs/promises';

import doT from 'dot';
import v6 from './parsers/v6.js';
import v7 from './parsers/v7.js';
import template from './template.js';
import type { NormalizedAuditReport } from './NormalizedAuditReport.js';

function parseJsonSafe(json: string): Record<string, unknown> {
  try {
    return JSON.parse(json);
  } catch (e) {
    console.error('Failed to parse NPM Audit JSON!');
    return process.exit(1);
  }
}

function renderTemplate(data: NormalizedAuditReport) {
  const renderer = doT.template(template, {
    evaluate: /{{([\s\S]+?)}}/g,
    interpolate: /{{=([\s\S]+?)}}/g,
    encode: /\{\{!([\s\S]+?)\}\}/g,
    use: /\{\{#([\s\S]+?)\}\}/g,
    define: /{{##\s*([\w.$]+)\s*(:|=)([\s\S]+?)#}}/g,
    conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
    iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*:\s*([\w$]+)\s*(?::\s*([\w$]+))?\s*\}\})/g,
    varname: 'it',
    useParams: undefined as any,
    defineParams: undefined as any,
    strip: false,
    append: true,
    selfcontained: false,
  });

  return renderer(data);
}

export async function getNpmAuditReport(stdin?: string, pathToFile?: string): Promise<Record<string, unknown>> {
  if (pathToFile) {
    return parseJsonSafe(await readFile(pathToFile, { encoding: 'utf8' }));
  }
  if (stdin) {
    return parseJsonSafe(stdin);
  }
  console.error('No input provided. Please provide either a path to a file or a JSON string.');
  return process.exit(1);
}

export async function generateReportFile(input?: Record<string, unknown>): Promise<string> {
  if (!input) {
    throw new Error('No JSON provided');
  }
  if (!input.metadata && input.updated) {
    throw new Error(`Sorry! You can't use ${chalk.underline('npm audit fix')} with @netly/npm-audit-markdown.`);
  }
  if (!input.metadata) {
    throw new Error(
      `The provided data doesn't seem to be correct. Did you run with ${chalk.underline('npm audit --json')}?`
    );
  }

  const parser = input.auditReportVersion ? v7 : v6;
  const data = parser(input);

  return renderTemplate(data);
}

export async function saveReportFile(content: string, filepath: string) {
  await writeFile(filepath, content);

  console.log(`Vulnerability snapshot saved at ${filepath}`);
}
