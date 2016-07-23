(function () {
	var cachedModules = {};

	var require = function (deps, callback) {
		var params = [];
		var depCount = 0;
		var isEmpty = false;
		var modName = document.currentScript && document.currentScript.id || 'REQUIRE_MAIN';

		if (deps.length) {
			for (var i = 0, len = deps.length; i < len; i++) {
				(function (i) {
					depCount++;
					loadModule(deps[i], function (param) {
						params[i] = param;
						depCount--;
						if (depCount == 0) {
							saveModule(modName, params, callback);
						}
					});
				})(i);
			}
		} else {
			isEmpty = true;
		}

		if (isEmpty) {
			setTimeout(function () {
				saveModule(modName, null, callback);
			}, 0);
		}
	};

	// to do
	var _getPathUrl = function (modName) {
		var url = modName;
		if (url.indexOf('.js') == -1) {
			url = url + '.js';
		}
		return url;
	};

	var loadModule = function (modName, callback) {
		var url = _getPathUrl(modName);
		var firstScript = document.getElementsByTagName('script')[0];
		var module;

		if (cachedModules[modName]) {
			module = cachedModules[modName];
			if (module.status === 'loaded') {
				setTimeout(callback(module.export), 0);
			} else {
				module.onload.push(callback);
			}
		} else {
			module = cachedModules[modName] = {
				modName: modName,
				status: 'loading',
				export: null,
				onload: [callback]
			};

			_script = document.createElement('script');
			_script.id = modName;
			_script.type = 'text/javascript';
			_script.charset = 'utf-8';
			_script.async = true;
			_script.src = url;

			firstScript.parentNode.insertBefore(_script, firstScript);
		}
	};

	var saveModule = function (modName, params, callback) {
		var module;

		if (cachedModules.hasOwnProperty(modName)) {
			module = cachedModules[modName];
			module.status = 'loaded';
			module.export = callback ? callback(params) : null;

			while (fn = module.onload.shift()) {
				fn(module.export);
			}
		} else {
			callback && callback.apply(window, params);
		}
	};

	window.require = require;
	window.define = require;
})();