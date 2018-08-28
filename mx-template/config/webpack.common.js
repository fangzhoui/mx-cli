const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); //访问内置的插件
const paths = require('./paths');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AutoDllPlugin = require('autodll-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';
module.exports = {
	resolve: {
		extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/, 
				exclude: /node_modules/,
				include: paths.appSrc,
				use: [require.resolve('babel-loader'), require.resolve('eslint-loader')]
			},
			{
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
				exclude: /node_modules/,
				use: {
					loader: require.resolve('url-loader'),
					options: {
						name: 'images/[name].[ext]',
						limit: 10000
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					require.resolve('css-hot-loader'),
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
						}
					},
					{
						loader: require.resolve('css-loader'),
						options: {
							importLoaders: 1,
							minimize: true
						}
					},
					require.resolve('postcss-loader')
				]
			},
			{
				test: /\.scss$/,
				include: paths.appSrc,
				use: [
					require.resolve('css-hot-loader'),
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
						}
					},
					{
						loader: require.resolve('css-loader'),
						options: {
							importLoaders: 2,
							minimize: true
						}
					},
					require.resolve('postcss-loader'),
					require.resolve('sass-loader')
				]
			}
		]
	},
	optimization: {
		minimize: true,
		splitChunks: {
			cacheGroups: {
				default: false,
				commons: {
					test: /node_modules/,
					name: 'common',
					chunks: 'initial',
					minSize: 1
				}
			}
		}
	},
	plugins: [
		new HtmlWebpackPlugin({ 
			inject: true,
			template: paths.appHtml,
			favicon: paths.appFaviconIco
		}),
		new AutoDllPlugin({
            inject: true, // will inject the DLL bundle to index.html
            debug: true,
            filename: '[name]_V1.js',
            path: '',
            entry: {
                common: [
                    'react',
					'react-dom',
					'react-router',
					'react-router-dom',
					'axios',
					'mobx',
					'mobx-react'
                ]
            }
        }),
		new MiniCssExtractPlugin({
			filename: devMode ? '[name].css' : 'css/[name].[hash:5].css',
			chunkFilename: devMode ? '[id].css' : 'css/[id].[hash:5].css',
		})
	],
	node: {
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty',
	}
};

