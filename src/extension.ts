import { existsSync } from 'fs';
import * as path from 'path';
import { workspace, ExtensionContext, languages, commands, window, env, Terminal } from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions
} from 'vscode-languageclient/node';
import { downloadAndExtractTarFromUrl, getFregeStartScriptPath, getFregeTarGithubUrl } from './fregeServer';
import { FREGE_REPL_CODELENS_COMMNAND, FREGE_RUN_CODELENS_COMMNAND, MainCodeLensProvider } from './mainCodeLensProvider';

let client: LanguageClient;
const FREGE_SERVER_NAME = 'frege-lsp-server';
const FREGE_SERVER_VERSION = '4.1.3-alpha'
const DEFAULT_FREGE_SERVER_DIR = '.frege'
const FREGE_RUN_TERMINAL_NAME = 'Frege Run';
const FREGE_REPL_TERMINAL_NAME = 'Frege Repl';

const getAbsoluteFregeServerPath = async (context: ExtensionContext): Promise<string> => {
	const absolutePath = context.asAbsolutePath(
		path.join(DEFAULT_FREGE_SERVER_DIR, getFregeStartScriptPath(FREGE_SERVER_NAME, FREGE_SERVER_VERSION)));
	if (existsSync(absolutePath)) {
		return absolutePath;
	} else {
		const downloadUrl = getFregeTarGithubUrl(FREGE_SERVER_NAME, FREGE_SERVER_VERSION);
		await downloadAndExtractTarFromUrl(downloadUrl, context.asAbsolutePath(DEFAULT_FREGE_SERVER_DIR));
		return absolutePath;
	}
};

export async function activate(context: ExtensionContext) {
	const fregeServerPath = await getAbsoluteFregeServerPath(context);
	let fregeServerOptions: ServerOptions = {
		run: { command: 'sh', args: [fregeServerPath] },
		debug: {
			command: 'sh', args: [process.env.LOCAL_FREGE_SERVER_PATH ? process.env.LOCAL_FREGE_SERVER_PATH : fregeServerPath],
		}
	}

	let clientOptions: LanguageClientOptions = {
		documentSelector: [{ scheme: 'file', language: 'frege' }],
		synchronize: {
			fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
		}
	};

	client = new LanguageClient(
		FREGE_SERVER_NAME,
		'Frege LSP Server',
		fregeServerOptions,
		clientOptions
	);

	languages.registerCodeLensProvider(clientOptions.documentSelector, new MainCodeLensProvider());
	commands.registerCommand(FREGE_RUN_CODELENS_COMMNAND, (args: any) =>
    {
		const terminal = getFregeTerminal(FREGE_RUN_TERMINAL_NAME);
		terminal.show();
		terminal.sendText(`gradle clean runFrege ${args}`);
	});

	commands.registerCommand(FREGE_REPL_CODELENS_COMMNAND, (args: any) =>
    {
		const terminal = getFregeTerminal(FREGE_REPL_TERMINAL_NAME);
		terminal.show();
		terminal.sendText(`eval $(gradle -q clean replFrege ${args})`);
	});

	// Start the client. This will also launch the server
	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}

const getFregeTerminal = (name: string): Terminal => {
	const fregeTerminal = window.terminals.find(terminal => terminal.name === name);
	return fregeTerminal === undefined ? window.createTerminal(name) : fregeTerminal;
}
