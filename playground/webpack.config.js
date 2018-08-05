const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './playground/playground.js',

	output: {
		path: './playground',
		filename: 'bundle.js',
		publicPath: '/'
	},

	devServer: {
		filename: 'playground.js',
		contentBase: './playground'
	},

	devtool: 'source-map',

	module: {
		loaders: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                loader: 'babel-loader?stage=0'
            },
			{
				test: /\.(json)$/,
				exclude: /node_modules/,
				loader: 'json-loader'
			}

		]
	},

	plugins: [new HtmlWebpackPlugin()]
};
