const typography = require('@tailwindcss/typography');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {}
	},

	plugins: [typography]
};

module.exports = config;
