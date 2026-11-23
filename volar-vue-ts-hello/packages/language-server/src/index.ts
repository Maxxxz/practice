import { createConnection, createServer, createTypeScriptProject, loadTsdkByPath } from '@volar/language-server/node';
import { createParsedCommandLine, createVueLanguagePlugin, getDefaultCompilerOptions } from '@vue/language-core';
import { create as createCssService } from 'volar-service-css';
import { create as createEmmetService } from 'volar-service-emmet';
import { create as createHtmlService } from 'volar-service-html';
import { create as createTypeScriptServices } from 'volar-service-typescript';

const connection = createConnection();
const server = createServer(connection);

connection.listen();

connection.onInitialize(params => {
	const tsdk = loadTsdkByPath(params.initializationOptions.typescript.tsdk, params.locale);
	return server.initialize(
		params,
		createTypeScriptProject(tsdk.typescript, tsdk.diagnosticMessages, (projectContext) => {
			const parsed = projectContext.configFileName
				? createParsedCommandLine(tsdk.typescript, projectContext.sys, projectContext.configFileName)
				: { options: {}, vueOptions: getDefaultCompilerOptions() };

			const vueLanguagePlugin = createVueLanguagePlugin(
				tsdk.typescript,
				parsed.options,
				parsed.vueOptions,
				projectContext.uriConverter.asFileName,
			);

			return {
				languagePlugins: [vueLanguagePlugin],
			};
		}),
		[
			createHtmlService(),
			createCssService(),
			createEmmetService(),
			...createTypeScriptServices(tsdk.typescript),
		],
	);
});

connection.onInitialized(server.initialized);

connection.onShutdown(server.shutdown);
