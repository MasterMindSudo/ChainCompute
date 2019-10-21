var path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        index: './src/index.js'

    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'js/[name]-chain-app.js',

    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
						"presets": ["@babel/preset-env", "@babel/preset-react"],
						plugins: [
							"@babel/plugin-syntax-dynamic-import",
							"@babel/plugin-proposal-class-properties"
						]
                    }

                }

            }, {
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			  }

        ]
	},
	plugins: [
		new HtmlWebPackPlugin({
		template: "./public/index.html",
		filename: "./index.html"
	  }),
	]
}