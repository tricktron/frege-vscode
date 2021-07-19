import * as path from 'path';
import * as https from 'https';
import { extract, Extract } from 'tar-fs';

export function getFregeStartScriptPath(fregeServerName: string, version: string): string {
	return path.join(`${fregeServerName}-${version}`, 'bin', fregeServerName);
}

export function getFregeTarGithubUrl(fregeServername: string, version: string): string {
	const githubReleaseBasePath = 'https://github.com/tricktron/frege-lsp-server/releases/download';
	return `${githubReleaseBasePath}/v${version}/${fregeServername}-${version}.tar`;
}

export function downloadAndExtractTarFromUrl(url: string, downloadDir: string): Promise<Extract> {
	return new Promise((resolve, reject) => {
		https.get(url, message => {
			const { statusCode, headers } = message;
			if (statusCode === 301 || statusCode === 302) {
				resolve(downloadAndExtractTarFromUrl(headers.location, downloadDir));
			} else {
				const writeStream = message.pipe(extract(downloadDir));
				message.resume();
				message.on('error', e => {
					reject(new Error(e.message));
				});
				message.on('end', () => {
					writeStream.on('error', e => reject(e));
					writeStream.on('finish', () => resolve(writeStream));
				});
			}
		});
	});
}