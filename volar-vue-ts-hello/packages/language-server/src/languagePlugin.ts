import { CodeMapping, forEachEmbeddedCode, LanguagePlugin, VirtualCode } from '@volar/language-core';
import type { TypeScriptExtraServiceScript } from '@volar/typescript';
import type * as ts from 'typescript';
import { URI } from 'vscode-uri';
import { parseSfc } from './sfcParser';

export const vueLanguagePlugin: LanguagePlugin<URI> = {
	getLanguageId(uri) {
		if (uri.path.endsWith('.vue')) {
			return 'vue';
		}
	},
	createVirtualCode(_uri, languageId, snapshot) {
		if (languageId === 'vue') {
			return new VueVirtualCode(snapshot);
		}
	},
	typescript: {
		extraFileExtensions: [{ extension: 'vue', isMixedContent: true, scriptKind: 7 satisfies ts.ScriptKind.Deferred }],
		getServiceScript() {
			return undefined;
		},
		getExtraServiceScripts(fileName, root) {
			const scripts: TypeScriptExtraServiceScript[] = [];
			for (const code of forEachEmbeddedCode(root)) {
				if (code.languageId === 'javascript') {
					scripts.push({
						fileName: fileName + '.' + code.id + '.js',
						code,
						extension: '.js',
						scriptKind: 1 satisfies ts.ScriptKind.JS,
					});
				}
				else if (code.languageId === 'typescript') {
					scripts.push({
						fileName: fileName + '.' + code.id + '.ts',
						code,
						extension: '.ts',
						scriptKind: 3 satisfies ts.ScriptKind.TS,
					});
				}
			}
			return scripts;
		},
	},
};

export class VueVirtualCode implements VirtualCode {
	id = 'root';
	languageId = 'vue';
	mappings: CodeMapping[];
	embeddedCodes: VirtualCode[];

	constructor(public snapshot: ts.IScriptSnapshot) {
		const content = snapshot.getText(0, snapshot.getLength());
		const blocks = parseSfc(content);

		this.mappings = [{
			sourceOffsets: [0],
			generatedOffsets: [0],
			lengths: [snapshot.getLength()],
			data: {
				completion: true,
				format: true,
				navigation: true,
				semantic: true,
				structure: true,
				verification: true,
			},
		}];

		this.embeddedCodes = [...getVueEmbeddedCodes(blocks)];
	}
}

function createEmbeddedCode(
	id: string,
	languageId: string,
	sourceOffset: number,
	text: string,
): VirtualCode {
	return {
		id,
		languageId,
		snapshot: {
			getText: (start, end) => text.substring(start, end),
			getLength: () => text.length,
			getChangeRange: () => undefined,
		},
		mappings: [{
			sourceOffsets: [sourceOffset],
			generatedOffsets: [0],
			lengths: [text.length],
			data: {
				completion: true,
				format: true,
				navigation: true,
				semantic: true,
				structure: true,
				verification: true,
			},
		}],
		embeddedCodes: [],
	};
}

function* getVueEmbeddedCodes(blocks: ReturnType<typeof parseSfc>): Generator<VirtualCode> {
	let styleIndex = 0;

	for (const block of blocks) {
		if (block.tag === 'template') {
			yield createEmbeddedCode('template', 'html', block.startOffset, block.content);
		}
		else if (block.tag === 'script') {
			const lang = block.lang ?? 'js';
			const isTs = lang === 'ts' || lang === 'tsx';
			yield createEmbeddedCode(
				'script',
				isTs ? 'typescript' : 'javascript',
				block.startOffset,
				block.content,
			);
		}
		else if (block.tag === 'style') {
			yield createEmbeddedCode('style_' + styleIndex++, 'css', block.startOffset, block.content);
		}
	}
}
