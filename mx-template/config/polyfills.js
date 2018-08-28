'use strict';

if (typeof Promise === 'undefined') {
	require('promise/lib/rejection-tracking').enable();
	window.Promise = require('promise/lib/es6-extensions.js');
}

if (typeof Map === 'undefined') {
	window.Map = require('core-js/es6/map');
}

if (typeof Set === 'undefined') {
	window.Set = require('core-js/es6/set');
}

if (typeof WeakMap === 'undefined') {
	window.WeakMap = require('core-js/es6/weak-map');
}

require('whatwg-fetch');

Object.assign = require('object-assign');

require('raf').polyfill(global);

