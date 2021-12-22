import remarkGfm from 'remark-gfm';
import addClasses from 'rehype-add-classes';

const config = {
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [
		remarkGfm
	],
	rehypePlugins: [
	]
};

export default config;
