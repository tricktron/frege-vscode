/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as assert from 'assert';
import { existsSync, rmdirSync } from 'fs';
import 'mocha';
import { it } from 'mocha';
import * as path from 'path';
import { getFregeTarGithubUrl, downloadAndExtractTarFromUrl, getFregeStartScriptPath } from '../src/frege-server';

describe('Given frege server github release url', () => {

	it('Then it downloads and extracts the frege server tar', async () => {
		const fregeServerName = 'frege-lsp-server';
		const version = '1.0.0-alpha';
		const url = getFregeTarGithubUrl(fregeServerName, version);
		const downloadDir = path.join(__dirname, '.frege');
		await downloadAndExtractTarFromUrl(url, downloadDir);
		assert.ok(existsSync(path.join(downloadDir, getFregeStartScriptPath(fregeServerName, version))));
		rmdirSync(downloadDir, { recursive: true });
	});
});

describe('Given frege server name and the frege version', () => {
	it('Then it can create the path to the frege start script dynamically', () => {
		const fregeServerName = 'frege-lsp-server';
		const version = '1.0.0-alpha';
		const expectedPath = 'frege-lsp-server-1.0.0-alpha/bin/frege-lsp-server';
		assert.strictEqual((getFregeStartScriptPath(fregeServerName, version)), expectedPath);
	});
	it('Then it can create the github release url to the frege tar archive dynamically', () => {
		const fregeServerName = 'frege-lsp-server';
		const version = '1.0.0-alpha';
		const expectedDownloadUrl = 'https://github.com/tricktron/frege-lsp-server/releases/download/v1.0.0-alpha/frege-lsp-server-1.0.0-alpha.tar';
		assert.strictEqual((getFregeTarGithubUrl(fregeServerName, version)), expectedDownloadUrl);
	});
});