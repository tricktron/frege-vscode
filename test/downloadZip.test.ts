/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as assert from 'assert';
import { existsSync, PathLike } from 'fs';
import 'mocha';
import { it } from 'mocha';
import * as path from 'path';
import { getFregeTarGithubUrl, downloadAndExtractTarFromUrl, getFregeStartScriptPath } from '../src/fregeServer';

const fregeServerName = 'frege-lsp-server';
const version = '2.1.8-alpha';

const assertSystemPath = (actual: PathLike, expected: PathLike) => {
	if (process.platform === 'win32') {
		expected = `${expected}.bat`;
	}
	assert.strictEqual(actual, expected);
}

describe('Given frege server github release url', () => {

	it('Then it downloads and extracts the frege server tar', async () => {
		const url = getFregeTarGithubUrl(fregeServerName, version);
		const downloadDir = path.join(__dirname, '.frege');
		await downloadAndExtractTarFromUrl(url, downloadDir);
		assert.ok(existsSync(path.join(downloadDir, getFregeStartScriptPath(fregeServerName, version))));
	}).timeout(10000);
});

describe('Given frege server name and the frege version', () => {
	it('Then it can create the path to the frege start script dynamically', () => {
		const expectedStartScriptPath = path.normalize(`${fregeServerName}-${version}/bin/${fregeServerName}`);
		assertSystemPath((getFregeStartScriptPath(fregeServerName, version)), expectedStartScriptPath);
	});
	it('Then it can create the github release url to the frege tar archive dynamically', () => {
		const expectedDownloadUrl = `https://github.com/tricktron/${fregeServerName}/releases/download/v${version}/${fregeServerName}-${version}.tar`;
		assert.strictEqual((getFregeTarGithubUrl(fregeServerName, version)), expectedDownloadUrl);
	});
});
