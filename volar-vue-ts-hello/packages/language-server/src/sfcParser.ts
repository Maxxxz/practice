interface SfcBlock {
	tag: 'template' | 'script' | 'style';
	lang?: string;
	content: string;
	startOffset: number;
}

export function parseSfc(source: string): SfcBlock[] {
	const blocks: SfcBlock[] = [];
	const blockRegex = /<(template|script|style)(\s[^>]*)?>([\s\S]*?)<\/\1>/g;

	let match: RegExpExecArray | null;
	while ((match = blockRegex.exec(source)) !== null) {
		const tag = match[1] as SfcBlock['tag'];
		const attrs = match[2] ?? '';
		const content = match[3];
		const langMatch = attrs.match(/\blang=["']([^"']+)["']/);
		const openTagEnd = match.index + match[0].indexOf('>') + 1;

		blocks.push({
			tag,
			lang: langMatch?.[1],
			content,
			startOffset: openTagEnd,
		});
	}

	return blocks;
}
