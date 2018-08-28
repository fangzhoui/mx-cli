const config = require('./webpack.common.js');
const merge = require('webpack-merge');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const paths = require('./paths');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const prodConfig = merge(config, {
	mode: 'production',
	entry: {
		main: [require.resolve('./polyfills'), paths.appIndexJs]
	},
	output: {
		path: paths.appBuild,
		publicPath: './',
		filename: 'js/[name].[chunkhash:8].js'
	},
	plugins: [
		new CleanWebpackPlugin(['build'], { root: paths.removeBuild }),
		new webpack.DefinePlugin({
			env: {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new SWPrecacheWebpackPlugin({
			dontCacheBustUrlsMatching: /\.\w{8}\./,
			filename: 'service-worker.js',
			logger(message) {
				if (message.indexOf('Total precache size is') === 0) {
					return;
				}
				if (message.indexOf('Skipping static resource') === 0) {
					return;
				}
			},
			minify: true,
			navigateFallback: '/index.html',
			navigateFallbackWhitelist: [/^(?!\/__).*/],
			staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
		}),
		new BundleAnalyzerPlugin()
	]
});

module.exports = prodConfig;