/** @type { import("eslint").Linter.FlatConfig } */
module.exports = {
	root: true,
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'@besties'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
	rules: {
		'svelte/block-lang': [
			'error',
			{
				script: 'ts',
				style: 'postcss'
			}
		],
		'@typescript-eslint/no-explicit-any': 'warn',
		'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
		'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
	}
}
