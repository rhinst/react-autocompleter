module.exports = {

	entry: './src/AutoCompleter.js',

	output: {
		path: './dist',
		filename: 'autocompleter.js'
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
