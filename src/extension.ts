import { existsSync } from 'fs';
import * as path from 'path';
import { workspace, ExtensionContext } from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions
} from 'vscode-languageclient/node';
import { downloadAndExtractTarFromUrl, getFregeStartScriptPath, getFregeTarGithubUrl } from './frege-server';

let client: LanguageClient;
const FREGE_SERVER_NAME = 'frege-lsp-server';
const FREGE_SERVER_VERSION = '2.1.8-alpha'
const DEFAULT_FREGE_SERVER_DIR = '.frege'

export async function activate(context: ExtensionContext) {
	const fregeServerStartScriptPath = context.asAbsolutePath(
		path.join(DEFAULT_FREGE_SERVER_DIR, getFregeStartScriptPath(FREGE_SERVER_NAME, FREGE_SERVER_VERSION)));
	if (!existsSync(fregeServerStartScriptPath)) {
		const downloadUrl = getFregeTarGithubUrl(FREGE_SERVER_NAME, FREGE_SERVER_VERSION);
		await downloadAndExtractTarFromUrl(downloadUrl, context.asAbsolutePath(DEFAULT_FREGE_SERVER_DIR));
	}

	let fregeServerOptions: ServerOptions = {
		run: { command: "sh", args: [ fregeServerStartScriptPath ] },
		debug: {
			command: "sh", args: [fregeServerStartScriptPath],
			options: { env: process.env['JAVA_OPTS'] = "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=localhost:6008,quiet=y" }
		}
	}

	let clientOptions: LanguageClientOptions = {
		// Register the server for plain text documents
		documentSelector: [{ scheme: 'file', language: 'frege' }],
		synchronize: {
			fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
		}
	};

	client = new LanguageClient(
		FREGE_SERVER_NAME,
		'frege lsp server',
		fregeServerOptions,
		clientOptions
	);

	// Start the client. This will also launch the server
	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
