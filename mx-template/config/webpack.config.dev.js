const config = require('./webpack.common.js');
const merge = require('webpack-merge');
const webpack = require('webpack');
const paths = require('./paths');
const openBrowser = require('react-dev-utils/openBrowser');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');

const host = process.env.HOST || '0.0.0.0';

module.exports = merge(config, {
	mode: 'development',
	devtool: 'inline-source-map',
	entry: [
		require.resolve('./polyfills'),
		"react-hot-loader/patch",
		paths.appIndexJs
	],
	output: {
		path: paths.appBuild,
		publicPath: '/',
		filename: '[name].js'
	},     
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		proxy: {},
		host: host,
		port: '7770',
		disableHostCheck: true,
		contentBase: paths.appBuild,
		watchContentBase: true,
		historyApiFallback: true,
		inline: true,
		hot: true,
		before(app) {
			app.use(errorOverlayMiddleware());
			app.use(noopServiceWorkerMiddleware());
			openBrowser('http://localhost:7770');
		}
	}
});
