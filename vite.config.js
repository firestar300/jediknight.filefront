import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

const root = import.meta.dirname;
const base = process.env.BASE_PATH ? `${process.env.BASE_PATH.replace(/\/+$/, '')}/` : '/';
const includePattern = /^([ \t]*)<!-- @include (\S+) -->/gm;
const internalUrlPattern = /\b(href|action)="\/(?!\/)/g;

const renderIncludes = (html) =>
	html.replace(includePattern, (_, indent, file) =>
		renderIncludes(readFileSync(resolve(root, file), 'utf8'))
			.trimEnd()
			.split('\n')
			.map((line) => (line ? indent + line : line))
			.join('\n')
	);

const prefixInternalUrls = (html) => (base === '/' ? html : html.replace(internalUrlPattern, `$1="${base}`));

const htmlIncludes = () => ({
	name: 'html-includes',
	transformIndexHtml: { order: 'pre', handler: (html) => prefixInternalUrls(renderIncludes(html)) },
	handleHotUpdate: ({ file, server }) => {
		if (!file.startsWith(resolve(root, 'partials'))) return;
		server.ws.send({ type: 'full-reload' });
		return [];
	},
});

export default defineConfig({
	base,
	plugins: [htmlIncludes(), tailwindcss()],
	build: {
		cssMinify: true,
		modulePreload: { polyfill: false },
		rollupOptions: {
			input: {
				home: resolve(root, 'index.html'),
				forceIconMod: resolve(root, 'file/force-icon-mod-119639/index.html'),
			},
		},
	},
});
