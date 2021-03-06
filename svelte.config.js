import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import adapter from '@sveltejs/adapter-auto';
import pagesAdapter from '@sveltejs/adapter-cloudflare';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		}),
		mdsvex(mdsvexConfig)
	],

	kit: {
        adapter: process.env.CF_PAGES == 1 ? pagesAdapter() : adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	},

	vite: {
		optimizeDeps: {
			exclude: ["@urql/svelte"]
		}
	}
};

export default config;
