import {generateAndSaveReportFile} from '../src/lib/report';
import * as npmAudit6 from './test-data/npm-audit-6.json';
import * as npmAudit7 from './test-data/npm-audit-7.json';
import * as npmAudit6Clean from './test-data/npm-audit-clean-6.json';
import * as npmAudit7Clean from './test-data/npm-audit-clean-7.json';
import * as mockFs from 'mock-fs';
import {readFileSync} from 'fs-extra';
import {expect} from 'chai';
import * as chalk from 'chalk';

describe('generateAndSaveReportFile', () => {

    afterEach(() => {
        mockFs.restore();
    });

    it('should throw error when no npm audit report is provided', async () => {
        try {
            await generateAndSaveReportFile(undefined, 'output.md');
            expect.fail('Should throw error');
        } catch (error) {
            expect(error.message).to.equal('No JSON provided');
        }
    });

    it('should throw error when nom audit was run with fix option', async () => {
        try {
            await generateAndSaveReportFile({updated: true}, 'output.md');
            expect.fail('Should throw error');
        } catch (error) {
            expect(error.message).to.equal(`Sorry! You can't use ${chalk.underline('npm audit fix')} with npm-audit-markdown.`);
        }
    });

    it('should throw error when npm audit report is not valid', async () => {
        try {
            await generateAndSaveReportFile({}, 'output.md');
            expect.fail('Should throw error');
        } catch (error) {
            expect(error.message).to.equal(`The provided data doesn't seem to be correct. Did you run with ${chalk.underline('npm audit --json')}?`);
        }
    });

    it('should generate proper markdown file for v6 npm audit report', async () => {
        mockFs({});
        const expectedResult = mockFs.bypass(() => readFileSync(`${__dirname}/expected-results/npm-audit-6-result.md`, 'utf8'));
        await generateAndSaveReportFile(npmAudit6, 'output.md');
        const generatedResult = readFileSync('output.md', 'utf8');
        expect(generatedResult).to.equal(expectedResult);
    });

    it('should generate proper markdown file for clean v6 npm audit report', async () => {
        mockFs({});
        const expectedResult = mockFs.bypass(() => readFileSync(`${__dirname}/expected-results/npm-audit-clean-6-result.md`, 'utf8'));
        await generateAndSaveReportFile(npmAudit6Clean, 'output.md');
        const generatedResult = readFileSync('output.md', 'utf8');
        expect(generatedResult).to.equal(expectedResult);
    });

    it('should generate proper markdown file for v7 npm audit report', async () => {
        mockFs({});
        const expectedResult = mockFs.bypass(() => readFileSync(`${__dirname}/expected-results/npm-audit-7-result.md`, 'utf8'));
        await generateAndSaveReportFile(npmAudit7, 'output.md');
        const generatedResult = readFileSync('output.md', 'utf8');
        expect(generatedResult).to.equal(expectedResult);
    });

    it('should generate proper markdown file for clean v6 npm audit report', async () => {
        mockFs({});
        const expectedResult = mockFs.bypass(() => readFileSync(`${__dirname}/expected-results/npm-audit-clean-7-result.md`, 'utf8'));
        await generateAndSaveReportFile(npmAudit7Clean, 'output.md');
        const generatedResult = readFileSync('output.md', 'utf8');
        expect(generatedResult).to.equal(expectedResult);
    });



});
