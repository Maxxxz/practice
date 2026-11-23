import * as serverProtocol from '@volar/language-server/protocol';
import { activateAutoInsertion, createLabsInfo, getTsdk } from '@volar/vscode';
import { BaseLanguageClient, LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from '@volar/vscode/node';
import * as vscode from 'vscode';

let client: BaseLanguageClient;

export async function activate(context: vscode.ExtensionContext) {

	const serverModule = vscode.Uri.joinPath(context.extensionUri, 'dist', 'server.js');
	const runOptions = { execArgv: <string[]>[] };
	const debugOptions = { execArgv: ['--nolazy', '--inspect=' + 6009] };
	const serverOptions: ServerOptions = {
		run: {
			module: serverModule.fsPath,
			transport: TransportKind.ipc,
			options: runOptions
		},
		debug: {
			module: serverModule.fsPath,
			transport: TransportKind.ipc,
			options: debugOptions
		},
	};
	const clientOptions: LanguageClientOptions = {
		documentSelector: [{ language: 'vue' }],
		initializationOptions: {
			typescript: {
				tsdk: (await getTsdk(context))!.tsdk,
			},
		},
	};
	client = new LanguageClient(
		'vue-hello-language-server',
		'Vue Hello Language Server',
		serverOptions,
		clientOptions,
	);
	await client.start();

	activateAutoInsertion('vue', client);

	const labsInfo = createLabsInfo(serverProtocol);
	labsInfo.addLanguageClient(client);
	return labsInfo.extensionExports;
}

export function deactivate(): Thenable<any> | undefined {
	return client?.stop();
}
