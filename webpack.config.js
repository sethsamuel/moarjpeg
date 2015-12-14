module.exports = {
	output: {
		filename: "index.js"
	},
	module:{
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				query: {
					presets: ["es2015"]
				}
			}
		]
	}
}
