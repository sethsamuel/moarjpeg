module.exports = {
	output: {
		filename: "index.js"
	},
	loaders: [
		{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: "babel-loader"
		}
	]
}
