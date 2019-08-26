import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

const ENV = process.env.NODE_ENV || 'development';

const uglifyPlugin = new UglifyJsPlugin({
	uglifyOptions: {
		warnings: false,
		output: {
			comments: false
		},
		compress: {
			unsafe_comps: true,
			properties: true,
			keep_fargs: false,
			pure_getters: true,
			collapse_vars: true,
			unsafe: true,
			sequences: true,
			dead_code: true,
			drop_debugger: true,
			comparisons: true,
			conditionals: true,
			evaluate: true,
			booleans: true,
			loops: true,
			unused: true,
			hoist_funs: true,
			if_return: true,
			join_vars: true,
			drop_console: false
		}
	}
});

const commonConfig = {
	context: path.resolve(__dirname, 'src'),
	resolve: {
		extensions: ['.js', '.json'],
		modules: [
			path.resolve(__dirname, 'src/lib'),
			path.resolve(__dirname, 'node_modules'),
			'node_modules'
		],
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: path.resolve(__dirname, 'src'),
				enforce: 'pre',
				use: 'source-map-loader'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.(xml|html|txt|md)$/,
				use: 'raw-loader'
			},
			{
				test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
				use: ENV === 'production' ? 'file-loader' : 'url-loader'
			}
		]
	},

	stats: { colors: true },

	node: {
		global: true,
		process: false,
		Buffer: false,
		__filename: false,
		__dirname: false,
		setImmediate: false
	},

	devtool: ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',

	devServer: {
		port: process.env.PORT || 8080,
		host: 'localhost',
		publicPath: '/',
		contentBase: './src',
		historyApiFallback: true,
		disableHostCheck: true,
		open: false,
		openPage: 'docs/',
		https: false
	}
};

module.exports = [
	// CMP config
	{
		mode: 'none',
		entry: {
			'cmp.ndmtag': ['core-js/fn/promise', './cmp.ndmtag.js'],
			'cmp.custom': ['core-js/fn/promise', './cmp.custom.js'],
			'cmp.stub': './cmp.stub.js',
			'cmp.ssp': './cmp.ssp.js',
			'ndmtag': ['core-js/fn/promise', './ndmtag.js'],
		},

		output: {
			path: path.resolve(__dirname, 'build'),
			publicPath: ENV === 'production' ? 'https://cmp.nextday.media/' : ENV === 'testing' ? 'https://cmp.nextday.media/test/' : `http://localhost:${process.env.PORT || 8080}/`,
			filename: '[name].bundle.js',
			chunkFilename: "chunks/[name].[hash].chunk.js"
		},
		...commonConfig,
		plugins: ([
			new webpack.NoEmitOnErrorsPlugin(),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(ENV)
			}),
			new webpack.ProvidePlugin({
				'Promise': 'promise-polyfill'
			}),
			new HtmlWebpackPlugin({
				filename: 'ssp.fallback.html',
				template: 'ssp.fallback.html',
				chunks: ['cmp']
			}),
		]).concat(ENV === 'production' ? uglifyPlugin : []),
	},
];
