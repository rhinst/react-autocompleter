module.exports = {

	entry: './playground/playground.js',

	output: {
		path: './example',
		filename: 'bundle.js'
	},

	module: {
		loaders: [
			{
				test: /\.js/,
				exclude: /node_modules/,
				loader: 'babel-loader?stage=0'
			}
		]
	}
};
