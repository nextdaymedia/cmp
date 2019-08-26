import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import autoprefixer from 'autoprefixer';
import path from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

const ENV = process.env.NODE_ENV || 'development';

const CSS_MAPS = ENV !== 'production';

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
		extensions: ['.jsx', '.js', '.json', '.less'],
		modules: [
			path.resolve(__dirname, 'src/lib'),
			path.resolve(__dirname, 'node_modules'),
			'node_modules'
		],
		alias: {
			components: path.resolve(__dirname, 'src/components'),	// used for tests
			style: path.resolve(__dirname, 'src/style'),
			'react': 'preact-compat',
			'react-dom': 'preact-compat'
		}
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: path.resolve(__dirname, 'src'),
				enforce: 'pre',
				use: 'source-map-loader'
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				// Transform our own .(less|css) files with PostCSS and CSS-modules
				test: /\.(less|css)$/,
				include: [
					path.resolve(__dirname, 'src/components'),
					path.resolve(__dirname, 'src/docs/components'),
				],
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							modules: true,
							sourceMap: CSS_MAPS,
							importLoaders: 1,
							minimize: true,
							localIdentName: '[name]_[hash:base64:5]'
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: CSS_MAPS,
							plugins: () => {
								autoprefixer({ browsers: ['last 2 versions'] });
							}
						}
					},
					{
						loader: 'less-loader',
						options: { sourceMap: CSS_MAPS }
					}
				]
			},
			{
				test: /\.(less|css)$/,
				include: [
					path.resolve(__dirname, 'src/docs/style'),
					path.resolve(__dirname, 'node_modules/codemirror/lib/codemirror.css'),
				],
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'less-loader',
						options: { sourceMap: CSS_MAPS }
					}
				]
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
				filename: 'index.html',
				template: 'index.html',
				chunks: ['cmp']
			}),
			new HtmlWebpackPlugin({
				filename: 'ssp.fallback.html',
				template: 'ssp.fallback.html',
				chunks: ['cmp']
			}),
		]).concat(ENV === 'production' ? uglifyPlugin : []),
	},
];
