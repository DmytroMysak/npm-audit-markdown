import { Command } from 'commander';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { readFileSync } from 'node:fs';

// eslint-disable-next-line import/no-unresolved, import/extensions
import { generateReportFile, saveReportFile, getNpmAuditReport } from './lib/report.js';

const pathToFile = resolve(dirname(fileURLToPath(import.meta.url)), '../../package.json');
const packageJson = JSON.parse(readFileSync(pathToFile, { encoding: 'utf8' }));
const program = new Command();
let stdin = '';

program
  .version(packageJson.version)
  .option('-o, --output [output]', 'output file')
  .option('-i, --input [input]', 'input file')
  .action(async (cmd) => {
    try {
      const jsonReport = await getNpmAuditReport(stdin, cmd.input);
      const content = await generateReportFile(jsonReport);
      await saveReportFile(content, cmd.output ?? 'npm-audit.md');

      process.exit(0);
    } catch (error: any) {
      console.error(error.message);
      process.exit(1);
    }
  });

if (process.stdin.isTTY) {
  program.parse(process.argv);
} else {
  process.stdin.on('readable', () => {
    const chunk = (this as any)?.read();
    if (chunk !== null) {
      stdin += chunk;
    }
  });
  process.stdin.on('end', () => program.parse(process.argv));
}
