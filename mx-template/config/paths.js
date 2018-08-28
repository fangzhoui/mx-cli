'use strict';

const path = require('path');
const fs = require('fs');

const  appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);




module.exports = {
	appBuild: resolveApp('build'),
	removeBuild: resolveApp(appDirectory),
	appHtml: resolveApp('src/index.html'),
	appIndexJs: resolveApp('src/index.js'),
	appPackageJson: resolveApp('package.json'),
	appSrc: resolveApp('src'),
	appFaviconIco: resolveApp('src/favicon.ico'),
	appNodeModules: resolveApp('node_modules')
};

