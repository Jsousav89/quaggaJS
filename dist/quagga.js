(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(factory.toString()).default;
	else if(typeof exports === 'object')
		exports["Quagga"] = factory(factory.toString()).default;
	else
		root["Quagga"] = factory(factory.toString()).default;
})(this, function(__factorySource__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].e;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			e: {},
/******/ 			i: moduleId,
/******/ 			l: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.e, module, module.e, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.e;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 196);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;
	
	module.e = isArray;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	 *
	 *  Use of this source code is governed by a BSD-style license
	 *  that can be found in the LICENSE file in the root of the source
	 *  tree.
	 */
	 /* eslint-env node */
	'use strict';
	
	var logDisabled_ = true;
	
	// Utility methods.
	var utils = {
	  disableLog: function(bool) {
	    if (typeof bool !== 'boolean') {
	      return new Error('Argument type: ' + typeof bool +
	          '. Please use a boolean.');
	    }
	    logDisabled_ = bool;
	    return (bool) ? 'adapter.js logging disabled' :
	        'adapter.js logging enabled';
	  },
	
	  log: function() {
	    if (typeof window === 'object') {
	      if (logDisabled_) {
	        return;
	      }
	      if (typeof console !== 'undefined' && typeof console.log === 'function') {
	        console.log.apply(console, arguments);
	      }
	    }
	  },
	
	  /**
	   * Extract browser version out of the provided user agent string.
	   *
	   * @param {!string} uastring userAgent string.
	   * @param {!string} expr Regular expression used as match criteria.
	   * @param {!number} pos position in the version string to be returned.
	   * @return {!number} browser version.
	   */
	  extractVersion: function(uastring, expr, pos) {
	    var match = uastring.match(expr);
	    return match && match.length >= pos && parseInt(match[pos], 10);
	  },
	
	  /**
	   * Browser detector.
	   *
	   * @return {object} result containing browser, version and minVersion
	   *     properties.
	   */
	  detectBrowser: function() {
	    // Returned result object.
	    var result = {};
	    result.browser = null;
	    result.version = null;
	    result.minVersion = null;
	
	    // Fail early if it's not a browser
	    if (typeof window === 'undefined' || !window.navigator) {
	      result.browser = 'Not a browser.';
	      return result;
	    }
	
	    // Firefox.
	    if (navigator.mozGetUserMedia) {
	      result.browser = 'firefox';
	      result.version = this.extractVersion(navigator.userAgent,
	          /Firefox\/([0-9]+)\./, 1);
	      result.minVersion = 31;
	
	    // all webkit-based browsers
	    } else if (navigator.webkitGetUserMedia) {
	      // Chrome, Chromium, Webview, Opera, all use the chrome shim for now
	      if (window.webkitRTCPeerConnection) {
	        result.browser = 'chrome';
	        result.version = this.extractVersion(navigator.userAgent,
	          /Chrom(e|ium)\/([0-9]+)\./, 2);
	        result.minVersion = 38;
	
	      // Safari or unknown webkit-based
	      // for the time being Safari has support for MediaStreams but not webRTC
	      } else {
	        // Safari UA substrings of interest for reference:
	        // - webkit version:           AppleWebKit/602.1.25 (also used in Op,Cr)
	        // - safari UI version:        Version/9.0.3 (unique to Safari)
	        // - safari UI webkit version: Safari/601.4.4 (also used in Op,Cr)
	        //
	        // if the webkit version and safari UI webkit versions are equals,
	        // ... this is a stable version.
	        //
	        // only the internal webkit version is important today to know if
	        // media streams are supported
	        //
	        if (navigator.userAgent.match(/Version\/(\d+).(\d+)/)) {
	          result.browser = 'safari';
	          result.version = this.extractVersion(navigator.userAgent,
	            /AppleWebKit\/([0-9]+)\./, 1);
	          result.minVersion = 602;
	
	        // unknown webkit-based browser
	        } else {
	          result.browser = 'Unsupported webkit-based browser ' +
	              'with GUM support but no WebRTC support.';
	          return result;
	        }
	      }
	
	    // Edge.
	    } else if (navigator.mediaDevices &&
	        navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
	      result.browser = 'edge';
	      result.version = this.extractVersion(navigator.userAgent,
	          /Edge\/(\d+).(\d+)$/, 2);
	      result.minVersion = 10547;
	
	    // Default fallthrough: not supported.
	    } else {
	      result.browser = 'Not a supported browser.';
	      return result;
	    }
	
	    // Warn if version is less than minVersion.
	    if (result.version < result.minVersion) {
	      utils.log('Browser: ' + result.browser + ' Version: ' + result.version +
	          ' < minimum supported version: ' + result.minVersion +
	          '\n some things might not work!');
	    }
	
	    return result;
	  }
	};
	
	// Export.
	module.e = {
	  log: utils.log,
	  disableLog: utils.disableLog,
	  browserDetails: utils.detectBrowser(),
	  extractVersion: utils.extractVersion
	};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.e = isObject;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {var checkGlobal = __webpack_require__(133);
	
	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};
	
	/** Detect free variable `exports`. */
	var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
	  ? exports
	  : undefined;
	
	/** Detect free variable `module`. */
	var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
	  ? module
	  : undefined;
	
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);
	
	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(objectTypes[typeof self] && self);
	
	/** Detect free variable `window`. */
	var freeWindow = checkGlobal(objectTypes[typeof window] && window);
	
	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(objectTypes[typeof this] && this);
	
	/**
	 * Used as a reference to the global object.
	 *
	 * The `this` value is used if it's the global object to avoid Greasemonkey's
	 * restricted `window` object, otherwise the `window` object is used.
	 */
	var root = freeGlobal ||
	  ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) ||
	    freeSelf || thisGlobal || Function('return this')();
	
	module.e = root;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(66)(module), (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	module.e = isObjectLike;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_merge__ = __webpack_require__(7);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_merge___default = __WEBPACK_IMPORTED_MODULE_0_lodash_merge__ && __WEBPACK_IMPORTED_MODULE_0_lodash_merge__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_merge__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_merge__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_lodash_merge___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_lodash_merge___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__barcode_reader__ = __webpack_require__(9);
	
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	
	
	
	function EANReader(opts, supplements) {
	    opts = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lodash_merge___default.a.bind()(getDefaulConfig(), opts);
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1__barcode_reader__["a"].call(this, opts, supplements);
	}
	
	function getDefaulConfig() {
	    var config = {};
	
	    Object.keys(EANReader.CONFIG_KEYS).forEach(function (key) {
	        config[key] = EANReader.CONFIG_KEYS[key].default;
	    });
	    return config;
	}
	
	var properties = {
	    CODE_L_START: { value: 0 },
	    CODE_G_START: { value: 10 },
	    START_PATTERN: { value: [1, 1, 1] },
	    STOP_PATTERN: { value: [1, 1, 1] },
	    MIDDLE_PATTERN: { value: [1, 1, 1, 1, 1] },
	    EXTENSION_START_PATTERN: { value: [1, 1, 2] },
	    CODE_PATTERN: { value: [[3, 2, 1, 1], [2, 2, 2, 1], [2, 1, 2, 2], [1, 4, 1, 1], [1, 1, 3, 2], [1, 2, 3, 1], [1, 1, 1, 4], [1, 3, 1, 2], [1, 2, 1, 3], [3, 1, 1, 2], [1, 1, 2, 3], [1, 2, 2, 2], [2, 2, 1, 2], [1, 1, 4, 1], [2, 3, 1, 1], [1, 3, 2, 1], [4, 1, 1, 1], [2, 1, 3, 1], [3, 1, 2, 1], [2, 1, 1, 3]] },
	    CODE_FREQUENCY: { value: [0, 11, 13, 14, 19, 25, 28, 21, 22, 26] },
	    SINGLE_CODE_ERROR: { value: 0.70 },
	    AVG_CODE_ERROR: { value: 0.48 },
	    FORMAT: { value: "ean_13", writeable: false }
	};
	
	EANReader.prototype = Object.create(/* harmony import */__WEBPACK_IMPORTED_MODULE_1__barcode_reader__["a"].prototype, properties);
	EANReader.prototype.constructor = EANReader;
	
	EANReader.prototype._decodeCode = function (start, coderange) {
	    var counter = [0, 0, 0, 0],
	        i,
	        self = this,
	        offset = start,
	        isWhite = !self._row[offset],
	        counterPos = 0,
	        bestMatch = {
	        error: Number.MAX_VALUE,
	        code: -1,
	        start: start,
	        end: start
	    },
	        code,
	        error;
	
	    if (!coderange) {
	        coderange = self.CODE_PATTERN.length;
	    }
	
	    for (i = offset; i < self._row.length; i++) {
	        if (self._row[i] ^ isWhite) {
	            counter[counterPos]++;
	        } else {
	            if (counterPos === counter.length - 1) {
	                for (code = 0; code < coderange; code++) {
	                    error = self._matchPattern(counter, self.CODE_PATTERN[code]);
	                    if (error < bestMatch.error) {
	                        bestMatch.code = code;
	                        bestMatch.error = error;
	                    }
	                }
	                bestMatch.end = i;
	                if (bestMatch.error > self.AVG_CODE_ERROR) {
	                    return null;
	                }
	                return bestMatch;
	            } else {
	                counterPos++;
	            }
	            counter[counterPos] = 1;
	            isWhite = !isWhite;
	        }
	    }
	    return null;
	};
	
	EANReader.prototype._findPattern = function (pattern, offset, isWhite, tryHarder, epsilon) {
	    var counter = [],
	        self = this,
	        i,
	        counterPos = 0,
	        bestMatch = {
	        error: Number.MAX_VALUE,
	        code: -1,
	        start: 0,
	        end: 0
	    },
	        error,
	        j,
	        sum;
	
	    if (!offset) {
	        offset = self._nextSet(self._row);
	    }
	
	    if (isWhite === undefined) {
	        isWhite = false;
	    }
	
	    if (tryHarder === undefined) {
	        tryHarder = true;
	    }
	
	    if (epsilon === undefined) {
	        epsilon = self.AVG_CODE_ERROR;
	    }
	
	    for (i = 0; i < pattern.length; i++) {
	        counter[i] = 0;
	    }
	
	    for (i = offset; i < self._row.length; i++) {
	        if (self._row[i] ^ isWhite) {
	            counter[counterPos]++;
	        } else {
	            if (counterPos === counter.length - 1) {
	                sum = 0;
	                for (j = 0; j < counter.length; j++) {
	                    sum += counter[j];
	                }
	                error = self._matchPattern(counter, pattern);
	
	                if (error < epsilon) {
	                    bestMatch.error = error;
	                    bestMatch.start = i - sum;
	                    bestMatch.end = i;
	                    return bestMatch;
	                }
	                if (tryHarder) {
	                    for (j = 0; j < counter.length - 2; j++) {
	                        counter[j] = counter[j + 2];
	                    }
	                    counter[counter.length - 2] = 0;
	                    counter[counter.length - 1] = 0;
	                    counterPos--;
	                } else {
	                    return null;
	                }
	            } else {
	                counterPos++;
	            }
	            counter[counterPos] = 1;
	            isWhite = !isWhite;
	        }
	    }
	    return null;
	};
	
	EANReader.prototype._findStart = function () {
	    var self = this,
	        leadingWhitespaceStart,
	        offset = self._nextSet(self._row),
	        startInfo;
	
	    while (!startInfo) {
	        startInfo = self._findPattern(self.START_PATTERN, offset);
	        if (!startInfo) {
	            return null;
	        }
	        leadingWhitespaceStart = startInfo.start - (startInfo.end - startInfo.start);
	        if (leadingWhitespaceStart >= 0) {
	            if (self._matchRange(leadingWhitespaceStart, startInfo.start, 0)) {
	                return startInfo;
	            }
	        }
	        offset = startInfo.end;
	        startInfo = null;
	    }
	};
	
	EANReader.prototype._verifyTrailingWhitespace = function (endInfo) {
	    var self = this,
	        trailingWhitespaceEnd;
	
	    trailingWhitespaceEnd = endInfo.end + (endInfo.end - endInfo.start);
	    if (trailingWhitespaceEnd < self._row.length) {
	        if (self._matchRange(endInfo.end, trailingWhitespaceEnd, 0)) {
	            return endInfo;
	        }
	    }
	    return null;
	};
	
	EANReader.prototype._findEnd = function (offset, isWhite) {
	    var self = this,
	        endInfo = self._findPattern(self.STOP_PATTERN, offset, isWhite, false);
	
	    return endInfo !== null ? self._verifyTrailingWhitespace(endInfo) : null;
	};
	
	EANReader.prototype._calculateFirstDigit = function (codeFrequency) {
	    var i,
	        self = this;
	
	    for (i = 0; i < self.CODE_FREQUENCY.length; i++) {
	        if (codeFrequency === self.CODE_FREQUENCY[i]) {
	            return i;
	        }
	    }
	    return null;
	};
	
	EANReader.prototype._decodePayload = function (code, result, decodedCodes) {
	    var i,
	        self = this,
	        codeFrequency = 0x0,
	        firstDigit;
	
	    for (i = 0; i < 6; i++) {
	        code = self._decodeCode(code.end);
	        if (!code) {
	            return null;
	        }
	        if (code.code >= self.CODE_G_START) {
	            code.code = code.code - self.CODE_G_START;
	            codeFrequency |= 1 << 5 - i;
	        } else {
	            codeFrequency |= 0 << 5 - i;
	        }
	        result.push(code.code);
	        decodedCodes.push(code);
	    }
	
	    firstDigit = self._calculateFirstDigit(codeFrequency);
	    if (firstDigit === null) {
	        return null;
	    }
	    result.unshift(firstDigit);
	
	    code = self._findPattern(self.MIDDLE_PATTERN, code.end, true, false);
	    if (code === null) {
	        return null;
	    }
	    decodedCodes.push(code);
	
	    for (i = 0; i < 6; i++) {
	        code = self._decodeCode(code.end, self.CODE_G_START);
	        if (!code) {
	            return null;
	        }
	        decodedCodes.push(code);
	        result.push(code.code);
	    }
	
	    return code;
	};
	
	EANReader.prototype._decode = function () {
	    var startInfo,
	        self = this,
	        code,
	        result = [],
	        decodedCodes = [],
	        resultInfo = {};
	
	    startInfo = self._findStart();
	    if (!startInfo) {
	        return null;
	    }
	    code = {
	        code: startInfo.code,
	        start: startInfo.start,
	        end: startInfo.end
	    };
	    decodedCodes.push(code);
	    code = self._decodePayload(code, result, decodedCodes);
	    if (!code) {
	        return null;
	    }
	    code = self._findEnd(code.end, false);
	    if (!code) {
	        return null;
	    }
	
	    decodedCodes.push(code);
	
	    // Checksum
	    if (!self._checksum(result)) {
	        return null;
	    }
	
	    if (this.supplements.length > 0) {
	        var ext = this._decodeExtensions(code.end);
	        if (!ext) {
	            return null;
	        }
	        var lastCode = ext.decodedCodes[ext.decodedCodes.length - 1],
	            endInfo = {
	            start: lastCode.start + ((lastCode.end - lastCode.start) / 2 | 0),
	            end: lastCode.end
	        };
	        if (!self._verifyTrailingWhitespace(endInfo)) {
	            return null;
	        }
	        resultInfo = {
	            supplement: ext,
	            code: result.join("") + ext.code
	        };
	    }
	
	    return _extends({
	        code: result.join(""),
	        start: startInfo.start,
	        end: code.end,
	        codeset: "",
	        startInfo: startInfo,
	        decodedCodes: decodedCodes
	    }, resultInfo);
	};
	
	EANReader.prototype._decodeExtensions = function (offset) {
	    var i,
	        start = this._nextSet(this._row, offset),
	        startInfo = this._findPattern(this.EXTENSION_START_PATTERN, start, false, false),
	        result;
	
	    if (startInfo === null) {
	        return null;
	    }
	
	    for (i = 0; i < this.supplements.length; i++) {
	        result = this.supplements[i].decode(this._row, startInfo.end);
	        if (result !== null) {
	            return {
	                code: result.code,
	                start: start,
	                startInfo: startInfo,
	                end: result.end,
	                codeset: "",
	                decodedCodes: result.decodedCodes
	            };
	        }
	    }
	    return null;
	};
	
	EANReader.prototype._checksum = function (result) {
	    var sum = 0,
	        i;
	
	    for (i = result.length - 2; i >= 0; i -= 2) {
	        sum += result[i];
	    }
	    sum *= 3;
	    for (i = result.length - 1; i >= 0; i -= 2) {
	        sum += result[i];
	    }
	    return sum % 10 === 0;
	};
	
	EANReader.CONFIG_KEYS = {
	    supplements: {
	        'type': 'arrayOf(string)',
	        'default': [],
	        'description': 'Allowed extensions to be decoded (2 and/or 5)'
	    }
	};
	
	/* harmony default export */ exports["a"] = EANReader;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(16),
	    root = __webpack_require__(3);
	
	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');
	
	module.e = Map;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var baseMerge = __webpack_require__(125),
	    createAssigner = __webpack_require__(142);
	
	/**
	 * This method is like `_.assign` except that it recursively merges own and
	 * inherited enumerable properties of source objects into the destination
	 * object. Source properties that resolve to `undefined` are skipped if a
	 * destination value exists. Array and plain object properties are merged
	 * recursively.Other objects and value types are overridden by assignment.
	 * Source objects are applied from left to right. Subsequent sources
	 * overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var users = {
	 *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
	 * };
	 *
	 * var ages = {
	 *   'data': [{ 'age': 36 }, { 'age': 40 }]
	 * };
	 *
	 * _.merge(users, ages);
	 * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
	 */
	var merge = createAssigner(function(object, source, srcIndex) {
	  baseMerge(object, source, srcIndex);
	});
	
	module.e = merge;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony default export */ exports["a"] = {
	    drawRect: function drawRect(pos, size, ctx, style) {
	        ctx.strokeStyle = style.color;
	        ctx.fillStyle = style.color;
	        ctx.lineWidth = 1;
	        ctx.beginPath();
	        ctx.strokeRect(pos.x, pos.y, size.x, size.y);
	    },
	    drawPath: function drawPath(path, def, ctx, style) {
	        ctx.strokeStyle = style.color;
	        ctx.fillStyle = style.color;
	        ctx.lineWidth = style.lineWidth;
	        ctx.beginPath();
	        ctx.moveTo(path[0][def.x], path[0][def.y]);
	        for (var j = 1; j < path.length; j++) {
	            ctx.lineTo(path[j][def.x], path[j][def.y]);
	        }
	        ctx.closePath();
	        ctx.stroke();
	    },
	    drawImage: function drawImage(imageData, size, ctx) {
	        var canvasData = ctx.getImageData(0, 0, size.x, size.y),
	            data = canvasData.data,
	            imageDataPos = imageData.length,
	            canvasDataPos = data.length,
	            value;
	
	        if (canvasDataPos / imageDataPos !== 4) {
	            return false;
	        }
	        while (imageDataPos--) {
	            value = imageData[imageDataPos];
	            data[--canvasDataPos] = 255;
	            data[--canvasDataPos] = value;
	            data[--canvasDataPos] = value;
	            data[--canvasDataPos] = value;
	        }
	        ctx.putImageData(canvasData, 0, 0);
	        return true;
	    }
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	function BarcodeReader(config, supplements) {
	    this._row = [];
	    this.config = config || {};
	    this.supplements = supplements;
	    return this;
	}
	
	BarcodeReader.prototype._nextUnset = function (line, start) {
	    var i;
	
	    if (start === undefined) {
	        start = 0;
	    }
	    for (i = start; i < line.length; i++) {
	        if (!line[i]) {
	            return i;
	        }
	    }
	    return line.length;
	};
	
	BarcodeReader.prototype._matchPattern = function (counter, code, maxSingleError) {
	    var i,
	        error = 0,
	        singleError = 0,
	        sum = 0,
	        modulo = 0,
	        barWidth,
	        count,
	        scaled;
	
	    maxSingleError = maxSingleError || this.SINGLE_CODE_ERROR || 1;
	
	    for (i = 0; i < counter.length; i++) {
	        sum += counter[i];
	        modulo += code[i];
	    }
	    if (sum < modulo) {
	        return Number.MAX_VALUE;
	    }
	    barWidth = sum / modulo;
	    maxSingleError *= barWidth;
	
	    for (i = 0; i < counter.length; i++) {
	        count = counter[i];
	        scaled = code[i] * barWidth;
	        singleError = Math.abs(count - scaled) / scaled;
	        if (singleError > maxSingleError) {
	            return Number.MAX_VALUE;
	        }
	        error += singleError;
	    }
	    return error / modulo;
	};
	
	BarcodeReader.prototype._nextSet = function (line, offset) {
	    var i;
	
	    offset = offset || 0;
	    for (i = offset; i < line.length; i++) {
	        if (line[i]) {
	            return i;
	        }
	    }
	    return line.length;
	};
	
	BarcodeReader.prototype._correctBars = function (counter, correction, indices) {
	    var length = indices.length,
	        tmp = 0;
	    while (length--) {
	        tmp = counter[indices[length]] * (1 - (1 - correction) / 2);
	        if (tmp > 1) {
	            counter[indices[length]] = tmp;
	        }
	    }
	};
	
	BarcodeReader.prototype._matchTrace = function (cmpCounter, epsilon) {
	    var counter = [],
	        i,
	        self = this,
	        offset = self._nextSet(self._row),
	        isWhite = !self._row[offset],
	        counterPos = 0,
	        bestMatch = {
	        error: Number.MAX_VALUE,
	        code: -1,
	        start: 0
	    },
	        error;
	
	    if (cmpCounter) {
	        for (i = 0; i < cmpCounter.length; i++) {
	            counter.push(0);
	        }
	        for (i = offset; i < self._row.length; i++) {
	            if (self._row[i] ^ isWhite) {
	                counter[counterPos]++;
	            } else {
	                if (counterPos === counter.length - 1) {
	                    error = self._matchPattern(counter, cmpCounter);
	
	                    if (error < epsilon) {
	                        bestMatch.start = i - offset;
	                        bestMatch.end = i;
	                        bestMatch.counter = counter;
	                        return bestMatch;
	                    } else {
	                        return null;
	                    }
	                } else {
	                    counterPos++;
	                }
	                counter[counterPos] = 1;
	                isWhite = !isWhite;
	            }
	        }
	    } else {
	        counter.push(0);
	        for (i = offset; i < self._row.length; i++) {
	            if (self._row[i] ^ isWhite) {
	                counter[counterPos]++;
	            } else {
	                counterPos++;
	                counter.push(0);
	                counter[counterPos] = 1;
	                isWhite = !isWhite;
	            }
	        }
	    }
	
	    // if cmpCounter was not given
	    bestMatch.start = offset;
	    bestMatch.end = self._row.length - 1;
	    bestMatch.counter = counter;
	    return bestMatch;
	};
	
	BarcodeReader.prototype.decodePattern = function (pattern) {
	    var self = this,
	        result;
	
	    self._row = pattern;
	    result = self._decode();
	    if (result === null) {
	        self._row.reverse();
	        result = self._decode();
	        if (result) {
	            result.direction = BarcodeReader.DIRECTION.REVERSE;
	            result.start = self._row.length - result.start;
	            result.end = self._row.length - result.end;
	        }
	    } else {
	        result.direction = BarcodeReader.DIRECTION.FORWARD;
	    }
	    if (result) {
	        result.format = self.FORMAT;
	    }
	    return result;
	};
	
	BarcodeReader.prototype._matchRange = function (start, end, value) {
	    var i;
	
	    start = start < 0 ? 0 : start;
	    for (i = start; i < end; i++) {
	        if (this._row[i] !== value) {
	            return false;
	        }
	    }
	    return true;
	};
	
	BarcodeReader.prototype._fillCounters = function (offset, end, isWhite) {
	    var self = this,
	        counterPos = 0,
	        i,
	        counters = [];
	
	    isWhite = typeof isWhite !== 'undefined' ? isWhite : true;
	    offset = typeof offset !== 'undefined' ? offset : self._nextUnset(self._row);
	    end = end || self._row.length;
	
	    counters[counterPos] = 0;
	    for (i = offset; i < end; i++) {
	        if (self._row[i] ^ isWhite) {
	            counters[counterPos]++;
	        } else {
	            counterPos++;
	            counters[counterPos] = 1;
	            isWhite = !isWhite;
	        }
	    }
	    return counters;
	};
	
	Object.defineProperty(BarcodeReader.prototype, "FORMAT", {
	    value: 'unknown',
	    writeable: false
	});
	
	BarcodeReader.DIRECTION = {
	    FORWARD: 1,
	    REVERSE: -1
	};
	
	BarcodeReader.Exception = {
	    StartNotFoundException: "Start-Info was not found!",
	    CodeNotFoundException: "Code could not be found!",
	    PatternNotFoundException: "Pattern could not be found!"
	};
	
	BarcodeReader.CONFIG_KEYS = {};
	
	/* harmony default export */ exports["a"] = BarcodeReader;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.e = clone
	
	/**
	 * Creates a new vec2 initialized with values from an existing vector
	 *
	 * @param {vec2} a vector to clone
	 * @returns {vec2} a new 2D vector
	 */
	function clone(a) {
	    var out = new Float32Array(2)
	    out[0] = a[0]
	    out[1] = a[1]
	    return out
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLikeObject = __webpack_require__(32);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}
	
	module.e = isArguments;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(2);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	module.e = isFunction;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony default export */ exports["a"] = {
	    init: function init(arr, val) {
	        var l = arr.length;
	        while (l--) {
	            arr[l] = val;
	        }
	    },
	
	    /**
	     * Shuffles the content of an array
	     * @return {Array} the array itself shuffled
	     */
	    shuffle: function shuffle(arr) {
	        var i = arr.length - 1,
	            j,
	            x;
	        for (i; i >= 0; i--) {
	            j = Math.floor(Math.random() * i);
	            x = arr[i];
	            arr[i] = arr[j];
	            arr[j] = x;
	        }
	        return arr;
	    },
	
	    toPointList: function toPointList(arr) {
	        var i,
	            j,
	            row = [],
	            rows = [];
	        for (i = 0; i < arr.length; i++) {
	            row = [];
	            for (j = 0; j < arr[i].length; j++) {
	                row[j] = arr[i][j];
	            }
	            rows[i] = "[" + row.join(",") + "]";
	        }
	        return "[" + rows.join(",\r\n") + "]";
	    },
	
	    /**
	     * returns the elements which's score is bigger than the threshold
	     * @return {Array} the reduced array
	     */
	    threshold: function threshold(arr, _threshold, scoreFunc) {
	        var i,
	            queue = [];
	        for (i = 0; i < arr.length; i++) {
	            if (scoreFunc.apply(arr, [arr[i]]) >= _threshold) {
	                queue.push(arr[i]);
	            }
	        }
	        return queue;
	    },
	
	    maxIndex: function maxIndex(arr) {
	        var i,
	            max = 0;
	        for (i = 0; i < arr.length; i++) {
	            if (arr[i] > arr[max]) {
	                max = i;
	            }
	        }
	        return max;
	    },
	
	    max: function max(arr) {
	        var i,
	            max = 0;
	        for (i = 0; i < arr.length; i++) {
	            if (arr[i] > max) {
	                max = arr[i];
	            }
	        }
	        return max;
	    },
	
	    sum: function sum(arr) {
	        var length = arr.length,
	            sum = 0;
	
	        while (length--) {
	            sum += arr[length];
	        }
	        return sum;
	    }
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var stackClear = __webpack_require__(165),
	    stackDelete = __webpack_require__(166),
	    stackGet = __webpack_require__(167),
	    stackHas = __webpack_require__(168),
	    stackSet = __webpack_require__(169);
	
	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function Stack(values) {
	  var index = -1,
	      length = values ? values.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = values[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add functions to the `Stack` cache.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;
	
	module.e = Stack;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(21);
	
	/**
	 * Gets the index at which the first occurrence of `key` is found in `array`
	 * of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}
	
	module.e = assocIndexOf;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(176);
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object[key];
	  return isNative(value) ? value : undefined;
	}
	
	module.e = getNative;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}
	
	module.e = isHostObject;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}
	
	module.e = isIndex;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return type == 'number' || type == 'boolean' ||
	    (type == 'string' && value != '__proto__') || value == null;
	}
	
	module.e = isKeyable;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(16);
	
	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');
	
	module.e = nativeCreate;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}
	
	module.e = eq;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(146),
	    isFunction = __webpack_require__(12),
	    isLength = __webpack_require__(23);
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value)) && !isFunction(value);
	}
	
	module.e = isArrayLike;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	module.e = isLength;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(52),
	    baseKeys = __webpack_require__(121),
	    indexKeys = __webpack_require__(60),
	    isArrayLike = __webpack_require__(22),
	    isIndex = __webpack_require__(18),
	    isPrototype = __webpack_require__(31);
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  var isProto = isPrototype(object);
	  if (!(isProto || isArrayLike(object))) {
	    return baseKeys(object);
	  }
	  var indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;
	
	  for (var key in object) {
	    if (baseHas(object, key) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(isProto && key == 'constructor')) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.e = keys;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cluster__ = __webpack_require__(68);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__array_helper__ = __webpack_require__(13);
	/* harmony export */ exports["f"] = imageRef;/* unused harmony export computeIntegralImage2 *//* unused harmony export computeIntegralImage *//* unused harmony export thresholdImage *//* unused harmony export computeHistogram *//* unused harmony export sharpenLine *//* unused harmony export determineOtsuThreshold *//* harmony export */ exports["c"] = otsuThreshold;/* unused harmony export computeBinaryImage *//* harmony export */ exports["d"] = cluster;/* unused harmony export dilate *//* unused harmony export erode *//* unused harmony export subtract *//* unused harmony export bitwiseOr *//* unused harmony export countNonZero *//* harmony export */ exports["e"] = topGeneric;/* unused harmony export grayArrayFromImage *//* unused harmony export grayArrayFromContext *//* harmony export */ exports["i"] = grayAndHalfSampleFromCanvasData;/* harmony export */ exports["j"] = computeGray;/* unused harmony export loadImageArray *//* harmony export */ exports["g"] = halfSample;/* harmony export */ exports["a"] = hsv2rgb;/* unused harmony export _computeDivisors *//* harmony export */ exports["b"] = calculatePatchSize;/* unused harmony export _parseCSSDimensionValues *//* harmony export */ exports["h"] = computeImageArea;
	
	var vec2 = {
	    clone: __webpack_require__(10)
	};
	var vec3 = {
	    clone: __webpack_require__(99)
	};
	
	/**
	 * @param x x-coordinate
	 * @param y y-coordinate
	 * @return ImageReference {x,y} Coordinate
	 */
	function imageRef(x, y) {
	    var that = {
	        x: x,
	        y: y,
	        toVec2: function toVec2() {
	            return vec2.clone([this.x, this.y]);
	        },
	        toVec3: function toVec3() {
	            return vec3.clone([this.x, this.y, 1]);
	        },
	        round: function round() {
	            this.x = this.x > 0.0 ? Math.floor(this.x + 0.5) : Math.floor(this.x - 0.5);
	            this.y = this.y > 0.0 ? Math.floor(this.y + 0.5) : Math.floor(this.y - 0.5);
	            return this;
	        }
	    };
	    return that;
	};
	
	/**
	 * Computes an integral image of a given grayscale image.
	 * @param imageDataContainer {ImageDataContainer} the image to be integrated
	 */
	function computeIntegralImage2(imageWrapper, integralWrapper) {
	    var imageData = imageWrapper.data;
	    var width = imageWrapper.size.x;
	    var height = imageWrapper.size.y;
	    var integralImageData = integralWrapper.data;
	    var sum = 0,
	        posA = 0,
	        posB = 0,
	        posC = 0,
	        posD = 0,
	        x,
	        y;
	
	    // sum up first column
	    posB = width;
	    sum = 0;
	    for (y = 1; y < height; y++) {
	        sum += imageData[posA];
	        integralImageData[posB] += sum;
	        posA += width;
	        posB += width;
	    }
	
	    posA = 0;
	    posB = 1;
	    sum = 0;
	    for (x = 1; x < width; x++) {
	        sum += imageData[posA];
	        integralImageData[posB] += sum;
	        posA++;
	        posB++;
	    }
	
	    for (y = 1; y < height; y++) {
	        posA = y * width + 1;
	        posB = (y - 1) * width + 1;
	        posC = y * width;
	        posD = (y - 1) * width;
	        for (x = 1; x < width; x++) {
	            integralImageData[posA] += imageData[posA] + integralImageData[posB] + integralImageData[posC] - integralImageData[posD];
	            posA++;
	            posB++;
	            posC++;
	            posD++;
	        }
	    }
	};
	
	function computeIntegralImage(imageWrapper, integralWrapper) {
	    var imageData = imageWrapper.data;
	    var width = imageWrapper.size.x;
	    var height = imageWrapper.size.y;
	    var integralImageData = integralWrapper.data;
	    var sum = 0;
	
	    // sum up first row
	    for (var i = 0; i < width; i++) {
	        sum += imageData[i];
	        integralImageData[i] = sum;
	    }
	
	    for (var v = 1; v < height; v++) {
	        sum = 0;
	        for (var u = 0; u < width; u++) {
	            sum += imageData[v * width + u];
	            integralImageData[v * width + u] = sum + integralImageData[(v - 1) * width + u];
	        }
	    }
	};
	
	function thresholdImage(imageWrapper, threshold, targetWrapper) {
	    if (!targetWrapper) {
	        targetWrapper = imageWrapper;
	    }
	    var imageData = imageWrapper.data,
	        length = imageData.length,
	        targetData = targetWrapper.data;
	
	    while (length--) {
	        targetData[length] = imageData[length] < threshold ? 1 : 0;
	    }
	};
	
	function computeHistogram(imageWrapper, bitsPerPixel) {
	    if (!bitsPerPixel) {
	        bitsPerPixel = 8;
	    }
	    var imageData = imageWrapper.data,
	        length = imageData.length,
	        bitShift = 8 - bitsPerPixel,
	        bucketCnt = 1 << bitsPerPixel,
	        hist = new Int32Array(bucketCnt);
	
	    while (length--) {
	        hist[imageData[length] >> bitShift]++;
	    }
	    return hist;
	};
	
	function sharpenLine(line) {
	    var i,
	        length = line.length,
	        left = line[0],
	        center = line[1],
	        right;
	
	    for (i = 1; i < length - 1; i++) {
	        right = line[i + 1];
	        //  -1 4 -1 kernel
	        line[i - 1] = center * 2 - left - right & 255;
	        left = center;
	        center = right;
	    }
	    return line;
	};
	
	function determineOtsuThreshold(imageWrapper, bitsPerPixel) {
	    if (!bitsPerPixel) {
	        bitsPerPixel = 8;
	    }
	    var hist,
	        threshold,
	        bitShift = 8 - bitsPerPixel;
	
	    function px(init, end) {
	        var sum = 0,
	            i;
	        for (i = init; i <= end; i++) {
	            sum += hist[i];
	        }
	        return sum;
	    }
	
	    function mx(init, end) {
	        var i,
	            sum = 0;
	
	        for (i = init; i <= end; i++) {
	            sum += i * hist[i];
	        }
	
	        return sum;
	    }
	
	    function determineThreshold() {
	        var vet = [0],
	            p1,
	            p2,
	            p12,
	            k,
	            m1,
	            m2,
	            m12,
	            max = (1 << bitsPerPixel) - 1;
	
	        hist = computeHistogram(imageWrapper, bitsPerPixel);
	        for (k = 1; k < max; k++) {
	            p1 = px(0, k);
	            p2 = px(k + 1, max);
	            p12 = p1 * p2;
	            if (p12 === 0) {
	                p12 = 1;
	            }
	            m1 = mx(0, k) * p2;
	            m2 = mx(k + 1, max) * p1;
	            m12 = m1 - m2;
	            vet[k] = m12 * m12 / p12;
	        }
	        return /* harmony import */__WEBPACK_IMPORTED_MODULE_1__array_helper__["a"].maxIndex(vet);
	    }
	
	    threshold = determineThreshold();
	    return threshold << bitShift;
	};
	
	function otsuThreshold(imageWrapper, targetWrapper) {
	    var threshold = determineOtsuThreshold(imageWrapper);
	
	    thresholdImage(imageWrapper, threshold, targetWrapper);
	    return threshold;
	};
	
	// local thresholding
	function computeBinaryImage(imageWrapper, integralWrapper, targetWrapper) {
	    computeIntegralImage(imageWrapper, integralWrapper);
	
	    if (!targetWrapper) {
	        targetWrapper = imageWrapper;
	    }
	    var imageData = imageWrapper.data;
	    var targetData = targetWrapper.data;
	    var width = imageWrapper.size.x;
	    var height = imageWrapper.size.y;
	    var integralImageData = integralWrapper.data;
	    var sum = 0,
	        v,
	        u,
	        kernel = 3,
	        A,
	        B,
	        C,
	        D,
	        avg,
	        size = (kernel * 2 + 1) * (kernel * 2 + 1);
	
	    // clear out top & bottom-border
	    for (v = 0; v <= kernel; v++) {
	        for (u = 0; u < width; u++) {
	            targetData[v * width + u] = 0;
	            targetData[(height - 1 - v) * width + u] = 0;
	        }
	    }
	
	    // clear out left & right border
	    for (v = kernel; v < height - kernel; v++) {
	        for (u = 0; u <= kernel; u++) {
	            targetData[v * width + u] = 0;
	            targetData[v * width + (width - 1 - u)] = 0;
	        }
	    }
	
	    for (v = kernel + 1; v < height - kernel - 1; v++) {
	        for (u = kernel + 1; u < width - kernel; u++) {
	            A = integralImageData[(v - kernel - 1) * width + (u - kernel - 1)];
	            B = integralImageData[(v - kernel - 1) * width + (u + kernel)];
	            C = integralImageData[(v + kernel) * width + (u - kernel - 1)];
	            D = integralImageData[(v + kernel) * width + (u + kernel)];
	            sum = D - C - B + A;
	            avg = sum / size;
	            targetData[v * width + u] = imageData[v * width + u] > avg + 5 ? 0 : 1;
	        }
	    }
	};
	
	function cluster(points, threshold, property) {
	    var i,
	        k,
	        cluster,
	        point,
	        clusters = [];
	
	    if (!property) {
	        property = "rad";
	    }
	
	    function addToCluster(newPoint) {
	        var found = false;
	        for (k = 0; k < clusters.length; k++) {
	            cluster = clusters[k];
	            if (cluster.fits(newPoint)) {
	                cluster.add(newPoint);
	                found = true;
	            }
	        }
	        return found;
	    }
	
	    // iterate over each cloud
	    for (i = 0; i < points.length; i++) {
	        point = /* harmony import */__WEBPACK_IMPORTED_MODULE_0__cluster__["a"].createPoint(points[i], i, property);
	        if (!addToCluster(point)) {
	            clusters.push(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__cluster__["a"].create(point, threshold));
	        }
	    }
	    return clusters;
	};
	
	var Tracer = {
	    trace: function trace(points, vec) {
	        var iteration,
	            maxIterations = 10,
	            top = [],
	            result = [],
	            centerPos = 0,
	            currentPos = 0;
	
	        function trace(idx, forward) {
	            var from,
	                to,
	                toIdx,
	                predictedPos,
	                thresholdX = 1,
	                thresholdY = Math.abs(vec[1] / 10),
	                found = false;
	
	            function match(pos, predicted) {
	                if (pos.x > predicted.x - thresholdX && pos.x < predicted.x + thresholdX && pos.y > predicted.y - thresholdY && pos.y < predicted.y + thresholdY) {
	                    return true;
	                } else {
	                    return false;
	                }
	            }
	
	            // check if the next index is within the vec specifications
	            // if not, check as long as the threshold is met
	
	            from = points[idx];
	            if (forward) {
	                predictedPos = {
	                    x: from.x + vec[0],
	                    y: from.y + vec[1]
	                };
	            } else {
	                predictedPos = {
	                    x: from.x - vec[0],
	                    y: from.y - vec[1]
	                };
	            }
	
	            toIdx = forward ? idx + 1 : idx - 1;
	            to = points[toIdx];
	            while (to && (found = match(to, predictedPos)) !== true && Math.abs(to.y - from.y) < vec[1]) {
	                toIdx = forward ? toIdx + 1 : toIdx - 1;
	                to = points[toIdx];
	            }
	
	            return found ? toIdx : null;
	        }
	
	        for (iteration = 0; iteration < maxIterations; iteration++) {
	            // randomly select point to start with
	            centerPos = Math.floor(Math.random() * points.length);
	
	            // trace forward
	            top = [];
	            currentPos = centerPos;
	            top.push(points[currentPos]);
	            while ((currentPos = trace(currentPos, true)) !== null) {
	                top.push(points[currentPos]);
	            }
	            if (centerPos > 0) {
	                currentPos = centerPos;
	                while ((currentPos = trace(currentPos, false)) !== null) {
	                    top.push(points[currentPos]);
	                }
	            }
	
	            if (top.length > result.length) {
	                result = top;
	            }
	        }
	        return result;
	    }
	};/* unused harmony export Tracer */
	
	var DILATE = 1;/* unused harmony export DILATE */
	var ERODE = 2;/* unused harmony export ERODE */
	
	function dilate(inImageWrapper, outImageWrapper) {
	    var v,
	        u,
	        inImageData = inImageWrapper.data,
	        outImageData = outImageWrapper.data,
	        height = inImageWrapper.size.y,
	        width = inImageWrapper.size.x,
	        sum,
	        yStart1,
	        yStart2,
	        xStart1,
	        xStart2;
	
	    for (v = 1; v < height - 1; v++) {
	        for (u = 1; u < width - 1; u++) {
	            yStart1 = v - 1;
	            yStart2 = v + 1;
	            xStart1 = u - 1;
	            xStart2 = u + 1;
	            sum = inImageData[yStart1 * width + xStart1] + inImageData[yStart1 * width + xStart2] + inImageData[v * width + u] + inImageData[yStart2 * width + xStart1] + inImageData[yStart2 * width + xStart2];
	            outImageData[v * width + u] = sum > 0 ? 1 : 0;
	        }
	    }
	};
	
	function erode(inImageWrapper, outImageWrapper) {
	    var v,
	        u,
	        inImageData = inImageWrapper.data,
	        outImageData = outImageWrapper.data,
	        height = inImageWrapper.size.y,
	        width = inImageWrapper.size.x,
	        sum,
	        yStart1,
	        yStart2,
	        xStart1,
	        xStart2;
	
	    for (v = 1; v < height - 1; v++) {
	        for (u = 1; u < width - 1; u++) {
	            yStart1 = v - 1;
	            yStart2 = v + 1;
	            xStart1 = u - 1;
	            xStart2 = u + 1;
	            sum = inImageData[yStart1 * width + xStart1] + inImageData[yStart1 * width + xStart2] + inImageData[v * width + u] + inImageData[yStart2 * width + xStart1] + inImageData[yStart2 * width + xStart2];
	            outImageData[v * width + u] = sum === 5 ? 1 : 0;
	        }
	    }
	};
	
	function subtract(aImageWrapper, bImageWrapper, resultImageWrapper) {
	    if (!resultImageWrapper) {
	        resultImageWrapper = aImageWrapper;
	    }
	    var length = aImageWrapper.data.length,
	        aImageData = aImageWrapper.data,
	        bImageData = bImageWrapper.data,
	        cImageData = resultImageWrapper.data;
	
	    while (length--) {
	        cImageData[length] = aImageData[length] - bImageData[length];
	    }
	};
	
	function bitwiseOr(aImageWrapper, bImageWrapper, resultImageWrapper) {
	    if (!resultImageWrapper) {
	        resultImageWrapper = aImageWrapper;
	    }
	    var length = aImageWrapper.data.length,
	        aImageData = aImageWrapper.data,
	        bImageData = bImageWrapper.data,
	        cImageData = resultImageWrapper.data;
	
	    while (length--) {
	        cImageData[length] = aImageData[length] || bImageData[length];
	    }
	};
	
	function countNonZero(imageWrapper) {
	    var length = imageWrapper.data.length,
	        data = imageWrapper.data,
	        sum = 0;
	
	    while (length--) {
	        sum += data[length];
	    }
	    return sum;
	};
	
	function topGeneric(list, top, scoreFunc) {
	    var i,
	        minIdx = 0,
	        min = 0,
	        queue = [],
	        score,
	        hit,
	        pos;
	
	    for (i = 0; i < top; i++) {
	        queue[i] = {
	            score: 0,
	            item: null
	        };
	    }
	
	    for (i = 0; i < list.length; i++) {
	        score = scoreFunc.apply(this, [list[i]]);
	        if (score > min) {
	            hit = queue[minIdx];
	            hit.score = score;
	            hit.item = list[i];
	            min = Number.MAX_VALUE;
	            for (pos = 0; pos < top; pos++) {
	                if (queue[pos].score < min) {
	                    min = queue[pos].score;
	                    minIdx = pos;
	                }
	            }
	        }
	    }
	
	    return queue;
	};
	
	function grayArrayFromImage(htmlImage, offsetX, ctx, array) {
	    ctx.drawImage(htmlImage, offsetX, 0, htmlImage.width, htmlImage.height);
	    var ctxData = ctx.getImageData(offsetX, 0, htmlImage.width, htmlImage.height).data;
	    computeGray(ctxData, array);
	};
	
	function grayArrayFromContext(ctx, size, offset, array) {
	    var ctxData = ctx.getImageData(offset.x, offset.y, size.x, size.y).data;
	    computeGray(ctxData, array);
	};
	
	function grayAndHalfSampleFromCanvasData(canvasData, size, outArray) {
	    var topRowIdx = 0;
	    var bottomRowIdx = size.x;
	    var endIdx = Math.floor(canvasData.length / 4);
	    var outWidth = size.x / 2;
	    var outImgIdx = 0;
	    var inWidth = size.x;
	    var i;
	
	    while (bottomRowIdx < endIdx) {
	        for (i = 0; i < outWidth; i++) {
	            outArray[outImgIdx] = Math.floor((0.299 * canvasData[topRowIdx * 4 + 0] + 0.587 * canvasData[topRowIdx * 4 + 1] + 0.114 * canvasData[topRowIdx * 4 + 2] + (0.299 * canvasData[(topRowIdx + 1) * 4 + 0] + 0.587 * canvasData[(topRowIdx + 1) * 4 + 1] + 0.114 * canvasData[(topRowIdx + 1) * 4 + 2]) + (0.299 * canvasData[bottomRowIdx * 4 + 0] + 0.587 * canvasData[bottomRowIdx * 4 + 1] + 0.114 * canvasData[bottomRowIdx * 4 + 2]) + (0.299 * canvasData[(bottomRowIdx + 1) * 4 + 0] + 0.587 * canvasData[(bottomRowIdx + 1) * 4 + 1] + 0.114 * canvasData[(bottomRowIdx + 1) * 4 + 2])) / 4);
	            outImgIdx++;
	            topRowIdx = topRowIdx + 2;
	            bottomRowIdx = bottomRowIdx + 2;
	        }
	        topRowIdx = topRowIdx + inWidth;
	        bottomRowIdx = bottomRowIdx + inWidth;
	    }
	};
	
	function computeGray(imageData, outArray, config) {
	    var l = imageData.length / 4 | 0,
	        i,
	        singleChannel = config && config.singleChannel === true;
	
	    if (singleChannel) {
	        for (i = 0; i < l; i++) {
	            outArray[i] = imageData[i * 4 + 0];
	        }
	    } else {
	        for (i = 0; i < l; i++) {
	            outArray[i] = Math.floor(0.299 * imageData[i * 4 + 0] + 0.587 * imageData[i * 4 + 1] + 0.114 * imageData[i * 4 + 2]);
	        }
	    }
	};
	
	function loadImageArray(src, callback, canvas) {
	    if (!canvas) {
	        canvas = document.createElement('canvas');
	    }
	    var img = new Image();
	    img.callback = callback;
	    img.onload = function () {
	        canvas.width = this.width;
	        canvas.height = this.height;
	        var ctx = canvas.getContext('2d');
	        ctx.drawImage(this, 0, 0);
	        var array = new Uint8Array(this.width * this.height);
	        ctx.drawImage(this, 0, 0);
	        var data = ctx.getImageData(0, 0, this.width, this.height).data;
	        computeGray(data, array);
	        this.callback(array, {
	            x: this.width,
	            y: this.height
	        }, this);
	    };
	    img.src = src;
	};
	
	/**
	 * @param inImg {ImageWrapper} input image to be sampled
	 * @param outImg {ImageWrapper} to be stored in
	 */
	function halfSample(inImgWrapper, outImgWrapper) {
	    var inImg = inImgWrapper.data;
	    var inWidth = inImgWrapper.size.x;
	    var outImg = outImgWrapper.data;
	    var topRowIdx = 0;
	    var bottomRowIdx = inWidth;
	    var endIdx = inImg.length;
	    var outWidth = inWidth / 2;
	    var outImgIdx = 0;
	    while (bottomRowIdx < endIdx) {
	        for (var i = 0; i < outWidth; i++) {
	            outImg[outImgIdx] = Math.floor((inImg[topRowIdx] + inImg[topRowIdx + 1] + inImg[bottomRowIdx] + inImg[bottomRowIdx + 1]) / 4);
	            outImgIdx++;
	            topRowIdx = topRowIdx + 2;
	            bottomRowIdx = bottomRowIdx + 2;
	        }
	        topRowIdx = topRowIdx + inWidth;
	        bottomRowIdx = bottomRowIdx + inWidth;
	    }
	};
	
	function hsv2rgb(hsv, rgb) {
	    var h = hsv[0],
	        s = hsv[1],
	        v = hsv[2],
	        c = v * s,
	        x = c * (1 - Math.abs(h / 60 % 2 - 1)),
	        m = v - c,
	        r = 0,
	        g = 0,
	        b = 0;
	
	    rgb = rgb || [0, 0, 0];
	
	    if (h < 60) {
	        r = c;
	        g = x;
	    } else if (h < 120) {
	        r = x;
	        g = c;
	    } else if (h < 180) {
	        g = c;
	        b = x;
	    } else if (h < 240) {
	        g = x;
	        b = c;
	    } else if (h < 300) {
	        r = x;
	        b = c;
	    } else if (h < 360) {
	        r = c;
	        b = x;
	    }
	    rgb[0] = (r + m) * 255 | 0;
	    rgb[1] = (g + m) * 255 | 0;
	    rgb[2] = (b + m) * 255 | 0;
	    return rgb;
	};
	
	function _computeDivisors(n) {
	    var largeDivisors = [],
	        divisors = [],
	        i;
	
	    for (i = 1; i < Math.sqrt(n) + 1; i++) {
	        if (n % i === 0) {
	            divisors.push(i);
	            if (i !== n / i) {
	                largeDivisors.unshift(Math.floor(n / i));
	            }
	        }
	    }
	    return divisors.concat(largeDivisors);
	};
	
	function _computeIntersection(arr1, arr2) {
	    var i = 0,
	        j = 0,
	        result = [];
	
	    while (i < arr1.length && j < arr2.length) {
	        if (arr1[i] === arr2[j]) {
	            result.push(arr1[i]);
	            i++;
	            j++;
	        } else if (arr1[i] > arr2[j]) {
	            j++;
	        } else {
	            i++;
	        }
	    }
	    return result;
	};
	
	function calculatePatchSize(patchSize, imgSize) {
	    var divisorsX = _computeDivisors(imgSize.x),
	        divisorsY = _computeDivisors(imgSize.y),
	        wideSide = Math.max(imgSize.x, imgSize.y),
	        common = _computeIntersection(divisorsX, divisorsY),
	        nrOfPatchesList = [8, 10, 15, 20, 32, 60, 80],
	        nrOfPatchesMap = {
	        "x-small": 5,
	        "small": 4,
	        "medium": 3,
	        "large": 2,
	        "x-large": 1
	    },
	        nrOfPatchesIdx = nrOfPatchesMap[patchSize] || nrOfPatchesMap.medium,
	        nrOfPatches = nrOfPatchesList[nrOfPatchesIdx],
	        desiredPatchSize = Math.floor(wideSide / nrOfPatches),
	        optimalPatchSize;
	
	    function findPatchSizeForDivisors(divisors) {
	        var i = 0,
	            found = divisors[Math.floor(divisors.length / 2)];
	
	        while (i < divisors.length - 1 && divisors[i] < desiredPatchSize) {
	            i++;
	        }
	        if (i > 0) {
	            if (Math.abs(divisors[i] - desiredPatchSize) > Math.abs(divisors[i - 1] - desiredPatchSize)) {
	                found = divisors[i - 1];
	            } else {
	                found = divisors[i];
	            }
	        }
	        if (desiredPatchSize / found < nrOfPatchesList[nrOfPatchesIdx + 1] / nrOfPatchesList[nrOfPatchesIdx] && desiredPatchSize / found > nrOfPatchesList[nrOfPatchesIdx - 1] / nrOfPatchesList[nrOfPatchesIdx]) {
	            return { x: found, y: found };
	        }
	        return null;
	    }
	
	    optimalPatchSize = findPatchSizeForDivisors(common);
	    if (!optimalPatchSize) {
	        optimalPatchSize = findPatchSizeForDivisors(_computeDivisors(wideSide));
	        if (!optimalPatchSize) {
	            optimalPatchSize = findPatchSizeForDivisors(_computeDivisors(desiredPatchSize * nrOfPatches));
	        }
	    }
	    return optimalPatchSize;
	};
	
	function _parseCSSDimensionValues(value) {
	    var dimension = {
	        value: parseFloat(value),
	        unit: value.indexOf("%") === value.length - 1 ? "%" : "%"
	    };
	
	    return dimension;
	};
	
	var _dimensionsConverters = {
	    top: function top(dimension, context) {
	        if (dimension.unit === "%") {
	            return Math.floor(context.height * (dimension.value / 100));
	        }
	    },
	    right: function right(dimension, context) {
	        if (dimension.unit === "%") {
	            return Math.floor(context.width - context.width * (dimension.value / 100));
	        }
	    },
	    bottom: function bottom(dimension, context) {
	        if (dimension.unit === "%") {
	            return Math.floor(context.height - context.height * (dimension.value / 100));
	        }
	    },
	    left: function left(dimension, context) {
	        if (dimension.unit === "%") {
	            return Math.floor(context.width * (dimension.value / 100));
	        }
	    }
	};/* unused harmony export _dimensionsConverters */
	
	function computeImageArea(inputWidth, inputHeight, area) {
	    var context = { width: inputWidth, height: inputHeight };
	
	    var parsedArea = Object.keys(area).reduce(function (result, key) {
	        var value = area[key],
	            parsed = _parseCSSDimensionValues(value),
	            calculated = _dimensionsConverters[key](parsed, context);
	
	        result[key] = calculated;
	        return result;
	    }, {});
	
	    return {
	        sx: parsedArea.left,
	        sy: parsedArea.top,
	        sw: parsedArea.right - parsedArea.left,
	        sh: parsedArea.bottom - parsedArea.top
	    };
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__subImage__ = __webpack_require__(71);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_cv_utils__ = __webpack_require__(25);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_array_helper__ = __webpack_require__(13);
	
	
	
	var vec2 = {
	    clone: __webpack_require__(10)
	};
	
	/**
	 * Represents a basic image combining the data and size.
	 * In addition, some methods for manipulation are contained.
	 * @param size {x,y} The size of the image in pixel
	 * @param data {Array} If given, a flat array containing the pixel data
	 * @param ArrayType {Type} If given, the desired DataType of the Array (may be typed/non-typed)
	 * @param initialize {Boolean} Indicating if the array should be initialized on creation.
	 * @returns {ImageWrapper}
	 */
	function ImageWrapper(size, data, ArrayType, initialize) {
	    if (!data) {
	        if (ArrayType) {
	            this.data = new ArrayType(size.x * size.y);
	            if (ArrayType === Array && initialize) {
	                /* harmony import */__WEBPACK_IMPORTED_MODULE_2__common_array_helper__["a"].init(this.data, 0);
	            }
	        } else {
	            this.data = new Uint8Array(size.x * size.y);
	            if (Uint8Array === Array && initialize) {
	                /* harmony import */__WEBPACK_IMPORTED_MODULE_2__common_array_helper__["a"].init(this.data, 0);
	            }
	        }
	    } else {
	        this.data = data;
	    }
	    this.size = size;
	}
	
	/**
	 * tests if a position is within the image with a given offset
	 * @param imgRef {x, y} The location to test
	 * @param border Number the padding value in pixel
	 * @returns {Boolean} true if location inside the image's border, false otherwise
	 * @see cvd/image.h
	 */
	ImageWrapper.prototype.inImageWithBorder = function (imgRef, border) {
	    return imgRef.x >= border && imgRef.y >= border && imgRef.x < this.size.x - border && imgRef.y < this.size.y - border;
	};
	
	/**
	 * Performs bilinear sampling
	 * @param inImg Image to extract sample from
	 * @param x the x-coordinate
	 * @param y the y-coordinate
	 * @returns the sampled value
	 * @see cvd/vision.h
	 */
	ImageWrapper.sample = function (inImg, x, y) {
	    var lx = Math.floor(x);
	    var ly = Math.floor(y);
	    var w = inImg.size.x;
	    var base = ly * inImg.size.x + lx;
	    var a = inImg.data[base + 0];
	    var b = inImg.data[base + 1];
	    var c = inImg.data[base + w];
	    var d = inImg.data[base + w + 1];
	    var e = a - b;
	    x -= lx;
	    y -= ly;
	
	    var result = Math.floor(x * (y * (e - c + d) - e) + y * (c - a) + a);
	    return result;
	};
	
	/**
	 * Initializes a given array. Sets each element to zero.
	 * @param array {Array} The array to initialize
	 */
	ImageWrapper.clearArray = function (array) {
	    var l = array.length;
	    while (l--) {
	        array[l] = 0;
	    }
	};
	
	/**
	 * Creates a {SubImage} from the current image ({this}).
	 * @param from {ImageRef} The position where to start the {SubImage} from. (top-left corner)
	 * @param size {ImageRef} The size of the resulting image
	 * @returns {SubImage} A shared part of the original image
	 */
	ImageWrapper.prototype.subImage = function (from, size) {
	    return new /* harmony import */__WEBPACK_IMPORTED_MODULE_0__subImage__["a"](from, size, this);
	};
	
	/**
	 * Creates an {ImageWrapper) and copies the needed underlying image-data area
	 * @param imageWrapper {ImageWrapper} The target {ImageWrapper} where the data should be copied
	 * @param from {ImageRef} The location where to copy from (top-left location)
	 */
	ImageWrapper.prototype.subImageAsCopy = function (imageWrapper, from) {
	    var sizeY = imageWrapper.size.y,
	        sizeX = imageWrapper.size.x;
	    var x, y;
	    for (x = 0; x < sizeX; x++) {
	        for (y = 0; y < sizeY; y++) {
	            imageWrapper.data[y * sizeX + x] = this.data[(from.y + y) * this.size.x + from.x + x];
	        }
	    }
	};
	
	ImageWrapper.prototype.copyTo = function (imageWrapper) {
	    var length = this.data.length,
	        srcData = this.data,
	        dstData = imageWrapper.data;
	
	    while (length--) {
	        dstData[length] = srcData[length];
	    }
	};
	
	/**
	 * Retrieves a given pixel position from the image
	 * @param x {Number} The x-position
	 * @param y {Number} The y-position
	 * @returns {Number} The grayscale value at the pixel-position
	 */
	ImageWrapper.prototype.get = function (x, y) {
	    return this.data[y * this.size.x + x];
	};
	
	/**
	 * Retrieves a given pixel position from the image
	 * @param x {Number} The x-position
	 * @param y {Number} The y-position
	 * @returns {Number} The grayscale value at the pixel-position
	 */
	ImageWrapper.prototype.getSafe = function (x, y) {
	    var i;
	
	    if (!this.indexMapping) {
	        this.indexMapping = {
	            x: [],
	            y: []
	        };
	        for (i = 0; i < this.size.x; i++) {
	            this.indexMapping.x[i] = i;
	            this.indexMapping.x[i + this.size.x] = i;
	        }
	        for (i = 0; i < this.size.y; i++) {
	            this.indexMapping.y[i] = i;
	            this.indexMapping.y[i + this.size.y] = i;
	        }
	    }
	    return this.data[this.indexMapping.y[y + this.size.y] * this.size.x + this.indexMapping.x[x + this.size.x]];
	};
	
	/**
	 * Sets a given pixel position in the image
	 * @param x {Number} The x-position
	 * @param y {Number} The y-position
	 * @param value {Number} The grayscale value to set
	 * @returns {ImageWrapper} The Image itself (for possible chaining)
	 */
	ImageWrapper.prototype.set = function (x, y, value) {
	    this.data[y * this.size.x + x] = value;
	    return this;
	};
	
	/**
	 * Sets the border of the image (1 pixel) to zero
	 */
	ImageWrapper.prototype.zeroBorder = function () {
	    var i,
	        width = this.size.x,
	        height = this.size.y,
	        data = this.data;
	    for (i = 0; i < width; i++) {
	        data[i] = data[(height - 1) * width + i] = 0;
	    }
	    for (i = 1; i < height - 1; i++) {
	        data[i * width] = data[i * width + (width - 1)] = 0;
	    }
	};
	
	/**
	 * Inverts a binary image in place
	 */
	ImageWrapper.prototype.invert = function () {
	    var data = this.data,
	        length = data.length;
	
	    while (length--) {
	        data[length] = data[length] ? 0 : 1;
	    }
	};
	
	ImageWrapper.prototype.convolve = function (kernel) {
	    var x,
	        y,
	        kx,
	        ky,
	        kSize = kernel.length / 2 | 0,
	        accu = 0;
	    for (y = 0; y < this.size.y; y++) {
	        for (x = 0; x < this.size.x; x++) {
	            accu = 0;
	            for (ky = -kSize; ky <= kSize; ky++) {
	                for (kx = -kSize; kx <= kSize; kx++) {
	                    accu += kernel[ky + kSize][kx + kSize] * this.getSafe(x + kx, y + ky);
	                }
	            }
	            this.data[y * this.size.x + x] = accu;
	        }
	    }
	};
	
	ImageWrapper.prototype.moments = function (labelcount) {
	    var data = this.data,
	        x,
	        y,
	        height = this.size.y,
	        width = this.size.x,
	        val,
	        ysq,
	        labelsum = [],
	        i,
	        label,
	        mu11,
	        mu02,
	        mu20,
	        x_,
	        y_,
	        tmp,
	        result = [],
	        PI = Math.PI,
	        PI_4 = PI / 4;
	
	    if (labelcount <= 0) {
	        return result;
	    }
	
	    for (i = 0; i < labelcount; i++) {
	        labelsum[i] = {
	            m00: 0,
	            m01: 0,
	            m10: 0,
	            m11: 0,
	            m02: 0,
	            m20: 0,
	            theta: 0,
	            rad: 0
	        };
	    }
	
	    for (y = 0; y < height; y++) {
	        ysq = y * y;
	        for (x = 0; x < width; x++) {
	            val = data[y * width + x];
	            if (val > 0) {
	                label = labelsum[val - 1];
	                label.m00 += 1;
	                label.m01 += y;
	                label.m10 += x;
	                label.m11 += x * y;
	                label.m02 += ysq;
	                label.m20 += x * x;
	            }
	        }
	    }
	
	    for (i = 0; i < labelcount; i++) {
	        label = labelsum[i];
	        if (!isNaN(label.m00) && label.m00 !== 0) {
	            x_ = label.m10 / label.m00;
	            y_ = label.m01 / label.m00;
	            mu11 = label.m11 / label.m00 - x_ * y_;
	            mu02 = label.m02 / label.m00 - y_ * y_;
	            mu20 = label.m20 / label.m00 - x_ * x_;
	            tmp = (mu02 - mu20) / (2 * mu11);
	            tmp = 0.5 * Math.atan(tmp) + (mu11 >= 0 ? PI_4 : -PI_4) + PI;
	            label.theta = (tmp * 180 / PI + 90) % 180 - 90;
	            if (label.theta < 0) {
	                label.theta += 180;
	            }
	            label.rad = tmp > PI ? tmp - PI : tmp;
	            label.vec = vec2.clone([Math.cos(tmp), Math.sin(tmp)]);
	            result.push(label);
	        }
	    }
	
	    return result;
	};
	
	/**
	 * Displays the {ImageWrapper} in a given canvas
	 * @param canvas {Canvas} The canvas element to write to
	 * @param scale {Number} Scale which is applied to each pixel-value
	 */
	ImageWrapper.prototype.show = function (canvas, scale) {
	    var ctx, frame, data, current, pixel, x, y;
	
	    if (!scale) {
	        scale = 1.0;
	    }
	    ctx = canvas.getContext('2d');
	    canvas.width = this.size.x;
	    canvas.height = this.size.y;
	    frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
	    data = frame.data;
	    current = 0;
	    for (y = 0; y < this.size.y; y++) {
	        for (x = 0; x < this.size.x; x++) {
	            pixel = y * this.size.x + x;
	            current = this.get(x, y) * scale;
	            data[pixel * 4 + 0] = current;
	            data[pixel * 4 + 1] = current;
	            data[pixel * 4 + 2] = current;
	            data[pixel * 4 + 3] = 255;
	        }
	    }
	    //frame.data = data;
	    ctx.putImageData(frame, 0, 0);
	};
	
	/**
	 * Displays the {SubImage} in a given canvas
	 * @param canvas {Canvas} The canvas element to write to
	 * @param scale {Number} Scale which is applied to each pixel-value
	 */
	ImageWrapper.prototype.overlay = function (canvas, scale, from) {
	    if (!scale || scale < 0 || scale > 360) {
	        scale = 360;
	    }
	    var hsv = [0, 1, 1];
	    var rgb = [0, 0, 0];
	    var whiteRgb = [255, 255, 255];
	    var blackRgb = [0, 0, 0];
	    var result = [];
	    var ctx = canvas.getContext('2d');
	    var frame = ctx.getImageData(from.x, from.y, this.size.x, this.size.y);
	    var data = frame.data;
	    var length = this.data.length;
	    while (length--) {
	        hsv[0] = this.data[length] * scale;
	        result = hsv[0] <= 0 ? whiteRgb : hsv[0] >= 360 ? blackRgb : /* harmony import */__WEBPACK_IMPORTED_MODULE_1__common_cv_utils__["a"].bind()(hsv, rgb);
	        data[length * 4 + 0] = result[0];
	        data[length * 4 + 1] = result[1];
	        data[length * 4 + 2] = result[2];
	        data[length * 4 + 3] = 255;
	    }
	    ctx.putImageData(frame, from.x, from.y);
	};
	
	/* harmony default export */ exports["a"] = ImageWrapper;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(3);
	
	/** Built-in value references. */
	var Symbol = root.Symbol;
	
	module.e = Symbol;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array.length;
	
	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}
	
	module.e = arrayReduce;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var copyObjectWith = __webpack_require__(140);
	
	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object) {
	  return copyObjectWith(source, props, object);
	}
	
	module.e = copyObject;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(0);
	
	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;
	
	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (typeof value == 'number') {
	    return true;
	  }
	  return !isArray(value) &&
	    (reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	      (object != null && value in Object(object)));
	}
	
	module.e = isKey;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
	
	  return value === proto;
	}
	
	module.e = isPrototype;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(22),
	    isObjectLike = __webpack_require__(4);
	
	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}
	
	module.e = isArrayLikeObject;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(0),
	    isObjectLike = __webpack_require__(4);
	
	/** `Object#toString` result references. */
	var stringTag = '[object String]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	}
	
	module.e = isString;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(23),
	    isObjectLike = __webpack_require__(4);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dateTag] = typedArrayTags[errorTag] =
	typedArrayTags[funcTag] = typedArrayTags[mapTag] =
	typedArrayTags[numberTag] = typedArrayTags[objectTag] =
	typedArrayTags[regexpTag] = typedArrayTags[setTag] =
	typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}
	
	module.e = isTypedArray;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var baseKeysIn = __webpack_require__(122),
	    indexKeys = __webpack_require__(60),
	    isIndex = __webpack_require__(18),
	    isPrototype = __webpack_require__(31);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  var index = -1,
	      isProto = isPrototype(object),
	      props = baseKeysIn(object),
	      propsLength = props.length,
	      indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;
	
	  while (++index < propsLength) {
	    var key = props[index];
	    if (!(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.e = keysIn;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_image_debug__ = __webpack_require__(8);
	
	
	function contains(codeResult, list) {
	    if (list) {
	        return list.some(function (item) {
	            return Object.keys(item).every(function (key) {
	                return item[key] === codeResult[key];
	            });
	        });
	    }
	    return false;
	}
	
	function passesFilter(codeResult, filter) {
	    if (typeof filter === 'function') {
	        return filter(codeResult);
	    }
	    return true;
	}
	
	/* harmony default export */ exports["a"] = {
	    create: function create(config) {
	        var canvas = document.createElement("canvas"),
	            ctx = canvas.getContext("2d"),
	            results = [],
	            capacity = config.capacity || 20,
	            capture = config.capture === true;
	
	        function matchesConstraints(codeResult) {
	            return capacity && codeResult && !contains(codeResult, config.blacklist) && passesFilter(codeResult, config.filter);
	        }
	
	        return {
	            addResult: function addResult(data, imageSize, codeResult) {
	                var result = {};
	
	                if (matchesConstraints(codeResult)) {
	                    capacity--;
	                    result.codeResult = codeResult;
	                    if (capture) {
	                        canvas.width = imageSize.x;
	                        canvas.height = imageSize.y;
	                        /* harmony import */__WEBPACK_IMPORTED_MODULE_0__common_image_debug__["a"].drawImage(data, imageSize, ctx);
	                        result.frame = canvas.toDataURL();
	                    }
	                    results.push(result);
	                }
	            },
	            getResults: function getResults() {
	                return results;
	            }
	        };
	    }
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var config = void 0;
	
	if (true) {
	    config = __webpack_require__(73);
	} else if (ENV.node) {
	    config = require('./config.node.js');
	} else {
	    config = require('./config.prod.js');
	}
	
	/* harmony default export */ exports["a"] = config;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * http://www.codeproject.com/Tips/407172/Connected-Component-Labeling-and-Vectorization
	 */
	var Tracer = {
	    searchDirections: [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]],
	    create: function create(imageWrapper, labelWrapper) {
	        var imageData = imageWrapper.data,
	            labelData = labelWrapper.data,
	            searchDirections = this.searchDirections,
	            width = imageWrapper.size.x,
	            pos;
	
	        function _trace(current, color, label, edgelabel) {
	            var i, y, x;
	
	            for (i = 0; i < 7; i++) {
	                y = current.cy + searchDirections[current.dir][0];
	                x = current.cx + searchDirections[current.dir][1];
	                pos = y * width + x;
	                if (imageData[pos] === color && (labelData[pos] === 0 || labelData[pos] === label)) {
	                    labelData[pos] = label;
	                    current.cy = y;
	                    current.cx = x;
	                    return true;
	                } else {
	                    if (labelData[pos] === 0) {
	                        labelData[pos] = edgelabel;
	                    }
	                    current.dir = (current.dir + 1) % 8;
	                }
	            }
	            return false;
	        }
	
	        function vertex2D(x, y, dir) {
	            return {
	                dir: dir,
	                x: x,
	                y: y,
	                next: null,
	                prev: null
	            };
	        }
	
	        function _contourTracing(sy, sx, label, color, edgelabel) {
	            var Fv = null,
	                Cv,
	                P,
	                ldir,
	                current = {
	                cx: sx,
	                cy: sy,
	                dir: 0
	            };
	
	            if (_trace(current, color, label, edgelabel)) {
	                Fv = vertex2D(sx, sy, current.dir);
	                Cv = Fv;
	                ldir = current.dir;
	                P = vertex2D(current.cx, current.cy, 0);
	                P.prev = Cv;
	                Cv.next = P;
	                P.next = null;
	                Cv = P;
	                do {
	                    current.dir = (current.dir + 6) % 8;
	                    _trace(current, color, label, edgelabel);
	                    if (ldir !== current.dir) {
	                        Cv.dir = current.dir;
	                        P = vertex2D(current.cx, current.cy, 0);
	                        P.prev = Cv;
	                        Cv.next = P;
	                        P.next = null;
	                        Cv = P;
	                    } else {
	                        Cv.dir = ldir;
	                        Cv.x = current.cx;
	                        Cv.y = current.cy;
	                    }
	                    ldir = current.dir;
	                } while (current.cx !== sx || current.cy !== sy);
	                Fv.prev = Cv.prev;
	                Cv.prev.next = Fv;
	            }
	            return Fv;
	        }
	
	        return {
	            trace: function trace(current, color, label, edgelabel) {
	                return _trace(current, color, label, edgelabel);
	            },
	            contourTracing: function contourTracing(sy, sx, label, color, edgelabel) {
	                return _contourTracing(sy, sx, label, color, edgelabel);
	            }
	        };
	    }
	};
	
	/* harmony default export */ exports["a"] = Tracer;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__barcode_reader__ = __webpack_require__(9);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_array_helper__ = __webpack_require__(13);
	
	
	
	function Code39Reader() {
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_0__barcode_reader__["a"].call(this);
	}
	
	var properties = {
	    ALPHABETH_STRING: { value: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. *$/+%" },
	    ALPHABET: { value: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 45, 46, 32, 42, 36, 47, 43, 37] },
	    CHARACTER_ENCODINGS: { value: [0x034, 0x121, 0x061, 0x160, 0x031, 0x130, 0x070, 0x025, 0x124, 0x064, 0x109, 0x049, 0x148, 0x019, 0x118, 0x058, 0x00D, 0x10C, 0x04C, 0x01C, 0x103, 0x043, 0x142, 0x013, 0x112, 0x052, 0x007, 0x106, 0x046, 0x016, 0x181, 0x0C1, 0x1C0, 0x091, 0x190, 0x0D0, 0x085, 0x184, 0x0C4, 0x094, 0x0A8, 0x0A2, 0x08A, 0x02A] },
	    ASTERISK: { value: 0x094 },
	    FORMAT: { value: "code_39", writeable: false }
	};
	
	Code39Reader.prototype = Object.create(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__barcode_reader__["a"].prototype, properties);
	Code39Reader.prototype.constructor = Code39Reader;
	
	Code39Reader.prototype._toCounters = function (start, counter) {
	    var self = this,
	        numCounters = counter.length,
	        end = self._row.length,
	        isWhite = !self._row[start],
	        i,
	        counterPos = 0;
	
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1__common_array_helper__["a"].init(counter, 0);
	
	    for (i = start; i < end; i++) {
	        if (self._row[i] ^ isWhite) {
	            counter[counterPos]++;
	        } else {
	            counterPos++;
	            if (counterPos === numCounters) {
	                break;
	            } else {
	                counter[counterPos] = 1;
	                isWhite = !isWhite;
	            }
	        }
	    }
	
	    return counter;
	};
	
	Code39Reader.prototype._decode = function () {
	    var self = this,
	        counters = [0, 0, 0, 0, 0, 0, 0, 0, 0],
	        result = [],
	        start = self._findStart(),
	        decodedChar,
	        lastStart,
	        pattern,
	        nextStart;
	
	    if (!start) {
	        return null;
	    }
	    nextStart = self._nextSet(self._row, start.end);
	
	    do {
	        counters = self._toCounters(nextStart, counters);
	        pattern = self._toPattern(counters);
	        if (pattern < 0) {
	            return null;
	        }
	        decodedChar = self._patternToChar(pattern);
	        if (decodedChar < 0) {
	            return null;
	        }
	        result.push(decodedChar);
	        lastStart = nextStart;
	        nextStart += /* harmony import */__WEBPACK_IMPORTED_MODULE_1__common_array_helper__["a"].sum(counters);
	        nextStart = self._nextSet(self._row, nextStart);
	    } while (decodedChar !== '*');
	    result.pop();
	
	    if (!result.length) {
	        return null;
	    }
	
	    if (!self._verifyTrailingWhitespace(lastStart, nextStart, counters)) {
	        return null;
	    }
	
	    return {
	        code: result.join(""),
	        start: start.start,
	        end: nextStart,
	        startInfo: start,
	        decodedCodes: result
	    };
	};
	
	Code39Reader.prototype._verifyTrailingWhitespace = function (lastStart, nextStart, counters) {
	    var trailingWhitespaceEnd,
	        patternSize = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__common_array_helper__["a"].sum(counters);
	
	    trailingWhitespaceEnd = nextStart - lastStart - patternSize;
	    if (trailingWhitespaceEnd * 3 >= patternSize) {
	        return true;
	    }
	    return false;
	};
	
	Code39Reader.prototype._patternToChar = function (pattern) {
	    var i,
	        self = this;
	
	    for (i = 0; i < self.CHARACTER_ENCODINGS.length; i++) {
	        if (self.CHARACTER_ENCODINGS[i] === pattern) {
	            return String.fromCharCode(self.ALPHABET[i]);
	        }
	    }
	    return -1;
	};
	
	Code39Reader.prototype._findNextWidth = function (counters, current) {
	    var i,
	        minWidth = Number.MAX_VALUE;
	
	    for (i = 0; i < counters.length; i++) {
	        if (counters[i] < minWidth && counters[i] > current) {
	            minWidth = counters[i];
	        }
	    }
	
	    return minWidth;
	};
	
	Code39Reader.prototype._toPattern = function (counters) {
	    var numCounters = counters.length,
	        maxNarrowWidth = 0,
	        numWideBars = numCounters,
	        wideBarWidth = 0,
	        self = this,
	        pattern,
	        i;
	
	    while (numWideBars > 3) {
	        maxNarrowWidth = self._findNextWidth(counters, maxNarrowWidth);
	        numWideBars = 0;
	        pattern = 0;
	        for (i = 0; i < numCounters; i++) {
	            if (counters[i] > maxNarrowWidth) {
	                pattern |= 1 << numCounters - 1 - i;
	                numWideBars++;
	                wideBarWidth += counters[i];
	            }
	        }
	
	        if (numWideBars === 3) {
	            for (i = 0; i < numCounters && numWideBars > 0; i++) {
	                if (counters[i] > maxNarrowWidth) {
	                    numWideBars--;
	                    if (counters[i] * 2 >= wideBarWidth) {
	                        return -1;
	                    }
	                }
	            }
	            return pattern;
	        }
	    }
	    return -1;
	};
	
	Code39Reader.prototype._findStart = function () {
	    var self = this,
	        offset = self._nextSet(self._row),
	        patternStart = offset,
	        counter = [0, 0, 0, 0, 0, 0, 0, 0, 0],
	        counterPos = 0,
	        isWhite = false,
	        i,
	        j,
	        whiteSpaceMustStart;
	
	    for (i = offset; i < self._row.length; i++) {
	        if (self._row[i] ^ isWhite) {
	            counter[counterPos]++;
	        } else {
	            if (counterPos === counter.length - 1) {
	                // find start pattern
	                if (self._toPattern(counter) === self.ASTERISK) {
	                    whiteSpaceMustStart = Math.floor(Math.max(0, patternStart - (i - patternStart) / 4));
	                    if (self._matchRange(whiteSpaceMustStart, patternStart, 0)) {
	                        return {
	                            start: patternStart,
	                            end: i
	                        };
	                    }
	                }
	
	                patternStart += counter[0] + counter[1];
	                for (j = 0; j < 7; j++) {
	                    counter[j] = counter[j + 2];
	                }
	                counter[7] = 0;
	                counter[8] = 0;
	                counterPos--;
	            } else {
	                counterPos++;
	            }
	            counter[counterPos] = 1;
	            isWhite = !isWhite;
	        }
	    }
	    return null;
	};
	
	/* harmony default export */ exports["a"] = Code39Reader;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	module.e = dot
	
	/**
	 * Calculates the dot product of two vec2's
	 *
	 * @param {vec2} a the first operand
	 * @param {vec2} b the second operand
	 * @returns {Number} dot product of a and b
	 */
	function dot(a, b) {
	    return a[0] * b[0] + a[1] * b[1]
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(3);
	
	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;
	
	module.e = Uint8Array;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;
	
	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}
	
	module.e = arrayEach;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(21);
	
	/**
	 * This function is like `assignValue` except that it doesn't assign
	 * `undefined` values.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignMergeValue(object, key, value) {
	  if ((value !== undefined && !eq(object[key], value)) ||
	      (typeof key == 'number' && value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}
	
	module.e = assignMergeValue;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(21);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}
	
	module.e = assignValue;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(15);
	
	/** Used for built-in method references. */
	var arrayProto = Array.prototype;
	
	/** Built-in value references. */
	var splice = arrayProto.splice;
	
	/**
	 * Removes `key` and its value from the associative array.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function assocDelete(array, key) {
	  var index = assocIndexOf(array, key);
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = array.length - 1;
	  if (index == lastIndex) {
	    array.pop();
	  } else {
	    splice.call(array, index, 1);
	  }
	  return true;
	}
	
	module.e = assocDelete;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(15);
	
	/**
	 * Gets the associative array value for `key`.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function assocGet(array, key) {
	  var index = assocIndexOf(array, key);
	  return index < 0 ? undefined : array[index][1];
	}
	
	module.e = assocGet;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(15);
	
	/**
	 * Checks if an associative array value for `key` exists.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function assocHas(array, key) {
	  return assocIndexOf(array, key) > -1;
	}
	
	module.e = assocHas;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(15);
	
	/**
	 * Sets the associative array `key` to `value`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function assocSet(array, key, value) {
	  var index = assocIndexOf(array, key);
	  if (index < 0) {
	    array.push([key, value]);
	  } else {
	    array[index][1] = value;
	  }
	}
	
	module.e = assocSet;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(0),
	    stringToPath = __webpack_require__(170);
	
	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function baseCastPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}
	
	module.e = baseCastPath;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(143);
	
	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();
	
	module.e = baseFor;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var baseCastPath = __webpack_require__(49),
	    isKey = __webpack_require__(30);
	
	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path + ''] : baseCastPath(path);
	
	  var index = 0,
	      length = path.length;
	
	  while (object != null && index < length) {
	    object = object[path[index++]];
	  }
	  return (index && index == length) ? object : undefined;
	}
	
	module.e = baseGet;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Built-in value references. */
	var getPrototypeOf = Object.getPrototypeOf;
	
	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return hasOwnProperty.call(object, key) ||
	    (typeof object == 'object' && key in object && getPrototypeOf(object) === null);
	}
	
	module.e = baseHas;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(118),
	    isObject = __webpack_require__(2),
	    isObjectLike = __webpack_require__(4);
	
	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {boolean} [bitmask] The bitmask of comparison flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - Unordered comparison
	 *     2 - Partial comparison
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, bitmask, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}
	
	module.e = baseIsEqual;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	module.e = baseProperty;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var Uint8Array = __webpack_require__(41);
	
	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}
	
	module.e = cloneArrayBuffer;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;
	
	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}
	
	module.e = copyArray;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var arraySome = __webpack_require__(110);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var index = -1,
	      isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      isUnordered = bitmask & UNORDERED_COMPARE_FLAG,
	      arrLength = array.length,
	      othLength = other.length;
	
	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(array, other);
	
	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];
	
	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (isUnordered) {
	      if (!arraySome(other, function(othValue) {
	            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack);
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  return result;
	}
	
	module.e = equalArrays;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(6),
	    Set = __webpack_require__(103),
	    WeakMap = __webpack_require__(104);
	
	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Used to detect maps, sets, and weakmaps. */
	var mapCtorString = Map ? funcToString.call(Map) : '',
	    setCtorString = Set ? funcToString.call(Set) : '',
	    weakMapCtorString = WeakMap ? funcToString.call(WeakMap) : '';
	
	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function getTag(value) {
	  return objectToString.call(value);
	}
	
	// Fallback for IE 11 providing `toStringTag` values for maps, sets, and weakmaps.
	if ((Map && getTag(new Map) != mapTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : null,
	        ctorString = typeof Ctor == 'function' ? funcToString.call(Ctor) : '';
	
	    if (ctorString) {
	      switch (ctorString) {
	        case mapCtorString: return mapTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}
	
	module.e = getTag;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(20);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(hash, key) {
	  return nativeCreate ? hash[key] !== undefined : hasOwnProperty.call(hash, key);
	}
	
	module.e = hashHas;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(131),
	    isArguments = __webpack_require__(11),
	    isArray = __webpack_require__(0),
	    isLength = __webpack_require__(23),
	    isString = __webpack_require__(33);
	
	/**
	 * Creates an array of index keys for `object` values of arrays,
	 * `arguments` objects, and strings, otherwise `null` is returned.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array|null} Returns index keys, else `null`.
	 */
	function indexKeys(object) {
	  var length = object ? object.length : undefined;
	  if (isLength(length) &&
	      (isArray(object) || isString(object) || isArguments(object))) {
	    return baseTimes(length, String);
	  }
	  return null;
	}
	
	module.e = indexKeys;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Converts `map` to an array.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);
	
	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}
	
	module.e = mapToArray;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Converts `set` to an array.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);
	
	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}
	
	module.e = setToArray;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(51);
	
	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined` the `defaultValue` is used in its place.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}
	
	module.e = get;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(114),
	    basePick = __webpack_require__(127),
	    rest = __webpack_require__(65);
	
	/**
	 * Creates an object composed of the picked `object` properties.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {...(string|string[])} [props] The property names to pick, specified
	 *  individually or in arrays.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': '2', 'c': 3 };
	 *
	 * _.pick(object, ['a', 'c']);
	 * // => { 'a': 1, 'c': 3 }
	 */
	var pick = rest(function(object, props) {
	  return object == null ? {} : basePick(object, baseFlatten(props, 1));
	});
	
	module.e = pick;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(107),
	    toInteger = __webpack_require__(182);
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://mdn.io/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.rest(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function rest(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);
	
	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, array);
	      case 1: return func.call(this, args[0], array);
	      case 2: return func.call(this, args[0], args[1], array);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return apply(func, this, otherArgs);
	  };
	}
	
	module.e = rest;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	module.e = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			Object.defineProperty(module, "exports", {
				enumerable: true,
				configurable: false,
				get: function() { return module.e; },
				set: function(v) { return module.e = v; }
			});
			Object.defineProperty(module, "loaded", {
				enumerable: true,
				configurable: false,
				get: function() { return module.l; }
			});
			Object.defineProperty(module, "id", {
				enumerable: true,
				configurable: false,
				get: function() { return module.i; }
			});
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_merge__ = __webpack_require__(7);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_merge___default = __WEBPACK_IMPORTED_MODULE_0_lodash_merge__ && __WEBPACK_IMPORTED_MODULE_0_lodash_merge__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_merge__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_merge__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_lodash_merge___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_lodash_merge___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_typedefs__ = __webpack_require__(72);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_typedefs___default = __WEBPACK_IMPORTED_MODULE_1__common_typedefs__ && __WEBPACK_IMPORTED_MODULE_1__common_typedefs__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__common_typedefs__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__common_typedefs__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1__common_typedefs___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1__common_typedefs___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_webrtc_adapter__ = __webpack_require__(188);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_webrtc_adapter___default = __WEBPACK_IMPORTED_MODULE_2_webrtc_adapter__ && __WEBPACK_IMPORTED_MODULE_2_webrtc_adapter__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2_webrtc_adapter__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2_webrtc_adapter__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_2_webrtc_adapter___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_2_webrtc_adapter___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__scanner__ = __webpack_require__(93);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_image_wrapper__ = __webpack_require__(26);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_image_debug__ = __webpack_require__(8);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__analytics_result_collector__ = __webpack_require__(36);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__config_config__ = __webpack_require__(37);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__input_config_factory__ = __webpack_require__(77);
	
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	
	
	
	
	
	
	
	
	
	
	function _fromSource(config, source) {
	    var inputConfig = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	    config = /* harmony import */__WEBPACK_IMPORTED_MODULE_8__input_config_factory__["a"].bind()(config, inputConfig, source);
	    var scanner = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__scanner__["a"].bind()();
	    return {
	        addEventListener: function addEventListener(eventType, cb) {
	            scanner.subscribe(eventType, cb);
	            return this;
	        },
	        removeEventListener: function removeEventListener(eventType, cb) {
	            scanner.unsubscribe(eventType, cb);
	            return this;
	        },
	        start: function start() {
	            scanner.init(config, function (error) {
	                if (error) {
	                    console.log(error);
	                    throw error;
	                }
	                scanner.start();
	            });
	            return this;
	        },
	        stop: function stop() {
	            scanner.stop();
	            return this;
	        },
	        toPromise: function toPromise() {
	            var _this = this;
	
	            if (config.inputStream.type === 'LiveStream' || config.inputStream.type === 'VideoStream') {
	                var _ret = function () {
	                    var cancelRequested = false;
	                    return {
	                        v: {
	                            cancel: function cancel() {
	                                cancelRequested = true;
	                            },
	
	                            promise: new Promise(function (resolve, reject) {
	                                function onProcessed(result) {
	                                    if (result && result.codeResult && result.codeResult.code) {
	                                        scanner.stop();
	                                        scanner.unsubscribe("processed", onProcessed);
	                                        resolve(result);
	                                    }
	                                    if (cancelRequested) {
	                                        scanner.stop();
	                                        scanner.unsubscribe("processed", onProcessed);
	                                        reject("cancelled!");
	                                    }
	                                }
	                                scanner.subscribe("processed", onProcessed);
	                                _this.start();
	                            })
	                        }
	                    };
	                }();
	
	                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	            } else {
	                return new Promise(function (resolve, reject) {
	                    scanner.decodeSingle(config, function (result) {
	                        if (result && result.codeResult && result.codeResult.code) {
	                            return resolve(result);
	                        }
	                        return reject(result);
	                    });
	                });
	            }
	        }
	    };
	}
	
	var defaultScanner = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__scanner__["a"].bind()();
	
	function setConfig() {
	    var configuration = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var _merge2;
	
	    var key = arguments[1];
	    var config = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	    var mergedConfig = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lodash_merge___default.a.bind()({}, configuration, (_merge2 = {}, _merge2[key] = config, _merge2));
	    return createApi(mergedConfig);
	}
	
	function createApi() {
	    var configuration = arguments.length <= 0 || arguments[0] === undefined ? /* harmony import */__WEBPACK_IMPORTED_MODULE_7__config_config__["a"] : arguments[0];
	
	    return {
	        fromSource: function fromSource(src, inputConfig) {
	            return _fromSource(configuration, src, inputConfig);
	        },
	        decoder: function decoder(conf) {
	            return setConfig(configuration, "decoder", conf);
	        },
	        locator: function locator(conf) {
	            return setConfig(configuration, "locator", conf);
	        },
	        throttle: function throttle(timeInMs) {
	            return setConfig(configuration, "frequency", 1000 / parseInt(timeInMs));
	        },
	        config: function config(conf) {
	            return createApi(/* harmony import */__WEBPACK_IMPORTED_MODULE_0_lodash_merge___default.a.bind()({}, configuration, conf));
	        },
	        registerResultCollector: function registerResultCollector(resultCollector) {
	            defaultScanner.registerResultCollector(resultCollector);
	        },
	        getCanvas: function getCanvas() {
	            return defaultScanner.canvas;
	        },
	
	        ImageWrapper: /* harmony import */__WEBPACK_IMPORTED_MODULE_4__common_image_wrapper__["a"],
	        ImageDebug: /* harmony import */__WEBPACK_IMPORTED_MODULE_5__common_image_debug__["a"],
	        ResultCollector: /* harmony import */__WEBPACK_IMPORTED_MODULE_6__analytics_result_collector__["a"],
	        _worker: {
	            createScanner: /* harmony import */__WEBPACK_IMPORTED_MODULE_3__scanner__["a"]
	        }
	    };
	}
	/* harmony default export */ exports["default"] = createApi();

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var vec2 = {
	    clone: __webpack_require__(10),
	    dot: __webpack_require__(40)
	};
	
	/**
	 * Creates a cluster for grouping similar orientations of datapoints
	 */
	/* harmony default export */ exports["a"] = {
	    create: function create(point, threshold) {
	        var points = [],
	            center = {
	            rad: 0,
	            vec: vec2.clone([0, 0])
	        },
	            pointMap = {};
	
	        function init() {
	            _add(point);
	            updateCenter();
	        }
	
	        function _add(pointToAdd) {
	            pointMap[pointToAdd.id] = pointToAdd;
	            points.push(pointToAdd);
	        }
	
	        function updateCenter() {
	            var i,
	                sum = 0;
	            for (i = 0; i < points.length; i++) {
	                sum += points[i].rad;
	            }
	            center.rad = sum / points.length;
	            center.vec = vec2.clone([Math.cos(center.rad), Math.sin(center.rad)]);
	        }
	
	        init();
	
	        return {
	            add: function add(pointToAdd) {
	                if (!pointMap[pointToAdd.id]) {
	                    _add(pointToAdd);
	                    updateCenter();
	                }
	            },
	            fits: function fits(otherPoint) {
	                // check cosine similarity to center-angle
	                var similarity = Math.abs(vec2.dot(otherPoint.point.vec, center.vec));
	                if (similarity > threshold) {
	                    return true;
	                }
	                return false;
	            },
	            getPoints: function getPoints() {
	                return points;
	            },
	            getCenter: function getCenter() {
	                return center;
	            }
	        };
	    },
	    createPoint: function createPoint(newPoint, id, property) {
	        return {
	            rad: newPoint[property],
	            point: newPoint,
	            id: id
	        };
	    }
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var hasWindow = typeof window !== 'undefined';
	var windowRef = hasWindow ? window : {};
	
	var windowObjects = ["MediaStream", "HTMLImageElement", "HTMLVideoElement", "HTMLCanvasElement", "FileList", "File", "URL"];
	
	var DOMHelper = windowObjects.reduce(function (result, obj) {
	    var _extends2;
	
	    return _extends({}, result, (_extends2 = {}, _extends2[obj] = obj in windowRef ? windowRef[obj] : function () {}, _extends2));
	}, {});
	
	/* harmony default export */ exports["a"] = DOMHelper;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony export */ exports["a"] = createEventedElement;function createEventedElement() {
	    var events = {};
	
	    function getEvent(eventName) {
	        if (!events[eventName]) {
	            events[eventName] = {
	                subscribers: []
	            };
	        }
	        return events[eventName];
	    }
	
	    function clearEvents() {
	        events = {};
	    }
	
	    function publishSubscription(subscription, data) {
	        if (subscription.async) {
	            setTimeout(function () {
	                subscription.callback(data);
	            }, 4);
	        } else {
	            subscription.callback(data);
	        }
	    }
	
	    function _subscribe(event, callback, async) {
	        var subscription;
	
	        if (typeof callback === "function") {
	            subscription = {
	                callback: callback,
	                async: async
	            };
	        } else {
	            subscription = callback;
	            if (!subscription.callback) {
	                throw "Callback was not specified on options";
	            }
	        }
	
	        getEvent(event).subscribers.push(subscription);
	    }
	
	    return {
	        subscribe: function subscribe(event, callback, async) {
	            return _subscribe(event, callback, async);
	        },
	        publish: function publish(eventName, data) {
	            var event = getEvent(eventName),
	                subscribers = event.subscribers;
	
	            // Publish one-time subscriptions
	            subscribers.filter(function (subscriber) {
	                return !!subscriber.once;
	            }).forEach(function (subscriber) {
	                publishSubscription(subscriber, data);
	            });
	
	            // remove them from the subscriber
	            event.subscribers = subscribers.filter(function (subscriber) {
	                return !subscriber.once;
	            });
	
	            // publish the rest
	            event.subscribers.forEach(function (subscriber) {
	                publishSubscription(subscriber, data);
	            });
	        },
	        once: function once(event, callback, async) {
	            _subscribe(event, {
	                callback: callback,
	                async: async,
	                once: true
	            });
	        },
	        unsubscribe: function unsubscribe(eventName, callback) {
	            var event;
	
	            if (eventName) {
	                event = getEvent(eventName);
	                if (event && callback) {
	                    event.subscribers = event.subscribers.filter(function (subscriber) {
	                        return subscriber.callback !== callback;
	                    });
	                } else {
	                    event.subscribers = [];
	                }
	            } else {
	                clearEvents();
	            }
	        }
	    };
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Construct representing a part of another {ImageWrapper}. Shares data
	 * between the parent and the child.
	 * @param from {ImageRef} The position where to start the {SubImage} from. (top-left corner)
	 * @param size {ImageRef} The size of the resulting image
	 * @param I {ImageWrapper} The {ImageWrapper} to share from
	 * @returns {SubImage} A shared part of the original image
	 */
	function SubImage(from, size, I) {
	    if (!I) {
	        I = {
	            data: null,
	            size: size
	        };
	    }
	    this.data = I.data;
	    this.originalSize = I.size;
	    this.I = I;
	
	    this.from = from;
	    this.size = size;
	}
	
	/**
	 * Displays the {SubImage} in a given canvas
	 * @param canvas {Canvas} The canvas element to write to
	 * @param scale {Number} Scale which is applied to each pixel-value
	 */
	SubImage.prototype.show = function (canvas, scale) {
	    var ctx, frame, data, current, y, x, pixel;
	
	    if (!scale) {
	        scale = 1.0;
	    }
	    ctx = canvas.getContext('2d');
	    canvas.width = this.size.x;
	    canvas.height = this.size.y;
	    frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
	    data = frame.data;
	    current = 0;
	    for (y = 0; y < this.size.y; y++) {
	        for (x = 0; x < this.size.x; x++) {
	            pixel = y * this.size.x + x;
	            current = this.get(x, y) * scale;
	            data[pixel * 4 + 0] = current;
	            data[pixel * 4 + 1] = current;
	            data[pixel * 4 + 2] = current;
	            data[pixel * 4 + 3] = 255;
	        }
	    }
	    frame.data = data;
	    ctx.putImageData(frame, 0, 0);
	};
	
	/**
	 * Retrieves a given pixel position from the {SubImage}
	 * @param x {Number} The x-position
	 * @param y {Number} The y-position
	 * @returns {Number} The grayscale value at the pixel-position
	 */
	SubImage.prototype.get = function (x, y) {
	    return this.data[(this.from.y + y) * this.originalSize.x + this.from.x + x];
	};
	
	/**
	 * Updates the underlying data from a given {ImageWrapper}
	 * @param image {ImageWrapper} The updated image
	 */
	SubImage.prototype.updateData = function (image) {
	    this.originalSize = image.size;
	    this.data = image.data;
	};
	
	/**
	 * Updates the position of the shared area
	 * @param from {x,y} The new location
	 * @returns {SubImage} returns {this} for possible chaining
	 */
	SubImage.prototype.updateFrom = function (from) {
	    this.from = from;
	    return this;
	};
	
	/* harmony default export */ exports["a"] = SubImage;

/***/ },
/* 72 */
/***/ function(module, exports) {

	/*
	 * typedefs.js
	 * Normalizes browser-specific prefixes
	 */
	
	if (typeof window !== 'undefined') {
	    window.requestAnimFrame = function () {
	        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function ( /* function FrameRequestCallback */callback) {
	            window.setTimeout(callback, 1000 / 60);
	        };
	    }();
	}
	Math.imul = Math.imul || function (a, b) {
	    var ah = a >>> 16 & 0xffff,
	        al = a & 0xffff,
	        bh = b >>> 16 & 0xffff,
	        bl = b & 0xffff;
	    // the shift by 0 fixes the sign on the high part
	    // the final |0 converts the unsigned value into a signed value
	    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	module.e = {
	    inputStream: {
	        name: "Live",
	        type: "LiveStream",
	        constraints: {
	            width: 640,
	            height: 480,
	            // aspectRatio: 640/480, // optional
	            facingMode: "environment" },
	        // or user
	        // deviceId: "38745983457387598375983759834"
	        area: {
	            top: "0%",
	            right: "0%",
	            left: "0%",
	            bottom: "0%"
	        },
	        singleChannel: false // true: only the red color-channel is read
	    },
	    locate: true,
	    numOfWorkers: 2,
	    decoder: {
	        readers: ['code_128_reader'],
	        debug: {
	            drawBoundingBox: false,
	            showFrequency: false,
	            drawScanline: false,
	            showPattern: false
	        }
	    },
	    locator: {
	        halfSample: true,
	        patchSize: "medium", // x-small, small, medium, large, x-large
	        debug: {
	            showCanvas: false,
	            showPatches: false,
	            showFoundPatches: false,
	            showSkeleton: false,
	            showLabels: false,
	            showPatchLabels: false,
	            showRemainingPatchLabels: false,
	            boxFromPatches: {
	                showTransformed: false,
	                showTransformedBox: false,
	                showBB: false
	            }
	        }
	    }
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bresenham__ = __webpack_require__(75);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_image_debug__ = __webpack_require__(8);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reader_code_128_reader__ = __webpack_require__(85);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reader_ean_reader__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reader_code_39_reader__ = __webpack_require__(39);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__reader_code_39_vin_reader__ = __webpack_require__(86);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__reader_codabar_reader__ = __webpack_require__(84);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__reader_upc_reader__ = __webpack_require__(92);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__reader_ean_8_reader__ = __webpack_require__(89);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__reader_ean_2_reader__ = __webpack_require__(87);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__reader_ean_5_reader__ = __webpack_require__(88);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__reader_upc_e_reader__ = __webpack_require__(91);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__reader_i2of5_reader__ = __webpack_require__(90);
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	var READERS = {
	    code_128_reader: /* harmony import */__WEBPACK_IMPORTED_MODULE_2__reader_code_128_reader__["a"],
	    ean_reader: /* harmony import */__WEBPACK_IMPORTED_MODULE_3__reader_ean_reader__["a"],
	    ean_5_reader: /* harmony import */__WEBPACK_IMPORTED_MODULE_10__reader_ean_5_reader__["a"],
	    ean_2_reader: /* harmony import */__WEBPACK_IMPORTED_MODULE_9__reader_ean_2_reader__["a"],
	    ean_8_reader: /* harmony import */__WEBPACK_IMPORTED_MODULE_8__reader_ean_8_reader__["a"],
	    code_39_reader: /* harmony import */__WEBPACK_IMPORTED_MODULE_4__reader_code_39_reader__["a"],
	    code_39_vin_reader: /* harmony import */__WEBPACK_IMPORTED_MODULE_5__reader_code_39_vin_reader__["a"],
	    codabar_reader: /* harmony import */__WEBPACK_IMPORTED_MODULE_6__reader_codabar_reader__["a"],
	    upc_reader: /* harmony import */__WEBPACK_IMPORTED_MODULE_7__reader_upc_reader__["a"],
	    upc_e_reader: /* harmony import */__WEBPACK_IMPORTED_MODULE_11__reader_upc_e_reader__["a"],
	    i2of5_reader: /* harmony import */__WEBPACK_IMPORTED_MODULE_12__reader_i2of5_reader__["a"]
	};
	/* harmony default export */ exports["a"] = {
	    create: function create(config, inputImageWrapper) {
	        var _canvas = {
	            ctx: {
	                frequency: null,
	                pattern: null,
	                overlay: null
	            },
	            dom: {
	                frequency: null,
	                pattern: null,
	                overlay: null
	            }
	        },
	            _barcodeReaders = [];
	
	        initCanvas();
	        initReaders();
	        initConfig();
	
	        function initCanvas() {
	            if (true && typeof document !== 'undefined') {
	                var $debug = document.querySelector("#debug.detection");
	                _canvas.dom.frequency = document.querySelector("canvas.frequency");
	                if (!_canvas.dom.frequency) {
	                    _canvas.dom.frequency = document.createElement("canvas");
	                    _canvas.dom.frequency.className = "frequency";
	                    if ($debug) {
	                        $debug.appendChild(_canvas.dom.frequency);
	                    }
	                }
	                _canvas.ctx.frequency = _canvas.dom.frequency.getContext("2d");
	
	                _canvas.dom.pattern = document.querySelector("canvas.patternBuffer");
	                if (!_canvas.dom.pattern) {
	                    _canvas.dom.pattern = document.createElement("canvas");
	                    _canvas.dom.pattern.className = "patternBuffer";
	                    if ($debug) {
	                        $debug.appendChild(_canvas.dom.pattern);
	                    }
	                }
	                _canvas.ctx.pattern = _canvas.dom.pattern.getContext("2d");
	
	                _canvas.dom.overlay = document.querySelector("canvas.drawingBuffer");
	                if (_canvas.dom.overlay) {
	                    _canvas.ctx.overlay = _canvas.dom.overlay.getContext("2d");
	                }
	            }
	        }
	
	        function initReaders() {
	            config.readers.forEach(function (readerConfig) {
	                var reader,
	                    configuration = {},
	                    supplements = [];
	
	                if ((typeof readerConfig === 'undefined' ? 'undefined' : _typeof(readerConfig)) === 'object') {
	                    reader = readerConfig.format;
	                    configuration = readerConfig.config;
	                } else if (typeof readerConfig === 'string') {
	                    reader = readerConfig;
	                }
	                if (true) {
	                    console.log("Before registering reader: ", reader);
	                }
	                if (configuration.supplements) {
	                    supplements = configuration.supplements.map(function (supplement) {
	                        return new READERS[supplement]();
	                    });
	                }
	                _barcodeReaders.push(new READERS[reader](configuration, supplements));
	            });
	            if (true) {
	                console.log("Registered Readers: " + _barcodeReaders.map(function (reader) {
	                    return JSON.stringify({ format: reader.FORMAT, config: reader.config });
	                }).join(', '));
	            }
	        }
	
	        function initConfig() {
	            if (true && typeof document !== 'undefined') {
	                var i,
	                    vis = [{
	                    node: _canvas.dom.frequency,
	                    prop: config.debug.showFrequency
	                }, {
	                    node: _canvas.dom.pattern,
	                    prop: config.debug.showPattern
	                }];
	
	                for (i = 0; i < vis.length; i++) {
	                    if (vis[i].prop === true) {
	                        vis[i].node.style.display = "block";
	                    } else {
	                        vis[i].node.style.display = "none";
	                    }
	                }
	            }
	        }
	
	        /**
	         * extend the line on both ends
	         * @param {Array} line
	         * @param {Number} angle
	         */
	        function getExtendedLine(line, angle, ext) {
	            function extendLine(amount) {
	                var extension = {
	                    y: amount * Math.sin(angle),
	                    x: amount * Math.cos(angle)
	                };
	
	                line[0].y -= extension.y;
	                line[0].x -= extension.x;
	                line[1].y += extension.y;
	                line[1].x += extension.x;
	            }
	
	            // check if inside image
	            extendLine(ext);
	            while (ext > 1 && (!inputImageWrapper.inImageWithBorder(line[0], 0) || !inputImageWrapper.inImageWithBorder(line[1], 0))) {
	                ext -= Math.ceil(ext / 2);
	                extendLine(-ext);
	            }
	            return line;
	        }
	
	        function getLine(box) {
	            return [{
	                x: (box[1][0] - box[0][0]) / 2 + box[0][0],
	                y: (box[1][1] - box[0][1]) / 2 + box[0][1]
	            }, {
	                x: (box[3][0] - box[2][0]) / 2 + box[2][0],
	                y: (box[3][1] - box[2][1]) / 2 + box[2][1]
	            }];
	        }
	
	        function tryDecode(line) {
	            var result = null,
	                i,
	                barcodeLine = /* harmony import */__WEBPACK_IMPORTED_MODULE_0__bresenham__["a"].getBarcodeLine(inputImageWrapper, line[0], line[1]);
	
	            if (true && config.debug.showFrequency) {
	                /* harmony import */__WEBPACK_IMPORTED_MODULE_1__common_image_debug__["a"].drawPath(line, { x: 'x', y: 'y' }, _canvas.ctx.overlay, { color: 'red', lineWidth: 3 });
	                /* harmony import */__WEBPACK_IMPORTED_MODULE_0__bresenham__["a"].debug.printFrequency(barcodeLine.line, _canvas.dom.frequency);
	            }
	
	            /* harmony import */__WEBPACK_IMPORTED_MODULE_0__bresenham__["a"].toBinaryLine(barcodeLine);
	
	            if (true && config.debug.showPattern) {
	                /* harmony import */__WEBPACK_IMPORTED_MODULE_0__bresenham__["a"].debug.printPattern(barcodeLine.line, _canvas.dom.pattern);
	            }
	
	            for (i = 0; i < _barcodeReaders.length && result === null; i++) {
	                result = _barcodeReaders[i].decodePattern(barcodeLine.line);
	            }
	            if (result === null) {
	                return null;
	            }
	            return {
	                codeResult: result,
	                barcodeLine: barcodeLine
	            };
	        }
	
	        /**
	         * This method slices the given area apart and tries to detect a barcode-pattern
	         * for each slice. It returns the decoded barcode, or null if nothing was found
	         * @param {Array} box
	         * @param {Array} line
	         * @param {Number} lineAngle
	         */
	        function tryDecodeBruteForce(box, line, lineAngle) {
	            var sideLength = Math.sqrt(Math.pow(box[1][0] - box[0][0], 2) + Math.pow(box[1][1] - box[0][1], 2)),
	                i,
	                slices = 16,
	                result = null,
	                dir,
	                extension,
	                xdir = Math.sin(lineAngle),
	                ydir = Math.cos(lineAngle);
	
	            for (i = 1; i < slices && result === null; i++) {
	                // move line perpendicular to angle
	                dir = sideLength / slices * i * (i % 2 === 0 ? -1 : 1);
	                extension = {
	                    y: dir * xdir,
	                    x: dir * ydir
	                };
	                line[0].y += extension.x;
	                line[0].x -= extension.y;
	                line[1].y += extension.x;
	                line[1].x -= extension.y;
	
	                result = tryDecode(line);
	            }
	            return result;
	        }
	
	        function getLineLength(line) {
	            return Math.sqrt(Math.pow(Math.abs(line[1].y - line[0].y), 2) + Math.pow(Math.abs(line[1].x - line[0].x), 2));
	        }
	
	        /**
	         * With the help of the configured readers (Code128 or EAN) this function tries to detect a
	         * valid barcode pattern within the given area.
	         * @param {Object} box The area to search in
	         * @returns {Object} the result {codeResult, line, angle, pattern, threshold}
	         */
	        function _decodeFromBoundingBox(box) {
	            var line,
	                lineAngle,
	                ctx = _canvas.ctx.overlay,
	                result,
	                lineLength;
	
	            if (true) {
	                if (config.debug.drawBoundingBox && ctx) {
	                    /* harmony import */__WEBPACK_IMPORTED_MODULE_1__common_image_debug__["a"].drawPath(box, { x: 0, y: 1 }, ctx, { color: "blue", lineWidth: 2 });
	                }
	            }
	
	            line = getLine(box);
	            lineLength = getLineLength(line);
	            lineAngle = Math.atan2(line[1].y - line[0].y, line[1].x - line[0].x);
	            line = getExtendedLine(line, lineAngle, Math.floor(lineLength * 0.1));
	            if (line === null) {
	                return null;
	            }
	
	            result = tryDecode(line);
	            if (result === null) {
	                result = tryDecodeBruteForce(box, line, lineAngle);
	            }
	
	            if (result === null) {
	                return null;
	            }
	
	            if (true && result && config.debug.drawScanline && ctx) {
	                /* harmony import */__WEBPACK_IMPORTED_MODULE_1__common_image_debug__["a"].drawPath(line, { x: 'x', y: 'y' }, ctx, { color: 'red', lineWidth: 3 });
	            }
	
	            return {
	                codeResult: result.codeResult,
	                line: line,
	                angle: lineAngle,
	                pattern: result.barcodeLine.line,
	                threshold: result.barcodeLine.threshold
	            };
	        }
	
	        return {
	            decodeFromBoundingBox: function decodeFromBoundingBox(box) {
	                return _decodeFromBoundingBox(box);
	            },
	            decodeFromBoundingBoxes: function decodeFromBoundingBoxes(boxes) {
	                var i,
	                    result,
	                    barcodes = [],
	                    multiple = config.multiple;
	
	                for (i = 0; i < boxes.length; i++) {
	                    var box = boxes[i];
	                    result = _decodeFromBoundingBox(box) || {};
	                    result.box = box;
	
	                    if (multiple) {
	                        barcodes.push(result);
	                    } else if (result.codeResult) {
	                        return result;
	                    }
	                }
	
	                if (multiple) {
	                    return {
	                        barcodes: barcodes
	                    };
	                }
	            },
	            setReaders: function setReaders(readers) {
	                config.readers = readers;
	                _barcodeReaders.length = 0;
	                initReaders();
	            }
	        };
	    }
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var Bresenham = {};
	
	var Slope = {
	    DIR: {
	        UP: 1,
	        DOWN: -1
	    }
	};
	/**
	 * Scans a line of the given image from point p1 to p2 and returns a result object containing
	 * gray-scale values (0-255) of the underlying pixels in addition to the min
	 * and max values.
	 * @param {Object} imageWrapper
	 * @param {Object} p1 The start point {x,y}
	 * @param {Object} p2 The end point {x,y}
	 * @returns {line, min, max}
	 */
	Bresenham.getBarcodeLine = function (imageWrapper, p1, p2) {
	    var x0 = p1.x | 0,
	        y0 = p1.y | 0,
	        x1 = p2.x | 0,
	        y1 = p2.y | 0,
	        steep = Math.abs(y1 - y0) > Math.abs(x1 - x0),
	        deltax,
	        deltay,
	        error,
	        ystep,
	        y,
	        tmp,
	        x,
	        line = [],
	        imageData = imageWrapper.data,
	        width = imageWrapper.size.x,
	        sum = 0,
	        val,
	        min = 255,
	        max = 0;
	
	    function read(a, b) {
	        val = imageData[b * width + a];
	        sum += val;
	        min = val < min ? val : min;
	        max = val > max ? val : max;
	        line.push(val);
	    }
	
	    if (steep) {
	        tmp = x0;
	        x0 = y0;
	        y0 = tmp;
	
	        tmp = x1;
	        x1 = y1;
	        y1 = tmp;
	    }
	    if (x0 > x1) {
	        tmp = x0;
	        x0 = x1;
	        x1 = tmp;
	
	        tmp = y0;
	        y0 = y1;
	        y1 = tmp;
	    }
	    deltax = x1 - x0;
	    deltay = Math.abs(y1 - y0);
	    error = deltax / 2 | 0;
	    y = y0;
	    ystep = y0 < y1 ? 1 : -1;
	    for (x = x0; x < x1; x++) {
	        if (steep) {
	            read(y, x);
	        } else {
	            read(x, y);
	        }
	        error = error - deltay;
	        if (error < 0) {
	            y = y + ystep;
	            error = error + deltax;
	        }
	    }
	
	    return {
	        line: line,
	        min: min,
	        max: max
	    };
	};
	
	/**
	 * Converts the result from getBarcodeLine into a binary representation
	 * also considering the frequency and slope of the signal for more robust results
	 * @param {Object} result {line, min, max}
	 */
	Bresenham.toBinaryLine = function (result) {
	    var min = result.min,
	        max = result.max,
	        line = result.line,
	        slope,
	        slope2,
	        center = min + (max - min) / 2,
	        extrema = [],
	        currentDir,
	        dir,
	        threshold = (max - min) / 12,
	        rThreshold = -threshold,
	        i,
	        j;
	
	    // 1. find extrema
	    currentDir = line[0] > center ? Slope.DIR.UP : Slope.DIR.DOWN;
	    extrema.push({
	        pos: 0,
	        val: line[0]
	    });
	    for (i = 0; i < line.length - 2; i++) {
	        slope = line[i + 1] - line[i];
	        slope2 = line[i + 2] - line[i + 1];
	        if (slope + slope2 < rThreshold && line[i + 1] < center * 1.5) {
	            dir = Slope.DIR.DOWN;
	        } else if (slope + slope2 > threshold && line[i + 1] > center * 0.5) {
	            dir = Slope.DIR.UP;
	        } else {
	            dir = currentDir;
	        }
	
	        if (currentDir !== dir) {
	            extrema.push({
	                pos: i,
	                val: line[i]
	            });
	            currentDir = dir;
	        }
	    }
	    extrema.push({
	        pos: line.length,
	        val: line[line.length - 1]
	    });
	
	    for (j = extrema[0].pos; j < extrema[1].pos; j++) {
	        line[j] = line[j] > center ? 0 : 1;
	    }
	
	    // iterate over extrema and convert to binary based on avg between minmax
	    for (i = 1; i < extrema.length - 1; i++) {
	        if (extrema[i + 1].val > extrema[i].val) {
	            threshold = extrema[i].val + (extrema[i + 1].val - extrema[i].val) / 3 * 2 | 0;
	        } else {
	            threshold = extrema[i + 1].val + (extrema[i].val - extrema[i + 1].val) / 3 | 0;
	        }
	
	        for (j = extrema[i].pos; j < extrema[i + 1].pos; j++) {
	            line[j] = line[j] > threshold ? 0 : 1;
	        }
	    }
	
	    return {
	        line: line,
	        threshold: threshold
	    };
	};
	
	/**
	 * Used for development only
	 */
	Bresenham.debug = {
	    printFrequency: function printFrequency(line, canvas) {
	        var i,
	            ctx = canvas.getContext("2d");
	        canvas.width = line.length;
	        canvas.height = 256;
	
	        ctx.beginPath();
	        ctx.strokeStyle = "blue";
	        for (i = 0; i < line.length; i++) {
	            ctx.moveTo(i, 255);
	            ctx.lineTo(i, 255 - line[i]);
	        }
	        ctx.stroke();
	        ctx.closePath();
	    },
	
	    printPattern: function printPattern(line, canvas) {
	        var ctx = canvas.getContext("2d"),
	            i;
	
	        canvas.width = line.length;
	        ctx.fillColor = "black";
	        for (i = 0; i < line.length; i++) {
	            if (line[i] === 1) {
	                ctx.fillRect(i, 0, 1, 100);
	            }
	        }
	    }
	};
	
	/* harmony default export */ exports["a"] = Bresenham;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_pick__ = __webpack_require__(64);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_pick___default = __WEBPACK_IMPORTED_MODULE_0_lodash_pick__ && __WEBPACK_IMPORTED_MODULE_0_lodash_pick__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_pick__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_pick__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_lodash_pick___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_lodash_pick___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_merge__ = __webpack_require__(7);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_merge___default = __WEBPACK_IMPORTED_MODULE_1_lodash_merge__ && __WEBPACK_IMPORTED_MODULE_1_lodash_merge__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_merge__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_merge__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1_lodash_merge___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1_lodash_merge___default });
	
	
	
	
	var streamRef;
	
	function waitForVideo(video) {
	    return new Promise(function (resolve, reject) {
	        var attempts = 10;
	
	        function checkVideo() {
	            if (attempts > 0) {
	                if (video.videoWidth > 0 && video.videoHeight > 0) {
	                    if (true) {
	                        console.log(video.videoWidth + "px x " + video.videoHeight + "px");
	                    }
	                    resolve();
	                } else {
	                    window.setTimeout(checkVideo, 500);
	                }
	            } else {
	                reject('Unable to play video stream. Is webcam working?');
	            }
	            attempts--;
	        }
	        checkVideo();
	    });
	}
	
	/**
	 * Tries to attach the camera-stream to a given video-element
	 * and calls the callback function when the content is ready
	 * @param {Object} constraints
	 * @param {Object} video
	 */
	function initCamera(video, constraints) {
	    return navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
	        return new Promise(function (resolve) {
	            streamRef = stream;
	            video.setAttribute("autoplay", 'true');
	            video.srcObject = stream;
	            video.addEventListener('loadedmetadata', function () {
	                video.play();
	                resolve();
	            });
	        });
	    }).then(waitForVideo.bind(null, video));
	}
	
	function deprecatedConstraints(videoConstraints) {
	    var normalized = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lodash_pick___default.a.bind()(videoConstraints, ["width", "height", "facingMode", "aspectRatio", "deviceId"]);
	
	    if (typeof videoConstraints.minAspectRatio !== 'undefined' && videoConstraints.minAspectRatio > 0) {
	        normalized.aspectRatio = videoConstraints.minAspectRatio;
	        console.log("WARNING: Constraint 'minAspectRatio' is deprecated; Use 'aspectRatio' instead");
	    }
	    if (typeof videoConstraints.facing !== 'undefined') {
	        normalized.facingMode = videoConstraints.facing;
	        console.log("WARNING: Constraint 'facing' is deprecated. Use 'facingMode' instead'");
	    }
	    return normalized;
	}
	
	function applyCameraFacing(facing, constraints) {
	    if (typeof constraints.video.deviceId !== 'undefined' || !facing) {
	        return Promise.resolve(constraints);
	    }
	    if (typeof MediaStreamTrack !== 'undefined' && typeof MediaStreamTrack.getSources !== 'undefined') {
	        return new Promise(function (resolve) {
	            MediaStreamTrack.getSources(function (sourceInfos) {
	                var videoSource = sourceInfos.filter(function (sourceInfo) {
	                    return sourceInfo.kind === "video" && sourceInfo.facing === facing;
	                })[0];
	                if (videoSource) {
	                    return resolve(/* harmony import */__WEBPACK_IMPORTED_MODULE_1_lodash_merge___default.a.bind()({}, constraints, { video: { deviceId: videoSource.id } }));
	                }
	                return resolve(constraints);
	            });
	        });
	    }
	    return Promise.resolve(/* harmony import */__WEBPACK_IMPORTED_MODULE_1_lodash_merge___default.a.bind()({}, constraints, { video: { facingMode: facing } }));
	}
	
	function pickConstraints(videoConstraints) {
	    var constraints = {
	        audio: false,
	        video: deprecatedConstraints(videoConstraints)
	    };
	    return applyCameraFacing(constraints.video.facingMode, constraints);
	}
	
	/* harmony default export */ exports["a"] = {
	    request: function request(video, videoConstraints) {
	        return pickConstraints(videoConstraints).then(initCamera.bind(null, video));
	    },
	    release: function release() {
	        var tracks = streamRef && streamRef.getVideoTracks();
	        if (tracks && tracks.length) {
	            tracks[0].stop();
	        }
	        streamRef = null;
	    }
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_isEmpty__ = __webpack_require__(175);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_isEmpty___default = __WEBPACK_IMPORTED_MODULE_0_lodash_isEmpty__ && __WEBPACK_IMPORTED_MODULE_0_lodash_isEmpty__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_isEmpty__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_isEmpty__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_lodash_isEmpty___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_lodash_isEmpty___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_omitBy__ = __webpack_require__(180);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_omitBy___default = __WEBPACK_IMPORTED_MODULE_1_lodash_omitBy__ && __WEBPACK_IMPORTED_MODULE_1_lodash_omitBy__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_omitBy__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_lodash_omitBy__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_1_lodash_omitBy___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_1_lodash_omitBy___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_pick__ = __webpack_require__(64);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_pick___default = __WEBPACK_IMPORTED_MODULE_2_lodash_pick__ && __WEBPACK_IMPORTED_MODULE_2_lodash_pick__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2_lodash_pick__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2_lodash_pick__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_2_lodash_pick___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_2_lodash_pick___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash_merge__ = __webpack_require__(7);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash_merge___default = __WEBPACK_IMPORTED_MODULE_3_lodash_merge__ && __WEBPACK_IMPORTED_MODULE_3_lodash_merge__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_3_lodash_merge__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_3_lodash_merge__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_3_lodash_merge___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_3_lodash_merge___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_dom_helper__ = __webpack_require__(69);
	/* harmony export */ exports["a"] = createConfigFromSource;
	
	
	
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	
	
	var isDataURL = { regex: /^\s*data:([a-z]+\/[a-z0-9\-\+]+(;[a-z\-]+\=[a-z0-9\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i },
	    // eslint-disable-line max-len
	isBlobURL = { regex: /^\s*blob:(.*)$/i },
	    isMediaURL = { regex: /^(?:(?:http[s]?|ftp):\/)?\/?(?:(?:[^:\/\s]+)(?:(?:\/\w+)*\/))?([\w\-]+\.([^#?\s]+))(?:.*)?(?:#[\w\-]+)?$/i },
	    // eslint-disable-line max-len
	isImageExt = { regex: /(jpe?g|png|gif|tiff)(?:\s+|$)/i },
	    isVideoExt = { regex: /(webm|ogg|mp4|m4v)/i };
	
	function createConfigFromSource(config, sourceConfig, source) {
	    if (source instanceof /* harmony import */__WEBPACK_IMPORTED_MODULE_4__common_dom_helper__["a"].MediaStream) {
	        return createConfigForStream(config, sourceConfig, { srcObject: source });
	    } else if (source instanceof /* harmony import */__WEBPACK_IMPORTED_MODULE_4__common_dom_helper__["a"].HTMLImageElement) {
	        throw new Error('Source "HTMLImageElement": not yet supported');
	        // return createConfigForImage(config, inputConfig, {image: source});
	    } else if (source instanceof /* harmony import */__WEBPACK_IMPORTED_MODULE_4__common_dom_helper__["a"].HTMLVideoElement) {
	            throw new Error('Source "HTMLVideoElement": not yet supported');
	            // return createConfigForVideo(config, inputConfig, {video: source});
	        } else if (source instanceof /* harmony import */__WEBPACK_IMPORTED_MODULE_4__common_dom_helper__["a"].HTMLCanvasElement) {
	                return createConfigForCanvas(config, sourceConfig, { canvas: source });
	            } else if (source instanceof /* harmony import */__WEBPACK_IMPORTED_MODULE_4__common_dom_helper__["a"].FileList) {
	                if (source.length > 0) {
	                    return createConfigForFile(config, sourceConfig, source[0]);
	                }
	            } else if (source instanceof /* harmony import */__WEBPACK_IMPORTED_MODULE_4__common_dom_helper__["a"].File) {
	                return createConfigForFile(config, sourceConfig, source);
	            } else if (typeof source === 'string') {
	                return createConfigForString(config, sourceConfig, source);
	            } else if ((typeof source === 'undefined' ? 'undefined' : _typeof(source)) === 'object' && (typeof source.constraints !== 'undefined' || typeof source.area !== 'undefined')) {
	                return createConfigForLiveStream(config, source);
	            } else {
	                throw new Error("No source given!");
	            }
	}
	
	function createConfigForImage(config, source) {
	    var inputConfig = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	    var staticImageConfig = {
	        inputStream: /* harmony import */__WEBPACK_IMPORTED_MODULE_3_lodash_merge___default.a.bind()({
	            type: "ImageStream",
	            sequence: false,
	            size: 800
	        }, source),
	        numOfWorkers: true && config.debug ? 0 : 1
	    };
	    return /* harmony import */__WEBPACK_IMPORTED_MODULE_3_lodash_merge___default.a.bind()(config, staticImageConfig, { numOfWorkers: typeof config.numOfWorkers === 'number' && config.numOfWorkers > 0 ? 1 : 0 }, { inputStream: /* harmony import */__WEBPACK_IMPORTED_MODULE_1_lodash_omitBy___default.a.bind()(/* harmony import */__WEBPACK_IMPORTED_MODULE_2_lodash_pick___default.a.bind()(config.inputStream, ['size']), /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lodash_isEmpty___default.a) }, { inputStream: inputConfig });
	}
	
	function createConfigForMimeType(config, inputConfig, _ref) {
	    var src = _ref.src;
	    var mime = _ref.mime;
	
	    var _ref2 = mime.match(/^(video|image)\/(.*)$/i) || [];
	
	    var type = _ref2[1];
	
	    if (type === 'video') {
	        return createConfigForVideo(config, { src: src }, inputConfig);
	    } else if (type === 'image') {
	        return createConfigForImage(config, { src: src }, inputConfig);
	    }
	    throw new Error('Source with mimetype: "' + type + '" not supported');
	}
	
	function createConfigForFile(config, inputConfig, file) {
	    var src = /* harmony import */__WEBPACK_IMPORTED_MODULE_4__common_dom_helper__["a"].URL.createObjectURL(file);
	    return createConfigForMimeType(config, inputConfig, {
	        src: src,
	        mime: file.type
	    });
	}
	
	function createConfigForString(config) {
	    var inputConfig = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    var source = arguments[2];
	
	    var _ref3 = source.match(isDataURL.regex) || [];
	
	    var mime = _ref3[1];
	
	    if (mime) {
	        return createConfigForMimeType(config, inputConfig, { src: source, mime: mime });
	    }
	    var blobURL = source.match(isBlobURL.regex);
	    if (blobURL) {
	        throw new Error('Source "objectURL": not supported');
	    }
	
	    var _ref4 = source.match(isMediaURL.regex) || [];
	
	    var ext = _ref4[2];
	
	    if (ext) {
	        return createConfigForMediaExtension(config, inputConfig, { src: source, ext: ext });
	    }
	    throw new Error('Source "' + source + '": not recognized');
	}
	
	function createConfigForMediaExtension(config, inputConfig, _ref5) {
	    var src = _ref5.src;
	    var ext = _ref5.ext;
	
	    if (ext.match(isImageExt.regex)) {
	        return createConfigForImage(config, { src: src }, inputConfig);
	    } else if (ext.match(isVideoExt.regex)) {
	        return createConfigForVideo(config, { src: src }, inputConfig);
	    }
	    throw new Error('Source "MediaString": not recognized');
	}
	
	function createConfigForCanvas(config, _ref6) {
	    var canvas = _ref6.canvas;
	    var inputConfig = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	    // TODO: adjust stream & frame-grabber
	    // once/continous
	    throw new Error('Source "Canvas": not implemented!');
	}
	
	function createConfigForVideo(config, source) {
	    var inputConfig = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	    return /* harmony import */__WEBPACK_IMPORTED_MODULE_3_lodash_merge___default.a.bind()({}, config, {
	        inputStream: /* harmony import */__WEBPACK_IMPORTED_MODULE_3_lodash_merge___default.a.bind()({
	            type: "VideoStream"
	        }, source)
	    }, {
	        inputStream: inputConfig
	    });
	}
	
	function createConfigForStream(config, _ref7) {
	    var srcObject = _ref7.srcObject;
	    var inputConfig = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	    // TODO: attach to <video> element
	    // wait for the video to be ready (dimensions known)
	    throw new Error('Source "MediaStream": not implemented!');
	}
	
	function createConfigForLiveStream(config) {
	    var inputConfig = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    return /* harmony import */__WEBPACK_IMPORTED_MODULE_3_lodash_merge___default.a.bind()({}, config, {
	        inputStream: {
	            type: "LiveStream",
	            constraints: {
	                width: 640,
	                height: 480,
	                facingMode: "environment"
	            }
	        }
	    }, {
	        inputStream: inputConfig
	    });
	}

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_cv_utils__ = __webpack_require__(25);
	
	
	function adjustCanvasSize(canvas, targetSize) {
	    if (canvas.width !== targetSize.x) {
	        if (true) {
	            console.log("WARNING: canvas-size needs to be adjusted");
	        }
	        canvas.width = targetSize.x;
	    }
	    if (canvas.height !== targetSize.y) {
	        if (true) {
	            console.log("WARNING: canvas-size needs to be adjusted");
	        }
	        canvas.height = targetSize.y;
	    }
	}
	
	var FrameGrabber = {};
	
	FrameGrabber.create = function (inputStream, canvas) {
	    var _that = {},
	        _streamConfig = inputStream.getConfig(),
	        _video_size = /* harmony import */__WEBPACK_IMPORTED_MODULE_0__common_cv_utils__["f"].bind()(inputStream.getRealWidth(), inputStream.getRealHeight()),
	        _canvasSize = inputStream.getCanvasSize(),
	        _size = /* harmony import */__WEBPACK_IMPORTED_MODULE_0__common_cv_utils__["f"].bind()(inputStream.getWidth(), inputStream.getHeight()),
	        topRight = inputStream.getTopRight(),
	        _sx = topRight.x,
	        _sy = topRight.y,
	        _canvas,
	        _ctx = null,
	        _data = null;
	
	    _canvas = canvas ? canvas : document.createElement("canvas");
	    _canvas.width = _canvasSize.x;
	    _canvas.height = _canvasSize.y;
	    _ctx = _canvas.getContext("2d");
	    _data = new Uint8Array(_size.x * _size.y);
	    if (true) {
	        console.log("FrameGrabber", JSON.stringify({
	            size: _size,
	            topRight: topRight,
	            videoSize: _video_size,
	            canvasSize: _canvasSize
	        }));
	    }
	
	    /**
	     * Uses the given array as frame-buffer
	     */
	    _that.attachData = function (data) {
	        _data = data;
	    };
	
	    /**
	     * Returns the used frame-buffer
	     */
	    _that.getData = function () {
	        return _data;
	    };
	
	    /**
	     * Fetches a frame from the input-stream and puts into the frame-buffer.
	     * The image-data is converted to gray-scale and then half-sampled if configured.
	     */
	    _that.grab = function () {
	        var doHalfSample = _streamConfig.halfSample,
	            frame = inputStream.getFrame(),
	            ctxData;
	        if (frame) {
	            adjustCanvasSize(_canvas, _canvasSize);
	            _ctx.drawImage(frame, 0, 0, _canvasSize.x, _canvasSize.y);
	            ctxData = _ctx.getImageData(_sx, _sy, _size.x, _size.y).data;
	            if (doHalfSample) {
	                /* harmony import */__WEBPACK_IMPORTED_MODULE_0__common_cv_utils__["i"].bind()(ctxData, _size, _data);
	            } else {
	                /* harmony import */__WEBPACK_IMPORTED_MODULE_0__common_cv_utils__["j"].bind()(ctxData, _data, _streamConfig);
	            }
	            return true;
	        } else {
	            return false;
	        }
	    };
	
	    _that.getSize = function () {
	        return _size;
	    };
	
	    return _that;
	};
	
	/* harmony default export */ exports["a"] = FrameGrabber;

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var ImageLoader = {};
	ImageLoader.load = function (directory, callback, offset, size, sequence) {
	    var htmlImagesSrcArray = new Array(size),
	        htmlImagesArray = new Array(htmlImagesSrcArray.length),
	        i,
	        img,
	        num;
	
	    if (sequence === false) {
	        htmlImagesSrcArray[0] = directory;
	    } else {
	        for (i = 0; i < htmlImagesSrcArray.length; i++) {
	            num = offset + i;
	            htmlImagesSrcArray[i] = directory + "image-" + ("00" + num).slice(-3) + ".jpg";
	        }
	    }
	    htmlImagesArray.notLoaded = [];
	    htmlImagesArray.addImage = function (image) {
	        htmlImagesArray.notLoaded.push(image);
	    };
	    htmlImagesArray.loaded = function (loadedImg) {
	        var notloadedImgs = htmlImagesArray.notLoaded;
	        for (var x = 0; x < notloadedImgs.length; x++) {
	            if (notloadedImgs[x] === loadedImg) {
	                notloadedImgs.splice(x, 1);
	                for (var y = 0; y < htmlImagesSrcArray.length; y++) {
	                    var imgName = htmlImagesSrcArray[y].substr(htmlImagesSrcArray[y].lastIndexOf("/"));
	                    if (loadedImg.src.lastIndexOf(imgName) !== -1) {
	                        htmlImagesArray[y] = loadedImg;
	                        break;
	                    }
	                }
	                break;
	            }
	        }
	        if (notloadedImgs.length === 0) {
	            if (true) {
	                console.log("Images loaded");
	            }
	            callback.apply(null, [htmlImagesArray]);
	        }
	    };
	
	    for (i = 0; i < htmlImagesSrcArray.length; i++) {
	        img = new Image();
	        htmlImagesArray.addImage(img);
	        addOnloadHandler(img, htmlImagesArray);
	        img.src = htmlImagesSrcArray[i];
	    }
	};
	
	function addOnloadHandler(img, htmlImagesArray) {
	    img.onload = function () {
	        htmlImagesArray.loaded(this);
	    };
	}
	
	/* harmony default export */ exports["a"] = ImageLoader;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__image_loader__ = __webpack_require__(79);
	
	
	var InputStream = {};
	InputStream.createVideoStream = function (video) {
	    var that = {},
	        _config = null,
	        _eventNames = ['canrecord', 'ended'],
	        _eventHandlers = {},
	        _calculatedWidth,
	        _calculatedHeight,
	        _topRight = { x: 0, y: 0 },
	        _canvasSize = { x: 0, y: 0 };
	
	    function initSize() {
	        var width = video.videoWidth,
	            height = video.videoHeight;
	
	        _calculatedWidth = _config.size ? width / height > 1 ? _config.size : Math.floor(width / height * _config.size) : width;
	        _calculatedHeight = _config.size ? width / height > 1 ? Math.floor(height / width * _config.size) : _config.size : height;
	
	        _canvasSize.x = _calculatedWidth;
	        _canvasSize.y = _calculatedHeight;
	    }
	
	    that.getRealWidth = function () {
	        return video.videoWidth;
	    };
	
	    that.getRealHeight = function () {
	        return video.videoHeight;
	    };
	
	    that.getWidth = function () {
	        return _calculatedWidth;
	    };
	
	    that.getHeight = function () {
	        return _calculatedHeight;
	    };
	
	    that.setWidth = function (width) {
	        _calculatedWidth = width;
	    };
	
	    that.setHeight = function (height) {
	        _calculatedHeight = height;
	    };
	
	    that.setInputStream = function (config) {
	        _config = config;
	        video.src = typeof config.src !== 'undefined' ? config.src : '';
	    };
	
	    that.ended = function () {
	        return video.ended;
	    };
	
	    that.getConfig = function () {
	        return _config;
	    };
	
	    that.setAttribute = function (name, value) {
	        video.setAttribute(name, value);
	    };
	
	    that.pause = function () {
	        video.pause();
	    };
	
	    that.play = function () {
	        video.play();
	    };
	
	    that.setCurrentTime = function (time) {
	        if (_config.type !== "LiveStream") {
	            video.currentTime = time;
	        }
	    };
	
	    that.addEventListener = function (event, f, bool) {
	        if (_eventNames.indexOf(event) !== -1) {
	            if (!_eventHandlers[event]) {
	                _eventHandlers[event] = [];
	            }
	            _eventHandlers[event].push(f);
	        } else {
	            video.addEventListener(event, f, bool);
	        }
	    };
	
	    that.clearEventHandlers = function () {
	        _eventNames.forEach(function (eventName) {
	            var handlers = _eventHandlers[eventName];
	            if (handlers && handlers.length > 0) {
	                handlers.forEach(function (handler) {
	                    video.removeEventListener(eventName, handler);
	                });
	            }
	        });
	    };
	
	    that.trigger = function (eventName, args) {
	        var j,
	            handlers = _eventHandlers[eventName];
	
	        if (eventName === 'canrecord') {
	            initSize();
	        }
	        if (handlers && handlers.length > 0) {
	            for (j = 0; j < handlers.length; j++) {
	                handlers[j].apply(that, args);
	            }
	        }
	    };
	
	    that.setTopRight = function (topRight) {
	        _topRight.x = topRight.x;
	        _topRight.y = topRight.y;
	    };
	
	    that.getTopRight = function () {
	        return _topRight;
	    };
	
	    that.setCanvasSize = function (size) {
	        _canvasSize.x = size.x;
	        _canvasSize.y = size.y;
	    };
	
	    that.getCanvasSize = function () {
	        return _canvasSize;
	    };
	
	    that.getFrame = function () {
	        return video;
	    };
	
	    return that;
	};
	
	InputStream.createLiveStream = function (video) {
	    video.setAttribute("autoplay", true);
	    var that = InputStream.createVideoStream(video);
	
	    that.ended = function () {
	        return false;
	    };
	
	    return that;
	};
	
	InputStream.createImageStream = function () {
	    var that = {};
	    var _config = null;
	
	    var width = 0,
	        height = 0,
	        frameIdx = 0,
	        paused = true,
	        loaded = false,
	        imgArray = null,
	        size = 0,
	        offset = 1,
	        baseUrl = null,
	        ended = false,
	        calculatedWidth,
	        calculatedHeight,
	        _eventNames = ['canrecord', 'ended'],
	        _eventHandlers = {},
	        _topRight = { x: 0, y: 0 },
	        _canvasSize = { x: 0, y: 0 };
	
	    function loadImages() {
	        loaded = false;
	        /* harmony import */__WEBPACK_IMPORTED_MODULE_0__image_loader__["a"].load(baseUrl, function (imgs) {
	            imgArray = imgs;
	            width = imgs[0].width;
	            height = imgs[0].height;
	            calculatedWidth = _config.size ? width / height > 1 ? _config.size : Math.floor(width / height * _config.size) : width;
	            calculatedHeight = _config.size ? width / height > 1 ? Math.floor(height / width * _config.size) : _config.size : height;
	            _canvasSize.x = calculatedWidth;
	            _canvasSize.y = calculatedHeight;
	            loaded = true;
	            frameIdx = 0;
	            setTimeout(function () {
	                publishEvent("canrecord", []);
	            }, 0);
	        }, offset, size, _config.sequence);
	    }
	
	    function publishEvent(eventName, args) {
	        var j,
	            handlers = _eventHandlers[eventName];
	
	        if (handlers && handlers.length > 0) {
	            for (j = 0; j < handlers.length; j++) {
	                handlers[j].apply(that, args);
	            }
	        }
	    }
	
	    that.trigger = publishEvent;
	
	    that.getWidth = function () {
	        return calculatedWidth;
	    };
	
	    that.getHeight = function () {
	        return calculatedHeight;
	    };
	
	    that.setWidth = function (newWidth) {
	        calculatedWidth = newWidth;
	    };
	
	    that.setHeight = function (newHeight) {
	        calculatedHeight = newHeight;
	    };
	
	    that.getRealWidth = function () {
	        return width;
	    };
	
	    that.getRealHeight = function () {
	        return height;
	    };
	
	    that.setInputStream = function (stream) {
	        _config = stream;
	        if (stream.sequence === false) {
	            baseUrl = stream.src;
	            size = 1;
	        } else {
	            baseUrl = stream.src;
	            size = stream.length;
	        }
	        loadImages();
	    };
	
	    that.ended = function () {
	        return ended;
	    };
	
	    that.setAttribute = function () {};
	
	    that.getConfig = function () {
	        return _config;
	    };
	
	    that.pause = function () {
	        paused = true;
	    };
	
	    that.play = function () {
	        paused = false;
	    };
	
	    that.setCurrentTime = function (time) {
	        frameIdx = time;
	    };
	
	    that.addEventListener = function (event, f) {
	        if (_eventNames.indexOf(event) !== -1) {
	            if (!_eventHandlers[event]) {
	                _eventHandlers[event] = [];
	            }
	            _eventHandlers[event].push(f);
	        }
	    };
	
	    that.setTopRight = function (topRight) {
	        _topRight.x = topRight.x;
	        _topRight.y = topRight.y;
	    };
	
	    that.getTopRight = function () {
	        return _topRight;
	    };
	
	    that.setCanvasSize = function (canvasSize) {
	        _canvasSize.x = canvasSize.x;
	        _canvasSize.y = canvasSize.y;
	    };
	
	    that.getCanvasSize = function () {
	        return _canvasSize;
	    };
	
	    that.getFrame = function () {
	        var frame;
	
	        if (!loaded) {
	            return null;
	        }
	        if (!paused) {
	            frame = imgArray[frameIdx];
	            if (frameIdx < size - 1) {
	                frameIdx++;
	            } else {
	                setTimeout(function () {
	                    ended = true;
	                    publishEvent("ended", []);
	                }, 0);
	            }
	        }
	        return frame;
	    };
	
	    return that;
	};
	
	/* harmony default export */ exports["a"] = InputStream;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_image_wrapper__ = __webpack_require__(26);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_cv_utils__ = __webpack_require__(25);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_array_helper__ = __webpack_require__(13);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_image_debug__ = __webpack_require__(8);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__rasterizer__ = __webpack_require__(82);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tracer__ = __webpack_require__(38);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__skeletonizer__ = __webpack_require__(83);
	/* harmony export */ exports["b"] = createLocator;/* harmony export */ exports["a"] = checkImageConstraints;
	
	
	
	
	
	
	var vec2 = {
	    clone: __webpack_require__(10),
	    dot: __webpack_require__(40),
	    scale: __webpack_require__(97),
	    transformMat2: __webpack_require__(98)
	};
	var mat2 = {
	    copy: __webpack_require__(94),
	    create: __webpack_require__(95),
	    invert: __webpack_require__(96)
	};
	
	function createLocator(inputImageWrapper, config) {
	    var _config = config,
	        _currentImageWrapper,
	        _skelImageWrapper,
	        _subImageWrapper,
	        _labelImageWrapper,
	        _patchGrid,
	        _patchLabelGrid,
	        _imageToPatchGrid,
	        _binaryImageWrapper,
	        _patchSize,
	        _canvasContainer = {
	        ctx: {
	            binary: null
	        },
	        dom: {
	            binary: null
	        }
	    },
	        _numPatches = { x: 0, y: 0 },
	        _inputImageWrapper = inputImageWrapper,
	        _skeletonizer;
	
	    initBuffers();
	    initCanvas();
	
	    function initBuffers() {
	        var skeletonImageData;
	
	        if (_config.halfSample) {
	            _currentImageWrapper = new /* harmony import */__WEBPACK_IMPORTED_MODULE_0__common_image_wrapper__["a"]({
	                x: _inputImageWrapper.size.x / 2 | 0,
	                y: _inputImageWrapper.size.y / 2 | 0
	            });
	        } else {
	            _currentImageWrapper = _inputImageWrapper;
	        }
	
	        _patchSize = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__common_cv_utils__["b"].bind()(_config.patchSize, _currentImageWrapper.size);
	
	        _numPatches.x = _currentImageWrapper.size.x / _patchSize.x | 0;
	        _numPatches.y = _currentImageWrapper.size.y / _patchSize.y | 0;
	
	        _binaryImageWrapper = new /* harmony import */__WEBPACK_IMPORTED_MODULE_0__common_image_wrapper__["a"](_currentImageWrapper.size, undefined, Uint8Array, false);
	
	        _labelImageWrapper = new /* harmony import */__WEBPACK_IMPORTED_MODULE_0__common_image_wrapper__["a"](_patchSize, undefined, Array, true);
	
	        skeletonImageData = new ArrayBuffer(64 * 1024);
	        _subImageWrapper = new /* harmony import */__WEBPACK_IMPORTED_MODULE_0__common_image_wrapper__["a"](_patchSize, new Uint8Array(skeletonImageData, 0, _patchSize.x * _patchSize.y));
	        _skelImageWrapper = new /* harmony import */__WEBPACK_IMPORTED_MODULE_0__common_image_wrapper__["a"](_patchSize, new Uint8Array(skeletonImageData, _patchSize.x * _patchSize.y * 3, _patchSize.x * _patchSize.y), undefined, true);
	        _skeletonizer = /* harmony import */__WEBPACK_IMPORTED_MODULE_6__skeletonizer__["a"].bind()(typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : global, {
	            size: _patchSize.x
	        }, skeletonImageData);
	
	        _imageToPatchGrid = new /* harmony import */__WEBPACK_IMPORTED_MODULE_0__common_image_wrapper__["a"]({
	            x: _currentImageWrapper.size.x / _subImageWrapper.size.x | 0,
	            y: _currentImageWrapper.size.y / _subImageWrapper.size.y | 0
	        }, undefined, Array, true);
	        _patchGrid = new /* harmony import */__WEBPACK_IMPORTED_MODULE_0__common_image_wrapper__["a"](_imageToPatchGrid.size, undefined, undefined, true);
	        _patchLabelGrid = new /* harmony import */__WEBPACK_IMPORTED_MODULE_0__common_image_wrapper__["a"](_imageToPatchGrid.size, undefined, Int32Array, true);
	    }
	
	    function initCanvas() {
	        if (_config.useWorker || typeof document === 'undefined') {
	            return;
	        }
	        _canvasContainer.dom.binary = document.createElement("canvas");
	        _canvasContainer.dom.binary.className = "binaryBuffer";
	        if (true && _config.debug.showCanvas === true) {
	            document.querySelector("#debug").appendChild(_canvasContainer.dom.binary);
	        }
	        _canvasContainer.ctx.binary = _canvasContainer.dom.binary.getContext("2d");
	        _canvasContainer.dom.binary.width = _binaryImageWrapper.size.x;
	        _canvasContainer.dom.binary.height = _binaryImageWrapper.size.y;
	    }
	
	    /**
	     * Creates a bounding box which encloses all the given patches
	     * @returns {Array} The minimal bounding box
	     */
	    function boxFromPatches(patches) {
	        var overAvg,
	            i,
	            j,
	            patch,
	            transMat,
	            minx = _binaryImageWrapper.size.x,
	            miny = _binaryImageWrapper.size.y,
	            maxx = -_binaryImageWrapper.size.x,
	            maxy = -_binaryImageWrapper.size.y,
	            box,
	            scale;
	
	        // draw all patches which are to be taken into consideration
	        overAvg = 0;
	        for (i = 0; i < patches.length; i++) {
	            patch = patches[i];
	            overAvg += patch.rad;
	            if (true && _config.debug.showPatches) {
	                /* harmony import */__WEBPACK_IMPORTED_MODULE_3__common_image_debug__["a"].drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, { color: "red" });
	            }
	        }
	
	        overAvg /= patches.length;
	        overAvg = (overAvg * 180 / Math.PI + 90) % 180 - 90;
	        if (overAvg < 0) {
	            overAvg += 180;
	        }
	
	        overAvg = (180 - overAvg) * Math.PI / 180;
	        transMat = mat2.copy(mat2.create(), [Math.cos(overAvg), Math.sin(overAvg), -Math.sin(overAvg), Math.cos(overAvg)]);
	
	        // iterate over patches and rotate by angle
	        for (i = 0; i < patches.length; i++) {
	            patch = patches[i];
	            for (j = 0; j < 4; j++) {
	                vec2.transformMat2(patch.box[j], patch.box[j], transMat);
	            }
	
	            if (true && _config.debug.boxFromPatches.showTransformed) {
	                /* harmony import */__WEBPACK_IMPORTED_MODULE_3__common_image_debug__["a"].drawPath(patch.box, { x: 0, y: 1 }, _canvasContainer.ctx.binary, { color: '#99ff00', lineWidth: 2 });
	            }
	        }
	
	        // find bounding box
	        for (i = 0; i < patches.length; i++) {
	            patch = patches[i];
	            for (j = 0; j < 4; j++) {
	                if (patch.box[j][0] < minx) {
	                    minx = patch.box[j][0];
	                }
	                if (patch.box[j][0] > maxx) {
	                    maxx = patch.box[j][0];
	                }
	                if (patch.box[j][1] < miny) {
	                    miny = patch.box[j][1];
	                }
	                if (patch.box[j][1] > maxy) {
	                    maxy = patch.box[j][1];
	                }
	            }
	        }
	
	        box = [[minx, miny], [maxx, miny], [maxx, maxy], [minx, maxy]];
	
	        if (true && _config.debug.boxFromPatches.showTransformedBox) {
	            /* harmony import */__WEBPACK_IMPORTED_MODULE_3__common_image_debug__["a"].drawPath(box, { x: 0, y: 1 }, _canvasContainer.ctx.binary, { color: '#ff0000', lineWidth: 2 });
	        }
	
	        scale = _config.halfSample ? 2 : 1;
	        // reverse rotation;
	        transMat = mat2.invert(transMat, transMat);
	        for (j = 0; j < 4; j++) {
	            vec2.transformMat2(box[j], box[j], transMat);
	        }
	
	        if (true && _config.debug.boxFromPatches.showBB) {
	            /* harmony import */__WEBPACK_IMPORTED_MODULE_3__common_image_debug__["a"].drawPath(box, { x: 0, y: 1 }, _canvasContainer.ctx.binary, { color: '#ff0000', lineWidth: 2 });
	        }
	
	        for (j = 0; j < 4; j++) {
	            vec2.scale(box[j], box[j], scale);
	        }
	
	        return box;
	    }
	
	    /**
	     * Creates a binary image of the current image
	     */
	    function binarizeImage() {
	        /* harmony import */__WEBPACK_IMPORTED_MODULE_1__common_cv_utils__["c"].bind()(_currentImageWrapper, _binaryImageWrapper);
	        _binaryImageWrapper.zeroBorder();
	        if (true && _config.debug.showCanvas) {
	            _binaryImageWrapper.show(_canvasContainer.dom.binary, 255);
	        }
	    }
	
	    /**
	     * Iterate over the entire image
	     * extract patches
	     */
	    function findPatches() {
	        var i,
	            j,
	            x,
	            y,
	            moments,
	            patchesFound = [],
	            rasterizer,
	            rasterResult,
	            patch;
	        for (i = 0; i < _numPatches.x; i++) {
	            for (j = 0; j < _numPatches.y; j++) {
	                x = _subImageWrapper.size.x * i;
	                y = _subImageWrapper.size.y * j;
	
	                // seperate parts
	                skeletonize(x, y);
	
	                // Rasterize, find individual bars
	                _skelImageWrapper.zeroBorder();
	                /* harmony import */__WEBPACK_IMPORTED_MODULE_2__common_array_helper__["a"].init(_labelImageWrapper.data, 0);
	                rasterizer = /* harmony import */__WEBPACK_IMPORTED_MODULE_4__rasterizer__["a"].create(_skelImageWrapper, _labelImageWrapper);
	                rasterResult = rasterizer.rasterize(0);
	
	                if (true && _config.debug.showLabels) {
	                    _labelImageWrapper.overlay(_canvasContainer.dom.binary, Math.floor(360 / rasterResult.count), { x: x, y: y });
	                }
	
	                // calculate moments from the skeletonized patch
	                moments = _labelImageWrapper.moments(rasterResult.count);
	
	                // extract eligible patches
	                patchesFound = patchesFound.concat(describePatch(moments, [i, j], x, y));
	            }
	        }
	
	        if (true && _config.debug.showFoundPatches) {
	            for (i = 0; i < patchesFound.length; i++) {
	                patch = patchesFound[i];
	                /* harmony import */__WEBPACK_IMPORTED_MODULE_3__common_image_debug__["a"].drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, { color: "#99ff00", lineWidth: 2 });
	            }
	        }
	
	        return patchesFound;
	    }
	
	    /**
	     * Finds those connected areas which contain at least 6 patches
	     * and returns them ordered DESC by the number of contained patches
	     * @param {Number} maxLabel
	     */
	    function findBiggestConnectedAreas(maxLabel) {
	        var i,
	            sum,
	            labelHist = [],
	            topLabels = [];
	
	        for (i = 0; i < maxLabel; i++) {
	            labelHist.push(0);
	        }
	        sum = _patchLabelGrid.data.length;
	        while (sum--) {
	            if (_patchLabelGrid.data[sum] > 0) {
	                labelHist[_patchLabelGrid.data[sum] - 1]++;
	            }
	        }
	
	        labelHist = labelHist.map(function (val, idx) {
	            return {
	                val: val,
	                label: idx + 1
	            };
	        });
	
	        labelHist.sort(function (a, b) {
	            return b.val - a.val;
	        });
	
	        // extract top areas with at least 6 patches present
	        topLabels = labelHist.filter(function (el) {
	            return el.val >= 5;
	        });
	
	        return topLabels;
	    }
	
	    /**
	     *
	     */
	    function findBoxes(topLabels, maxLabel) {
	        var i,
	            j,
	            sum,
	            patches = [],
	            patch,
	            box,
	            boxes = [],
	            hsv = [0, 1, 1],
	            rgb = [0, 0, 0];
	
	        for (i = 0; i < topLabels.length; i++) {
	            sum = _patchLabelGrid.data.length;
	            patches.length = 0;
	            while (sum--) {
	                if (_patchLabelGrid.data[sum] === topLabels[i].label) {
	                    patch = _imageToPatchGrid.data[sum];
	                    patches.push(patch);
	                }
	            }
	            box = boxFromPatches(patches);
	            if (box) {
	                boxes.push(box);
	
	                // draw patch-labels if requested
	                if (true && _config.debug.showRemainingPatchLabels) {
	                    for (j = 0; j < patches.length; j++) {
	                        patch = patches[j];
	                        hsv[0] = topLabels[i].label / (maxLabel + 1) * 360;
	                        /* harmony import */__WEBPACK_IMPORTED_MODULE_1__common_cv_utils__["a"].bind()(hsv, rgb);
	                        /* harmony import */__WEBPACK_IMPORTED_MODULE_3__common_image_debug__["a"].drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, { color: "rgb(" + rgb.join(",") + ")", lineWidth: 2 });
	                    }
	                }
	            }
	        }
	        return boxes;
	    }
	
	    /**
	     * Find similar moments (via cluster)
	     * @param {Object} moments
	     */
	    function similarMoments(moments) {
	        var clusters = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__common_cv_utils__["d"].bind()(moments, 0.90);
	        var topCluster = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__common_cv_utils__["e"].bind()(clusters, 1, function (e) {
	            return e.getPoints().length;
	        });
	        var points = [],
	            result = [];
	        if (topCluster.length === 1) {
	            points = topCluster[0].item.getPoints();
	            for (var i = 0; i < points.length; i++) {
	                result.push(points[i].point);
	            }
	        }
	        return result;
	    }
	
	    function skeletonize(x, y) {
	        _binaryImageWrapper.subImageAsCopy(_subImageWrapper, /* harmony import */__WEBPACK_IMPORTED_MODULE_1__common_cv_utils__["f"].bind()(x, y));
	        _skeletonizer.skeletonize();
	
	        // Show skeleton if requested
	        if (true && _config.debug.showSkeleton) {
	            _skelImageWrapper.overlay(_canvasContainer.dom.binary, 360, /* harmony import */__WEBPACK_IMPORTED_MODULE_1__common_cv_utils__["f"].bind()(x, y));
	        }
	    }
	
	    /**
	     * Extracts and describes those patches which seem to contain a barcode pattern
	     * @param {Array} moments
	     * @param {Object} patchPos,
	     * @param {Number} x
	     * @param {Number} y
	     * @returns {Array} list of patches
	     */
	    function describePatch(moments, patchPos, x, y) {
	        var k,
	            avg,
	            eligibleMoments = [],
	            matchingMoments,
	            patch,
	            patchesFound = [],
	            minComponentWeight = Math.ceil(_patchSize.x / 3);
	
	        if (moments.length >= 2) {
	            // only collect moments which's area covers at least minComponentWeight pixels.
	            for (k = 0; k < moments.length; k++) {
	                if (moments[k].m00 > minComponentWeight) {
	                    eligibleMoments.push(moments[k]);
	                }
	            }
	
	            // if at least 2 moments are found which have at least minComponentWeights covered
	            if (eligibleMoments.length >= 2) {
	                matchingMoments = similarMoments(eligibleMoments);
	                avg = 0;
	                // determine the similarity of the moments
	                for (k = 0; k < matchingMoments.length; k++) {
	                    avg += matchingMoments[k].rad;
	                }
	
	                // Only two of the moments are allowed not to fit into the equation
	                // add the patch to the set
	                if (matchingMoments.length > 1 && matchingMoments.length >= eligibleMoments.length / 4 * 3 && matchingMoments.length > moments.length / 4) {
	                    avg /= matchingMoments.length;
	                    patch = {
	                        index: patchPos[1] * _numPatches.x + patchPos[0],
	                        pos: {
	                            x: x,
	                            y: y
	                        },
	                        box: [vec2.clone([x, y]), vec2.clone([x + _subImageWrapper.size.x, y]), vec2.clone([x + _subImageWrapper.size.x, y + _subImageWrapper.size.y]), vec2.clone([x, y + _subImageWrapper.size.y])],
	                        moments: matchingMoments,
	                        rad: avg,
	                        vec: vec2.clone([Math.cos(avg), Math.sin(avg)])
	                    };
	                    patchesFound.push(patch);
	                }
	            }
	        }
	        return patchesFound;
	    }
	
	    /**
	     * finds patches which are connected and share the same orientation
	     * @param {Object} patchesFound
	     */
	    function rasterizeAngularSimilarity(patchesFound) {
	        var label = 0,
	            threshold = 0.95,
	            currIdx = 0,
	            j,
	            patch,
	            hsv = [0, 1, 1],
	            rgb = [0, 0, 0];
	
	        function notYetProcessed() {
	            var i;
	            for (i = 0; i < _patchLabelGrid.data.length; i++) {
	                if (_patchLabelGrid.data[i] === 0 && _patchGrid.data[i] === 1) {
	                    return i;
	                }
	            }
	            return _patchLabelGrid.length;
	        }
	
	        function trace(currentIdx) {
	            var x,
	                y,
	                currentPatch,
	                idx,
	                dir,
	                current = {
	                x: currentIdx % _patchLabelGrid.size.x,
	                y: currentIdx / _patchLabelGrid.size.x | 0
	            },
	                similarity;
	
	            if (currentIdx < _patchLabelGrid.data.length) {
	                currentPatch = _imageToPatchGrid.data[currentIdx];
	                // assign label
	                _patchLabelGrid.data[currentIdx] = label;
	                for (dir = 0; dir < /* harmony import */__WEBPACK_IMPORTED_MODULE_5__tracer__["a"].searchDirections.length; dir++) {
	                    y = current.y + /* harmony import */__WEBPACK_IMPORTED_MODULE_5__tracer__["a"].searchDirections[dir][0];
	                    x = current.x + /* harmony import */__WEBPACK_IMPORTED_MODULE_5__tracer__["a"].searchDirections[dir][1];
	                    idx = y * _patchLabelGrid.size.x + x;
	
	                    // continue if patch empty
	                    if (_patchGrid.data[idx] === 0) {
	                        _patchLabelGrid.data[idx] = Number.MAX_VALUE;
	                        continue;
	                    }
	
	                    if (_patchLabelGrid.data[idx] === 0) {
	                        similarity = Math.abs(vec2.dot(_imageToPatchGrid.data[idx].vec, currentPatch.vec));
	                        if (similarity > threshold) {
	                            trace(idx);
	                        }
	                    }
	                }
	            }
	        }
	
	        // prepare for finding the right patches
	        /* harmony import */__WEBPACK_IMPORTED_MODULE_2__common_array_helper__["a"].init(_patchGrid.data, 0);
	        /* harmony import */__WEBPACK_IMPORTED_MODULE_2__common_array_helper__["a"].init(_patchLabelGrid.data, 0);
	        /* harmony import */__WEBPACK_IMPORTED_MODULE_2__common_array_helper__["a"].init(_imageToPatchGrid.data, null);
	
	        for (j = 0; j < patchesFound.length; j++) {
	            patch = patchesFound[j];
	            _imageToPatchGrid.data[patch.index] = patch;
	            _patchGrid.data[patch.index] = 1;
	        }
	
	        // rasterize the patches found to determine area
	        _patchGrid.zeroBorder();
	
	        while ((currIdx = notYetProcessed()) < _patchLabelGrid.data.length) {
	            label++;
	            trace(currIdx);
	        }
	
	        // draw patch-labels if requested
	        if (true && _config.debug.showPatchLabels) {
	            for (j = 0; j < _patchLabelGrid.data.length; j++) {
	                if (_patchLabelGrid.data[j] > 0 && _patchLabelGrid.data[j] <= label) {
	                    patch = _imageToPatchGrid.data[j];
	                    hsv[0] = _patchLabelGrid.data[j] / (label + 1) * 360;
	                    /* harmony import */__WEBPACK_IMPORTED_MODULE_1__common_cv_utils__["a"].bind()(hsv, rgb);
	                    /* harmony import */__WEBPACK_IMPORTED_MODULE_3__common_image_debug__["a"].drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, { color: "rgb(" + rgb.join(",") + ")", lineWidth: 2 });
	                }
	            }
	        }
	
	        return label;
	    }
	
	    return {
	        locate: function locate() {
	            var patchesFound, topLabels, boxes;
	
	            if (_config.halfSample) {
	                /* harmony import */__WEBPACK_IMPORTED_MODULE_1__common_cv_utils__["g"].bind()(_inputImageWrapper, _currentImageWrapper);
	            }
	
	            binarizeImage();
	            patchesFound = findPatches();
	            // return unless 5% or more patches are found
	            if (patchesFound.length < _numPatches.x * _numPatches.y * 0.05) {
	                return null;
	            }
	
	            // rasterrize area by comparing angular similarity;
	            var maxLabel = rasterizeAngularSimilarity(patchesFound);
	            if (maxLabel < 1) {
	                return null;
	            }
	
	            // search for area with the most patches (biggest connected area)
	            topLabels = findBiggestConnectedAreas(maxLabel);
	            if (topLabels.length === 0) {
	                return null;
	            }
	
	            boxes = findBoxes(topLabels, maxLabel);
	            return boxes;
	        }
	    };
	}
	function checkImageConstraints(inputStream, config) {
	    var patchSize,
	        width = inputStream.getWidth(),
	        height = inputStream.getHeight(),
	        halfSample = config.halfSample ? 0.5 : 1,
	        size,
	        area;
	
	    // calculate width and height based on area
	    if (inputStream.getConfig().area) {
	        area = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__common_cv_utils__["h"].bind()(width, height, inputStream.getConfig().area);
	        inputStream.setTopRight({ x: area.sx, y: area.sy });
	        inputStream.setCanvasSize({ x: width, y: height });
	        width = area.sw;
	        height = area.sh;
	    }
	
	    size = {
	        x: Math.floor(width * halfSample),
	        y: Math.floor(height * halfSample)
	    };
	
	    patchSize = /* harmony import */__WEBPACK_IMPORTED_MODULE_1__common_cv_utils__["b"].bind()(config.patchSize, size);
	    if (true) {
	        console.log("Patch-Size: " + JSON.stringify(patchSize));
	    }
	
	    inputStream.setWidth(Math.floor(Math.floor(size.x / patchSize.x) * (1 / halfSample) * patchSize.x));
	    inputStream.setHeight(Math.floor(Math.floor(size.y / patchSize.y) * (1 / halfSample) * patchSize.y));
	
	    if (inputStream.getWidth() % patchSize.x === 0 && inputStream.getHeight() % patchSize.y === 0) {
	        return true;
	    }
	
	    throw new Error("Image dimensions do not comply with the current settings: Width (" + width + " )and height (" + height + ") must a multiple of " + patchSize.x);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tracer__ = __webpack_require__(38);
	
	
	/**
	 * http://www.codeproject.com/Tips/407172/Connected-Component-Labeling-and-Vectorization
	 */
	var Rasterizer = {
	    createContour2D: function createContour2D() {
	        return {
	            dir: null,
	            index: null,
	            firstVertex: null,
	            insideContours: null,
	            nextpeer: null,
	            prevpeer: null
	        };
	    },
	    CONTOUR_DIR: {
	        CW_DIR: 0,
	        CCW_DIR: 1,
	        UNKNOWN_DIR: 2
	    },
	    DIR: {
	        OUTSIDE_EDGE: -32767,
	        INSIDE_EDGE: -32766
	    },
	    create: function create(imageWrapper, labelWrapper) {
	        var imageData = imageWrapper.data,
	            labelData = labelWrapper.data,
	            width = imageWrapper.size.x,
	            height = imageWrapper.size.y,
	            tracer = /* harmony import */__WEBPACK_IMPORTED_MODULE_0__tracer__["a"].create(imageWrapper, labelWrapper);
	
	        return {
	            rasterize: function rasterize(depthlabel) {
	                var color,
	                    bc,
	                    lc,
	                    labelindex,
	                    cx,
	                    cy,
	                    colorMap = [],
	                    vertex,
	                    p,
	                    cc,
	                    sc,
	                    pos,
	                    connectedCount = 0,
	                    i;
	
	                for (i = 0; i < 400; i++) {
	                    colorMap[i] = 0;
	                }
	
	                colorMap[0] = imageData[0];
	                cc = null;
	                for (cy = 1; cy < height - 1; cy++) {
	                    labelindex = 0;
	                    bc = colorMap[0];
	                    for (cx = 1; cx < width - 1; cx++) {
	                        pos = cy * width + cx;
	                        if (labelData[pos] === 0) {
	                            color = imageData[pos];
	                            if (color !== bc) {
	                                if (labelindex === 0) {
	                                    lc = connectedCount + 1;
	                                    colorMap[lc] = color;
	                                    bc = color;
	                                    vertex = tracer.contourTracing(cy, cx, lc, color, Rasterizer.DIR.OUTSIDE_EDGE);
	                                    if (vertex !== null) {
	                                        connectedCount++;
	                                        labelindex = lc;
	                                        p = Rasterizer.createContour2D();
	                                        p.dir = Rasterizer.CONTOUR_DIR.CW_DIR;
	                                        p.index = labelindex;
	                                        p.firstVertex = vertex;
	                                        p.nextpeer = cc;
	                                        p.insideContours = null;
	                                        if (cc !== null) {
	                                            cc.prevpeer = p;
	                                        }
	                                        cc = p;
	                                    }
	                                } else {
	                                    vertex = tracer.contourTracing(cy, cx, Rasterizer.DIR.INSIDE_EDGE, color, labelindex);
	                                    if (vertex !== null) {
	                                        p = Rasterizer.createContour2D();
	                                        p.firstVertex = vertex;
	                                        p.insideContours = null;
	                                        if (depthlabel === 0) {
	                                            p.dir = Rasterizer.CONTOUR_DIR.CCW_DIR;
	                                        } else {
	                                            p.dir = Rasterizer.CONTOUR_DIR.CW_DIR;
	                                        }
	                                        p.index = depthlabel;
	                                        sc = cc;
	                                        while (sc !== null && sc.index !== labelindex) {
	                                            sc = sc.nextpeer;
	                                        }
	                                        if (sc !== null) {
	                                            p.nextpeer = sc.insideContours;
	                                            if (sc.insideContours !== null) {
	                                                sc.insideContours.prevpeer = p;
	                                            }
	                                            sc.insideContours = p;
	                                        }
	                                    }
	                                }
	                            } else {
	                                labelData[pos] = labelindex;
	                            }
	                        } else if (labelData[pos] === Rasterizer.DIR.OUTSIDE_EDGE || labelData[pos] === Rasterizer.DIR.INSIDE_EDGE) {
	                            labelindex = 0;
	                            if (labelData[pos] === Rasterizer.DIR.INSIDE_EDGE) {
	                                bc = imageData[pos];
	                            } else {
	                                bc = colorMap[0];
	                            }
	                        } else {
	                            labelindex = labelData[pos];
	                            bc = colorMap[labelindex];
	                        }
	                    }
	                }
	                sc = cc;
	                while (sc !== null) {
	                    sc.index = depthlabel;
	                    sc = sc.nextpeer;
	                }
	                return {
	                    cc: cc,
	                    count: connectedCount
	                };
	            },
	            debug: {
	                drawContour: function drawContour(canvas, firstContour) {
	                    var ctx = canvas.getContext("2d"),
	                        pq = firstContour,
	                        iq,
	                        q,
	                        p;
	
	                    ctx.strokeStyle = "red";
	                    ctx.fillStyle = "red";
	                    ctx.lineWidth = 1;
	
	                    if (pq !== null) {
	                        iq = pq.insideContours;
	                    } else {
	                        iq = null;
	                    }
	
	                    while (pq !== null) {
	                        if (iq !== null) {
	                            q = iq;
	                            iq = iq.nextpeer;
	                        } else {
	                            q = pq;
	                            pq = pq.nextpeer;
	                            if (pq !== null) {
	                                iq = pq.insideContours;
	                            } else {
	                                iq = null;
	                            }
	                        }
	
	                        switch (q.dir) {
	                            case Rasterizer.CONTOUR_DIR.CW_DIR:
	                                ctx.strokeStyle = "red";
	                                break;
	                            case Rasterizer.CONTOUR_DIR.CCW_DIR:
	                                ctx.strokeStyle = "blue";
	                                break;
	                            case Rasterizer.CONTOUR_DIR.UNKNOWN_DIR:
	                                ctx.strokeStyle = "green";
	                                break;
	                        }
	
	                        p = q.firstVertex;
	                        ctx.beginPath();
	                        ctx.moveTo(p.x, p.y);
	                        do {
	                            p = p.next;
	                            ctx.lineTo(p.x, p.y);
	                        } while (p !== q.firstVertex);
	                        ctx.stroke();
	                    }
	                }
	            }
	        };
	    }
	};
	
	/* harmony default export */ exports["a"] = Rasterizer;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	/* @preserve ASM BEGIN */
	/* eslint-disable eqeqeq*/
	function Skeletonizer(stdlib, foreign, buffer) {
	    "use asm";
	
	    var images = new stdlib.Uint8Array(buffer),
	        size = foreign.size | 0,
	        imul = stdlib.Math.imul;
	
	    function erode(inImagePtr, outImagePtr) {
	        inImagePtr = inImagePtr | 0;
	        outImagePtr = outImagePtr | 0;
	
	        var v = 0,
	            u = 0,
	            sum = 0,
	            yStart1 = 0,
	            yStart2 = 0,
	            xStart1 = 0,
	            xStart2 = 0,
	            offset = 0;
	
	        for (v = 1; (v | 0) < (size - 1 | 0); v = v + 1 | 0) {
	            offset = offset + size | 0;
	            for (u = 1; (u | 0) < (size - 1 | 0); u = u + 1 | 0) {
	                yStart1 = offset - size | 0;
	                yStart2 = offset + size | 0;
	                xStart1 = u - 1 | 0;
	                xStart2 = u + 1 | 0;
	                sum = (images[inImagePtr + yStart1 + xStart1 | 0] | 0) + (images[inImagePtr + yStart1 + xStart2 | 0] | 0) + (images[inImagePtr + offset + u | 0] | 0) + (images[inImagePtr + yStart2 + xStart1 | 0] | 0) + (images[inImagePtr + yStart2 + xStart2 | 0] | 0) | 0;
	                if ((sum | 0) == (5 | 0)) {
	                    images[outImagePtr + offset + u | 0] = 1;
	                } else {
	                    images[outImagePtr + offset + u | 0] = 0;
	                }
	            }
	        }
	        return;
	    }
	
	    function subtract(aImagePtr, bImagePtr, outImagePtr) {
	        aImagePtr = aImagePtr | 0;
	        bImagePtr = bImagePtr | 0;
	        outImagePtr = outImagePtr | 0;
	
	        var length = 0;
	
	        length = imul(size, size) | 0;
	
	        while ((length | 0) > 0) {
	            length = length - 1 | 0;
	            images[outImagePtr + length | 0] = (images[aImagePtr + length | 0] | 0) - (images[bImagePtr + length | 0] | 0) | 0;
	        }
	    }
	
	    function bitwiseOr(aImagePtr, bImagePtr, outImagePtr) {
	        aImagePtr = aImagePtr | 0;
	        bImagePtr = bImagePtr | 0;
	        outImagePtr = outImagePtr | 0;
	
	        var length = 0;
	
	        length = imul(size, size) | 0;
	
	        while ((length | 0) > 0) {
	            length = length - 1 | 0;
	            images[outImagePtr + length | 0] = images[aImagePtr + length | 0] | 0 | (images[bImagePtr + length | 0] | 0) | 0;
	        }
	    }
	
	    function countNonZero(imagePtr) {
	        imagePtr = imagePtr | 0;
	
	        var sum = 0,
	            length = 0;
	
	        length = imul(size, size) | 0;
	
	        while ((length | 0) > 0) {
	            length = length - 1 | 0;
	            sum = (sum | 0) + (images[imagePtr + length | 0] | 0) | 0;
	        }
	
	        return sum | 0;
	    }
	
	    function init(imagePtr, value) {
	        imagePtr = imagePtr | 0;
	        value = value | 0;
	
	        var length = 0;
	
	        length = imul(size, size) | 0;
	
	        while ((length | 0) > 0) {
	            length = length - 1 | 0;
	            images[imagePtr + length | 0] = value;
	        }
	    }
	
	    function dilate(inImagePtr, outImagePtr) {
	        inImagePtr = inImagePtr | 0;
	        outImagePtr = outImagePtr | 0;
	
	        var v = 0,
	            u = 0,
	            sum = 0,
	            yStart1 = 0,
	            yStart2 = 0,
	            xStart1 = 0,
	            xStart2 = 0,
	            offset = 0;
	
	        for (v = 1; (v | 0) < (size - 1 | 0); v = v + 1 | 0) {
	            offset = offset + size | 0;
	            for (u = 1; (u | 0) < (size - 1 | 0); u = u + 1 | 0) {
	                yStart1 = offset - size | 0;
	                yStart2 = offset + size | 0;
	                xStart1 = u - 1 | 0;
	                xStart2 = u + 1 | 0;
	                sum = (images[inImagePtr + yStart1 + xStart1 | 0] | 0) + (images[inImagePtr + yStart1 + xStart2 | 0] | 0) + (images[inImagePtr + offset + u | 0] | 0) + (images[inImagePtr + yStart2 + xStart1 | 0] | 0) + (images[inImagePtr + yStart2 + xStart2 | 0] | 0) | 0;
	                if ((sum | 0) > (0 | 0)) {
	                    images[outImagePtr + offset + u | 0] = 1;
	                } else {
	                    images[outImagePtr + offset + u | 0] = 0;
	                }
	            }
	        }
	        return;
	    }
	
	    function memcpy(srcImagePtr, dstImagePtr) {
	        srcImagePtr = srcImagePtr | 0;
	        dstImagePtr = dstImagePtr | 0;
	
	        var length = 0;
	
	        length = imul(size, size) | 0;
	
	        while ((length | 0) > 0) {
	            length = length - 1 | 0;
	            images[dstImagePtr + length | 0] = images[srcImagePtr + length | 0] | 0;
	        }
	    }
	
	    function zeroBorder(imagePtr) {
	        imagePtr = imagePtr | 0;
	
	        var x = 0,
	            y = 0;
	
	        for (x = 0; (x | 0) < (size - 1 | 0); x = x + 1 | 0) {
	            images[imagePtr + x | 0] = 0;
	            images[imagePtr + y | 0] = 0;
	            y = y + size - 1 | 0;
	            images[imagePtr + y | 0] = 0;
	            y = y + 1 | 0;
	        }
	        for (x = 0; (x | 0) < (size | 0); x = x + 1 | 0) {
	            images[imagePtr + y | 0] = 0;
	            y = y + 1 | 0;
	        }
	    }
	
	    function skeletonize() {
	        var subImagePtr = 0,
	            erodedImagePtr = 0,
	            tempImagePtr = 0,
	            skelImagePtr = 0,
	            sum = 0,
	            done = 0;
	
	        erodedImagePtr = imul(size, size) | 0;
	        tempImagePtr = erodedImagePtr + erodedImagePtr | 0;
	        skelImagePtr = tempImagePtr + erodedImagePtr | 0;
	
	        // init skel-image
	        init(skelImagePtr, 0);
	        zeroBorder(subImagePtr);
	
	        do {
	            erode(subImagePtr, erodedImagePtr);
	            dilate(erodedImagePtr, tempImagePtr);
	            subtract(subImagePtr, tempImagePtr, tempImagePtr);
	            bitwiseOr(skelImagePtr, tempImagePtr, skelImagePtr);
	            memcpy(erodedImagePtr, subImagePtr);
	            sum = countNonZero(subImagePtr) | 0;
	            done = (sum | 0) == 0 | 0;
	        } while (!done);
	    }
	    return {
	        skeletonize: skeletonize
	    };
	}
	/* @preserve ASM END */
	/* harmony default export */ exports["a"] = Skeletonizer;
	/* eslint-enable eqeqeq*/

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__barcode_reader__ = __webpack_require__(9);
	
	
	function CodabarReader() {
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_0__barcode_reader__["a"].call(this);
	    this._counters = [];
	}
	
	var properties = {
	    ALPHABETH_STRING: { value: "0123456789-$:/.+ABCD" },
	    ALPHABET: { value: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 45, 36, 58, 47, 46, 43, 65, 66, 67, 68] },
	    CHARACTER_ENCODINGS: { value: [0x003, 0x006, 0x009, 0x060, 0x012, 0x042, 0x021, 0x024, 0x030, 0x048, 0x00c, 0x018, 0x045, 0x051, 0x054, 0x015, 0x01A, 0x029, 0x00B, 0x00E] },
	    START_END: { value: [0x01A, 0x029, 0x00B, 0x00E] },
	    MIN_ENCODED_CHARS: { value: 4 },
	    MAX_ACCEPTABLE: { value: 2.0 },
	    PADDING: { value: 1.5 },
	    FORMAT: { value: "codabar", writeable: false }
	};
	
	CodabarReader.prototype = Object.create(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__barcode_reader__["a"].prototype, properties);
	CodabarReader.prototype.constructor = CodabarReader;
	
	CodabarReader.prototype._decode = function () {
	    var self = this,
	        result = [],
	        start,
	        decodedChar,
	        pattern,
	        nextStart,
	        end;
	
	    this._counters = self._fillCounters();
	    start = self._findStart();
	    if (!start) {
	        return null;
	    }
	    nextStart = start.startCounter;
	
	    do {
	        pattern = self._toPattern(nextStart);
	        if (pattern < 0) {
	            return null;
	        }
	        decodedChar = self._patternToChar(pattern);
	        if (decodedChar < 0) {
	            return null;
	        }
	        result.push(decodedChar);
	        nextStart += 8;
	        if (result.length > 1 && self._isStartEnd(pattern)) {
	            break;
	        }
	    } while (nextStart < self._counters.length);
	
	    // verify end
	    if (result.length - 2 < self.MIN_ENCODED_CHARS || !self._isStartEnd(pattern)) {
	        return null;
	    }
	
	    // verify end white space
	    if (!self._verifyWhitespace(start.startCounter, nextStart - 8)) {
	        return null;
	    }
	
	    if (!self._validateResult(result, start.startCounter)) {
	        return null;
	    }
	
	    nextStart = nextStart > self._counters.length ? self._counters.length : nextStart;
	    end = start.start + self._sumCounters(start.startCounter, nextStart - 8);
	
	    return {
	        code: result.join(""),
	        start: start.start,
	        end: end,
	        startInfo: start,
	        decodedCodes: result
	    };
	};
	
	CodabarReader.prototype._verifyWhitespace = function (startCounter, endCounter) {
	    if (startCounter - 1 <= 0 || this._counters[startCounter - 1] >= this._calculatePatternLength(startCounter) / 2.0) {
	        if (endCounter + 8 >= this._counters.length || this._counters[endCounter + 7] >= this._calculatePatternLength(endCounter) / 2.0) {
	            return true;
	        }
	    }
	    return false;
	};
	
	CodabarReader.prototype._calculatePatternLength = function (offset) {
	    var i,
	        sum = 0;
	
	    for (i = offset; i < offset + 7; i++) {
	        sum += this._counters[i];
	    }
	
	    return sum;
	};
	
	CodabarReader.prototype._thresholdResultPattern = function (result, startCounter) {
	    var self = this,
	        categorization = {
	        space: {
	            narrow: { size: 0, counts: 0, min: 0, max: Number.MAX_VALUE },
	            wide: { size: 0, counts: 0, min: 0, max: Number.MAX_VALUE }
	        },
	        bar: {
	            narrow: { size: 0, counts: 0, min: 0, max: Number.MAX_VALUE },
	            wide: { size: 0, counts: 0, min: 0, max: Number.MAX_VALUE }
	        }
	    },
	        kind,
	        cat,
	        i,
	        j,
	        pos = startCounter,
	        pattern;
	
	    for (i = 0; i < result.length; i++) {
	        pattern = self._charToPattern(result[i]);
	        for (j = 6; j >= 0; j--) {
	            kind = (j & 1) === 2 ? categorization.bar : categorization.space;
	            cat = (pattern & 1) === 1 ? kind.wide : kind.narrow;
	            cat.size += self._counters[pos + j];
	            cat.counts++;
	            pattern >>= 1;
	        }
	        pos += 8;
	    }
	
	    ["space", "bar"].forEach(function (key) {
	        var newkind = categorization[key];
	        newkind.wide.min = Math.floor((newkind.narrow.size / newkind.narrow.counts + newkind.wide.size / newkind.wide.counts) / 2);
	        newkind.narrow.max = Math.ceil(newkind.wide.min);
	        newkind.wide.max = Math.ceil((newkind.wide.size * self.MAX_ACCEPTABLE + self.PADDING) / newkind.wide.counts);
	    });
	
	    return categorization;
	};
	
	CodabarReader.prototype._charToPattern = function (char) {
	    var self = this,
	        charCode = char.charCodeAt(0),
	        i;
	
	    for (i = 0; i < self.ALPHABET.length; i++) {
	        if (self.ALPHABET[i] === charCode) {
	            return self.CHARACTER_ENCODINGS[i];
	        }
	    }
	    return 0x0;
	};
	
	CodabarReader.prototype._validateResult = function (result, startCounter) {
	    var self = this,
	        thresholds = self._thresholdResultPattern(result, startCounter),
	        i,
	        j,
	        kind,
	        cat,
	        size,
	        pos = startCounter,
	        pattern;
	
	    for (i = 0; i < result.length; i++) {
	        pattern = self._charToPattern(result[i]);
	        for (j = 6; j >= 0; j--) {
	            kind = (j & 1) === 0 ? thresholds.bar : thresholds.space;
	            cat = (pattern & 1) === 1 ? kind.wide : kind.narrow;
	            size = self._counters[pos + j];
	            if (size < cat.min || size > cat.max) {
	                return false;
	            }
	            pattern >>= 1;
	        }
	        pos += 8;
	    }
	    return true;
	};
	
	CodabarReader.prototype._patternToChar = function (pattern) {
	    var i,
	        self = this;
	
	    for (i = 0; i < self.CHARACTER_ENCODINGS.length; i++) {
	        if (self.CHARACTER_ENCODINGS[i] === pattern) {
	            return String.fromCharCode(self.ALPHABET[i]);
	        }
	    }
	    return -1;
	};
	
	CodabarReader.prototype._computeAlternatingThreshold = function (offset, end) {
	    var i,
	        min = Number.MAX_VALUE,
	        max = 0,
	        counter;
	
	    for (i = offset; i < end; i += 2) {
	        counter = this._counters[i];
	        if (counter > max) {
	            max = counter;
	        }
	        if (counter < min) {
	            min = counter;
	        }
	    }
	
	    return (min + max) / 2.0 | 0;
	};
	
	CodabarReader.prototype._toPattern = function (offset) {
	    var numCounters = 7,
	        end = offset + numCounters,
	        barThreshold,
	        spaceThreshold,
	        bitmask = 1 << numCounters - 1,
	        pattern = 0,
	        i,
	        threshold;
	
	    if (end > this._counters.length) {
	        return -1;
	    }
	
	    barThreshold = this._computeAlternatingThreshold(offset, end);
	    spaceThreshold = this._computeAlternatingThreshold(offset + 1, end);
	
	    for (i = 0; i < numCounters; i++) {
	        threshold = (i & 1) === 0 ? barThreshold : spaceThreshold;
	        if (this._counters[offset + i] > threshold) {
	            pattern |= bitmask;
	        }
	        bitmask >>= 1;
	    }
	
	    return pattern;
	};
	
	CodabarReader.prototype._isStartEnd = function (pattern) {
	    var i;
	
	    for (i = 0; i < this.START_END.length; i++) {
	        if (this.START_END[i] === pattern) {
	            return true;
	        }
	    }
	    return false;
	};
	
	CodabarReader.prototype._sumCounters = function (start, end) {
	    var i,
	        sum = 0;
	
	    for (i = start; i < end; i++) {
	        sum += this._counters[i];
	    }
	    return sum;
	};
	
	CodabarReader.prototype._findStart = function () {
	    var self = this,
	        i,
	        pattern,
	        start = self._nextUnset(self._row),
	        end;
	
	    for (i = 1; i < this._counters.length; i++) {
	        pattern = self._toPattern(i);
	        if (pattern !== -1 && self._isStartEnd(pattern)) {
	            // TODO: Look for whitespace ahead
	            start += self._sumCounters(0, i);
	            end = start + self._sumCounters(i, i + 8);
	            return {
	                start: start,
	                end: end,
	                startCounter: i,
	                endCounter: i + 8
	            };
	        }
	    }
	};
	
	/* harmony default export */ exports["a"] = CodabarReader;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__barcode_reader__ = __webpack_require__(9);
	
	
	function Code128Reader() {
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_0__barcode_reader__["a"].call(this);
	}
	
	var properties = {
	    CODE_SHIFT: { value: 98 },
	    CODE_C: { value: 99 },
	    CODE_B: { value: 100 },
	    CODE_A: { value: 101 },
	    START_CODE_A: { value: 103 },
	    START_CODE_B: { value: 104 },
	    START_CODE_C: { value: 105 },
	    STOP_CODE: { value: 106 },
	    CODE_PATTERN: { value: [[2, 1, 2, 2, 2, 2], [2, 2, 2, 1, 2, 2], [2, 2, 2, 2, 2, 1], [1, 2, 1, 2, 2, 3], [1, 2, 1, 3, 2, 2], [1, 3, 1, 2, 2, 2], [1, 2, 2, 2, 1, 3], [1, 2, 2, 3, 1, 2], [1, 3, 2, 2, 1, 2], [2, 2, 1, 2, 1, 3], [2, 2, 1, 3, 1, 2], [2, 3, 1, 2, 1, 2], [1, 1, 2, 2, 3, 2], [1, 2, 2, 1, 3, 2], [1, 2, 2, 2, 3, 1], [1, 1, 3, 2, 2, 2], [1, 2, 3, 1, 2, 2], [1, 2, 3, 2, 2, 1], [2, 2, 3, 2, 1, 1], [2, 2, 1, 1, 3, 2], [2, 2, 1, 2, 3, 1], [2, 1, 3, 2, 1, 2], [2, 2, 3, 1, 1, 2], [3, 1, 2, 1, 3, 1], [3, 1, 1, 2, 2, 2], [3, 2, 1, 1, 2, 2], [3, 2, 1, 2, 2, 1], [3, 1, 2, 2, 1, 2], [3, 2, 2, 1, 1, 2], [3, 2, 2, 2, 1, 1], [2, 1, 2, 1, 2, 3], [2, 1, 2, 3, 2, 1], [2, 3, 2, 1, 2, 1], [1, 1, 1, 3, 2, 3], [1, 3, 1, 1, 2, 3], [1, 3, 1, 3, 2, 1], [1, 1, 2, 3, 1, 3], [1, 3, 2, 1, 1, 3], [1, 3, 2, 3, 1, 1], [2, 1, 1, 3, 1, 3], [2, 3, 1, 1, 1, 3], [2, 3, 1, 3, 1, 1], [1, 1, 2, 1, 3, 3], [1, 1, 2, 3, 3, 1], [1, 3, 2, 1, 3, 1], [1, 1, 3, 1, 2, 3], [1, 1, 3, 3, 2, 1], [1, 3, 3, 1, 2, 1], [3, 1, 3, 1, 2, 1], [2, 1, 1, 3, 3, 1], [2, 3, 1, 1, 3, 1], [2, 1, 3, 1, 1, 3], [2, 1, 3, 3, 1, 1], [2, 1, 3, 1, 3, 1], [3, 1, 1, 1, 2, 3], [3, 1, 1, 3, 2, 1], [3, 3, 1, 1, 2, 1], [3, 1, 2, 1, 1, 3], [3, 1, 2, 3, 1, 1], [3, 3, 2, 1, 1, 1], [3, 1, 4, 1, 1, 1], [2, 2, 1, 4, 1, 1], [4, 3, 1, 1, 1, 1], [1, 1, 1, 2, 2, 4], [1, 1, 1, 4, 2, 2], [1, 2, 1, 1, 2, 4], [1, 2, 1, 4, 2, 1], [1, 4, 1, 1, 2, 2], [1, 4, 1, 2, 2, 1], [1, 1, 2, 2, 1, 4], [1, 1, 2, 4, 1, 2], [1, 2, 2, 1, 1, 4], [1, 2, 2, 4, 1, 1], [1, 4, 2, 1, 1, 2], [1, 4, 2, 2, 1, 1], [2, 4, 1, 2, 1, 1], [2, 2, 1, 1, 1, 4], [4, 1, 3, 1, 1, 1], [2, 4, 1, 1, 1, 2], [1, 3, 4, 1, 1, 1], [1, 1, 1, 2, 4, 2], [1, 2, 1, 1, 4, 2], [1, 2, 1, 2, 4, 1], [1, 1, 4, 2, 1, 2], [1, 2, 4, 1, 1, 2], [1, 2, 4, 2, 1, 1], [4, 1, 1, 2, 1, 2], [4, 2, 1, 1, 1, 2], [4, 2, 1, 2, 1, 1], [2, 1, 2, 1, 4, 1], [2, 1, 4, 1, 2, 1], [4, 1, 2, 1, 2, 1], [1, 1, 1, 1, 4, 3], [1, 1, 1, 3, 4, 1], [1, 3, 1, 1, 4, 1], [1, 1, 4, 1, 1, 3], [1, 1, 4, 3, 1, 1], [4, 1, 1, 1, 1, 3], [4, 1, 1, 3, 1, 1], [1, 1, 3, 1, 4, 1], [1, 1, 4, 1, 3, 1], [3, 1, 1, 1, 4, 1], [4, 1, 1, 1, 3, 1], [2, 1, 1, 4, 1, 2], [2, 1, 1, 2, 1, 4], [2, 1, 1, 2, 3, 2], [2, 3, 3, 1, 1, 1, 2]] },
	    SINGLE_CODE_ERROR: { value: 0.64 },
	    AVG_CODE_ERROR: { value: 0.30 },
	    FORMAT: { value: "code_128", writeable: false },
	    MODULE_INDICES: { value: { bar: [0, 2, 4], space: [1, 3, 5] } }
	};
	
	Code128Reader.prototype = Object.create(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__barcode_reader__["a"].prototype, properties);
	Code128Reader.prototype.constructor = Code128Reader;
	
	Code128Reader.prototype._decodeCode = function (start, correction) {
	    var counter = [0, 0, 0, 0, 0, 0],
	        i,
	        self = this,
	        offset = start,
	        isWhite = !self._row[offset],
	        counterPos = 0,
	        bestMatch = {
	        error: Number.MAX_VALUE,
	        code: -1,
	        start: start,
	        end: start,
	        correction: {
	            bar: 1,
	            space: 1
	        }
	    },
	        code,
	        error;
	
	    for (i = offset; i < self._row.length; i++) {
	        if (self._row[i] ^ isWhite) {
	            counter[counterPos]++;
	        } else {
	            if (counterPos === counter.length - 1) {
	                if (correction) {
	                    self._correct(counter, correction);
	                }
	                for (code = 0; code < self.CODE_PATTERN.length; code++) {
	                    error = self._matchPattern(counter, self.CODE_PATTERN[code]);
	                    if (error < bestMatch.error) {
	                        bestMatch.code = code;
	                        bestMatch.error = error;
	                    }
	                }
	                bestMatch.end = i;
	                if (bestMatch.code === -1 || bestMatch.error > self.AVG_CODE_ERROR) {
	                    return null;
	                }
	                if (self.CODE_PATTERN[bestMatch.code]) {
	                    bestMatch.correction.bar = calculateCorrection(self.CODE_PATTERN[bestMatch.code], counter, this.MODULE_INDICES.bar);
	                    bestMatch.correction.space = calculateCorrection(self.CODE_PATTERN[bestMatch.code], counter, this.MODULE_INDICES.space);
	                }
	                return bestMatch;
	            } else {
	                counterPos++;
	            }
	            counter[counterPos] = 1;
	            isWhite = !isWhite;
	        }
	    }
	    return null;
	};
	
	Code128Reader.prototype._correct = function (counter, correction) {
	    this._correctBars(counter, correction.bar, this.MODULE_INDICES.bar);
	    this._correctBars(counter, correction.space, this.MODULE_INDICES.space);
	};
	
	Code128Reader.prototype._findStart = function () {
	    var counter = [0, 0, 0, 0, 0, 0],
	        i,
	        self = this,
	        offset = self._nextSet(self._row),
	        isWhite = false,
	        counterPos = 0,
	        bestMatch = {
	        error: Number.MAX_VALUE,
	        code: -1,
	        start: 0,
	        end: 0,
	        correction: {
	            bar: 1,
	            space: 1
	        }
	    },
	        code,
	        error,
	        j,
	        sum;
	
	    for (i = offset; i < self._row.length; i++) {
	        if (self._row[i] ^ isWhite) {
	            counter[counterPos]++;
	        } else {
	            if (counterPos === counter.length - 1) {
	                sum = 0;
	                for (j = 0; j < counter.length; j++) {
	                    sum += counter[j];
	                }
	                for (code = self.START_CODE_A; code <= self.START_CODE_C; code++) {
	                    error = self._matchPattern(counter, self.CODE_PATTERN[code]);
	                    if (error < bestMatch.error) {
	                        bestMatch.code = code;
	                        bestMatch.error = error;
	                    }
	                }
	                if (bestMatch.error < self.AVG_CODE_ERROR) {
	                    bestMatch.start = i - sum;
	                    bestMatch.end = i;
	                    bestMatch.correction.bar = calculateCorrection(self.CODE_PATTERN[bestMatch.code], counter, this.MODULE_INDICES.bar);
	                    bestMatch.correction.space = calculateCorrection(self.CODE_PATTERN[bestMatch.code], counter, this.MODULE_INDICES.space);
	                    return bestMatch;
	                }
	
	                for (j = 0; j < 4; j++) {
	                    counter[j] = counter[j + 2];
	                }
	                counter[4] = 0;
	                counter[5] = 0;
	                counterPos--;
	            } else {
	                counterPos++;
	            }
	            counter[counterPos] = 1;
	            isWhite = !isWhite;
	        }
	    }
	    return null;
	};
	
	Code128Reader.prototype._decode = function () {
	    var self = this,
	        startInfo = self._findStart(),
	        code = null,
	        done = false,
	        result = [],
	        multiplier = 0,
	        checksum = 0,
	        codeset,
	        rawResult = [],
	        decodedCodes = [],
	        shiftNext = false,
	        unshift,
	        removeLastCharacter = true;
	
	    if (startInfo === null) {
	        return null;
	    }
	    code = {
	        code: startInfo.code,
	        start: startInfo.start,
	        end: startInfo.end,
	        correction: {
	            bar: startInfo.correction.bar,
	            space: startInfo.correction.space
	        }
	    };
	    decodedCodes.push(code);
	    checksum = code.code;
	    switch (code.code) {
	        case self.START_CODE_A:
	            codeset = self.CODE_A;
	            break;
	        case self.START_CODE_B:
	            codeset = self.CODE_B;
	            break;
	        case self.START_CODE_C:
	            codeset = self.CODE_C;
	            break;
	        default:
	            return null;
	    }
	
	    while (!done) {
	        unshift = shiftNext;
	        shiftNext = false;
	        code = self._decodeCode(code.end, code.correction);
	        if (code !== null) {
	            if (code.code !== self.STOP_CODE) {
	                removeLastCharacter = true;
	            }
	
	            if (code.code !== self.STOP_CODE) {
	                rawResult.push(code.code);
	                multiplier++;
	                checksum += multiplier * code.code;
	            }
	            decodedCodes.push(code);
	
	            switch (codeset) {
	                case self.CODE_A:
	                    if (code.code < 64) {
	                        result.push(String.fromCharCode(32 + code.code));
	                    } else if (code.code < 96) {
	                        result.push(String.fromCharCode(code.code - 64));
	                    } else {
	                        if (code.code !== self.STOP_CODE) {
	                            removeLastCharacter = false;
	                        }
	                        switch (code.code) {
	                            case self.CODE_SHIFT:
	                                shiftNext = true;
	                                codeset = self.CODE_B;
	                                break;
	                            case self.CODE_B:
	                                codeset = self.CODE_B;
	                                break;
	                            case self.CODE_C:
	                                codeset = self.CODE_C;
	                                break;
	                            case self.STOP_CODE:
	                                done = true;
	                                break;
	                        }
	                    }
	                    break;
	                case self.CODE_B:
	                    if (code.code < 96) {
	                        result.push(String.fromCharCode(32 + code.code));
	                    } else {
	                        if (code.code !== self.STOP_CODE) {
	                            removeLastCharacter = false;
	                        }
	                        switch (code.code) {
	                            case self.CODE_SHIFT:
	                                shiftNext = true;
	                                codeset = self.CODE_A;
	                                break;
	                            case self.CODE_A:
	                                codeset = self.CODE_A;
	                                break;
	                            case self.CODE_C:
	                                codeset = self.CODE_C;
	                                break;
	                            case self.STOP_CODE:
	                                done = true;
	                                break;
	                        }
	                    }
	                    break;
	                case self.CODE_C:
	                    if (code.code < 100) {
	                        result.push(code.code < 10 ? "0" + code.code : code.code);
	                    } else {
	                        if (code.code !== self.STOP_CODE) {
	                            removeLastCharacter = false;
	                        }
	                        switch (code.code) {
	                            case self.CODE_A:
	                                codeset = self.CODE_A;
	                                break;
	                            case self.CODE_B:
	                                codeset = self.CODE_B;
	                                break;
	                            case self.STOP_CODE:
	                                done = true;
	                                break;
	                        }
	                    }
	                    break;
	            }
	        } else {
	            done = true;
	        }
	        if (unshift) {
	            codeset = codeset === self.CODE_A ? self.CODE_B : self.CODE_A;
	        }
	    }
	
	    if (code === null) {
	        return null;
	    }
	
	    code.end = self._nextUnset(self._row, code.end);
	    if (!self._verifyTrailingWhitespace(code)) {
	        return null;
	    }
	
	    checksum -= multiplier * rawResult[rawResult.length - 1];
	    if (checksum % 103 !== rawResult[rawResult.length - 1]) {
	        return null;
	    }
	
	    if (!result.length) {
	        return null;
	    }
	
	    // remove last code from result (checksum)
	    if (removeLastCharacter) {
	        result.splice(result.length - 1, 1);
	    }
	
	    return {
	        code: result.join(""),
	        start: startInfo.start,
	        end: code.end,
	        codeset: codeset,
	        startInfo: startInfo,
	        decodedCodes: decodedCodes,
	        endInfo: code
	    };
	};
	
	/* harmony import */__WEBPACK_IMPORTED_MODULE_0__barcode_reader__["a"].prototype._verifyTrailingWhitespace = function (endInfo) {
	    var self = this,
	        trailingWhitespaceEnd;
	
	    trailingWhitespaceEnd = endInfo.end + (endInfo.end - endInfo.start) / 2;
	    if (trailingWhitespaceEnd < self._row.length) {
	        if (self._matchRange(endInfo.end, trailingWhitespaceEnd, 0)) {
	            return endInfo;
	        }
	    }
	    return null;
	};
	
	function calculateCorrection(expected, normalized, indices) {
	    var length = indices.length,
	        sumNormalized = 0,
	        sumExpected = 0;
	
	    while (length--) {
	        sumExpected += expected[indices[length]];
	        sumNormalized += normalized[indices[length]];
	    }
	    return sumExpected / sumNormalized;
	}
	
	/* harmony default export */ exports["a"] = Code128Reader;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__code_39_reader__ = __webpack_require__(39);
	
	
	function Code39VINReader() {
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_0__code_39_reader__["a"].call(this);
	}
	
	var patterns = {
	    IOQ: /[IOQ]/g,
	    AZ09: /[A-Z0-9]{17}/
	};
	
	Code39VINReader.prototype = Object.create(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__code_39_reader__["a"].prototype);
	Code39VINReader.prototype.constructor = Code39VINReader;
	
	// Cribbed from:
	// https://github.com/zxing/zxing/blob/master/core/src/main/java/com/google/zxing/client/result/VINResultParser.java
	Code39VINReader.prototype._decode = function () {
	    var result = /* harmony import */__WEBPACK_IMPORTED_MODULE_0__code_39_reader__["a"].prototype._decode.apply(this);
	    if (!result) {
	        return null;
	    }
	
	    var code = result.code;
	
	    if (!code) {
	        return null;
	    }
	
	    code = code.replace(patterns.IOQ, '');
	
	    if (!code.match(patterns.AZ09)) {
	        if (true) {
	            console.log('Failed AZ09 pattern code:', code);
	        }
	        return null;
	    }
	
	    if (!this._checkChecksum(code)) {
	        return null;
	    }
	
	    result.code = code;
	    return result;
	};
	
	Code39VINReader.prototype._checkChecksum = function (code) {
	    // TODO
	    return !!code;
	};
	
	/* harmony default export */ exports["a"] = Code39VINReader;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ean_reader__ = __webpack_require__(5);
	
	
	function EAN2Reader() {
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_0__ean_reader__["a"].call(this);
	}
	
	var properties = {
	    FORMAT: { value: "ean_2", writeable: false }
	};
	
	EAN2Reader.prototype = Object.create(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__ean_reader__["a"].prototype, properties);
	EAN2Reader.prototype.constructor = EAN2Reader;
	
	EAN2Reader.prototype.decode = function (row, start) {
	    this._row = row;
	    var counters = [0, 0, 0, 0],
	        codeFrequency = 0,
	        i = 0,
	        offset = start,
	        end = this._row.length,
	        code,
	        result = [],
	        decodedCodes = [];
	
	    for (i = 0; i < 2 && offset < end; i++) {
	        code = this._decodeCode(offset);
	        if (!code) {
	            return null;
	        }
	        decodedCodes.push(code);
	        result.push(code.code % 10);
	        if (code.code >= this.CODE_G_START) {
	            codeFrequency |= 1 << 1 - i;
	        }
	        if (i != 1) {
	            offset = this._nextSet(this._row, code.end);
	            offset = this._nextUnset(this._row, offset);
	        }
	    }
	
	    if (result.length != 2 || parseInt(result.join("")) % 4 !== codeFrequency) {
	        return null;
	    }
	    return {
	        code: result.join(""),
	        decodedCodes: decodedCodes,
	        end: code.end
	    };
	};
	
	/* harmony default export */ exports["a"] = EAN2Reader;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ean_reader__ = __webpack_require__(5);
	
	
	function EAN5Reader() {
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_0__ean_reader__["a"].call(this);
	}
	
	var properties = {
	    FORMAT: { value: "ean_5", writeable: false }
	};
	
	var CHECK_DIGIT_ENCODINGS = [24, 20, 18, 17, 12, 6, 3, 10, 9, 5];
	
	EAN5Reader.prototype = Object.create(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__ean_reader__["a"].prototype, properties);
	EAN5Reader.prototype.constructor = EAN5Reader;
	
	EAN5Reader.prototype.decode = function (row, start) {
	    this._row = row;
	    var counters = [0, 0, 0, 0],
	        codeFrequency = 0,
	        i = 0,
	        offset = start,
	        end = this._row.length,
	        code,
	        result = [],
	        decodedCodes = [];
	
	    for (i = 0; i < 5 && offset < end; i++) {
	        code = this._decodeCode(offset);
	        if (!code) {
	            return null;
	        }
	        decodedCodes.push(code);
	        result.push(code.code % 10);
	        if (code.code >= this.CODE_G_START) {
	            codeFrequency |= 1 << 4 - i;
	        }
	        if (i != 4) {
	            offset = this._nextSet(this._row, code.end);
	            offset = this._nextUnset(this._row, offset);
	        }
	    }
	
	    if (result.length != 5) {
	        return null;
	    }
	
	    if (extensionChecksum(result) !== determineCheckDigit(codeFrequency)) {
	        return null;
	    }
	    return {
	        code: result.join(""),
	        decodedCodes: decodedCodes,
	        end: code.end
	    };
	};
	
	function determineCheckDigit(codeFrequency) {
	    var i;
	    for (i = 0; i < 10; i++) {
	        if (codeFrequency === CHECK_DIGIT_ENCODINGS[i]) {
	            return i;
	        }
	    }
	    return null;
	}
	
	function extensionChecksum(result) {
	    var length = result.length,
	        sum = 0,
	        i;
	
	    for (i = length - 2; i >= 0; i -= 2) {
	        sum += result[i];
	    }
	    sum *= 3;
	    for (i = length - 1; i >= 0; i -= 2) {
	        sum += result[i];
	    }
	    sum *= 3;
	    return sum % 10;
	}
	
	/* harmony default export */ exports["a"] = EAN5Reader;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ean_reader__ = __webpack_require__(5);
	
	
	function EAN8Reader(opts, supplements) {
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_0__ean_reader__["a"].call(this, opts, supplements);
	}
	
	var properties = {
	    FORMAT: { value: "ean_8", writeable: false }
	};
	
	EAN8Reader.prototype = Object.create(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__ean_reader__["a"].prototype, properties);
	EAN8Reader.prototype.constructor = EAN8Reader;
	
	EAN8Reader.prototype._decodePayload = function (code, result, decodedCodes) {
	    var i,
	        self = this;
	
	    for (i = 0; i < 4; i++) {
	        code = self._decodeCode(code.end, self.CODE_G_START);
	        if (!code) {
	            return null;
	        }
	        result.push(code.code);
	        decodedCodes.push(code);
	    }
	
	    code = self._findPattern(self.MIDDLE_PATTERN, code.end, true, false);
	    if (code === null) {
	        return null;
	    }
	    decodedCodes.push(code);
	
	    for (i = 0; i < 4; i++) {
	        code = self._decodeCode(code.end, self.CODE_G_START);
	        if (!code) {
	            return null;
	        }
	        decodedCodes.push(code);
	        result.push(code.code);
	    }
	
	    return code;
	};
	
	/* harmony default export */ exports["a"] = EAN8Reader;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_merge__ = __webpack_require__(7);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_merge___default = __WEBPACK_IMPORTED_MODULE_0_lodash_merge__ && __WEBPACK_IMPORTED_MODULE_0_lodash_merge__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_merge__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_merge__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_lodash_merge___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_lodash_merge___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__barcode_reader__ = __webpack_require__(9);
	
	
	
	
	function I2of5Reader(opts) {
	    opts = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lodash_merge___default.a.bind()(getDefaulConfig(), opts);
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_1__barcode_reader__["a"].call(this, opts);
	    this.barSpaceRatio = [1, 1];
	    if (opts.normalizeBarSpaceWidth) {
	        this.SINGLE_CODE_ERROR = 0.38;
	        this.AVG_CODE_ERROR = 0.09;
	    }
	}
	
	function getDefaulConfig() {
	    var config = {};
	
	    Object.keys(I2of5Reader.CONFIG_KEYS).forEach(function (key) {
	        config[key] = I2of5Reader.CONFIG_KEYS[key].default;
	    });
	    return config;
	}
	
	var N = 1,
	    W = 3,
	    properties = {
	    START_PATTERN: { value: [N, N, N, N] },
	    STOP_PATTERN: { value: [N, N, W] },
	    CODE_PATTERN: { value: [[N, N, W, W, N], [W, N, N, N, W], [N, W, N, N, W], [W, W, N, N, N], [N, N, W, N, W], [W, N, W, N, N], [N, W, W, N, N], [N, N, N, W, W], [W, N, N, W, N], [N, W, N, W, N]] },
	    SINGLE_CODE_ERROR: { value: 0.78, writable: true },
	    AVG_CODE_ERROR: { value: 0.38, writable: true },
	    MAX_CORRECTION_FACTOR: { value: 5 },
	    FORMAT: { value: "i2of5" }
	};
	
	I2of5Reader.prototype = Object.create(/* harmony import */__WEBPACK_IMPORTED_MODULE_1__barcode_reader__["a"].prototype, properties);
	I2of5Reader.prototype.constructor = I2of5Reader;
	
	I2of5Reader.prototype._matchPattern = function (counter, code) {
	    if (this.config.normalizeBarSpaceWidth) {
	        var i,
	            counterSum = [0, 0],
	            codeSum = [0, 0],
	            correction = [0, 0],
	            correctionRatio = this.MAX_CORRECTION_FACTOR,
	            correctionRatioInverse = 1 / correctionRatio;
	
	        for (i = 0; i < counter.length; i++) {
	            counterSum[i % 2] += counter[i];
	            codeSum[i % 2] += code[i];
	        }
	        correction[0] = codeSum[0] / counterSum[0];
	        correction[1] = codeSum[1] / counterSum[1];
	
	        correction[0] = Math.max(Math.min(correction[0], correctionRatio), correctionRatioInverse);
	        correction[1] = Math.max(Math.min(correction[1], correctionRatio), correctionRatioInverse);
	        this.barSpaceRatio = correction;
	        for (i = 0; i < counter.length; i++) {
	            counter[i] *= this.barSpaceRatio[i % 2];
	        }
	    }
	    return /* harmony import */__WEBPACK_IMPORTED_MODULE_1__barcode_reader__["a"].prototype._matchPattern.call(this, counter, code);
	};
	
	I2of5Reader.prototype._findPattern = function (pattern, offset, isWhite, tryHarder) {
	    var counter = [],
	        self = this,
	        i,
	        counterPos = 0,
	        bestMatch = {
	        error: Number.MAX_VALUE,
	        code: -1,
	        start: 0,
	        end: 0
	    },
	        error,
	        j,
	        sum,
	        normalized,
	        epsilon = self.AVG_CODE_ERROR;
	
	    isWhite = isWhite || false;
	    tryHarder = tryHarder || false;
	
	    if (!offset) {
	        offset = self._nextSet(self._row);
	    }
	
	    for (i = 0; i < pattern.length; i++) {
	        counter[i] = 0;
	    }
	
	    for (i = offset; i < self._row.length; i++) {
	        if (self._row[i] ^ isWhite) {
	            counter[counterPos]++;
	        } else {
	            if (counterPos === counter.length - 1) {
	                sum = 0;
	                for (j = 0; j < counter.length; j++) {
	                    sum += counter[j];
	                }
	                error = self._matchPattern(counter, pattern);
	                if (error < epsilon) {
	                    bestMatch.error = error;
	                    bestMatch.start = i - sum;
	                    bestMatch.end = i;
	                    return bestMatch;
	                }
	                if (tryHarder) {
	                    for (j = 0; j < counter.length - 2; j++) {
	                        counter[j] = counter[j + 2];
	                    }
	                    counter[counter.length - 2] = 0;
	                    counter[counter.length - 1] = 0;
	                    counterPos--;
	                } else {
	                    return null;
	                }
	            } else {
	                counterPos++;
	            }
	            counter[counterPos] = 1;
	            isWhite = !isWhite;
	        }
	    }
	    return null;
	};
	
	I2of5Reader.prototype._findStart = function () {
	    var self = this,
	        leadingWhitespaceStart,
	        offset = self._nextSet(self._row),
	        startInfo,
	        narrowBarWidth = 1;
	
	    while (!startInfo) {
	        startInfo = self._findPattern(self.START_PATTERN, offset, false, true);
	        if (!startInfo) {
	            return null;
	        }
	        narrowBarWidth = Math.floor((startInfo.end - startInfo.start) / 4);
	        leadingWhitespaceStart = startInfo.start - narrowBarWidth * 10;
	        if (leadingWhitespaceStart >= 0) {
	            if (self._matchRange(leadingWhitespaceStart, startInfo.start, 0)) {
	                return startInfo;
	            }
	        }
	        offset = startInfo.end;
	        startInfo = null;
	    }
	};
	
	I2of5Reader.prototype._verifyTrailingWhitespace = function (endInfo) {
	    var self = this,
	        trailingWhitespaceEnd;
	
	    trailingWhitespaceEnd = endInfo.end + (endInfo.end - endInfo.start) / 2;
	    if (trailingWhitespaceEnd < self._row.length) {
	        if (self._matchRange(endInfo.end, trailingWhitespaceEnd, 0)) {
	            return endInfo;
	        }
	    }
	    return null;
	};
	
	I2of5Reader.prototype._findEnd = function () {
	    var self = this,
	        endInfo,
	        tmp;
	
	    self._row.reverse();
	    endInfo = self._findPattern(self.STOP_PATTERN);
	    self._row.reverse();
	
	    if (endInfo === null) {
	        return null;
	    }
	
	    // reverse numbers
	    tmp = endInfo.start;
	    endInfo.start = self._row.length - endInfo.end;
	    endInfo.end = self._row.length - tmp;
	
	    return endInfo !== null ? self._verifyTrailingWhitespace(endInfo) : null;
	};
	
	I2of5Reader.prototype._decodePair = function (counterPair) {
	    var i,
	        code,
	        codes = [],
	        self = this;
	
	    for (i = 0; i < counterPair.length; i++) {
	        code = self._decodeCode(counterPair[i]);
	        if (!code) {
	            return null;
	        }
	        codes.push(code);
	    }
	    return codes;
	};
	
	I2of5Reader.prototype._decodeCode = function (counter) {
	    var j,
	        self = this,
	        sum = 0,
	        normalized,
	        error,
	        epsilon = self.AVG_CODE_ERROR,
	        code,
	        bestMatch = {
	        error: Number.MAX_VALUE,
	        code: -1,
	        start: 0,
	        end: 0
	    };
	
	    for (j = 0; j < counter.length; j++) {
	        sum += counter[j];
	    }
	    for (code = 0; code < self.CODE_PATTERN.length; code++) {
	        error = self._matchPattern(counter, self.CODE_PATTERN[code]);
	        if (error < bestMatch.error) {
	            bestMatch.code = code;
	            bestMatch.error = error;
	        }
	    }
	    if (bestMatch.error < epsilon) {
	        return bestMatch;
	    }
	};
	
	I2of5Reader.prototype._decodePayload = function (counters, result, decodedCodes) {
	    var i,
	        self = this,
	        pos = 0,
	        counterLength = counters.length,
	        counterPair = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
	        codes;
	
	    while (pos < counterLength) {
	        for (i = 0; i < 5; i++) {
	            counterPair[0][i] = counters[pos] * this.barSpaceRatio[0];
	            counterPair[1][i] = counters[pos + 1] * this.barSpaceRatio[1];
	            pos += 2;
	        }
	        codes = self._decodePair(counterPair);
	        if (!codes) {
	            return null;
	        }
	        for (i = 0; i < codes.length; i++) {
	            result.push(codes[i].code + "");
	            decodedCodes.push(codes[i]);
	        }
	    }
	    return codes;
	};
	
	I2of5Reader.prototype._verifyCounterLength = function (counters) {
	    return counters.length % 10 === 0;
	};
	
	I2of5Reader.prototype._decode = function () {
	    var startInfo,
	        endInfo,
	        self = this,
	        code,
	        result = [],
	        decodedCodes = [],
	        counters;
	
	    startInfo = self._findStart();
	    if (!startInfo) {
	        return null;
	    }
	    decodedCodes.push(startInfo);
	
	    endInfo = self._findEnd();
	    if (!endInfo) {
	        return null;
	    }
	
	    counters = self._fillCounters(startInfo.end, endInfo.start, false);
	    if (!self._verifyCounterLength(counters)) {
	        return null;
	    }
	    code = self._decodePayload(counters, result, decodedCodes);
	    if (!code) {
	        return null;
	    }
	    if (result.length % 2 !== 0 || result.length < 6) {
	        return null;
	    }
	
	    decodedCodes.push(endInfo);
	    return {
	        code: result.join(""),
	        start: startInfo.start,
	        end: endInfo.end,
	        startInfo: startInfo,
	        decodedCodes: decodedCodes
	    };
	};
	
	I2of5Reader.CONFIG_KEYS = {
	    normalizeBarSpaceWidth: {
	        'type': 'boolean',
	        'default': false,
	        'description': 'If true, the reader tries to normalize the' + 'width-difference between bars and spaces'
	    }
	};
	
	/* harmony default export */ exports["a"] = I2of5Reader;

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ean_reader__ = __webpack_require__(5);
	
	
	function UPCEReader(opts, supplements) {
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_0__ean_reader__["a"].call(this, opts, supplements);
	}
	
	var properties = {
	    CODE_FREQUENCY: { value: [[56, 52, 50, 49, 44, 38, 35, 42, 41, 37], [7, 11, 13, 14, 19, 25, 28, 21, 22, 26]] },
	    STOP_PATTERN: { value: [1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7] },
	    FORMAT: { value: "upc_e", writeable: false }
	};
	
	UPCEReader.prototype = Object.create(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__ean_reader__["a"].prototype, properties);
	UPCEReader.prototype.constructor = UPCEReader;
	
	UPCEReader.prototype._decodePayload = function (code, result, decodedCodes) {
	    var i,
	        self = this,
	        codeFrequency = 0x0;
	
	    for (i = 0; i < 6; i++) {
	        code = self._decodeCode(code.end);
	        if (!code) {
	            return null;
	        }
	        if (code.code >= self.CODE_G_START) {
	            code.code = code.code - self.CODE_G_START;
	            codeFrequency |= 1 << 5 - i;
	        }
	        result.push(code.code);
	        decodedCodes.push(code);
	    }
	    if (!self._determineParity(codeFrequency, result)) {
	        return null;
	    }
	
	    return code;
	};
	
	UPCEReader.prototype._determineParity = function (codeFrequency, result) {
	    var i, nrSystem;
	
	    for (nrSystem = 0; nrSystem < this.CODE_FREQUENCY.length; nrSystem++) {
	        for (i = 0; i < this.CODE_FREQUENCY[nrSystem].length; i++) {
	            if (codeFrequency === this.CODE_FREQUENCY[nrSystem][i]) {
	                result.unshift(nrSystem);
	                result.push(i);
	                return true;
	            }
	        }
	    }
	    return false;
	};
	
	UPCEReader.prototype._convertToUPCA = function (result) {
	    var upca = [result[0]],
	        lastDigit = result[result.length - 2];
	
	    if (lastDigit <= 2) {
	        upca = upca.concat(result.slice(1, 3)).concat([lastDigit, 0, 0, 0, 0]).concat(result.slice(3, 6));
	    } else if (lastDigit === 3) {
	        upca = upca.concat(result.slice(1, 4)).concat([0, 0, 0, 0, 0]).concat(result.slice(4, 6));
	    } else if (lastDigit === 4) {
	        upca = upca.concat(result.slice(1, 5)).concat([0, 0, 0, 0, 0, result[5]]);
	    } else {
	        upca = upca.concat(result.slice(1, 6)).concat([0, 0, 0, 0, lastDigit]);
	    }
	
	    upca.push(result[result.length - 1]);
	    return upca;
	};
	
	UPCEReader.prototype._checksum = function (result) {
	    return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__ean_reader__["a"].prototype._checksum.call(this, this._convertToUPCA(result));
	};
	
	UPCEReader.prototype._findEnd = function (offset, isWhite) {
	    isWhite = true;
	    return /* harmony import */__WEBPACK_IMPORTED_MODULE_0__ean_reader__["a"].prototype._findEnd.call(this, offset, isWhite);
	};
	
	UPCEReader.prototype._verifyTrailingWhitespace = function (endInfo) {
	    var self = this,
	        trailingWhitespaceEnd;
	
	    trailingWhitespaceEnd = endInfo.end + (endInfo.end - endInfo.start) / 2;
	    if (trailingWhitespaceEnd < self._row.length) {
	        if (self._matchRange(endInfo.end, trailingWhitespaceEnd, 0)) {
	            return endInfo;
	        }
	    }
	};
	
	/* harmony default export */ exports["a"] = UPCEReader;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ean_reader__ = __webpack_require__(5);
	
	
	function UPCReader(opts, supplements) {
	    /* harmony import */__WEBPACK_IMPORTED_MODULE_0__ean_reader__["a"].call(this, opts, supplements);
	}
	
	var properties = {
	    FORMAT: { value: "upc_a", writeable: false }
	};
	
	UPCReader.prototype = Object.create(/* harmony import */__WEBPACK_IMPORTED_MODULE_0__ean_reader__["a"].prototype, properties);
	UPCReader.prototype.constructor = UPCReader;
	
	UPCReader.prototype._decode = function () {
	    var result = /* harmony import */__WEBPACK_IMPORTED_MODULE_0__ean_reader__["a"].prototype._decode.call(this);
	
	    if (result && result.code && result.code.length === 13 && result.code.charAt(0) === "0") {
	        result.code = result.code.substring(1);
	        return result;
	    }
	    return null;
	};
	
	/* harmony default export */ exports["a"] = UPCReader;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_merge__ = __webpack_require__(7);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_merge___default = __WEBPACK_IMPORTED_MODULE_0_lodash_merge__ && __WEBPACK_IMPORTED_MODULE_0_lodash_merge__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_merge__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_lodash_merge__; }
	/* harmony import */ Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_lodash_merge___default, 'a', { get: __WEBPACK_IMPORTED_MODULE_0_lodash_merge___default });
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_image_wrapper__ = __webpack_require__(26);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__locator_barcode_locator__ = __webpack_require__(81);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__decoder_barcode_decoder__ = __webpack_require__(74);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_events__ = __webpack_require__(70);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__input_camera_access__ = __webpack_require__(76);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_image_debug__ = __webpack_require__(8);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__analytics_result_collector__ = __webpack_require__(36);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__config_config__ = __webpack_require__(37);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_input_stream__ = __webpack_require__(80);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_frame_grabber__ = __webpack_require__(78);
	
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	
	
	
	
	
	
	
	
	
	
	
	var vec2 = {
	    clone: __webpack_require__(10)
	};
	
	function createScanner() {
	    var _inputStream,
	        _framegrabber,
	        _stopped,
	        _canvasContainer = {
	        ctx: {
	            image: null,
	            overlay: null
	        },
	        dom: {
	            image: null,
	            overlay: null
	        }
	    },
	        _inputImageWrapper,
	        _boxSize,
	        _decoder,
	        _workerPool = [],
	        _onUIThread = true,
	        _resultCollector,
	        _config = {},
	        _events = /* harmony import */__WEBPACK_IMPORTED_MODULE_4__common_events__["a"].bind()(),
	        _locator;
	
	    function initializeData(imageWrapper) {
	        initBuffers(imageWrapper);
	        _decoder = /* harmony import */__WEBPACK_IMPORTED_MODULE_3__decoder_barcode_decoder__["a"].create(_config.decoder, _inputImageWrapper);
	    }
	
	    function initInputStream(cb) {
	        var video;
	        if (_config.inputStream.type === "VideoStream") {
	            video = document.createElement("video");
	            _inputStream = /* harmony import */__WEBPACK_IMPORTED_MODULE_9_input_stream__["a"].createVideoStream(video);
	        } else if (_config.inputStream.type === "ImageStream") {
	            _inputStream = /* harmony import */__WEBPACK_IMPORTED_MODULE_9_input_stream__["a"].createImageStream();
	        } else if (_config.inputStream.type === "LiveStream") {
	            var $viewport = getViewPort();
	            if ($viewport) {
	                video = $viewport.querySelector("video");
	                if (!video) {
	                    video = document.createElement("video");
	                    $viewport.appendChild(video);
	                }
	            }
	            _inputStream = /* harmony import */__WEBPACK_IMPORTED_MODULE_9_input_stream__["a"].createLiveStream(video);
	            /* harmony import */__WEBPACK_IMPORTED_MODULE_5__input_camera_access__["a"].request(video, _config.inputStream.constraints).then(function () {
	                _inputStream.trigger("canrecord");
	            }).catch(function (err) {
	                return cb(err);
	            });
	        }
	
	        _inputStream.setAttribute("preload", "auto");
	        _inputStream.setInputStream(_config.inputStream);
	        _inputStream.addEventListener("canrecord", canRecord.bind(undefined, cb));
	    }
	
	    function getViewPort() {
	        var target = _config.inputStream.target;
	        // Check if target is already a DOM element
	        if (target && target.nodeName && target.nodeType === 1) {
	            return target;
	        } else {
	            // Use '#interactive.viewport' as a fallback selector (backwards compatibility)
	            var selector = typeof target === 'string' ? target : '#interactive.viewport';
	            return document.querySelector(selector);
	        }
	    }
	
	    function canRecord(cb) {
	        /* harmony import */__WEBPACK_IMPORTED_MODULE_2__locator_barcode_locator__["a"].bind()(_inputStream, _config.locator);
	        initCanvas(_config);
	        _framegrabber = /* harmony import */__WEBPACK_IMPORTED_MODULE_10_frame_grabber__["a"].create(_inputStream, _canvasContainer.dom.image);
	
	        adjustWorkerPool(_config.numOfWorkers, function () {
	            if (_config.numOfWorkers === 0) {
	                initializeData();
	            }
	            ready(cb);
	        });
	    }
	
	    function ready(cb) {
	        _inputStream.play();
	        cb();
	    }
	
	    function initCanvas() {
	        if (typeof document !== "undefined") {
	            var $viewport = getViewPort();
	            _canvasContainer.dom.image = document.querySelector("canvas.imgBuffer");
	            if (!_canvasContainer.dom.image) {
	                _canvasContainer.dom.image = document.createElement("canvas");
	                _canvasContainer.dom.image.className = "imgBuffer";
	                if ($viewport && _config.inputStream.type === "ImageStream") {
	                    $viewport.appendChild(_canvasContainer.dom.image);
	                }
	            }
	            _canvasContainer.ctx.image = _canvasContainer.dom.image.getContext("2d");
	            _canvasContainer.dom.image.width = _inputStream.getCanvasSize().x;
	            _canvasContainer.dom.image.height = _inputStream.getCanvasSize().y;
	
	            _canvasContainer.dom.overlay = document.querySelector("canvas.drawingBuffer");
	            if (!_canvasContainer.dom.overlay) {
	                _canvasContainer.dom.overlay = document.createElement("canvas");
	                _canvasContainer.dom.overlay.className = "drawingBuffer";
	                if ($viewport) {
	                    $viewport.appendChild(_canvasContainer.dom.overlay);
	                }
	            }
	            _canvasContainer.ctx.overlay = _canvasContainer.dom.overlay.getContext("2d");
	            _canvasContainer.dom.overlay.width = _inputStream.getCanvasSize().x;
	            _canvasContainer.dom.overlay.height = _inputStream.getCanvasSize().y;
	        }
	    }
	
	    function initBuffers(imageWrapper) {
	        if (imageWrapper) {
	            _inputImageWrapper = imageWrapper;
	        } else {
	            _inputImageWrapper = new /* harmony import */__WEBPACK_IMPORTED_MODULE_1__common_image_wrapper__["a"]({
	                x: _inputStream.getWidth(),
	                y: _inputStream.getHeight()
	            });
	        }
	
	        if (true) {
	            console.log(_inputImageWrapper.size);
	        }
	        _boxSize = [vec2.clone([0, 0]), vec2.clone([0, _inputImageWrapper.size.y]), vec2.clone([_inputImageWrapper.size.x, _inputImageWrapper.size.y]), vec2.clone([_inputImageWrapper.size.x, 0])];
	        _locator = /* harmony import */__WEBPACK_IMPORTED_MODULE_2__locator_barcode_locator__["b"].bind()(_inputImageWrapper, _config.locator);
	    }
	
	    function getBoundingBoxes() {
	        if (_config.locate) {
	            return _locator.locate();
	        } else {
	            return [[vec2.clone(_boxSize[0]), vec2.clone(_boxSize[1]), vec2.clone(_boxSize[2]), vec2.clone(_boxSize[3])]];
	        }
	    }
	
	    function transformResult(result) {
	        var topRight = _inputStream.getTopRight(),
	            xOffset = topRight.x,
	            yOffset = topRight.y,
	            i;
	
	        if (xOffset === 0 && yOffset === 0) {
	            return;
	        }
	
	        if (result.barcodes) {
	            for (i = 0; i < result.barcodes.length; i++) {
	                transformResult(result.barcodes[i]);
	            }
	        }
	
	        if (result.line && result.line.length === 2) {
	            moveLine(result.line);
	        }
	
	        if (result.box) {
	            moveBox(result.box);
	        }
	
	        if (result.boxes && result.boxes.length > 0) {
	            for (i = 0; i < result.boxes.length; i++) {
	                moveBox(result.boxes[i]);
	            }
	        }
	
	        function moveBox(box) {
	            var corner = box.length;
	
	            while (corner--) {
	                box[corner][0] += xOffset;
	                box[corner][1] += yOffset;
	            }
	        }
	
	        function moveLine(line) {
	            line[0].x += xOffset;
	            line[0].y += yOffset;
	            line[1].x += xOffset;
	            line[1].y += yOffset;
	        }
	    }
	
	    function addResult(result, imageData) {
	        if (!imageData || !_resultCollector) {
	            return;
	        }
	
	        if (result.barcodes) {
	            result.barcodes.filter(function (barcode) {
	                return barcode.codeResult;
	            }).forEach(function (barcode) {
	                return addResult(barcode, imageData);
	            });
	        } else if (result.codeResult) {
	            _resultCollector.addResult(imageData, _inputStream.getCanvasSize(), result.codeResult);
	        }
	    }
	
	    function hasCodeResult(result) {
	        return result && (result.barcodes ? result.barcodes.some(function (barcode) {
	            return barcode.codeResult;
	        }) : result.codeResult);
	    }
	
	    function publishResult(result, imageData) {
	        var resultToPublish = result;
	
	        if (result && _onUIThread) {
	            transformResult(result);
	            addResult(result, imageData);
	            resultToPublish = result.barcodes || result;
	        }
	
	        _events.publish("processed", resultToPublish);
	        if (hasCodeResult(result)) {
	            _events.publish("detected", resultToPublish);
	        }
	    }
	
	    function locateAndDecode() {
	        var result, boxes;
	
	        boxes = getBoundingBoxes();
	        if (boxes) {
	            result = _decoder.decodeFromBoundingBoxes(boxes);
	            result = result || {};
	            result.boxes = boxes;
	            publishResult(result, _inputImageWrapper.data);
	        } else {
	            publishResult();
	        }
	    }
	
	    function update() {
	        var availableWorker;
	
	        if (_onUIThread) {
	            if (_workerPool.length > 0) {
	                availableWorker = _workerPool.filter(function (workerThread) {
	                    return !workerThread.busy;
	                })[0];
	                if (availableWorker) {
	                    _framegrabber.attachData(availableWorker.imageData);
	                } else {
	                    return; // all workers are busy
	                }
	            } else {
	                    _framegrabber.attachData(_inputImageWrapper.data);
	                }
	            if (_framegrabber.grab()) {
	                if (availableWorker) {
	                    availableWorker.busy = true;
	                    availableWorker.worker.postMessage({
	                        cmd: 'process',
	                        imageData: availableWorker.imageData
	                    }, [availableWorker.imageData.buffer]);
	                } else {
	                    locateAndDecode();
	                }
	            }
	        } else {
	            locateAndDecode();
	        }
	    }
	
	    function startContinuousUpdate() {
	        var next = null,
	            delay = 1000 / (_config.frequency || 60);
	
	        _stopped = false;
	        (function frame(timestamp) {
	            next = next || timestamp;
	            if (!_stopped) {
	                if (timestamp >= next) {
	                    next += delay;
	                    update();
	                }
	                window.requestAnimFrame(frame);
	            }
	        })(performance.now());
	    }
	
	    function _start() {
	        if (_onUIThread && _config.inputStream.type === "LiveStream") {
	            startContinuousUpdate();
	        } else {
	            update();
	        }
	    }
	
	    function initWorker(cb) {
	        var blobURL,
	            workerThread = {
	            worker: undefined,
	            imageData: new Uint8Array(_inputStream.getWidth() * _inputStream.getHeight()),
	            busy: true
	        };
	
	        blobURL = generateWorkerBlob();
	        workerThread.worker = new Worker(blobURL);
	
	        workerThread.worker.onmessage = function (e) {
	            if (e.data.event === 'initialized') {
	                URL.revokeObjectURL(blobURL);
	                workerThread.busy = false;
	                workerThread.imageData = new Uint8Array(e.data.imageData);
	                if (true) {
	                    console.log("Worker initialized");
	                }
	                return cb(workerThread);
	            } else if (e.data.event === 'processed') {
	                workerThread.imageData = new Uint8Array(e.data.imageData);
	                workerThread.busy = false;
	                publishResult(e.data.result, workerThread.imageData);
	            } else if (e.data.event === 'error') {
	                if (true) {
	                    console.log("Worker error: " + e.data.message);
	                }
	            }
	        };
	
	        workerThread.worker.postMessage({
	            cmd: 'init',
	            size: { x: _inputStream.getWidth(), y: _inputStream.getHeight() },
	            imageData: workerThread.imageData,
	            config: configForWorker(_config)
	        }, [workerThread.imageData.buffer]);
	    }
	
	    function configForWorker(config) {
	        return _extends({}, config, {
	            inputStream: _extends({}, config.inputStream, {
	                target: null
	            })
	        });
	    }
	
	    function workerInterface(factory) {
	        /* eslint-disable no-undef*/
	        if (factory) {
	            var Quagga = factory().default;
	            if (!Quagga) {
	                self.postMessage({ 'event': 'error', message: 'Quagga could not be created' });
	                return;
	            }
	        }
	        var imageWrapper,
	            scanner = Quagga._worker.createScanner();
	
	        self.onmessage = function (e) {
	            if (e.data.cmd === 'init') {
	                var config = e.data.config;
	                config.numOfWorkers = 0;
	                imageWrapper = new Quagga.ImageWrapper({
	                    x: e.data.size.x,
	                    y: e.data.size.y
	                }, new Uint8Array(e.data.imageData));
	                scanner.init(config, ready, imageWrapper);
	                scanner.subscribe("processed", onProcessed);
	            } else if (e.data.cmd === 'process') {
	                imageWrapper.data = new Uint8Array(e.data.imageData);
	                scanner.start();
	            }
	        };
	
	        function onProcessed(result) {
	            self.postMessage({
	                'event': 'processed',
	                imageData: imageWrapper.data,
	                result: result
	            }, [imageWrapper.data.buffer]);
	        }
	
	        function ready() {
	            // eslint-disable-line
	            self.postMessage({ 'event': 'initialized', imageData: imageWrapper.data }, [imageWrapper.data.buffer]);
	        }
	
	        /* eslint-enable */
	    }
	
	    function generateWorkerBlob() {
	        var blob, factorySource;
	
	        /* jshint ignore:start */
	        if (typeof __factorySource__ !== 'undefined') {
	            factorySource = __factorySource__; // eslint-disable-line no-undef
	        }
	        /* jshint ignore:end */
	
	        blob = new Blob(['(' + workerInterface.toString() + ')(' + factorySource + ');'], { type: 'text/javascript' });
	
	        return window.URL.createObjectURL(blob);
	    }
	
	    function setReaders(readers) {
	        if (_decoder) {
	            _decoder.setReaders(readers);
	        } else if (_onUIThread && _workerPool.length > 0) {
	            _workerPool.forEach(function (workerThread) {
	                workerThread.worker.postMessage({ cmd: 'setReaders', readers: readers });
	            });
	        }
	    }
	
	    function adjustWorkerPool(capacity, cb) {
	        var increaseBy = capacity - _workerPool.length;
	        if (increaseBy === 0) {
	            return cb && cb();
	        }
	        if (increaseBy < 0) {
	            var workersToTerminate = _workerPool.slice(increaseBy);
	            workersToTerminate.forEach(function (workerThread) {
	                workerThread.worker.terminate();
	                if (true) {
	                    console.log("Worker terminated!");
	                }
	            });
	            _workerPool = _workerPool.slice(0, increaseBy);
	            return cb && cb();
	        } else {
	            var workerInitialized = function workerInitialized(workerThread) {
	                _workerPool.push(workerThread);
	                if (_workerPool.length >= capacity) {
	                    cb && cb();
	                }
	            };
	
	            for (var i = 0; i < increaseBy; i++) {
	                initWorker(workerInitialized);
	            }
	        }
	    }
	
	    return {
	        init: function init(config, cb, imageWrapper) {
	            _config = /* harmony import */__WEBPACK_IMPORTED_MODULE_0_lodash_merge___default.a.bind()({}, /* harmony import */__WEBPACK_IMPORTED_MODULE_8__config_config__["a"], config);
	
	            if (imageWrapper) {
	                _onUIThread = false;
	                initializeData(imageWrapper);
	                return cb();
	            } else {
	                initInputStream(cb);
	            }
	        },
	        start: function start() {
	            _start();
	        },
	        stop: function stop() {
	            _stopped = true;
	            adjustWorkerPool(0);
	            if (_config.inputStream.type === "LiveStream") {
	                /* harmony import */__WEBPACK_IMPORTED_MODULE_5__input_camera_access__["a"].release();
	                _inputStream.clearEventHandlers();
	            }
	        },
	        pause: function pause() {
	            _stopped = true;
	        },
	        subscribe: function subscribe(eventName, callback) {
	            _events.subscribe(eventName, callback);
	        },
	        unsubscribe: function unsubscribe(eventName, callback) {
	            _events.unsubscribe(eventName, callback);
	        },
	
	        registerResultCollector: function registerResultCollector(resultCollector) {
	            if (resultCollector && typeof resultCollector.addResult === 'function') {
	                _resultCollector = resultCollector;
	            }
	        },
	        decodeSingle: function decodeSingle(config, resultCallback) {
	            var _this = this;
	
	            this.init(config, function () {
	                _events.once("processed", function (result) {
	                    _this.stop();
	                    resultCallback.call(null, result);
	                }, true);
	                _start();
	            });
	        },
	        canvas: _canvasContainer
	    };
	}
	
	/* harmony default export */ exports["a"] = createScanner;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	module.e = copy
	
	/**
	 * Copy the values from one mat2 to another
	 *
	 * @alias mat2.copy
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the source matrix
	 * @returns {mat2} out
	 */
	function copy(out, a) {
	  out[0] = a[0]
	  out[1] = a[1]
	  out[2] = a[2]
	  out[3] = a[3]
	  return out
	}


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	module.e = create
	
	/**
	 * Creates a new identity mat2
	 *
	 * @alias mat2.create
	 * @returns {mat2} a new 2x2 matrix
	 */
	function create() {
	  var out = new Float32Array(4)
	  out[0] = 1
	  out[1] = 0
	  out[2] = 0
	  out[3] = 1
	  return out
	}


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	module.e = invert
	
	/**
	 * Inverts a mat2
	 *
	 * @alias mat2.invert
	 * @param {mat2} out the receiving matrix
	 * @param {mat2} a the source matrix
	 * @returns {mat2} out
	 */
	function invert(out, a) {
	  var a0 = a[0]
	  var a1 = a[1]
	  var a2 = a[2]
	  var a3 = a[3]
	  var det = a0 * a3 - a2 * a1
	
	  if (!det) return null
	  det = 1.0 / det
	
	  out[0] =  a3 * det
	  out[1] = -a1 * det
	  out[2] = -a2 * det
	  out[3] =  a0 * det
	
	  return out
	}


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	module.e = scale
	
	/**
	 * Scales a vec2 by a scalar number
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to scale
	 * @param {Number} b amount to scale the vector by
	 * @returns {vec2} out
	 */
	function scale(out, a, b) {
	    out[0] = a[0] * b
	    out[1] = a[1] * b
	    return out
	}

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	module.e = transformMat2
	
	/**
	 * Transforms the vec2 with a mat2
	 *
	 * @param {vec2} out the receiving vector
	 * @param {vec2} a the vector to transform
	 * @param {mat2} m matrix to transform with
	 * @returns {vec2} out
	 */
	function transformMat2(out, a, m) {
	    var x = a[0],
	        y = a[1]
	    out[0] = m[0] * x + m[2] * y
	    out[1] = m[1] * x + m[3] * y
	    return out
	}

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	module.e = clone;
	
	/**
	 * Creates a new vec3 initialized with values from an existing vector
	 *
	 * @param {vec3} a vector to clone
	 * @returns {vec3} a new 3D vector
	 */
	function clone(a) {
	    var out = new Float32Array(3)
	    out[0] = a[0]
	    out[1] = a[1]
	    out[2] = a[2]
	    return out
	}

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(20);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Creates an hash object.
	 *
	 * @private
	 * @constructor
	 * @returns {Object} Returns the new hash object.
	 */
	function Hash() {}
	
	// Avoid inheriting from `Object.prototype` when possible.
	Hash.prototype = nativeCreate ? nativeCreate(null) : objectProto;
	
	module.e = Hash;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var mapClear = __webpack_require__(159),
	    mapDelete = __webpack_require__(160),
	    mapGet = __webpack_require__(161),
	    mapHas = __webpack_require__(162),
	    mapSet = __webpack_require__(163);
	
	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function MapCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = values[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add functions to the `MapCache`.
	MapCache.prototype.clear = mapClear;
	MapCache.prototype['delete'] = mapDelete;
	MapCache.prototype.get = mapGet;
	MapCache.prototype.has = mapHas;
	MapCache.prototype.set = mapSet;
	
	module.e = MapCache;


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(3);
	
	/** Built-in value references. */
	var Reflect = root.Reflect;
	
	module.e = Reflect;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(16),
	    root = __webpack_require__(3);
	
	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');
	
	module.e = Set;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(16),
	    root = __webpack_require__(3);
	
	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');
	
	module.e = WeakMap;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Adds the key-value `pair` to `map`.
	 *
	 * @private
	 * @param {Object} map The map to modify.
	 * @param {Array} pair The key-value pair to add.
	 * @returns {Object} Returns `map`.
	 */
	function addMapEntry(map, pair) {
	  // Don't return `Map#set` because it doesn't return the map instance in IE 11.
	  map.set(pair[0], pair[1]);
	  return map;
	}
	
	module.e = addMapEntry;


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Adds `value` to `set`.
	 *
	 * @private
	 * @param {Object} set The set to modify.
	 * @param {*} value The value to add.
	 * @returns {Object} Returns `set`.
	 */
	function addSetEntry(set, value) {
	  set.add(value);
	  return set;
	}
	
	module.e = addSetEntry;


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {...*} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  var length = args.length;
	  switch (length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}
	
	module.e = apply;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array.length,
	      result = Array(length);
	
	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}
	
	module.e = arrayMap;


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;
	
	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}
	
	module.e = arrayPush;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array.length;
	
	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	module.e = arraySome;


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(29),
	    keys = __webpack_require__(24);
	
	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && copyObject(source, keys(source), object);
	}
	
	module.e = baseAssign;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(14),
	    arrayEach = __webpack_require__(42),
	    assignValue = __webpack_require__(44),
	    baseAssign = __webpack_require__(111),
	    baseForOwn = __webpack_require__(116),
	    cloneBuffer = __webpack_require__(134),
	    copyArray = __webpack_require__(56),
	    copySymbols = __webpack_require__(141),
	    getTag = __webpack_require__(58),
	    initCloneArray = __webpack_require__(153),
	    initCloneByTag = __webpack_require__(154),
	    initCloneObject = __webpack_require__(155),
	    isArray = __webpack_require__(0),
	    isBuffer = __webpack_require__(174),
	    isHostObject = __webpack_require__(17),
	    isObject = __webpack_require__(2);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] =
	cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
	cloneableTags[dateTag] = cloneableTags[float32Tag] =
	cloneableTags[float64Tag] = cloneableTags[int8Tag] =
	cloneableTags[int16Tag] = cloneableTags[int32Tag] =
	cloneableTags[mapTag] = cloneableTags[numberTag] =
	cloneableTags[objectTag] = cloneableTags[regexpTag] =
	cloneableTags[setTag] = cloneableTags[stringTag] =
	cloneableTags[symbolTag] = cloneableTags[uint8Tag] =
	cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] =
	cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] =
	cloneableTags[weakMapTag] = false;
	
	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @param {boolean} [isFull] Specify a clone including symbols.
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
	  var result;
	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return copyArray(value, result);
	    }
	  } else {
	    var tag = getTag(value),
	        isFunc = tag == funcTag || tag == genTag;
	
	    if (isBuffer(value)) {
	      return cloneBuffer(value, isDeep);
	    }
	    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	      if (isHostObject(value)) {
	        return object ? value : {};
	      }
	      result = initCloneObject(isFunc ? {} : value);
	      if (!isDeep) {
	        result = baseAssign(result, value);
	        return isFull ? copySymbols(value, result) : result;
	      }
	    } else {
	      if (!cloneableTags[tag]) {
	        return object ? value : {};
	      }
	      result = initCloneByTag(value, tag, isDeep);
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new Stack);
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);
	
	  // Recursively populate clone (susceptible to call stack limits).
	  (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
	    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
	  });
	  return (isFull && !isArr) ? copySymbols(value, result) : result;
	}
	
	module.e = baseClone;


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(2);
	
	/** Built-in value references. */
	var objectCreate = Object.create;
	
	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} prototype The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	function baseCreate(proto) {
	  return isObject(proto) ? objectCreate(proto) : {};
	}
	
	module.e = baseCreate;


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(109),
	    isArguments = __webpack_require__(11),
	    isArray = __webpack_require__(0),
	    isArrayLikeObject = __webpack_require__(32);
	
	/**
	 * The base implementation of `_.flatten` with support for restricting flattening.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {number} depth The maximum recursion depth.
	 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, depth, isStrict, result) {
	  result || (result = []);
	
	  var index = -1,
	      length = array.length;
	
	  while (++index < length) {
	    var value = array[index];
	    if (depth > 0 && isArrayLikeObject(value) &&
	        (isStrict || isArray(value) || isArguments(value))) {
	      if (depth > 1) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, depth - 1, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}
	
	module.e = baseFlatten;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(50),
	    keysIn = __webpack_require__(35);
	
	/**
	 * The base implementation of `_.forIn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForIn(object, iteratee) {
	  return object == null ? object : baseFor(object, iteratee, keysIn);
	}
	
	module.e = baseForIn;


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(50),
	    keys = __webpack_require__(24);
	
	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}
	
	module.e = baseForOwn;


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return key in Object(object);
	}
	
	module.e = baseHasIn;


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(14),
	    equalArrays = __webpack_require__(57),
	    equalByTag = __webpack_require__(144),
	    equalObjects = __webpack_require__(145),
	    getTag = __webpack_require__(58),
	    isArray = __webpack_require__(0),
	    isHostObject = __webpack_require__(17),
	    isTypedArray = __webpack_require__(34);
	
	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;
	
	  if (!objIsArr) {
	    objTag = getTag(object);
	    objTag = objTag == argsTag ? objectTag : objTag;
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    othTag = othTag == argsTag ? objectTag : othTag;
	  }
	  var objIsObj = objTag == objectTag && !isHostObject(object),
	      othIsObj = othTag == objectTag && !isHostObject(other),
	      isSameTag = objTag == othTag;
	
	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
	      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
	  }
	  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
	
	    if (objIsWrapped || othIsWrapped) {
	      stack || (stack = new Stack);
	      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, bitmask, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	}
	
	module.e = baseIsEqualDeep;


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(14),
	    baseIsEqual = __webpack_require__(53);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;
	
	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];
	
	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack,
	          result = customizer ? customizer(objValue, srcValue, key, object, source, stack) : undefined;
	
	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}
	
	module.e = baseIsMatch;


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(123),
	    baseMatchesProperty = __webpack_require__(124),
	    identity = __webpack_require__(173),
	    isArray = __webpack_require__(0),
	    property = __webpack_require__(181);
	
	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  var type = typeof value;
	  if (type == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (type == 'object') {
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
	  }
	  return property(value);
	}
	
	module.e = baseIteratee;


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = Object.keys;
	
	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  return nativeKeys(Object(object));
	}
	
	module.e = baseKeys;


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var Reflect = __webpack_require__(102),
	    iteratorToArray = __webpack_require__(158);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Built-in value references. */
	var enumerate = Reflect ? Reflect.enumerate : undefined,
	    propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * The base implementation of `_.keysIn` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  object = object == null ? object : Object(object);
	
	  var result = [];
	  for (var key in object) {
	    result.push(key);
	  }
	  return result;
	}
	
	// Fallback for IE < 9 with es6-shim.
	if (enumerate && !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf')) {
	  baseKeysIn = function(object) {
	    return iteratorToArray(enumerate(object));
	  };
	}
	
	module.e = baseKeysIn;


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(119),
	    getMatchData = __webpack_require__(147);
	
	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    var key = matchData[0][0],
	        value = matchData[0][1];
	
	    return function(object) {
	      if (object == null) {
	        return false;
	      }
	      return object[key] === value &&
	        (value !== undefined || (key in Object(object)));
	    };
	  }
	  return function(object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}
	
	module.e = baseMatches;


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(53),
	    get = __webpack_require__(63),
	    hasIn = __webpack_require__(172);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  return function(object) {
	    var objValue = get(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
	  };
	}
	
	module.e = baseMatchesProperty;


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(14),
	    arrayEach = __webpack_require__(42),
	    assignMergeValue = __webpack_require__(43),
	    baseMergeDeep = __webpack_require__(126),
	    isArray = __webpack_require__(0),
	    isObject = __webpack_require__(2),
	    isTypedArray = __webpack_require__(34),
	    keysIn = __webpack_require__(35);
	
	/**
	 * The base implementation of `_.merge` without support for multiple sources.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Object} [stack] Tracks traversed source values and their merged counterparts.
	 */
	function baseMerge(object, source, srcIndex, customizer, stack) {
	  if (object === source) {
	    return;
	  }
	  var props = (isArray(source) || isTypedArray(source))
	    ? undefined
	    : keysIn(source);
	
	  arrayEach(props || source, function(srcValue, key) {
	    if (props) {
	      key = srcValue;
	      srcValue = source[key];
	    }
	    if (isObject(srcValue)) {
	      stack || (stack = new Stack);
	      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
	    }
	    else {
	      var newValue = customizer
	        ? customizer(object[key], srcValue, (key + ''), object, source, stack)
	        : undefined;
	
	      if (newValue === undefined) {
	        newValue = srcValue;
	      }
	      assignMergeValue(object, key, newValue);
	    }
	  });
	}
	
	module.e = baseMerge;


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var assignMergeValue = __webpack_require__(43),
	    baseClone = __webpack_require__(112),
	    copyArray = __webpack_require__(56),
	    isArguments = __webpack_require__(11),
	    isArray = __webpack_require__(0),
	    isArrayLikeObject = __webpack_require__(32),
	    isFunction = __webpack_require__(12),
	    isObject = __webpack_require__(2),
	    isPlainObject = __webpack_require__(177),
	    isTypedArray = __webpack_require__(34),
	    toPlainObject = __webpack_require__(185);
	
	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {Object} [stack] Tracks traversed source values and their merged counterparts.
	 */
	function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
	  var objValue = object[key],
	      srcValue = source[key],
	      stacked = stack.get(srcValue);
	
	  if (stacked) {
	    assignMergeValue(object, key, stacked);
	    return;
	  }
	  var newValue = customizer
	    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
	    : undefined;
	
	  var isCommon = newValue === undefined;
	
	  if (isCommon) {
	    newValue = srcValue;
	    if (isArray(srcValue) || isTypedArray(srcValue)) {
	      if (isArray(objValue)) {
	        newValue = objValue;
	      }
	      else if (isArrayLikeObject(objValue)) {
	        newValue = copyArray(objValue);
	      }
	      else {
	        isCommon = false;
	        newValue = baseClone(srcValue, !customizer);
	      }
	    }
	    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      if (isArguments(objValue)) {
	        newValue = toPlainObject(objValue);
	      }
	      else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
	        isCommon = false;
	        newValue = baseClone(srcValue, !customizer);
	      }
	      else {
	        newValue = objValue;
	      }
	    }
	    else {
	      isCommon = false;
	    }
	  }
	  stack.set(srcValue, newValue);
	
	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
	  }
	  stack['delete'](srcValue);
	  assignMergeValue(object, key, newValue);
	}
	
	module.e = baseMergeDeep;


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var arrayReduce = __webpack_require__(28);
	
	/**
	 * The base implementation of `_.pick` without support for individual
	 * property names.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} props The property names to pick.
	 * @returns {Object} Returns the new object.
	 */
	function basePick(object, props) {
	  object = Object(object);
	  return arrayReduce(props, function(result, key) {
	    if (key in object) {
	      result[key] = object[key];
	    }
	    return result;
	  }, {});
	}
	
	module.e = basePick;


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var baseForIn = __webpack_require__(115);
	
	/**
	 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {Function} predicate The function invoked per property.
	 * @returns {Object} Returns the new object.
	 */
	function basePickBy(object, predicate) {
	  var result = {};
	  baseForIn(object, function(value, key) {
	    if (predicate(value, key)) {
	      result[key] = value;
	    }
	  });
	  return result;
	}
	
	module.e = basePickBy;


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(51);
	
	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}
	
	module.e = basePropertyDeep;


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;
	
	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = end > length ? length : end;
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : ((end - start) >>> 0);
	  start >>>= 0;
	
	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}
	
	module.e = baseSlice;


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);
	
	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}
	
	module.e = baseTimes;


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(108);
	
	/**
	 * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
	 * of key-value pairs for `object` corresponding to the property names of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the new array of key-value pairs.
	 */
	function baseToPairs(object, props) {
	  return arrayMap(props, function(key) {
	    return [key, object[key]];
	  });
	}
	
	module.e = baseToPairs;


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return (value && value.Object === Object) ? value : null;
	}
	
	module.e = checkGlobal;


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var result = new buffer.constructor(buffer.length);
	  buffer.copy(result);
	  return result;
	}
	
	module.e = cloneBuffer;


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var addMapEntry = __webpack_require__(105),
	    arrayReduce = __webpack_require__(28),
	    mapToArray = __webpack_require__(61);
	
	/**
	 * Creates a clone of `map`.
	 *
	 * @private
	 * @param {Object} map The map to clone.
	 * @returns {Object} Returns the cloned map.
	 */
	function cloneMap(map) {
	  return arrayReduce(mapToArray(map), addMapEntry, new map.constructor);
	}
	
	module.e = cloneMap;


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;
	
	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp(regexp) {
	  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	  result.lastIndex = regexp.lastIndex;
	  return result;
	}
	
	module.e = cloneRegExp;


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var addSetEntry = __webpack_require__(106),
	    arrayReduce = __webpack_require__(28),
	    setToArray = __webpack_require__(62);
	
	/**
	 * Creates a clone of `set`.
	 *
	 * @private
	 * @param {Object} set The set to clone.
	 * @returns {Object} Returns the cloned set.
	 */
	function cloneSet(set) {
	  return arrayReduce(setToArray(set), addSetEntry, new set.constructor);
	}
	
	module.e = cloneSet;


/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(27);
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
	
	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */
	function cloneSymbol(symbol) {
	  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
	}
	
	module.e = cloneSymbol;


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(55);
	
	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}
	
	module.e = cloneTypedArray;


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(44);
	
	/**
	 * This function is like `copyObject` except that it accepts a function to
	 * customize copied values.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObjectWith(source, props, object, customizer) {
	  object || (object = {});
	
	  var index = -1,
	      length = props.length;
	
	  while (++index < length) {
	    var key = props[index];
	
	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : source[key];
	
	    assignValue(object, key, newValue);
	  }
	  return object;
	}
	
	module.e = copyObjectWith;


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(29),
	    getSymbols = __webpack_require__(148);
	
	/**
	 * Copies own symbol properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return copyObject(source, getSymbols(source), object);
	}
	
	module.e = copySymbols;


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	var isIterateeCall = __webpack_require__(156),
	    rest = __webpack_require__(65);
	
	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return rest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;
	
	    customizer = typeof customizer == 'function'
	      ? (length--, customizer)
	      : undefined;
	
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}
	
	module.e = createAssigner;


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Creates a base function for methods like `_.forIn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;
	
	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}
	
	module.e = createBaseFor;


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(27),
	    Uint8Array = __webpack_require__(41),
	    equalArrays = __webpack_require__(57),
	    mapToArray = __webpack_require__(61),
	    setToArray = __webpack_require__(62);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';
	
	var arrayBufferTag = '[object ArrayBuffer]';
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
	  switch (tag) {
	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;
	
	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
	      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
	      return +object == +other;
	
	    case errorTag:
	      return object.name == other.name && object.message == other.message;
	
	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return (object != +object) ? other != +other : object == +other;
	
	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings primitives and string
	      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	      return object == (other + '');
	
	    case mapTag:
	      var convert = mapToArray;
	
	    case setTag:
	      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	      convert || (convert = setToArray);
	
	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      // Recursively compare objects (susceptible to call stack limits).
	      return equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask | UNORDERED_COMPARE_FLAG, stack.set(object, other));
	
	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}
	
	module.e = equalByTag;


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(52),
	    keys = __webpack_require__(24);
	
	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;
	
	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : baseHas(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	
	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];
	
	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;
	
	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  return result;
	}
	
	module.e = equalObjects;


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(54);
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	module.e = getLength;


/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(157),
	    toPairs = __webpack_require__(184);
	
	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = toPairs(object),
	      length = result.length;
	
	  while (length--) {
	    result[length][2] = isStrictComparable(result[length][1]);
	  }
	  return result;
	}
	
	module.e = getMatchData;


/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	/** Built-in value references. */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	
	/**
	 * Creates an array of the own symbol properties of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = getOwnPropertySymbols || function() {
	  return [];
	};
	
	module.e = getSymbols;


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	var baseCastPath = __webpack_require__(49),
	    isArguments = __webpack_require__(11),
	    isArray = __webpack_require__(0),
	    isIndex = __webpack_require__(18),
	    isKey = __webpack_require__(30),
	    isLength = __webpack_require__(23),
	    isString = __webpack_require__(33),
	    last = __webpack_require__(179),
	    parent = __webpack_require__(164);
	
	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  if (object == null) {
	    return false;
	  }
	  var result = hasFunc(object, path);
	  if (!result && !isKey(path)) {
	    path = baseCastPath(path);
	    object = parent(object, path);
	    if (object != null) {
	      path = last(path);
	      result = hasFunc(object, path);
	    }
	  }
	  var length = object ? object.length : undefined;
	  return result || (
	    !!length && isLength(length) && isIndex(path, length) &&
	    (isArray(object) || isString(object) || isArguments(object))
	  );
	}
	
	module.e = hasPath;


/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	var hashHas = __webpack_require__(59);
	
	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(hash, key) {
	  return hashHas(hash, key) && delete hash[key];
	}
	
	module.e = hashDelete;


/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(20);
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(hash, key) {
	  if (nativeCreate) {
	    var result = hash[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(hash, key) ? hash[key] : undefined;
	}
	
	module.e = hashGet;


/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(20);
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function hashSet(hash, key, value) {
	  hash[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	}
	
	module.e = hashSet;


/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = array.constructor(length);
	
	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}
	
	module.e = initCloneArray;


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(55),
	    cloneMap = __webpack_require__(135),
	    cloneRegExp = __webpack_require__(136),
	    cloneSet = __webpack_require__(137),
	    cloneSymbol = __webpack_require__(138),
	    cloneTypedArray = __webpack_require__(139);
	
	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return cloneArrayBuffer(object);
	
	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);
	
	    case float32Tag: case float64Tag:
	    case int8Tag: case int16Tag: case int32Tag:
	    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	      return cloneTypedArray(object, isDeep);
	
	    case mapTag:
	      return cloneMap(object);
	
	    case numberTag:
	    case stringTag:
	      return new Ctor(object);
	
	    case regexpTag:
	      return cloneRegExp(object);
	
	    case setTag:
	      return cloneSet(object);
	
	    case symbolTag:
	      return cloneSymbol(object);
	  }
	}
	
	module.e = initCloneByTag;


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(113),
	    isPrototype = __webpack_require__(31);
	
	/** Built-in value references. */
	var getPrototypeOf = Object.getPrototypeOf;
	
	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !isPrototype(object))
	    ? baseCreate(getPrototypeOf(object))
	    : {};
	}
	
	module.e = initCloneObject;


/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(21),
	    isArrayLike = __webpack_require__(22),
	    isIndex = __webpack_require__(18),
	    isObject = __webpack_require__(2);
	
	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	      ? (isArrayLike(object) && isIndex(index, object.length))
	      : (type == 'string' && index in object)) {
	    return eq(object[index], value);
	  }
	  return false;
	}
	
	module.e = isIterateeCall;


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(2);
	
	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}
	
	module.e = isStrictComparable;


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Converts `iterator` to an array.
	 *
	 * @private
	 * @param {Object} iterator The iterator to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function iteratorToArray(iterator) {
	  var data,
	      result = [];
	
	  while (!(data = iterator.next()).done) {
	    result.push(data.value);
	  }
	  return result;
	}
	
	module.e = iteratorToArray;


/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(100),
	    Map = __webpack_require__(6);
	
	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapClear() {
	  this.__data__ = {
	    'hash': new Hash,
	    'map': Map ? new Map : [],
	    'string': new Hash
	  };
	}
	
	module.e = mapClear;


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(6),
	    assocDelete = __webpack_require__(45),
	    hashDelete = __webpack_require__(150),
	    isKeyable = __webpack_require__(19);
	
	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapDelete(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashDelete(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map['delete'](key) : assocDelete(data.map, key);
	}
	
	module.e = mapDelete;


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(6),
	    assocGet = __webpack_require__(46),
	    hashGet = __webpack_require__(151),
	    isKeyable = __webpack_require__(19);
	
	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapGet(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashGet(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map.get(key) : assocGet(data.map, key);
	}
	
	module.e = mapGet;


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(6),
	    assocHas = __webpack_require__(47),
	    hashHas = __webpack_require__(59),
	    isKeyable = __webpack_require__(19);
	
	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapHas(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashHas(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map.has(key) : assocHas(data.map, key);
	}
	
	module.e = mapHas;


/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(6),
	    assocSet = __webpack_require__(48),
	    hashSet = __webpack_require__(152),
	    isKeyable = __webpack_require__(19);
	
	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache object.
	 */
	function mapSet(key, value) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    hashSet(typeof key == 'string' ? data.string : data.hash, key, value);
	  } else if (Map) {
	    data.map.set(key, value);
	  } else {
	    assocSet(data.map, key, value);
	  }
	  return this;
	}
	
	module.e = mapSet;


/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var baseSlice = __webpack_require__(130),
	    get = __webpack_require__(63);
	
	/**
	 * Gets the parent value at `path` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path to get the parent value of.
	 * @returns {*} Returns the parent value.
	 */
	function parent(object, path) {
	  return path.length == 1 ? object : get(object, baseSlice(path, 0, -1));
	}
	
	module.e = parent;


/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = { 'array': [], 'map': null };
	}
	
	module.e = stackClear;


/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	var assocDelete = __webpack_require__(45);
	
	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      array = data.array;
	
	  return array ? assocDelete(array, key) : data.map['delete'](key);
	}
	
	module.e = stackDelete;


/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	var assocGet = __webpack_require__(46);
	
	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  var data = this.__data__,
	      array = data.array;
	
	  return array ? assocGet(array, key) : data.map.get(key);
	}
	
	module.e = stackGet;


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	var assocHas = __webpack_require__(47);
	
	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  var data = this.__data__,
	      array = data.array;
	
	  return array ? assocHas(array, key) : data.map.has(key);
	}
	
	module.e = stackHas;


/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(101),
	    assocSet = __webpack_require__(48);
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache object.
	 */
	function stackSet(key, value) {
	  var data = this.__data__,
	      array = data.array;
	
	  if (array) {
	    if (array.length < (LARGE_ARRAY_SIZE - 1)) {
	      assocSet(array, key, value);
	    } else {
	      data.array = null;
	      data.map = new MapCache(array);
	    }
	  }
	  var map = data.map;
	  if (map) {
	    map.set(key, value);
	  }
	  return this;
	}
	
	module.e = stackSet;


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(186);
	
	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g;
	
	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;
	
	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	function stringToPath(string) {
	  var result = [];
	  toString(string).replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	}
	
	module.e = stringToPath;


/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var getter = _.constant(object);
	 *
	 * getter() === object;
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}
	
	module.e = constant;


/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	var baseHasIn = __webpack_require__(117),
	    hasPath = __webpack_require__(149);
	
	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': _.create({ 'c': 3 }) }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b.c');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b', 'c']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return hasPath(object, path, baseHasIn);
	}
	
	module.e = hasIn;


/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.e = identity;


/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var constant = __webpack_require__(171),
	    root = __webpack_require__(3);
	
	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};
	
	/** Detect free variable `exports`. */
	var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
	  ? exports
	  : undefined;
	
	/** Detect free variable `module`. */
	var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
	  ? module
	  : undefined;
	
	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = (freeModule && freeModule.exports === freeExports)
	  ? freeExports
	  : undefined;
	
	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;
	
	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = !Buffer ? constant(false) : function(value) {
	  return value instanceof Buffer;
	};
	
	module.e = isBuffer;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(66)(module)))

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(11),
	    isArray = __webpack_require__(0),
	    isArrayLike = __webpack_require__(22),
	    isFunction = __webpack_require__(12),
	    isString = __webpack_require__(33);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Checks if `value` is an empty collection or object. A value is considered
	 * empty if it's an `arguments` object, array, string, or jQuery-like collection
	 * with a length of `0` or has no own enumerable properties.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
	 * @example
	 *
	 * _.isEmpty(null);
	 * // => true
	 *
	 * _.isEmpty(true);
	 * // => true
	 *
	 * _.isEmpty(1);
	 * // => true
	 *
	 * _.isEmpty([1, 2, 3]);
	 * // => false
	 *
	 * _.isEmpty({ 'a': 1 });
	 * // => false
	 */
	function isEmpty(value) {
	  if (isArrayLike(value) &&
	      (isArray(value) || isString(value) ||
	        isFunction(value.splice) || isArguments(value))) {
	    return !value.length;
	  }
	  for (var key in value) {
	    if (hasOwnProperty.call(value, key)) {
	      return false;
	    }
	  }
	  return true;
	}
	
	module.e = isEmpty;


/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(12),
	    isHostObject = __webpack_require__(17),
	    isObjectLike = __webpack_require__(4);
	
	/** Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns). */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	
	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(funcToString.call(value));
	  }
	  return isObjectLike(value) &&
	    (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
	}
	
	module.e = isNative;


/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	var isHostObject = __webpack_require__(17),
	    isObjectLike = __webpack_require__(4);
	
	/** `Object#toString` result references. */
	var objectTag = '[object Object]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;
	
	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var getPrototypeOf = Object.getPrototypeOf;
	
	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) ||
	      objectToString.call(value) != objectTag || isHostObject(value)) {
	    return false;
	  }
	  var proto = getPrototypeOf(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = proto.constructor;
	  return (typeof Ctor == 'function' &&
	    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
	}
	
	module.e = isPlainObject;


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(4);
	
	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}
	
	module.e = isSymbol;


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the last element of `array`.
	 * @example
	 *
	 * _.last([1, 2, 3]);
	 * // => 3
	 */
	function last(array) {
	  var length = array ? array.length : 0;
	  return length ? array[length - 1] : undefined;
	}
	
	module.e = last;


/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	var baseIteratee = __webpack_require__(120),
	    basePickBy = __webpack_require__(128);
	
	/**
	 * The opposite of `_.pickBy`; this method creates an object composed of
	 * the own and inherited enumerable properties of `object` that `predicate`
	 * doesn't return truthy for. The predicate is invoked with two arguments:
	 * (value, key).
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked per property.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': '2', 'c': 3 };
	 *
	 * _.omitBy(object, _.isNumber);
	 * // => { 'b': '2' }
	 */
	function omitBy(object, predicate) {
	  predicate = baseIteratee(predicate);
	  return basePickBy(object, function(value, key) {
	    return !predicate(value, key);
	  });
	}
	
	module.e = omitBy;


/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(54),
	    basePropertyDeep = __webpack_require__(129),
	    isKey = __webpack_require__(30);
	
	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': { 'c': 2 } } },
	 *   { 'a': { 'b': { 'c': 1 } } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b.c'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
	}
	
	module.e = property;


/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	var toNumber = __webpack_require__(183);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;
	
	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This function is loosely based on [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3');
	 * // => 3
	 */
	function toInteger(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  var remainder = value % 1;
	  return value === value ? (remainder ? value - remainder : value) : 0;
	}
	
	module.e = toInteger;


/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(12),
	    isObject = __webpack_require__(2);
	
	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;
	
	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;
	
	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	
	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;
	
	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;
	
	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;
	
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3);
	 * // => 3
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3');
	 * // => 3
	 */
	function toNumber(value) {
	  if (isObject(value)) {
	    var other = isFunction(value.valueOf) ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}
	
	module.e = toNumber;


/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	var baseToPairs = __webpack_require__(132),
	    keys = __webpack_require__(24);
	
	/**
	 * Creates an array of own enumerable key-value pairs for `object` which
	 * can be consumed by `_.fromPairs`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the new array of key-value pairs.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.toPairs(new Foo);
	 * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
	 */
	function toPairs(object) {
	  return baseToPairs(object, keys(object));
	}
	
	module.e = toPairs;


/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(29),
	    keysIn = __webpack_require__(35);
	
	/**
	 * Converts `value` to a plain object flattening inherited enumerable
	 * properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {Object} Returns the converted plain object.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.assign({ 'a': 1 }, new Foo);
	 * // => { 'a': 1, 'b': 2 }
	 *
	 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	 * // => { 'a': 1, 'b': 2, 'c': 3 }
	 */
	function toPlainObject(value) {
	  return copyObject(value, keysIn(value));
	}
	
	module.e = toPlainObject;


/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(27),
	    isSymbol = __webpack_require__(178);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;
	
	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (value == null) {
	    return '';
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}
	
	module.e = toString;


/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	 /* eslint-env node */
	'use strict';
	
	// SDP helpers.
	var SDPUtils = {};
	
	// Generate an alphanumeric identifier for cname or mids.
	// TODO: use UUIDs instead? https://gist.github.com/jed/982883
	SDPUtils.generateIdentifier = function() {
	  return Math.random().toString(36).substr(2, 10);
	};
	
	// The RTCP CNAME used by all peerconnections from the same JS.
	SDPUtils.localCName = SDPUtils.generateIdentifier();
	
	// Splits SDP into lines, dealing with both CRLF and LF.
	SDPUtils.splitLines = function(blob) {
	  return blob.trim().split('\n').map(function(line) {
	    return line.trim();
	  });
	};
	// Splits SDP into sessionpart and mediasections. Ensures CRLF.
	SDPUtils.splitSections = function(blob) {
	  var parts = blob.split('\nm=');
	  return parts.map(function(part, index) {
	    return (index > 0 ? 'm=' + part : part).trim() + '\r\n';
	  });
	};
	
	// Returns lines that start with a certain prefix.
	SDPUtils.matchPrefix = function(blob, prefix) {
	  return SDPUtils.splitLines(blob).filter(function(line) {
	    return line.indexOf(prefix) === 0;
	  });
	};
	
	// Parses an ICE candidate line. Sample input:
	// candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
	// rport 55996"
	SDPUtils.parseCandidate = function(line) {
	  var parts;
	  // Parse both variants.
	  if (line.indexOf('a=candidate:') === 0) {
	    parts = line.substring(12).split(' ');
	  } else {
	    parts = line.substring(10).split(' ');
	  }
	
	  var candidate = {
	    foundation: parts[0],
	    component: parts[1],
	    protocol: parts[2].toLowerCase(),
	    priority: parseInt(parts[3], 10),
	    ip: parts[4],
	    port: parseInt(parts[5], 10),
	    // skip parts[6] == 'typ'
	    type: parts[7]
	  };
	
	  for (var i = 8; i < parts.length; i += 2) {
	    switch (parts[i]) {
	      case 'raddr':
	        candidate.relatedAddress = parts[i + 1];
	        break;
	      case 'rport':
	        candidate.relatedPort = parseInt(parts[i + 1], 10);
	        break;
	      case 'tcptype':
	        candidate.tcpType = parts[i + 1];
	        break;
	      default: // Unknown extensions are silently ignored.
	        break;
	    }
	  }
	  return candidate;
	};
	
	// Translates a candidate object into SDP candidate attribute.
	SDPUtils.writeCandidate = function(candidate) {
	  var sdp = [];
	  sdp.push(candidate.foundation);
	  sdp.push(candidate.component);
	  sdp.push(candidate.protocol.toUpperCase());
	  sdp.push(candidate.priority);
	  sdp.push(candidate.ip);
	  sdp.push(candidate.port);
	
	  var type = candidate.type;
	  sdp.push('typ');
	  sdp.push(type);
	  if (type !== 'host' && candidate.relatedAddress &&
	      candidate.relatedPort) {
	    sdp.push('raddr');
	    sdp.push(candidate.relatedAddress); // was: relAddr
	    sdp.push('rport');
	    sdp.push(candidate.relatedPort); // was: relPort
	  }
	  if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
	    sdp.push('tcptype');
	    sdp.push(candidate.tcpType);
	  }
	  return 'candidate:' + sdp.join(' ');
	};
	
	// Parses an rtpmap line, returns RTCRtpCoddecParameters. Sample input:
	// a=rtpmap:111 opus/48000/2
	SDPUtils.parseRtpMap = function(line) {
	  var parts = line.substr(9).split(' ');
	  var parsed = {
	    payloadType: parseInt(parts.shift(), 10) // was: id
	  };
	
	  parts = parts[0].split('/');
	
	  parsed.name = parts[0];
	  parsed.clockRate = parseInt(parts[1], 10); // was: clockrate
	  // was: channels
	  parsed.numChannels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
	  return parsed;
	};
	
	// Generate an a=rtpmap line from RTCRtpCodecCapability or
	// RTCRtpCodecParameters.
	SDPUtils.writeRtpMap = function(codec) {
	  var pt = codec.payloadType;
	  if (codec.preferredPayloadType !== undefined) {
	    pt = codec.preferredPayloadType;
	  }
	  return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate +
	      (codec.numChannels !== 1 ? '/' + codec.numChannels : '') + '\r\n';
	};
	
	// Parses an a=extmap line (headerextension from RFC 5285). Sample input:
	// a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
	SDPUtils.parseExtmap = function(line) {
	  var parts = line.substr(9).split(' ');
	  return {
	    id: parseInt(parts[0], 10),
	    uri: parts[1]
	  };
	};
	
	// Generates a=extmap line from RTCRtpHeaderExtensionParameters or
	// RTCRtpHeaderExtension.
	SDPUtils.writeExtmap = function(headerExtension) {
	  return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) +
	       ' ' + headerExtension.uri + '\r\n';
	};
	
	// Parses an ftmp line, returns dictionary. Sample input:
	// a=fmtp:96 vbr=on;cng=on
	// Also deals with vbr=on; cng=on
	SDPUtils.parseFmtp = function(line) {
	  var parsed = {};
	  var kv;
	  var parts = line.substr(line.indexOf(' ') + 1).split(';');
	  for (var j = 0; j < parts.length; j++) {
	    kv = parts[j].trim().split('=');
	    parsed[kv[0].trim()] = kv[1];
	  }
	  return parsed;
	};
	
	// Generates an a=ftmp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
	SDPUtils.writeFmtp = function(codec) {
	  var line = '';
	  var pt = codec.payloadType;
	  if (codec.preferredPayloadType !== undefined) {
	    pt = codec.preferredPayloadType;
	  }
	  if (codec.parameters && Object.keys(codec.parameters).length) {
	    var params = [];
	    Object.keys(codec.parameters).forEach(function(param) {
	      params.push(param + '=' + codec.parameters[param]);
	    });
	    line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
	  }
	  return line;
	};
	
	// Parses an rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
	// a=rtcp-fb:98 nack rpsi
	SDPUtils.parseRtcpFb = function(line) {
	  var parts = line.substr(line.indexOf(' ') + 1).split(' ');
	  return {
	    type: parts.shift(),
	    parameter: parts.join(' ')
	  };
	};
	// Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
	SDPUtils.writeRtcpFb = function(codec) {
	  var lines = '';
	  var pt = codec.payloadType;
	  if (codec.preferredPayloadType !== undefined) {
	    pt = codec.preferredPayloadType;
	  }
	  if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
	    // FIXME: special handling for trr-int?
	    codec.rtcpFeedback.forEach(function(fb) {
	      lines += 'a=rtcp-fb:' + pt + ' ' + fb.type +
	      (fb.parameter && fb.parameter.length ? ' ' + fb.parameter : '') +
	          '\r\n';
	    });
	  }
	  return lines;
	};
	
	// Parses an RFC 5576 ssrc media attribute. Sample input:
	// a=ssrc:3735928559 cname:something
	SDPUtils.parseSsrcMedia = function(line) {
	  var sp = line.indexOf(' ');
	  var parts = {
	    ssrc: parseInt(line.substr(7, sp - 7), 10)
	  };
	  var colon = line.indexOf(':', sp);
	  if (colon > -1) {
	    parts.attribute = line.substr(sp + 1, colon - sp - 1);
	    parts.value = line.substr(colon + 1);
	  } else {
	    parts.attribute = line.substr(sp + 1);
	  }
	  return parts;
	};
	
	// Extracts DTLS parameters from SDP media section or sessionpart.
	// FIXME: for consistency with other functions this should only
	//   get the fingerprint line as input. See also getIceParameters.
	SDPUtils.getDtlsParameters = function(mediaSection, sessionpart) {
	  var lines = SDPUtils.splitLines(mediaSection);
	  // Search in session part, too.
	  lines = lines.concat(SDPUtils.splitLines(sessionpart));
	  var fpLine = lines.filter(function(line) {
	    return line.indexOf('a=fingerprint:') === 0;
	  })[0].substr(14);
	  // Note: a=setup line is ignored since we use the 'auto' role.
	  var dtlsParameters = {
	    role: 'auto',
	    fingerprints: [{
	      algorithm: fpLine.split(' ')[0],
	      value: fpLine.split(' ')[1]
	    }]
	  };
	  return dtlsParameters;
	};
	
	// Serializes DTLS parameters to SDP.
	SDPUtils.writeDtlsParameters = function(params, setupType) {
	  var sdp = 'a=setup:' + setupType + '\r\n';
	  params.fingerprints.forEach(function(fp) {
	    sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
	  });
	  return sdp;
	};
	// Parses ICE information from SDP media section or sessionpart.
	// FIXME: for consistency with other functions this should only
	//   get the ice-ufrag and ice-pwd lines as input.
	SDPUtils.getIceParameters = function(mediaSection, sessionpart) {
	  var lines = SDPUtils.splitLines(mediaSection);
	  // Search in session part, too.
	  lines = lines.concat(SDPUtils.splitLines(sessionpart));
	  var iceParameters = {
	    usernameFragment: lines.filter(function(line) {
	      return line.indexOf('a=ice-ufrag:') === 0;
	    })[0].substr(12),
	    password: lines.filter(function(line) {
	      return line.indexOf('a=ice-pwd:') === 0;
	    })[0].substr(10)
	  };
	  return iceParameters;
	};
	
	// Serializes ICE parameters to SDP.
	SDPUtils.writeIceParameters = function(params) {
	  return 'a=ice-ufrag:' + params.usernameFragment + '\r\n' +
	      'a=ice-pwd:' + params.password + '\r\n';
	};
	
	// Parses the SDP media section and returns RTCRtpParameters.
	SDPUtils.parseRtpParameters = function(mediaSection) {
	  var description = {
	    codecs: [],
	    headerExtensions: [],
	    fecMechanisms: [],
	    rtcp: []
	  };
	  var lines = SDPUtils.splitLines(mediaSection);
	  var mline = lines[0].split(' ');
	  for (var i = 3; i < mline.length; i++) { // find all codecs from mline[3..]
	    var pt = mline[i];
	    var rtpmapline = SDPUtils.matchPrefix(
	        mediaSection, 'a=rtpmap:' + pt + ' ')[0];
	    if (rtpmapline) {
	      var codec = SDPUtils.parseRtpMap(rtpmapline);
	      var fmtps = SDPUtils.matchPrefix(
	          mediaSection, 'a=fmtp:' + pt + ' ');
	      // Only the first a=fmtp:<pt> is considered.
	      codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
	      codec.rtcpFeedback = SDPUtils.matchPrefix(
	          mediaSection, 'a=rtcp-fb:' + pt + ' ')
	        .map(SDPUtils.parseRtcpFb);
	      description.codecs.push(codec);
	      // parse FEC mechanisms from rtpmap lines.
	      switch (codec.name.toUpperCase()) {
	        case 'RED':
	        case 'ULPFEC':
	          description.fecMechanisms.push(codec.name.toUpperCase());
	          break;
	        default: // only RED and ULPFEC are recognized as FEC mechanisms.
	          break;
	      }
	    }
	  }
	  SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach(function(line) {
	    description.headerExtensions.push(SDPUtils.parseExtmap(line));
	  });
	  // FIXME: parse rtcp.
	  return description;
	};
	
	// Generates parts of the SDP media section describing the capabilities /
	// parameters.
	SDPUtils.writeRtpDescription = function(kind, caps) {
	  var sdp = '';
	
	  // Build the mline.
	  sdp += 'm=' + kind + ' ';
	  sdp += caps.codecs.length > 0 ? '9' : '0'; // reject if no codecs.
	  sdp += ' UDP/TLS/RTP/SAVPF ';
	  sdp += caps.codecs.map(function(codec) {
	    if (codec.preferredPayloadType !== undefined) {
	      return codec.preferredPayloadType;
	    }
	    return codec.payloadType;
	  }).join(' ') + '\r\n';
	
	  sdp += 'c=IN IP4 0.0.0.0\r\n';
	  sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n';
	
	  // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
	  caps.codecs.forEach(function(codec) {
	    sdp += SDPUtils.writeRtpMap(codec);
	    sdp += SDPUtils.writeFmtp(codec);
	    sdp += SDPUtils.writeRtcpFb(codec);
	  });
	  // FIXME: add headerExtensions, fecMechanismş and rtcp.
	  sdp += 'a=rtcp-mux\r\n';
	  return sdp;
	};
	
	// Parses the SDP media section and returns an array of
	// RTCRtpEncodingParameters.
	SDPUtils.parseRtpEncodingParameters = function(mediaSection) {
	  var encodingParameters = [];
	  var description = SDPUtils.parseRtpParameters(mediaSection);
	  var hasRed = description.fecMechanisms.indexOf('RED') !== -1;
	  var hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1;
	
	  // filter a=ssrc:... cname:, ignore PlanB-msid
	  var ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
	  .map(function(line) {
	    return SDPUtils.parseSsrcMedia(line);
	  })
	  .filter(function(parts) {
	    return parts.attribute === 'cname';
	  });
	  var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
	  var secondarySsrc;
	
	  var flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID')
	  .map(function(line) {
	    var parts = line.split(' ');
	    parts.shift();
	    return parts.map(function(part) {
	      return parseInt(part, 10);
	    });
	  });
	  if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
	    secondarySsrc = flows[0][1];
	  }
	
	  description.codecs.forEach(function(codec) {
	    if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
	      var encParam = {
	        ssrc: primarySsrc,
	        codecPayloadType: parseInt(codec.parameters.apt, 10),
	        rtx: {
	          payloadType: codec.payloadType,
	          ssrc: secondarySsrc
	        }
	      };
	      encodingParameters.push(encParam);
	      if (hasRed) {
	        encParam = JSON.parse(JSON.stringify(encParam));
	        encParam.fec = {
	          ssrc: secondarySsrc,
	          mechanism: hasUlpfec ? 'red+ulpfec' : 'red'
	        };
	        encodingParameters.push(encParam);
	      }
	    }
	  });
	  if (encodingParameters.length === 0 && primarySsrc) {
	    encodingParameters.push({
	      ssrc: primarySsrc
	    });
	  }
	
	  // we support both b=AS and b=TIAS but interpret AS as TIAS.
	  var bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');
	  if (bandwidth.length) {
	    if (bandwidth[0].indexOf('b=TIAS:') === 0) {
	      bandwidth = parseInt(bandwidth[0].substr(7), 10);
	    } else if (bandwidth[0].indexOf('b=AS:') === 0) {
	      bandwidth = parseInt(bandwidth[0].substr(5), 10);
	    }
	    encodingParameters.forEach(function(params) {
	      params.maxBitrate = bandwidth;
	    });
	  }
	  return encodingParameters;
	};
	
	SDPUtils.writeSessionBoilerplate = function() {
	  // FIXME: sess-id should be an NTP timestamp.
	  return 'v=0\r\n' +
	      'o=thisisadapterortc 8169639915646943137 2 IN IP4 127.0.0.1\r\n' +
	      's=-\r\n' +
	      't=0 0\r\n';
	};
	
	SDPUtils.writeMediaSection = function(transceiver, caps, type, stream) {
	  var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);
	
	  // Map ICE parameters (ufrag, pwd) to SDP.
	  sdp += SDPUtils.writeIceParameters(
	      transceiver.iceGatherer.getLocalParameters());
	
	  // Map DTLS parameters to SDP.
	  sdp += SDPUtils.writeDtlsParameters(
	      transceiver.dtlsTransport.getLocalParameters(),
	      type === 'offer' ? 'actpass' : 'active');
	
	  sdp += 'a=mid:' + transceiver.mid + '\r\n';
	
	  if (transceiver.rtpSender && transceiver.rtpReceiver) {
	    sdp += 'a=sendrecv\r\n';
	  } else if (transceiver.rtpSender) {
	    sdp += 'a=sendonly\r\n';
	  } else if (transceiver.rtpReceiver) {
	    sdp += 'a=recvonly\r\n';
	  } else {
	    sdp += 'a=inactive\r\n';
	  }
	
	  // FIXME: for RTX there might be multiple SSRCs. Not implemented in Edge yet.
	  if (transceiver.rtpSender) {
	    var msid = 'msid:' + stream.id + ' ' +
	        transceiver.rtpSender.track.id + '\r\n';
	    sdp += 'a=' + msid;
	    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
	        ' ' + msid;
	  }
	  // FIXME: this should be written by writeRtpDescription.
	  sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
	      ' cname:' + SDPUtils.localCName + '\r\n';
	  return sdp;
	};
	
	// Gets the direction from the mediaSection or the sessionpart.
	SDPUtils.getDirection = function(mediaSection, sessionpart) {
	  // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
	  var lines = SDPUtils.splitLines(mediaSection);
	  for (var i = 0; i < lines.length; i++) {
	    switch (lines[i]) {
	      case 'a=sendrecv':
	      case 'a=sendonly':
	      case 'a=recvonly':
	      case 'a=inactive':
	        return lines[i].substr(2);
	      default:
	        // FIXME: What should happen here?
	    }
	  }
	  if (sessionpart) {
	    return SDPUtils.getDirection(sessionpart);
	  }
	  return 'sendrecv';
	};
	
	// Expose public methods.
	module.e = SDPUtils;


/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	 *
	 *  Use of this source code is governed by a BSD-style license
	 *  that can be found in the LICENSE file in the root of the source
	 *  tree.
	 */
	 /* eslint-env node */
	
	'use strict';
	
	// Shimming starts here.
	(function() {
	  // Utils.
	  var logging = __webpack_require__(1).log;
	  var browserDetails = __webpack_require__(1).browserDetails;
	  // Export to the adapter global object visible in the browser.
	  module.e.browserDetails = browserDetails;
	  module.e.extractVersion = __webpack_require__(1).extractVersion;
	  module.e.disableLog = __webpack_require__(1).disableLog;
	
	  // Uncomment the line below if you want logging to occur, including logging
	  // for the switch statement below. Can also be turned on in the browser via
	  // adapter.disableLog(false), but then logging from the switch statement below
	  // will not appear.
	  // require('./utils').disableLog(false);
	
	  // Browser shims.
	  var chromeShim = __webpack_require__(189) || null;
	  var edgeShim = __webpack_require__(191) || null;
	  var firefoxShim = __webpack_require__(193) || null;
	  var safariShim = __webpack_require__(195) || null;
	
	  // Shim browser if found.
	  switch (browserDetails.browser) {
	    case 'opera': // fallthrough as it uses chrome shims
	    case 'chrome':
	      if (!chromeShim || !chromeShim.shimPeerConnection) {
	        logging('Chrome shim is not included in this adapter release.');
	        return;
	      }
	      logging('adapter.js shimming chrome.');
	      // Export to the adapter global object visible in the browser.
	      module.e.browserShim = chromeShim;
	
	      chromeShim.shimGetUserMedia();
	      chromeShim.shimMediaStream();
	      chromeShim.shimSourceObject();
	      chromeShim.shimPeerConnection();
	      chromeShim.shimOnTrack();
	      break;
	    case 'firefox':
	      if (!firefoxShim || !firefoxShim.shimPeerConnection) {
	        logging('Firefox shim is not included in this adapter release.');
	        return;
	      }
	      logging('adapter.js shimming firefox.');
	      // Export to the adapter global object visible in the browser.
	      module.e.browserShim = firefoxShim;
	
	      firefoxShim.shimGetUserMedia();
	      firefoxShim.shimSourceObject();
	      firefoxShim.shimPeerConnection();
	      firefoxShim.shimOnTrack();
	      break;
	    case 'edge':
	      if (!edgeShim || !edgeShim.shimPeerConnection) {
	        logging('MS edge shim is not included in this adapter release.');
	        return;
	      }
	      logging('adapter.js shimming edge.');
	      // Export to the adapter global object visible in the browser.
	      module.e.browserShim = edgeShim;
	
	      edgeShim.shimGetUserMedia();
	      edgeShim.shimPeerConnection();
	      break;
	    case 'safari':
	      if (!safariShim) {
	        logging('Safari shim is not included in this adapter release.');
	        return;
	      }
	      logging('adapter.js shimming safari.');
	      // Export to the adapter global object visible in the browser.
	      module.e.browserShim = safariShim;
	
	      safariShim.shimGetUserMedia();
	      break;
	    default:
	      logging('Unsupported browser!');
	  }
	})();


/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	
	/*
	 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	 *
	 *  Use of this source code is governed by a BSD-style license
	 *  that can be found in the LICENSE file in the root of the source
	 *  tree.
	 */
	 /* eslint-env node */
	'use strict';
	var logging = __webpack_require__(1).log;
	var browserDetails = __webpack_require__(1).browserDetails;
	
	var chromeShim = {
	  shimMediaStream: function() {
	    window.MediaStream = window.MediaStream || window.webkitMediaStream;
	  },
	
	  shimOnTrack: function() {
	    if (typeof window === 'object' && window.RTCPeerConnection && !('ontrack' in
	        window.RTCPeerConnection.prototype)) {
	      Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
	        get: function() {
	          return this._ontrack;
	        },
	        set: function(f) {
	          var self = this;
	          if (this._ontrack) {
	            this.removeEventListener('track', this._ontrack);
	            this.removeEventListener('addstream', this._ontrackpoly);
	          }
	          this.addEventListener('track', this._ontrack = f);
	          this.addEventListener('addstream', this._ontrackpoly = function(e) {
	            // onaddstream does not fire when a track is added to an existing
	            // stream. But stream.onaddtrack is implemented so we use that.
	            e.stream.addEventListener('addtrack', function(te) {
	              var event = new Event('track');
	              event.track = te.track;
	              event.receiver = {track: te.track};
	              event.streams = [e.stream];
	              self.dispatchEvent(event);
	            });
	            e.stream.getTracks().forEach(function(track) {
	              var event = new Event('track');
	              event.track = track;
	              event.receiver = {track: track};
	              event.streams = [e.stream];
	              this.dispatchEvent(event);
	            }.bind(this));
	          }.bind(this));
	        }
	      });
	    }
	  },
	
	  shimSourceObject: function() {
	    if (typeof window === 'object') {
	      if (window.HTMLMediaElement &&
	        !('srcObject' in window.HTMLMediaElement.prototype)) {
	        // Shim the srcObject property, once, when HTMLMediaElement is found.
	        Object.defineProperty(window.HTMLMediaElement.prototype, 'srcObject', {
	          get: function() {
	            return this._srcObject;
	          },
	          set: function(stream) {
	            var self = this;
	            // Use _srcObject as a private property for this shim
	            this._srcObject = stream;
	            if (this.src) {
	              URL.revokeObjectURL(this.src);
	            }
	
	            if (!stream) {
	              this.src = '';
	              return;
	            }
	            this.src = URL.createObjectURL(stream);
	            // We need to recreate the blob url when a track is added or
	            // removed. Doing it manually since we want to avoid a recursion.
	            stream.addEventListener('addtrack', function() {
	              if (self.src) {
	                URL.revokeObjectURL(self.src);
	              }
	              self.src = URL.createObjectURL(stream);
	            });
	            stream.addEventListener('removetrack', function() {
	              if (self.src) {
	                URL.revokeObjectURL(self.src);
	              }
	              self.src = URL.createObjectURL(stream);
	            });
	          }
	        });
	      }
	    }
	  },
	
	  shimPeerConnection: function() {
	    // The RTCPeerConnection object.
	    window.RTCPeerConnection = function(pcConfig, pcConstraints) {
	      // Translate iceTransportPolicy to iceTransports,
	      // see https://code.google.com/p/webrtc/issues/detail?id=4869
	      logging('PeerConnection');
	      if (pcConfig && pcConfig.iceTransportPolicy) {
	        pcConfig.iceTransports = pcConfig.iceTransportPolicy;
	      }
	
	      var pc = new webkitRTCPeerConnection(pcConfig, pcConstraints);
	      var origGetStats = pc.getStats.bind(pc);
	      pc.getStats = function(selector, successCallback, errorCallback) {
	        var self = this;
	        var args = arguments;
	
	        // If selector is a function then we are in the old style stats so just
	        // pass back the original getStats format to avoid breaking old users.
	        if (arguments.length > 0 && typeof selector === 'function') {
	          return origGetStats(selector, successCallback);
	        }
	
	        var fixChromeStats_ = function(response) {
	          var standardReport = {};
	          var reports = response.result();
	          reports.forEach(function(report) {
	            var standardStats = {
	              id: report.id,
	              timestamp: report.timestamp,
	              type: report.type
	            };
	            report.names().forEach(function(name) {
	              standardStats[name] = report.stat(name);
	            });
	            standardReport[standardStats.id] = standardStats;
	          });
	
	          return standardReport;
	        };
	
	        // shim getStats with maplike support
	        var makeMapStats = function(stats, legacyStats) {
	          var map = new Map(Object.keys(stats).map(function(key) {
	            return[key, stats[key]];
	          }));
	          legacyStats = legacyStats || stats;
	          Object.keys(legacyStats).forEach(function(key) {
	            map[key] = legacyStats[key];
	          });
	          return map;
	        };
	
	        if (arguments.length >= 2) {
	          var successCallbackWrapper_ = function(response) {
	            args[1](makeMapStats(fixChromeStats_(response)));
	          };
	
	          return origGetStats.apply(this, [successCallbackWrapper_,
	              arguments[0]]);
	        }
	
	        // promise-support
	        return new Promise(function(resolve, reject) {
	          if (args.length === 1 && typeof selector === 'object') {
	            origGetStats.apply(self, [
	              function(response) {
	                resolve(makeMapStats(fixChromeStats_(response)));
	              }, reject]);
	          } else {
	            // Preserve legacy chrome stats only on legacy access of stats obj
	            origGetStats.apply(self, [
	              function(response) {
	                resolve(makeMapStats(fixChromeStats_(response),
	                    response.result()));
	              }, reject]);
	          }
	        }).then(successCallback, errorCallback);
	      };
	
	      return pc;
	    };
	    window.RTCPeerConnection.prototype = webkitRTCPeerConnection.prototype;
	
	    // wrap static methods. Currently just generateCertificate.
	    if (webkitRTCPeerConnection.generateCertificate) {
	      Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
	        get: function() {
	          return webkitRTCPeerConnection.generateCertificate;
	        }
	      });
	    }
	
	    // add promise support -- natively available in Chrome 51
	    if (browserDetails.version < 51) {
	      ['createOffer', 'createAnswer'].forEach(function(method) {
	        var nativeMethod = webkitRTCPeerConnection.prototype[method];
	        webkitRTCPeerConnection.prototype[method] = function() {
	          var self = this;
	          if (arguments.length < 1 || (arguments.length === 1 &&
	              typeof arguments[0] === 'object')) {
	            var opts = arguments.length === 1 ? arguments[0] : undefined;
	            return new Promise(function(resolve, reject) {
	              nativeMethod.apply(self, [resolve, reject, opts]);
	            });
	          }
	          return nativeMethod.apply(this, arguments);
	        };
	      });
	
	      ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate']
	          .forEach(function(method) {
	            var nativeMethod = webkitRTCPeerConnection.prototype[method];
	            webkitRTCPeerConnection.prototype[method] = function() {
	              var args = arguments;
	              var self = this;
	              var promise = new Promise(function(resolve, reject) {
	                nativeMethod.apply(self, [args[0], resolve, reject]);
	              });
	              if (args.length < 2) {
	                return promise;
	              }
	              return promise.then(function() {
	                args[1].apply(null, []);
	              },
	              function(err) {
	                if (args.length >= 3) {
	                  args[2].apply(null, [err]);
	                }
	              });
	            };
	          });
	    }
	
	    // support for addIceCandidate(null)
	    var nativeAddIceCandidate =
	        RTCPeerConnection.prototype.addIceCandidate;
	    RTCPeerConnection.prototype.addIceCandidate = function() {
	      return arguments[0] === null ? Promise.resolve()
	          : nativeAddIceCandidate.apply(this, arguments);
	    };
	
	    // shim implicit creation of RTCSessionDescription/RTCIceCandidate
	    ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate']
	        .forEach(function(method) {
	          var nativeMethod = webkitRTCPeerConnection.prototype[method];
	          webkitRTCPeerConnection.prototype[method] = function() {
	            arguments[0] = new ((method === 'addIceCandidate') ?
	                RTCIceCandidate : RTCSessionDescription)(arguments[0]);
	            return nativeMethod.apply(this, arguments);
	          };
	        });
	  },
	
	  // Attach a media stream to an element.
	  attachMediaStream: function(element, stream) {
	    logging('DEPRECATED, attachMediaStream will soon be removed.');
	    if (browserDetails.version >= 43) {
	      element.srcObject = stream;
	    } else if (typeof element.src !== 'undefined') {
	      element.src = URL.createObjectURL(stream);
	    } else {
	      logging('Error attaching stream to element.');
	    }
	  },
	
	  reattachMediaStream: function(to, from) {
	    logging('DEPRECATED, reattachMediaStream will soon be removed.');
	    if (browserDetails.version >= 43) {
	      to.srcObject = from.srcObject;
	    } else {
	      to.src = from.src;
	    }
	  }
	};
	
	
	// Expose public methods.
	module.e = {
	  shimMediaStream: chromeShim.shimMediaStream,
	  shimOnTrack: chromeShim.shimOnTrack,
	  shimSourceObject: chromeShim.shimSourceObject,
	  shimPeerConnection: chromeShim.shimPeerConnection,
	  shimGetUserMedia: __webpack_require__(190),
	  attachMediaStream: chromeShim.attachMediaStream,
	  reattachMediaStream: chromeShim.reattachMediaStream
	};


/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	 *
	 *  Use of this source code is governed by a BSD-style license
	 *  that can be found in the LICENSE file in the root of the source
	 *  tree.
	 */
	 /* eslint-env node */
	'use strict';
	var logging = __webpack_require__(1).log;
	
	// Expose public methods.
	module.e = function() {
	  var constraintsToChrome_ = function(c) {
	    if (typeof c !== 'object' || c.mandatory || c.optional) {
	      return c;
	    }
	    var cc = {};
	    Object.keys(c).forEach(function(key) {
	      if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
	        return;
	      }
	      var r = (typeof c[key] === 'object') ? c[key] : {ideal: c[key]};
	      if (r.exact !== undefined && typeof r.exact === 'number') {
	        r.min = r.max = r.exact;
	      }
	      var oldname_ = function(prefix, name) {
	        if (prefix) {
	          return prefix + name.charAt(0).toUpperCase() + name.slice(1);
	        }
	        return (name === 'deviceId') ? 'sourceId' : name;
	      };
	      if (r.ideal !== undefined) {
	        cc.optional = cc.optional || [];
	        var oc = {};
	        if (typeof r.ideal === 'number') {
	          oc[oldname_('min', key)] = r.ideal;
	          cc.optional.push(oc);
	          oc = {};
	          oc[oldname_('max', key)] = r.ideal;
	          cc.optional.push(oc);
	        } else {
	          oc[oldname_('', key)] = r.ideal;
	          cc.optional.push(oc);
	        }
	      }
	      if (r.exact !== undefined && typeof r.exact !== 'number') {
	        cc.mandatory = cc.mandatory || {};
	        cc.mandatory[oldname_('', key)] = r.exact;
	      } else {
	        ['min', 'max'].forEach(function(mix) {
	          if (r[mix] !== undefined) {
	            cc.mandatory = cc.mandatory || {};
	            cc.mandatory[oldname_(mix, key)] = r[mix];
	          }
	        });
	      }
	    });
	    if (c.advanced) {
	      cc.optional = (cc.optional || []).concat(c.advanced);
	    }
	    return cc;
	  };
	
	  var shimConstraints_ = function(constraints, func) {
	    constraints = JSON.parse(JSON.stringify(constraints));
	    if (constraints && constraints.audio) {
	      constraints.audio = constraintsToChrome_(constraints.audio);
	    }
	    if (constraints && typeof constraints.video === 'object') {
	      // Shim facingMode for mobile, where it defaults to "user".
	      var face = constraints.video.facingMode;
	      face = face && ((typeof face === 'object') ? face : {ideal: face});
	
	      if ((face && (face.exact === 'user' || face.exact === 'environment' ||
	                    face.ideal === 'user' || face.ideal === 'environment')) &&
	          !(navigator.mediaDevices.getSupportedConstraints &&
	            navigator.mediaDevices.getSupportedConstraints().facingMode)) {
	        delete constraints.video.facingMode;
	        if (face.exact === 'environment' || face.ideal === 'environment') {
	          // Look for "back" in label, or use last cam (typically back cam).
	          return navigator.mediaDevices.enumerateDevices()
	          .then(function(devices) {
	            devices = devices.filter(function(d) {
	              return d.kind === 'videoinput';
	            });
	            var back = devices.find(function(d) {
	              return d.label.toLowerCase().indexOf('back') !== -1;
	            }) || (devices.length && devices[devices.length - 1]);
	            if (back) {
	              constraints.video.deviceId = face.exact ? {exact: back.deviceId} :
	                                                        {ideal: back.deviceId};
	            }
	            constraints.video = constraintsToChrome_(constraints.video);
	            logging('chrome: ' + JSON.stringify(constraints));
	            return func(constraints);
	          });
	        }
	      }
	      constraints.video = constraintsToChrome_(constraints.video);
	    }
	    logging('chrome: ' + JSON.stringify(constraints));
	    return func(constraints);
	  };
	
	  var shimError_ = function(e) {
	    return {
	      name: {
	        PermissionDeniedError: 'NotAllowedError',
	        ConstraintNotSatisfiedError: 'OverconstrainedError'
	      }[e.name] || e.name,
	      message: e.message,
	      constraint: e.constraintName,
	      toString: function() {
	        return this.name + (this.message && ': ') + this.message;
	      }
	    };
	  };
	
	  var getUserMedia_ = function(constraints, onSuccess, onError) {
	    shimConstraints_(constraints, function(c) {
	      navigator.webkitGetUserMedia(c, onSuccess, function(e) {
	        onError(shimError_(e));
	      });
	    });
	  };
	
	  navigator.getUserMedia = getUserMedia_;
	
	  // Returns the result of getUserMedia as a Promise.
	  var getUserMediaPromise_ = function(constraints) {
	    return new Promise(function(resolve, reject) {
	      navigator.getUserMedia(constraints, resolve, reject);
	    });
	  };
	
	  if (!navigator.mediaDevices) {
	    navigator.mediaDevices = {
	      getUserMedia: getUserMediaPromise_,
	      enumerateDevices: function() {
	        return new Promise(function(resolve) {
	          var kinds = {audio: 'audioinput', video: 'videoinput'};
	          return MediaStreamTrack.getSources(function(devices) {
	            resolve(devices.map(function(device) {
	              return {label: device.label,
	                      kind: kinds[device.kind],
	                      deviceId: device.id,
	                      groupId: ''};
	            }));
	          });
	        });
	      }
	    };
	  }
	
	  // A shim for getUserMedia method on the mediaDevices object.
	  // TODO(KaptenJansson) remove once implemented in Chrome stable.
	  if (!navigator.mediaDevices.getUserMedia) {
	    navigator.mediaDevices.getUserMedia = function(constraints) {
	      return getUserMediaPromise_(constraints);
	    };
	  } else {
	    // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
	    // function which returns a Promise, it does not accept spec-style
	    // constraints.
	    var origGetUserMedia = navigator.mediaDevices.getUserMedia.
	        bind(navigator.mediaDevices);
	    navigator.mediaDevices.getUserMedia = function(cs) {
	      return shimConstraints_(cs, function(c) {
	        return origGetUserMedia(c).catch(function(e) {
	          return Promise.reject(shimError_(e));
	        });
	      });
	    };
	  }
	
	  // Dummy devicechange event methods.
	  // TODO(KaptenJansson) remove once implemented in Chrome stable.
	  if (typeof navigator.mediaDevices.addEventListener === 'undefined') {
	    navigator.mediaDevices.addEventListener = function() {
	      logging('Dummy mediaDevices.addEventListener called.');
	    };
	  }
	  if (typeof navigator.mediaDevices.removeEventListener === 'undefined') {
	    navigator.mediaDevices.removeEventListener = function() {
	      logging('Dummy mediaDevices.removeEventListener called.');
	    };
	  }
	};


/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	 *
	 *  Use of this source code is governed by a BSD-style license
	 *  that can be found in the LICENSE file in the root of the source
	 *  tree.
	 */
	 /* eslint-env node */
	'use strict';
	
	var SDPUtils = __webpack_require__(187);
	var logging = __webpack_require__(1).log;
	
	var edgeShim = {
	  shimPeerConnection: function() {
	    if (window.RTCIceGatherer) {
	      // ORTC defines an RTCIceCandidate object but no constructor.
	      // Not implemented in Edge.
	      if (!window.RTCIceCandidate) {
	        window.RTCIceCandidate = function(args) {
	          return args;
	        };
	      }
	      // ORTC does not have a session description object but
	      // other browsers (i.e. Chrome) that will support both PC and ORTC
	      // in the future might have this defined already.
	      if (!window.RTCSessionDescription) {
	        window.RTCSessionDescription = function(args) {
	          return args;
	        };
	      }
	    }
	
	    window.RTCPeerConnection = function(config) {
	      var self = this;
	
	      var _eventTarget = document.createDocumentFragment();
	      ['addEventListener', 'removeEventListener', 'dispatchEvent']
	          .forEach(function(method) {
	            self[method] = _eventTarget[method].bind(_eventTarget);
	          });
	
	      this.onicecandidate = null;
	      this.onaddstream = null;
	      this.ontrack = null;
	      this.onremovestream = null;
	      this.onsignalingstatechange = null;
	      this.oniceconnectionstatechange = null;
	      this.onnegotiationneeded = null;
	      this.ondatachannel = null;
	
	      this.localStreams = [];
	      this.remoteStreams = [];
	      this.getLocalStreams = function() {
	        return self.localStreams;
	      };
	      this.getRemoteStreams = function() {
	        return self.remoteStreams;
	      };
	
	      this.localDescription = new RTCSessionDescription({
	        type: '',
	        sdp: ''
	      });
	      this.remoteDescription = new RTCSessionDescription({
	        type: '',
	        sdp: ''
	      });
	      this.signalingState = 'stable';
	      this.iceConnectionState = 'new';
	      this.iceGatheringState = 'new';
	
	      this.iceOptions = {
	        gatherPolicy: 'all',
	        iceServers: []
	      };
	      if (config && config.iceTransportPolicy) {
	        switch (config.iceTransportPolicy) {
	          case 'all':
	          case 'relay':
	            this.iceOptions.gatherPolicy = config.iceTransportPolicy;
	            break;
	          case 'none':
	            // FIXME: remove once implementation and spec have added this.
	            throw new TypeError('iceTransportPolicy "none" not supported');
	          default:
	            // don't set iceTransportPolicy.
	            break;
	        }
	      }
	      if (config && config.iceServers) {
	        // Edge does not like
	        // 1) stun:
	        // 2) turn: that does not have all of turn:host:port?transport=udp
	        this.iceOptions.iceServers = config.iceServers.filter(function(server) {
	          if (server && server.urls) {
	            server.urls = server.urls.filter(function(url) {
	              return url.indexOf('turn:') === 0 &&
	                  url.indexOf('transport=udp') !== -1;
	            })[0];
	            return !!server.urls;
	          }
	          return false;
	        });
	      }
	
	      // per-track iceGathers, iceTransports, dtlsTransports, rtpSenders, ...
	      // everything that is needed to describe a SDP m-line.
	      this.transceivers = [];
	
	      // since the iceGatherer is currently created in createOffer but we
	      // must not emit candidates until after setLocalDescription we buffer
	      // them in this array.
	      this._localIceCandidatesBuffer = [];
	    };
	
	    window.RTCPeerConnection.prototype._emitBufferedCandidates = function() {
	      var self = this;
	      var sections = SDPUtils.splitSections(self.localDescription.sdp);
	      // FIXME: need to apply ice candidates in a way which is async but
	      // in-order
	      this._localIceCandidatesBuffer.forEach(function(event) {
	        var end = !event.candidate || Object.keys(event.candidate).length === 0;
	        if (end) {
	          for (var j = 1; j < sections.length; j++) {
	            if (sections[j].indexOf('\r\na=end-of-candidates\r\n') === -1) {
	              sections[j] += 'a=end-of-candidates\r\n';
	            }
	          }
	        } else if (event.candidate.candidate.indexOf('typ endOfCandidates')
	            === -1) {
	          sections[event.candidate.sdpMLineIndex + 1] +=
	              'a=' + event.candidate.candidate + '\r\n';
	        }
	        self.localDescription.sdp = sections.join('');
	        self.dispatchEvent(event);
	        if (self.onicecandidate !== null) {
	          self.onicecandidate(event);
	        }
	        if (!event.candidate && self.iceGatheringState !== 'complete') {
	          var complete = self.transceivers.every(function(transceiver) {
	            return transceiver.iceGatherer &&
	                transceiver.iceGatherer.state === 'completed';
	          });
	          if (complete) {
	            self.iceGatheringState = 'complete';
	          }
	        }
	      });
	      this._localIceCandidatesBuffer = [];
	    };
	
	    window.RTCPeerConnection.prototype.addStream = function(stream) {
	      // Clone is necessary for local demos mostly, attaching directly
	      // to two different senders does not work (build 10547).
	      this.localStreams.push(stream.clone());
	      this._maybeFireNegotiationNeeded();
	    };
	
	    window.RTCPeerConnection.prototype.removeStream = function(stream) {
	      var idx = this.localStreams.indexOf(stream);
	      if (idx > -1) {
	        this.localStreams.splice(idx, 1);
	        this._maybeFireNegotiationNeeded();
	      }
	    };
	
	    window.RTCPeerConnection.prototype.getSenders = function() {
	      return this.transceivers.filter(function(transceiver) {
	        return !!transceiver.rtpSender;
	      })
	      .map(function(transceiver) {
	        return transceiver.rtpSender;
	      });
	    };
	
	    window.RTCPeerConnection.prototype.getReceivers = function() {
	      return this.transceivers.filter(function(transceiver) {
	        return !!transceiver.rtpReceiver;
	      })
	      .map(function(transceiver) {
	        return transceiver.rtpReceiver;
	      });
	    };
	
	    // Determines the intersection of local and remote capabilities.
	    window.RTCPeerConnection.prototype._getCommonCapabilities =
	        function(localCapabilities, remoteCapabilities) {
	          var commonCapabilities = {
	            codecs: [],
	            headerExtensions: [],
	            fecMechanisms: []
	          };
	          localCapabilities.codecs.forEach(function(lCodec) {
	            for (var i = 0; i < remoteCapabilities.codecs.length; i++) {
	              var rCodec = remoteCapabilities.codecs[i];
	              if (lCodec.name.toLowerCase() === rCodec.name.toLowerCase() &&
	                  lCodec.clockRate === rCodec.clockRate &&
	                  lCodec.numChannels === rCodec.numChannels) {
	                // push rCodec so we reply with offerer payload type
	                commonCapabilities.codecs.push(rCodec);
	
	                // FIXME: also need to determine intersection between
	                // .rtcpFeedback and .parameters
	                break;
	              }
	            }
	          });
	
	          localCapabilities.headerExtensions
	              .forEach(function(lHeaderExtension) {
	                for (var i = 0; i < remoteCapabilities.headerExtensions.length;
	                     i++) {
	                  var rHeaderExtension = remoteCapabilities.headerExtensions[i];
	                  if (lHeaderExtension.uri === rHeaderExtension.uri) {
	                    commonCapabilities.headerExtensions.push(rHeaderExtension);
	                    break;
	                  }
	                }
	              });
	
	          // FIXME: fecMechanisms
	          return commonCapabilities;
	        };
	
	    // Create ICE gatherer, ICE transport and DTLS transport.
	    window.RTCPeerConnection.prototype._createIceAndDtlsTransports =
	        function(mid, sdpMLineIndex) {
	          var self = this;
	          var iceGatherer = new RTCIceGatherer(self.iceOptions);
	          var iceTransport = new RTCIceTransport(iceGatherer);
	          iceGatherer.onlocalcandidate = function(evt) {
	            var event = new Event('icecandidate');
	            event.candidate = {sdpMid: mid, sdpMLineIndex: sdpMLineIndex};
	
	            var cand = evt.candidate;
	            var end = !cand || Object.keys(cand).length === 0;
	            // Edge emits an empty object for RTCIceCandidateComplete‥
	            if (end) {
	              // polyfill since RTCIceGatherer.state is not implemented in
	              // Edge 10547 yet.
	              if (iceGatherer.state === undefined) {
	                iceGatherer.state = 'completed';
	              }
	
	              // Emit a candidate with type endOfCandidates to make the samples
	              // work. Edge requires addIceCandidate with this empty candidate
	              // to start checking. The real solution is to signal
	              // end-of-candidates to the other side when getting the null
	              // candidate but some apps (like the samples) don't do that.
	              event.candidate.candidate =
	                  'candidate:1 1 udp 1 0.0.0.0 9 typ endOfCandidates';
	            } else {
	              // RTCIceCandidate doesn't have a component, needs to be added
	              cand.component = iceTransport.component === 'RTCP' ? 2 : 1;
	              event.candidate.candidate = SDPUtils.writeCandidate(cand);
	            }
	
	            var complete = self.transceivers.every(function(transceiver) {
	              return transceiver.iceGatherer &&
	                  transceiver.iceGatherer.state === 'completed';
	            });
	
	            // Emit candidate if localDescription is set.
	            // Also emits null candidate when all gatherers are complete.
	            switch (self.iceGatheringState) {
	              case 'new':
	                self._localIceCandidatesBuffer.push(event);
	                if (end && complete) {
	                  self._localIceCandidatesBuffer.push(
	                      new Event('icecandidate'));
	                }
	                break;
	              case 'gathering':
	                self._emitBufferedCandidates();
	                self.dispatchEvent(event);
	                if (self.onicecandidate !== null) {
	                  self.onicecandidate(event);
	                }
	                if (complete) {
	                  self.dispatchEvent(new Event('icecandidate'));
	                  if (self.onicecandidate !== null) {
	                    self.onicecandidate(new Event('icecandidate'));
	                  }
	                  self.iceGatheringState = 'complete';
	                }
	                break;
	              case 'complete':
	                // should not happen... currently!
	                break;
	              default: // no-op.
	                break;
	            }
	          };
	          iceTransport.onicestatechange = function() {
	            self._updateConnectionState();
	          };
	
	          var dtlsTransport = new RTCDtlsTransport(iceTransport);
	          dtlsTransport.ondtlsstatechange = function() {
	            self._updateConnectionState();
	          };
	          dtlsTransport.onerror = function() {
	            // onerror does not set state to failed by itself.
	            dtlsTransport.state = 'failed';
	            self._updateConnectionState();
	          };
	
	          return {
	            iceGatherer: iceGatherer,
	            iceTransport: iceTransport,
	            dtlsTransport: dtlsTransport
	          };
	        };
	
	    // Start the RTP Sender and Receiver for a transceiver.
	    window.RTCPeerConnection.prototype._transceive = function(transceiver,
	        send, recv) {
	      var params = this._getCommonCapabilities(transceiver.localCapabilities,
	          transceiver.remoteCapabilities);
	      if (send && transceiver.rtpSender) {
	        params.encodings = transceiver.sendEncodingParameters;
	        params.rtcp = {
	          cname: SDPUtils.localCName
	        };
	        if (transceiver.recvEncodingParameters.length) {
	          params.rtcp.ssrc = transceiver.recvEncodingParameters[0].ssrc;
	        }
	        transceiver.rtpSender.send(params);
	      }
	      if (recv && transceiver.rtpReceiver) {
	        params.encodings = transceiver.recvEncodingParameters;
	        params.rtcp = {
	          cname: transceiver.cname
	        };
	        if (transceiver.sendEncodingParameters.length) {
	          params.rtcp.ssrc = transceiver.sendEncodingParameters[0].ssrc;
	        }
	        transceiver.rtpReceiver.receive(params);
	      }
	    };
	
	    window.RTCPeerConnection.prototype.setLocalDescription =
	        function(description) {
	          var self = this;
	          var sections;
	          var sessionpart;
	          if (description.type === 'offer') {
	            // FIXME: What was the purpose of this empty if statement?
	            // if (!this._pendingOffer) {
	            // } else {
	            if (this._pendingOffer) {
	              // VERY limited support for SDP munging. Limited to:
	              // * changing the order of codecs
	              sections = SDPUtils.splitSections(description.sdp);
	              sessionpart = sections.shift();
	              sections.forEach(function(mediaSection, sdpMLineIndex) {
	                var caps = SDPUtils.parseRtpParameters(mediaSection);
	                self._pendingOffer[sdpMLineIndex].localCapabilities = caps;
	              });
	              this.transceivers = this._pendingOffer;
	              delete this._pendingOffer;
	            }
	          } else if (description.type === 'answer') {
	            sections = SDPUtils.splitSections(self.remoteDescription.sdp);
	            sessionpart = sections.shift();
	            var isIceLite = SDPUtils.matchPrefix(sessionpart,
	                'a=ice-lite').length > 0;
	            sections.forEach(function(mediaSection, sdpMLineIndex) {
	              var transceiver = self.transceivers[sdpMLineIndex];
	              var iceGatherer = transceiver.iceGatherer;
	              var iceTransport = transceiver.iceTransport;
	              var dtlsTransport = transceiver.dtlsTransport;
	              var localCapabilities = transceiver.localCapabilities;
	              var remoteCapabilities = transceiver.remoteCapabilities;
	              var rejected = mediaSection.split('\n', 1)[0]
	                  .split(' ', 2)[1] === '0';
	
	              if (!rejected) {
	                var remoteIceParameters = SDPUtils.getIceParameters(
	                    mediaSection, sessionpart);
	                if (isIceLite) {
	                  var cands = SDPUtils.matchPrefix(mediaSection, 'a=candidate:')
	                  .map(function(cand) {
	                    return SDPUtils.parseCandidate(cand);
	                  })
	                  .filter(function(cand) {
	                    return cand.component === '1';
	                  });
	                  // ice-lite only includes host candidates in the SDP so we can
	                  // use setRemoteCandidates (which implies an
	                  // RTCIceCandidateComplete)
	                  iceTransport.setRemoteCandidates(cands);
	                }
	                iceTransport.start(iceGatherer, remoteIceParameters,
	                    isIceLite ? 'controlling' : 'controlled');
	
	                var remoteDtlsParameters = SDPUtils.getDtlsParameters(
	                    mediaSection, sessionpart);
	                if (isIceLite) {
	                  remoteDtlsParameters.role = 'server';
	                }
	                dtlsTransport.start(remoteDtlsParameters);
	
	                // Calculate intersection of capabilities.
	                var params = self._getCommonCapabilities(localCapabilities,
	                    remoteCapabilities);
	
	                // Start the RTCRtpSender. The RTCRtpReceiver for this
	                // transceiver has already been started in setRemoteDescription.
	                self._transceive(transceiver,
	                    params.codecs.length > 0,
	                    false);
	              }
	            });
	          }
	
	          this.localDescription = {
	            type: description.type,
	            sdp: description.sdp
	          };
	          switch (description.type) {
	            case 'offer':
	              this._updateSignalingState('have-local-offer');
	              break;
	            case 'answer':
	              this._updateSignalingState('stable');
	              break;
	            default:
	              throw new TypeError('unsupported type "' + description.type +
	                  '"');
	          }
	
	          // If a success callback was provided, emit ICE candidates after it
	          // has been executed. Otherwise, emit callback after the Promise is
	          // resolved.
	          var hasCallback = arguments.length > 1 &&
	            typeof arguments[1] === 'function';
	          if (hasCallback) {
	            var cb = arguments[1];
	            window.setTimeout(function() {
	              cb();
	              if (self.iceGatheringState === 'new') {
	                self.iceGatheringState = 'gathering';
	              }
	              self._emitBufferedCandidates();
	            }, 0);
	          }
	          var p = Promise.resolve();
	          p.then(function() {
	            if (!hasCallback) {
	              if (self.iceGatheringState === 'new') {
	                self.iceGatheringState = 'gathering';
	              }
	              // Usually candidates will be emitted earlier.
	              window.setTimeout(self._emitBufferedCandidates.bind(self), 500);
	            }
	          });
	          return p;
	        };
	
	    window.RTCPeerConnection.prototype.setRemoteDescription =
	        function(description) {
	          var self = this;
	          var stream = new MediaStream();
	          var receiverList = [];
	          var sections = SDPUtils.splitSections(description.sdp);
	          var sessionpart = sections.shift();
	          var isIceLite = SDPUtils.matchPrefix(sessionpart,
	              'a=ice-lite').length > 0;
	          sections.forEach(function(mediaSection, sdpMLineIndex) {
	            var lines = SDPUtils.splitLines(mediaSection);
	            var mline = lines[0].substr(2).split(' ');
	            var kind = mline[0];
	            var rejected = mline[1] === '0';
	            var direction = SDPUtils.getDirection(mediaSection, sessionpart);
	
	            var transceiver;
	            var iceGatherer;
	            var iceTransport;
	            var dtlsTransport;
	            var rtpSender;
	            var rtpReceiver;
	            var sendEncodingParameters;
	            var recvEncodingParameters;
	            var localCapabilities;
	
	            var track;
	            // FIXME: ensure the mediaSection has rtcp-mux set.
	            var remoteCapabilities = SDPUtils.parseRtpParameters(mediaSection);
	            var remoteIceParameters;
	            var remoteDtlsParameters;
	            if (!rejected) {
	              remoteIceParameters = SDPUtils.getIceParameters(mediaSection,
	                  sessionpart);
	              remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection,
	                  sessionpart);
	              remoteDtlsParameters.role = 'client';
	            }
	            recvEncodingParameters =
	                SDPUtils.parseRtpEncodingParameters(mediaSection);
	
	            var mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:');
	            if (mid.length) {
	              mid = mid[0].substr(6);
	            } else {
	              mid = SDPUtils.generateIdentifier();
	            }
	
	            var cname;
	            // Gets the first SSRC. Note that with RTX there might be multiple
	            // SSRCs.
	            var remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
	                .map(function(line) {
	                  return SDPUtils.parseSsrcMedia(line);
	                })
	                .filter(function(obj) {
	                  return obj.attribute === 'cname';
	                })[0];
	            if (remoteSsrc) {
	              cname = remoteSsrc.value;
	            }
	
	            var isComplete = SDPUtils.matchPrefix(mediaSection,
	                'a=end-of-candidates').length > 0;
	            var cands = SDPUtils.matchPrefix(mediaSection, 'a=candidate:')
	                .map(function(cand) {
	                  return SDPUtils.parseCandidate(cand);
	                })
	                .filter(function(cand) {
	                  return cand.component === '1';
	                });
	            if (description.type === 'offer' && !rejected) {
	              var transports = self._createIceAndDtlsTransports(mid,
	                  sdpMLineIndex);
	              if (isComplete) {
	                transports.iceTransport.setRemoteCandidates(cands);
	              }
	
	              localCapabilities = RTCRtpReceiver.getCapabilities(kind);
	              sendEncodingParameters = [{
	                ssrc: (2 * sdpMLineIndex + 2) * 1001
	              }];
	
	              rtpReceiver = new RTCRtpReceiver(transports.dtlsTransport, kind);
	
	              track = rtpReceiver.track;
	              receiverList.push([track, rtpReceiver]);
	              // FIXME: not correct when there are multiple streams but that is
	              // not currently supported in this shim.
	              stream.addTrack(track);
	
	              // FIXME: look at direction.
	              if (self.localStreams.length > 0 &&
	                  self.localStreams[0].getTracks().length >= sdpMLineIndex) {
	                // FIXME: actually more complicated, needs to match types etc
	                var localtrack = self.localStreams[0]
	                    .getTracks()[sdpMLineIndex];
	                rtpSender = new RTCRtpSender(localtrack,
	                    transports.dtlsTransport);
	              }
	
	              self.transceivers[sdpMLineIndex] = {
	                iceGatherer: transports.iceGatherer,
	                iceTransport: transports.iceTransport,
	                dtlsTransport: transports.dtlsTransport,
	                localCapabilities: localCapabilities,
	                remoteCapabilities: remoteCapabilities,
	                rtpSender: rtpSender,
	                rtpReceiver: rtpReceiver,
	                kind: kind,
	                mid: mid,
	                cname: cname,
	                sendEncodingParameters: sendEncodingParameters,
	                recvEncodingParameters: recvEncodingParameters
	              };
	              // Start the RTCRtpReceiver now. The RTPSender is started in
	              // setLocalDescription.
	              self._transceive(self.transceivers[sdpMLineIndex],
	                  false,
	                  direction === 'sendrecv' || direction === 'sendonly');
	            } else if (description.type === 'answer' && !rejected) {
	              transceiver = self.transceivers[sdpMLineIndex];
	              iceGatherer = transceiver.iceGatherer;
	              iceTransport = transceiver.iceTransport;
	              dtlsTransport = transceiver.dtlsTransport;
	              rtpSender = transceiver.rtpSender;
	              rtpReceiver = transceiver.rtpReceiver;
	              sendEncodingParameters = transceiver.sendEncodingParameters;
	              localCapabilities = transceiver.localCapabilities;
	
	              self.transceivers[sdpMLineIndex].recvEncodingParameters =
	                  recvEncodingParameters;
	              self.transceivers[sdpMLineIndex].remoteCapabilities =
	                  remoteCapabilities;
	              self.transceivers[sdpMLineIndex].cname = cname;
	
	              if (isIceLite || isComplete) {
	                iceTransport.setRemoteCandidates(cands);
	              }
	              iceTransport.start(iceGatherer, remoteIceParameters,
	                  'controlling');
	              dtlsTransport.start(remoteDtlsParameters);
	
	              self._transceive(transceiver,
	                  direction === 'sendrecv' || direction === 'recvonly',
	                  direction === 'sendrecv' || direction === 'sendonly');
	
	              if (rtpReceiver &&
	                  (direction === 'sendrecv' || direction === 'sendonly')) {
	                track = rtpReceiver.track;
	                receiverList.push([track, rtpReceiver]);
	                stream.addTrack(track);
	              } else {
	                // FIXME: actually the receiver should be created later.
	                delete transceiver.rtpReceiver;
	              }
	            }
	          });
	
	          this.remoteDescription = {
	            type: description.type,
	            sdp: description.sdp
	          };
	          switch (description.type) {
	            case 'offer':
	              this._updateSignalingState('have-remote-offer');
	              break;
	            case 'answer':
	              this._updateSignalingState('stable');
	              break;
	            default:
	              throw new TypeError('unsupported type "' + description.type +
	                  '"');
	          }
	          if (stream.getTracks().length) {
	            self.remoteStreams.push(stream);
	            window.setTimeout(function() {
	              var event = new Event('addstream');
	              event.stream = stream;
	              self.dispatchEvent(event);
	              if (self.onaddstream !== null) {
	                window.setTimeout(function() {
	                  self.onaddstream(event);
	                }, 0);
	              }
	
	              receiverList.forEach(function(item) {
	                var track = item[0];
	                var receiver = item[1];
	                var trackEvent = new Event('track');
	                trackEvent.track = track;
	                trackEvent.receiver = receiver;
	                trackEvent.streams = [stream];
	                self.dispatchEvent(event);
	                if (self.ontrack !== null) {
	                  window.setTimeout(function() {
	                    self.ontrack(trackEvent);
	                  }, 0);
	                }
	              });
	            }, 0);
	          }
	          if (arguments.length > 1 && typeof arguments[1] === 'function') {
	            window.setTimeout(arguments[1], 0);
	          }
	          return Promise.resolve();
	        };
	
	    window.RTCPeerConnection.prototype.close = function() {
	      this.transceivers.forEach(function(transceiver) {
	        /* not yet
	        if (transceiver.iceGatherer) {
	          transceiver.iceGatherer.close();
	        }
	        */
	        if (transceiver.iceTransport) {
	          transceiver.iceTransport.stop();
	        }
	        if (transceiver.dtlsTransport) {
	          transceiver.dtlsTransport.stop();
	        }
	        if (transceiver.rtpSender) {
	          transceiver.rtpSender.stop();
	        }
	        if (transceiver.rtpReceiver) {
	          transceiver.rtpReceiver.stop();
	        }
	      });
	      // FIXME: clean up tracks, local streams, remote streams, etc
	      this._updateSignalingState('closed');
	    };
	
	    // Update the signaling state.
	    window.RTCPeerConnection.prototype._updateSignalingState =
	        function(newState) {
	          this.signalingState = newState;
	          var event = new Event('signalingstatechange');
	          this.dispatchEvent(event);
	          if (this.onsignalingstatechange !== null) {
	            this.onsignalingstatechange(event);
	          }
	        };
	
	    // Determine whether to fire the negotiationneeded event.
	    window.RTCPeerConnection.prototype._maybeFireNegotiationNeeded =
	        function() {
	          // Fire away (for now).
	          var event = new Event('negotiationneeded');
	          this.dispatchEvent(event);
	          if (this.onnegotiationneeded !== null) {
	            this.onnegotiationneeded(event);
	          }
	        };
	
	    // Update the connection state.
	    window.RTCPeerConnection.prototype._updateConnectionState = function() {
	      var self = this;
	      var newState;
	      var states = {
	        'new': 0,
	        closed: 0,
	        connecting: 0,
	        checking: 0,
	        connected: 0,
	        completed: 0,
	        failed: 0
	      };
	      this.transceivers.forEach(function(transceiver) {
	        states[transceiver.iceTransport.state]++;
	        states[transceiver.dtlsTransport.state]++;
	      });
	      // ICETransport.completed and connected are the same for this purpose.
	      states.connected += states.completed;
	
	      newState = 'new';
	      if (states.failed > 0) {
	        newState = 'failed';
	      } else if (states.connecting > 0 || states.checking > 0) {
	        newState = 'connecting';
	      } else if (states.disconnected > 0) {
	        newState = 'disconnected';
	      } else if (states.new > 0) {
	        newState = 'new';
	      } else if (states.connected > 0 || states.completed > 0) {
	        newState = 'connected';
	      }
	
	      if (newState !== self.iceConnectionState) {
	        self.iceConnectionState = newState;
	        var event = new Event('iceconnectionstatechange');
	        this.dispatchEvent(event);
	        if (this.oniceconnectionstatechange !== null) {
	          this.oniceconnectionstatechange(event);
	        }
	      }
	    };
	
	    window.RTCPeerConnection.prototype.createOffer = function() {
	      var self = this;
	      if (this._pendingOffer) {
	        throw new Error('createOffer called while there is a pending offer.');
	      }
	      var offerOptions;
	      if (arguments.length === 1 && typeof arguments[0] !== 'function') {
	        offerOptions = arguments[0];
	      } else if (arguments.length === 3) {
	        offerOptions = arguments[2];
	      }
	
	      var tracks = [];
	      var numAudioTracks = 0;
	      var numVideoTracks = 0;
	      // Default to sendrecv.
	      if (this.localStreams.length) {
	        numAudioTracks = this.localStreams[0].getAudioTracks().length;
	        numVideoTracks = this.localStreams[0].getVideoTracks().length;
	      }
	      // Determine number of audio and video tracks we need to send/recv.
	      if (offerOptions) {
	        // Reject Chrome legacy constraints.
	        if (offerOptions.mandatory || offerOptions.optional) {
	          throw new TypeError(
	              'Legacy mandatory/optional constraints not supported.');
	        }
	        if (offerOptions.offerToReceiveAudio !== undefined) {
	          numAudioTracks = offerOptions.offerToReceiveAudio;
	        }
	        if (offerOptions.offerToReceiveVideo !== undefined) {
	          numVideoTracks = offerOptions.offerToReceiveVideo;
	        }
	      }
	      if (this.localStreams.length) {
	        // Push local streams.
	        this.localStreams[0].getTracks().forEach(function(track) {
	          tracks.push({
	            kind: track.kind,
	            track: track,
	            wantReceive: track.kind === 'audio' ?
	                numAudioTracks > 0 : numVideoTracks > 0
	          });
	          if (track.kind === 'audio') {
	            numAudioTracks--;
	          } else if (track.kind === 'video') {
	            numVideoTracks--;
	          }
	        });
	      }
	      // Create M-lines for recvonly streams.
	      while (numAudioTracks > 0 || numVideoTracks > 0) {
	        if (numAudioTracks > 0) {
	          tracks.push({
	            kind: 'audio',
	            wantReceive: true
	          });
	          numAudioTracks--;
	        }
	        if (numVideoTracks > 0) {
	          tracks.push({
	            kind: 'video',
	            wantReceive: true
	          });
	          numVideoTracks--;
	        }
	      }
	
	      var sdp = SDPUtils.writeSessionBoilerplate();
	      var transceivers = [];
	      tracks.forEach(function(mline, sdpMLineIndex) {
	        // For each track, create an ice gatherer, ice transport,
	        // dtls transport, potentially rtpsender and rtpreceiver.
	        var track = mline.track;
	        var kind = mline.kind;
	        var mid = SDPUtils.generateIdentifier();
	
	        var transports = self._createIceAndDtlsTransports(mid, sdpMLineIndex);
	
	        var localCapabilities = RTCRtpSender.getCapabilities(kind);
	        var rtpSender;
	        var rtpReceiver;
	
	        // generate an ssrc now, to be used later in rtpSender.send
	        var sendEncodingParameters = [{
	          ssrc: (2 * sdpMLineIndex + 1) * 1001
	        }];
	        if (track) {
	          rtpSender = new RTCRtpSender(track, transports.dtlsTransport);
	        }
	
	        if (mline.wantReceive) {
	          rtpReceiver = new RTCRtpReceiver(transports.dtlsTransport, kind);
	        }
	
	        transceivers[sdpMLineIndex] = {
	          iceGatherer: transports.iceGatherer,
	          iceTransport: transports.iceTransport,
	          dtlsTransport: transports.dtlsTransport,
	          localCapabilities: localCapabilities,
	          remoteCapabilities: null,
	          rtpSender: rtpSender,
	          rtpReceiver: rtpReceiver,
	          kind: kind,
	          mid: mid,
	          sendEncodingParameters: sendEncodingParameters,
	          recvEncodingParameters: null
	        };
	        var transceiver = transceivers[sdpMLineIndex];
	        sdp += SDPUtils.writeMediaSection(transceiver,
	            transceiver.localCapabilities, 'offer', self.localStreams[0]);
	      });
	
	      this._pendingOffer = transceivers;
	      var desc = new RTCSessionDescription({
	        type: 'offer',
	        sdp: sdp
	      });
	      if (arguments.length && typeof arguments[0] === 'function') {
	        window.setTimeout(arguments[0], 0, desc);
	      }
	      return Promise.resolve(desc);
	    };
	
	    window.RTCPeerConnection.prototype.createAnswer = function() {
	      var self = this;
	
	      var sdp = SDPUtils.writeSessionBoilerplate();
	      this.transceivers.forEach(function(transceiver) {
	        // Calculate intersection of capabilities.
	        var commonCapabilities = self._getCommonCapabilities(
	            transceiver.localCapabilities,
	            transceiver.remoteCapabilities);
	
	        sdp += SDPUtils.writeMediaSection(transceiver, commonCapabilities,
	            'answer', self.localStreams[0]);
	      });
	
	      var desc = new RTCSessionDescription({
	        type: 'answer',
	        sdp: sdp
	      });
	      if (arguments.length && typeof arguments[0] === 'function') {
	        window.setTimeout(arguments[0], 0, desc);
	      }
	      return Promise.resolve(desc);
	    };
	
	    window.RTCPeerConnection.prototype.addIceCandidate = function(candidate) {
	      if (candidate === null) {
	        this.transceivers.forEach(function(transceiver) {
	          transceiver.iceTransport.addIceCandidate({});
	        });
	      } else {
	        var mLineIndex = candidate.sdpMLineIndex;
	        if (candidate.sdpMid) {
	          for (var i = 0; i < this.transceivers.length; i++) {
	            if (this.transceivers[i].mid === candidate.sdpMid) {
	              mLineIndex = i;
	              break;
	            }
	          }
	        }
	        var transceiver = this.transceivers[mLineIndex];
	        if (transceiver) {
	          var cand = Object.keys(candidate.candidate).length > 0 ?
	              SDPUtils.parseCandidate(candidate.candidate) : {};
	          // Ignore Chrome's invalid candidates since Edge does not like them.
	          if (cand.protocol === 'tcp' && cand.port === 0) {
	            return;
	          }
	          // Ignore RTCP candidates, we assume RTCP-MUX.
	          if (cand.component !== '1') {
	            return;
	          }
	          // A dirty hack to make samples work.
	          if (cand.type === 'endOfCandidates') {
	            cand = {};
	          }
	          transceiver.iceTransport.addRemoteCandidate(cand);
	
	          // update the remoteDescription.
	          var sections = SDPUtils.splitSections(this.remoteDescription.sdp);
	          sections[mLineIndex + 1] += (cand.type ? candidate.candidate.trim()
	              : 'a=end-of-candidates') + '\r\n';
	          this.remoteDescription.sdp = sections.join('');
	        }
	      }
	      if (arguments.length > 1 && typeof arguments[1] === 'function') {
	        window.setTimeout(arguments[1], 0);
	      }
	      return Promise.resolve();
	    };
	
	    window.RTCPeerConnection.prototype.getStats = function() {
	      var promises = [];
	      this.transceivers.forEach(function(transceiver) {
	        ['rtpSender', 'rtpReceiver', 'iceGatherer', 'iceTransport',
	            'dtlsTransport'].forEach(function(method) {
	              if (transceiver[method]) {
	                promises.push(transceiver[method].getStats());
	              }
	            });
	      });
	      var cb = arguments.length > 1 && typeof arguments[1] === 'function' &&
	          arguments[1];
	      return new Promise(function(resolve) {
	        // shim getStats with maplike support
	        var results = new Map();
	        Promise.all(promises).then(function(res) {
	          res.forEach(function(result) {
	            Object.keys(result).forEach(function(id) {
	              results.set(id, result[id]);
	              results[id] = result[id];
	            });
	          });
	          if (cb) {
	            window.setTimeout(cb, 0, results);
	          }
	          resolve(results);
	        });
	      });
	    };
	  },
	
	  // Attach a media stream to an element.
	  attachMediaStream: function(element, stream) {
	    logging('DEPRECATED, attachMediaStream will soon be removed.');
	    element.srcObject = stream;
	  },
	
	  reattachMediaStream: function(to, from) {
	    logging('DEPRECATED, reattachMediaStream will soon be removed.');
	    to.srcObject = from.srcObject;
	  }
	};
	
	// Expose public methods.
	module.e = {
	  shimPeerConnection: edgeShim.shimPeerConnection,
	  shimGetUserMedia: __webpack_require__(192),
	  attachMediaStream: edgeShim.attachMediaStream,
	  reattachMediaStream: edgeShim.reattachMediaStream
	};


/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	 *
	 *  Use of this source code is governed by a BSD-style license
	 *  that can be found in the LICENSE file in the root of the source
	 *  tree.
	 */
	 /* eslint-env node */
	'use strict';
	
	// Expose public methods.
	module.e = function() {
	  var shimError_ = function(e) {
	    return {
	      name: {PermissionDeniedError: 'NotAllowedError'}[e.name] || e.name,
	      message: e.message,
	      constraint: e.constraint,
	      toString: function() {
	        return this.name;
	      }
	    };
	  };
	
	  // getUserMedia error shim.
	  var origGetUserMedia = navigator.mediaDevices.getUserMedia.
	      bind(navigator.mediaDevices);
	  navigator.mediaDevices.getUserMedia = function(c) {
	    return origGetUserMedia(c).catch(function(e) {
	      return Promise.reject(shimError_(e));
	    });
	  };
	};


/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	 *
	 *  Use of this source code is governed by a BSD-style license
	 *  that can be found in the LICENSE file in the root of the source
	 *  tree.
	 */
	 /* eslint-env node */
	'use strict';
	
	var logging = __webpack_require__(1).log;
	var browserDetails = __webpack_require__(1).browserDetails;
	
	var firefoxShim = {
	  shimOnTrack: function() {
	    if (typeof window === 'object' && window.RTCPeerConnection && !('ontrack' in
	        window.RTCPeerConnection.prototype)) {
	      Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
	        get: function() {
	          return this._ontrack;
	        },
	        set: function(f) {
	          if (this._ontrack) {
	            this.removeEventListener('track', this._ontrack);
	            this.removeEventListener('addstream', this._ontrackpoly);
	          }
	          this.addEventListener('track', this._ontrack = f);
	          this.addEventListener('addstream', this._ontrackpoly = function(e) {
	            e.stream.getTracks().forEach(function(track) {
	              var event = new Event('track');
	              event.track = track;
	              event.receiver = {track: track};
	              event.streams = [e.stream];
	              this.dispatchEvent(event);
	            }.bind(this));
	          }.bind(this));
	        }
	      });
	    }
	  },
	
	  shimSourceObject: function() {
	    // Firefox has supported mozSrcObject since FF22, unprefixed in 42.
	    if (typeof window === 'object') {
	      if (window.HTMLMediaElement &&
	        !('srcObject' in window.HTMLMediaElement.prototype)) {
	        // Shim the srcObject property, once, when HTMLMediaElement is found.
	        Object.defineProperty(window.HTMLMediaElement.prototype, 'srcObject', {
	          get: function() {
	            return this.mozSrcObject;
	          },
	          set: function(stream) {
	            this.mozSrcObject = stream;
	          }
	        });
	      }
	    }
	  },
	
	  shimPeerConnection: function() {
	    if (typeof window !== 'object' || !(window.RTCPeerConnection ||
	        window.mozRTCPeerConnection)) {
	      return; // probably media.peerconnection.enabled=false in about:config
	    }
	    // The RTCPeerConnection object.
	    if (!window.RTCPeerConnection) {
	      window.RTCPeerConnection = function(pcConfig, pcConstraints) {
	        if (browserDetails.version < 38) {
	          // .urls is not supported in FF < 38.
	          // create RTCIceServers with a single url.
	          if (pcConfig && pcConfig.iceServers) {
	            var newIceServers = [];
	            for (var i = 0; i < pcConfig.iceServers.length; i++) {
	              var server = pcConfig.iceServers[i];
	              if (server.hasOwnProperty('urls')) {
	                for (var j = 0; j < server.urls.length; j++) {
	                  var newServer = {
	                    url: server.urls[j]
	                  };
	                  if (server.urls[j].indexOf('turn') === 0) {
	                    newServer.username = server.username;
	                    newServer.credential = server.credential;
	                  }
	                  newIceServers.push(newServer);
	                }
	              } else {
	                newIceServers.push(pcConfig.iceServers[i]);
	              }
	            }
	            pcConfig.iceServers = newIceServers;
	          }
	        }
	        return new mozRTCPeerConnection(pcConfig, pcConstraints);
	      };
	      window.RTCPeerConnection.prototype = mozRTCPeerConnection.prototype;
	
	      // wrap static methods. Currently just generateCertificate.
	      if (mozRTCPeerConnection.generateCertificate) {
	        Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
	          get: function() {
	            return mozRTCPeerConnection.generateCertificate;
	          }
	        });
	      }
	
	      window.RTCSessionDescription = mozRTCSessionDescription;
	      window.RTCIceCandidate = mozRTCIceCandidate;
	    }
	
	    // shim away need for obsolete RTCIceCandidate/RTCSessionDescription.
	    ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate']
	        .forEach(function(method) {
	          var nativeMethod = RTCPeerConnection.prototype[method];
	          RTCPeerConnection.prototype[method] = function() {
	            arguments[0] = new ((method === 'addIceCandidate') ?
	                RTCIceCandidate : RTCSessionDescription)(arguments[0]);
	            return nativeMethod.apply(this, arguments);
	          };
	        });
	
	    // support for addIceCandidate(null)
	    var nativeAddIceCandidate =
	        RTCPeerConnection.prototype.addIceCandidate;
	    RTCPeerConnection.prototype.addIceCandidate = function() {
	      return arguments[0] === null ? Promise.resolve()
	          : nativeAddIceCandidate.apply(this, arguments);
	    };
	
	    // shim getStats with maplike support
	    var makeMapStats = function(stats) {
	      var map = new Map();
	      Object.keys(stats).forEach(function(key) {
	        map.set(key, stats[key]);
	        map[key] = stats[key];
	      });
	      return map;
	    };
	
	    var nativeGetStats = RTCPeerConnection.prototype.getStats;
	    RTCPeerConnection.prototype.getStats = function(selector, onSucc, onErr) {
	      return nativeGetStats.apply(this, [selector || null])
	        .then(function(stats) {
	          return makeMapStats(stats);
	        })
	        .then(onSucc, onErr);
	    };
	  },
	
	  shimGetUserMedia: function() {
	    // getUserMedia constraints shim.
	    var getUserMedia_ = function(constraints, onSuccess, onError) {
	      var constraintsToFF37_ = function(c) {
	        if (typeof c !== 'object' || c.require) {
	          return c;
	        }
	        var require = [];
	        Object.keys(c).forEach(function(key) {
	          if (key === 'require' || key === 'advanced' ||
	              key === 'mediaSource') {
	            return;
	          }
	          var r = c[key] = (typeof c[key] === 'object') ?
	              c[key] : {ideal: c[key]};
	          if (r.min !== undefined ||
	              r.max !== undefined || r.exact !== undefined) {
	            require.push(key);
	          }
	          if (r.exact !== undefined) {
	            if (typeof r.exact === 'number') {
	              r. min = r.max = r.exact;
	            } else {
	              c[key] = r.exact;
	            }
	            delete r.exact;
	          }
	          if (r.ideal !== undefined) {
	            c.advanced = c.advanced || [];
	            var oc = {};
	            if (typeof r.ideal === 'number') {
	              oc[key] = {min: r.ideal, max: r.ideal};
	            } else {
	              oc[key] = r.ideal;
	            }
	            c.advanced.push(oc);
	            delete r.ideal;
	            if (!Object.keys(r).length) {
	              delete c[key];
	            }
	          }
	        });
	        if (require.length) {
	          c.require = require;
	        }
	        return c;
	      };
	      constraints = JSON.parse(JSON.stringify(constraints));
	      if (browserDetails.version < 38) {
	        logging('spec: ' + JSON.stringify(constraints));
	        if (constraints.audio) {
	          constraints.audio = constraintsToFF37_(constraints.audio);
	        }
	        if (constraints.video) {
	          constraints.video = constraintsToFF37_(constraints.video);
	        }
	        logging('ff37: ' + JSON.stringify(constraints));
	      }
	      return navigator.mozGetUserMedia(constraints, onSuccess, onError);
	    };
	
	    navigator.getUserMedia = getUserMedia_;
	
	    // Returns the result of getUserMedia as a Promise.
	    var getUserMediaPromise_ = function(constraints) {
	      return new Promise(function(resolve, reject) {
	        navigator.getUserMedia(constraints, resolve, reject);
	      });
	    };
	
	    // Shim for mediaDevices on older versions.
	    if (!navigator.mediaDevices) {
	      navigator.mediaDevices = {getUserMedia: getUserMediaPromise_,
	        addEventListener: function() { },
	        removeEventListener: function() { }
	      };
	    }
	    navigator.mediaDevices.enumerateDevices =
	        navigator.mediaDevices.enumerateDevices || function() {
	          return new Promise(function(resolve) {
	            var infos = [
	              {kind: 'audioinput', deviceId: 'default', label: '', groupId: ''},
	              {kind: 'videoinput', deviceId: 'default', label: '', groupId: ''}
	            ];
	            resolve(infos);
	          });
	        };
	
	    if (browserDetails.version < 41) {
	      // Work around http://bugzil.la/1169665
	      var orgEnumerateDevices =
	          navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices);
	      navigator.mediaDevices.enumerateDevices = function() {
	        return orgEnumerateDevices().then(undefined, function(e) {
	          if (e.name === 'NotFoundError') {
	            return [];
	          }
	          throw e;
	        });
	      };
	    }
	  },
	
	  // Attach a media stream to an element.
	  attachMediaStream: function(element, stream) {
	    logging('DEPRECATED, attachMediaStream will soon be removed.');
	    element.srcObject = stream;
	  },
	
	  reattachMediaStream: function(to, from) {
	    logging('DEPRECATED, reattachMediaStream will soon be removed.');
	    to.srcObject = from.srcObject;
	  }
	};
	
	// Expose public methods.
	module.e = {
	  shimOnTrack: firefoxShim.shimOnTrack,
	  shimSourceObject: firefoxShim.shimSourceObject,
	  shimPeerConnection: firefoxShim.shimPeerConnection,
	  shimGetUserMedia: __webpack_require__(194),
	  attachMediaStream: firefoxShim.attachMediaStream,
	  reattachMediaStream: firefoxShim.reattachMediaStream
	};


/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	 *
	 *  Use of this source code is governed by a BSD-style license
	 *  that can be found in the LICENSE file in the root of the source
	 *  tree.
	 */
	 /* eslint-env node */
	'use strict';
	
	var logging = __webpack_require__(1).log;
	var browserDetails = __webpack_require__(1).browserDetails;
	
	// Expose public methods.
	module.e = function() {
	  var shimError_ = function(e) {
	    return {
	      name: {
	        SecurityError: 'NotAllowedError',
	        PermissionDeniedError: 'NotAllowedError'
	      }[e.name] || e.name,
	      message: {
	        'The operation is insecure.': 'The request is not allowed by the ' +
	        'user agent or the platform in the current context.'
	      }[e.message] || e.message,
	      constraint: e.constraint,
	      toString: function() {
	        return this.name + (this.message && ': ') + this.message;
	      }
	    };
	  };
	
	  // getUserMedia constraints shim.
	  var getUserMedia_ = function(constraints, onSuccess, onError) {
	    var constraintsToFF37_ = function(c) {
	      if (typeof c !== 'object' || c.require) {
	        return c;
	      }
	      var require = [];
	      Object.keys(c).forEach(function(key) {
	        if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
	          return;
	        }
	        var r = c[key] = (typeof c[key] === 'object') ?
	            c[key] : {ideal: c[key]};
	        if (r.min !== undefined ||
	            r.max !== undefined || r.exact !== undefined) {
	          require.push(key);
	        }
	        if (r.exact !== undefined) {
	          if (typeof r.exact === 'number') {
	            r. min = r.max = r.exact;
	          } else {
	            c[key] = r.exact;
	          }
	          delete r.exact;
	        }
	        if (r.ideal !== undefined) {
	          c.advanced = c.advanced || [];
	          var oc = {};
	          if (typeof r.ideal === 'number') {
	            oc[key] = {min: r.ideal, max: r.ideal};
	          } else {
	            oc[key] = r.ideal;
	          }
	          c.advanced.push(oc);
	          delete r.ideal;
	          if (!Object.keys(r).length) {
	            delete c[key];
	          }
	        }
	      });
	      if (require.length) {
	        c.require = require;
	      }
	      return c;
	    };
	    constraints = JSON.parse(JSON.stringify(constraints));
	    if (browserDetails.version < 38) {
	      logging('spec: ' + JSON.stringify(constraints));
	      if (constraints.audio) {
	        constraints.audio = constraintsToFF37_(constraints.audio);
	      }
	      if (constraints.video) {
	        constraints.video = constraintsToFF37_(constraints.video);
	      }
	      logging('ff37: ' + JSON.stringify(constraints));
	    }
	    return navigator.mozGetUserMedia(constraints, onSuccess, function(e) {
	      onError(shimError_(e));
	    });
	  };
	
	  navigator.getUserMedia = getUserMedia_;
	
	  // Returns the result of getUserMedia as a Promise.
	  var getUserMediaPromise_ = function(constraints) {
	    return new Promise(function(resolve, reject) {
	      navigator.getUserMedia(constraints, resolve, reject);
	    });
	  };
	
	  // Shim for mediaDevices on older versions.
	  if (!navigator.mediaDevices) {
	    navigator.mediaDevices = {getUserMedia: getUserMediaPromise_,
	      addEventListener: function() { },
	      removeEventListener: function() { }
	    };
	  }
	  navigator.mediaDevices.enumerateDevices =
	      navigator.mediaDevices.enumerateDevices || function() {
	        return new Promise(function(resolve) {
	          var infos = [
	            {kind: 'audioinput', deviceId: 'default', label: '', groupId: ''},
	            {kind: 'videoinput', deviceId: 'default', label: '', groupId: ''}
	          ];
	          resolve(infos);
	        });
	      };
	
	  if (browserDetails.version < 41) {
	    // Work around http://bugzil.la/1169665
	    var orgEnumerateDevices =
	        navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices);
	    navigator.mediaDevices.enumerateDevices = function() {
	      return orgEnumerateDevices().then(undefined, function(e) {
	        if (e.name === 'NotFoundError') {
	          return [];
	        }
	        throw e;
	      });
	    };
	  }
	  if (browserDetails.version < 49) {
	    var origGetUserMedia = navigator.mediaDevices.getUserMedia.
	        bind(navigator.mediaDevices);
	    navigator.mediaDevices.getUserMedia = function(c) {
	      return origGetUserMedia(c).catch(function(e) {
	        return Promise.reject(shimError_(e));
	      });
	    };
	  }
	};


/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	 *
	 *  Use of this source code is governed by a BSD-style license
	 *  that can be found in the LICENSE file in the root of the source
	 *  tree.
	 */
	'use strict';
	var safariShim = {
	  // TODO: DrAlex, should be here, double check against LayoutTests
	  // shimOnTrack: function() { },
	
	  // TODO: DrAlex
	  // attachMediaStream: function(element, stream) { },
	  // reattachMediaStream: function(to, from) { },
	
	  // TODO: once the back-end for the mac port is done, add.
	  // TODO: check for webkitGTK+
	  // shimPeerConnection: function() { },
	
	  shimGetUserMedia: function() {
	    navigator.getUserMedia = navigator.webkitGetUserMedia;
	  }
	};
	
	// Expose public methods.
	module.e = {
	  shimGetUserMedia: safariShim.shimGetUserMedia
	  // TODO
	  // shimOnTrack: safariShim.shimOnTrack,
	  // shimPeerConnection: safariShim.shimPeerConnection,
	  // attachMediaStream: safariShim.attachMediaStream,
	  // reattachMediaStream: safariShim.reattachMediaStream
	};


/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	module.e = __webpack_require__(67);


/***/ }
/******/ ])
});
;
//# sourceMappingURL=quagga.js.map