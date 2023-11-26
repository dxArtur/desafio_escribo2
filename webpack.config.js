/* eslint-disable no-undef */
const path = require('path')

module.exports = {
	mode: 'development',
	target: 'node',
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, 'dist'),
	},

	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: 'babel-loader'
		},
		{
			test: /\.html$/,
			use: 'html-loader',
		}
		]
	},
	resolve: {
		fallback: {
			'fs': false,
			'path': false,
			'crypto': false,
			'nock': false,
			'mock-aws-s3': false,
			'aws-sdk':false,
			// Adicione outros módulos do Node.js, se necessário
		}
	},
}