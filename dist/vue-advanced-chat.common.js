module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "00b4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__("ac1f");
var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var call = __webpack_require__("c65b");
var uncurryThis = __webpack_require__("e330");
var isCallable = __webpack_require__("1626");
var isObject = __webpack_require__("861d");

var DELEGATES_TO_EXEC = function () {
  var execCalled = false;
  var re = /[ac]/;
  re.exec = function () {
    execCalled = true;
    return /./.exec.apply(this, arguments);
  };
  return re.test('abc') === true && execCalled;
}();

var Error = global.Error;
var un$Test = uncurryThis(/./.test);

// `RegExp.prototype.test` method
// https://tc39.es/ecma262/#sec-regexp.prototype.test
$({ target: 'RegExp', proto: true, forced: !DELEGATES_TO_EXEC }, {
  test: function (str) {
    var exec = this.exec;
    if (!isCallable(exec)) return un$Test(this, str);
    var result = call(exec, this, str);
    if (result !== null && !isObject(result)) {
      throw new Error('RegExp exec method returned something other than an Object or null');
    }
    return !!result;
  }
});


/***/ }),

/***/ "00ee":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "01b4":
/***/ (function(module, exports) {

var Queue = function () {
  this.head = null;
  this.tail = null;
};

Queue.prototype = {
  add: function (item) {
    var entry = { item: item, next: null };
    if (this.head) this.tail.next = entry;
    else this.head = entry;
    this.tail = entry;
  },
  get: function () {
    var entry = this.head;
    if (entry) {
      this.head = entry.next;
      if (this.tail === entry) this.tail = null;
      return entry.item;
    }
  }
};

module.exports = Queue;


/***/ }),

/***/ "0366":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");
var aCallable = __webpack_require__("59ed");
var NATIVE_BIND = __webpack_require__("40d5");

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "04d1":
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__("342f");

var firefox = userAgent.match(/firefox\/(\d+)/i);

module.exports = !!firefox && +firefox[1];


/***/ }),

/***/ "0538":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");
var aCallable = __webpack_require__("59ed");
var isObject = __webpack_require__("861d");
var hasOwn = __webpack_require__("1a2d");
var arraySlice = __webpack_require__("f36a");
var NATIVE_BIND = __webpack_require__("40d5");

var Function = global.Function;
var concat = uncurryThis([].concat);
var join = uncurryThis([].join);
var factories = {};

var construct = function (C, argsLength, args) {
  if (!hasOwn(factories, argsLength)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    factories[argsLength] = Function('C,a', 'return new C(' + join(list, ',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.es/ecma262/#sec-function.prototype.bind
module.exports = NATIVE_BIND ? Function.bind : function bind(that /* , ...args */) {
  var F = aCallable(this);
  var Prototype = F.prototype;
  var partArgs = arraySlice(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = concat(partArgs, arraySlice(arguments));
    return this instanceof boundFunction ? construct(F, args.length, args) : F.apply(that, args);
  };
  if (isObject(Prototype)) boundFunction.prototype = Prototype;
  return boundFunction;
};


/***/ }),

/***/ "057f":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable es-x/no-object-getownpropertynames -- safe */
var classof = __webpack_require__("c6b6");
var toIndexedObject = __webpack_require__("fc6a");
var $getOwnPropertyNames = __webpack_require__("241c").f;
var arraySlice = __webpack_require__("4dae");

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames(it);
  } catch (error) {
    return arraySlice(windowNames);
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && classof(it) == 'Window'
    ? getWindowNames(it)
    : $getOwnPropertyNames(toIndexedObject(it));
};


/***/ }),

/***/ "06cf":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var call = __webpack_require__("c65b");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var createPropertyDescriptor = __webpack_require__("5c6c");
var toIndexedObject = __webpack_require__("fc6a");
var toPropertyKey = __webpack_require__("a04b");
var hasOwn = __webpack_require__("1a2d");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");

// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ "07fa":
/***/ (function(module, exports, __webpack_require__) {

var toLength = __webpack_require__("50c4");

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ "0b25":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var toIntegerOrInfinity = __webpack_require__("5926");
var toLength = __webpack_require__("50c4");

var RangeError = global.RangeError;

// `ToIndex` abstract operation
// https://tc39.es/ecma262/#sec-toindex
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toIntegerOrInfinity(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length or index');
  return length;
};


/***/ }),

/***/ "0b42":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isArray = __webpack_require__("e8b5");
var isConstructor = __webpack_require__("68ee");
var isObject = __webpack_require__("861d");
var wellKnownSymbol = __webpack_require__("b622");

var SPECIES = wellKnownSymbol('species');
var Array = global.Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "0c47":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var setToStringTag = __webpack_require__("d44e");

// JSON[@@toStringTag] property
// https://tc39.es/ecma262/#sec-json-@@tostringtag
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "0cb2":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");
var toObject = __webpack_require__("7b0b");

var floor = Math.floor;
var charAt = uncurryThis(''.charAt);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
module.exports = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace(replacement, symbols, function (match, ch) {
    var capture;
    switch (charAt(ch, 0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return stringSlice(str, 0, position);
      case "'": return stringSlice(str, tailPos);
      case '<':
        capture = namedCaptures[stringSlice(ch, 1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};


/***/ }),

/***/ "0ccb":
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var uncurryThis = __webpack_require__("e330");
var toLength = __webpack_require__("50c4");
var toString = __webpack_require__("577e");
var $repeat = __webpack_require__("1148");
var requireObjectCoercible = __webpack_require__("1d80");

var repeat = uncurryThis($repeat);
var stringSlice = uncurryThis(''.slice);
var ceil = Math.ceil;

// `String.prototype.{ padStart, padEnd }` methods implementation
var createMethod = function (IS_END) {
  return function ($this, maxLength, fillString) {
    var S = toString(requireObjectCoercible($this));
    var intMaxLength = toLength(maxLength);
    var stringLength = S.length;
    var fillStr = fillString === undefined ? ' ' : toString(fillString);
    var fillLen, stringFiller;
    if (intMaxLength <= stringLength || fillStr == '') return S;
    fillLen = intMaxLength - stringLength;
    stringFiller = repeat(fillStr, ceil(fillLen / fillStr.length));
    if (stringFiller.length > fillLen) stringFiller = stringSlice(stringFiller, 0, fillLen);
    return IS_END ? S + stringFiller : stringFiller + S;
  };
};

module.exports = {
  // `String.prototype.padStart` method
  // https://tc39.es/ecma262/#sec-string.prototype.padstart
  start: createMethod(false),
  // `String.prototype.padEnd` method
  // https://tc39.es/ecma262/#sec-string.prototype.padend
  end: createMethod(true)
};


/***/ }),

/***/ "0cfb":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var createElement = __webpack_require__("cc12");

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "0d03":
/***/ (function(module, exports, __webpack_require__) {

// TODO: Remove from `core-js@4`
var uncurryThis = __webpack_require__("e330");
var defineBuiltIn = __webpack_require__("cb2d");

var DatePrototype = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var un$DateToString = uncurryThis(DatePrototype[TO_STRING]);
var getTime = uncurryThis(DatePrototype.getTime);

// `Date.prototype.toString` method
// https://tc39.es/ecma262/#sec-date.prototype.tostring
if (String(new Date(NaN)) != INVALID_DATE) {
  defineBuiltIn(DatePrototype, TO_STRING, function toString() {
    var value = getTime(this);
    // eslint-disable-next-line no-self-compare -- NaN check
    return value === value ? un$DateToString(this) : INVALID_DATE;
  });
}


/***/ }),

/***/ "0d3b":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var IS_PURE = __webpack_require__("c430");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = !fails(function () {
  // eslint-disable-next-line unicorn/relative-url-style -- required for testing
  var url = new URL('b?a=1&b=2&c=3', 'http://a');
  var searchParams = url.searchParams;
  var result = '';
  url.pathname = 'c%20d';
  searchParams.forEach(function (value, key) {
    searchParams['delete']('b');
    result += key + value;
  });
  return (IS_PURE && !url.toJSON)
    || !searchParams.sort
    || url.href !== 'http://a/c%20d?a=1&c=3'
    || searchParams.get('c') !== '3'
    || String(new URLSearchParams('?a=1')) !== 'a=1'
    || !searchParams[ITERATOR]
    // throws in Edge
    || new URL('https://a@b').username !== 'a'
    || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
    // not punycoded in Edge
    || new URL('http://тест').host !== 'xn--e1aybc'
    // not escaped in Chrome 62-
    || new URL('http://a#б').hash !== '#%D0%B1'
    // fails in Chrome 66-
    || result !== 'a1c3'
    // throws in Safari
    || new URL('http://x', undefined).host !== 'x';
});


/***/ }),

/***/ "0d51":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

var String = global.String;

module.exports = function (argument) {
  try {
    return String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ "107c":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var global = __webpack_require__("da84");

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});


/***/ }),

/***/ "1148":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var toIntegerOrInfinity = __webpack_require__("5926");
var toString = __webpack_require__("577e");
var requireObjectCoercible = __webpack_require__("1d80");

var RangeError = global.RangeError;

// `String.prototype.repeat` method implementation
// https://tc39.es/ecma262/#sec-string.prototype.repeat
module.exports = function repeat(count) {
  var str = toString(requireObjectCoercible(this));
  var result = '';
  var n = toIntegerOrInfinity(count);
  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};


/***/ }),

/***/ "129f":
/***/ (function(module, exports) {

// `SameValue` abstract operation
// https://tc39.es/ecma262/#sec-samevalue
// eslint-disable-next-line es-x/no-object-is -- safe
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare -- NaN check
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),

/***/ "131a":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var setPrototypeOf = __webpack_require__("d2bb");

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
$({ target: 'Object', stat: true }, {
  setPrototypeOf: setPrototypeOf
});


/***/ }),

/***/ "13d2":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var isCallable = __webpack_require__("1626");
var hasOwn = __webpack_require__("1a2d");
var DESCRIPTORS = __webpack_require__("83ab");
var CONFIGURABLE_FUNCTION_NAME = __webpack_require__("5e77").CONFIGURABLE;
var inspectSource = __webpack_require__("8925");
var InternalStateModule = __webpack_require__("69f3");

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (String(name).slice(0, 7) === 'Symbol(') {
    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    defineProperty(value, 'name', { value: name, configurable: true });
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ "13d5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $reduce = __webpack_require__("d58f").left;
var arrayMethodIsStrict = __webpack_require__("a640");
var CHROME_VERSION = __webpack_require__("2d00");
var IS_NODE = __webpack_require__("605d");

var STRICT_METHOD = arrayMethodIsStrict('reduce');
// Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;

// `Array.prototype.reduce` method
// https://tc39.es/ecma262/#sec-array.prototype.reduce
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || CHROME_BUG }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    var length = arguments.length;
    return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "1448":
/***/ (function(module, exports, __webpack_require__) {

var arrayFromConstructorAndList = __webpack_require__("dfb9");
var typedArraySpeciesConstructor = __webpack_require__("b6b7");

module.exports = function (instance, list) {
  return arrayFromConstructorAndList(typedArraySpeciesConstructor(instance), list);
};


/***/ }),

/***/ "145e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toObject = __webpack_require__("7b0b");
var toAbsoluteIndex = __webpack_require__("23cb");
var lengthOfArrayLike = __webpack_require__("07fa");

var min = Math.min;

// `Array.prototype.copyWithin` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.copywithin
// eslint-disable-next-line es-x/no-array-prototype-copywithin -- safe
module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = lengthOfArrayLike(O);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),

/***/ "14c3":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var call = __webpack_require__("c65b");
var anObject = __webpack_require__("825a");
var isCallable = __webpack_require__("1626");
var classof = __webpack_require__("c6b6");
var regexpExec = __webpack_require__("9263");

var TypeError = global.TypeError;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (isCallable(exec)) {
    var result = call(exec, R, S);
    if (result !== null) anObject(result);
    return result;
  }
  if (classof(R) === 'RegExp') return call(regexpExec, R, S);
  throw TypeError('RegExp#exec called on incompatible receiver');
};


/***/ }),

/***/ "14e5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var call = __webpack_require__("c65b");
var aCallable = __webpack_require__("59ed");
var newPromiseCapabilityModule = __webpack_require__("f069");
var perform = __webpack_require__("e667");
var iterate = __webpack_require__("2266");
var PROMISE_STATICS_INCORRECT_ITERATION = __webpack_require__("5eed");

// `Promise.all` method
// https://tc39.es/ecma262/#sec-promise.all
$({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        remaining++;
        call($promiseResolve, C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ "159b":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DOMIterables = __webpack_require__("fdbc");
var DOMTokenListPrototype = __webpack_require__("785a");
var forEach = __webpack_require__("17c2");
var createNonEnumerableProperty = __webpack_require__("9112");

var handlePrototype = function (CollectionPrototype) {
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  if (DOMIterables[COLLECTION_NAME]) {
    handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype);
  }
}

handlePrototype(DOMTokenListPrototype);


/***/ }),

/***/ "1626":
/***/ (function(module, exports) {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ "1652":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.stateify = exports.TokenState = exports.CharacterState = undefined;

var _class = __webpack_require__("254c");

function createStateClass() {
	return function (tClass) {
		this.j = [];
		this.T = tClass || null;
	};
}

/**
	A simple state machine that can emit token classes

	The `j` property in this class refers to state jumps. It's a
	multidimensional array where for each element:

	* index [0] is a symbol or class of symbols to transition to.
	* index [1] is a State instance which matches

	The type of symbol will depend on the target implementation for this class.
	In Linkify, we have a two-stage scanner. Each stage uses this state machine
	but with a slighly different (polymorphic) implementation.

	The `T` property refers to the token class.

	TODO: Can the `on` and `next` methods be combined?

	@class BaseState
*/
var BaseState = createStateClass();
BaseState.prototype = {
	defaultTransition: false,

	/**
 	@method constructor
 	@param {Class} tClass Pass in the kind of token to emit if there are
 		no jumps after this state and the state is accepting.
 */

	/**
 	On the given symbol(s), this machine should go to the given state
 		@method on
 	@param {Array|Mixed} symbol
 	@param {BaseState} state Note that the type of this state should be the
 		same as the current instance (i.e., don't pass in a different
 		subclass)
 */
	on: function on(symbol, state) {
		if (symbol instanceof Array) {
			for (var i = 0; i < symbol.length; i++) {
				this.j.push([symbol[i], state]);
			}
			return this;
		}
		this.j.push([symbol, state]);
		return this;
	},


	/**
 	Given the next item, returns next state for that item
 	@method next
 	@param {Mixed} item Should be an instance of the symbols handled by
 		this particular machine.
 	@return {State} state Returns false if no jumps are available
 */
	next: function next(item) {
		for (var i = 0; i < this.j.length; i++) {
			var jump = this.j[i];
			var symbol = jump[0]; // Next item to check for
			var state = jump[1]; // State to jump to if items match

			// compare item with symbol
			if (this.test(item, symbol)) {
				return state;
			}
		}

		// Nowhere left to jump!
		return this.defaultTransition;
	},


	/**
 	Does this state accept?
 	`true` only of `this.T` exists
 		@method accepts
 	@return {Boolean}
 */
	accepts: function accepts() {
		return !!this.T;
	},


	/**
 	Determine whether a given item "symbolizes" the symbol, where symbol is
 	a class of items handled by this state machine.
 		This method should be overriden in extended classes.
 		@method test
 	@param {Mixed} item Does this item match the given symbol?
 	@param {Mixed} symbol
 	@return {Boolean}
 */
	test: function test(item, symbol) {
		return item === symbol;
	},


	/**
 	Emit the token for this State (just return it in this case)
 	If this emits a token, this instance is an accepting state
 	@method emit
 	@return {Class} T
 */
	emit: function emit() {
		return this.T;
	}
};

/**
	State machine for string-based input

	@class CharacterState
	@extends BaseState
*/
var CharacterState = (0, _class.inherits)(BaseState, createStateClass(), {
	/**
 	Does the given character match the given character or regular
 	expression?
 		@method test
 	@param {String} char
 	@param {String|RegExp} charOrRegExp
 	@return {Boolean}
 */
	test: function test(character, charOrRegExp) {
		return character === charOrRegExp || charOrRegExp instanceof RegExp && charOrRegExp.test(character);
	}
});

/**
	State machine for input in the form of TextTokens

	@class TokenState
	@extends BaseState
*/
var TokenState = (0, _class.inherits)(BaseState, createStateClass(), {

	/**
  * Similar to `on`, but returns the state the results in the transition from
  * the given item
  * @method jump
  * @param {Mixed} item
  * @param {Token} [token]
  * @return state
  */
	jump: function jump(token) {
		var tClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

		var state = this.next(new token('')); // dummy temp token
		if (state === this.defaultTransition) {
			// Make a new state!
			state = new this.constructor(tClass);
			this.on(token, state);
		} else if (tClass) {
			state.T = tClass;
		}
		return state;
	},


	/**
 	Is the given token an instance of the given token class?
 		@method test
 	@param {TextToken} token
 	@param {Class} tokenClass
 	@return {Boolean}
 */
	test: function test(token, tokenClass) {
		return token instanceof tokenClass;
	}
});

/**
	Given a non-empty target string, generates states (if required) for each
	consecutive substring of characters in str starting from the beginning of
	the string. The final state will have a special value, as specified in
	options. All other "in between" substrings will have a default end state.

	This turns the state machine into a Trie-like data structure (rather than a
	intelligently-designed DFA).

	Note that I haven't really tried these with any strings other than
	DOMAIN.

	@param {String} str
	@param {CharacterState} start State to jump from the first character
	@param {Class} endToken Token class to emit when the given string has been
		matched and no more jumps exist.
	@param {Class} defaultToken "Filler token", or which token type to emit when
		we don't have a full match
	@return {Array} list of newly-created states
*/
function stateify(str, start, endToken, defaultToken) {
	var i = 0,
	    len = str.length,
	    state = start,
	    newStates = [],
	    nextState = void 0;

	// Find the next state without a jump to the next character
	while (i < len && (nextState = state.next(str[i]))) {
		state = nextState;
		i++;
	}

	if (i >= len) {
		return [];
	} // no new tokens were added

	while (i < len - 1) {
		nextState = new CharacterState(defaultToken);
		newStates.push(nextState);
		state.on(str[i], nextState);
		state = nextState;
		i++;
	}

	nextState = new CharacterState(endToken);
	newStates.push(nextState);
	state.on(str[len - 1], nextState);

	return newStates;
}

exports.CharacterState = CharacterState;
exports.TokenState = TokenState;
exports.stateify = stateify;

/***/ }),

/***/ "170b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var toLength = __webpack_require__("50c4");
var toAbsoluteIndex = __webpack_require__("23cb");
var typedArraySpeciesConstructor = __webpack_require__("b6b7");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.subarray` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.subarray
exportTypedArrayMethod('subarray', function subarray(begin, end) {
  var O = aTypedArray(this);
  var length = O.length;
  var beginIndex = toAbsoluteIndex(begin, length);
  var C = typedArraySpeciesConstructor(O);
  return new C(
    O.buffer,
    O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT,
    toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex)
  );
});


/***/ }),

/***/ "17aa":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "17c2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $forEach = __webpack_require__("b727").forEach;
var arrayMethodIsStrict = __webpack_require__("a640");

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
module.exports = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es-x/no-array-prototype-foreach -- safe
} : [].forEach;


/***/ }),

/***/ "182d":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var toPositiveInteger = __webpack_require__("f8cd");

var RangeError = global.RangeError;

module.exports = function (it, BYTES) {
  var offset = toPositiveInteger(it);
  if (offset % BYTES) throw RangeError('Wrong offset');
  return offset;
};


/***/ }),

/***/ "19aa":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isPrototypeOf = __webpack_require__("3a9b");

var TypeError = global.TypeError;

module.exports = function (it, Prototype) {
  if (isPrototypeOf(Prototype, it)) return it;
  throw TypeError('Incorrect invocation');
};


/***/ }),

/***/ "1a2d":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");
var toObject = __webpack_require__("7b0b");

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es-x/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ "1a98":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detectMobile", function() { return detectMobile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "iOSDevice", function() { return iOSDevice; });
/* harmony import */ var core_js_modules_es_string_substr_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e323");
/* harmony import */ var core_js_modules_es_string_substr_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_substr_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ac1f");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_regexp_test_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("00b4");
/* harmony import */ var core_js_modules_es_regexp_test_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_test_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("d9e2");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("d401");
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("caad");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("2532");
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_6__);







function detectMobile() {
  var userAgent = getUserAgent();
  var userAgentPart = userAgent.substr(0, 4);
  return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw(n|u)|c55\/|capi|ccwa|cdm|cell|chtm|cldc|cmd|co(mp|nd)|craw|da(it|ll|ng)|dbte|dcs|devi|dica|dmob|do(c|p)o|ds(12|d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(|_)|g1 u|g560|gene|gf5|gmo|go(\.w|od)|gr(ad|un)|haie|hcit|hd(m|p|t)|hei|hi(pt|ta)|hp( i|ip)|hsc|ht(c(| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i(20|go|ma)|i230|iac( ||\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|[a-w])|libw|lynx|m1w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|mcr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|([1-8]|c))|phil|pire|pl(ay|uc)|pn2|po(ck|rt|se)|prox|psio|ptg|qaa|qc(07|12|21|32|60|[2-7]|i)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h|oo|p)|sdk\/|se(c(|0|1)|47|mc|nd|ri)|sgh|shar|sie(|m)|sk0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h|v|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl|tdg|tel(i|m)|tim|tmo|to(pl|sh)|ts(70|m|m3|m5)|tx9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas|your|zeto|zte/i.test(userAgentPart);
}

function getUserAgent() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera || null;
  if (!userAgent) throw new Error('Failed to look for user agent information.');
  return userAgent;
}

function iOSDevice() {
  return ['iPad', 'iPhone', 'iPod'].includes(navigator.platform) || navigator.userAgent.includes('Mac') && 'ontouchend' in document;
}

/***/ }),

/***/ "1be4":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "1c59":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var collection = __webpack_require__("6d61");
var collectionStrong = __webpack_require__("6566");

// `Set` constructor
// https://tc39.es/ecma262/#sec-set-objects
collection('Set', function (init) {
  return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);


/***/ }),

/***/ "1c7e":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es-x/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ "1cdc":
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__("342f");

module.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);


/***/ }),

/***/ "1d1c":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var DESCRIPTORS = __webpack_require__("83ab");
var defineProperties = __webpack_require__("37e8").f;

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es-x/no-object-defineproperties -- safe
$({ target: 'Object', stat: true, forced: Object.defineProperties !== defineProperties, sham: !DESCRIPTORS }, {
  defineProperties: defineProperties
});


/***/ }),

/***/ "1d57":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var setTimeout = __webpack_require__("20cc").setTimeout;

// ie9- setTimeout additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
$({ global: true, bind: true, forced: global.setTimeout !== setTimeout }, {
  setTimeout: setTimeout
});


/***/ }),

/***/ "1d80":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

var TypeError = global.TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "1dde":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var V8_VERSION = __webpack_require__("2d00");

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ "20cc":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var apply = __webpack_require__("2ba4");
var isCallable = __webpack_require__("1626");
var userAgent = __webpack_require__("342f");
var arraySlice = __webpack_require__("f36a");
var validateArgumentsLength = __webpack_require__("d6d6");

var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var Function = global.Function;

var wrap = function (scheduler) {
  return MSIE ? function (handler, timeout /* , ...arguments */) {
    var boundArgs = validateArgumentsLength(arguments.length, 1) > 2;
    var fn = isCallable(handler) ? handler : Function(handler);
    var args = boundArgs ? arraySlice(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      apply(fn, this, args);
    } : fn, timeout);
  } : scheduler;
};

// ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
module.exports = {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap(global.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap(global.setInterval)
};


/***/ }),

/***/ "219c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");
var fails = __webpack_require__("d039");
var aCallable = __webpack_require__("59ed");
var internalSort = __webpack_require__("addb");
var ArrayBufferViewCore = __webpack_require__("ebb5");
var FF = __webpack_require__("04d1");
var IE_OR_EDGE = __webpack_require__("d998");
var V8 = __webpack_require__("2d00");
var WEBKIT = __webpack_require__("512c");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var Uint16Array = global.Uint16Array;
var un$Sort = Uint16Array && uncurryThis(Uint16Array.prototype.sort);

// WebKit
var ACCEPT_INCORRECT_ARGUMENTS = !!un$Sort && !(fails(function () {
  un$Sort(new Uint16Array(2), null);
}) && fails(function () {
  un$Sort(new Uint16Array(2), {});
}));

var STABLE_SORT = !!un$Sort && !fails(function () {
  // feature detection can be too slow, so check engines versions
  if (V8) return V8 < 74;
  if (FF) return FF < 67;
  if (IE_OR_EDGE) return true;
  if (WEBKIT) return WEBKIT < 602;

  var array = new Uint16Array(516);
  var expected = Array(516);
  var index, mod;

  for (index = 0; index < 516; index++) {
    mod = index % 4;
    array[index] = 515 - index;
    expected[index] = index - 2 * mod + 3;
  }

  un$Sort(array, function (a, b) {
    return (a / 4 | 0) - (b / 4 | 0);
  });

  for (index = 0; index < 516; index++) {
    if (array[index] !== expected[index]) return true;
  }
});

var getSortCompare = function (comparefn) {
  return function (x, y) {
    if (comparefn !== undefined) return +comparefn(x, y) || 0;
    // eslint-disable-next-line no-self-compare -- NaN check
    if (y !== y) return -1;
    // eslint-disable-next-line no-self-compare -- NaN check
    if (x !== x) return 1;
    if (x === 0 && y === 0) return 1 / x > 0 && 1 / y < 0 ? 1 : -1;
    return x > y;
  };
};

// `%TypedArray%.prototype.sort` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.sort
exportTypedArrayMethod('sort', function sort(comparefn) {
  if (comparefn !== undefined) aCallable(comparefn);
  if (STABLE_SORT) return un$Sort(this, comparefn);

  return internalSort(aTypedArray(this), getSortCompare(comparefn));
}, !STABLE_SORT || ACCEPT_INCORRECT_ARGUMENTS);


/***/ }),

/***/ "2266":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var bind = __webpack_require__("0366");
var call = __webpack_require__("c65b");
var anObject = __webpack_require__("825a");
var tryToString = __webpack_require__("0d51");
var isArrayIteratorMethod = __webpack_require__("e95a");
var lengthOfArrayLike = __webpack_require__("07fa");
var isPrototypeOf = __webpack_require__("3a9b");
var getIterator = __webpack_require__("9a1f");
var getIteratorMethod = __webpack_require__("35a1");
var iteratorClose = __webpack_require__("2a62");

var TypeError = global.TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw TypeError(tryToString(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      } return new Result(false);
    }
    iterator = getIterator(iterable, iterFn);
  }

  next = iterator.next;
  while (!(step = call(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
  } return new Result(false);
};


/***/ }),

/***/ "2315":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var createHTML = __webpack_require__("857a");
var forcedStringHTMLMethod = __webpack_require__("af03");

// `String.prototype.strike` method
// https://tc39.es/ecma262/#sec-string.prototype.strike
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('strike') }, {
  strike: function strike() {
    return createHTML(this, 'strike', '', '');
  }
});


/***/ }),

/***/ "23cb":
/***/ (function(module, exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__("5926");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "23dc":
/***/ (function(module, exports, __webpack_require__) {

var setToStringTag = __webpack_require__("d44e");

// Math[@@toStringTag] property
// https://tc39.es/ecma262/#sec-math-@@tostringtag
setToStringTag(Math, 'Math', true);


/***/ }),

/***/ "23e7":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var createNonEnumerableProperty = __webpack_require__("9112");
var defineBuiltIn = __webpack_require__("cb2d");
var defineGlobalProperty = __webpack_require__("6374");
var copyConstructorProperties = __webpack_require__("e893");
var isForced = __webpack_require__("94ca");

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "241c":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es-x/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "2532":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var uncurryThis = __webpack_require__("e330");
var notARegExp = __webpack_require__("5a34");
var requireObjectCoercible = __webpack_require__("1d80");
var toString = __webpack_require__("577e");
var correctIsRegExpLogic = __webpack_require__("ab13");

var stringIndexOf = uncurryThis(''.indexOf);

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~stringIndexOf(
      toString(requireObjectCoercible(this)),
      toString(notARegExp(searchString)),
      arguments.length > 1 ? arguments[1] : undefined
    );
  }
});


/***/ }),

/***/ "254c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.inherits = inherits;
function inherits(parent, child) {
	var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	var extended = Object.create(parent.prototype);
	for (var p in props) {
		extended[p] = props[p];
	}
	extended.constructor = child;
	child.prototype = extended;
	return child;
}

/***/ }),

/***/ "25a1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $reduceRight = __webpack_require__("d58f").right;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.reduceRicht` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduceright
exportTypedArrayMethod('reduceRight', function reduceRight(callbackfn /* , initialValue */) {
  var length = arguments.length;
  return $reduceRight(aTypedArray(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "25f0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var PROPER_FUNCTION_NAME = __webpack_require__("5e77").PROPER;
var defineBuiltIn = __webpack_require__("cb2d");
var anObject = __webpack_require__("825a");
var $toString = __webpack_require__("577e");
var fails = __webpack_require__("d039");
var getRegExpFlags = __webpack_require__("90d8");

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var n$ToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return n$ToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = PROPER_FUNCTION_NAME && n$ToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  defineBuiltIn(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var pattern = $toString(R.source);
    var flags = $toString(getRegExpFlags(R));
    return '/' + pattern + '/' + flags;
  }, { unsafe: true });
}


/***/ }),

/***/ "2626":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__("d066");
var definePropertyModule = __webpack_require__("9bf2");
var wellKnownSymbol = __webpack_require__("b622");
var DESCRIPTORS = __webpack_require__("83ab");

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),

/***/ "26e9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var uncurryThis = __webpack_require__("e330");
var isArray = __webpack_require__("e8b5");

var un$Reverse = uncurryThis([].reverse);
var test = [1, 2];

// `Array.prototype.reverse` method
// https://tc39.es/ecma262/#sec-array.prototype.reverse
// fix for Safari 12.0 bug
// https://bugs.webkit.org/show_bug.cgi?id=188794
$({ target: 'Array', proto: true, forced: String(test) === String(test.reverse()) }, {
  reverse: function reverse() {
    // eslint-disable-next-line no-self-assign -- dirty hack
    if (isArray(this)) this.length = this.length;
    return un$Reverse(this);
  }
});


/***/ }),

/***/ "277d":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var isArray = __webpack_require__("e8b5");

// `Array.isArray` method
// https://tc39.es/ecma262/#sec-array.isarray
$({ target: 'Array', stat: true }, {
  isArray: isArray
});


/***/ }),

/***/ "2954":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var typedArraySpeciesConstructor = __webpack_require__("b6b7");
var fails = __webpack_require__("d039");
var arraySlice = __webpack_require__("f36a");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

var FORCED = fails(function () {
  // eslint-disable-next-line es-x/no-typed-arrays -- required for testing
  new Int8Array(1).slice();
});

// `%TypedArray%.prototype.slice` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.slice
exportTypedArrayMethod('slice', function slice(start, end) {
  var list = arraySlice(aTypedArray(this), start, end);
  var C = typedArraySpeciesConstructor(this);
  var index = 0;
  var length = list.length;
  var result = new C(length);
  while (length > index) result[index] = list[index++];
  return result;
}, FORCED);


/***/ }),

/***/ "2a62":
/***/ (function(module, exports, __webpack_require__) {

var call = __webpack_require__("c65b");
var anObject = __webpack_require__("825a");
var getMethod = __webpack_require__("dc4a");

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};


/***/ }),

/***/ "2b3d":
/***/ (function(module, exports, __webpack_require__) {

// TODO: Remove this module from `core-js@4` since it's replaced to module below
__webpack_require__("4002");


/***/ }),

/***/ "2ba4":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__("40d5");

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es-x/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),

/***/ "2c3e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DESCRIPTORS = __webpack_require__("83ab");
var MISSED_STICKY = __webpack_require__("9f7f").MISSED_STICKY;
var classof = __webpack_require__("c6b6");
var defineBuiltInAccessor = __webpack_require__("edd0");
var getInternalState = __webpack_require__("69f3").get;

var RegExpPrototype = RegExp.prototype;
var TypeError = global.TypeError;

// `RegExp.prototype.sticky` getter
// https://tc39.es/ecma262/#sec-get-regexp.prototype.sticky
if (DESCRIPTORS && MISSED_STICKY) {
  defineBuiltInAccessor(RegExpPrototype, 'sticky', {
    configurable: true,
    get: function sticky() {
      if (this === RegExpPrototype) return undefined;
      // We can't use InternalStateModule.getterFor because
      // we don't add metadata for regexps created by a literal.
      if (classof(this) === 'RegExp') {
        return !!getInternalState(this).sticky;
      }
      throw TypeError('Incompatible receiver, RegExp required');
    }
  });
}


/***/ }),

/***/ "2ca0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var uncurryThis = __webpack_require__("e330");
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var toLength = __webpack_require__("50c4");
var toString = __webpack_require__("577e");
var notARegExp = __webpack_require__("5a34");
var requireObjectCoercible = __webpack_require__("1d80");
var correctIsRegExpLogic = __webpack_require__("ab13");
var IS_PURE = __webpack_require__("c430");

// eslint-disable-next-line es-x/no-string-prototype-startswith -- safe
var un$StartsWith = uncurryThis(''.startsWith);
var stringSlice = uncurryThis(''.slice);
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.startsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.startswith
$({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = toString(requireObjectCoercible(this));
    notARegExp(searchString);
    var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = toString(searchString);
    return un$StartsWith
      ? un$StartsWith(that, search, index)
      : stringSlice(that, index, index + search.length) === search;
  }
});


/***/ }),

/***/ "2ca8":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var setInterval = __webpack_require__("20cc").setInterval;

// ie9- setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
$({ global: true, bind: true, forced: global.setInterval !== setInterval }, {
  setInterval: setInterval
});


/***/ }),

/***/ "2cf4":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var apply = __webpack_require__("2ba4");
var bind = __webpack_require__("0366");
var isCallable = __webpack_require__("1626");
var hasOwn = __webpack_require__("1a2d");
var fails = __webpack_require__("d039");
var html = __webpack_require__("1be4");
var arraySlice = __webpack_require__("f36a");
var createElement = __webpack_require__("cc12");
var validateArgumentsLength = __webpack_require__("d6d6");
var IS_IOS = __webpack_require__("1cdc");
var IS_NODE = __webpack_require__("605d");

var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var Dispatch = global.Dispatch;
var Function = global.Function;
var MessageChannel = global.MessageChannel;
var String = global.String;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var location, defer, channel, port;

try {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  location = global.location;
} catch (error) { /* empty */ }

var run = function (id) {
  if (hasOwn(queue, id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(String(id), location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(handler) {
    validateArgumentsLength(arguments.length, 1);
    var fn = isCallable(handler) ? handler : Function(handler);
    var args = arraySlice(arguments, 1);
    queue[++counter] = function () {
      apply(fn, undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (IS_NODE) {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global.addEventListener &&
    isCallable(global.postMessage) &&
    !global.importScripts &&
    location && location.protocol !== 'file:' &&
    !fails(post)
  ) {
    defer = post;
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};


/***/ }),

/***/ "2d00":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var userAgent = __webpack_require__("342f");

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ "2d78":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.tokenize = exports.test = exports.scanner = exports.parser = exports.options = exports.inherits = exports.find = undefined;

var _class = __webpack_require__("254c");

var _options = __webpack_require__("316e");

var options = _interopRequireWildcard(_options);

var _scanner = __webpack_require__("b7fe");

var scanner = _interopRequireWildcard(_scanner);

var _parser = __webpack_require__("4128");

var parser = _interopRequireWildcard(_parser);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

if (!Array.isArray) {
	Array.isArray = function (arg) {
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
}

/**
	Converts a string into tokens that represent linkable and non-linkable bits
	@method tokenize
	@param {String} str
	@return {Array} tokens
*/
var tokenize = function tokenize(str) {
	return parser.run(scanner.run(str));
};

/**
	Returns a list of linkable items in the given string.
*/
var find = function find(str) {
	var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	var tokens = tokenize(str);
	var filtered = [];

	for (var i = 0; i < tokens.length; i++) {
		var token = tokens[i];
		if (token.isLink && (!type || token.type === type)) {
			filtered.push(token.toObject());
		}
	}

	return filtered;
};

/**
	Is the given string valid linkable text of some sort
	Note that this does not trim the text for you.

	Optionally pass in a second `type` param, which is the type of link to test
	for.

	For example,

		test(str, 'email');

	Will return `true` if str is a valid email.
*/
var test = function test(str) {
	var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	var tokens = tokenize(str);
	return tokens.length === 1 && tokens[0].isLink && (!type || tokens[0].type === type);
};

// Scanner and parser provide states and tokens for the lexicographic stage
// (will be used to add additional link types)
exports.find = find;
exports.inherits = _class.inherits;
exports.options = options;
exports.parser = parser;
exports.scanner = scanner;
exports.test = test;
exports.tokenize = tokenize;

/***/ }),

/***/ "316e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var defaults = {
	defaultProtocol: 'http',
	events: null,
	format: noop,
	formatHref: noop,
	nl2br: false,
	tagName: 'a',
	target: typeToTarget,
	validate: true,
	ignoreTags: [],
	attributes: null,
	className: 'linkified' // Deprecated value - no default class will be provided in the future
};

exports.defaults = defaults;
exports.Options = Options;
exports.contains = contains;


function Options(opts) {
	opts = opts || {};

	this.defaultProtocol = opts.hasOwnProperty('defaultProtocol') ? opts.defaultProtocol : defaults.defaultProtocol;
	this.events = opts.hasOwnProperty('events') ? opts.events : defaults.events;
	this.format = opts.hasOwnProperty('format') ? opts.format : defaults.format;
	this.formatHref = opts.hasOwnProperty('formatHref') ? opts.formatHref : defaults.formatHref;
	this.nl2br = opts.hasOwnProperty('nl2br') ? opts.nl2br : defaults.nl2br;
	this.tagName = opts.hasOwnProperty('tagName') ? opts.tagName : defaults.tagName;
	this.target = opts.hasOwnProperty('target') ? opts.target : defaults.target;
	this.validate = opts.hasOwnProperty('validate') ? opts.validate : defaults.validate;
	this.ignoreTags = [];

	// linkAttributes and linkClass is deprecated
	this.attributes = opts.attributes || opts.linkAttributes || defaults.attributes;
	this.className = opts.hasOwnProperty('className') ? opts.className : opts.linkClass || defaults.className;

	// Make all tags names upper case
	var ignoredTags = opts.hasOwnProperty('ignoreTags') ? opts.ignoreTags : defaults.ignoreTags;
	for (var i = 0; i < ignoredTags.length; i++) {
		this.ignoreTags.push(ignoredTags[i].toUpperCase());
	}
}

Options.prototype = {
	/**
  * Given the token, return all options for how it should be displayed
  */
	resolve: function resolve(token) {
		var href = token.toHref(this.defaultProtocol);
		return {
			formatted: this.get('format', token.toString(), token),
			formattedHref: this.get('formatHref', href, token),
			tagName: this.get('tagName', href, token),
			className: this.get('className', href, token),
			target: this.get('target', href, token),
			events: this.getObject('events', href, token),
			attributes: this.getObject('attributes', href, token)
		};
	},


	/**
  * Returns true or false based on whether a token should be displayed as a
  * link based on the user options. By default,
  */
	check: function check(token) {
		return this.get('validate', token.toString(), token);
	},


	// Private methods

	/**
  * Resolve an option's value based on the value of the option and the given
  * params.
  * @param {String} key Name of option to use
  * @param operator will be passed to the target option if it's method
  * @param {MultiToken} token The token from linkify.tokenize
  */
	get: function get(key, operator, token) {
		var optionValue = void 0,
		    option = this[key];
		if (!option) {
			return option;
		}

		switch (typeof option === 'undefined' ? 'undefined' : _typeof(option)) {
			case 'function':
				return option(operator, token.type);
			case 'object':
				optionValue = option.hasOwnProperty(token.type) ? option[token.type] : defaults[key];
				return typeof optionValue === 'function' ? optionValue(operator, token.type) : optionValue;
		}

		return option;
	},
	getObject: function getObject(key, operator, token) {
		var option = this[key];
		return typeof option === 'function' ? option(operator, token.type) : option;
	}
};

/**
 * Quick indexOf replacement for checking the ignoreTags option
 */
function contains(arr, value) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] === value) {
			return true;
		}
	}
	return false;
}

function noop(val) {
	return val;
}

function typeToTarget(href, type) {
	return type === 'url' ? '_blank' : null;
}

/***/ }),

/***/ "3280":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var apply = __webpack_require__("2ba4");
var $lastIndexOf = __webpack_require__("e58c");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.lastIndexOf` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.lastindexof
exportTypedArrayMethod('lastIndexOf', function lastIndexOf(searchElement /* , fromIndex */) {
  var length = arguments.length;
  return apply($lastIndexOf, aTypedArray(this), length > 1 ? [searchElement, arguments[1]] : [searchElement]);
});


/***/ }),

/***/ "3410":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var fails = __webpack_require__("d039");
var toObject = __webpack_require__("7b0b");
var nativeGetPrototypeOf = __webpack_require__("e163");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__("e177");

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetPrototypeOf(1); });

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(it) {
    return nativeGetPrototypeOf(toObject(it));
  }
});



/***/ }),

/***/ "342f":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "3529":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var call = __webpack_require__("c65b");
var aCallable = __webpack_require__("59ed");
var newPromiseCapabilityModule = __webpack_require__("f069");
var perform = __webpack_require__("e667");
var iterate = __webpack_require__("2266");
var PROMISE_STATICS_INCORRECT_ITERATION = __webpack_require__("5eed");

// `Promise.race` method
// https://tc39.es/ecma262/#sec-promise.race
$({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      iterate(iterable, function (promise) {
        call($promiseResolve, C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ "35a1":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("f5df");
var getMethod = __webpack_require__("dc4a");
var Iterators = __webpack_require__("3f8c");
var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return getMethod(it, ITERATOR)
    || getMethod(it, '@@iterator')
    || Iterators[classof(it)];
};


/***/ }),

/***/ "37e8":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__("aed9");
var definePropertyModule = __webpack_require__("9bf2");
var anObject = __webpack_require__("825a");
var toIndexedObject = __webpack_require__("fc6a");
var objectKeys = __webpack_require__("df75");

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es-x/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};


/***/ }),

/***/ "3a7b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $findIndex = __webpack_require__("b727").findIndex;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.findIndex` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.findindex
exportTypedArrayMethod('findIndex', function findIndex(predicate /* , thisArg */) {
  return $findIndex(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "3a9b":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ "3bbe":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isCallable = __webpack_require__("1626");

var String = global.String;
var TypeError = global.TypeError;

module.exports = function (argument) {
  if (typeof argument == 'object' || isCallable(argument)) return argument;
  throw TypeError("Can't set " + String(argument) + ' as a prototype');
};


/***/ }),

/***/ "3c5d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var call = __webpack_require__("c65b");
var ArrayBufferViewCore = __webpack_require__("ebb5");
var lengthOfArrayLike = __webpack_require__("07fa");
var toOffset = __webpack_require__("182d");
var toIndexedObject = __webpack_require__("7b0b");
var fails = __webpack_require__("d039");

var RangeError = global.RangeError;
var Int8Array = global.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var $set = Int8ArrayPrototype && Int8ArrayPrototype.set;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

var WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS = !fails(function () {
  // eslint-disable-next-line es-x/no-typed-arrays -- required for testing
  var array = new Uint8ClampedArray(2);
  call($set, array, { length: 1, 0: 3 }, 1);
  return array[1] !== 3;
});

// https://bugs.chromium.org/p/v8/issues/detail?id=11294 and other
var TO_OBJECT_BUG = WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS && ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS && fails(function () {
  var array = new Int8Array(2);
  array.set(1);
  array.set('2', 1);
  return array[0] !== 0 || array[1] !== 2;
});

// `%TypedArray%.prototype.set` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.set
exportTypedArrayMethod('set', function set(arrayLike /* , offset */) {
  aTypedArray(this);
  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
  var src = toIndexedObject(arrayLike);
  if (WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS) return call($set, this, src, offset);
  var length = this.length;
  var len = lengthOfArrayLike(src);
  var index = 0;
  if (len + offset > length) throw RangeError('Wrong length');
  while (index < len) this[offset + index] = src[index++];
}, !WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS || TO_OBJECT_BUG);


/***/ }),

/***/ "3ca3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__("6547").charAt;
var toString = __webpack_require__("577e");
var InternalStateModule = __webpack_require__("69f3");
var defineIterator = __webpack_require__("7dd0");

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: toString(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "3d87":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__("4930");

/* eslint-disable es-x/no-symbol -- safe */
module.exports = NATIVE_SYMBOL && !!Symbol['for'] && !!Symbol.keyFor;


/***/ }),

/***/ "3f8c":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "3fcc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $map = __webpack_require__("b727").map;
var typedArraySpeciesConstructor = __webpack_require__("b6b7");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.map` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.map
exportTypedArrayMethod('map', function map(mapfn /* , thisArg */) {
  return $map(aTypedArray(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
    return new (typedArraySpeciesConstructor(O))(length);
  });
});


/***/ }),

/***/ "4002":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
__webpack_require__("3ca3");
var $ = __webpack_require__("23e7");
var DESCRIPTORS = __webpack_require__("83ab");
var USE_NATIVE_URL = __webpack_require__("0d3b");
var global = __webpack_require__("da84");
var bind = __webpack_require__("0366");
var uncurryThis = __webpack_require__("e330");
var defineBuiltIn = __webpack_require__("cb2d");
var defineBuiltInAccessor = __webpack_require__("edd0");
var anInstance = __webpack_require__("19aa");
var hasOwn = __webpack_require__("1a2d");
var assign = __webpack_require__("60da");
var arrayFrom = __webpack_require__("4df4");
var arraySlice = __webpack_require__("4dae");
var codeAt = __webpack_require__("6547").codeAt;
var toASCII = __webpack_require__("5fb2");
var $toString = __webpack_require__("577e");
var setToStringTag = __webpack_require__("d44e");
var validateArgumentsLength = __webpack_require__("d6d6");
var URLSearchParamsModule = __webpack_require__("5352");
var InternalStateModule = __webpack_require__("69f3");

var setInternalState = InternalStateModule.set;
var getInternalURLState = InternalStateModule.getterFor('URL');
var URLSearchParams = URLSearchParamsModule.URLSearchParams;
var getInternalSearchParamsState = URLSearchParamsModule.getState;

var NativeURL = global.URL;
var TypeError = global.TypeError;
var parseInt = global.parseInt;
var floor = Math.floor;
var pow = Math.pow;
var charAt = uncurryThis(''.charAt);
var exec = uncurryThis(/./.exec);
var join = uncurryThis([].join);
var numberToString = uncurryThis(1.0.toString);
var pop = uncurryThis([].pop);
var push = uncurryThis([].push);
var replace = uncurryThis(''.replace);
var shift = uncurryThis([].shift);
var split = uncurryThis(''.split);
var stringSlice = uncurryThis(''.slice);
var toLowerCase = uncurryThis(''.toLowerCase);
var unshift = uncurryThis([].unshift);

var INVALID_AUTHORITY = 'Invalid authority';
var INVALID_SCHEME = 'Invalid scheme';
var INVALID_HOST = 'Invalid host';
var INVALID_PORT = 'Invalid port';

var ALPHA = /[a-z]/i;
// eslint-disable-next-line regexp/no-obscure-range -- safe
var ALPHANUMERIC = /[\d+-.a-z]/i;
var DIGIT = /\d/;
var HEX_START = /^0x/i;
var OCT = /^[0-7]+$/;
var DEC = /^\d+$/;
var HEX = /^[\da-f]+$/i;
/* eslint-disable regexp/no-control-character -- safe */
var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+|[\u0000-\u0020]+$/g;
var TAB_AND_NEW_LINE = /[\t\n\r]/g;
/* eslint-enable regexp/no-control-character -- safe */
var EOF;

// https://url.spec.whatwg.org/#ipv4-number-parser
var parseIPv4 = function (input) {
  var parts = split(input, '.');
  var partsLength, numbers, index, part, radix, number, ipv4;
  if (parts.length && parts[parts.length - 1] == '') {
    parts.length--;
  }
  partsLength = parts.length;
  if (partsLength > 4) return input;
  numbers = [];
  for (index = 0; index < partsLength; index++) {
    part = parts[index];
    if (part == '') return input;
    radix = 10;
    if (part.length > 1 && charAt(part, 0) == '0') {
      radix = exec(HEX_START, part) ? 16 : 8;
      part = stringSlice(part, radix == 8 ? 1 : 2);
    }
    if (part === '') {
      number = 0;
    } else {
      if (!exec(radix == 10 ? DEC : radix == 8 ? OCT : HEX, part)) return input;
      number = parseInt(part, radix);
    }
    push(numbers, number);
  }
  for (index = 0; index < partsLength; index++) {
    number = numbers[index];
    if (index == partsLength - 1) {
      if (number >= pow(256, 5 - partsLength)) return null;
    } else if (number > 255) return null;
  }
  ipv4 = pop(numbers);
  for (index = 0; index < numbers.length; index++) {
    ipv4 += numbers[index] * pow(256, 3 - index);
  }
  return ipv4;
};

// https://url.spec.whatwg.org/#concept-ipv6-parser
// eslint-disable-next-line max-statements -- TODO
var parseIPv6 = function (input) {
  var address = [0, 0, 0, 0, 0, 0, 0, 0];
  var pieceIndex = 0;
  var compress = null;
  var pointer = 0;
  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

  var chr = function () {
    return charAt(input, pointer);
  };

  if (chr() == ':') {
    if (charAt(input, 1) != ':') return;
    pointer += 2;
    pieceIndex++;
    compress = pieceIndex;
  }
  while (chr()) {
    if (pieceIndex == 8) return;
    if (chr() == ':') {
      if (compress !== null) return;
      pointer++;
      pieceIndex++;
      compress = pieceIndex;
      continue;
    }
    value = length = 0;
    while (length < 4 && exec(HEX, chr())) {
      value = value * 16 + parseInt(chr(), 16);
      pointer++;
      length++;
    }
    if (chr() == '.') {
      if (length == 0) return;
      pointer -= length;
      if (pieceIndex > 6) return;
      numbersSeen = 0;
      while (chr()) {
        ipv4Piece = null;
        if (numbersSeen > 0) {
          if (chr() == '.' && numbersSeen < 4) pointer++;
          else return;
        }
        if (!exec(DIGIT, chr())) return;
        while (exec(DIGIT, chr())) {
          number = parseInt(chr(), 10);
          if (ipv4Piece === null) ipv4Piece = number;
          else if (ipv4Piece == 0) return;
          else ipv4Piece = ipv4Piece * 10 + number;
          if (ipv4Piece > 255) return;
          pointer++;
        }
        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
        numbersSeen++;
        if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
      }
      if (numbersSeen != 4) return;
      break;
    } else if (chr() == ':') {
      pointer++;
      if (!chr()) return;
    } else if (chr()) return;
    address[pieceIndex++] = value;
  }
  if (compress !== null) {
    swaps = pieceIndex - compress;
    pieceIndex = 7;
    while (pieceIndex != 0 && swaps > 0) {
      swap = address[pieceIndex];
      address[pieceIndex--] = address[compress + swaps - 1];
      address[compress + --swaps] = swap;
    }
  } else if (pieceIndex != 8) return;
  return address;
};

var findLongestZeroSequence = function (ipv6) {
  var maxIndex = null;
  var maxLength = 1;
  var currStart = null;
  var currLength = 0;
  var index = 0;
  for (; index < 8; index++) {
    if (ipv6[index] !== 0) {
      if (currLength > maxLength) {
        maxIndex = currStart;
        maxLength = currLength;
      }
      currStart = null;
      currLength = 0;
    } else {
      if (currStart === null) currStart = index;
      ++currLength;
    }
  }
  if (currLength > maxLength) {
    maxIndex = currStart;
    maxLength = currLength;
  }
  return maxIndex;
};

// https://url.spec.whatwg.org/#host-serializing
var serializeHost = function (host) {
  var result, index, compress, ignore0;
  // ipv4
  if (typeof host == 'number') {
    result = [];
    for (index = 0; index < 4; index++) {
      unshift(result, host % 256);
      host = floor(host / 256);
    } return join(result, '.');
  // ipv6
  } else if (typeof host == 'object') {
    result = '';
    compress = findLongestZeroSequence(host);
    for (index = 0; index < 8; index++) {
      if (ignore0 && host[index] === 0) continue;
      if (ignore0) ignore0 = false;
      if (compress === index) {
        result += index ? ':' : '::';
        ignore0 = true;
      } else {
        result += numberToString(host[index], 16);
        if (index < 7) result += ':';
      }
    }
    return '[' + result + ']';
  } return host;
};

var C0ControlPercentEncodeSet = {};
var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
  ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
});
var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
  '#': 1, '?': 1, '{': 1, '}': 1
});
var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
  '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
});

var percentEncode = function (chr, set) {
  var code = codeAt(chr, 0);
  return code > 0x20 && code < 0x7F && !hasOwn(set, chr) ? chr : encodeURIComponent(chr);
};

// https://url.spec.whatwg.org/#special-scheme
var specialSchemes = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};

// https://url.spec.whatwg.org/#windows-drive-letter
var isWindowsDriveLetter = function (string, normalized) {
  var second;
  return string.length == 2 && exec(ALPHA, charAt(string, 0))
    && ((second = charAt(string, 1)) == ':' || (!normalized && second == '|'));
};

// https://url.spec.whatwg.org/#start-with-a-windows-drive-letter
var startsWithWindowsDriveLetter = function (string) {
  var third;
  return string.length > 1 && isWindowsDriveLetter(stringSlice(string, 0, 2)) && (
    string.length == 2 ||
    ((third = charAt(string, 2)) === '/' || third === '\\' || third === '?' || third === '#')
  );
};

// https://url.spec.whatwg.org/#single-dot-path-segment
var isSingleDot = function (segment) {
  return segment === '.' || toLowerCase(segment) === '%2e';
};

// https://url.spec.whatwg.org/#double-dot-path-segment
var isDoubleDot = function (segment) {
  segment = toLowerCase(segment);
  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
};

// States:
var SCHEME_START = {};
var SCHEME = {};
var NO_SCHEME = {};
var SPECIAL_RELATIVE_OR_AUTHORITY = {};
var PATH_OR_AUTHORITY = {};
var RELATIVE = {};
var RELATIVE_SLASH = {};
var SPECIAL_AUTHORITY_SLASHES = {};
var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
var AUTHORITY = {};
var HOST = {};
var HOSTNAME = {};
var PORT = {};
var FILE = {};
var FILE_SLASH = {};
var FILE_HOST = {};
var PATH_START = {};
var PATH = {};
var CANNOT_BE_A_BASE_URL_PATH = {};
var QUERY = {};
var FRAGMENT = {};

var URLState = function (url, isBase, base) {
  var urlString = $toString(url);
  var baseState, failure, searchParams;
  if (isBase) {
    failure = this.parse(urlString);
    if (failure) throw TypeError(failure);
    this.searchParams = null;
  } else {
    if (base !== undefined) baseState = new URLState(base, true);
    failure = this.parse(urlString, null, baseState);
    if (failure) throw TypeError(failure);
    searchParams = getInternalSearchParamsState(new URLSearchParams());
    searchParams.bindURL(this);
    this.searchParams = searchParams;
  }
};

URLState.prototype = {
  type: 'URL',
  // https://url.spec.whatwg.org/#url-parsing
  // eslint-disable-next-line max-statements -- TODO
  parse: function (input, stateOverride, base) {
    var url = this;
    var state = stateOverride || SCHEME_START;
    var pointer = 0;
    var buffer = '';
    var seenAt = false;
    var seenBracket = false;
    var seenPasswordToken = false;
    var codePoints, chr, bufferCodePoints, failure;

    input = $toString(input);

    if (!stateOverride) {
      url.scheme = '';
      url.username = '';
      url.password = '';
      url.host = null;
      url.port = null;
      url.path = [];
      url.query = null;
      url.fragment = null;
      url.cannotBeABaseURL = false;
      input = replace(input, LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
    }

    input = replace(input, TAB_AND_NEW_LINE, '');

    codePoints = arrayFrom(input);

    while (pointer <= codePoints.length) {
      chr = codePoints[pointer];
      switch (state) {
        case SCHEME_START:
          if (chr && exec(ALPHA, chr)) {
            buffer += toLowerCase(chr);
            state = SCHEME;
          } else if (!stateOverride) {
            state = NO_SCHEME;
            continue;
          } else return INVALID_SCHEME;
          break;

        case SCHEME:
          if (chr && (exec(ALPHANUMERIC, chr) || chr == '+' || chr == '-' || chr == '.')) {
            buffer += toLowerCase(chr);
          } else if (chr == ':') {
            if (stateOverride && (
              (url.isSpecial() != hasOwn(specialSchemes, buffer)) ||
              (buffer == 'file' && (url.includesCredentials() || url.port !== null)) ||
              (url.scheme == 'file' && !url.host)
            )) return;
            url.scheme = buffer;
            if (stateOverride) {
              if (url.isSpecial() && specialSchemes[url.scheme] == url.port) url.port = null;
              return;
            }
            buffer = '';
            if (url.scheme == 'file') {
              state = FILE;
            } else if (url.isSpecial() && base && base.scheme == url.scheme) {
              state = SPECIAL_RELATIVE_OR_AUTHORITY;
            } else if (url.isSpecial()) {
              state = SPECIAL_AUTHORITY_SLASHES;
            } else if (codePoints[pointer + 1] == '/') {
              state = PATH_OR_AUTHORITY;
              pointer++;
            } else {
              url.cannotBeABaseURL = true;
              push(url.path, '');
              state = CANNOT_BE_A_BASE_URL_PATH;
            }
          } else if (!stateOverride) {
            buffer = '';
            state = NO_SCHEME;
            pointer = 0;
            continue;
          } else return INVALID_SCHEME;
          break;

        case NO_SCHEME:
          if (!base || (base.cannotBeABaseURL && chr != '#')) return INVALID_SCHEME;
          if (base.cannotBeABaseURL && chr == '#') {
            url.scheme = base.scheme;
            url.path = arraySlice(base.path);
            url.query = base.query;
            url.fragment = '';
            url.cannotBeABaseURL = true;
            state = FRAGMENT;
            break;
          }
          state = base.scheme == 'file' ? FILE : RELATIVE;
          continue;

        case SPECIAL_RELATIVE_OR_AUTHORITY:
          if (chr == '/' && codePoints[pointer + 1] == '/') {
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
            pointer++;
          } else {
            state = RELATIVE;
            continue;
          } break;

        case PATH_OR_AUTHORITY:
          if (chr == '/') {
            state = AUTHORITY;
            break;
          } else {
            state = PATH;
            continue;
          }

        case RELATIVE:
          url.scheme = base.scheme;
          if (chr == EOF) {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.query = base.query;
          } else if (chr == '/' || (chr == '\\' && url.isSpecial())) {
            state = RELATIVE_SLASH;
          } else if (chr == '?') {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.query = '';
            state = QUERY;
          } else if (chr == '#') {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.query = base.query;
            url.fragment = '';
            state = FRAGMENT;
          } else {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.path.length--;
            state = PATH;
            continue;
          } break;

        case RELATIVE_SLASH:
          if (url.isSpecial() && (chr == '/' || chr == '\\')) {
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          } else if (chr == '/') {
            state = AUTHORITY;
          } else {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            state = PATH;
            continue;
          } break;

        case SPECIAL_AUTHORITY_SLASHES:
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          if (chr != '/' || charAt(buffer, pointer + 1) != '/') continue;
          pointer++;
          break;

        case SPECIAL_AUTHORITY_IGNORE_SLASHES:
          if (chr != '/' && chr != '\\') {
            state = AUTHORITY;
            continue;
          } break;

        case AUTHORITY:
          if (chr == '@') {
            if (seenAt) buffer = '%40' + buffer;
            seenAt = true;
            bufferCodePoints = arrayFrom(buffer);
            for (var i = 0; i < bufferCodePoints.length; i++) {
              var codePoint = bufferCodePoints[i];
              if (codePoint == ':' && !seenPasswordToken) {
                seenPasswordToken = true;
                continue;
              }
              var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
              if (seenPasswordToken) url.password += encodedCodePoints;
              else url.username += encodedCodePoints;
            }
            buffer = '';
          } else if (
            chr == EOF || chr == '/' || chr == '?' || chr == '#' ||
            (chr == '\\' && url.isSpecial())
          ) {
            if (seenAt && buffer == '') return INVALID_AUTHORITY;
            pointer -= arrayFrom(buffer).length + 1;
            buffer = '';
            state = HOST;
          } else buffer += chr;
          break;

        case HOST:
        case HOSTNAME:
          if (stateOverride && url.scheme == 'file') {
            state = FILE_HOST;
            continue;
          } else if (chr == ':' && !seenBracket) {
            if (buffer == '') return INVALID_HOST;
            failure = url.parseHost(buffer);
            if (failure) return failure;
            buffer = '';
            state = PORT;
            if (stateOverride == HOSTNAME) return;
          } else if (
            chr == EOF || chr == '/' || chr == '?' || chr == '#' ||
            (chr == '\\' && url.isSpecial())
          ) {
            if (url.isSpecial() && buffer == '') return INVALID_HOST;
            if (stateOverride && buffer == '' && (url.includesCredentials() || url.port !== null)) return;
            failure = url.parseHost(buffer);
            if (failure) return failure;
            buffer = '';
            state = PATH_START;
            if (stateOverride) return;
            continue;
          } else {
            if (chr == '[') seenBracket = true;
            else if (chr == ']') seenBracket = false;
            buffer += chr;
          } break;

        case PORT:
          if (exec(DIGIT, chr)) {
            buffer += chr;
          } else if (
            chr == EOF || chr == '/' || chr == '?' || chr == '#' ||
            (chr == '\\' && url.isSpecial()) ||
            stateOverride
          ) {
            if (buffer != '') {
              var port = parseInt(buffer, 10);
              if (port > 0xFFFF) return INVALID_PORT;
              url.port = (url.isSpecial() && port === specialSchemes[url.scheme]) ? null : port;
              buffer = '';
            }
            if (stateOverride) return;
            state = PATH_START;
            continue;
          } else return INVALID_PORT;
          break;

        case FILE:
          url.scheme = 'file';
          if (chr == '/' || chr == '\\') state = FILE_SLASH;
          else if (base && base.scheme == 'file') {
            if (chr == EOF) {
              url.host = base.host;
              url.path = arraySlice(base.path);
              url.query = base.query;
            } else if (chr == '?') {
              url.host = base.host;
              url.path = arraySlice(base.path);
              url.query = '';
              state = QUERY;
            } else if (chr == '#') {
              url.host = base.host;
              url.path = arraySlice(base.path);
              url.query = base.query;
              url.fragment = '';
              state = FRAGMENT;
            } else {
              if (!startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
                url.host = base.host;
                url.path = arraySlice(base.path);
                url.shortenPath();
              }
              state = PATH;
              continue;
            }
          } else {
            state = PATH;
            continue;
          } break;

        case FILE_SLASH:
          if (chr == '/' || chr == '\\') {
            state = FILE_HOST;
            break;
          }
          if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
            if (isWindowsDriveLetter(base.path[0], true)) push(url.path, base.path[0]);
            else url.host = base.host;
          }
          state = PATH;
          continue;

        case FILE_HOST:
          if (chr == EOF || chr == '/' || chr == '\\' || chr == '?' || chr == '#') {
            if (!stateOverride && isWindowsDriveLetter(buffer)) {
              state = PATH;
            } else if (buffer == '') {
              url.host = '';
              if (stateOverride) return;
              state = PATH_START;
            } else {
              failure = url.parseHost(buffer);
              if (failure) return failure;
              if (url.host == 'localhost') url.host = '';
              if (stateOverride) return;
              buffer = '';
              state = PATH_START;
            } continue;
          } else buffer += chr;
          break;

        case PATH_START:
          if (url.isSpecial()) {
            state = PATH;
            if (chr != '/' && chr != '\\') continue;
          } else if (!stateOverride && chr == '?') {
            url.query = '';
            state = QUERY;
          } else if (!stateOverride && chr == '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (chr != EOF) {
            state = PATH;
            if (chr != '/') continue;
          } break;

        case PATH:
          if (
            chr == EOF || chr == '/' ||
            (chr == '\\' && url.isSpecial()) ||
            (!stateOverride && (chr == '?' || chr == '#'))
          ) {
            if (isDoubleDot(buffer)) {
              url.shortenPath();
              if (chr != '/' && !(chr == '\\' && url.isSpecial())) {
                push(url.path, '');
              }
            } else if (isSingleDot(buffer)) {
              if (chr != '/' && !(chr == '\\' && url.isSpecial())) {
                push(url.path, '');
              }
            } else {
              if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
                if (url.host) url.host = '';
                buffer = charAt(buffer, 0) + ':'; // normalize windows drive letter
              }
              push(url.path, buffer);
            }
            buffer = '';
            if (url.scheme == 'file' && (chr == EOF || chr == '?' || chr == '#')) {
              while (url.path.length > 1 && url.path[0] === '') {
                shift(url.path);
              }
            }
            if (chr == '?') {
              url.query = '';
              state = QUERY;
            } else if (chr == '#') {
              url.fragment = '';
              state = FRAGMENT;
            }
          } else {
            buffer += percentEncode(chr, pathPercentEncodeSet);
          } break;

        case CANNOT_BE_A_BASE_URL_PATH:
          if (chr == '?') {
            url.query = '';
            state = QUERY;
          } else if (chr == '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (chr != EOF) {
            url.path[0] += percentEncode(chr, C0ControlPercentEncodeSet);
          } break;

        case QUERY:
          if (!stateOverride && chr == '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (chr != EOF) {
            if (chr == "'" && url.isSpecial()) url.query += '%27';
            else if (chr == '#') url.query += '%23';
            else url.query += percentEncode(chr, C0ControlPercentEncodeSet);
          } break;

        case FRAGMENT:
          if (chr != EOF) url.fragment += percentEncode(chr, fragmentPercentEncodeSet);
          break;
      }

      pointer++;
    }
  },
  // https://url.spec.whatwg.org/#host-parsing
  parseHost: function (input) {
    var result, codePoints, index;
    if (charAt(input, 0) == '[') {
      if (charAt(input, input.length - 1) != ']') return INVALID_HOST;
      result = parseIPv6(stringSlice(input, 1, -1));
      if (!result) return INVALID_HOST;
      this.host = result;
    // opaque host
    } else if (!this.isSpecial()) {
      if (exec(FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT, input)) return INVALID_HOST;
      result = '';
      codePoints = arrayFrom(input);
      for (index = 0; index < codePoints.length; index++) {
        result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
      }
      this.host = result;
    } else {
      input = toASCII(input);
      if (exec(FORBIDDEN_HOST_CODE_POINT, input)) return INVALID_HOST;
      result = parseIPv4(input);
      if (result === null) return INVALID_HOST;
      this.host = result;
    }
  },
  // https://url.spec.whatwg.org/#cannot-have-a-username-password-port
  cannotHaveUsernamePasswordPort: function () {
    return !this.host || this.cannotBeABaseURL || this.scheme == 'file';
  },
  // https://url.spec.whatwg.org/#include-credentials
  includesCredentials: function () {
    return this.username != '' || this.password != '';
  },
  // https://url.spec.whatwg.org/#is-special
  isSpecial: function () {
    return hasOwn(specialSchemes, this.scheme);
  },
  // https://url.spec.whatwg.org/#shorten-a-urls-path
  shortenPath: function () {
    var path = this.path;
    var pathSize = path.length;
    if (pathSize && (this.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
      path.length--;
    }
  },
  // https://url.spec.whatwg.org/#concept-url-serializer
  serialize: function () {
    var url = this;
    var scheme = url.scheme;
    var username = url.username;
    var password = url.password;
    var host = url.host;
    var port = url.port;
    var path = url.path;
    var query = url.query;
    var fragment = url.fragment;
    var output = scheme + ':';
    if (host !== null) {
      output += '//';
      if (url.includesCredentials()) {
        output += username + (password ? ':' + password : '') + '@';
      }
      output += serializeHost(host);
      if (port !== null) output += ':' + port;
    } else if (scheme == 'file') output += '//';
    output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
    if (query !== null) output += '?' + query;
    if (fragment !== null) output += '#' + fragment;
    return output;
  },
  // https://url.spec.whatwg.org/#dom-url-href
  setHref: function (href) {
    var failure = this.parse(href);
    if (failure) throw TypeError(failure);
    this.searchParams.update();
  },
  // https://url.spec.whatwg.org/#dom-url-origin
  getOrigin: function () {
    var scheme = this.scheme;
    var port = this.port;
    if (scheme == 'blob') try {
      return new URLConstructor(scheme.path[0]).origin;
    } catch (error) {
      return 'null';
    }
    if (scheme == 'file' || !this.isSpecial()) return 'null';
    return scheme + '://' + serializeHost(this.host) + (port !== null ? ':' + port : '');
  },
  // https://url.spec.whatwg.org/#dom-url-protocol
  getProtocol: function () {
    return this.scheme + ':';
  },
  setProtocol: function (protocol) {
    this.parse($toString(protocol) + ':', SCHEME_START);
  },
  // https://url.spec.whatwg.org/#dom-url-username
  getUsername: function () {
    return this.username;
  },
  setUsername: function (username) {
    var codePoints = arrayFrom($toString(username));
    if (this.cannotHaveUsernamePasswordPort()) return;
    this.username = '';
    for (var i = 0; i < codePoints.length; i++) {
      this.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
    }
  },
  // https://url.spec.whatwg.org/#dom-url-password
  getPassword: function () {
    return this.password;
  },
  setPassword: function (password) {
    var codePoints = arrayFrom($toString(password));
    if (this.cannotHaveUsernamePasswordPort()) return;
    this.password = '';
    for (var i = 0; i < codePoints.length; i++) {
      this.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
    }
  },
  // https://url.spec.whatwg.org/#dom-url-host
  getHost: function () {
    var host = this.host;
    var port = this.port;
    return host === null ? ''
      : port === null ? serializeHost(host)
      : serializeHost(host) + ':' + port;
  },
  setHost: function (host) {
    if (this.cannotBeABaseURL) return;
    this.parse(host, HOST);
  },
  // https://url.spec.whatwg.org/#dom-url-hostname
  getHostname: function () {
    var host = this.host;
    return host === null ? '' : serializeHost(host);
  },
  setHostname: function (hostname) {
    if (this.cannotBeABaseURL) return;
    this.parse(hostname, HOSTNAME);
  },
  // https://url.spec.whatwg.org/#dom-url-port
  getPort: function () {
    var port = this.port;
    return port === null ? '' : $toString(port);
  },
  setPort: function (port) {
    if (this.cannotHaveUsernamePasswordPort()) return;
    port = $toString(port);
    if (port == '') this.port = null;
    else this.parse(port, PORT);
  },
  // https://url.spec.whatwg.org/#dom-url-pathname
  getPathname: function () {
    var path = this.path;
    return this.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
  },
  setPathname: function (pathname) {
    if (this.cannotBeABaseURL) return;
    this.path = [];
    this.parse(pathname, PATH_START);
  },
  // https://url.spec.whatwg.org/#dom-url-search
  getSearch: function () {
    var query = this.query;
    return query ? '?' + query : '';
  },
  setSearch: function (search) {
    search = $toString(search);
    if (search == '') {
      this.query = null;
    } else {
      if ('?' == charAt(search, 0)) search = stringSlice(search, 1);
      this.query = '';
      this.parse(search, QUERY);
    }
    this.searchParams.update();
  },
  // https://url.spec.whatwg.org/#dom-url-searchparams
  getSearchParams: function () {
    return this.searchParams.facade;
  },
  // https://url.spec.whatwg.org/#dom-url-hash
  getHash: function () {
    var fragment = this.fragment;
    return fragment ? '#' + fragment : '';
  },
  setHash: function (hash) {
    hash = $toString(hash);
    if (hash == '') {
      this.fragment = null;
      return;
    }
    if ('#' == charAt(hash, 0)) hash = stringSlice(hash, 1);
    this.fragment = '';
    this.parse(hash, FRAGMENT);
  },
  update: function () {
    this.query = this.searchParams.serialize() || null;
  }
};

// `URL` constructor
// https://url.spec.whatwg.org/#url-class
var URLConstructor = function URL(url /* , base */) {
  var that = anInstance(this, URLPrototype);
  var base = validateArgumentsLength(arguments.length, 1) > 1 ? arguments[1] : undefined;
  var state = setInternalState(that, new URLState(url, false, base));
  if (!DESCRIPTORS) {
    that.href = state.serialize();
    that.origin = state.getOrigin();
    that.protocol = state.getProtocol();
    that.username = state.getUsername();
    that.password = state.getPassword();
    that.host = state.getHost();
    that.hostname = state.getHostname();
    that.port = state.getPort();
    that.pathname = state.getPathname();
    that.search = state.getSearch();
    that.searchParams = state.getSearchParams();
    that.hash = state.getHash();
  }
};

var URLPrototype = URLConstructor.prototype;

var accessorDescriptor = function (getter, setter) {
  return {
    get: function () {
      return getInternalURLState(this)[getter]();
    },
    set: setter && function (value) {
      return getInternalURLState(this)[setter](value);
    },
    configurable: true,
    enumerable: true
  };
};

if (DESCRIPTORS) {
  // `URL.prototype.href` accessors pair
  // https://url.spec.whatwg.org/#dom-url-href
  defineBuiltInAccessor(URLPrototype, 'href', accessorDescriptor('serialize', 'setHref'));
  // `URL.prototype.origin` getter
  // https://url.spec.whatwg.org/#dom-url-origin
  defineBuiltInAccessor(URLPrototype, 'origin', accessorDescriptor('getOrigin'));
  // `URL.prototype.protocol` accessors pair
  // https://url.spec.whatwg.org/#dom-url-protocol
  defineBuiltInAccessor(URLPrototype, 'protocol', accessorDescriptor('getProtocol', 'setProtocol'));
  // `URL.prototype.username` accessors pair
  // https://url.spec.whatwg.org/#dom-url-username
  defineBuiltInAccessor(URLPrototype, 'username', accessorDescriptor('getUsername', 'setUsername'));
  // `URL.prototype.password` accessors pair
  // https://url.spec.whatwg.org/#dom-url-password
  defineBuiltInAccessor(URLPrototype, 'password', accessorDescriptor('getPassword', 'setPassword'));
  // `URL.prototype.host` accessors pair
  // https://url.spec.whatwg.org/#dom-url-host
  defineBuiltInAccessor(URLPrototype, 'host', accessorDescriptor('getHost', 'setHost'));
  // `URL.prototype.hostname` accessors pair
  // https://url.spec.whatwg.org/#dom-url-hostname
  defineBuiltInAccessor(URLPrototype, 'hostname', accessorDescriptor('getHostname', 'setHostname'));
  // `URL.prototype.port` accessors pair
  // https://url.spec.whatwg.org/#dom-url-port
  defineBuiltInAccessor(URLPrototype, 'port', accessorDescriptor('getPort', 'setPort'));
  // `URL.prototype.pathname` accessors pair
  // https://url.spec.whatwg.org/#dom-url-pathname
  defineBuiltInAccessor(URLPrototype, 'pathname', accessorDescriptor('getPathname', 'setPathname'));
  // `URL.prototype.search` accessors pair
  // https://url.spec.whatwg.org/#dom-url-search
  defineBuiltInAccessor(URLPrototype, 'search', accessorDescriptor('getSearch', 'setSearch'));
  // `URL.prototype.searchParams` getter
  // https://url.spec.whatwg.org/#dom-url-searchparams
  defineBuiltInAccessor(URLPrototype, 'searchParams', accessorDescriptor('getSearchParams'));
  // `URL.prototype.hash` accessors pair
  // https://url.spec.whatwg.org/#dom-url-hash
  defineBuiltInAccessor(URLPrototype, 'hash', accessorDescriptor('getHash', 'setHash'));
}

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
defineBuiltIn(URLPrototype, 'toJSON', function toJSON() {
  return getInternalURLState(this).serialize();
}, { enumerable: true });

// `URL.prototype.toString` method
// https://url.spec.whatwg.org/#URL-stringification-behavior
defineBuiltIn(URLPrototype, 'toString', function toString() {
  return getInternalURLState(this).serialize();
}, { enumerable: true });

if (NativeURL) {
  var nativeCreateObjectURL = NativeURL.createObjectURL;
  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
  // `URL.createObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
  if (nativeCreateObjectURL) defineBuiltIn(URLConstructor, 'createObjectURL', bind(nativeCreateObjectURL, NativeURL));
  // `URL.revokeObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
  if (nativeRevokeObjectURL) defineBuiltIn(URLConstructor, 'revokeObjectURL', bind(nativeRevokeObjectURL, NativeURL));
}

setToStringTag(URLConstructor, 'URL');

$({ global: true, constructor: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS }, {
  URL: URLConstructor
});


/***/ }),

/***/ "408a":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");

// `thisNumberValue` abstract operation
// https://tc39.es/ecma262/#sec-thisnumbervalue
module.exports = uncurryThis(1.0.valueOf);


/***/ }),

/***/ "40d5":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ "4128":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.start = exports.run = exports.TOKENS = exports.State = undefined;

var _state = __webpack_require__("1652");

var _multi = __webpack_require__("bea1");

var MULTI_TOKENS = _interopRequireWildcard(_multi);

var _text = __webpack_require__("7656");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
	Not exactly parser, more like the second-stage scanner (although we can
	theoretically hotswap the code here with a real parser in the future... but
	for a little URL-finding utility abstract syntax trees may be a little
	overkill).

	URL format: http://en.wikipedia.org/wiki/URI_scheme
	Email format: http://en.wikipedia.org/wiki/Email_address (links to RFC in
	reference)

	@module linkify
	@submodule parser
	@main parser
*/

var makeState = function makeState(tokenClass) {
	return new _state.TokenState(tokenClass);
};

// The universal starting state.
var S_START = makeState();

// Intermediate states for URLs. Note that domains that begin with a protocol
// are treated slighly differently from those that don't.
var S_PROTOCOL = makeState(); // e.g., 'http:'
var S_MAILTO = makeState(); // 'mailto:'
var S_PROTOCOL_SLASH = makeState(); // e.g., '/', 'http:/''
var S_PROTOCOL_SLASH_SLASH = makeState(); // e.g., '//', 'http://'
var S_DOMAIN = makeState(); // parsed string ends with a potential domain name (A)
var S_DOMAIN_DOT = makeState(); // (A) domain followed by DOT
var S_TLD = makeState(_multi.URL); // (A) Simplest possible URL with no query string
var S_TLD_COLON = makeState(); // (A) URL followed by colon (potential port number here)
var S_TLD_PORT = makeState(_multi.URL); // TLD followed by a port number
var S_URL = makeState(_multi.URL); // Long URL with optional port and maybe query string
var S_URL_NON_ACCEPTING = makeState(); // URL followed by some symbols (will not be part of the final URL)
var S_URL_OPENBRACE = makeState(); // URL followed by {
var S_URL_OPENBRACKET = makeState(); // URL followed by [
var S_URL_OPENANGLEBRACKET = makeState(); // URL followed by <
var S_URL_OPENPAREN = makeState(); // URL followed by (
var S_URL_OPENBRACE_Q = makeState(_multi.URL); // URL followed by { and some symbols that the URL can end it
var S_URL_OPENBRACKET_Q = makeState(_multi.URL); // URL followed by [ and some symbols that the URL can end it
var S_URL_OPENANGLEBRACKET_Q = makeState(_multi.URL); // URL followed by < and some symbols that the URL can end it
var S_URL_OPENPAREN_Q = makeState(_multi.URL); // URL followed by ( and some symbols that the URL can end it
var S_URL_OPENBRACE_SYMS = makeState(); // S_URL_OPENBRACE_Q followed by some symbols it cannot end it
var S_URL_OPENBRACKET_SYMS = makeState(); // S_URL_OPENBRACKET_Q followed by some symbols it cannot end it
var S_URL_OPENANGLEBRACKET_SYMS = makeState(); // S_URL_OPENANGLEBRACKET_Q followed by some symbols it cannot end it
var S_URL_OPENPAREN_SYMS = makeState(); // S_URL_OPENPAREN_Q followed by some symbols it cannot end it
var S_EMAIL_DOMAIN = makeState(); // parsed string starts with local email info + @ with a potential domain name (C)
var S_EMAIL_DOMAIN_DOT = makeState(); // (C) domain followed by DOT
var S_EMAIL = makeState(_multi.EMAIL); // (C) Possible email address (could have more tlds)
var S_EMAIL_COLON = makeState(); // (C) URL followed by colon (potential port number here)
var S_EMAIL_PORT = makeState(_multi.EMAIL); // (C) Email address with a port
var S_MAILTO_EMAIL = makeState(_multi.MAILTOEMAIL); // Email that begins with the mailto prefix (D)
var S_MAILTO_EMAIL_NON_ACCEPTING = makeState(); // (D) Followed by some non-query string chars
var S_LOCALPART = makeState(); // Local part of the email address
var S_LOCALPART_AT = makeState(); // Local part of the email address plus @
var S_LOCALPART_DOT = makeState(); // Local part of the email address plus '.' (localpart cannot end in .)
var S_NL = makeState(_multi.NL); // single new line

// Make path from start to protocol (with '//')
S_START.on(_text.NL, S_NL).on(_text.PROTOCOL, S_PROTOCOL).on(_text.MAILTO, S_MAILTO).on(_text.SLASH, S_PROTOCOL_SLASH);

S_PROTOCOL.on(_text.SLASH, S_PROTOCOL_SLASH);
S_PROTOCOL_SLASH.on(_text.SLASH, S_PROTOCOL_SLASH_SLASH);

// The very first potential domain name
S_START.on(_text.TLD, S_DOMAIN).on(_text.DOMAIN, S_DOMAIN).on(_text.LOCALHOST, S_TLD).on(_text.NUM, S_DOMAIN);

// Force URL for protocol followed by anything sane
S_PROTOCOL_SLASH_SLASH.on(_text.TLD, S_URL).on(_text.DOMAIN, S_URL).on(_text.NUM, S_URL).on(_text.LOCALHOST, S_URL);

// Account for dots and hyphens
// hyphens are usually parts of domain names
S_DOMAIN.on(_text.DOT, S_DOMAIN_DOT);
S_EMAIL_DOMAIN.on(_text.DOT, S_EMAIL_DOMAIN_DOT);

// Hyphen can jump back to a domain name

// After the first domain and a dot, we can find either a URL or another domain
S_DOMAIN_DOT.on(_text.TLD, S_TLD).on(_text.DOMAIN, S_DOMAIN).on(_text.NUM, S_DOMAIN).on(_text.LOCALHOST, S_DOMAIN);

S_EMAIL_DOMAIN_DOT.on(_text.TLD, S_EMAIL).on(_text.DOMAIN, S_EMAIL_DOMAIN).on(_text.NUM, S_EMAIL_DOMAIN).on(_text.LOCALHOST, S_EMAIL_DOMAIN);

// S_TLD accepts! But the URL could be longer, try to find a match greedily
// The `run` function should be able to "rollback" to the accepting state
S_TLD.on(_text.DOT, S_DOMAIN_DOT);
S_EMAIL.on(_text.DOT, S_EMAIL_DOMAIN_DOT);

// Become real URLs after `SLASH` or `COLON NUM SLASH`
// Here PSS and non-PSS converge
S_TLD.on(_text.COLON, S_TLD_COLON).on(_text.SLASH, S_URL);
S_TLD_COLON.on(_text.NUM, S_TLD_PORT);
S_TLD_PORT.on(_text.SLASH, S_URL);
S_EMAIL.on(_text.COLON, S_EMAIL_COLON);
S_EMAIL_COLON.on(_text.NUM, S_EMAIL_PORT);

// Types of characters the URL can definitely end in
var qsAccepting = [_text.DOMAIN, _text.AT, _text.LOCALHOST, _text.NUM, _text.PLUS, _text.POUND, _text.PROTOCOL, _text.SLASH, _text.TLD, _text.UNDERSCORE, _text.SYM, _text.AMPERSAND];

// Types of tokens that can follow a URL and be part of the query string
// but cannot be the very last characters
// Characters that cannot appear in the URL at all should be excluded
var qsNonAccepting = [_text.COLON, _text.DOT, _text.QUERY, _text.PUNCTUATION, _text.CLOSEBRACE, _text.CLOSEBRACKET, _text.CLOSEANGLEBRACKET, _text.CLOSEPAREN, _text.OPENBRACE, _text.OPENBRACKET, _text.OPENANGLEBRACKET, _text.OPENPAREN];

// These states are responsible primarily for determining whether or not to
// include the final round bracket.

// URL, followed by an opening bracket
S_URL.on(_text.OPENBRACE, S_URL_OPENBRACE).on(_text.OPENBRACKET, S_URL_OPENBRACKET).on(_text.OPENANGLEBRACKET, S_URL_OPENANGLEBRACKET).on(_text.OPENPAREN, S_URL_OPENPAREN);

// URL with extra symbols at the end, followed by an opening bracket
S_URL_NON_ACCEPTING.on(_text.OPENBRACE, S_URL_OPENBRACE).on(_text.OPENBRACKET, S_URL_OPENBRACKET).on(_text.OPENANGLEBRACKET, S_URL_OPENANGLEBRACKET).on(_text.OPENPAREN, S_URL_OPENPAREN);

// Closing bracket component. This character WILL be included in the URL
S_URL_OPENBRACE.on(_text.CLOSEBRACE, S_URL);
S_URL_OPENBRACKET.on(_text.CLOSEBRACKET, S_URL);
S_URL_OPENANGLEBRACKET.on(_text.CLOSEANGLEBRACKET, S_URL);
S_URL_OPENPAREN.on(_text.CLOSEPAREN, S_URL);
S_URL_OPENBRACE_Q.on(_text.CLOSEBRACE, S_URL);
S_URL_OPENBRACKET_Q.on(_text.CLOSEBRACKET, S_URL);
S_URL_OPENANGLEBRACKET_Q.on(_text.CLOSEANGLEBRACKET, S_URL);
S_URL_OPENPAREN_Q.on(_text.CLOSEPAREN, S_URL);
S_URL_OPENBRACE_SYMS.on(_text.CLOSEBRACE, S_URL);
S_URL_OPENBRACKET_SYMS.on(_text.CLOSEBRACKET, S_URL);
S_URL_OPENANGLEBRACKET_SYMS.on(_text.CLOSEANGLEBRACKET, S_URL);
S_URL_OPENPAREN_SYMS.on(_text.CLOSEPAREN, S_URL);

// URL that beings with an opening bracket, followed by a symbols.
// Note that the final state can still be `S_URL_OPENBRACE_Q` (if the URL only
// has a single opening bracket for some reason).
S_URL_OPENBRACE.on(qsAccepting, S_URL_OPENBRACE_Q);
S_URL_OPENBRACKET.on(qsAccepting, S_URL_OPENBRACKET_Q);
S_URL_OPENANGLEBRACKET.on(qsAccepting, S_URL_OPENANGLEBRACKET_Q);
S_URL_OPENPAREN.on(qsAccepting, S_URL_OPENPAREN_Q);
S_URL_OPENBRACE.on(qsNonAccepting, S_URL_OPENBRACE_SYMS);
S_URL_OPENBRACKET.on(qsNonAccepting, S_URL_OPENBRACKET_SYMS);
S_URL_OPENANGLEBRACKET.on(qsNonAccepting, S_URL_OPENANGLEBRACKET_SYMS);
S_URL_OPENPAREN.on(qsNonAccepting, S_URL_OPENPAREN_SYMS);

// URL that begins with an opening bracket, followed by some symbols
S_URL_OPENBRACE_Q.on(qsAccepting, S_URL_OPENBRACE_Q);
S_URL_OPENBRACKET_Q.on(qsAccepting, S_URL_OPENBRACKET_Q);
S_URL_OPENANGLEBRACKET_Q.on(qsAccepting, S_URL_OPENANGLEBRACKET_Q);
S_URL_OPENPAREN_Q.on(qsAccepting, S_URL_OPENPAREN_Q);
S_URL_OPENBRACE_Q.on(qsNonAccepting, S_URL_OPENBRACE_Q);
S_URL_OPENBRACKET_Q.on(qsNonAccepting, S_URL_OPENBRACKET_Q);
S_URL_OPENANGLEBRACKET_Q.on(qsNonAccepting, S_URL_OPENANGLEBRACKET_Q);
S_URL_OPENPAREN_Q.on(qsNonAccepting, S_URL_OPENPAREN_Q);

S_URL_OPENBRACE_SYMS.on(qsAccepting, S_URL_OPENBRACE_Q);
S_URL_OPENBRACKET_SYMS.on(qsAccepting, S_URL_OPENBRACKET_Q);
S_URL_OPENANGLEBRACKET_SYMS.on(qsAccepting, S_URL_OPENANGLEBRACKET_Q);
S_URL_OPENPAREN_SYMS.on(qsAccepting, S_URL_OPENPAREN_Q);
S_URL_OPENBRACE_SYMS.on(qsNonAccepting, S_URL_OPENBRACE_SYMS);
S_URL_OPENBRACKET_SYMS.on(qsNonAccepting, S_URL_OPENBRACKET_SYMS);
S_URL_OPENANGLEBRACKET_SYMS.on(qsNonAccepting, S_URL_OPENANGLEBRACKET_SYMS);
S_URL_OPENPAREN_SYMS.on(qsNonAccepting, S_URL_OPENPAREN_SYMS);

// Account for the query string
S_URL.on(qsAccepting, S_URL);
S_URL_NON_ACCEPTING.on(qsAccepting, S_URL);

S_URL.on(qsNonAccepting, S_URL_NON_ACCEPTING);
S_URL_NON_ACCEPTING.on(qsNonAccepting, S_URL_NON_ACCEPTING);

// Email address-specific state definitions
// Note: We are not allowing '/' in email addresses since this would interfere
// with real URLs

// For addresses with the mailto prefix
// 'mailto:' followed by anything sane is a valid email
S_MAILTO.on(_text.TLD, S_MAILTO_EMAIL).on(_text.DOMAIN, S_MAILTO_EMAIL).on(_text.NUM, S_MAILTO_EMAIL).on(_text.LOCALHOST, S_MAILTO_EMAIL);

// Greedily get more potential valid email values
S_MAILTO_EMAIL.on(qsAccepting, S_MAILTO_EMAIL).on(qsNonAccepting, S_MAILTO_EMAIL_NON_ACCEPTING);
S_MAILTO_EMAIL_NON_ACCEPTING.on(qsAccepting, S_MAILTO_EMAIL).on(qsNonAccepting, S_MAILTO_EMAIL_NON_ACCEPTING);

// For addresses without the mailto prefix
// Tokens allowed in the localpart of the email
var localpartAccepting = [_text.DOMAIN, _text.NUM, _text.PLUS, _text.POUND, _text.QUERY, _text.UNDERSCORE, _text.SYM, _text.AMPERSAND, _text.TLD];

// Some of the tokens in `localpartAccepting` are already accounted for here and
// will not be overwritten (don't worry)
S_DOMAIN.on(localpartAccepting, S_LOCALPART).on(_text.AT, S_LOCALPART_AT);
S_TLD.on(localpartAccepting, S_LOCALPART).on(_text.AT, S_LOCALPART_AT);
S_DOMAIN_DOT.on(localpartAccepting, S_LOCALPART);

// Okay we're on a localpart. Now what?
// TODO: IP addresses and what if the email starts with numbers?
S_LOCALPART.on(localpartAccepting, S_LOCALPART).on(_text.AT, S_LOCALPART_AT) // close to an email address now
.on(_text.DOT, S_LOCALPART_DOT);
S_LOCALPART_DOT.on(localpartAccepting, S_LOCALPART);
S_LOCALPART_AT.on(_text.TLD, S_EMAIL_DOMAIN).on(_text.DOMAIN, S_EMAIL_DOMAIN).on(_text.LOCALHOST, S_EMAIL);
// States following `@` defined above

var run = function run(tokens) {
	var len = tokens.length;
	var cursor = 0;
	var multis = [];
	var textTokens = [];

	while (cursor < len) {
		var state = S_START;
		var secondState = null;
		var nextState = null;
		var multiLength = 0;
		var latestAccepting = null;
		var sinceAccepts = -1;

		while (cursor < len && !(secondState = state.next(tokens[cursor]))) {
			// Starting tokens with nowhere to jump to.
			// Consider these to be just plain text
			textTokens.push(tokens[cursor++]);
		}

		while (cursor < len && (nextState = secondState || state.next(tokens[cursor]))) {

			// Get the next state
			secondState = null;
			state = nextState;

			// Keep track of the latest accepting state
			if (state.accepts()) {
				sinceAccepts = 0;
				latestAccepting = state;
			} else if (sinceAccepts >= 0) {
				sinceAccepts++;
			}

			cursor++;
			multiLength++;
		}

		if (sinceAccepts < 0) {

			// No accepting state was found, part of a regular text token
			// Add all the tokens we looked at to the text tokens array
			for (var i = cursor - multiLength; i < cursor; i++) {
				textTokens.push(tokens[i]);
			}
		} else {

			// Accepting state!

			// First close off the textTokens (if available)
			if (textTokens.length > 0) {
				multis.push(new _multi.TEXT(textTokens));
				textTokens = [];
			}

			// Roll back to the latest accepting state
			cursor -= sinceAccepts;
			multiLength -= sinceAccepts;

			// Create a new multitoken
			var MULTI = latestAccepting.emit();
			multis.push(new MULTI(tokens.slice(cursor - multiLength, cursor)));
		}
	}

	// Finally close off the textTokens (if available)
	if (textTokens.length > 0) {
		multis.push(new _multi.TEXT(textTokens));
	}

	return multis;
};

exports.State = _state.TokenState;
exports.TOKENS = MULTI_TOKENS;
exports.run = run;
exports.start = S_START;

/***/ }),

/***/ "4160":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var forEach = __webpack_require__("17c2");

// `Array.prototype.forEach` method
// https://tc39.es/ecma262/#sec-array.prototype.foreach
// eslint-disable-next-line es-x/no-array-prototype-foreach -- safe
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});


/***/ }),

/***/ "428f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

module.exports = global;


/***/ }),

/***/ "44ad":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");
var fails = __webpack_require__("d039");
var classof = __webpack_require__("c6b6");

var Object = global.Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "44d2":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");
var create = __webpack_require__("7c73");
var defineProperty = __webpack_require__("9bf2").f;

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  defineProperty(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "44de":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

module.exports = function (a, b) {
  var console = global.console;
  if (console && console.error) {
    arguments.length == 1 ? console.error(a) : console.error(a, b);
  }
};


/***/ }),

/***/ "44e7":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var classof = __webpack_require__("c6b6");
var wellKnownSymbol = __webpack_require__("b622");

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ "45fc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $some = __webpack_require__("b727").some;
var arrayMethodIsStrict = __webpack_require__("a640");

var STRICT_METHOD = arrayMethodIsStrict('some');

// `Array.prototype.some` method
// https://tc39.es/ecma262/#sec-array.prototype.some
$({ target: 'Array', proto: true, forced: !STRICT_METHOD }, {
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "466d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var call = __webpack_require__("c65b");
var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var anObject = __webpack_require__("825a");
var toLength = __webpack_require__("50c4");
var toString = __webpack_require__("577e");
var requireObjectCoercible = __webpack_require__("1d80");
var getMethod = __webpack_require__("dc4a");
var advanceStringIndex = __webpack_require__("8aa5");
var regExpExec = __webpack_require__("14c3");

// @@match logic
fixRegExpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : getMethod(regexp, MATCH);
      return matcher ? call(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function (string) {
      var rx = anObject(this);
      var S = toString(string);
      var res = maybeCallNative(nativeMatch, rx, S);

      if (res.done) return res.value;

      if (!rx.global) return regExpExec(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = toString(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),

/***/ "46f3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function createTokenClass() {
	return function (value) {
		if (value) {
			this.v = value;
		}
	};
}

exports.createTokenClass = createTokenClass;

/***/ }),

/***/ "4738":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var NativePromiseConstructor = __webpack_require__("d256");
var isCallable = __webpack_require__("1626");
var isForced = __webpack_require__("94ca");
var inspectSource = __webpack_require__("8925");
var wellKnownSymbol = __webpack_require__("b622");
var IS_BROWSER = __webpack_require__("6069");
var IS_PURE = __webpack_require__("c430");
var V8_VERSION = __webpack_require__("2d00");

var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;
var SPECIES = wellKnownSymbol('species');
var SUBCLASSING = false;
var NATIVE_PROMISE_REJECTION_EVENT = isCallable(global.PromiseRejectionEvent);

var FORCED_PROMISE_CONSTRUCTOR = isForced('Promise', function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
  // We need Promise#{ catch, finally } in the pure version for preventing prototype pollution
  if (IS_PURE && !(NativePromisePrototype['catch'] && NativePromisePrototype['finally'])) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = new NativePromiseConstructor(function (resolve) { resolve(1); });
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
  if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_PROMISE_REJECTION_EVENT;
});

module.exports = {
  CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR,
  REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT,
  SUBCLASSING: SUBCLASSING
};


/***/ }),

/***/ "4795":
/***/ (function(module, exports, __webpack_require__) {

// TODO: Remove this module from `core-js@4` since it's split to modules listed below
__webpack_require__("2ca8");
__webpack_require__("1d57");


/***/ }),

/***/ "4840":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var aConstructor = __webpack_require__("5087");
var wellKnownSymbol = __webpack_require__("b622");

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aConstructor(S);
};


/***/ }),

/***/ "485a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var call = __webpack_require__("c65b");
var isCallable = __webpack_require__("1626");
var isObject = __webpack_require__("861d");

var TypeError = global.TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "4930":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable es-x/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__("2d00");
var fails = __webpack_require__("d039");

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ "498a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $trim = __webpack_require__("58a8").trim;
var forcedStringTrimMethod = __webpack_require__("c8d2");

// `String.prototype.trim` method
// https://tc39.es/ecma262/#sec-string.prototype.trim
$({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});


/***/ }),

/***/ "4c1d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "roomsValidation", function() { return roomsValidation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "partcipantsValidation", function() { return partcipantsValidation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "messagesValidation", function() { return messagesValidation; });
/* harmony import */ var _home_lik_web_vac_vue_advanced_chat_v3_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("53ca");
/* harmony import */ var core_js_modules_es_array_every_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("a623");
/* harmony import */ var core_js_modules_es_array_every_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_every_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("d3b7");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_is_array_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("277d");
/* harmony import */ var core_js_modules_es_array_is_array_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_is_array_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("7db0");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("d9e2");
/* harmony import */ var core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_cause_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("d401");
/* harmony import */ var core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_error_to_string_js__WEBPACK_IMPORTED_MODULE_6__);







function roomsValidation(obj) {
  var roomsValidate = [{
    key: 'roomId',
    type: ['string', 'number']
  }, {
    key: 'roomName',
    type: ['string']
  }, {
    key: 'users',
    type: ['array']
  }];

  var validate = function validate(obj, props) {
    return props.every(function (prop) {
      var validType = false;

      if (prop.type[0] === 'array' && Array.isArray(obj[prop.key])) {
        validType = true;
      } else if (prop.type.find(function (t) {
        return t === Object(_home_lik_web_vac_vue_advanced_chat_v3_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(obj[prop.key]);
      })) {
        validType = true;
      }

      return validType && checkObjectValid(obj, prop.key);
    });
  };

  if (!validate(obj, roomsValidate)) {
    throw new Error('Rooms object is not valid! Must contain roomId[String, Number], roomName[String] and users[Array]');
  }
}
function partcipantsValidation(obj) {
  var participantsValidate = [{
    key: '_id',
    type: ['string', 'number']
  }, {
    key: 'username',
    type: ['string']
  }];

  var validate = function validate(obj, props) {
    return props.every(function (prop) {
      var validType = prop.type.find(function (t) {
        return t === Object(_home_lik_web_vac_vue_advanced_chat_v3_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(obj[prop.key]);
      });
      return validType && checkObjectValid(obj, prop.key);
    });
  };

  if (!validate(obj, participantsValidate)) {
    throw new Error('Participants object is not valid! Must contain _id[String, Number] and username[String]');
  }
}
function messagesValidation(obj) {
  var messagesValidate = [{
    key: '_id',
    type: ['string', 'number']
  }, {
    key: 'content',
    type: ['string', 'number']
  }, {
    key: 'senderId',
    type: ['string', 'number']
  }];

  var validate = function validate(obj, props) {
    return props.every(function (prop) {
      var validType = prop.type.find(function (t) {
        return t === Object(_home_lik_web_vac_vue_advanced_chat_v3_node_modules_babel_runtime_helpers_esm_typeof_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(obj[prop.key]);
      });
      return validType && checkObjectValid(obj, prop.key);
    });
  };

  if (!validate(obj, messagesValidate)) {
    throw new Error('Messages object is not valid! Must contain _id[String, Number], content[String, Number] and senderId[String, Number]');
  }
}

function checkObjectValid(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key) && obj[key] !== null && obj[key] !== undefined;
}

/***/ }),

/***/ "4d63":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");
var isForced = __webpack_require__("94ca");
var inheritIfRequired = __webpack_require__("7156");
var createNonEnumerableProperty = __webpack_require__("9112");
var getOwnPropertyNames = __webpack_require__("241c").f;
var isPrototypeOf = __webpack_require__("3a9b");
var isRegExp = __webpack_require__("44e7");
var toString = __webpack_require__("577e");
var getRegExpFlags = __webpack_require__("90d8");
var stickyHelpers = __webpack_require__("9f7f");
var proxyAccessor = __webpack_require__("aeb0");
var defineBuiltIn = __webpack_require__("cb2d");
var fails = __webpack_require__("d039");
var hasOwn = __webpack_require__("1a2d");
var enforceInternalState = __webpack_require__("69f3").enforce;
var setSpecies = __webpack_require__("2626");
var wellKnownSymbol = __webpack_require__("b622");
var UNSUPPORTED_DOT_ALL = __webpack_require__("fce3");
var UNSUPPORTED_NCG = __webpack_require__("107c");

var MATCH = wellKnownSymbol('match');
var NativeRegExp = global.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var SyntaxError = global.SyntaxError;
var exec = uncurryThis(RegExpPrototype.exec);
var charAt = uncurryThis(''.charAt);
var replace = uncurryThis(''.replace);
var stringIndexOf = uncurryThis(''.indexOf);
var stringSlice = uncurryThis(''.slice);
// TODO: Use only propper RegExpIdentifierName
var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var MISSED_STICKY = stickyHelpers.MISSED_STICKY;
var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;

var BASE_FORCED = DESCRIPTORS &&
  (!CORRECT_NEW || MISSED_STICKY || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG || fails(function () {
    re2[MATCH] = false;
    // RegExp constructor can alter flags and IsRegExp works correct with @@match
    return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
  }));

var handleDotAll = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var brackets = false;
  var chr;
  for (; index <= length; index++) {
    chr = charAt(string, index);
    if (chr === '\\') {
      result += chr + charAt(string, ++index);
      continue;
    }
    if (!brackets && chr === '.') {
      result += '[\\s\\S]';
    } else {
      if (chr === '[') {
        brackets = true;
      } else if (chr === ']') {
        brackets = false;
      } result += chr;
    }
  } return result;
};

var handleNCG = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var named = [];
  var names = {};
  var brackets = false;
  var ncg = false;
  var groupid = 0;
  var groupname = '';
  var chr;
  for (; index <= length; index++) {
    chr = charAt(string, index);
    if (chr === '\\') {
      chr = chr + charAt(string, ++index);
    } else if (chr === ']') {
      brackets = false;
    } else if (!brackets) switch (true) {
      case chr === '[':
        brackets = true;
        break;
      case chr === '(':
        if (exec(IS_NCG, stringSlice(string, index + 1))) {
          index += 2;
          ncg = true;
        }
        result += chr;
        groupid++;
        continue;
      case chr === '>' && ncg:
        if (groupname === '' || hasOwn(names, groupname)) {
          throw new SyntaxError('Invalid capture group name');
        }
        names[groupname] = true;
        named[named.length] = [groupname, groupid];
        ncg = false;
        groupname = '';
        continue;
    }
    if (ncg) groupname += chr;
    else result += chr;
  } return [result, named];
};

// `RegExp` constructor
// https://tc39.es/ecma262/#sec-regexp-constructor
if (isForced('RegExp', BASE_FORCED)) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = isPrototypeOf(RegExpPrototype, this);
    var patternIsRegExp = isRegExp(pattern);
    var flagsAreUndefined = flags === undefined;
    var groups = [];
    var rawPattern = pattern;
    var rawFlags, dotAll, sticky, handled, result, state;

    if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
      return pattern;
    }

    if (patternIsRegExp || isPrototypeOf(RegExpPrototype, pattern)) {
      pattern = pattern.source;
      if (flagsAreUndefined) flags = getRegExpFlags(rawPattern);
    }

    pattern = pattern === undefined ? '' : toString(pattern);
    flags = flags === undefined ? '' : toString(flags);
    rawPattern = pattern;

    if (UNSUPPORTED_DOT_ALL && 'dotAll' in re1) {
      dotAll = !!flags && stringIndexOf(flags, 's') > -1;
      if (dotAll) flags = replace(flags, /s/g, '');
    }

    rawFlags = flags;

    if (MISSED_STICKY && 'sticky' in re1) {
      sticky = !!flags && stringIndexOf(flags, 'y') > -1;
      if (sticky && UNSUPPORTED_Y) flags = replace(flags, /y/g, '');
    }

    if (UNSUPPORTED_NCG) {
      handled = handleNCG(pattern);
      pattern = handled[0];
      groups = handled[1];
    }

    result = inheritIfRequired(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);

    if (dotAll || sticky || groups.length) {
      state = enforceInternalState(result);
      if (dotAll) {
        state.dotAll = true;
        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
      }
      if (sticky) state.sticky = true;
      if (groups.length) state.groups = groups;
    }

    if (pattern !== rawPattern) try {
      // fails in old engines, but we have no alternatives for unsupported regex syntax
      createNonEnumerableProperty(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
    } catch (error) { /* empty */ }

    return result;
  };

  for (var keys = getOwnPropertyNames(NativeRegExp), index = 0; keys.length > index;) {
    proxyAccessor(RegExpWrapper, NativeRegExp, keys[index++]);
  }

  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  defineBuiltIn(global, 'RegExp', RegExpWrapper, { constructor: true });
}

// https://tc39.es/ecma262/#sec-get-regexp-@@species
setSpecies('RegExp');


/***/ }),

/***/ "4d64":
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__("fc6a");
var toAbsoluteIndex = __webpack_require__("23cb");
var lengthOfArrayLike = __webpack_require__("07fa");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "4dae":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var toAbsoluteIndex = __webpack_require__("23cb");
var lengthOfArrayLike = __webpack_require__("07fa");
var createProperty = __webpack_require__("8418");

var Array = global.Array;
var max = Math.max;

module.exports = function (O, start, end) {
  var length = lengthOfArrayLike(O);
  var k = toAbsoluteIndex(start, length);
  var fin = toAbsoluteIndex(end === undefined ? length : end, length);
  var result = Array(max(fin - k, 0));
  for (var n = 0; k < fin; k++, n++) createProperty(result, n, O[k]);
  result.length = n;
  return result;
};


/***/ }),

/***/ "4de4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $filter = __webpack_require__("b727").filter;
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "4df4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var bind = __webpack_require__("0366");
var call = __webpack_require__("c65b");
var toObject = __webpack_require__("7b0b");
var callWithSafeIterationClosing = __webpack_require__("9bdd");
var isArrayIteratorMethod = __webpack_require__("e95a");
var isConstructor = __webpack_require__("68ee");
var lengthOfArrayLike = __webpack_require__("07fa");
var createProperty = __webpack_require__("8418");
var getIterator = __webpack_require__("9a1f");
var getIteratorMethod = __webpack_require__("35a1");

var Array = global.Array;

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var IS_CONSTRUCTOR = isConstructor(this);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod && !(this == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    result = IS_CONSTRUCTOR ? new this() : [];
    for (;!(step = call(next, iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = lengthOfArrayLike(O);
    result = IS_CONSTRUCTOR ? new this(length) : Array(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};


/***/ }),

/***/ "4e82":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var uncurryThis = __webpack_require__("e330");
var aCallable = __webpack_require__("59ed");
var toObject = __webpack_require__("7b0b");
var lengthOfArrayLike = __webpack_require__("07fa");
var toString = __webpack_require__("577e");
var fails = __webpack_require__("d039");
var internalSort = __webpack_require__("addb");
var arrayMethodIsStrict = __webpack_require__("a640");
var FF = __webpack_require__("04d1");
var IE_OR_EDGE = __webpack_require__("d998");
var V8 = __webpack_require__("2d00");
var WEBKIT = __webpack_require__("512c");

var test = [];
var un$Sort = uncurryThis(test.sort);
var push = uncurryThis(test.push);

// IE8-
var FAILS_ON_UNDEFINED = fails(function () {
  test.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails(function () {
  test.sort(null);
});
// Old WebKit
var STRICT_METHOD = arrayMethodIsStrict('sort');

var STABLE_SORT = !fails(function () {
  // feature detection can be too slow, so check engines versions
  if (V8) return V8 < 70;
  if (FF && FF > 3) return;
  if (IE_OR_EDGE) return true;
  if (WEBKIT) return WEBKIT < 603;

  var result = '';
  var code, chr, value, index;

  // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
  for (code = 65; code < 76; code++) {
    chr = String.fromCharCode(code);

    switch (code) {
      case 66: case 69: case 70: case 72: value = 3; break;
      case 68: case 71: value = 4; break;
      default: value = 2;
    }

    for (index = 0; index < 47; index++) {
      test.push({ k: chr + index, v: value });
    }
  }

  test.sort(function (a, b) { return b.v - a.v; });

  for (index = 0; index < test.length; index++) {
    chr = test[index].k.charAt(0);
    if (result.charAt(result.length - 1) !== chr) result += chr;
  }

  return result !== 'DGBEFHACIJK';
});

var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;

var getSortCompare = function (comparefn) {
  return function (x, y) {
    if (y === undefined) return -1;
    if (x === undefined) return 1;
    if (comparefn !== undefined) return +comparefn(x, y) || 0;
    return toString(x) > toString(y) ? 1 : -1;
  };
};

// `Array.prototype.sort` method
// https://tc39.es/ecma262/#sec-array.prototype.sort
$({ target: 'Array', proto: true, forced: FORCED }, {
  sort: function sort(comparefn) {
    if (comparefn !== undefined) aCallable(comparefn);

    var array = toObject(this);

    if (STABLE_SORT) return comparefn === undefined ? un$Sort(array) : un$Sort(array, comparefn);

    var items = [];
    var arrayLength = lengthOfArrayLike(array);
    var itemsLength, index;

    for (index = 0; index < arrayLength; index++) {
      if (index in array) push(items, array[index]);
    }

    internalSort(items, getSortCompare(comparefn));

    itemsLength = items.length;
    index = 0;

    while (index < itemsLength) array[index] = items[index++];
    while (index < arrayLength) delete array[index++];

    return array;
  }
});


/***/ }),

/***/ "4fad":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var $entries = __webpack_require__("6f53").entries;

// `Object.entries` method
// https://tc39.es/ecma262/#sec-object.entries
$({ target: 'Object', stat: true }, {
  entries: function entries(O) {
    return $entries(O);
  }
});


/***/ }),

/***/ "4fadd":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var isObject = __webpack_require__("861d");
var classof = __webpack_require__("c6b6");
var ARRAY_BUFFER_NON_EXTENSIBLE = __webpack_require__("d86b");

// eslint-disable-next-line es-x/no-object-isextensible -- safe
var $isExtensible = Object.isExtensible;
var FAILS_ON_PRIMITIVES = fails(function () { $isExtensible(1); });

// `Object.isExtensible` method
// https://tc39.es/ecma262/#sec-object.isextensible
module.exports = (FAILS_ON_PRIMITIVES || ARRAY_BUFFER_NON_EXTENSIBLE) ? function isExtensible(it) {
  if (!isObject(it)) return false;
  if (ARRAY_BUFFER_NON_EXTENSIBLE && classof(it) == 'ArrayBuffer') return false;
  return $isExtensible ? $isExtensible(it) : true;
} : $isExtensible;


/***/ }),

/***/ "5087":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isConstructor = __webpack_require__("68ee");
var tryToString = __webpack_require__("0d51");

var TypeError = global.TypeError;

// `Assert: IsConstructor(argument) is true`
module.exports = function (argument) {
  if (isConstructor(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a constructor');
};


/***/ }),

/***/ "50c4":
/***/ (function(module, exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__("5926");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "512c":
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__("342f");

var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);

module.exports = !!webkit && +webkit[1];


/***/ }),

/***/ "5319":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var apply = __webpack_require__("2ba4");
var call = __webpack_require__("c65b");
var uncurryThis = __webpack_require__("e330");
var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var fails = __webpack_require__("d039");
var anObject = __webpack_require__("825a");
var isCallable = __webpack_require__("1626");
var toIntegerOrInfinity = __webpack_require__("5926");
var toLength = __webpack_require__("50c4");
var toString = __webpack_require__("577e");
var requireObjectCoercible = __webpack_require__("1d80");
var advanceStringIndex = __webpack_require__("8aa5");
var getMethod = __webpack_require__("dc4a");
var getSubstitution = __webpack_require__("0cb2");
var regExpExec = __webpack_require__("14c3");
var wellKnownSymbol = __webpack_require__("b622");

var REPLACE = wellKnownSymbol('replace');
var max = Math.max;
var min = Math.min;
var concat = uncurryThis([].concat);
var push = uncurryThis([].push);
var stringIndexOf = uncurryThis(''.indexOf);
var stringSlice = uncurryThis(''.slice);

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
  return ''.replace(re, '$<a>') !== '7';
});

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : getMethod(searchValue, REPLACE);
      return replacer
        ? call(replacer, searchValue, O, replaceValue)
        : call(nativeReplace, toString(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject(this);
      var S = toString(string);

      if (
        typeof replaceValue == 'string' &&
        stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
        stringIndexOf(replaceValue, '$<') === -1
      ) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }

      var functionalReplace = isCallable(replaceValue);
      if (!functionalReplace) replaceValue = toString(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        push(results, result);
        if (!global) break;

        var matchStr = toString(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = toString(result[0]);
        var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = concat([matched], captures, position, S);
          if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
          var replacement = toString(apply(replaceValue, undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + stringSlice(S, nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);


/***/ }),

/***/ "5352":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
__webpack_require__("e260");
var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var call = __webpack_require__("c65b");
var uncurryThis = __webpack_require__("e330");
var DESCRIPTORS = __webpack_require__("83ab");
var USE_NATIVE_URL = __webpack_require__("0d3b");
var defineBuiltIn = __webpack_require__("cb2d");
var defineBuiltIns = __webpack_require__("6964");
var setToStringTag = __webpack_require__("d44e");
var createIteratorConstructor = __webpack_require__("9ed3");
var InternalStateModule = __webpack_require__("69f3");
var anInstance = __webpack_require__("19aa");
var isCallable = __webpack_require__("1626");
var hasOwn = __webpack_require__("1a2d");
var bind = __webpack_require__("0366");
var classof = __webpack_require__("f5df");
var anObject = __webpack_require__("825a");
var isObject = __webpack_require__("861d");
var $toString = __webpack_require__("577e");
var create = __webpack_require__("7c73");
var createPropertyDescriptor = __webpack_require__("5c6c");
var getIterator = __webpack_require__("9a1f");
var getIteratorMethod = __webpack_require__("35a1");
var validateArgumentsLength = __webpack_require__("d6d6");
var wellKnownSymbol = __webpack_require__("b622");
var arraySort = __webpack_require__("addb");

var ITERATOR = wellKnownSymbol('iterator');
var URL_SEARCH_PARAMS = 'URLSearchParams';
var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
var setInternalState = InternalStateModule.set;
var getInternalParamsState = InternalStateModule.getterFor(URL_SEARCH_PARAMS);
var getInternalIteratorState = InternalStateModule.getterFor(URL_SEARCH_PARAMS_ITERATOR);
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Avoid NodeJS experimental warning
var safeGetBuiltIn = function (name) {
  if (!DESCRIPTORS) return global[name];
  var descriptor = getOwnPropertyDescriptor(global, name);
  return descriptor && descriptor.value;
};

var nativeFetch = safeGetBuiltIn('fetch');
var NativeRequest = safeGetBuiltIn('Request');
var Headers = safeGetBuiltIn('Headers');
var RequestPrototype = NativeRequest && NativeRequest.prototype;
var HeadersPrototype = Headers && Headers.prototype;
var RegExp = global.RegExp;
var TypeError = global.TypeError;
var decodeURIComponent = global.decodeURIComponent;
var encodeURIComponent = global.encodeURIComponent;
var charAt = uncurryThis(''.charAt);
var join = uncurryThis([].join);
var push = uncurryThis([].push);
var replace = uncurryThis(''.replace);
var shift = uncurryThis([].shift);
var splice = uncurryThis([].splice);
var split = uncurryThis(''.split);
var stringSlice = uncurryThis(''.slice);

var plus = /\+/g;
var sequences = Array(4);

var percentSequence = function (bytes) {
  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
};

var percentDecode = function (sequence) {
  try {
    return decodeURIComponent(sequence);
  } catch (error) {
    return sequence;
  }
};

var deserialize = function (it) {
  var result = replace(it, plus, ' ');
  var bytes = 4;
  try {
    return decodeURIComponent(result);
  } catch (error) {
    while (bytes) {
      result = replace(result, percentSequence(bytes--), percentDecode);
    }
    return result;
  }
};

var find = /[!'()~]|%20/g;

var replacements = {
  '!': '%21',
  "'": '%27',
  '(': '%28',
  ')': '%29',
  '~': '%7E',
  '%20': '+'
};

var replacer = function (match) {
  return replacements[match];
};

var serialize = function (it) {
  return replace(encodeURIComponent(it), find, replacer);
};

var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
  setInternalState(this, {
    type: URL_SEARCH_PARAMS_ITERATOR,
    iterator: getIterator(getInternalParamsState(params).entries),
    kind: kind
  });
}, 'Iterator', function next() {
  var state = getInternalIteratorState(this);
  var kind = state.kind;
  var step = state.iterator.next();
  var entry = step.value;
  if (!step.done) {
    step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
  } return step;
}, true);

var URLSearchParamsState = function (init) {
  this.entries = [];
  this.url = null;

  if (init !== undefined) {
    if (isObject(init)) this.parseObject(init);
    else this.parseQuery(typeof init == 'string' ? charAt(init, 0) === '?' ? stringSlice(init, 1) : init : $toString(init));
  }
};

URLSearchParamsState.prototype = {
  type: URL_SEARCH_PARAMS,
  bindURL: function (url) {
    this.url = url;
    this.update();
  },
  parseObject: function (object) {
    var iteratorMethod = getIteratorMethod(object);
    var iterator, next, step, entryIterator, entryNext, first, second;

    if (iteratorMethod) {
      iterator = getIterator(object, iteratorMethod);
      next = iterator.next;
      while (!(step = call(next, iterator)).done) {
        entryIterator = getIterator(anObject(step.value));
        entryNext = entryIterator.next;
        if (
          (first = call(entryNext, entryIterator)).done ||
          (second = call(entryNext, entryIterator)).done ||
          !call(entryNext, entryIterator).done
        ) throw TypeError('Expected sequence with length 2');
        push(this.entries, { key: $toString(first.value), value: $toString(second.value) });
      }
    } else for (var key in object) if (hasOwn(object, key)) {
      push(this.entries, { key: key, value: $toString(object[key]) });
    }
  },
  parseQuery: function (query) {
    if (query) {
      var attributes = split(query, '&');
      var index = 0;
      var attribute, entry;
      while (index < attributes.length) {
        attribute = attributes[index++];
        if (attribute.length) {
          entry = split(attribute, '=');
          push(this.entries, {
            key: deserialize(shift(entry)),
            value: deserialize(join(entry, '='))
          });
        }
      }
    }
  },
  serialize: function () {
    var entries = this.entries;
    var result = [];
    var index = 0;
    var entry;
    while (index < entries.length) {
      entry = entries[index++];
      push(result, serialize(entry.key) + '=' + serialize(entry.value));
    } return join(result, '&');
  },
  update: function () {
    this.entries.length = 0;
    this.parseQuery(this.url.query);
  },
  updateURL: function () {
    if (this.url) this.url.update();
  }
};

// `URLSearchParams` constructor
// https://url.spec.whatwg.org/#interface-urlsearchparams
var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
  anInstance(this, URLSearchParamsPrototype);
  var init = arguments.length > 0 ? arguments[0] : undefined;
  setInternalState(this, new URLSearchParamsState(init));
};

var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

defineBuiltIns(URLSearchParamsPrototype, {
  // `URLSearchParams.prototype.append` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function append(name, value) {
    validateArgumentsLength(arguments.length, 2);
    var state = getInternalParamsState(this);
    push(state.entries, { key: $toString(name), value: $toString(value) });
    state.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  'delete': function (name) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var key = $toString(name);
    var index = 0;
    while (index < entries.length) {
      if (entries[index].key === key) splice(entries, index, 1);
      else index++;
    }
    state.updateURL();
  },
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function get(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = $toString(name);
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) return entries[index].value;
    }
    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function getAll(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = $toString(name);
    var result = [];
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) push(result, entries[index].value);
    }
    return result;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function has(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = $toString(name);
    var index = 0;
    while (index < entries.length) {
      if (entries[index++].key === key) return true;
    }
    return false;
  },
  // `URLSearchParams.prototype.set` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  set: function set(name, value) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var found = false;
    var key = $toString(name);
    var val = $toString(value);
    var index = 0;
    var entry;
    for (; index < entries.length; index++) {
      entry = entries[index];
      if (entry.key === key) {
        if (found) splice(entries, index--, 1);
        else {
          found = true;
          entry.value = val;
        }
      }
    }
    if (!found) push(entries, { key: key, value: val });
    state.updateURL();
  },
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function sort() {
    var state = getInternalParamsState(this);
    arraySort(state.entries, function (a, b) {
      return a.key > b.key ? 1 : -1;
    });
    state.updateURL();
  },
  // `URLSearchParams.prototype.forEach` method
  forEach: function forEach(callback /* , thisArg */) {
    var entries = getInternalParamsState(this).entries;
    var boundFunction = bind(callback, arguments.length > 1 ? arguments[1] : undefined);
    var index = 0;
    var entry;
    while (index < entries.length) {
      entry = entries[index++];
      boundFunction(entry.value, entry.key, this);
    }
  },
  // `URLSearchParams.prototype.keys` method
  keys: function keys() {
    return new URLSearchParamsIterator(this, 'keys');
  },
  // `URLSearchParams.prototype.values` method
  values: function values() {
    return new URLSearchParamsIterator(this, 'values');
  },
  // `URLSearchParams.prototype.entries` method
  entries: function entries() {
    return new URLSearchParamsIterator(this, 'entries');
  }
}, { enumerable: true });

// `URLSearchParams.prototype[@@iterator]` method
defineBuiltIn(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries, { name: 'entries' });

// `URLSearchParams.prototype.toString` method
// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
defineBuiltIn(URLSearchParamsPrototype, 'toString', function toString() {
  return getInternalParamsState(this).serialize();
}, { enumerable: true });

setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

$({ global: true, constructor: true, forced: !USE_NATIVE_URL }, {
  URLSearchParams: URLSearchParamsConstructor
});

// Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`
if (!USE_NATIVE_URL && isCallable(Headers)) {
  var headersHas = uncurryThis(HeadersPrototype.has);
  var headersSet = uncurryThis(HeadersPrototype.set);

  var wrapRequestOptions = function (init) {
    if (isObject(init)) {
      var body = init.body;
      var headers;
      if (classof(body) === URL_SEARCH_PARAMS) {
        headers = init.headers ? new Headers(init.headers) : new Headers();
        if (!headersHas(headers, 'content-type')) {
          headersSet(headers, 'content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
        return create(init, {
          body: createPropertyDescriptor(0, $toString(body)),
          headers: createPropertyDescriptor(0, headers)
        });
      }
    } return init;
  };

  if (isCallable(nativeFetch)) {
    $({ global: true, enumerable: true, dontCallGetSet: true, forced: true }, {
      fetch: function fetch(input /* , init */) {
        return nativeFetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
      }
    });
  }

  if (isCallable(NativeRequest)) {
    var RequestConstructor = function Request(input /* , init */) {
      anInstance(this, RequestPrototype);
      return new NativeRequest(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
    };

    RequestPrototype.constructor = RequestConstructor;
    RequestConstructor.prototype = RequestPrototype;

    $({ global: true, constructor: true, dontCallGetSet: true, forced: true }, {
      Request: RequestConstructor
    });
  }
}

module.exports = {
  URLSearchParams: URLSearchParamsConstructor,
  getState: getInternalParamsState
};


/***/ }),

/***/ "53ca":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _typeof; });
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a4d3");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("e01a");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("d3b7");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("d28b");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("e260");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("3ca3");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("ddb0");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_6__);







function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

/***/ }),

/***/ "5692":
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__("c430");
var store = __webpack_require__("c6cd");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.22.7',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.22.7/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ "56ef":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");
var uncurryThis = __webpack_require__("e330");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var anObject = __webpack_require__("825a");

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "577e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var classof = __webpack_require__("f5df");

var String = global.String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return String(argument);
};


/***/ }),

/***/ "57b9":
/***/ (function(module, exports, __webpack_require__) {

var call = __webpack_require__("c65b");
var getBuiltIn = __webpack_require__("d066");
var wellKnownSymbol = __webpack_require__("b622");
var defineBuiltIn = __webpack_require__("cb2d");

module.exports = function () {
  var Symbol = getBuiltIn('Symbol');
  var SymbolPrototype = Symbol && Symbol.prototype;
  var valueOf = SymbolPrototype && SymbolPrototype.valueOf;
  var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

  if (SymbolPrototype && !SymbolPrototype[TO_PRIMITIVE]) {
    // `Symbol.prototype[@@toPrimitive]` method
    // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
    // eslint-disable-next-line no-unused-vars -- required for .length
    defineBuiltIn(SymbolPrototype, TO_PRIMITIVE, function (hint) {
      return call(valueOf, this);
    }, { arity: 1 });
  }
};


/***/ }),

/***/ "5899":
/***/ (function(module, exports) {

// a string of all valid unicode whitespaces
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "58a8":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");
var requireObjectCoercible = __webpack_require__("1d80");
var toString = __webpack_require__("577e");
var whitespaces = __webpack_require__("5899");

var replace = uncurryThis(''.replace);
var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = toString(requireObjectCoercible($this));
    if (TYPE & 1) string = replace(string, ltrim, '');
    if (TYPE & 2) string = replace(string, rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ "5926":
/***/ (function(module, exports, __webpack_require__) {

var trunc = __webpack_require__("b42e");

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ "59ed":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isCallable = __webpack_require__("1626");
var tryToString = __webpack_require__("0d51");

var TypeError = global.TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ "5a34":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isRegExp = __webpack_require__("44e7");

var TypeError = global.TypeError;

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};


/***/ }),

/***/ "5a47":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var NATIVE_SYMBOL = __webpack_require__("4930");
var fails = __webpack_require__("d039");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var toObject = __webpack_require__("7b0b");

// V8 ~ Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FORCED = !NATIVE_SYMBOL || fails(function () { getOwnPropertySymbolsModule.f(1); });

// `Object.getOwnPropertySymbols` method
// https://tc39.es/ecma262/#sec-object.getownpropertysymbols
$({ target: 'Object', stat: true, forced: FORCED }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    var $getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return $getOwnPropertySymbols ? $getOwnPropertySymbols(toObject(it)) : [];
  }
});


/***/ }),

/***/ "5c6c":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "5e77":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var hasOwn = __webpack_require__("1a2d");

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ "5e7e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var IS_PURE = __webpack_require__("c430");
var IS_NODE = __webpack_require__("605d");
var global = __webpack_require__("da84");
var call = __webpack_require__("c65b");
var defineBuiltIn = __webpack_require__("cb2d");
var setPrototypeOf = __webpack_require__("d2bb");
var setToStringTag = __webpack_require__("d44e");
var setSpecies = __webpack_require__("2626");
var aCallable = __webpack_require__("59ed");
var isCallable = __webpack_require__("1626");
var isObject = __webpack_require__("861d");
var anInstance = __webpack_require__("19aa");
var speciesConstructor = __webpack_require__("4840");
var task = __webpack_require__("2cf4").set;
var microtask = __webpack_require__("b575");
var hostReportErrors = __webpack_require__("44de");
var perform = __webpack_require__("e667");
var Queue = __webpack_require__("01b4");
var InternalStateModule = __webpack_require__("69f3");
var NativePromiseConstructor = __webpack_require__("d256");
var PromiseConstructorDetection = __webpack_require__("4738");
var newPromiseCapabilityModule = __webpack_require__("f069");

var PROMISE = 'Promise';
var FORCED_PROMISE_CONSTRUCTOR = PromiseConstructorDetection.CONSTRUCTOR;
var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;
var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var setInternalState = InternalStateModule.set;
var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;
var PromiseConstructor = NativePromiseConstructor;
var PromisePrototype = NativePromisePrototype;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;

var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;

var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && isCallable(then = it.then) ? then : false;
};

var callReaction = function (reaction, state) {
  var value = state.value;
  var ok = state.state == FULFILLED;
  var handler = ok ? reaction.ok : reaction.fail;
  var resolve = reaction.resolve;
  var reject = reaction.reject;
  var domain = reaction.domain;
  var result, then, exited;
  try {
    if (handler) {
      if (!ok) {
        if (state.rejection === UNHANDLED) onHandleUnhandled(state);
        state.rejection = HANDLED;
      }
      if (handler === true) result = value;
      else {
        if (domain) domain.enter();
        result = handler(value); // can throw
        if (domain) {
          domain.exit();
          exited = true;
        }
      }
      if (result === reaction.promise) {
        reject(TypeError('Promise-chain cycle'));
      } else if (then = isThenable(result)) {
        call(then, result, resolve, reject);
      } else resolve(result);
    } else reject(value);
  } catch (error) {
    if (domain && !exited) domain.exit();
    reject(error);
  }
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  microtask(function () {
    var reactions = state.reactions;
    var reaction;
    while (reaction = reactions.get()) {
      callReaction(reaction, state);
    }
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = global['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  call(task, global, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  call(task, global, function () {
    var promise = state.facade;
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          call(then, value,
            bind(internalResolve, wrapper, state),
            bind(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED_PROMISE_CONSTRUCTOR) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromisePrototype);
    aCallable(executor);
    call(Internal, this);
    var state = getInternalPromiseState(this);
    try {
      executor(bind(internalResolve, state), bind(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };

  PromisePrototype = PromiseConstructor.prototype;

  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: new Queue(),
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };

  // `Promise.prototype.then` method
  // https://tc39.es/ecma262/#sec-promise.prototype.then
  Internal.prototype = defineBuiltIn(PromisePrototype, 'then', function then(onFulfilled, onRejected) {
    var state = getInternalPromiseState(this);
    var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
    state.parent = true;
    reaction.ok = isCallable(onFulfilled) ? onFulfilled : true;
    reaction.fail = isCallable(onRejected) && onRejected;
    reaction.domain = IS_NODE ? process.domain : undefined;
    if (state.state == PENDING) state.reactions.add(reaction);
    else microtask(function () {
      callReaction(reaction, state);
    });
    return reaction.promise;
  });

  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalPromiseState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, state);
    this.reject = bind(internalReject, state);
  };

  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && isCallable(NativePromiseConstructor) && NativePromisePrototype !== Object.prototype) {
    nativeThen = NativePromisePrototype.then;

    if (!NATIVE_PROMISE_SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      defineBuiltIn(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          call(nativeThen, that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype.constructor;
    } catch (error) { /* empty */ }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype, PromisePrototype);
    }
  }
}

$({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);


/***/ }),

/***/ "5eed":
/***/ (function(module, exports, __webpack_require__) {

var NativePromiseConstructor = __webpack_require__("d256");
var checkCorrectnessOfIteration = __webpack_require__("1c7e");
var FORCED_PROMISE_CONSTRUCTOR = __webpack_require__("4738").CONSTRUCTOR;

module.exports = FORCED_PROMISE_CONSTRUCTOR || !checkCorrectnessOfIteration(function (iterable) {
  NativePromiseConstructor.all(iterable).then(undefined, function () { /* empty */ });
});


/***/ }),

/***/ "5f96":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var uncurryThis = __webpack_require__("e330");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $join = uncurryThis([].join);

// `%TypedArray%.prototype.join` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.join
exportTypedArrayMethod('join', function join(separator) {
  return $join(aTypedArray(this), separator);
});


/***/ }),

/***/ "5fb2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");

var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = '-'; // '\x2D'
var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
var baseMinusTMin = base - tMin;

var RangeError = global.RangeError;
var exec = uncurryThis(regexSeparators.exec);
var floor = Math.floor;
var fromCharCode = String.fromCharCode;
var charCodeAt = uncurryThis(''.charCodeAt);
var join = uncurryThis([].join);
var push = uncurryThis([].push);
var replace = uncurryThis(''.replace);
var split = uncurryThis(''.split);
var toLowerCase = uncurryThis(''.toLowerCase);

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 */
var ucs2decode = function (string) {
  var output = [];
  var counter = 0;
  var length = string.length;
  while (counter < length) {
    var value = charCodeAt(string, counter++);
    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // It's a high surrogate, and there is a next character.
      var extra = charCodeAt(string, counter++);
      if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
        push(output, ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        // It's an unmatched surrogate; only append this code unit, in case the
        // next code unit is the high surrogate of a surrogate pair.
        push(output, value);
        counter--;
      }
    } else {
      push(output, value);
    }
  }
  return output;
};

/**
 * Converts a digit/integer into a basic code point.
 */
var digitToBasic = function (digit) {
  //  0..25 map to ASCII a..z or A..Z
  // 26..35 map to ASCII 0..9
  return digit + 22 + 75 * (digit < 26);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 */
var adapt = function (delta, numPoints, firstTime) {
  var k = 0;
  delta = firstTime ? floor(delta / damp) : delta >> 1;
  delta += floor(delta / numPoints);
  while (delta > baseMinusTMin * tMax >> 1) {
    delta = floor(delta / baseMinusTMin);
    k += base;
  }
  return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 */
var encode = function (input) {
  var output = [];

  // Convert the input in UCS-2 to an array of Unicode code points.
  input = ucs2decode(input);

  // Cache the length.
  var inputLength = input.length;

  // Initialize the state.
  var n = initialN;
  var delta = 0;
  var bias = initialBias;
  var i, currentValue;

  // Handle the basic code points.
  for (i = 0; i < input.length; i++) {
    currentValue = input[i];
    if (currentValue < 0x80) {
      push(output, fromCharCode(currentValue));
    }
  }

  var basicLength = output.length; // number of basic code points.
  var handledCPCount = basicLength; // number of code points that have been handled;

  // Finish the basic string with a delimiter unless it's empty.
  if (basicLength) {
    push(output, delimiter);
  }

  // Main encoding loop:
  while (handledCPCount < inputLength) {
    // All non-basic code points < n have been handled already. Find the next larger one:
    var m = maxInt;
    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    }

    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
    var handledCPCountPlusOne = handledCPCount + 1;
    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
      throw RangeError(OVERFLOW_ERROR);
    }

    delta += (m - n) * handledCPCountPlusOne;
    n = m;

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue < n && ++delta > maxInt) {
        throw RangeError(OVERFLOW_ERROR);
      }
      if (currentValue == n) {
        // Represent delta as a generalized variable-length integer.
        var q = delta;
        var k = base;
        while (true) {
          var t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
          if (q < t) break;
          var qMinusT = q - t;
          var baseMinusT = base - t;
          push(output, fromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
          q = floor(qMinusT / baseMinusT);
          k += base;
        }

        push(output, fromCharCode(digitToBasic(q)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
        delta = 0;
        handledCPCount++;
      }
    }

    delta++;
    n++;
  }
  return join(output, '');
};

module.exports = function (input) {
  var encoded = [];
  var labels = split(replace(toLowerCase(input), regexSeparators, '\u002E'), '.');
  var i, label;
  for (i = 0; i < labels.length; i++) {
    label = labels[i];
    push(encoded, exec(regexNonASCII, label) ? 'xn--' + encode(label) : label);
  }
  return join(encoded, '.');
};


/***/ }),

/***/ "6051":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_InfiniteLoading_vue_vue_type_style_index_0_id_5b700216_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("17aa");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_InfiniteLoading_vue_vue_type_style_index_0_id_5b700216_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_InfiniteLoading_vue_vue_type_style_index_0_id_5b700216_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "605d":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("c6b6");
var global = __webpack_require__("da84");

module.exports = classof(global.process) == 'process';


/***/ }),

/***/ "6062":
/***/ (function(module, exports, __webpack_require__) {

// TODO: Remove this module from `core-js@4` since it's replaced to module below
__webpack_require__("1c59");


/***/ }),

/***/ "6069":
/***/ (function(module, exports) {

module.exports = typeof window == 'object' && typeof Deno != 'object';


/***/ }),

/***/ "60bd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var fails = __webpack_require__("d039");
var uncurryThis = __webpack_require__("e330");
var ArrayBufferViewCore = __webpack_require__("ebb5");
var ArrayIterators = __webpack_require__("e260");
var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');
var Uint8Array = global.Uint8Array;
var arrayValues = uncurryThis(ArrayIterators.values);
var arrayKeys = uncurryThis(ArrayIterators.keys);
var arrayEntries = uncurryThis(ArrayIterators.entries);
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var TypedArrayPrototype = Uint8Array && Uint8Array.prototype;

var GENERIC = !fails(function () {
  TypedArrayPrototype[ITERATOR].call([1]);
});

var ITERATOR_IS_VALUES = !!TypedArrayPrototype
  && TypedArrayPrototype.values
  && TypedArrayPrototype[ITERATOR] === TypedArrayPrototype.values
  && TypedArrayPrototype.values.name === 'values';

var typedArrayValues = function values() {
  return arrayValues(aTypedArray(this));
};

// `%TypedArray%.prototype.entries` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.entries
exportTypedArrayMethod('entries', function entries() {
  return arrayEntries(aTypedArray(this));
}, GENERIC);
// `%TypedArray%.prototype.keys` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.keys
exportTypedArrayMethod('keys', function keys() {
  return arrayKeys(aTypedArray(this));
}, GENERIC);
// `%TypedArray%.prototype.values` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.values
exportTypedArrayMethod('values', typedArrayValues, GENERIC || !ITERATOR_IS_VALUES, { name: 'values' });
// `%TypedArray%.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype-@@iterator
exportTypedArrayMethod(ITERATOR, typedArrayValues, GENERIC || !ITERATOR_IS_VALUES, { name: 'values' });


/***/ }),

/***/ "60da":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var uncurryThis = __webpack_require__("e330");
var call = __webpack_require__("c65b");
var fails = __webpack_require__("d039");
var objectKeys = __webpack_require__("df75");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var toObject = __webpack_require__("7b0b");
var IndexedObject = __webpack_require__("44ad");

// eslint-disable-next-line es-x/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
var defineProperty = Object.defineProperty;
var concat = uncurryThis([].concat);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
module.exports = !$assign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line es-x/no-symbol -- safe
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || call(propertyIsEnumerable, S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ "621a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");
var DESCRIPTORS = __webpack_require__("83ab");
var NATIVE_ARRAY_BUFFER = __webpack_require__("a981");
var FunctionName = __webpack_require__("5e77");
var createNonEnumerableProperty = __webpack_require__("9112");
var defineBuiltIns = __webpack_require__("6964");
var fails = __webpack_require__("d039");
var anInstance = __webpack_require__("19aa");
var toIntegerOrInfinity = __webpack_require__("5926");
var toLength = __webpack_require__("50c4");
var toIndex = __webpack_require__("0b25");
var IEEE754 = __webpack_require__("77a7");
var getPrototypeOf = __webpack_require__("e163");
var setPrototypeOf = __webpack_require__("d2bb");
var getOwnPropertyNames = __webpack_require__("241c").f;
var defineProperty = __webpack_require__("9bf2").f;
var arrayFill = __webpack_require__("81d5");
var arraySlice = __webpack_require__("4dae");
var setToStringTag = __webpack_require__("d44e");
var InternalStateModule = __webpack_require__("69f3");

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length';
var WRONG_INDEX = 'Wrong index';
var NativeArrayBuffer = global[ARRAY_BUFFER];
var $ArrayBuffer = NativeArrayBuffer;
var ArrayBufferPrototype = $ArrayBuffer && $ArrayBuffer[PROTOTYPE];
var $DataView = global[DATA_VIEW];
var DataViewPrototype = $DataView && $DataView[PROTOTYPE];
var ObjectPrototype = Object.prototype;
var Array = global.Array;
var RangeError = global.RangeError;
var fill = uncurryThis(arrayFill);
var reverse = uncurryThis([].reverse);

var packIEEE754 = IEEE754.pack;
var unpackIEEE754 = IEEE754.unpack;

var packInt8 = function (number) {
  return [number & 0xFF];
};

var packInt16 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF];
};

var packInt32 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
};

var unpackInt32 = function (buffer) {
  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
};

var packFloat32 = function (number) {
  return packIEEE754(number, 23, 4);
};

var packFloat64 = function (number) {
  return packIEEE754(number, 52, 8);
};

var addGetter = function (Constructor, key) {
  defineProperty(Constructor[PROTOTYPE], key, { get: function () { return getInternalState(this)[key]; } });
};

var get = function (view, count, index, isLittleEndian) {
  var intIndex = toIndex(index);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = arraySlice(bytes, start, start + count);
  return isLittleEndian ? pack : reverse(pack);
};

var set = function (view, count, index, conversion, value, isLittleEndian) {
  var intIndex = toIndex(index);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = conversion(+value);
  for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
};

if (!NATIVE_ARRAY_BUFFER) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, ArrayBufferPrototype);
    var byteLength = toIndex(length);
    setInternalState(this, {
      bytes: fill(Array(byteLength), 0),
      byteLength: byteLength
    });
    if (!DESCRIPTORS) this.byteLength = byteLength;
  };

  ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE];

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, DataViewPrototype);
    anInstance(buffer, ArrayBufferPrototype);
    var bufferLength = getInternalState(buffer).byteLength;
    var offset = toIntegerOrInfinity(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    setInternalState(this, {
      buffer: buffer,
      byteLength: byteLength,
      byteOffset: offset
    });
    if (!DESCRIPTORS) {
      this.buffer = buffer;
      this.byteLength = byteLength;
      this.byteOffset = offset;
    }
  };

  DataViewPrototype = $DataView[PROTOTYPE];

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, 'byteLength');
    addGetter($DataView, 'buffer');
    addGetter($DataView, 'byteLength');
    addGetter($DataView, 'byteOffset');
  }

  defineBuiltIns(DataViewPrototype, {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
    }
  });
} else {
  var INCORRECT_ARRAY_BUFFER_NAME = PROPER_FUNCTION_NAME && NativeArrayBuffer.name !== ARRAY_BUFFER;
  /* eslint-disable no-new -- required for testing */
  if (!fails(function () {
    NativeArrayBuffer(1);
  }) || !fails(function () {
    new NativeArrayBuffer(-1);
  }) || fails(function () {
    new NativeArrayBuffer();
    new NativeArrayBuffer(1.5);
    new NativeArrayBuffer(NaN);
    return INCORRECT_ARRAY_BUFFER_NAME && !CONFIGURABLE_FUNCTION_NAME;
  })) {
  /* eslint-enable no-new -- required for testing */
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, ArrayBufferPrototype);
      return new NativeArrayBuffer(toIndex(length));
    };

    $ArrayBuffer[PROTOTYPE] = ArrayBufferPrototype;

    for (var keys = getOwnPropertyNames(NativeArrayBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) {
        createNonEnumerableProperty($ArrayBuffer, key, NativeArrayBuffer[key]);
      }
    }

    ArrayBufferPrototype.constructor = $ArrayBuffer;
  } else if (INCORRECT_ARRAY_BUFFER_NAME && CONFIGURABLE_FUNCTION_NAME) {
    createNonEnumerableProperty(NativeArrayBuffer, 'name', ARRAY_BUFFER);
  }

  // WebKit bug - the same parent prototype for typed arrays and data view
  if (setPrototypeOf && getPrototypeOf(DataViewPrototype) !== ObjectPrototype) {
    setPrototypeOf(DataViewPrototype, ObjectPrototype);
  }

  // iOS Safari 7.x bug
  var testView = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = uncurryThis(DataViewPrototype.setInt8);
  testView.setInt8(0, 2147483648);
  testView.setInt8(1, 2147483649);
  if (testView.getInt8(0) || !testView.getInt8(1)) defineBuiltIns(DataViewPrototype, {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8(this, byteOffset, value << 24 >> 24);
    }
  }, { unsafe: true });
}

setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);

module.exports = {
  ArrayBuffer: $ArrayBuffer,
  DataView: $DataView
};


/***/ }),

/***/ "6374":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "649e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $some = __webpack_require__("b727").some;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.some` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.some
exportTypedArrayMethod('some', function some(callbackfn /* , thisArg */) {
  return $some(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "64e5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");
var fails = __webpack_require__("d039");
var padStart = __webpack_require__("0ccb").start;

var RangeError = global.RangeError;
var abs = Math.abs;
var DatePrototype = Date.prototype;
var n$DateToISOString = DatePrototype.toISOString;
var getTime = uncurryThis(DatePrototype.getTime);
var getUTCDate = uncurryThis(DatePrototype.getUTCDate);
var getUTCFullYear = uncurryThis(DatePrototype.getUTCFullYear);
var getUTCHours = uncurryThis(DatePrototype.getUTCHours);
var getUTCMilliseconds = uncurryThis(DatePrototype.getUTCMilliseconds);
var getUTCMinutes = uncurryThis(DatePrototype.getUTCMinutes);
var getUTCMonth = uncurryThis(DatePrototype.getUTCMonth);
var getUTCSeconds = uncurryThis(DatePrototype.getUTCSeconds);

// `Date.prototype.toISOString` method implementation
// https://tc39.es/ecma262/#sec-date.prototype.toisostring
// PhantomJS / old WebKit fails here:
module.exports = (fails(function () {
  return n$DateToISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  n$DateToISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime(this))) throw RangeError('Invalid time value');
  var date = this;
  var year = getUTCFullYear(date);
  var milliseconds = getUTCMilliseconds(date);
  var sign = year < 0 ? '-' : year > 9999 ? '+' : '';
  return sign + padStart(abs(year), sign ? 6 : 4, 0) +
    '-' + padStart(getUTCMonth(date) + 1, 2, 0) +
    '-' + padStart(getUTCDate(date), 2, 0) +
    'T' + padStart(getUTCHours(date), 2, 0) +
    ':' + padStart(getUTCMinutes(date), 2, 0) +
    ':' + padStart(getUTCSeconds(date), 2, 0) +
    '.' + padStart(milliseconds, 3, 0) +
    'Z';
} : n$DateToISOString;


/***/ }),

/***/ "6547":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");
var toIntegerOrInfinity = __webpack_require__("5926");
var toString = __webpack_require__("577e");
var requireObjectCoercible = __webpack_require__("1d80");

var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var stringSlice = uncurryThis(''.slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString(requireObjectCoercible($this));
    var position = toIntegerOrInfinity(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "6566":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var defineProperty = __webpack_require__("9bf2").f;
var create = __webpack_require__("7c73");
var defineBuiltIns = __webpack_require__("6964");
var bind = __webpack_require__("0366");
var anInstance = __webpack_require__("19aa");
var iterate = __webpack_require__("2266");
var defineIterator = __webpack_require__("7dd0");
var setSpecies = __webpack_require__("2626");
var DESCRIPTORS = __webpack_require__("83ab");
var fastKey = __webpack_require__("f183").fastKey;
var InternalStateModule = __webpack_require__("69f3");

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var Constructor = wrapper(function (that, iterable) {
      anInstance(that, Prototype);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        index: create(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!DESCRIPTORS) that.size = 0;
      if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
    });

    var Prototype = Constructor.prototype;

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      // change existing entry
      if (entry) {
        entry.value = value;
      // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (DESCRIPTORS) state.size++;
        else that.size++;
        // add to index
        if (index !== 'F') state.index[index] = entry;
      } return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that);
      // fast case
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      // frozen object case
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    defineBuiltIns(Prototype, {
      // `{ Map, Set }.prototype.clear()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.clear
      // https://tc39.es/ecma262/#sec-set.prototype.clear
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }
        state.first = state.last = undefined;
        if (DESCRIPTORS) state.size = 0;
        else that.size = 0;
      },
      // `{ Map, Set }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.delete
      // https://tc39.es/ecma262/#sec-set.prototype.delete
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (DESCRIPTORS) state.size--;
          else that.size--;
        } return !!entry;
      },
      // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.foreach
      // https://tc39.es/ecma262/#sec-set.prototype.foreach
      forEach: function forEach(callbackfn /* , that = undefined */) {
        var state = getInternalState(this);
        var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // `{ Map, Set}.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.has
      // https://tc39.es/ecma262/#sec-set.prototype.has
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });

    defineBuiltIns(Prototype, IS_MAP ? {
      // `Map.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-map.prototype.get
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // `Map.prototype.set(key, value)` method
      // https://tc39.es/ecma262/#sec-map.prototype.set
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // `Set.prototype.add(value)` method
      // https://tc39.es/ecma262/#sec-set.prototype.add
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (DESCRIPTORS) defineProperty(Prototype, 'size', {
      get: function () {
        return getInternalState(this).size;
      }
    });
    return Constructor;
  },
  setStrong: function (Constructor, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
    // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
    // https://tc39.es/ecma262/#sec-map.prototype.entries
    // https://tc39.es/ecma262/#sec-map.prototype.keys
    // https://tc39.es/ecma262/#sec-map.prototype.values
    // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
    // https://tc39.es/ecma262/#sec-set.prototype.entries
    // https://tc39.es/ecma262/#sec-set.prototype.keys
    // https://tc39.es/ecma262/#sec-set.prototype.values
    // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
    defineIterator(Constructor, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last;
      // revert to the last existing entry
      while (entry && entry.removed) entry = entry.previous;
      // get next entry
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return { value: undefined, done: true };
      }
      // return step by kind
      if (kind == 'keys') return { value: entry.key, done: false };
      if (kind == 'values') return { value: entry.value, done: false };
      return { value: [entry.key, entry.value], done: false };
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // `{ Map, Set }.prototype[@@species]` accessors
    // https://tc39.es/ecma262/#sec-get-map-@@species
    // https://tc39.es/ecma262/#sec-get-set-@@species
    setSpecies(CONSTRUCTOR_NAME);
  }
};


/***/ }),

/***/ "65f0":
/***/ (function(module, exports, __webpack_require__) {

var arraySpeciesConstructor = __webpack_require__("0b42");

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};


/***/ }),

/***/ "68ee":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");
var fails = __webpack_require__("d039");
var isCallable = __webpack_require__("1626");
var classof = __webpack_require__("f5df");
var getBuiltIn = __webpack_require__("d066");
var inspectSource = __webpack_require__("8925");

var noop = function () { /* empty */ };
var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;


/***/ }),

/***/ "6964":
/***/ (function(module, exports, __webpack_require__) {

var defineBuiltIn = __webpack_require__("cb2d");

module.exports = function (target, src, options) {
  for (var key in src) defineBuiltIn(target, key, src[key], options);
  return target;
};


/***/ }),

/***/ "69f3":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__("7f9a");
var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");
var isObject = __webpack_require__("861d");
var createNonEnumerableProperty = __webpack_require__("9112");
var hasOwn = __webpack_require__("1a2d");
var shared = __webpack_require__("c6cd");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);
  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "6b0d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// runtime helper for setting properties on components
// in a tree-shakable way
exports.default = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
        target[key] = val;
    }
    return target;
};


/***/ }),

/***/ "6d61":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");
var isForced = __webpack_require__("94ca");
var defineBuiltIn = __webpack_require__("cb2d");
var InternalMetadataModule = __webpack_require__("f183");
var iterate = __webpack_require__("2266");
var anInstance = __webpack_require__("19aa");
var isCallable = __webpack_require__("1626");
var isObject = __webpack_require__("861d");
var fails = __webpack_require__("d039");
var checkCorrectnessOfIteration = __webpack_require__("1c7e");
var setToStringTag = __webpack_require__("d44e");
var inheritIfRequired = __webpack_require__("7156");

module.exports = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var exported = {};

  var fixMethod = function (KEY) {
    var uncurriedNativeMethod = uncurryThis(NativePrototype[KEY]);
    defineBuiltIn(NativePrototype, KEY,
      KEY == 'add' ? function add(value) {
        uncurriedNativeMethod(this, value === 0 ? 0 : value);
        return this;
      } : KEY == 'delete' ? function (key) {
        return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : KEY == 'get' ? function get(key) {
        return IS_WEAK && !isObject(key) ? undefined : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : KEY == 'has' ? function has(key) {
        return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : function set(key, value) {
        uncurriedNativeMethod(this, key === 0 ? 0 : key, value);
        return this;
      }
    );
  };

  var REPLACE = isForced(
    CONSTRUCTOR_NAME,
    !isCallable(NativeConstructor) || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
      new NativeConstructor().entries().next();
    }))
  );

  if (REPLACE) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule.enable();
  } else if (isForced(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new -- required for testing
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance(dummy, NativePrototype);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

    // weak collections should not contains .clear method
    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  $({ global: true, constructor: true, forced: Constructor != NativeConstructor }, exported);

  setToStringTag(Constructor, CONSTRUCTOR_NAME);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};


/***/ }),

/***/ "6eba":
/***/ (function(module, exports, __webpack_require__) {

// TODO: Remove from `core-js@4`
var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");

var Date = global.Date;
var getTime = uncurryThis(Date.prototype.getTime);

// `Date.now` method
// https://tc39.es/ecma262/#sec-date.now
$({ target: 'Date', stat: true }, {
  now: function now() {
    return getTime(new Date());
  }
});


/***/ }),

/***/ "6f53":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var uncurryThis = __webpack_require__("e330");
var objectKeys = __webpack_require__("df75");
var toIndexedObject = __webpack_require__("fc6a");
var $propertyIsEnumerable = __webpack_require__("d1e7").f;

var propertyIsEnumerable = uncurryThis($propertyIsEnumerable);
var push = uncurryThis([].push);

// `Object.{ entries, values }` methods implementation
var createMethod = function (TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || propertyIsEnumerable(O, key)) {
        push(result, TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

module.exports = {
  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  entries: createMethod(true),
  // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values
  values: createMethod(false)
};


/***/ }),

/***/ "7149":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var getBuiltIn = __webpack_require__("d066");
var IS_PURE = __webpack_require__("c430");
var NativePromiseConstructor = __webpack_require__("d256");
var FORCED_PROMISE_CONSTRUCTOR = __webpack_require__("4738").CONSTRUCTOR;
var promiseResolve = __webpack_require__("cdf9");

var PromiseConstructorWrapper = getBuiltIn('Promise');
var CHECK_WRAPPER = IS_PURE && !FORCED_PROMISE_CONSTRUCTOR;

// `Promise.resolve` method
// https://tc39.es/ecma262/#sec-promise.resolve
$({ target: 'Promise', stat: true, forced: IS_PURE || FORCED_PROMISE_CONSTRUCTOR }, {
  resolve: function resolve(x) {
    return promiseResolve(CHECK_WRAPPER && this === PromiseConstructorWrapper ? NativePromiseConstructor : this, x);
  }
});


/***/ }),

/***/ "7156":
/***/ (function(module, exports, __webpack_require__) {

var isCallable = __webpack_require__("1626");
var isObject = __webpack_require__("861d");
var setPrototypeOf = __webpack_require__("d2bb");

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ "72f7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var exportTypedArrayMethod = __webpack_require__("ebb5").exportTypedArrayMethod;
var fails = __webpack_require__("d039");
var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");

var Uint8Array = global.Uint8Array;
var Uint8ArrayPrototype = Uint8Array && Uint8Array.prototype || {};
var arrayToString = [].toString;
var join = uncurryThis([].join);

if (fails(function () { arrayToString.call({}); })) {
  arrayToString = function toString() {
    return join(this);
  };
}

var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString != arrayToString;

// `%TypedArray%.prototype.toString` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tostring
exportTypedArrayMethod('toString', arrayToString, IS_NOT_ARRAY_METHOD);


/***/ }),

/***/ "735e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var call = __webpack_require__("c65b");
var $fill = __webpack_require__("81d5");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.fill` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.fill
exportTypedArrayMethod('fill', function fill(value /* , start, end */) {
  var length = arguments.length;
  return call(
    $fill,
    aTypedArray(this),
    value,
    length > 1 ? arguments[1] : undefined,
    length > 2 ? arguments[2] : undefined
  );
});


/***/ }),

/***/ "7418":
/***/ (function(module, exports) {

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "746f":
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__("428f");
var hasOwn = __webpack_require__("1a2d");
var wrappedWellKnownSymbolModule = __webpack_require__("e538");
var defineProperty = __webpack_require__("9bf2").f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!hasOwn(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),

/***/ "74e8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var call = __webpack_require__("c65b");
var DESCRIPTORS = __webpack_require__("83ab");
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = __webpack_require__("8aa7");
var ArrayBufferViewCore = __webpack_require__("ebb5");
var ArrayBufferModule = __webpack_require__("621a");
var anInstance = __webpack_require__("19aa");
var createPropertyDescriptor = __webpack_require__("5c6c");
var createNonEnumerableProperty = __webpack_require__("9112");
var isIntegralNumber = __webpack_require__("eac5");
var toLength = __webpack_require__("50c4");
var toIndex = __webpack_require__("0b25");
var toOffset = __webpack_require__("182d");
var toPropertyKey = __webpack_require__("a04b");
var hasOwn = __webpack_require__("1a2d");
var classof = __webpack_require__("f5df");
var isObject = __webpack_require__("861d");
var isSymbol = __webpack_require__("d9b5");
var create = __webpack_require__("7c73");
var isPrototypeOf = __webpack_require__("3a9b");
var setPrototypeOf = __webpack_require__("d2bb");
var getOwnPropertyNames = __webpack_require__("241c").f;
var typedArrayFrom = __webpack_require__("a078");
var forEach = __webpack_require__("b727").forEach;
var setSpecies = __webpack_require__("2626");
var definePropertyModule = __webpack_require__("9bf2");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var InternalStateModule = __webpack_require__("69f3");
var inheritIfRequired = __webpack_require__("7156");

var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var round = Math.round;
var RangeError = global.RangeError;
var ArrayBuffer = ArrayBufferModule.ArrayBuffer;
var ArrayBufferPrototype = ArrayBuffer.prototype;
var DataView = ArrayBufferModule.DataView;
var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
var TYPED_ARRAY_CONSTRUCTOR = ArrayBufferViewCore.TYPED_ARRAY_CONSTRUCTOR;
var TYPED_ARRAY_TAG = ArrayBufferViewCore.TYPED_ARRAY_TAG;
var TypedArray = ArrayBufferViewCore.TypedArray;
var TypedArrayPrototype = ArrayBufferViewCore.TypedArrayPrototype;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var isTypedArray = ArrayBufferViewCore.isTypedArray;
var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
var WRONG_LENGTH = 'Wrong length';

var fromList = function (C, list) {
  aTypedArrayConstructor(C);
  var index = 0;
  var length = list.length;
  var result = new C(length);
  while (length > index) result[index] = list[index++];
  return result;
};

var addGetter = function (it, key) {
  nativeDefineProperty(it, key, { get: function () {
    return getInternalState(this)[key];
  } });
};

var isArrayBuffer = function (it) {
  var klass;
  return isPrototypeOf(ArrayBufferPrototype, it) || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
};

var isTypedArrayIndex = function (target, key) {
  return isTypedArray(target)
    && !isSymbol(key)
    && key in target
    && isIntegralNumber(+key)
    && key >= 0;
};

var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
  key = toPropertyKey(key);
  return isTypedArrayIndex(target, key)
    ? createPropertyDescriptor(2, target[key])
    : nativeGetOwnPropertyDescriptor(target, key);
};

var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
  key = toPropertyKey(key);
  if (isTypedArrayIndex(target, key)
    && isObject(descriptor)
    && hasOwn(descriptor, 'value')
    && !hasOwn(descriptor, 'get')
    && !hasOwn(descriptor, 'set')
    // TODO: add validation descriptor w/o calling accessors
    && !descriptor.configurable
    && (!hasOwn(descriptor, 'writable') || descriptor.writable)
    && (!hasOwn(descriptor, 'enumerable') || descriptor.enumerable)
  ) {
    target[key] = descriptor.value;
    return target;
  } return nativeDefineProperty(target, key, descriptor);
};

if (DESCRIPTORS) {
  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
    getOwnPropertyDescriptorModule.f = wrappedGetOwnPropertyDescriptor;
    definePropertyModule.f = wrappedDefineProperty;
    addGetter(TypedArrayPrototype, 'buffer');
    addGetter(TypedArrayPrototype, 'byteOffset');
    addGetter(TypedArrayPrototype, 'byteLength');
    addGetter(TypedArrayPrototype, 'length');
  }

  $({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
    defineProperty: wrappedDefineProperty
  });

  module.exports = function (TYPE, wrapper, CLAMPED) {
    var BYTES = TYPE.match(/\d+$/)[0] / 8;
    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + TYPE;
    var SETTER = 'set' + TYPE;
    var NativeTypedArrayConstructor = global[CONSTRUCTOR_NAME];
    var TypedArrayConstructor = NativeTypedArrayConstructor;
    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
    var exported = {};

    var getter = function (that, index) {
      var data = getInternalState(that);
      return data.view[GETTER](index * BYTES + data.byteOffset, true);
    };

    var setter = function (that, index, value) {
      var data = getInternalState(that);
      if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
      data.view[SETTER](index * BYTES + data.byteOffset, value, true);
    };

    var addElement = function (that, index) {
      nativeDefineProperty(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };

    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
      TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
        anInstance(that, TypedArrayConstructorPrototype);
        var index = 0;
        var byteOffset = 0;
        var buffer, byteLength, length;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new ArrayBuffer(byteLength);
        } else if (isArrayBuffer(data)) {
          buffer = data;
          byteOffset = toOffset(offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - byteOffset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + byteOffset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (isTypedArray(data)) {
          return fromList(TypedArrayConstructor, data);
        } else {
          return call(typedArrayFrom, TypedArrayConstructor, data);
        }
        setInternalState(that, {
          buffer: buffer,
          byteOffset: byteOffset,
          byteLength: byteLength,
          length: length,
          view: new DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create(TypedArrayPrototype);
    } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS) {
      TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
        anInstance(dummy, TypedArrayConstructorPrototype);
        return inheritIfRequired(function () {
          if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
          if (isArrayBuffer(data)) return $length !== undefined
            ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES), $length)
            : typedArrayOffset !== undefined
              ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES))
              : new NativeTypedArrayConstructor(data);
          if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
          return call(typedArrayFrom, TypedArrayConstructor, data);
        }(), dummy, TypedArrayConstructor);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
        if (!(key in TypedArrayConstructor)) {
          createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
        }
      });
      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
    }

    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
    }

    createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_CONSTRUCTOR, TypedArrayConstructor);

    if (TYPED_ARRAY_TAG) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
    }

    var FORCED = TypedArrayConstructor != NativeTypedArrayConstructor;

    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

    $({ global: true, constructor: true, forced: FORCED, sham: !NATIVE_ARRAY_BUFFER_VIEWS }, exported);

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
      createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
    }

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
    }

    setSpecies(CONSTRUCTOR_NAME);
  };
} else module.exports = function () { /* empty */ };


/***/ }),

/***/ "74fe":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("2d78");


/***/ }),

/***/ "7656":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.AMPERSAND = exports.CLOSEPAREN = exports.CLOSEANGLEBRACKET = exports.CLOSEBRACKET = exports.CLOSEBRACE = exports.OPENPAREN = exports.OPENANGLEBRACKET = exports.OPENBRACKET = exports.OPENBRACE = exports.WS = exports.TLD = exports.SYM = exports.UNDERSCORE = exports.SLASH = exports.MAILTO = exports.PROTOCOL = exports.QUERY = exports.POUND = exports.PLUS = exports.NUM = exports.NL = exports.LOCALHOST = exports.PUNCTUATION = exports.DOT = exports.COLON = exports.AT = exports.DOMAIN = exports.Base = undefined;

var _createTokenClass = __webpack_require__("46f3");

var _class = __webpack_require__("254c");

/******************************************************************************
	Text Tokens
	Tokens composed of strings
******************************************************************************/

/**
	Abstract class used for manufacturing text tokens.
	Pass in the value this token represents

	@class TextToken
	@abstract
*/
var TextToken = (0, _createTokenClass.createTokenClass)();
TextToken.prototype = {
	toString: function toString() {
		return this.v + '';
	}
};

function inheritsToken(value) {
	var props = value ? { v: value } : {};
	return (0, _class.inherits)(TextToken, (0, _createTokenClass.createTokenClass)(), props);
}

/**
	A valid domain token
	@class DOMAIN
	@extends TextToken
*/
var DOMAIN = inheritsToken();

/**
	@class AT
	@extends TextToken
*/
var AT = inheritsToken('@');

/**
	Represents a single colon `:` character

	@class COLON
	@extends TextToken
*/
var COLON = inheritsToken(':');

/**
	@class DOT
	@extends TextToken
*/
var DOT = inheritsToken('.');

/**
	A character class that can surround the URL, but which the URL cannot begin
	or end with. Does not include certain English punctuation like parentheses.

	@class PUNCTUATION
	@extends TextToken
*/
var PUNCTUATION = inheritsToken();

/**
	The word localhost (by itself)
	@class LOCALHOST
	@extends TextToken
*/
var LOCALHOST = inheritsToken();

/**
	Newline token
	@class NL
	@extends TextToken
*/
var NL = inheritsToken('\n');

/**
	@class NUM
	@extends TextToken
*/
var NUM = inheritsToken();

/**
	@class PLUS
	@extends TextToken
*/
var PLUS = inheritsToken('+');

/**
	@class POUND
	@extends TextToken
*/
var POUND = inheritsToken('#');

/**
	Represents a web URL protocol. Supported types include

	* `http:`
	* `https:`
	* `ftp:`
	* `ftps:`

	@class PROTOCOL
	@extends TextToken
*/
var PROTOCOL = inheritsToken();

/**
	Represents the start of the email URI protocol

	@class MAILTO
	@extends TextToken
*/
var MAILTO = inheritsToken('mailto:');

/**
	@class QUERY
	@extends TextToken
*/
var QUERY = inheritsToken('?');

/**
	@class SLASH
	@extends TextToken
*/
var SLASH = inheritsToken('/');

/**
	@class UNDERSCORE
	@extends TextToken
*/
var UNDERSCORE = inheritsToken('_');

/**
	One ore more non-whitespace symbol.
	@class SYM
	@extends TextToken
*/
var SYM = inheritsToken();

/**
	@class TLD
	@extends TextToken
*/
var TLD = inheritsToken();

/**
	Represents a string of consecutive whitespace characters

	@class WS
	@extends TextToken
*/
var WS = inheritsToken();

/**
	Opening/closing bracket classes
*/

var OPENBRACE = inheritsToken('{');
var OPENBRACKET = inheritsToken('[');
var OPENANGLEBRACKET = inheritsToken('<');
var OPENPAREN = inheritsToken('(');
var CLOSEBRACE = inheritsToken('}');
var CLOSEBRACKET = inheritsToken(']');
var CLOSEANGLEBRACKET = inheritsToken('>');
var CLOSEPAREN = inheritsToken(')');

var AMPERSAND = inheritsToken('&');

exports.Base = TextToken;
exports.DOMAIN = DOMAIN;
exports.AT = AT;
exports.COLON = COLON;
exports.DOT = DOT;
exports.PUNCTUATION = PUNCTUATION;
exports.LOCALHOST = LOCALHOST;
exports.NL = NL;
exports.NUM = NUM;
exports.PLUS = PLUS;
exports.POUND = POUND;
exports.QUERY = QUERY;
exports.PROTOCOL = PROTOCOL;
exports.MAILTO = MAILTO;
exports.SLASH = SLASH;
exports.UNDERSCORE = UNDERSCORE;
exports.SYM = SYM;
exports.TLD = TLD;
exports.WS = WS;
exports.OPENBRACE = OPENBRACE;
exports.OPENBRACKET = OPENBRACKET;
exports.OPENANGLEBRACKET = OPENANGLEBRACKET;
exports.OPENPAREN = OPENPAREN;
exports.CLOSEBRACE = CLOSEBRACE;
exports.CLOSEBRACKET = CLOSEBRACKET;
exports.CLOSEANGLEBRACKET = CLOSEANGLEBRACKET;
exports.CLOSEPAREN = CLOSEPAREN;
exports.AMPERSAND = AMPERSAND;

/***/ }),

/***/ "77a7":
/***/ (function(module, exports, __webpack_require__) {

// IEEE754 conversions based on https://github.com/feross/ieee754
var global = __webpack_require__("da84");

var Array = global.Array;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;

var pack = function (number, mantissaLength, bytes) {
  var buffer = Array(bytes);
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
  var index = 0;
  var exponent, mantissa, c;
  number = abs(number);
  // eslint-disable-next-line no-self-compare -- NaN check
  if (number != number || number === Infinity) {
    // eslint-disable-next-line no-self-compare -- NaN check
    mantissa = number != number ? 1 : 0;
    exponent = eMax;
  } else {
    exponent = floor(log(number) / LN2);
    c = pow(2, -exponent);
    if (number * c < 1) {
      exponent--;
      c *= 2;
    }
    if (exponent + eBias >= 1) {
      number += rt / c;
    } else {
      number += rt * pow(2, 1 - eBias);
    }
    if (number * c >= 2) {
      exponent++;
      c /= 2;
    }
    if (exponent + eBias >= eMax) {
      mantissa = 0;
      exponent = eMax;
    } else if (exponent + eBias >= 1) {
      mantissa = (number * c - 1) * pow(2, mantissaLength);
      exponent = exponent + eBias;
    } else {
      mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
      exponent = 0;
    }
  }
  while (mantissaLength >= 8) {
    buffer[index++] = mantissa & 255;
    mantissa /= 256;
    mantissaLength -= 8;
  }
  exponent = exponent << mantissaLength | mantissa;
  exponentLength += mantissaLength;
  while (exponentLength > 0) {
    buffer[index++] = exponent & 255;
    exponent /= 256;
    exponentLength -= 8;
  }
  buffer[--index] |= sign * 128;
  return buffer;
};

var unpack = function (buffer, mantissaLength) {
  var bytes = buffer.length;
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var nBits = exponentLength - 7;
  var index = bytes - 1;
  var sign = buffer[index--];
  var exponent = sign & 127;
  var mantissa;
  sign >>= 7;
  while (nBits > 0) {
    exponent = exponent * 256 + buffer[index--];
    nBits -= 8;
  }
  mantissa = exponent & (1 << -nBits) - 1;
  exponent >>= -nBits;
  nBits += mantissaLength;
  while (nBits > 0) {
    mantissa = mantissa * 256 + buffer[index--];
    nBits -= 8;
  }
  if (exponent === 0) {
    exponent = 1 - eBias;
  } else if (exponent === eMax) {
    return mantissa ? NaN : sign ? -Infinity : Infinity;
  } else {
    mantissa = mantissa + pow(2, mantissaLength);
    exponent = exponent - eBias;
  } return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
};

module.exports = {
  pack: pack,
  unpack: unpack
};


/***/ }),

/***/ "7839":
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "785a":
/***/ (function(module, exports, __webpack_require__) {

// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = __webpack_require__("cc12");

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

module.exports = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;


/***/ }),

/***/ "7a82":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var DESCRIPTORS = __webpack_require__("83ab");
var defineProperty = __webpack_require__("9bf2").f;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
$({ target: 'Object', stat: true, forced: Object.defineProperty !== defineProperty, sham: !DESCRIPTORS }, {
  defineProperty: defineProperty
});


/***/ }),

/***/ "7b0b":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var requireObjectCoercible = __webpack_require__("1d80");

var Object = global.Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "7c73":
/***/ (function(module, exports, __webpack_require__) {

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__("825a");
var definePropertiesModule = __webpack_require__("37e8");
var enumBugKeys = __webpack_require__("7839");
var hiddenKeys = __webpack_require__("d012");
var html = __webpack_require__("1be4");
var documentCreateElement = __webpack_require__("cc12");
var sharedKey = __webpack_require__("f772");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es-x/no-object-create -- safe
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};


/***/ }),

/***/ "7db0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $find = __webpack_require__("b727").find;
var addToUnscopables = __webpack_require__("44d2");

var FIND = 'find';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.es/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);


/***/ }),

/***/ "7dd0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var call = __webpack_require__("c65b");
var IS_PURE = __webpack_require__("c430");
var FunctionName = __webpack_require__("5e77");
var isCallable = __webpack_require__("1626");
var createIteratorConstructor = __webpack_require__("9ed3");
var getPrototypeOf = __webpack_require__("e163");
var setPrototypeOf = __webpack_require__("d2bb");
var setToStringTag = __webpack_require__("d44e");
var createNonEnumerableProperty = __webpack_require__("9112");
var defineBuiltIn = __webpack_require__("cb2d");
var wellKnownSymbol = __webpack_require__("b622");
var Iterators = __webpack_require__("3f8c");
var IteratorsCore = __webpack_require__("ae93");

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
          defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
  }
  Iterators[NAME] = defaultIterator;

  return methods;
};


/***/ }),

/***/ "7e12":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var fails = __webpack_require__("d039");
var uncurryThis = __webpack_require__("e330");
var toString = __webpack_require__("577e");
var trim = __webpack_require__("58a8").trim;
var whitespaces = __webpack_require__("5899");

var charAt = uncurryThis(''.charAt);
var n$ParseFloat = global.parseFloat;
var Symbol = global.Symbol;
var ITERATOR = Symbol && Symbol.iterator;
var FORCED = 1 / n$ParseFloat(whitespaces + '-0') !== -Infinity
  // MS Edge 18- broken with boxed symbols
  || (ITERATOR && !fails(function () { n$ParseFloat(Object(ITERATOR)); }));

// `parseFloat` method
// https://tc39.es/ecma262/#sec-parsefloat-string
module.exports = FORCED ? function parseFloat(string) {
  var trimmedString = trim(toString(string));
  var result = n$ParseFloat(trimmedString);
  return result === 0 && charAt(trimmedString, 0) == '-' ? -0 : result;
} : n$ParseFloat;


/***/ }),

/***/ "7f9a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isCallable = __webpack_require__("1626");
var inspectSource = __webpack_require__("8925");

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "81d5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toObject = __webpack_require__("7b0b");
var toAbsoluteIndex = __webpack_require__("23cb");
var lengthOfArrayLike = __webpack_require__("07fa");

// `Array.prototype.fill` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.fill
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = lengthOfArrayLike(O);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),

/***/ "825a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");

var String = global.String;
var TypeError = global.TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw TypeError(String(argument) + ' is not an object');
};


/***/ }),

/***/ "8264":
/***/ (function(module, exports, __webpack_require__) {

!function(e,n){ true?module.exports=n():undefined}(this,function(){var e="__v-click-outside",n="undefined"!=typeof window,t="undefined"!=typeof navigator,r=n&&("ontouchstart"in window||t&&navigator.msMaxTouchPoints>0)?["touchstart"]:["click"],i=function(e){var n=e.event,t=e.handler;(0,e.middleware)(n)&&t(n)},a=function(n,t){var a=function(e){var n="function"==typeof e;if(!n&&"object"!=typeof e)throw new Error("v-click-outside: Binding value must be a function or an object");return{handler:n?e:e.handler,middleware:e.middleware||function(e){return e},events:e.events||r,isActive:!(!1===e.isActive),detectIframe:!(!1===e.detectIframe),capture:Boolean(e.capture)}}(t.value),o=a.handler,d=a.middleware,c=a.detectIframe,u=a.capture;if(a.isActive){if(n[e]=a.events.map(function(e){return{event:e,srcTarget:document.documentElement,handler:function(e){return function(e){var n=e.el,t=e.event,r=e.handler,a=e.middleware,o=t.path||t.composedPath&&t.composedPath();(o?o.indexOf(n)<0:!n.contains(t.target))&&i({event:t,handler:r,middleware:a})}({el:n,event:e,handler:o,middleware:d})},capture:u}}),c){var l={event:"blur",srcTarget:window,handler:function(e){return function(e){var n=e.el,t=e.event,r=e.handler,a=e.middleware;setTimeout(function(){var e=document.activeElement;e&&"IFRAME"===e.tagName&&!n.contains(e)&&i({event:t,handler:r,middleware:a})},0)}({el:n,event:e,handler:o,middleware:d})},capture:u};n[e]=[].concat(n[e],[l])}n[e].forEach(function(t){var r=t.event,i=t.srcTarget,a=t.handler;return setTimeout(function(){n[e]&&i.addEventListener(r,a,u)},0)})}},o=function(n){(n[e]||[]).forEach(function(e){return e.srcTarget.removeEventListener(e.event,e.handler,e.capture)}),delete n[e]},d=n?{beforeMount:a,updated:function(e,n){var t=n.value,r=n.oldValue;JSON.stringify(t)!==JSON.stringify(r)&&(o(e),a(e,{value:t}))},unmounted:o}:{};return{install:function(e){e.directive("click-outside",d)},directive:d}});
//# sourceMappingURL=v-click-outside.umd.js.map


/***/ }),

/***/ "82f8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $includes = __webpack_require__("4d64").includes;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.includes` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.includes
exportTypedArrayMethod('includes', function includes(searchElement /* , fromIndex */) {
  return $includes(aTypedArray(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "83ab":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "8418":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPropertyKey = __webpack_require__("a04b");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ "841c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var call = __webpack_require__("c65b");
var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var anObject = __webpack_require__("825a");
var requireObjectCoercible = __webpack_require__("1d80");
var sameValue = __webpack_require__("129f");
var toString = __webpack_require__("577e");
var getMethod = __webpack_require__("dc4a");
var regExpExec = __webpack_require__("14c3");

// @@search logic
fixRegExpWellKnownSymbolLogic('search', function (SEARCH, nativeSearch, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.es/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = requireObjectCoercible(this);
      var searcher = regexp == undefined ? undefined : getMethod(regexp, SEARCH);
      return searcher ? call(searcher, regexp, O) : new RegExp(regexp)[SEARCH](toString(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
    function (string) {
      var rx = anObject(this);
      var S = toString(string);
      var res = maybeCallNative(nativeSearch, rx, S);

      if (res.done) return res.value;

      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});


/***/ }),

/***/ "857a":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");
var requireObjectCoercible = __webpack_require__("1d80");
var toString = __webpack_require__("577e");

var quot = /"/g;
var replace = uncurryThis(''.replace);

// `CreateHTML` abstract operation
// https://tc39.es/ecma262/#sec-createhtml
module.exports = function (string, tag, attribute, value) {
  var S = toString(requireObjectCoercible(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + replace(toString(value), quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};


/***/ }),

/***/ "861d":
/***/ (function(module, exports, __webpack_require__) {

var isCallable = __webpack_require__("1626");

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "8925":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");
var isCallable = __webpack_require__("1626");
var store = __webpack_require__("c6cd");

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "8930":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "8a79":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var uncurryThis = __webpack_require__("e330");
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var toLength = __webpack_require__("50c4");
var toString = __webpack_require__("577e");
var notARegExp = __webpack_require__("5a34");
var requireObjectCoercible = __webpack_require__("1d80");
var correctIsRegExpLogic = __webpack_require__("ab13");
var IS_PURE = __webpack_require__("c430");

// eslint-disable-next-line es-x/no-string-prototype-endswith -- safe
var un$EndsWith = uncurryThis(''.endsWith);
var slice = uncurryThis(''.slice);
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('endsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor(String.prototype, 'endsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.endsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.endswith
$({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = toString(requireObjectCoercible(this));
    notARegExp(searchString);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = that.length;
    var end = endPosition === undefined ? len : min(toLength(endPosition), len);
    var search = toString(searchString);
    return un$EndsWith
      ? un$EndsWith(that, search, end)
      : slice(that, end - search.length, end) === search;
  }
});


/***/ }),

/***/ "8aa5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__("6547").charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ "8aa7":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-new -- required for testing */
var global = __webpack_require__("da84");
var fails = __webpack_require__("d039");
var checkCorrectnessOfIteration = __webpack_require__("1c7e");
var NATIVE_ARRAY_BUFFER_VIEWS = __webpack_require__("ebb5").NATIVE_ARRAY_BUFFER_VIEWS;

var ArrayBuffer = global.ArrayBuffer;
var Int8Array = global.Int8Array;

module.exports = !NATIVE_ARRAY_BUFFER_VIEWS || !fails(function () {
  Int8Array(1);
}) || !fails(function () {
  new Int8Array(-1);
}) || !checkCorrectnessOfIteration(function (iterable) {
  new Int8Array();
  new Int8Array(null);
  new Int8Array(1.5);
  new Int8Array(iterable);
}, true) || fails(function () {
  // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
  return new Int8Array(new ArrayBuffer(2), 1, undefined).length !== 1;
});


/***/ }),

/***/ "8b09":
/***/ (function(module, exports, __webpack_require__) {

var createTypedArrayConstructor = __webpack_require__("74e8");

// `Int16Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Int16', function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ "907a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var lengthOfArrayLike = __webpack_require__("07fa");
var toIntegerOrInfinity = __webpack_require__("5926");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.at` method
// https://github.com/tc39/proposal-relative-indexing-method
exportTypedArrayMethod('at', function at(index) {
  var O = aTypedArray(this);
  var len = lengthOfArrayLike(O);
  var relativeIndex = toIntegerOrInfinity(index);
  var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
  return (k < 0 || k >= len) ? undefined : O[k];
});


/***/ }),

/***/ "90d8":
/***/ (function(module, exports, __webpack_require__) {

var call = __webpack_require__("c65b");
var hasOwn = __webpack_require__("1a2d");
var isPrototypeOf = __webpack_require__("3a9b");
var regExpFlags = __webpack_require__("ad6d");

var RegExpPrototype = RegExp.prototype;

module.exports = function (R) {
  var flags = R.flags;
  return flags === undefined && !('flags' in RegExpPrototype) && !hasOwn(R, 'flags') && isPrototypeOf(RegExpPrototype, R)
    ? call(regExpFlags, R) : flags;
};


/***/ }),

/***/ "90e3":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ "9112":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "9263":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call = __webpack_require__("c65b");
var uncurryThis = __webpack_require__("e330");
var toString = __webpack_require__("577e");
var regexpFlags = __webpack_require__("ad6d");
var stickyHelpers = __webpack_require__("9f7f");
var shared = __webpack_require__("5692");
var create = __webpack_require__("7c73");
var getInternalState = __webpack_require__("69f3").get;
var UNSUPPORTED_DOT_ALL = __webpack_require__("fce3");
var UNSUPPORTED_NCG = __webpack_require__("107c");

var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt = uncurryThis(''.charAt);
var indexOf = uncurryThis(''.indexOf);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call(nativeExec, re1, 'a');
  call(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState(re);
    var str = toString(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace(flags, 'y', '');
      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = call(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice(match.input, charsAdded);
        match[0] = stringSlice(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      call(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "944a":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");
var defineWellKnownSymbol = __webpack_require__("746f");
var setToStringTag = __webpack_require__("d44e");

// `Symbol.toStringTag` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.tostringtag
defineWellKnownSymbol('toStringTag');

// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag(getBuiltIn('Symbol'), 'Symbol');


/***/ }),

/***/ "94ca":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var isCallable = __webpack_require__("1626");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "9861":
/***/ (function(module, exports, __webpack_require__) {

// TODO: Remove this module from `core-js@4` since it's replaced to module below
__webpack_require__("5352");


/***/ }),

/***/ "99af":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var fails = __webpack_require__("d039");
var isArray = __webpack_require__("e8b5");
var isObject = __webpack_require__("861d");
var toObject = __webpack_require__("7b0b");
var lengthOfArrayLike = __webpack_require__("07fa");
var createProperty = __webpack_require__("8418");
var arraySpeciesCreate = __webpack_require__("65f0");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var wellKnownSymbol = __webpack_require__("b622");
var V8_VERSION = __webpack_require__("2d00");

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
var TypeError = global.TypeError;

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = lengthOfArrayLike(E);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),

/***/ "9a1f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var call = __webpack_require__("c65b");
var aCallable = __webpack_require__("59ed");
var anObject = __webpack_require__("825a");
var tryToString = __webpack_require__("0d51");
var getIteratorMethod = __webpack_require__("35a1");

var TypeError = global.TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw TypeError(tryToString(argument) + ' is not iterable');
};


/***/ }),

/***/ "9a8c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__("e330");
var ArrayBufferViewCore = __webpack_require__("ebb5");
var $ArrayCopyWithin = __webpack_require__("145e");

var u$ArrayCopyWithin = uncurryThis($ArrayCopyWithin);
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.copyWithin` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.copywithin
exportTypedArrayMethod('copyWithin', function copyWithin(target, start /* , end */) {
  return u$ArrayCopyWithin(aTypedArray(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
});


/***/ }),

/***/ "9bdd":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var iteratorClose = __webpack_require__("2a62");

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};


/***/ }),

/***/ "9bf2":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DESCRIPTORS = __webpack_require__("83ab");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__("aed9");
var anObject = __webpack_require__("825a");
var toPropertyKey = __webpack_require__("a04b");

var TypeError = global.TypeError;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "9e69":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ChatWindow_vue_vue_type_style_index_0_id_607979cc_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8930");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ChatWindow_vue_vue_type_style_index_0_id_607979cc_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ChatWindow_vue_vue_type_style_index_0_id_607979cc_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "9ed3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__("ae93").IteratorPrototype;
var create = __webpack_require__("7c73");
var createPropertyDescriptor = __webpack_require__("5c6c");
var setToStringTag = __webpack_require__("d44e");
var Iterators = __webpack_require__("3f8c");

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ "9f7f":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var global = __webpack_require__("da84");

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp = global.RegExp;

var UNSUPPORTED_Y = fails(function () {
  var re = $RegExp('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

// UC Browser bug
// https://github.com/zloirock/core-js/issues/1008
var MISSED_STICKY = UNSUPPORTED_Y || fails(function () {
  return !$RegExp('a', 'y').sticky;
});

var BROKEN_CARET = UNSUPPORTED_Y || fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

module.exports = {
  BROKEN_CARET: BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY,
  UNSUPPORTED_Y: UNSUPPORTED_Y
};


/***/ }),

/***/ "a04b":
/***/ (function(module, exports, __webpack_require__) {

var toPrimitive = __webpack_require__("c04e");
var isSymbol = __webpack_require__("d9b5");

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ "a078":
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__("0366");
var call = __webpack_require__("c65b");
var aConstructor = __webpack_require__("5087");
var toObject = __webpack_require__("7b0b");
var lengthOfArrayLike = __webpack_require__("07fa");
var getIterator = __webpack_require__("9a1f");
var getIteratorMethod = __webpack_require__("35a1");
var isArrayIteratorMethod = __webpack_require__("e95a");
var aTypedArrayConstructor = __webpack_require__("ebb5").aTypedArrayConstructor;

module.exports = function from(source /* , mapfn, thisArg */) {
  var C = aConstructor(this);
  var O = toObject(source);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var i, length, result, step, iterator, next;
  if (iteratorMethod && !isArrayIteratorMethod(iteratorMethod)) {
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    O = [];
    while (!(step = call(next, iterator)).done) {
      O.push(step.value);
    }
  }
  if (mapping && argumentsLength > 2) {
    mapfn = bind(mapfn, arguments[2]);
  }
  length = lengthOfArrayLike(O);
  result = new (aTypedArrayConstructor(C))(length);
  for (i = 0; length > i; i++) {
    result[i] = mapping ? mapfn(O[i], i) : O[i];
  }
  return result;
};


/***/ }),

/***/ "a15b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var uncurryThis = __webpack_require__("e330");
var IndexedObject = __webpack_require__("44ad");
var toIndexedObject = __webpack_require__("fc6a");
var arrayMethodIsStrict = __webpack_require__("a640");

var un$Join = uncurryThis([].join);

var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.es/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
  join: function join(separator) {
    return un$Join(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),

/***/ "a434":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var toAbsoluteIndex = __webpack_require__("23cb");
var toIntegerOrInfinity = __webpack_require__("5926");
var lengthOfArrayLike = __webpack_require__("07fa");
var toObject = __webpack_require__("7b0b");
var arraySpeciesCreate = __webpack_require__("65f0");
var createProperty = __webpack_require__("8418");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

var TypeError = global.TypeError;
var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.es/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});


/***/ }),

/***/ "a4b4":
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__("342f");

module.exports = /web0s(?!.*chrome)/i.test(userAgent);


/***/ }),

/***/ "a4d3":
/***/ (function(module, exports, __webpack_require__) {

// TODO: Remove this module from `core-js@4` since it's split to modules listed below
__webpack_require__("d9f5");
__webpack_require__("b4f8");
__webpack_require__("c513");
__webpack_require__("e9c4");
__webpack_require__("5a47");


/***/ }),

/***/ "a623":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $every = __webpack_require__("b727").every;
var arrayMethodIsStrict = __webpack_require__("a640");

var STRICT_METHOD = arrayMethodIsStrict('every');

// `Array.prototype.every` method
// https://tc39.es/ecma262/#sec-array.prototype.every
$({ target: 'Array', proto: true, forced: !STRICT_METHOD }, {
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "a630":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var from = __webpack_require__("4df4");
var checkCorrectnessOfIteration = __webpack_require__("1c7e");

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  // eslint-disable-next-line es-x/no-array-from -- required for testing
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.es/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});


/***/ }),

/***/ "a640":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("d039");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call -- required for testing
    method.call(null, argument || function () { return 1; }, 1);
  });
};


/***/ }),

/***/ "a975":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $every = __webpack_require__("b727").every;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.every` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.every
exportTypedArrayMethod('every', function every(callbackfn /* , thisArg */) {
  return $every(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "a981":
/***/ (function(module, exports) {

// eslint-disable-next-line es-x/no-typed-arrays -- safe
module.exports = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';


/***/ }),

/***/ "a9e3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");
var isForced = __webpack_require__("94ca");
var defineBuiltIn = __webpack_require__("cb2d");
var hasOwn = __webpack_require__("1a2d");
var inheritIfRequired = __webpack_require__("7156");
var isPrototypeOf = __webpack_require__("3a9b");
var isSymbol = __webpack_require__("d9b5");
var toPrimitive = __webpack_require__("c04e");
var fails = __webpack_require__("d039");
var getOwnPropertyNames = __webpack_require__("241c").f;
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var defineProperty = __webpack_require__("9bf2").f;
var thisNumberValue = __webpack_require__("408a");
var trim = __webpack_require__("58a8").trim;

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;
var TypeError = global.TypeError;
var arraySlice = uncurryThis(''.slice);
var charCodeAt = uncurryThis(''.charCodeAt);

// `ToNumeric` abstract operation
// https://tc39.es/ecma262/#sec-tonumeric
var toNumeric = function (value) {
  var primValue = toPrimitive(value, 'number');
  return typeof primValue == 'bigint' ? primValue : toNumber(primValue);
};

// `ToNumber` abstract operation
// https://tc39.es/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, 'number');
  var first, third, radix, maxCode, digits, length, index, code;
  if (isSymbol(it)) throw TypeError('Cannot convert a Symbol value to a number');
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = charCodeAt(it, 0);
    if (first === 43 || first === 45) {
      third = charCodeAt(it, 2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (charCodeAt(it, 1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = arraySlice(it, 2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = charCodeAt(digits, index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.es/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
    var dummy = this;
    // check on 1..constructor(foo) case
    return isPrototypeOf(NumberPrototype, dummy) && fails(function () { thisNumberValue(dummy); })
      ? inheritIfRequired(Object(n), dummy, NumberWrapper) : n;
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' +
    // ESNext
    'fromString,range'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (hasOwn(NativeNumber, key = keys[j]) && !hasOwn(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  defineBuiltIn(global, NUMBER, NumberWrapper, { constructor: true });
}


/***/ }),

/***/ "aa1f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var anObject = __webpack_require__("825a");
var create = __webpack_require__("7c73");
var normalizeStringArgument = __webpack_require__("e391");

var nativeErrorToString = Error.prototype.toString;

var INCORRECT_TO_STRING = fails(function () {
  if (DESCRIPTORS) {
    // Chrome 32- incorrectly call accessor
    // eslint-disable-next-line es-x/no-object-defineproperty -- safe
    var object = create(Object.defineProperty({}, 'name', { get: function () {
      return this === object;
    } }));
    if (nativeErrorToString.call(object) !== 'true') return true;
  }
  // FF10- does not properly handle non-strings
  return nativeErrorToString.call({ message: 1, name: 2 }) !== '2: 1'
    // IE8 does not properly handle defaults
    || nativeErrorToString.call({}) !== 'Error';
});

module.exports = INCORRECT_TO_STRING ? function toString() {
  var O = anObject(this);
  var name = normalizeStringArgument(O.name, 'Error');
  var message = normalizeStringArgument(O.message);
  return !name ? message : !message ? name : name + ': ' + message;
} : nativeErrorToString;


/***/ }),

/***/ "ab13":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) { /* empty */ }
  } return false;
};


/***/ }),

/***/ "ab36":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var createNonEnumerableProperty = __webpack_require__("9112");

// `InstallErrorCause` abstract operation
// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
module.exports = function (O, options) {
  if (isObject(options) && 'cause' in options) {
    createNonEnumerableProperty(O, 'cause', options.cause);
  }
};


/***/ }),

/***/ "ac1f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var exec = __webpack_require__("9263");

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ "accc":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var toISOString = __webpack_require__("64e5");

// `Date.prototype.toISOString` method
// https://tc39.es/ecma262/#sec-date.prototype.toisostring
// PhantomJS / old WebKit has a broken implementations
$({ target: 'Date', proto: true, forced: Date.prototype.toISOString !== toISOString }, {
  toISOString: toISOString
});


/***/ }),

/***/ "acd8":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var $parseFloat = __webpack_require__("7e12");

// `parseFloat` method
// https://tc39.es/ecma262/#sec-parsefloat-string
$({ global: true, forced: parseFloat != $parseFloat }, {
  parseFloat: $parseFloat
});


/***/ }),

/***/ "ace4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var uncurryThis = __webpack_require__("e330");
var fails = __webpack_require__("d039");
var ArrayBufferModule = __webpack_require__("621a");
var anObject = __webpack_require__("825a");
var toAbsoluteIndex = __webpack_require__("23cb");
var toLength = __webpack_require__("50c4");
var speciesConstructor = __webpack_require__("4840");

var ArrayBuffer = ArrayBufferModule.ArrayBuffer;
var DataView = ArrayBufferModule.DataView;
var DataViewPrototype = DataView.prototype;
var un$ArrayBufferSlice = uncurryThis(ArrayBuffer.prototype.slice);
var getUint8 = uncurryThis(DataViewPrototype.getUint8);
var setUint8 = uncurryThis(DataViewPrototype.setUint8);

var INCORRECT_SLICE = fails(function () {
  return !new ArrayBuffer(2).slice(1, undefined).byteLength;
});

// `ArrayBuffer.prototype.slice` method
// https://tc39.es/ecma262/#sec-arraybuffer.prototype.slice
$({ target: 'ArrayBuffer', proto: true, unsafe: true, forced: INCORRECT_SLICE }, {
  slice: function slice(start, end) {
    if (un$ArrayBufferSlice && end === undefined) {
      return un$ArrayBufferSlice(anObject(this), start); // FF fix
    }
    var length = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    var result = new (speciesConstructor(this, ArrayBuffer))(toLength(fin - first));
    var viewSource = new DataView(this);
    var viewTarget = new DataView(result);
    var index = 0;
    while (first < fin) {
      setUint8(viewTarget, index++, getUint8(viewSource, first++));
    } return result;
  }
});


/***/ }),

/***/ "ad6d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__("825a");

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.hasIndices) result += 'd';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "addb":
/***/ (function(module, exports, __webpack_require__) {

var arraySlice = __webpack_require__("4dae");

var floor = Math.floor;

var mergeSort = function (array, comparefn) {
  var length = array.length;
  var middle = floor(length / 2);
  return length < 8 ? insertionSort(array, comparefn) : merge(
    array,
    mergeSort(arraySlice(array, 0, middle), comparefn),
    mergeSort(arraySlice(array, middle), comparefn),
    comparefn
  );
};

var insertionSort = function (array, comparefn) {
  var length = array.length;
  var i = 1;
  var element, j;

  while (i < length) {
    j = i;
    element = array[i];
    while (j && comparefn(array[j - 1], element) > 0) {
      array[j] = array[--j];
    }
    if (j !== i++) array[j] = element;
  } return array;
};

var merge = function (array, left, right, comparefn) {
  var llength = left.length;
  var rlength = right.length;
  var lindex = 0;
  var rindex = 0;

  while (lindex < llength || rindex < rlength) {
    array[lindex + rindex] = (lindex < llength && rindex < rlength)
      ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
      : lindex < llength ? left[lindex++] : right[rindex++];
  } return array;
};

module.exports = mergeSort;


/***/ }),

/***/ "ae93":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("d039");
var isCallable = __webpack_require__("1626");
var create = __webpack_require__("7c73");
var getPrototypeOf = __webpack_require__("e163");
var defineBuiltIn = __webpack_require__("cb2d");
var wellKnownSymbol = __webpack_require__("b622");
var IS_PURE = __webpack_require__("c430");

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es-x/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  defineBuiltIn(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ "aeb0":
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__("9bf2").f;

module.exports = function (Target, Source, key) {
  key in Target || defineProperty(Target, key, {
    configurable: true,
    get: function () { return Source[key]; },
    set: function (it) { Source[key] = it; }
  });
};


/***/ }),

/***/ "aed9":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});


/***/ }),

/***/ "af03":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

// check the existence of a method, lowercase
// of a tag and escaping quotes in arguments
module.exports = function (METHOD_NAME) {
  return fails(function () {
    var test = ''[METHOD_NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  });
};


/***/ }),

/***/ "b041":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var classof = __webpack_require__("f5df");

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),

/***/ "b0c0":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var FUNCTION_NAME_EXISTS = __webpack_require__("5e77").EXISTS;
var uncurryThis = __webpack_require__("e330");
var defineProperty = __webpack_require__("9bf2").f;

var FunctionPrototype = Function.prototype;
var functionToString = uncurryThis(FunctionPrototype.toString);
var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
var regExpExec = uncurryThis(nameRE.exec);
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !FUNCTION_NAME_EXISTS) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return regExpExec(nameRE, functionToString(this))[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),

/***/ "b39a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var apply = __webpack_require__("2ba4");
var ArrayBufferViewCore = __webpack_require__("ebb5");
var fails = __webpack_require__("d039");
var arraySlice = __webpack_require__("f36a");

var Int8Array = global.Int8Array;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $toLocaleString = [].toLocaleString;

// iOS Safari 6.x fails here
var TO_LOCALE_STRING_BUG = !!Int8Array && fails(function () {
  $toLocaleString.call(new Int8Array(1));
});

var FORCED = fails(function () {
  return [1, 2].toLocaleString() != new Int8Array([1, 2]).toLocaleString();
}) || !fails(function () {
  Int8Array.prototype.toLocaleString.call([1, 2]);
});

// `%TypedArray%.prototype.toLocaleString` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tolocalestring
exportTypedArrayMethod('toLocaleString', function toLocaleString() {
  return apply(
    $toLocaleString,
    TO_LOCALE_STRING_BUG ? arraySlice(aTypedArray(this)) : aTypedArray(this),
    arraySlice(arguments)
  );
}, FORCED);


/***/ }),

/***/ "b42e":
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es-x/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ "b4f8":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var getBuiltIn = __webpack_require__("d066");
var hasOwn = __webpack_require__("1a2d");
var toString = __webpack_require__("577e");
var shared = __webpack_require__("5692");
var NATIVE_SYMBOL_REGISTRY = __webpack_require__("3d87");

var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');

// `Symbol.for` method
// https://tc39.es/ecma262/#sec-symbol.for
$({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY }, {
  'for': function (key) {
    var string = toString(key);
    if (hasOwn(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = getBuiltIn('Symbol')(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  }
});


/***/ }),

/***/ "b575":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var bind = __webpack_require__("0366");
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var macrotask = __webpack_require__("2cf4").set;
var IS_IOS = __webpack_require__("1cdc");
var IS_IOS_PEBBLE = __webpack_require__("d4c3");
var IS_WEBOS_WEBKIT = __webpack_require__("a4b4");
var IS_NODE = __webpack_require__("605d");

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var document = global.document;
var process = global.process;
var Promise = global.Promise;
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (!IS_IOS_PEBBLE && Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise.constructor = Promise;
    then = bind(promise.then, promise);
    notify = function () {
      then(flush);
    };
  // Node.js without promises
  } else if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessage
  // - onreadystatechange
  // - setTimeout
  } else {
    // strange IE + webpack dev server bug - use .bind(global)
    macrotask = bind(macrotask, global);
    notify = function () {
      macrotask(flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};


/***/ }),

/***/ "b622":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var shared = __webpack_require__("5692");
var hasOwn = __webpack_require__("1a2d");
var uid = __webpack_require__("90e3");
var NATIVE_SYMBOL = __webpack_require__("4930");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "b636":
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__("746f");

// `Symbol.asyncIterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.asynciterator
defineWellKnownSymbol('asyncIterator');


/***/ }),

/***/ "b64b":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var toObject = __webpack_require__("7b0b");
var nativeKeys = __webpack_require__("df75");
var fails = __webpack_require__("d039");

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),

/***/ "b680":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");
var toIntegerOrInfinity = __webpack_require__("5926");
var thisNumberValue = __webpack_require__("408a");
var $repeat = __webpack_require__("1148");
var fails = __webpack_require__("d039");

var RangeError = global.RangeError;
var String = global.String;
var floor = Math.floor;
var repeat = uncurryThis($repeat);
var stringSlice = uncurryThis(''.slice);
var un$ToFixed = uncurryThis(1.0.toFixed);

var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};

var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

var multiply = function (data, n, c) {
  var index = -1;
  var c2 = c;
  while (++index < 6) {
    c2 += n * data[index];
    data[index] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};

var divide = function (data, n) {
  var index = 6;
  var c = 0;
  while (--index >= 0) {
    c += data[index];
    data[index] = floor(c / n);
    c = (c % n) * 1e7;
  }
};

var dataToString = function (data) {
  var index = 6;
  var s = '';
  while (--index >= 0) {
    if (s !== '' || index === 0 || data[index] !== 0) {
      var t = String(data[index]);
      s = s === '' ? t : s + repeat('0', 7 - t.length) + t;
    }
  } return s;
};

var FORCED = fails(function () {
  return un$ToFixed(0.00008, 3) !== '0.000' ||
    un$ToFixed(0.9, 0) !== '1' ||
    un$ToFixed(1.255, 2) !== '1.25' ||
    un$ToFixed(1000000000000000128.0, 0) !== '1000000000000000128';
}) || !fails(function () {
  // V8 ~ Android 4.3-
  un$ToFixed({});
});

// `Number.prototype.toFixed` method
// https://tc39.es/ecma262/#sec-number.prototype.tofixed
$({ target: 'Number', proto: true, forced: FORCED }, {
  toFixed: function toFixed(fractionDigits) {
    var number = thisNumberValue(this);
    var fractDigits = toIntegerOrInfinity(fractionDigits);
    var data = [0, 0, 0, 0, 0, 0];
    var sign = '';
    var result = '0';
    var e, z, j, k;

    // TODO: ES2018 increased the maximum number of fraction digits to 100, need to improve the implementation
    if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits');
    // eslint-disable-next-line no-self-compare -- NaN check
    if (number != number) return 'NaN';
    if (number <= -1e21 || number >= 1e21) return String(number);
    if (number < 0) {
      sign = '-';
      number = -number;
    }
    if (number > 1e-21) {
      e = log(number * pow(2, 69, 1)) - 69;
      z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(data, 0, z);
        j = fractDigits;
        while (j >= 7) {
          multiply(data, 1e7, 0);
          j -= 7;
        }
        multiply(data, pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(data, 1 << 23);
          j -= 23;
        }
        divide(data, 1 << j);
        multiply(data, 1, 1);
        divide(data, 2);
        result = dataToString(data);
      } else {
        multiply(data, 0, z);
        multiply(data, 1 << -e, 0);
        result = dataToString(data) + repeat('0', fractDigits);
      }
    }
    if (fractDigits > 0) {
      k = result.length;
      result = sign + (k <= fractDigits
        ? '0.' + repeat('0', fractDigits - k) + result
        : stringSlice(result, 0, k - fractDigits) + '.' + stringSlice(result, k - fractDigits));
    } else {
      result = sign + result;
    } return result;
  }
});


/***/ }),

/***/ "b6b7":
/***/ (function(module, exports, __webpack_require__) {

var ArrayBufferViewCore = __webpack_require__("ebb5");
var speciesConstructor = __webpack_require__("4840");

var TYPED_ARRAY_CONSTRUCTOR = ArrayBufferViewCore.TYPED_ARRAY_CONSTRUCTOR;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;

// a part of `TypedArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#typedarray-species-create
module.exports = function (originalArray) {
  return aTypedArrayConstructor(speciesConstructor(originalArray, originalArray[TYPED_ARRAY_CONSTRUCTOR]));
};


/***/ }),

/***/ "b727":
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__("0366");
var uncurryThis = __webpack_require__("e330");
var IndexedObject = __webpack_require__("44ad");
var toObject = __webpack_require__("7b0b");
var lengthOfArrayLike = __webpack_require__("07fa");
var arraySpeciesCreate = __webpack_require__("65f0");

var push = uncurryThis([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that);
    var length = lengthOfArrayLike(self);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push(target, value);      // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod(7)
};


/***/ }),

/***/ "b7fe":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.start = exports.run = exports.TOKENS = exports.State = undefined;

var _state = __webpack_require__("1652");

var _text = __webpack_require__("7656");

var TOKENS = _interopRequireWildcard(_text);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var tlds = 'aaa|aarp|abarth|abb|abbott|abbvie|abc|able|abogado|abudhabi|ac|academy|accenture|accountant|accountants|aco|active|actor|ad|adac|ads|adult|ae|aeg|aero|aetna|af|afamilycompany|afl|africa|ag|agakhan|agency|ai|aig|aigo|airbus|airforce|airtel|akdn|al|alfaromeo|alibaba|alipay|allfinanz|allstate|ally|alsace|alstom|am|americanexpress|americanfamily|amex|amfam|amica|amsterdam|analytics|android|anquan|anz|ao|aol|apartments|app|apple|aq|aquarelle|ar|arab|aramco|archi|army|arpa|art|arte|as|asda|asia|associates|at|athleta|attorney|au|auction|audi|audible|audio|auspost|author|auto|autos|avianca|aw|aws|ax|axa|az|azure|ba|baby|baidu|banamex|bananarepublic|band|bank|bar|barcelona|barclaycard|barclays|barefoot|bargains|baseball|basketball|bauhaus|bayern|bb|bbc|bbt|bbva|bcg|bcn|bd|be|beats|beauty|beer|bentley|berlin|best|bestbuy|bet|bf|bg|bh|bharti|bi|bible|bid|bike|bing|bingo|bio|biz|bj|black|blackfriday|blanco|blockbuster|blog|bloomberg|blue|bm|bms|bmw|bn|bnl|bnpparibas|bo|boats|boehringer|bofa|bom|bond|boo|book|booking|boots|bosch|bostik|boston|bot|boutique|box|br|bradesco|bridgestone|broadway|broker|brother|brussels|bs|bt|budapest|bugatti|build|builders|business|buy|buzz|bv|bw|by|bz|bzh|ca|cab|cafe|cal|call|calvinklein|cam|camera|camp|cancerresearch|canon|capetown|capital|capitalone|car|caravan|cards|care|career|careers|cars|cartier|casa|case|caseih|cash|casino|cat|catering|catholic|cba|cbn|cbre|cbs|cc|cd|ceb|center|ceo|cern|cf|cfa|cfd|cg|ch|chanel|channel|chase|chat|cheap|chintai|chloe|christmas|chrome|chrysler|church|ci|cipriani|circle|cisco|citadel|citi|citic|city|cityeats|ck|cl|claims|cleaning|click|clinic|clinique|clothing|cloud|club|clubmed|cm|cn|co|coach|codes|coffee|college|cologne|com|comcast|commbank|community|company|compare|computer|comsec|condos|construction|consulting|contact|contractors|cooking|cookingchannel|cool|coop|corsica|country|coupon|coupons|courses|cr|credit|creditcard|creditunion|cricket|crown|crs|cruise|cruises|csc|cu|cuisinella|cv|cw|cx|cy|cymru|cyou|cz|dabur|dad|dance|data|date|dating|datsun|day|dclk|dds|de|deal|dealer|deals|degree|delivery|dell|deloitte|delta|democrat|dental|dentist|desi|design|dev|dhl|diamonds|diet|digital|direct|directory|discount|discover|dish|diy|dj|dk|dm|dnp|do|docs|doctor|dodge|dog|doha|domains|dot|download|drive|dtv|dubai|duck|dunlop|duns|dupont|durban|dvag|dvr|dz|earth|eat|ec|eco|edeka|edu|education|ee|eg|email|emerck|energy|engineer|engineering|enterprises|epost|epson|equipment|er|ericsson|erni|es|esq|estate|esurance|et|etisalat|eu|eurovision|eus|events|everbank|exchange|expert|exposed|express|extraspace|fage|fail|fairwinds|faith|family|fan|fans|farm|farmers|fashion|fast|fedex|feedback|ferrari|ferrero|fi|fiat|fidelity|fido|film|final|finance|financial|fire|firestone|firmdale|fish|fishing|fit|fitness|fj|fk|flickr|flights|flir|florist|flowers|fly|fm|fo|foo|food|foodnetwork|football|ford|forex|forsale|forum|foundation|fox|fr|free|fresenius|frl|frogans|frontdoor|frontier|ftr|fujitsu|fujixerox|fun|fund|furniture|futbol|fyi|ga|gal|gallery|gallo|gallup|game|games|gap|garden|gb|gbiz|gd|gdn|ge|gea|gent|genting|george|gf|gg|ggee|gh|gi|gift|gifts|gives|giving|gl|glade|glass|gle|global|globo|gm|gmail|gmbh|gmo|gmx|gn|godaddy|gold|goldpoint|golf|goo|goodhands|goodyear|goog|google|gop|got|gov|gp|gq|gr|grainger|graphics|gratis|green|gripe|grocery|group|gs|gt|gu|guardian|gucci|guge|guide|guitars|guru|gw|gy|hair|hamburg|hangout|haus|hbo|hdfc|hdfcbank|health|healthcare|help|helsinki|here|hermes|hgtv|hiphop|hisamitsu|hitachi|hiv|hk|hkt|hm|hn|hockey|holdings|holiday|homedepot|homegoods|homes|homesense|honda|honeywell|horse|hospital|host|hosting|hot|hoteles|hotels|hotmail|house|how|hr|hsbc|ht|htc|hu|hughes|hyatt|hyundai|ibm|icbc|ice|icu|id|ie|ieee|ifm|ikano|il|im|imamat|imdb|immo|immobilien|in|industries|infiniti|info|ing|ink|institute|insurance|insure|int|intel|international|intuit|investments|io|ipiranga|iq|ir|irish|is|iselect|ismaili|ist|istanbul|it|itau|itv|iveco|iwc|jaguar|java|jcb|jcp|je|jeep|jetzt|jewelry|jio|jlc|jll|jm|jmp|jnj|jo|jobs|joburg|jot|joy|jp|jpmorgan|jprs|juegos|juniper|kaufen|kddi|ke|kerryhotels|kerrylogistics|kerryproperties|kfh|kg|kh|ki|kia|kim|kinder|kindle|kitchen|kiwi|km|kn|koeln|komatsu|kosher|kp|kpmg|kpn|kr|krd|kred|kuokgroup|kw|ky|kyoto|kz|la|lacaixa|ladbrokes|lamborghini|lamer|lancaster|lancia|lancome|land|landrover|lanxess|lasalle|lat|latino|latrobe|law|lawyer|lb|lc|lds|lease|leclerc|lefrak|legal|lego|lexus|lgbt|li|liaison|lidl|life|lifeinsurance|lifestyle|lighting|like|lilly|limited|limo|lincoln|linde|link|lipsy|live|living|lixil|lk|loan|loans|locker|locus|loft|lol|london|lotte|lotto|love|lpl|lplfinancial|lr|ls|lt|ltd|ltda|lu|lundbeck|lupin|luxe|luxury|lv|ly|ma|macys|madrid|maif|maison|makeup|man|management|mango|map|market|marketing|markets|marriott|marshalls|maserati|mattel|mba|mc|mckinsey|md|me|med|media|meet|melbourne|meme|memorial|men|menu|meo|merckmsd|metlife|mg|mh|miami|microsoft|mil|mini|mint|mit|mitsubishi|mk|ml|mlb|mls|mm|mma|mn|mo|mobi|mobile|mobily|moda|moe|moi|mom|monash|money|monster|mopar|mormon|mortgage|moscow|moto|motorcycles|mov|movie|movistar|mp|mq|mr|ms|msd|mt|mtn|mtr|mu|museum|mutual|mv|mw|mx|my|mz|na|nab|nadex|nagoya|name|nationwide|natura|navy|nba|nc|ne|nec|net|netbank|netflix|network|neustar|new|newholland|news|next|nextdirect|nexus|nf|nfl|ng|ngo|nhk|ni|nico|nike|nikon|ninja|nissan|nissay|nl|no|nokia|northwesternmutual|norton|now|nowruz|nowtv|np|nr|nra|nrw|ntt|nu|nyc|nz|obi|observer|off|office|okinawa|olayan|olayangroup|oldnavy|ollo|om|omega|one|ong|onl|online|onyourside|ooo|open|oracle|orange|org|organic|origins|osaka|otsuka|ott|ovh|pa|page|panasonic|panerai|paris|pars|partners|parts|party|passagens|pay|pccw|pe|pet|pf|pfizer|pg|ph|pharmacy|phd|philips|phone|photo|photography|photos|physio|piaget|pics|pictet|pictures|pid|pin|ping|pink|pioneer|pizza|pk|pl|place|play|playstation|plumbing|plus|pm|pn|pnc|pohl|poker|politie|porn|post|pr|pramerica|praxi|press|prime|pro|prod|productions|prof|progressive|promo|properties|property|protection|pru|prudential|ps|pt|pub|pw|pwc|py|qa|qpon|quebec|quest|qvc|racing|radio|raid|re|read|realestate|realtor|realty|recipes|red|redstone|redumbrella|rehab|reise|reisen|reit|reliance|ren|rent|rentals|repair|report|republican|rest|restaurant|review|reviews|rexroth|rich|richardli|ricoh|rightathome|ril|rio|rip|rmit|ro|rocher|rocks|rodeo|rogers|room|rs|rsvp|ru|rugby|ruhr|run|rw|rwe|ryukyu|sa|saarland|safe|safety|sakura|sale|salon|samsclub|samsung|sandvik|sandvikcoromant|sanofi|sap|sapo|sarl|sas|save|saxo|sb|sbi|sbs|sc|sca|scb|schaeffler|schmidt|scholarships|school|schule|schwarz|science|scjohnson|scor|scot|sd|se|search|seat|secure|security|seek|select|sener|services|ses|seven|sew|sex|sexy|sfr|sg|sh|shangrila|sharp|shaw|shell|shia|shiksha|shoes|shop|shopping|shouji|show|showtime|shriram|si|silk|sina|singles|site|sj|sk|ski|skin|sky|skype|sl|sling|sm|smart|smile|sn|sncf|so|soccer|social|softbank|software|sohu|solar|solutions|song|sony|soy|space|spiegel|spot|spreadbetting|sr|srl|srt|st|stada|staples|star|starhub|statebank|statefarm|statoil|stc|stcgroup|stockholm|storage|store|stream|studio|study|style|su|sucks|supplies|supply|support|surf|surgery|suzuki|sv|swatch|swiftcover|swiss|sx|sy|sydney|symantec|systems|sz|tab|taipei|talk|taobao|target|tatamotors|tatar|tattoo|tax|taxi|tc|tci|td|tdk|team|tech|technology|tel|telecity|telefonica|temasek|tennis|teva|tf|tg|th|thd|theater|theatre|tiaa|tickets|tienda|tiffany|tips|tires|tirol|tj|tjmaxx|tjx|tk|tkmaxx|tl|tm|tmall|tn|to|today|tokyo|tools|top|toray|toshiba|total|tours|town|toyota|toys|tr|trade|trading|training|travel|travelchannel|travelers|travelersinsurance|trust|trv|tt|tube|tui|tunes|tushu|tv|tvs|tw|tz|ua|ubank|ubs|uconnect|ug|uk|unicom|university|uno|uol|ups|us|uy|uz|va|vacations|vana|vanguard|vc|ve|vegas|ventures|verisign|versicherung|vet|vg|vi|viajes|video|vig|viking|villas|vin|vip|virgin|visa|vision|vista|vistaprint|viva|vivo|vlaanderen|vn|vodka|volkswagen|volvo|vote|voting|voto|voyage|vu|vuelos|wales|walmart|walter|wang|wanggou|warman|watch|watches|weather|weatherchannel|webcam|weber|website|wed|wedding|weibo|weir|wf|whoswho|wien|wiki|williamhill|win|windows|wine|winners|wme|wolterskluwer|woodside|work|works|world|wow|ws|wtc|wtf|xbox|xerox|xfinity|xihuan|xin|xn--11b4c3d|xn--1ck2e1b|xn--1qqw23a|xn--2scrj9c|xn--30rr7y|xn--3bst00m|xn--3ds443g|xn--3e0b707e|xn--3hcrj9c|xn--3oq18vl8pn36a|xn--3pxu8k|xn--42c2d9a|xn--45br5cyl|xn--45brj9c|xn--45q11c|xn--4gbrim|xn--54b7fta0cc|xn--55qw42g|xn--55qx5d|xn--5su34j936bgsg|xn--5tzm5g|xn--6frz82g|xn--6qq986b3xl|xn--80adxhks|xn--80ao21a|xn--80aqecdr1a|xn--80asehdb|xn--80aswg|xn--8y0a063a|xn--90a3ac|xn--90ae|xn--90ais|xn--9dbq2a|xn--9et52u|xn--9krt00a|xn--b4w605ferd|xn--bck1b9a5dre4c|xn--c1avg|xn--c2br7g|xn--cck2b3b|xn--cg4bki|xn--clchc0ea0b2g2a9gcd|xn--czr694b|xn--czrs0t|xn--czru2d|xn--d1acj3b|xn--d1alf|xn--e1a4c|xn--eckvdtc9d|xn--efvy88h|xn--estv75g|xn--fct429k|xn--fhbei|xn--fiq228c5hs|xn--fiq64b|xn--fiqs8s|xn--fiqz9s|xn--fjq720a|xn--flw351e|xn--fpcrj9c3d|xn--fzc2c9e2c|xn--fzys8d69uvgm|xn--g2xx48c|xn--gckr3f0f|xn--gecrj9c|xn--gk3at1e|xn--h2breg3eve|xn--h2brj9c|xn--h2brj9c8c|xn--hxt814e|xn--i1b6b1a6a2e|xn--imr513n|xn--io0a7i|xn--j1aef|xn--j1amh|xn--j6w193g|xn--jlq61u9w7b|xn--jvr189m|xn--kcrx77d1x4a|xn--kprw13d|xn--kpry57d|xn--kpu716f|xn--kput3i|xn--l1acc|xn--lgbbat1ad8j|xn--mgb9awbf|xn--mgba3a3ejt|xn--mgba3a4f16a|xn--mgba7c0bbn0a|xn--mgbaakc7dvf|xn--mgbaam7a8h|xn--mgbab2bd|xn--mgbai9azgqp6j|xn--mgbayh7gpa|xn--mgbb9fbpob|xn--mgbbh1a|xn--mgbbh1a71e|xn--mgbc0a9azcg|xn--mgbca7dzdo|xn--mgberp4a5d4ar|xn--mgbgu82a|xn--mgbi4ecexp|xn--mgbpl2fh|xn--mgbt3dhd|xn--mgbtx2b|xn--mgbx4cd0ab|xn--mix891f|xn--mk1bu44c|xn--mxtq1m|xn--ngbc5azd|xn--ngbe9e0a|xn--ngbrx|xn--node|xn--nqv7f|xn--nqv7fs00ema|xn--nyqy26a|xn--o3cw4h|xn--ogbpf8fl|xn--p1acf|xn--p1ai|xn--pbt977c|xn--pgbs0dh|xn--pssy2u|xn--q9jyb4c|xn--qcka1pmc|xn--qxam|xn--rhqv96g|xn--rovu88b|xn--rvc1e0am3e|xn--s9brj9c|xn--ses554g|xn--t60b56a|xn--tckwe|xn--tiq49xqyj|xn--unup4y|xn--vermgensberater-ctb|xn--vermgensberatung-pwb|xn--vhquv|xn--vuq861b|xn--w4r85el8fhu5dnra|xn--w4rs40l|xn--wgbh1c|xn--wgbl6a|xn--xhq521b|xn--xkc2al3hye2a|xn--xkc2dl3a5ee0h|xn--y9a3aq|xn--yfro4i67o|xn--ygbi2ammx|xn--zfr164b|xperia|xxx|xyz|yachts|yahoo|yamaxun|yandex|ye|yodobashi|yoga|yokohama|you|youtube|yt|yun|za|zappos|zara|zero|zip|zippo|zm|zone|zuerich|zw'.split('|'); // macro, see gulpfile.js

/**
	The scanner provides an interface that takes a string of text as input, and
	outputs an array of tokens instances that can be used for easy URL parsing.

	@module linkify
	@submodule scanner
	@main scanner
*/

var NUMBERS = '0123456789'.split('');
var ALPHANUM = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');
var WHITESPACE = [' ', '\f', '\r', '\t', '\v', '\xA0', '\u1680', '\u180E']; // excluding line breaks

var domainStates = []; // states that jump to DOMAIN on /[a-z0-9]/
var makeState = function makeState(tokenClass) {
	return new _state.CharacterState(tokenClass);
};

// Frequently used states
var S_START = makeState();
var S_NUM = makeState(_text.NUM);
var S_DOMAIN = makeState(_text.DOMAIN);
var S_DOMAIN_HYPHEN = makeState(); // domain followed by 1 or more hyphen characters
var S_WS = makeState(_text.WS);

// States for special URL symbols
S_START.on('@', makeState(_text.AT)).on('.', makeState(_text.DOT)).on('+', makeState(_text.PLUS)).on('#', makeState(_text.POUND)).on('?', makeState(_text.QUERY)).on('/', makeState(_text.SLASH)).on('_', makeState(_text.UNDERSCORE)).on(':', makeState(_text.COLON)).on('{', makeState(_text.OPENBRACE)).on('[', makeState(_text.OPENBRACKET)).on('<', makeState(_text.OPENANGLEBRACKET)).on('(', makeState(_text.OPENPAREN)).on('}', makeState(_text.CLOSEBRACE)).on(']', makeState(_text.CLOSEBRACKET)).on('>', makeState(_text.CLOSEANGLEBRACKET)).on(')', makeState(_text.CLOSEPAREN)).on('&', makeState(_text.AMPERSAND)).on([',', ';', '!', '"', '\''], makeState(_text.PUNCTUATION));

// Whitespace jumps
// Tokens of only non-newline whitespace are arbitrarily long
S_START.on('\n', makeState(_text.NL)).on(WHITESPACE, S_WS);

// If any whitespace except newline, more whitespace!
S_WS.on(WHITESPACE, S_WS);

// Generates states for top-level domains
// Note that this is most accurate when tlds are in alphabetical order
for (var i = 0; i < tlds.length; i++) {
	var newStates = (0, _state.stateify)(tlds[i], S_START, _text.TLD, _text.DOMAIN);
	domainStates.push.apply(domainStates, newStates);
}

// Collect the states generated by different protocls
var partialProtocolFileStates = (0, _state.stateify)('file', S_START, _text.DOMAIN, _text.DOMAIN);
var partialProtocolFtpStates = (0, _state.stateify)('ftp', S_START, _text.DOMAIN, _text.DOMAIN);
var partialProtocolHttpStates = (0, _state.stateify)('http', S_START, _text.DOMAIN, _text.DOMAIN);
var partialProtocolMailtoStates = (0, _state.stateify)('mailto', S_START, _text.DOMAIN, _text.DOMAIN);

// Add the states to the array of DOMAINeric states
domainStates.push.apply(domainStates, partialProtocolFileStates);
domainStates.push.apply(domainStates, partialProtocolFtpStates);
domainStates.push.apply(domainStates, partialProtocolHttpStates);
domainStates.push.apply(domainStates, partialProtocolMailtoStates);

// Protocol states
var S_PROTOCOL_FILE = partialProtocolFileStates.pop();
var S_PROTOCOL_FTP = partialProtocolFtpStates.pop();
var S_PROTOCOL_HTTP = partialProtocolHttpStates.pop();
var S_MAILTO = partialProtocolMailtoStates.pop();
var S_PROTOCOL_SECURE = makeState(_text.DOMAIN);
var S_FULL_PROTOCOL = makeState(_text.PROTOCOL); // Full protocol ends with COLON
var S_FULL_MAILTO = makeState(_text.MAILTO); // Mailto ends with COLON

// Secure protocols (end with 's')
S_PROTOCOL_FTP.on('s', S_PROTOCOL_SECURE).on(':', S_FULL_PROTOCOL);

S_PROTOCOL_HTTP.on('s', S_PROTOCOL_SECURE).on(':', S_FULL_PROTOCOL);

domainStates.push(S_PROTOCOL_SECURE);

// Become protocol tokens after a COLON
S_PROTOCOL_FILE.on(':', S_FULL_PROTOCOL);
S_PROTOCOL_SECURE.on(':', S_FULL_PROTOCOL);
S_MAILTO.on(':', S_FULL_MAILTO);

// Localhost
var partialLocalhostStates = (0, _state.stateify)('localhost', S_START, _text.LOCALHOST, _text.DOMAIN);
domainStates.push.apply(domainStates, partialLocalhostStates);

// Everything else
// DOMAINs make more DOMAINs
// Number and character transitions
S_START.on(NUMBERS, S_NUM);
S_NUM.on('-', S_DOMAIN_HYPHEN).on(NUMBERS, S_NUM).on(ALPHANUM, S_DOMAIN); // number becomes DOMAIN

S_DOMAIN.on('-', S_DOMAIN_HYPHEN).on(ALPHANUM, S_DOMAIN);

// All the generated states should have a jump to DOMAIN
for (var _i = 0; _i < domainStates.length; _i++) {
	domainStates[_i].on('-', S_DOMAIN_HYPHEN).on(ALPHANUM, S_DOMAIN);
}

S_DOMAIN_HYPHEN.on('-', S_DOMAIN_HYPHEN).on(NUMBERS, S_DOMAIN).on(ALPHANUM, S_DOMAIN);

// Set default transition
S_START.defaultTransition = makeState(_text.SYM);

/**
	Given a string, returns an array of TOKEN instances representing the
	composition of that string.

	@method run
	@param {String} str Input string to scan
	@return {Array} Array of TOKEN instances
*/
var run = function run(str) {

	// The state machine only looks at lowercase strings.
	// This selective `toLowerCase` is used because lowercasing the entire
	// string causes the length and character position to vary in some in some
	// non-English strings. This happens only on V8-based runtimes.
	var lowerStr = str.replace(/[A-Z]/g, function (c) {
		return c.toLowerCase();
	});
	var len = str.length;
	var tokens = []; // return value

	var cursor = 0;

	// Tokenize the string
	while (cursor < len) {
		var state = S_START;
		var nextState = null;
		var tokenLength = 0;
		var latestAccepting = null;
		var sinceAccepts = -1;

		while (cursor < len && (nextState = state.next(lowerStr[cursor]))) {
			state = nextState;

			// Keep track of the latest accepting state
			if (state.accepts()) {
				sinceAccepts = 0;
				latestAccepting = state;
			} else if (sinceAccepts >= 0) {
				sinceAccepts++;
			}

			tokenLength++;
			cursor++;
		}

		if (sinceAccepts < 0) {
			continue;
		} // Should never happen

		// Roll back to the latest accepting state
		cursor -= sinceAccepts;
		tokenLength -= sinceAccepts;

		// Get the class for the new token
		var TOKEN = latestAccepting.emit(); // Current token class

		// No more jumps, just make a new token
		tokens.push(new TOKEN(str.substr(cursor - tokenLength, tokenLength)));
	}

	return tokens;
};

var start = S_START;
exports.State = _state.CharacterState;
exports.TOKENS = TOKENS;
exports.run = run;
exports.start = start;

/***/ }),

/***/ "b8bf":
/***/ (function(module, exports, __webpack_require__) {

// TODO: Remove from `core-js@4`
var $ = __webpack_require__("23e7");
var DESCRIPTORS = __webpack_require__("83ab");
var create = __webpack_require__("7c73");

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  create: create
});


/***/ }),

/***/ "b980":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = !fails(function () {
  var error = Error('a');
  if (!('stack' in error)) return true;
  // eslint-disable-next-line es-x/no-object-defineproperty -- safe
  Object.defineProperty(error, 'stack', createPropertyDescriptor(1, 7));
  return error.stack !== 7;
});


/***/ }),

/***/ "baa5":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var lastIndexOf = __webpack_require__("e58c");

// `Array.prototype.lastIndexOf` method
// https://tc39.es/ecma262/#sec-array.prototype.lastindexof
// eslint-disable-next-line es-x/no-array-prototype-lastindexof -- required for testing
$({ target: 'Array', proto: true, forced: lastIndexOf !== [].lastIndexOf }, {
  lastIndexOf: lastIndexOf
});


/***/ }),

/***/ "bb2f":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-object-isextensible, es-x/no-object-preventextensions -- required for testing
  return Object.isExtensible(Object.preventExtensions({}));
});


/***/ }),

/***/ "bd43":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isImageFile", function() { return isImageFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isVideoFile", function() { return isVideoFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isImageVideoFile", function() { return isImageVideoFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAudioFile", function() { return isAudioFile; });
/* harmony import */ var core_js_modules_es_array_some_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("45fc");
/* harmony import */ var core_js_modules_es_array_some_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_some_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("d3b7");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("caad");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("2532");
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("b0c0");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_string_ends_with_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("8a79");
/* harmony import */ var core_js_modules_es_string_ends_with_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_ends_with_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("c9d9");








function checkMediaType(types, file) {
  if (!file || !file.type) return;
  return types.some(function (t) {
    return file.type.toLowerCase().includes(t);
  });
}

function checkMediaExtension(extensions, file) {
  if (!file || !file.name) return;
  return extensions.some(function (e) {
    return file.name.toLowerCase().endsWith(e);
  });
}

function checkMedia(types, extensions, file) {
  if (file && file.type) return checkMediaType(types, file);else if (file && file.name) return checkMediaExtension(extensions, file);
  return false;
}

function isImageFile(file) {
  return checkMedia(_constants__WEBPACK_IMPORTED_MODULE_6__[/* IMAGE_TYPES */ "d"], _constants__WEBPACK_IMPORTED_MODULE_6__[/* IMAGE_EXTENSIONS */ "c"], file);
}
function isVideoFile(file) {
  return checkMedia(_constants__WEBPACK_IMPORTED_MODULE_6__[/* VIDEO_TYPES */ "f"], _constants__WEBPACK_IMPORTED_MODULE_6__[/* VIDEO_EXTENSIONS */ "e"], file);
}
function isImageVideoFile(file) {
  return isImageFile(file) || isVideoFile(file);
}
function isAudioFile(file) {
  return checkMedia(_constants__WEBPACK_IMPORTED_MODULE_6__[/* AUDIO_TYPES */ "b"], _constants__WEBPACK_IMPORTED_MODULE_6__[/* AUDIO_EXTENSIONS */ "a"], file);
}

/***/ }),

/***/ "bea1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.URL = exports.TEXT = exports.NL = exports.EMAIL = exports.MAILTOEMAIL = exports.Base = undefined;

var _createTokenClass = __webpack_require__("46f3");

var _class = __webpack_require__("254c");

var _text = __webpack_require__("7656");

/******************************************************************************
	Multi-Tokens
	Tokens composed of arrays of TextTokens
******************************************************************************/

// Is the given token a valid domain token?
// Should nums be included here?
function isDomainToken(token) {
	return token instanceof _text.DOMAIN || token instanceof _text.TLD;
}

/**
	Abstract class used for manufacturing tokens of text tokens. That is rather
	than the value for a token being a small string of text, it's value an array
	of text tokens.

	Used for grouping together URLs, emails, hashtags, and other potential
	creations.

	@class MultiToken
	@abstract
*/
var MultiToken = (0, _createTokenClass.createTokenClass)();

MultiToken.prototype = {
	/**
 	String representing the type for this token
 	@property type
 	@default 'TOKEN'
 */
	type: 'token',

	/**
 	Is this multitoken a link?
 	@property isLink
 	@default false
 */
	isLink: false,

	/**
 	Return the string this token represents.
 	@method toString
 	@return {String}
 */
	toString: function toString() {
		var result = [];
		for (var i = 0; i < this.v.length; i++) {
			result.push(this.v[i].toString());
		}
		return result.join('');
	},


	/**
 	What should the value for this token be in the `href` HTML attribute?
 	Returns the `.toString` value by default.
 		@method toHref
 	@return {String}
 */
	toHref: function toHref() {
		return this.toString();
	},


	/**
 	Returns a hash of relevant values for this token, which includes keys
 	* type - Kind of token ('url', 'email', etc.)
 	* value - Original text
 	* href - The value that should be added to the anchor tag's href
 		attribute
 		@method toObject
 	@param {String} [protocol] `'http'` by default
 	@return {Object}
 */
	toObject: function toObject() {
		var protocol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'http';

		return {
			type: this.type,
			value: this.toString(),
			href: this.toHref(protocol)
		};
	}
};

/**
	Represents an arbitrarily mailto email address with the prefix included
	@class MAILTO
	@extends MultiToken
*/
var MAILTOEMAIL = (0, _class.inherits)(MultiToken, (0, _createTokenClass.createTokenClass)(), {
	type: 'email',
	isLink: true
});

/**
	Represents a list of tokens making up a valid email address
	@class EMAIL
	@extends MultiToken
*/
var EMAIL = (0, _class.inherits)(MultiToken, (0, _createTokenClass.createTokenClass)(), {
	type: 'email',
	isLink: true,
	toHref: function toHref() {
		return 'mailto:' + this.toString();
	}
});

/**
	Represents some plain text
	@class TEXT
	@extends MultiToken
*/
var TEXT = (0, _class.inherits)(MultiToken, (0, _createTokenClass.createTokenClass)(), { type: 'text' });

/**
	Multi-linebreak token - represents a line break
	@class NL
	@extends MultiToken
*/
var NL = (0, _class.inherits)(MultiToken, (0, _createTokenClass.createTokenClass)(), { type: 'nl' });

/**
	Represents a list of tokens making up a valid URL
	@class URL
	@extends MultiToken
*/
var URL = (0, _class.inherits)(MultiToken, (0, _createTokenClass.createTokenClass)(), {
	type: 'url',
	isLink: true,

	/**
 	Lowercases relevant parts of the domain and adds the protocol if
 	required. Note that this will not escape unsafe HTML characters in the
 	URL.
 		@method href
 	@param {String} protocol
 	@return {String}
 */
	toHref: function toHref() {
		var protocol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'http';

		var hasProtocol = false;
		var hasSlashSlash = false;
		var tokens = this.v;
		var result = [];
		var i = 0;

		// Make the first part of the domain lowercase
		// Lowercase protocol
		while (tokens[i] instanceof _text.PROTOCOL) {
			hasProtocol = true;
			result.push(tokens[i].toString().toLowerCase());
			i++;
		}

		// Skip slash-slash
		while (tokens[i] instanceof _text.SLASH) {
			hasSlashSlash = true;
			result.push(tokens[i].toString());
			i++;
		}

		// Lowercase all other characters in the domain
		while (isDomainToken(tokens[i])) {
			result.push(tokens[i].toString().toLowerCase());
			i++;
		}

		// Leave all other characters as they were written
		for (; i < tokens.length; i++) {
			result.push(tokens[i].toString());
		}

		result = result.join('');

		if (!(hasProtocol || hasSlashSlash)) {
			result = protocol + '://' + result;
		}

		return result;
	},
	hasProtocol: function hasProtocol() {
		return this.v[0] instanceof _text.PROTOCOL;
	}
});

exports.Base = MultiToken;
exports.MAILTOEMAIL = MAILTOEMAIL;
exports.EMAIL = EMAIL;
exports.NL = NL;
exports.TEXT = TEXT;
exports.URL = URL;

/***/ }),

/***/ "c04e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var call = __webpack_require__("c65b");
var isObject = __webpack_require__("861d");
var isSymbol = __webpack_require__("d9b5");
var getMethod = __webpack_require__("dc4a");
var ordinaryToPrimitive = __webpack_require__("485a");
var wellKnownSymbol = __webpack_require__("b622");

var TypeError = global.TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ "c0b6":
/***/ (function(module, exports, __webpack_require__) {

// TODO: Remove from `core-js@4`
var $ = __webpack_require__("23e7");
var bind = __webpack_require__("0538");

// `Function.prototype.bind` method
// https://tc39.es/ecma262/#sec-function.prototype.bind
$({ target: 'Function', proto: true, forced: Function.bind !== bind }, {
  bind: bind
});


/***/ }),

/***/ "c1ac":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $filter = __webpack_require__("b727").filter;
var fromSpeciesAndList = __webpack_require__("1448");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.filter` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.filter
exportTypedArrayMethod('filter', function filter(callbackfn /* , thisArg */) {
  var list = $filter(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  return fromSpeciesAndList(this, list);
});


/***/ }),

/***/ "c430":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "c513":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var hasOwn = __webpack_require__("1a2d");
var isSymbol = __webpack_require__("d9b5");
var tryToString = __webpack_require__("0d51");
var shared = __webpack_require__("5692");
var NATIVE_SYMBOL_REGISTRY = __webpack_require__("3d87");

var SymbolToStringRegistry = shared('symbol-to-string-registry');

// `Symbol.keyFor` method
// https://tc39.es/ecma262/#sec-symbol.keyfor
$({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY }, {
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(tryToString(sym) + ' is not a symbol');
    if (hasOwn(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  }
});


/***/ }),

/***/ "c5d0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var createHTML = __webpack_require__("857a");
var forcedStringHTMLMethod = __webpack_require__("af03");

// `String.prototype.italics` method
// https://tc39.es/ecma262/#sec-string.prototype.italics
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('italics') }, {
  italics: function italics() {
    return createHTML(this, 'i', '', '');
  }
});


/***/ }),

/***/ "c607":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DESCRIPTORS = __webpack_require__("83ab");
var UNSUPPORTED_DOT_ALL = __webpack_require__("fce3");
var classof = __webpack_require__("c6b6");
var defineBuiltInAccessor = __webpack_require__("edd0");
var getInternalState = __webpack_require__("69f3").get;

var RegExpPrototype = RegExp.prototype;
var TypeError = global.TypeError;

// `RegExp.prototype.dotAll` getter
// https://tc39.es/ecma262/#sec-get-regexp.prototype.dotall
if (DESCRIPTORS && UNSUPPORTED_DOT_ALL) {
  defineBuiltInAccessor(RegExpPrototype, 'dotAll', {
    configurable: true,
    get: function dotAll() {
      if (this === RegExpPrototype) return undefined;
      // We can't use InternalStateModule.getterFor because
      // we don't add metadata for regexps created by a literal.
      if (classof(this) === 'RegExp') {
        return !!getInternalState(this).dotAll;
      }
      throw TypeError('Incompatible receiver, RegExp required');
    }
  });
}


/***/ }),

/***/ "c65b":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__("40d5");

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ "c6b6":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ "c6cd":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var defineGlobalProperty = __webpack_require__("6374");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});

module.exports = store;


/***/ }),

/***/ "c770":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");

var $Error = Error;
var replace = uncurryThis(''.replace);

var TEST = (function (arg) { return String($Error(arg).stack); })('zxcasd');
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

module.exports = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
    while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } return stack;
};


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "c8d2":
/***/ (function(module, exports, __webpack_require__) {

var PROPER_FUNCTION_NAME = __webpack_require__("5e77").PROPER;
var fails = __webpack_require__("d039");
var whitespaces = __webpack_require__("5899");

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]()
      || non[METHOD_NAME]() !== non
      || (PROPER_FUNCTION_NAME && whitespaces[METHOD_NAME].name !== METHOD_NAME);
  });
};


/***/ }),

/***/ "c975":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable es-x/no-array-prototype-indexof -- required for testing */
var $ = __webpack_require__("23e7");
var uncurryThis = __webpack_require__("e330");
var $IndexOf = __webpack_require__("4d64").indexOf;
var arrayMethodIsStrict = __webpack_require__("a640");

var un$IndexOf = uncurryThis([].indexOf);

var NEGATIVE_ZERO = !!un$IndexOf && 1 / un$IndexOf([1], 1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');

// `Array.prototype.indexOf` method
// https://tc39.es/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? un$IndexOf(this, searchElement, fromIndex) || 0
      : $IndexOf(this, searchElement, fromIndex);
  }
});


/***/ }),

/***/ "c9d9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return IMAGE_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return VIDEO_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AUDIO_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return IMAGE_EXTENSIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return VIDEO_EXTENSIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AUDIO_EXTENSIONS; });
var IMAGE_TYPES = ['png', 'jpg', 'jpeg', 'webp', 'svg', 'gif'];
var VIDEO_TYPES = ['mp4', 'video/ogg', 'webm', 'quicktime'];
var AUDIO_TYPES = ['mp3', 'audio/ogg', 'wav', 'mpeg'];
var IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'];
var VIDEO_EXTENSIONS = ['.mp4', '.webm'];
var AUDIO_EXTENSIONS = ['.mp3', '.wav'];

/***/ }),

/***/ "ca84":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");
var hasOwn = __webpack_require__("1a2d");
var toIndexedObject = __webpack_require__("fc6a");
var indexOf = __webpack_require__("4d64").indexOf;
var hiddenKeys = __webpack_require__("d012");

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ "ca91":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $reduce = __webpack_require__("d58f").left;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.reduce` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduce
exportTypedArrayMethod('reduce', function reduce(callbackfn /* , initialValue */) {
  var length = arguments.length;
  return $reduce(aTypedArray(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "caad":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $includes = __webpack_require__("4d64").includes;
var fails = __webpack_require__("d039");
var addToUnscopables = __webpack_require__("44d2");

// FF99+ bug
var BROKEN_ON_SPARSE = fails(function () {
  return !Array(1).includes();
});

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');


/***/ }),

/***/ "cb2d":
/***/ (function(module, exports, __webpack_require__) {

var isCallable = __webpack_require__("1626");
var createNonEnumerableProperty = __webpack_require__("9112");
var makeBuiltIn = __webpack_require__("13d2");
var defineGlobalProperty = __webpack_require__("6374");

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    if (!options.unsafe) delete O[key];
    else if (O[key]) simple = true;
    if (simple) O[key] = value;
    else createNonEnumerableProperty(O, key, value);
  } return O;
};


/***/ }),

/***/ "cc12":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "cc71":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var createHTML = __webpack_require__("857a");
var forcedStringHTMLMethod = __webpack_require__("af03");

// `String.prototype.bold` method
// https://tc39.es/ecma262/#sec-string.prototype.bold
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('bold') }, {
  bold: function bold() {
    return createHTML(this, 'b', '', '');
  }
});


/***/ }),

/***/ "cc98":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var IS_PURE = __webpack_require__("c430");
var FORCED_PROMISE_CONSTRUCTOR = __webpack_require__("4738").CONSTRUCTOR;
var NativePromiseConstructor = __webpack_require__("d256");
var getBuiltIn = __webpack_require__("d066");
var isCallable = __webpack_require__("1626");
var defineBuiltIn = __webpack_require__("cb2d");

var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

// `Promise.prototype.catch` method
// https://tc39.es/ecma262/#sec-promise.prototype.catch
$({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR, real: true }, {
  'catch': function (onRejected) {
    return this.then(undefined, onRejected);
  }
});

// makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
if (!IS_PURE && isCallable(NativePromiseConstructor)) {
  var method = getBuiltIn('Promise').prototype['catch'];
  if (NativePromisePrototype['catch'] !== method) {
    defineBuiltIn(NativePromisePrototype, 'catch', method, { unsafe: true });
  }
}


/***/ }),

/***/ "cca6":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var assign = __webpack_require__("60da");

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es-x/no-object-assign -- required for testing
$({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign }, {
  assign: assign
});


/***/ }),

/***/ "cd26":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var floor = Math.floor;

// `%TypedArray%.prototype.reverse` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reverse
exportTypedArrayMethod('reverse', function reverse() {
  var that = this;
  var length = aTypedArray(that).length;
  var middle = floor(length / 2);
  var index = 0;
  var value;
  while (index < middle) {
    value = that[index];
    that[index++] = that[--length];
    that[length] = value;
  } return that;
});


/***/ }),

/***/ "cdf9":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var isObject = __webpack_require__("861d");
var newPromiseCapability = __webpack_require__("f069");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "cfc3":
/***/ (function(module, exports, __webpack_require__) {

var createTypedArrayConstructor = __webpack_require__("74e8");

// `Float32Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Float32', function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "d012":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "d039":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "d066":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isCallable = __webpack_require__("1626");

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "d139":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $find = __webpack_require__("b727").find;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.find` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.find
exportTypedArrayMethod('find', function find(predicate /* , thisArg */) {
  return $find(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "d1e7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ "d256":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

module.exports = global.Promise;


/***/ }),

/***/ "d28b":
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__("746f");

// `Symbol.iterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');


/***/ }),

/***/ "d2bb":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-proto -- safe */
var uncurryThis = __webpack_require__("e330");
var anObject = __webpack_require__("825a");
var aPossiblePrototype = __webpack_require__("3bbe");

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es-x/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
    setter = uncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "d3b7":
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var defineBuiltIn = __webpack_require__("cb2d");
var toString = __webpack_require__("b041");

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  defineBuiltIn(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),

/***/ "d401":
/***/ (function(module, exports, __webpack_require__) {

var defineBuiltIn = __webpack_require__("cb2d");
var errorToString = __webpack_require__("aa1f");

var ErrorPrototype = Error.prototype;

// `Error.prototype.toString` method fix
// https://tc39.es/ecma262/#sec-error.prototype.tostring
if (ErrorPrototype.toString !== errorToString) {
  defineBuiltIn(ErrorPrototype, 'toString', errorToString);
}


/***/ }),

/***/ "d44e":
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__("9bf2").f;
var hasOwn = __webpack_require__("1a2d");
var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn(target, TO_STRING_TAG)) {
    defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ "d4c3":
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__("342f");
var global = __webpack_require__("da84");

module.exports = /ipad|iphone|ipod/i.test(userAgent) && global.Pebble !== undefined;


/***/ }),

/***/ "d58f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var aCallable = __webpack_require__("59ed");
var toObject = __webpack_require__("7b0b");
var IndexedObject = __webpack_require__("44ad");
var lengthOfArrayLike = __webpack_require__("07fa");

var TypeError = global.TypeError;

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aCallable(callbackfn);
    var O = toObject(that);
    var self = IndexedObject(O);
    var length = lengthOfArrayLike(O);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

module.exports = {
  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};


/***/ }),

/***/ "d5d6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $forEach = __webpack_require__("b727").forEach;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.forEach` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.foreach
exportTypedArrayMethod('forEach', function forEach(callbackfn /* , thisArg */) {
  $forEach(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "d6d6":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

var TypeError = global.TypeError;

module.exports = function (passed, required) {
  if (passed < required) throw TypeError('Not enough arguments');
  return passed;
};


/***/ }),

/***/ "d784":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__("ac1f");
var uncurryThis = __webpack_require__("e330");
var defineBuiltIn = __webpack_require__("cb2d");
var regexpExec = __webpack_require__("9263");
var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var createNonEnumerableProperty = __webpack_require__("9112");

var SPECIES = wellKnownSymbol('species');
var RegExpPrototype = RegExp.prototype;

module.exports = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var uncurriedNativeRegExpMethod = uncurryThis(/./[SYMBOL]);
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var uncurriedNativeMethod = uncurryThis(nativeMethod);
      var $exec = regexp.exec;
      if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
        }
        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
      }
      return { done: false };
    });

    defineBuiltIn(String.prototype, KEY, methods[0]);
    defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ "d81d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $map = __webpack_require__("b727").map;
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');

// `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "d86b":
/***/ (function(module, exports, __webpack_require__) {

// FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it
var fails = __webpack_require__("d039");

module.exports = fails(function () {
  if (typeof ArrayBuffer == 'function') {
    var buffer = new ArrayBuffer(8);
    // eslint-disable-next-line es-x/no-object-isextensible, es-x/no-object-defineproperty -- safe
    if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', { value: 8 });
  }
});


/***/ }),

/***/ "d998":
/***/ (function(module, exports, __webpack_require__) {

var UA = __webpack_require__("342f");

module.exports = /MSIE|Trident/.test(UA);


/***/ }),

/***/ "d9b5":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var getBuiltIn = __webpack_require__("d066");
var isCallable = __webpack_require__("1626");
var isPrototypeOf = __webpack_require__("3a9b");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");

var Object = global.Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, Object(it));
};


/***/ }),

/***/ "d9e2":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-unused-vars -- required for functions `.length` */
var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var apply = __webpack_require__("2ba4");
var wrapErrorConstructorWithCause = __webpack_require__("e5cb");

var WEB_ASSEMBLY = 'WebAssembly';
var WebAssembly = global[WEB_ASSEMBLY];

var FORCED = Error('e', { cause: 7 }).cause !== 7;

var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  var O = {};
  O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED);
  $({ global: true, constructor: true, arity: 1, forced: FORCED }, O);
};

var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  if (WebAssembly && WebAssembly[ERROR_NAME]) {
    var O = {};
    O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED);
    $({ target: WEB_ASSEMBLY, stat: true, constructor: true, arity: 1, forced: FORCED }, O);
  }
};

// https://github.com/tc39/proposal-error-cause
exportGlobalErrorCauseWrapper('Error', function (init) {
  return function Error(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('EvalError', function (init) {
  return function EvalError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('RangeError', function (init) {
  return function RangeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
  return function ReferenceError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
  return function SyntaxError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('TypeError', function (init) {
  return function TypeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('URIError', function (init) {
  return function URIError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
  return function CompileError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
  return function LinkError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
  return function RuntimeError(message) { return apply(init, this, arguments); };
});


/***/ }),

/***/ "d9f5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var call = __webpack_require__("c65b");
var uncurryThis = __webpack_require__("e330");
var IS_PURE = __webpack_require__("c430");
var DESCRIPTORS = __webpack_require__("83ab");
var NATIVE_SYMBOL = __webpack_require__("4930");
var fails = __webpack_require__("d039");
var hasOwn = __webpack_require__("1a2d");
var isPrototypeOf = __webpack_require__("3a9b");
var anObject = __webpack_require__("825a");
var toIndexedObject = __webpack_require__("fc6a");
var toPropertyKey = __webpack_require__("a04b");
var $toString = __webpack_require__("577e");
var createPropertyDescriptor = __webpack_require__("5c6c");
var nativeObjectCreate = __webpack_require__("7c73");
var objectKeys = __webpack_require__("df75");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertyNamesExternal = __webpack_require__("057f");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");
var definePropertiesModule = __webpack_require__("37e8");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var defineBuiltIn = __webpack_require__("cb2d");
var shared = __webpack_require__("5692");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");
var uid = __webpack_require__("90e3");
var wellKnownSymbol = __webpack_require__("b622");
var wrappedWellKnownSymbolModule = __webpack_require__("e538");
var defineWellKnownSymbol = __webpack_require__("746f");
var defineSymbolToPrimitive = __webpack_require__("57b9");
var setToStringTag = __webpack_require__("d44e");
var InternalStateModule = __webpack_require__("69f3");
var $forEach = __webpack_require__("b727").forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';

var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);

var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var SymbolPrototype = $Symbol && $Symbol[PROTOTYPE];
var TypeError = global.TypeError;
var QObject = global.QObject;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var push = uncurryThis([].push);

var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var WellKnownSymbolsStore = shared('wks');

// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPropertyKey(P);
  anObject(Attributes);
  if (hasOwn(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!hasOwn(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (hasOwn(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || call($propertyIsEnumerable, properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPropertyKey(V);
  var enumerable = call(nativePropertyIsEnumerable, this, P);
  if (this === ObjectPrototype && hasOwn(AllSymbols, P) && !hasOwn(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !hasOwn(this, P) || !hasOwn(AllSymbols, P) || hasOwn(this, HIDDEN) && this[HIDDEN][P]
    ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPropertyKey(P);
  if (it === ObjectPrototype && hasOwn(AllSymbols, key) && !hasOwn(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && hasOwn(AllSymbols, key) && !(hasOwn(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!hasOwn(AllSymbols, key) && !hasOwn(hiddenKeys, key)) push(result, key);
  });
  return result;
};

var $getOwnPropertySymbols = function (O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (hasOwn(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn(ObjectPrototype, key))) {
      push(result, AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.es/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (isPrototypeOf(SymbolPrototype, this)) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) call(setter, ObjectPrototypeSymbols, value);
      if (hasOwn(this, HIDDEN) && hasOwn(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  SymbolPrototype = $Symbol[PROTOTYPE];

  defineBuiltIn(SymbolPrototype, 'toString', function toString() {
    return getInternalState(this).tag;
  });

  defineBuiltIn($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  definePropertiesModule.f = $defineProperties;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty(SymbolPrototype, 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      defineBuiltIn(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, constructor: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames
});

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
defineSymbolToPrimitive();

// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;


/***/ }),

/***/ "da84":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es-x/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "db18":
/***/ (function(module, exports) {

module.exports = require("lamejs");

/***/ }),

/***/ "dbb4":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var DESCRIPTORS = __webpack_require__("83ab");
var ownKeys = __webpack_require__("56ef");
var toIndexedObject = __webpack_require__("fc6a");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var createProperty = __webpack_require__("8418");

// `Object.getOwnPropertyDescriptors` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;
    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }
    return result;
  }
});


/***/ }),

/***/ "dc4a":
/***/ (function(module, exports, __webpack_require__) {

var aCallable = __webpack_require__("59ed");

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};


/***/ }),

/***/ "ddb0":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DOMIterables = __webpack_require__("fdbc");
var DOMTokenListPrototype = __webpack_require__("785a");
var ArrayIteratorMethods = __webpack_require__("e260");
var createNonEnumerableProperty = __webpack_require__("9112");
var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype, COLLECTION_NAME);
}

handlePrototype(DOMTokenListPrototype, 'DOMTokenList');


/***/ }),

/***/ "df75":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es-x/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "dfb9":
/***/ (function(module, exports, __webpack_require__) {

var lengthOfArrayLike = __webpack_require__("07fa");

module.exports = function (Constructor, list) {
  var index = 0;
  var length = lengthOfArrayLike(list);
  var result = new Constructor(length);
  while (length > index) result[index] = list[index++];
  return result;
};


/***/ }),

/***/ "e01a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.es/ecma262/#sec-symbol.prototype.description

var $ = __webpack_require__("23e7");
var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");
var hasOwn = __webpack_require__("1a2d");
var isCallable = __webpack_require__("1626");
var isPrototypeOf = __webpack_require__("3a9b");
var toString = __webpack_require__("577e");
var defineProperty = __webpack_require__("9bf2").f;
var copyConstructorProperties = __webpack_require__("e893");

var NativeSymbol = global.Symbol;
var SymbolPrototype = NativeSymbol && NativeSymbol.prototype;

if (DESCRIPTORS && isCallable(NativeSymbol) && (!('description' in SymbolPrototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : toString(arguments[0]);
    var result = isPrototypeOf(SymbolPrototype, this)
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };

  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  SymbolWrapper.prototype = SymbolPrototype;
  SymbolPrototype.constructor = SymbolWrapper;

  var NATIVE_SYMBOL = String(NativeSymbol('test')) == 'Symbol(test)';
  var symbolToString = uncurryThis(SymbolPrototype.toString);
  var symbolValueOf = uncurryThis(SymbolPrototype.valueOf);
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  var replace = uncurryThis(''.replace);
  var stringSlice = uncurryThis(''.slice);

  defineProperty(SymbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = symbolValueOf(this);
      var string = symbolToString(symbol);
      if (hasOwn(EmptyStringDescriptionStore, symbol)) return '';
      var desc = NATIVE_SYMBOL ? stringSlice(string, 7, -1) : replace(string, regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, constructor: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}


/***/ }),

/***/ "e163":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var hasOwn = __webpack_require__("1a2d");
var isCallable = __webpack_require__("1626");
var toObject = __webpack_require__("7b0b");
var sharedKey = __webpack_require__("f772");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__("e177");

var IE_PROTO = sharedKey('IE_PROTO');
var Object = global.Object;
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "e177":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es-x/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "e260":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__("fc6a");
var addToUnscopables = __webpack_require__("44d2");
var Iterators = __webpack_require__("3f8c");
var InternalStateModule = __webpack_require__("69f3");
var defineProperty = __webpack_require__("9bf2").f;
var defineIterator = __webpack_require__("7dd0");
var IS_PURE = __webpack_require__("c430");
var DESCRIPTORS = __webpack_require__("83ab");

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
var values = Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

// V8 ~ Chrome 45- bug
if (!IS_PURE && DESCRIPTORS && values.name !== 'values') try {
  defineProperty(values, 'name', { value: 'values' });
} catch (error) { /* empty */ }


/***/ }),

/***/ "e323":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var uncurryThis = __webpack_require__("e330");
var requireObjectCoercible = __webpack_require__("1d80");
var toIntegerOrInfinity = __webpack_require__("5926");
var toString = __webpack_require__("577e");

var stringSlice = uncurryThis(''.slice);
var max = Math.max;
var min = Math.min;

// eslint-disable-next-line unicorn/prefer-string-slice, es-x/no-string-prototype-substr -- required for testing
var FORCED = !''.substr || 'ab'.substr(-1) !== 'b';

// `String.prototype.substr` method
// https://tc39.es/ecma262/#sec-string.prototype.substr
$({ target: 'String', proto: true, forced: FORCED }, {
  substr: function substr(start, length) {
    var that = toString(requireObjectCoercible(this));
    var size = that.length;
    var intStart = toIntegerOrInfinity(start);
    var intLength, intEnd;
    if (intStart === Infinity) intStart = 0;
    if (intStart < 0) intStart = max(size + intStart, 0);
    intLength = length === undefined ? size : toIntegerOrInfinity(length);
    if (intLength <= 0 || intLength === Infinity) return '';
    intEnd = min(intStart + intLength, size);
    return intStart >= intEnd ? '' : stringSlice(that, intStart, intEnd);
  }
});


/***/ }),

/***/ "e330":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__("40d5");

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var uncurryThis = NATIVE_BIND && bind.bind(call, call);

module.exports = NATIVE_BIND ? function (fn) {
  return fn && uncurryThis(fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ "e391":
/***/ (function(module, exports, __webpack_require__) {

var toString = __webpack_require__("577e");

module.exports = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument);
};


/***/ }),

/***/ "e439":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var fails = __webpack_require__("d039");
var toIndexedObject = __webpack_require__("fc6a");
var nativeGetOwnPropertyDescriptor = __webpack_require__("06cf").f;
var DESCRIPTORS = __webpack_require__("83ab");

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetOwnPropertyDescriptor(1); });
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
$({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});


/***/ }),

/***/ "e538":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

exports.f = wellKnownSymbol;


/***/ }),

/***/ "e58c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable es-x/no-array-prototype-lastindexof -- safe */
var apply = __webpack_require__("2ba4");
var toIndexedObject = __webpack_require__("fc6a");
var toIntegerOrInfinity = __webpack_require__("5926");
var lengthOfArrayLike = __webpack_require__("07fa");
var arrayMethodIsStrict = __webpack_require__("a640");

var min = Math.min;
var $lastIndexOf = [].lastIndexOf;
var NEGATIVE_ZERO = !!$lastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('lastIndexOf');
var FORCED = NEGATIVE_ZERO || !STRICT_METHOD;

// `Array.prototype.lastIndexOf` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.lastindexof
module.exports = FORCED ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
  // convert -0 to +0
  if (NEGATIVE_ZERO) return apply($lastIndexOf, this, arguments) || 0;
  var O = toIndexedObject(this);
  var length = lengthOfArrayLike(O);
  var index = length - 1;
  if (arguments.length > 1) index = min(index, toIntegerOrInfinity(arguments[1]));
  if (index < 0) index = length + index;
  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
  return -1;
} : $lastIndexOf;


/***/ }),

/***/ "e5cb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__("d066");
var hasOwn = __webpack_require__("1a2d");
var createNonEnumerableProperty = __webpack_require__("9112");
var isPrototypeOf = __webpack_require__("3a9b");
var setPrototypeOf = __webpack_require__("d2bb");
var copyConstructorProperties = __webpack_require__("e893");
var proxyAccessor = __webpack_require__("aeb0");
var inheritIfRequired = __webpack_require__("7156");
var normalizeStringArgument = __webpack_require__("e391");
var installErrorCause = __webpack_require__("ab36");
var clearErrorStack = __webpack_require__("c770");
var ERROR_STACK_INSTALLABLE = __webpack_require__("b980");
var DESCRIPTORS = __webpack_require__("83ab");
var IS_PURE = __webpack_require__("c430");

module.exports = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
  var STACK_TRACE_LIMIT = 'stackTraceLimit';
  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
  var path = FULL_NAME.split('.');
  var ERROR_NAME = path[path.length - 1];
  var OriginalError = getBuiltIn.apply(null, path);

  if (!OriginalError) return;

  var OriginalErrorPrototype = OriginalError.prototype;

  // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
  if (!IS_PURE && hasOwn(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;

  if (!FORCED) return OriginalError;

  var BaseError = getBuiltIn('Error');

  var WrappedError = wrapper(function (a, b) {
    var message = normalizeStringArgument(IS_AGGREGATE_ERROR ? b : a, undefined);
    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
    if (message !== undefined) createNonEnumerableProperty(result, 'message', message);
    if (ERROR_STACK_INSTALLABLE) createNonEnumerableProperty(result, 'stack', clearErrorStack(result.stack, 2));
    if (this && isPrototypeOf(OriginalErrorPrototype, this)) inheritIfRequired(result, this, WrappedError);
    if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION]);
    return result;
  });

  WrappedError.prototype = OriginalErrorPrototype;

  if (ERROR_NAME !== 'Error') {
    if (setPrototypeOf) setPrototypeOf(WrappedError, BaseError);
    else copyConstructorProperties(WrappedError, BaseError, { name: true });
  } else if (DESCRIPTORS && STACK_TRACE_LIMIT in OriginalError) {
    proxyAccessor(WrappedError, OriginalError, STACK_TRACE_LIMIT);
    proxyAccessor(WrappedError, OriginalError, 'prepareStackTrace');
  }

  copyConstructorProperties(WrappedError, OriginalError);

  if (!IS_PURE) try {
    // Safari 13- bug: WebAssembly errors does not have a proper `.name`
    if (OriginalErrorPrototype.name !== ERROR_NAME) {
      createNonEnumerableProperty(OriginalErrorPrototype, 'name', ERROR_NAME);
    }
    OriginalErrorPrototype.constructor = WrappedError;
  } catch (error) { /* empty */ }

  return WrappedError;
};


/***/ }),

/***/ "e667":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};


/***/ }),

/***/ "e6cf":
/***/ (function(module, exports, __webpack_require__) {

// TODO: Remove this module from `core-js@4` since it's split to modules listed below
__webpack_require__("5e7e");
__webpack_require__("14e5");
__webpack_require__("cc98");
__webpack_require__("3529");
__webpack_require__("f22b");
__webpack_require__("7149");


/***/ }),

/***/ "e893":
/***/ (function(module, exports, __webpack_require__) {

var hasOwn = __webpack_require__("1a2d");
var ownKeys = __webpack_require__("56ef");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ "e8b5":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("c6b6");

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es-x/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
};


/***/ }),

/***/ "e91f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__("ebb5");
var $indexOf = __webpack_require__("4d64").indexOf;

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.indexOf` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.indexof
exportTypedArrayMethod('indexOf', function indexOf(searchElement /* , fromIndex */) {
  return $indexOf(aTypedArray(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ "e95a":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");
var Iterators = __webpack_require__("3f8c");

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ "e9c4":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var getBuiltIn = __webpack_require__("d066");
var apply = __webpack_require__("2ba4");
var call = __webpack_require__("c65b");
var uncurryThis = __webpack_require__("e330");
var fails = __webpack_require__("d039");
var isArray = __webpack_require__("e8b5");
var isCallable = __webpack_require__("1626");
var isObject = __webpack_require__("861d");
var isSymbol = __webpack_require__("d9b5");
var arraySlice = __webpack_require__("f36a");
var NATIVE_SYMBOL = __webpack_require__("4930");

var $stringify = getBuiltIn('JSON', 'stringify');
var exec = uncurryThis(/./.exec);
var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var replace = uncurryThis(''.replace);
var numberToString = uncurryThis(1.0.toString);

var tester = /[\uD800-\uDFFF]/g;
var low = /^[\uD800-\uDBFF]$/;
var hi = /^[\uDC00-\uDFFF]$/;

var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL || fails(function () {
  var symbol = getBuiltIn('Symbol')();
  // MS Edge converts symbol values to JSON as {}
  return $stringify([symbol]) != '[null]'
    // WebKit converts symbol values to JSON as null
    || $stringify({ a: symbol }) != '{}'
    // V8 throws on boxed symbols
    || $stringify(Object(symbol)) != '{}';
});

// https://github.com/tc39/proposal-well-formed-stringify
var ILL_FORMED_UNICODE = fails(function () {
  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
    || $stringify('\uDEAD') !== '"\\udead"';
});

var stringifyWithSymbolsFix = function (it, replacer) {
  var args = arraySlice(arguments);
  var $replacer = replacer;
  if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
  if (!isArray(replacer)) replacer = function (key, value) {
    if (isCallable($replacer)) value = call($replacer, this, key, value);
    if (!isSymbol(value)) return value;
  };
  args[1] = replacer;
  return apply($stringify, null, args);
};

var fixIllFormed = function (match, offset, string) {
  var prev = charAt(string, offset - 1);
  var next = charAt(string, offset + 1);
  if ((exec(low, match) && !exec(hi, next)) || (exec(hi, match) && !exec(low, prev))) {
    return '\\u' + numberToString(charCodeAt(match, 0), 16);
  } return match;
};

if ($stringify) {
  // `JSON.stringify` method
  // https://tc39.es/ecma262/#sec-json.stringify
  $({ target: 'JSON', stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = arraySlice(arguments);
      var result = apply(WRONG_SYMBOLS_CONVERSION ? stringifyWithSymbolsFix : $stringify, null, args);
      return ILL_FORMED_UNICODE && typeof result == 'string' ? replace(result, tester, fixIllFormed) : result;
    }
  });
}


/***/ }),

/***/ "eac5":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

var floor = Math.floor;

// `IsIntegralNumber` abstract operation
// https://tc39.es/ecma262/#sec-isintegralnumber
// eslint-disable-next-line es-x/no-number-isinteger -- safe
module.exports = Number.isInteger || function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),

/***/ "ebb5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var NATIVE_ARRAY_BUFFER = __webpack_require__("a981");
var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var isCallable = __webpack_require__("1626");
var isObject = __webpack_require__("861d");
var hasOwn = __webpack_require__("1a2d");
var classof = __webpack_require__("f5df");
var tryToString = __webpack_require__("0d51");
var createNonEnumerableProperty = __webpack_require__("9112");
var defineBuiltIn = __webpack_require__("cb2d");
var defineProperty = __webpack_require__("9bf2").f;
var isPrototypeOf = __webpack_require__("3a9b");
var getPrototypeOf = __webpack_require__("e163");
var setPrototypeOf = __webpack_require__("d2bb");
var wellKnownSymbol = __webpack_require__("b622");
var uid = __webpack_require__("90e3");

var Int8Array = global.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var Uint8ClampedArray = global.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
var TypedArray = Int8Array && getPrototypeOf(Int8Array);
var TypedArrayPrototype = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
var ObjectPrototype = Object.prototype;
var TypeError = global.TypeError;

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
var TYPED_ARRAY_CONSTRUCTOR = uid('TYPED_ARRAY_CONSTRUCTOR');
// Fixing native typed arrays in Opera Presto crashes the browser, see #595
var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!setPrototypeOf && classof(global.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQUIRED = false;
var NAME, Constructor, Prototype;

var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};

var BigIntArrayConstructorsList = {
  BigInt64Array: 8,
  BigUint64Array: 8
};

var isView = function isView(it) {
  if (!isObject(it)) return false;
  var klass = classof(it);
  return klass === 'DataView'
    || hasOwn(TypedArrayConstructorsList, klass)
    || hasOwn(BigIntArrayConstructorsList, klass);
};

var isTypedArray = function (it) {
  if (!isObject(it)) return false;
  var klass = classof(it);
  return hasOwn(TypedArrayConstructorsList, klass)
    || hasOwn(BigIntArrayConstructorsList, klass);
};

var aTypedArray = function (it) {
  if (isTypedArray(it)) return it;
  throw TypeError('Target is not a typed array');
};

var aTypedArrayConstructor = function (C) {
  if (isCallable(C) && (!setPrototypeOf || isPrototypeOf(TypedArray, C))) return C;
  throw TypeError(tryToString(C) + ' is not a typed array constructor');
};

var exportTypedArrayMethod = function (KEY, property, forced, options) {
  if (!DESCRIPTORS) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && hasOwn(TypedArrayConstructor.prototype, KEY)) try {
      delete TypedArrayConstructor.prototype[KEY];
    } catch (error) {
      // old WebKit bug - some methods are non-configurable
      try {
        TypedArrayConstructor.prototype[KEY] = property;
      } catch (error2) { /* empty */ }
    }
  }
  if (!TypedArrayPrototype[KEY] || forced) {
    defineBuiltIn(TypedArrayPrototype, KEY, forced ? property
      : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property, options);
  }
};

var exportTypedArrayStaticMethod = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!DESCRIPTORS) return;
  if (setPrototypeOf) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global[ARRAY];
      if (TypedArrayConstructor && hasOwn(TypedArrayConstructor, KEY)) try {
        delete TypedArrayConstructor[KEY];
      } catch (error) { /* empty */ }
    }
    if (!TypedArray[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return defineBuiltIn(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && TypedArray[KEY] || property);
      } catch (error) { /* empty */ }
    } else return;
  }
  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      defineBuiltIn(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME in TypedArrayConstructorsList) {
  Constructor = global[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) createNonEnumerableProperty(Prototype, TYPED_ARRAY_CONSTRUCTOR, Constructor);
  else NATIVE_ARRAY_BUFFER_VIEWS = false;
}

for (NAME in BigIntArrayConstructorsList) {
  Constructor = global[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) createNonEnumerableProperty(Prototype, TYPED_ARRAY_CONSTRUCTOR, Constructor);
}

// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS || !isCallable(TypedArray) || TypedArray === Function.prototype) {
  // eslint-disable-next-line no-shadow -- safe
  TypedArray = function TypedArray() {
    throw TypeError('Incorrect invocation');
  };
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME], TypedArray);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
  TypedArrayPrototype = TypedArray.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME].prototype, TypedArrayPrototype);
  }
}

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
  setPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
}

if (DESCRIPTORS && !hasOwn(TypedArrayPrototype, TO_STRING_TAG)) {
  TYPED_ARRAY_TAG_REQUIRED = true;
  defineProperty(TypedArrayPrototype, TO_STRING_TAG, { get: function () {
    return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
  } });
  for (NAME in TypedArrayConstructorsList) if (global[NAME]) {
    createNonEnumerableProperty(global[NAME], TYPED_ARRAY_TAG, NAME);
  }
}

module.exports = {
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
  TYPED_ARRAY_CONSTRUCTOR: TYPED_ARRAY_CONSTRUCTOR,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG,
  aTypedArray: aTypedArray,
  aTypedArrayConstructor: aTypedArrayConstructor,
  exportTypedArrayMethod: exportTypedArrayMethod,
  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
  isView: isView,
  isTypedArray: isTypedArray,
  TypedArray: TypedArray,
  TypedArrayPrototype: TypedArrayPrototype
};


/***/ }),

/***/ "edd0":
/***/ (function(module, exports, __webpack_require__) {

var makeBuiltIn = __webpack_require__("13d2");
var defineProperty = __webpack_require__("9bf2");

module.exports = function (target, name, descriptor) {
  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
  return defineProperty.f(target, name, descriptor);
};


/***/ }),

/***/ "f069":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aCallable = __webpack_require__("59ed");

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aCallable(resolve);
  this.reject = aCallable(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "f183":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var uncurryThis = __webpack_require__("e330");
var hiddenKeys = __webpack_require__("d012");
var isObject = __webpack_require__("861d");
var hasOwn = __webpack_require__("1a2d");
var defineProperty = __webpack_require__("9bf2").f;
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertyNamesExternalModule = __webpack_require__("057f");
var isExtensible = __webpack_require__("4fadd");
var uid = __webpack_require__("90e3");
var FREEZING = __webpack_require__("bb2f");

var REQUIRED = false;
var METADATA = uid('meta');
var id = 0;

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + id++, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!hasOwn(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!hasOwn(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING && REQUIRED && isExtensible(it) && !hasOwn(it, METADATA)) setMetadata(it);
  return it;
};

var enable = function () {
  meta.enable = function () { /* empty */ };
  REQUIRED = true;
  var getOwnPropertyNames = getOwnPropertyNamesModule.f;
  var splice = uncurryThis([].splice);
  var test = {};
  test[METADATA] = 1;

  // prevent exposing of metadata key
  if (getOwnPropertyNames(test).length) {
    getOwnPropertyNamesModule.f = function (it) {
      var result = getOwnPropertyNames(it);
      for (var i = 0, length = result.length; i < length; i++) {
        if (result[i] === METADATA) {
          splice(result, i, 1);
          break;
        }
      } return result;
    };

    $({ target: 'Object', stat: true, forced: true }, {
      getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
    });
  }
};

var meta = module.exports = {
  enable: enable,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;


/***/ }),

/***/ "f22b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var call = __webpack_require__("c65b");
var newPromiseCapabilityModule = __webpack_require__("f069");
var FORCED_PROMISE_CONSTRUCTOR = __webpack_require__("4738").CONSTRUCTOR;

// `Promise.reject` method
// https://tc39.es/ecma262/#sec-promise.reject
$({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
  reject: function reject(r) {
    var capability = newPromiseCapabilityModule.f(this);
    call(capability.reject, undefined, r);
    return capability.promise;
  }
});


/***/ }),

/***/ "f36a":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");

module.exports = uncurryThis([].slice);


/***/ }),

/***/ "f5df":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var isCallable = __webpack_require__("1626");
var classofRaw = __webpack_require__("c6b6");
var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var Object = global.Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ "f772":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5692");
var uid = __webpack_require__("90e3");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "f8cd":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var toIntegerOrInfinity = __webpack_require__("5926");

var RangeError = global.RangeError;

module.exports = function (it) {
  var result = toIntegerOrInfinity(it);
  if (result < 0) throw RangeError("The argument can't be less than 0");
  return result;
};


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.define-property.js
var es_object_define_property = __webpack_require__("7a82");

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/ChatWindow.vue?vue&type=template&id=607979cc

var _hoisted_1 = {
  "class": "vac-chat-container"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_rooms_list = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("rooms-list");

  var _component_room = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("room");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    "class": "vac-card-window",
    style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])([{
      height: $props.height
    }, $options.cssVars])
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_1, [!$props.singleRoom ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_rooms_list, {
    key: 0,
    "current-user-id": $props.currentUserId,
    rooms: $options.orderedRooms,
    "loading-rooms": $props.loadingRooms,
    "rooms-loaded": $props.roomsLoaded,
    room: $data.room,
    "room-actions": $props.roomActions,
    "text-messages": $options.t,
    "show-search": $props.showSearch,
    "show-add-room": $props.showAddRoom,
    "show-rooms-list": $data.showRoomsList,
    "text-formatting": $props.textFormatting,
    "link-options": $props.linkOptions,
    "is-mobile": $data.isMobile,
    onFetchRoom: $options.fetchRoom,
    onFetchMoreRooms: $options.fetchMoreRooms,
    onLoadingMoreRooms: _cache[0] || (_cache[0] = function ($event) {
      return $data.loadingMoreRooms = $event;
    }),
    onAddRoom: $options.addRoom,
    onRoomActionHandler: $options.roomActionHandler
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createSlots"])({
    _: 2
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.$slots, function (i, name) {
    return {
      name: name,
      fn: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function (data) {
        return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, name, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeProps"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["guardReactiveProps"])(data)))];
      })
    };
  })]), 1032, ["current-user-id", "rooms", "loading-rooms", "rooms-loaded", "room", "room-actions", "text-messages", "show-search", "show-add-room", "show-rooms-list", "text-formatting", "link-options", "is-mobile", "onFetchRoom", "onFetchMoreRooms", "onAddRoom", "onRoomActionHandler"])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_room, {
    "current-user-id": $props.currentUserId,
    rooms: $props.rooms,
    "room-id": $data.room.roomId || '',
    "load-first-room": $props.loadFirstRoom,
    messages: $props.messages,
    "room-message": $props.roomMessage,
    "messages-loaded": $props.messagesLoaded,
    "menu-actions": $props.menuActions,
    "message-actions": $props.messageActions,
    "show-send-icon": $props.showSendIcon,
    "show-files": $props.showFiles,
    "show-audio": $props.showAudio,
    "show-emojis": $props.showEmojis,
    "show-reaction-emojis": $props.showReactionEmojis,
    "show-new-messages-divider": $props.showNewMessagesDivider,
    "show-footer": $props.showFooter,
    "text-messages": $options.t,
    "single-room": $props.singleRoom,
    "show-rooms-list": $data.showRoomsList,
    "text-formatting": $props.textFormatting,
    "link-options": $props.linkOptions,
    "is-mobile": $data.isMobile,
    "loading-rooms": $props.loadingRooms,
    "room-info": _ctx.$attrs['room-info'],
    "textarea-action": _ctx.$attrs['textarea-action-handler'],
    "accepted-files": $props.acceptedFiles,
    "force-username": $props.forceUsername,
    onToggleRoomsList: $options.toggleRoomsList,
    onRoomInfo: $options.roomInfo,
    onFetchMessages: $options.fetchMessages,
    onSendMessage: $options.sendMessage,
    onEditMessage: $options.editMessage,
    onDeleteMessage: $options.deleteMessage,
    onOpenFile: $options.openFile,
    onOpenUserTag: $options.openUserTag,
    onMenuActionHandler: $options.menuActionHandler,
    onMessageActionHandler: $options.messageActionHandler,
    onSendMessageReaction: $options.sendMessageReaction,
    onTypingMessage: $options.typingMessage,
    onTextareaActionHandler: $options.textareaActionHandler
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createSlots"])({
    _: 2
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.$slots, function (i, name) {
    return {
      name: name,
      fn: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function (data) {
        return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, name, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeProps"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["guardReactiveProps"])(data)))];
      })
    };
  })]), 1032, ["current-user-id", "rooms", "room-id", "load-first-room", "messages", "room-message", "messages-loaded", "menu-actions", "message-actions", "show-send-icon", "show-files", "show-audio", "show-emojis", "show-reaction-emojis", "show-new-messages-divider", "show-footer", "text-messages", "single-room", "show-rooms-list", "text-formatting", "link-options", "is-mobile", "loading-rooms", "room-info", "textarea-action", "accepted-files", "force-username", "onToggleRoomsList", "onRoomInfo", "onFetchMessages", "onSendMessage", "onEditMessage", "onDeleteMessage", "onOpenFile", "onOpenUserTag", "onMenuActionHandler", "onMessageActionHandler", "onSendMessageReaction", "onTypingMessage", "onTextareaActionHandler"])]), $data.imagePreview ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 0,
    "class": "vac-image-preview",
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return $data.imagePreview = false;
    })
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    "class": "vac-image",
    style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
      'background-image': "url('".concat(_ctx.imagePreviewUrl, "')")
    })
  }, null, 4)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 4);
}
// CONCATENATED MODULE: ./src/lib/ChatWindow.vue?vue&type=template&id=607979cc

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__("a4d3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__("e439");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.for-each.js
var es_array_for_each = __webpack_require__("4160");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptors.js
var es_object_get_own_property_descriptors = __webpack_require__("dbb4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.define-properties.js
var es_object_define_properties = __webpack_require__("1d1c");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js












function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.sort.js
var es_array_sort = __webpack_require__("4e82");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__("7db0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.entries.js
var es_object_entries = __webpack_require__("4fad");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/RoomsList/RoomsList.vue?vue&type=template&id=b4f89796

var RoomsListvue_type_template_id_b4f89796_hoisted_1 = {
  key: 0,
  "class": "vac-rooms-empty"
};
var _hoisted_2 = {
  key: 1,
  "class": "vac-room-list"
};
var _hoisted_3 = ["id", "onClick"];

var _hoisted_4 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, null, -1);

var _hoisted_5 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, null, -1);

function RoomsListvue_type_template_id_b4f89796_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_rooms_search = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("rooms-search");

  var _component_loader = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("loader");

  var _component_room_content = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("room-content");

  var _component_infinite_loading = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("infinite-loading");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    "class": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["vac-rooms-container vac-app-border-r", {
      'vac-rooms-container-full': $props.isMobile
    }])
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "rooms-header"), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "rooms-list-search", {}, function () {
    return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_rooms_search, {
      rooms: $props.rooms,
      "loading-rooms": $props.loadingRooms,
      "text-messages": $props.textMessages,
      "show-search": $props.showSearch,
      "show-add-room": $props.showAddRoom,
      onSearchRoom: $options.searchRoom,
      onAddRoom: _cache[0] || (_cache[0] = function ($event) {
        return _ctx.$emit('add-room');
      })
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createSlots"])({
      _: 2
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.$slots, function (i, name) {
      return {
        name: name,
        fn: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function (data) {
          return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, name, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeProps"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["guardReactiveProps"])(data)))];
        })
      };
    })]), 1032, ["rooms", "loading-rooms", "text-messages", "show-search", "show-add-room", "onSearchRoom"])];
  }), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_loader, {
    show: $props.loadingRooms
  }, null, 8, ["show"]), !$props.loadingRooms && !$props.rooms.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", RoomsListvue_type_template_id_b4f89796_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "rooms-empty", {}, function () {
    return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($props.textMessages.ROOMS_EMPTY), 1)];
  })])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), !$props.loadingRooms ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_2, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])($data.filteredRooms, function (fRoom) {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
      id: fRoom.roomId,
      key: fRoom.roomId,
      "class": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["vac-room-item", {
        'vac-room-selected': $data.selectedRoomId === fRoom.roomId
      }]),
      onClick: function onClick($event) {
        return $options.openRoom(fRoom);
      }
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_room_content, {
      "current-user-id": $props.currentUserId,
      room: fRoom,
      "text-formatting": $props.textFormatting,
      "link-options": $props.linkOptions,
      "text-messages": $props.textMessages,
      "room-actions": $props.roomActions,
      onRoomActionHandler: _cache[1] || (_cache[1] = function ($event) {
        return _ctx.$emit('room-action-handler', $event);
      })
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createSlots"])({
      _: 2
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.$slots, function (i, name) {
      return {
        name: name,
        fn: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function (data) {
          return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, name, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeProps"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["guardReactiveProps"])(data)))];
        })
      };
    })]), 1032, ["current-user-id", "room", "text-formatting", "link-options", "text-messages", "room-actions"])], 10, _hoisted_3);
  }), 128)), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Transition"], {
    name: "vac-fade-message"
  }, {
    "default": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      return [$props.rooms.length && !$props.loadingRooms ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_infinite_loading, {
        key: 0,
        "force-use-infinite-wrapper": ".vac-room-list",
        "web-component-name": "vue-advanced-chat",
        onInfinite: $options.loadMoreRooms
      }, {
        spinner: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
          return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_loader, {
            show: true,
            infinite: true
          })];
        }),
        "no-results": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
          return [_hoisted_4];
        }),
        "no-more": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
          return [_hoisted_5];
        }),
        _: 1
      }, 8, ["onInfinite"])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)];
    }),
    _: 1
  })])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 2)), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], $props.showRoomsList]]);
}
// CONCATENATED MODULE: ./src/lib/RoomsList/RoomsList.vue?vue&type=template&id=b4f89796

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.assign.js
var es_object_assign = __webpack_require__("cca6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__("a15b");

// CONCATENATED MODULE: ./src/components/InfiniteLoading/config.js



/*
 * default property values
 */
var props = {
  // the default spinner type
  spinner: 'default',
  // the default critical distance
  distance: 100,
  // the default force use infinite wrapper flag
  forceUseInfiniteWrapper: false
};
/**
 * default system settings
 */

var system = {
  // the default throttle space of time
  throttleLimit: 50,
  // the timeout for check infinite loop, unit: ms
  loopCheckTimeout: 1000,
  // the max allowed number of continuous calls, unit: ms
  loopCheckMaxCalls: 10
};
/**
 * default slot messages
 */

var slots = {
  noResults: 'No results :(',
  noMore: 'No more data :)',
  error: 'Opps, something went wrong :(',
  errorBtnText: 'Retry',
  spinner: ''
};
/**
 * the 3rd argument for event bundler
 * @see https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
 */

var evt3rdArg = function () {
  var result = false;

  try {
    var arg = Object.defineProperty({}, 'passive', {
      get: function get() {
        result = {
          passive: true
        };
        return true;
      }
    });
    window.addEventListener('testpassive', arg, arg);
    window.remove('testpassive', arg, arg);
  } catch (e) {
    /* */
  }

  return result;
}();
/**
 * warning messages
 */

var WARNINGS = {
  STATE_CHANGER: ['emit `loaded` and `complete` event through component instance of `$refs` may cause error, so it will be deprecated soon, please use the `$state` argument instead (`$state` just the special `$event` variable):', '\ntemplate:', '<infinite-loading @infinite="infiniteHandler"></infinite-loading>', "\nscript:\n...\ninfiniteHandler($state) {\n  ajax('https://www.example.com/api/news')\n    .then((res) => {\n      if (res.data.length) {\n        $state.loaded();\n      } else {\n        $state.complete();\n      }\n    });\n}\n...", '', 'more details: https://github.com/PeachScript/vue-infinite-loading/issues/57#issuecomment-324370549'].join('\n'),
  INFINITE_EVENT: '`:on-infinite` property will be deprecated soon, please use `@infinite` event instead.',
  IDENTIFIER: 'the `reset` event will be deprecated soon, please reset this component by change the `identifier` property.'
};
/**
 * error messages
 */

var ERRORS = {
  INFINITE_LOOP: ["executed the callback function more than ".concat(system.loopCheckMaxCalls, " times for a short time, it looks like searched a wrong scroll wrapper that doest not has fixed height or maximum height, please check it. If you want to force to set a element as scroll wrapper ranther than automatic searching, you can do this:"), "\n<!-- add a special attribute for the real scroll wrapper -->\n<div infinite-wrapper>\n  ...\n  <!-- set force-use-infinite-wrapper -->\n  <infinite-loading force-use-infinite-wrapper></infinite-loading>\n</div>\nor\n<div class=\"infinite-wrapper\">\n  ...\n  <!-- set force-use-infinite-wrapper as css selector of the real scroll wrapper -->\n  <infinite-loading force-use-infinite-wrapper=\".infinite-wrapper\"></infinite-loading>\n</div>\n    ", 'more details: https://github.com/PeachScript/vue-infinite-loading/issues/55#issuecomment-316934169'].join('\n')
};
/**
 * plugin status constants
 */

var STATUS = {
  READY: 0,
  LOADING: 1,
  COMPLETE: 2,
  ERROR: 3
};
/**
 * default slot styles
 */

var SLOT_STYLES = {
  color: '#666',
  fontSize: '14px',
  padding: '10px 0'
};
/* harmony default export */ var InfiniteLoading_config = ({
  mode: 'development',
  props: props,
  system: system,
  slots: slots,
  WARNINGS: WARNINGS,
  ERRORS: ERRORS,
  STATUS: STATUS
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/InfiniteLoading/components/InfiniteLoading.vue?vue&type=template&id=5b700216&scoped=true


var InfiniteLoadingvue_type_template_id_5b700216_scoped_true_withScopeId = function _withScopeId(n) {
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["pushScopeId"])("data-v-5b700216"), n = n(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["popScopeId"])(), n;
};

var InfiniteLoadingvue_type_template_id_5b700216_scoped_true_hoisted_1 = {
  "class": "infinite-loading-container"
};

var InfiniteLoadingvue_type_template_id_5b700216_scoped_true_hoisted_2 = /*#__PURE__*/InfiniteLoadingvue_type_template_id_5b700216_scoped_true_withScopeId(function () {
  return /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);
});

var InfiniteLoadingvue_type_template_id_5b700216_scoped_true_hoisted_3 = ["textContent"];
function InfiniteLoadingvue_type_template_id_5b700216_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", InfiniteLoadingvue_type_template_id_5b700216_scoped_true_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    "class": "infinite-status-prompt",
    style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])($options.slotStyles.spinner)
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "spinner", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeProps"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["guardReactiveProps"])({
    isFirstLoad: $data.isFirstLoad
  })), undefined, true)], 4), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], $options.isShowSpinner]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    "class": "infinite-status-prompt",
    style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])($options.slotStyles.noResults)
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "no-results", {}, function () {
    return [$data.slots.noResults.render ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDynamicComponent"])($data.slots.noResults), {
      key: 0
    })) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
      key: 1
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($data.slots.noResults), 1)], 64))];
  }, true)], 4), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], $options.isShowNoResults]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    "class": "infinite-status-prompt",
    style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])($options.slotStyles.noMore)
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "no-more", {}, function () {
    return [$data.slots.noMore.render ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDynamicComponent"])($data.slots.noMore), {
      key: 0
    })) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
      key: 1
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($data.slots.noMore), 1)], 64))];
  }, true)], 4), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], $options.isShowNoMore]]), $options.isShowError ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 0,
    "class": "infinite-status-prompt",
    style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])($options.slotStyles.error)
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "error", {
    trigger: $options.attemptLoad
  }, function () {
    return [$data.slots.error.render ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDynamicComponent"])($data.slots.error), {
      key: 0,
      trigger: $options.attemptLoad
    }, null, 8, ["trigger"])) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
      key: 1
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($data.slots.error) + " ", 1), InfiniteLoadingvue_type_template_id_5b700216_scoped_true_hoisted_2, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
      "class": "btn-try-infinite",
      onClick: _cache[0] || (_cache[0] = function () {
        return $options.attemptLoad && $options.attemptLoad.apply($options, arguments);
      }),
      textContent: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($data.slots.errorBtnText)
    }, null, 8, InfiniteLoadingvue_type_template_id_5b700216_scoped_true_hoisted_3)], 64))];
  }, true)], 4)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]);
}
// CONCATENATED MODULE: ./src/components/InfiniteLoading/components/InfiniteLoading.vue?vue&type=template&id=5b700216&scoped=true

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.date.to-string.js
var es_date_to_string = __webpack_require__("0d03");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.timers.js
var web_timers = __webpack_require__("4795");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.bind.js
var es_function_bind = __webpack_require__("c0b6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.index-of.js
var es_array_index_of = __webpack_require__("c975");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a434");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// CONCATENATED MODULE: ./src/components/InfiniteLoading/utils.js









/* eslint-disable no-console */

/**
 * console warning in production
 * @param {String} msg console content
 */

function warn(msg) {
  /* istanbul ignore else */
  if (InfiniteLoading_config.mode !== 'production') {
    console.warn("[Vue-infinite-loading warn]: ".concat(msg));
  }
}
/**
 * console error
 * @param {String} msg console content
 */

function utils_error(msg) {
  console.error("[Vue-infinite-loading error]: ".concat(msg));
}
var throttleer = {
  timers: [],
  caches: [],
  throttle: function throttle(fn) {
    var _this = this;

    if (this.caches.indexOf(fn) === -1) {
      // cache current handler
      this.caches.push(fn); // save timer for current handler

      this.timers.push(setTimeout(function () {
        fn(); // empty cache and timer

        _this.caches.splice(_this.caches.indexOf(fn), 1);

        _this.timers.shift();
      }, InfiniteLoading_config.system.throttleLimit));
    }
  },
  reset: function reset() {
    // reset all timers
    this.timers.forEach(function (timer) {
      clearTimeout(timer);
    });
    this.timers.length = 0; // empty caches

    this.caches = [];
  }
};
var loopTracker = {
  isChecked: false,
  timer: null,
  times: 0,
  track: function track() {
    var _this2 = this;

    // record track times
    this.times += 1; // try to mark check status

    clearTimeout(this.timer);
    this.timer = setTimeout(function () {
      _this2.isChecked = true;
    }, InfiniteLoading_config.system.loopCheckTimeout); // throw warning if the times of continuous calls large than the maximum times

    if (this.times > InfiniteLoading_config.system.loopCheckMaxCalls) {
      utils_error(ERRORS.INFINITE_LOOP);
      this.isChecked = true;
    }
  }
};
var scrollBarStorage = {
  key: '_infiniteScrollHeight',
  getScrollElm: function getScrollElm(elm) {
    return elm === window ? document.documentElement : elm;
  },
  save: function save(elm) {
    var target = this.getScrollElm(elm); // save scroll height on the scroll parent

    target[this.key] = target.scrollHeight;
  },
  restore: function restore(elm) {
    var target = this.getScrollElm(elm);
    /* istanbul ignore else */

    if (typeof target[this.key] === 'number') {
      target.scrollTop = target.scrollHeight - target[this.key] + target.scrollTop;
    }

    this.remove(target);
  },
  remove: function remove(elm) {
    if (elm[this.key] !== undefined) {
      // remove scroll height
      delete elm[this.key]; // eslint-disable-line no-param-reassign
    }
  }
};
/**
 * kebab-case a camel-case string
 * @param   {String}    str  source string
 * @return  {String}
 */

function kebabCase(str) {
  return str.replace(/[A-Z]/g, function (s) {
    return "-".concat(s.toLowerCase());
  });
}
/**
 * get visibility for element
 * @param   {DOM}     elm
 * @return  {Boolean}
 */

function isVisible(elm) {
  return elm.offsetWidth + elm.offsetHeight > 0;
}
/* harmony default export */ var utils = ({
  warn: warn,
  error: utils_error,
  throttleer: throttleer,
  loopTracker: loopTracker,
  kebabCase: kebabCase,
  scrollBarStorage: scrollBarStorage,
  isVisible: isVisible
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/InfiniteLoading/components/InfiniteLoading.vue?vue&type=script&lang=js











/* harmony default export */ var InfiniteLoadingvue_type_script_lang_js = ({
  name: 'InfiniteLoading',
  props: {
    distance: {
      type: Number,
      "default": InfiniteLoading_config.props.distance
    },
    direction: {
      type: String,
      "default": 'bottom'
    },
    forceUseInfiniteWrapper: {
      type: [Boolean, String],
      "default": InfiniteLoading_config.props.forceUseInfiniteWrapper
    },
    identifier: {
      type: Number,
      "default": +new Date()
    },
    webComponentName: {
      type: [String],
      "default": ''
    }
  },
  data: function data() {
    return {
      scrollParent: null,
      scrollHandler: null,
      isFirstLoad: true,
      // save the current loading whether it is the first loading
      status: STATUS.READY,
      slots: InfiniteLoading_config.slots
    };
  },
  computed: {
    isShowSpinner: function isShowSpinner() {
      return this.status === STATUS.LOADING;
    },
    isShowError: function isShowError() {
      return this.status === STATUS.ERROR;
    },
    isShowNoResults: function isShowNoResults() {
      return this.status === STATUS.COMPLETE && this.isFirstLoad;
    },
    isShowNoMore: function isShowNoMore() {
      return this.status === STATUS.COMPLETE && !this.isFirstLoad;
    },
    slotStyles: function slotStyles() {
      var _this = this;

      var styles = {};
      Object.keys(InfiniteLoading_config.slots).forEach(function (key) {
        var name = kebabCase(key);

        if ( // no slot and the configured default slot is not a Vue component
        !_this.$slots[name] && !InfiniteLoading_config.slots[key] || // has slot and slot is pure text node
        _this.$slots[name] && !_this.$slots[name].tag) {
          // only apply default styles for pure text slot
          styles[key] = SLOT_STYLES;
        }
      });
      return styles;
    }
  },
  watch: {
    identifier: function identifier() {
      this.stateChanger.reset();
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$watch('forceUseInfiniteWrapper', function () {
      _this2.scrollParent = _this2.getScrollParent();
    }, {
      immediate: true
    });

    this.scrollHandler = function (ev) {
      if (_this2.status === STATUS.READY) {
        if (ev && ev.constructor === Event && isVisible(_this2.$el)) {
          throttleer.throttle(_this2.attemptLoad);
        } else {
          _this2.attemptLoad();
        }
      }
    };

    setTimeout(function () {
      _this2.scrollHandler();

      _this2.scrollParent.addEventListener('scroll', _this2.scrollHandler, evt3rdArg);
    }, 1);
    /**
     * change state for this component, pass to the callback
     */

    this.stateChanger = {
      loaded: function loaded() {
        _this2.InfiniteLoading_loaded({
          target: _this2
        });
      },
      complete: function complete() {
        _this2.InfiniteLoading_complete({
          target: _this2
        });
      },
      reset: function reset() {
        _this2.InfiniteLoading_reset({
          target: _this2
        });
      },
      error: function error() {
        _this2.status = STATUS.ERROR;
        throttleer.reset();
      }
    };
  },

  /**
   * To adapt to keep-alive feature, but only work on Vue 2.2.0 and above, see: https://vuejs.org/v2/api/#keep-alive
   */
  deactivated: function deactivated() {
    /* istanbul ignore else */
    if (this.status === STATUS.LOADING) {
      this.status = STATUS.READY;
    }

    this.scrollParent.removeEventListener('scroll', this.scrollHandler, evt3rdArg);
  },
  activated: function activated() {
    this.scrollParent.addEventListener('scroll', this.scrollHandler, evt3rdArg);
  },
  unmounted: function unmounted() {
    /* istanbul ignore else */
    if (!this.status !== STATUS.COMPLETE) {
      throttleer.reset();
      scrollBarStorage.remove(this.scrollParent);
      this.scrollParent.removeEventListener('scroll', this.scrollHandler, evt3rdArg);
    }
  },
  methods: {
    InfiniteLoading_loaded: function InfiniteLoading_loaded(ev) {
      var _this3 = this;

      this.isFirstLoad = false;

      if (this.direction === 'top') {
        // wait for DOM updated
        this.$nextTick(function () {
          scrollBarStorage.restore(_this3.scrollParent);
        });
      }

      if (this.status === STATUS.LOADING) {
        this.$nextTick(this.attemptLoad.bind(null, true));
      }

      if (!ev || ev.target !== this) {
        warn(WARNINGS.STATE_CHANGER);
      }
    },
    InfiniteLoading_complete: function InfiniteLoading_complete(ev) {
      var _this4 = this;

      this.status = STATUS.COMPLETE; // force re-complation computed properties to fix the problem of get slot text delay

      this.$nextTick(function () {
        _this4.$forceUpdate();
      });
      this.scrollParent.removeEventListener('scroll', this.scrollHandler, evt3rdArg);

      if (!ev || ev.target !== this) {
        warn(WARNINGS.STATE_CHANGER);
      }
    },
    InfiniteLoading_reset: function InfiniteLoading_reset(ev) {
      var _this5 = this;

      this.status = STATUS.READY;
      this.isFirstLoad = true;
      scrollBarStorage.remove(this.scrollParent);
      this.scrollParent.addEventListener('scroll', this.scrollHandler, evt3rdArg); // wait for list to be empty and the empty action may trigger a scroll event

      setTimeout(function () {
        throttleer.reset();

        _this5.scrollHandler();
      }, 1);

      if (!ev || ev.target !== this) {
        warn(WARNINGS.IDENTIFIER);
      }
    },

    /**
     * attempt trigger load
     * @param {Boolean} isContinuousCall  the flag of continuous call, it will be true
     *                                    if this method be called in the `loaded`
     *                                    event handler
     */
    attemptLoad: function attemptLoad(isContinuousCall) {
      var _this6 = this;

      if (this.status !== STATUS.COMPLETE && isVisible(this.$el) && this.getCurrentDistance() <= this.distance) {
        this.status = STATUS.LOADING;

        if (this.direction === 'top') {
          // wait for spinner display
          this.$nextTick(function () {
            scrollBarStorage.save(_this6.scrollParent);
          });
        }

        this.$emit('infinite', this.stateChanger);

        if (isContinuousCall && !this.forceUseInfiniteWrapper && !loopTracker.isChecked) {
          // check this component whether be in an infinite loop if it is not checked
          // more details: https://github.com/PeachScript/vue-infinite-loading/issues/55#issuecomment-316934169
          loopTracker.track();
        }
      } else if (this.status === STATUS.LOADING) {
        this.status = STATUS.READY;
      }
    },

    /**
     * get current distance from the specified direction
     * @return {Number}     distance
     */
    getCurrentDistance: function getCurrentDistance() {
      var distance;

      if (this.direction === 'top') {
        distance = typeof this.scrollParent.scrollTop === 'number' ? this.scrollParent.scrollTop : this.scrollParent.pageYOffset;
      } else {
        var infiniteElmOffsetTopFromBottom = this.$el.getBoundingClientRect().top;
        var scrollElmOffsetTopFromBottom = this.scrollParent === window ? window.innerHeight : this.scrollParent.getBoundingClientRect().bottom;
        distance = infiniteElmOffsetTopFromBottom - scrollElmOffsetTopFromBottom;
      }

      return distance;
    },

    /**
     * get the first scroll parent of an element
     * @param  {DOM} elm    cache element for recursive search
     * @return {DOM}        the first scroll parent
     */
    getScrollParent: function getScrollParent() {
      var elm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$el;
      var result;

      if (typeof this.forceUseInfiniteWrapper === 'string') {
        var component;

        if (this.webComponentName) {
          component = document.querySelector(this.webComponentName);
        }

        if (component) {
          result = component.shadowRoot.querySelector(this.forceUseInfiniteWrapper);
        } else {
          result = document.querySelector(this.forceUseInfiniteWrapper);
        }
      }

      if (!result) {
        if (elm.tagName === 'BODY') {
          result = window;
        } else if (!this.forceUseInfiniteWrapper && ['scroll', 'auto'].indexOf(getComputedStyle(elm).overflowY) > -1) {
          result = elm;
        } else if (elm.hasAttribute('infinite-wrapper') || elm.hasAttribute('data-infinite-wrapper')) {
          result = elm;
        }
      }

      return result || this.getScrollParent(elm.parentNode);
    }
  }
});
// CONCATENATED MODULE: ./src/components/InfiniteLoading/components/InfiniteLoading.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./src/components/InfiniteLoading/components/InfiniteLoading.vue?vue&type=style&index=0&id=5b700216&lang=scss&scoped=true
var InfiniteLoadingvue_type_style_index_0_id_5b700216_lang_scss_scoped_true = __webpack_require__("6051");

// EXTERNAL MODULE: ./node_modules/vue-loader-v16/dist/exportHelper.js
var exportHelper = __webpack_require__("6b0d");
var exportHelper_default = /*#__PURE__*/__webpack_require__.n(exportHelper);

// CONCATENATED MODULE: ./src/components/InfiniteLoading/components/InfiniteLoading.vue







const __exports__ = /*#__PURE__*/exportHelper_default()(InfiniteLoadingvue_type_script_lang_js, [['render',InfiniteLoadingvue_type_template_id_5b700216_scoped_true_render],['__scopeId',"data-v-5b700216"]])

/* harmony default export */ var InfiniteLoading = (__exports__);
// CONCATENATED MODULE: ./src/components/InfiniteLoading/index.js





function syncModeFromVue(Vue) {
  InfiniteLoading_config.mode = Vue.config.productionTip ? 'development' : 'production';
}

Object.defineProperty(InfiniteLoading, 'install', {
  configurable: false,
  enumerable: false,
  value: function value(Vue, options) {
    // override default props
    Object.assign(InfiniteLoading_config.props, options && options.props); // override default slots

    Object.assign(InfiniteLoading_config.slots, options && options.slots); // override default system settings

    Object.assign(InfiniteLoading_config.system, options && options.system); // register component

    Vue.component('InfiniteLoading', InfiniteLoading);
    syncModeFromVue(Vue);
  }
}); // register component automatically if there has global Vue

/* istanbul ignore else */

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('infinite-loading', InfiniteLoading);
  syncModeFromVue(window.Vue);
}

/* harmony default export */ var components_InfiniteLoading = (InfiniteLoading);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/Loader/Loader.vue?vue&type=template&id=72c38546


var Loadervue_type_template_id_72c38546_hoisted_1 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
  id: "vac-circle"
}, null, -1);

var Loadervue_type_template_id_72c38546_hoisted_2 = [Loadervue_type_template_id_72c38546_hoisted_1];
function Loadervue_type_template_id_72c38546_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Transition"], {
    name: "vac-fade-spinner",
    appear: ""
  }, {
    "default": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      return [$props.show ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
        key: 0,
        "class": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["vac-loader-wrapper", {
          'vac-container-center': !$props.infinite,
          'vac-container-top': $props.infinite
        }])
      }, Loadervue_type_template_id_72c38546_hoisted_2, 2)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)];
    }),
    _: 1
  });
}
// CONCATENATED MODULE: ./src/components/Loader/Loader.vue?vue&type=template&id=72c38546

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/Loader/Loader.vue?vue&type=script&lang=js
/* harmony default export */ var Loadervue_type_script_lang_js = ({
  name: 'Loader',
  props: {
    show: {
      type: Boolean,
      "default": false
    },
    infinite: {
      type: Boolean,
      "default": false
    }
  }
});
// CONCATENATED MODULE: ./src/components/Loader/Loader.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/components/Loader/Loader.vue





const Loader_exports_ = /*#__PURE__*/exportHelper_default()(Loadervue_type_script_lang_js, [['render',Loadervue_type_template_id_72c38546_render]])

/* harmony default export */ var Loader = (Loader_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/RoomsList/RoomsSearch/RoomsSearch.vue?vue&type=template&id=5ac1fb0f

var RoomsSearchvue_type_template_id_5ac1fb0f_hoisted_1 = {
  key: 0,
  "class": "vac-icon-search"
};
var RoomsSearchvue_type_template_id_5ac1fb0f_hoisted_2 = ["placeholder"];
function RoomsSearchvue_type_template_id_5ac1fb0f_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_svg_icon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("svg-icon");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    "class": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])({
      'vac-box-search': $options.showSearchBar,
      'vac-box-empty': !$options.showSearchBar
    })
  }, [$props.showSearch ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 0
  }, [!$props.loadingRooms && $props.rooms.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", RoomsSearchvue_type_template_id_5ac1fb0f_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "search-icon", {}, function () {
    return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_svg_icon, {
      name: "search"
    })];
  })])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), !$props.loadingRooms && $props.rooms.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("input", {
    key: 1,
    type: "search",
    placeholder: $props.textMessages.SEARCH,
    autocomplete: "off",
    "class": "vac-input",
    onInput: _cache[0] || (_cache[0] = function ($event) {
      return _ctx.$emit('search-room', $event);
    })
  }, null, 40, RoomsSearchvue_type_template_id_5ac1fb0f_hoisted_2)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 64)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), $props.showAddRoom ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 1,
    "class": "vac-svg-button vac-add-icon",
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return _ctx.$emit('add-room');
    })
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "add-icon", {}, function () {
    return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_svg_icon, {
      name: "add"
    })];
  })])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 2);
}
// CONCATENATED MODULE: ./src/lib/RoomsList/RoomsSearch/RoomsSearch.vue?vue&type=template&id=5ac1fb0f

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/SvgIcon/SvgIcon.vue?vue&type=template&id=e01c0bf4



var SvgIconvue_type_template_id_e01c0bf4_hoisted_1 = ["viewBox"];
var SvgIconvue_type_template_id_e01c0bf4_hoisted_2 = ["id", "d"];
var SvgIconvue_type_template_id_e01c0bf4_hoisted_3 = ["id", "d"];
function SvgIconvue_type_template_id_e01c0bf4_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    version: "1.1",
    width: "24",
    height: "24",
    viewBox: "0 0 ".concat($options.size, " ").concat($options.size)
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("path", {
    id: $options.svgId,
    d: $data.svgItem[$props.name].path
  }, null, 8, SvgIconvue_type_template_id_e01c0bf4_hoisted_2), $data.svgItem[$props.name].path2 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("path", {
    key: 0,
    id: $options.svgId,
    d: $data.svgItem[$props.name].path2
  }, null, 8, SvgIconvue_type_template_id_e01c0bf4_hoisted_3)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 8, SvgIconvue_type_template_id_e01c0bf4_hoisted_1);
}
// CONCATENATED MODULE: ./src/components/SvgIcon/SvgIcon.vue?vue&type=template&id=e01c0bf4

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/SvgIcon/SvgIcon.vue?vue&type=script&lang=js


/* harmony default export */ var SvgIconvue_type_script_lang_js = ({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      "default": null
    },
    param: {
      type: String,
      "default": null
    }
  },
  data: function data() {
    return {
      svgItem: {
        search: {
          path: 'M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z'
        },
        add: {
          path: 'M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z'
        },
        toggle: {
          path: 'M5,13L9,17L7.6,18.42L1.18,12L7.6,5.58L9,7L5,11H21V13H5M21,6V8H11V6H21M21,16V18H11V16H21Z'
        },
        menu: {
          path: 'M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z'
        },
        close: {
          path: 'M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z'
        },
        file: {
          path: 'M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z'
        },
        paperclip: {
          path: 'M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z'
        },
        'close-outline': {
          path: 'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z'
        },
        send: {
          path: 'M2,21L23,12L2,3V10L17,12L2,14V21Z'
        },
        emoji: {
          path: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z'
        },
        document: {
          path: 'M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z'
        },
        pencil: {
          path: 'M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z'
        },
        checkmark: {
          path: 'M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z'
        },
        'double-checkmark': {
          path: 'M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z'
        },
        eye: {
          path: 'M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z'
        },
        dropdown: {
          path: 'M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z'
        },
        deleted: {
          path: 'M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,13.85 4.63,15.55 5.68,16.91L16.91,5.68C15.55,4.63 13.85,4 12,4M12,20A8,8 0 0,0 20,12C20,10.15 19.37,8.45 18.32,7.09L7.09,18.32C8.45,19.37 10.15,20 12,20Z'
        },
        microphone: {
          size: 'large',
          path: 'M432.8,216.4v39.2c0,45.2-15.3,84.3-45.2,118.4c-29.8,33.2-67.3,52.8-111.6,57.9v40.9h78.4c5.1,0,10.2,1.7,13.6,6c4.3,4.3,6,8.5,6,13.6c0,5.1-1.7,10.2-6,13.6c-4.3,4.3-8.5,6-13.6,6H157.6c-5.1,0-10.2-1.7-13.6-6c-4.3-4.3-6-8.5-6-13.6c0-5.1,1.7-10.2,6-13.6c4.3-4.3,8.5-6,13.6-6H236v-40.9c-44.3-5.1-81.8-23.9-111.6-57.9s-45.2-73.3-45.2-118.4v-39.2c0-5.1,1.7-10.2,6-13.6c4.3-4.3,8.5-6,13.6-6s10.2,1.7,13.6,6c4.3,4.3,6,8.5,6,13.6v39.2c0,37.5,13.6,70.7,40,97.1s59.6,40,97.1,40s70.7-13.6,97.1-40c26.4-26.4,40-59.6,40-97.1v-39.2c0-5.1,1.7-10.2,6-13.6c4.3-4.3,8.5-6,13.6-6c5.1,0,10.2,1.7,13.6,6C430.2,206.2,432.8,211.3,432.8,216.4z M353.5,98v157.6c0,27.3-9.4,50.3-29,69c-19.6,19.6-42.6,29-69,29s-50.3-9.4-69-29c-19.6-19.6-29-42.6-29-69V98c0-27.3,9.4-50.3,29-69c19.6-19.6,42.6-29,69-29s50.3,9.4,69,29C344.2,47.7,353.5,71.6,353.5,98z'
        },
        'audio-play': {
          size: 'medium',
          path: 'M43.331,21.237L7.233,0.397c-0.917-0.529-2.044-0.529-2.96,0c-0.916,0.528-1.48,1.505-1.48,2.563v41.684   c0,1.058,0.564,2.035,1.48,2.563c0.458,0.268,0.969,0.397,1.48,0.397c0.511,0,1.022-0.133,1.48-0.397l36.098-20.84   c0.918-0.529,1.479-1.506,1.479-2.564S44.247,21.767,43.331,21.237z'
        },
        'audio-pause': {
          size: 'medium',
          path: 'M17.991,40.976c0,3.662-2.969,6.631-6.631,6.631l0,0c-3.662,0-6.631-2.969-6.631-6.631V6.631C4.729,2.969,7.698,0,11.36,0l0,0c3.662,0,6.631,2.969,6.631,6.631V40.976z',
          path2: 'M42.877,40.976c0,3.662-2.969,6.631-6.631,6.631l0,0c-3.662,0-6.631-2.969-6.631-6.631V6.631C29.616,2.969,32.585,0,36.246,0l0,0c3.662,0,6.631,2.969,6.631,6.631V40.976z'
        }
      }
    };
  },
  computed: {
    svgId: function svgId() {
      var param = this.param ? '-' + this.param : '';
      return "vac-icon-".concat(this.name).concat(param);
    },
    size: function size() {
      var item = this.svgItem[this.name];
      if (item.size === 'large') return 512;else if (item.size === 'medium') return 48;else return 24;
    }
  }
});
// CONCATENATED MODULE: ./src/components/SvgIcon/SvgIcon.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/components/SvgIcon/SvgIcon.vue





const SvgIcon_exports_ = /*#__PURE__*/exportHelper_default()(SvgIconvue_type_script_lang_js, [['render',SvgIconvue_type_template_id_e01c0bf4_render]])

/* harmony default export */ var SvgIcon = (SvgIcon_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/RoomsList/RoomsSearch/RoomsSearch.vue?vue&type=script&lang=js

/* harmony default export */ var RoomsSearchvue_type_script_lang_js = ({
  name: 'RoomsSearch',
  components: {
    SvgIcon: SvgIcon
  },
  props: {
    textMessages: {
      type: Object,
      required: true
    },
    showSearch: {
      type: Boolean,
      required: true
    },
    showAddRoom: {
      type: Boolean,
      required: true
    },
    rooms: {
      type: Array,
      required: true
    },
    loadingRooms: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    showSearchBar: function showSearchBar() {
      return this.showSearch || this.showAddRoom;
    }
  }
});
// CONCATENATED MODULE: ./src/lib/RoomsList/RoomsSearch/RoomsSearch.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/lib/RoomsList/RoomsSearch/RoomsSearch.vue





const RoomsSearch_exports_ = /*#__PURE__*/exportHelper_default()(RoomsSearchvue_type_script_lang_js, [['render',RoomsSearchvue_type_template_id_5ac1fb0f_render]])

/* harmony default export */ var RoomsSearch = (RoomsSearch_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/RoomsList/RoomContent/RoomContent.vue?vue&type=template&id=24ecd0b8


var RoomContentvue_type_template_id_24ecd0b8_hoisted_1 = {
  "class": "vac-room-container"
};
var RoomContentvue_type_template_id_24ecd0b8_hoisted_2 = {
  "class": "vac-name-container vac-text-ellipsis"
};
var RoomContentvue_type_template_id_24ecd0b8_hoisted_3 = {
  "class": "vac-title-container"
};
var RoomContentvue_type_template_id_24ecd0b8_hoisted_4 = {
  "class": "vac-room-name vac-text-ellipsis"
};
var RoomContentvue_type_template_id_24ecd0b8_hoisted_5 = {
  key: 1,
  "class": "vac-text-date"
};
var _hoisted_6 = {
  key: 0
};
var _hoisted_7 = {
  key: 1,
  "class": "vac-text-ellipsis"
};
var _hoisted_8 = {
  key: 3,
  "class": "vac-text-ellipsis"
};
var _hoisted_9 = {
  "class": "vac-room-options-container"
};
var _hoisted_10 = {
  key: 0,
  "class": "vac-badge-counter vac-room-badge"
};
var _hoisted_11 = {
  key: 0,
  "class": "vac-menu-options"
};
var _hoisted_12 = {
  "class": "vac-menu-list"
};
var _hoisted_13 = ["onClick"];
function RoomContentvue_type_template_id_24ecd0b8_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_svg_icon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("svg-icon");

  var _component_format_message = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("format-message");

  var _directive_click_outside = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("click-outside");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", RoomContentvue_type_template_id_24ecd0b8_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "room-list-item", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeProps"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["guardReactiveProps"])({
    room: $props.room
  })), function () {
    return [$props.room.avatar ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
      key: 0,
      "class": "vac-avatar",
      style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
        'background-image': "url('".concat($props.room.avatar, "')")
      })
    }, null, 4)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", RoomContentvue_type_template_id_24ecd0b8_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", RoomContentvue_type_template_id_24ecd0b8_hoisted_3, [$options.userStatus ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
      key: 0,
      "class": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["vac-state-circle", {
        'vac-state-online': $options.userStatus === 'online'
      }])
    }, null, 2)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", RoomContentvue_type_template_id_24ecd0b8_hoisted_4, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($props.room.roomName), 1), $props.room.lastMessage ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", RoomContentvue_type_template_id_24ecd0b8_hoisted_5, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($props.room.lastMessage.timestamp), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
      "class": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["vac-text-last", {
        'vac-message-new': $props.room.lastMessage && $props.room.lastMessage["new"] && !$options.typingUsers
      }])
    }, [$options.isMessageCheckmarkVisible ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", _hoisted_6, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "checkmark-icon", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeProps"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["guardReactiveProps"])($props.room.lastMessage)), function () {
      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_svg_icon, {
        name: $props.room.lastMessage.distributed ? 'double-checkmark' : 'checkmark',
        param: $props.room.lastMessage.seen ? 'seen' : '',
        "class": "vac-icon-check"
      }, null, 8, ["name", "param"])];
    })])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), $props.room.lastMessage && !$props.room.lastMessage.deleted && $options.isAudio ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_7, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "microphone-icon", {}, function () {
      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_svg_icon, {
        name: "microphone",
        "class": "vac-icon-microphone"
      })];
    }), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($options.formattedDuration), 1)])) : $props.room.lastMessage ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_format_message, {
      key: 2,
      content: $options.getLastMessage,
      deleted: !!$props.room.lastMessage.deleted && !$options.typingUsers,
      users: $props.room.users,
      linkify: false,
      "text-formatting": $props.textFormatting && !$props.room.lastMessage.file,
      "link-options": $props.linkOptions,
      "single-line": true
    }, {
      "deleted-icon": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function (data) {
        return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "deleted-icon", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeProps"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["guardReactiveProps"])(data)))];
      }),
      _: 3
    }, 8, ["content", "deleted", "users", "text-formatting", "link-options"])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), !$props.room.lastMessage && $options.typingUsers ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_8, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($options.typingUsers), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_9, [$props.room.unreadCount ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_10, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($props.room.unreadCount), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "room-list-options", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeProps"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["guardReactiveProps"])({
      room: $props.room
    })), function () {
      return [$props.roomActions.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
        key: 0,
        "class": "vac-svg-button vac-list-room-options",
        onClick: _cache[0] || (_cache[0] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(function ($event) {
          return $data.roomMenuOpened = $props.room.roomId;
        }, ["stop"]))
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "room-list-options-icon", {}, function () {
        return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_svg_icon, {
          name: "dropdown",
          param: "room"
        })];
      })])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), $props.roomActions.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Transition"], {
        key: 1,
        name: "vac-slide-left"
      }, {
        "default": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
          return [$data.roomMenuOpened === $props.room.roomId ? Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_11, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_12, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])($props.roomActions, function (action) {
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
              key: action.name
            }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
              "class": "vac-menu-item",
              onClick: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(function ($event) {
                return $options.roomActionHandler(action);
              }, ["stop"])
            }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(action.title), 9, _hoisted_13)]);
          }), 128))])])), [[_directive_click_outside, $options.closeRoomMenu]]) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)];
        }),
        _: 1
      })) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)];
    })])], 2)])];
  })]);
}
// CONCATENATED MODULE: ./src/lib/RoomsList/RoomContent/RoomContent.vue?vue&type=template&id=24ecd0b8

// EXTERNAL MODULE: ./node_modules/click-outside-vue3/dist/v-click-outside.umd.js
var v_click_outside_umd = __webpack_require__("8264");
var v_click_outside_umd_default = /*#__PURE__*/__webpack_require__.n(v_click_outside_umd);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.bold.js
var es_string_bold = __webpack_require__("cc71");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.italics.js
var es_string_italics = __webpack_require__("c5d0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.strike.js
var es_string_strike = __webpack_require__("2315");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/FormatMessage/FormatMessage.vue?vue&type=template&id=8c35a6fe




var FormatMessagevue_type_template_id_8c35a6fe_hoisted_1 = {
  "class": "vac-image-link-container"
};
var FormatMessagevue_type_template_id_8c35a6fe_hoisted_2 = {
  "class": "vac-image-link-message"
};
var FormatMessagevue_type_template_id_8c35a6fe_hoisted_3 = {
  key: 1
};
var FormatMessagevue_type_template_id_8c35a6fe_hoisted_4 = {
  key: 1
};
function FormatMessagevue_type_template_id_8c35a6fe_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_svg_icon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("svg-icon");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    "class": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["vac-format-message-wrapper", {
      'vac-text-ellipsis': $props.singleLine
    }])
  }, [$props.textFormatting ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 0,
    "class": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])({
      'vac-text-ellipsis': $props.singleLine
    })
  }, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])($options.linkifiedMessage, function (message, i) {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
      key: i
    }, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDynamicComponent"])(message.url ? 'a' : 'span'), {
      "class": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])({
        'vac-text-ellipsis': $props.singleLine,
        'vac-text-bold': message.bold,
        'vac-text-italic': $props.deleted || message.italic,
        'vac-text-strike': message.strike,
        'vac-text-underline': message.underline,
        'vac-text-inline-code': !$props.singleLine && message.inline,
        'vac-text-multiline-code': !$props.singleLine && message.multiline,
        'vac-text-tag': !$props.singleLine && !$props.reply && message.tag
      }),
      href: message.href,
      target: message.href ? $props.linkOptions.target : null,
      onClick: function onClick($event) {
        return $options.openTag(message);
      }
    }, {
      "default": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
        return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "deleted-icon", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeProps"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["guardReactiveProps"])({
          deleted: $props.deleted
        })), function () {
          return [$props.deleted ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_svg_icon, {
            key: 0,
            name: "deleted",
            "class": "vac-icon-deleted"
          })) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)];
        }), message.url && message.image ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
          key: 0
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", FormatMessagevue_type_template_id_8c35a6fe_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
          "class": "vac-image-link",
          style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
            'background-image': "url('".concat(message.value, "')"),
            height: message.height
          })
        }, null, 4)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", FormatMessagevue_type_template_id_8c35a6fe_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(message.value), 1)])], 64)) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", FormatMessagevue_type_template_id_8c35a6fe_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(message.value), 1))];
      }),
      _: 2
    }, 1032, ["class", "href", "target", "onClick"]))]);
  }), 128))], 2)) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", FormatMessagevue_type_template_id_8c35a6fe_hoisted_4, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($options.formattedContent), 1))], 2);
}
// CONCATENATED MODULE: ./src/components/FormatMessage/FormatMessage.vue?vue&type=template&id=8c35a6fe

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.last-index-of.js
var es_array_last_index_of = __webpack_require__("baa5");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.some.js
var es_array_some = __webpack_require__("45fc");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("2532");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.is-array.js
var es_array_is_array = __webpack_require__("277d");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js


function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__("e01a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.iterator.js
var es_symbol_iterator = __webpack_require__("d28b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__("e260");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.from.js
var es_array_from = __webpack_require__("a630");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js








function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.test.js
var es_regexp_test = __webpack_require__("00b4");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js








function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.error.cause.js
var es_error_cause = __webpack_require__("d9e2");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.error.to-string.js
var es_error_to_string = __webpack_require__("d401");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js


function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.substr.js
var es_string_substr = __webpack_require__("e323");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.match.js
var es_string_match = __webpack_require__("466d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.constructor.js
var es_regexp_constructor = __webpack_require__("4d63");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.dot-all.js
var es_regexp_dot_all = __webpack_require__("c607");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.sticky.js
var es_regexp_sticky = __webpack_require__("2c3e");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__("25f0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.set.js
var es_set = __webpack_require__("6062");

// CONCATENATED MODULE: ./src/utils/format-string.js



var _pseudoMarkdown;























var linkify = __webpack_require__("74fe"); // require('linkifyjs/plugins/hashtag')(linkify)


/* harmony default export */ var format_string = (function (text, doLinkify) {
  var json = compileToJSON(text);
  var html = compileToHTML(json);
  var result = [].concat.apply([], html);
  if (doLinkify) return linkifyResult(result);
  return result;
});
var typeMarkdown = {
  bold: '*',
  italic: '_',
  strike: '~',
  underline: '°',
  noformat: '|',
  label_s: '[',
  label_e: ']'
};
var pseudoMarkdown = (_pseudoMarkdown = {}, _defineProperty(_pseudoMarkdown, typeMarkdown.bold, {
  end: '\\' + typeMarkdown.bold,
  allowed_chars: '.',
  type: 'bold'
}), _defineProperty(_pseudoMarkdown, typeMarkdown.italic, {
  end: typeMarkdown.italic,
  allowed_chars: '.',
  type: 'italic'
}), _defineProperty(_pseudoMarkdown, typeMarkdown.strike, {
  end: typeMarkdown.strike,
  allowed_chars: '.',
  type: 'strike'
}), _defineProperty(_pseudoMarkdown, typeMarkdown.underline, {
  end: typeMarkdown.underline,
  allowed_chars: '.',
  type: 'underline'
}), _defineProperty(_pseudoMarkdown, typeMarkdown.noformat, {
  end: '\\' + typeMarkdown.noformat,
  allowed_chars: '.',
  type: 'noformat'
}), _defineProperty(_pseudoMarkdown, typeMarkdown.label_s, {
  end: '\\' + [typeMarkdown.label_e],
  allowed_chars: '.',
  type: 'label'
}), _pseudoMarkdown);

function compileToJSON(str) {
  var result = [];
  var minIndexOf = -1;
  var minIndexOfKey = null;
  var links = linkify.find(str);
  var minIndexFromLink = false;

  if (links.length) {
    minIndexOf = str.indexOf(links[0].value);
    minIndexFromLink = true;
  }

  Object.keys(pseudoMarkdown).forEach(function (startingValue) {
    var io = str.indexOf(startingValue);

    if (io >= 0 && (minIndexOf < 0 || io < minIndexOf)) {
      minIndexOf = io;
      minIndexOfKey = startingValue;
      minIndexFromLink = false;
    }
  });

  if (minIndexFromLink) {
    var strLeft = str.substr(0, minIndexOf);
    var strLink = str.substr(minIndexOf, links[0].value.length);
    var strRight = str.substr(minIndexOf + links[0].value.length);
    if (strLeft.length) result.push(strLeft);
    result.push(strLink);
    result = result.concat(compileToJSON(strRight));
    return result;
  }

  if (minIndexOfKey) {
    var _strLeft = str.substr(0, minIndexOf);

    var _char = minIndexOfKey;

    var _strRight = str.substr(minIndexOf + _char.length);

    if (str.replace(/\s/g, '').length === _char.length * 2) {
      return [str];
    }

    var match = _strRight.match(new RegExp('^(' + (pseudoMarkdown[_char].allowed_chars || '.') + '*' + (pseudoMarkdown[_char].end ? '?' : '') + ')' + (pseudoMarkdown[_char].end ? '(' + pseudoMarkdown[_char].end + ')' : ''), 'm'));

    if (!match || !match[1]) {
      _strLeft = _strLeft + _char;
      result.push(_strLeft);
    } else {
      if (_strLeft.length) {
        result.push(_strLeft);
      }

      var type = pseudoMarkdown[_char].type;
      var content;

      if (type === 'noformat') {
        content = [match[1]];
      } else if (type === 'label') {
        content = ['[' + match[1] + ']'];
      } else {
        content = compileToJSON(match[1]);
      }

      var object = {
        start: _char,
        content: content,
        end: match[2],
        type: type
      };
      result.push(object);
      _strRight = _strRight.substr(match[0].length);
    }

    result = result.concat(compileToJSON(_strRight));
    return result;
  } else {
    if (str.length) {
      return [str];
    } else {
      return [];
    }
  }
}

function compileToHTML(json) {
  var result = [];
  json.forEach(function (item) {
    if (typeof item === 'string') {
      result.push({
        types: [],
        value: item
      });
    } else {
      if (pseudoMarkdown[item.start]) {
        result.push(parseContent(item));
      }
    }
  });
  return result;
}

function parseContent(item) {
  var result = [];
  iterateContent(item, result, []);
  return result;
}

function iterateContent(item, result, types) {
  item.content.forEach(function (it) {
    if (typeof it === 'string') {
      result.push({
        types: removeDuplicates(types.concat([item.type])),
        value: it
      });
    } else {
      iterateContent(it, result, removeDuplicates([it.type].concat([item.type]).concat(types)));
    }
  });
}

function removeDuplicates(items) {
  return _toConsumableArray(new Set(items));
}

function linkifyResult(array) {
  var result = [];
  array.forEach(function (arr) {
    var links = linkify.find(arr.value);

    if (links.length) {
      var spaces = arr.value.replace(links[0].value, '');
      if (spaces.length) result.push({
        types: arr.types,
        value: spaces
      });
      arr.types = ['url'].concat(arr.types);
      arr.href = links[0].href;
      arr.value = links[0].value;

      if (result.length) {
        var prev = result[result.length - 1];

        if (prev.types.includes('label')) {
          arr.value = prev.value.substr(1, prev.value.length - 2);
          result.pop();
        }
      }
    }

    result.push(arr);
  });
  return result;
}
// EXTERNAL MODULE: ./src/utils/constants.js
var constants = __webpack_require__("c9d9");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/FormatMessage/FormatMessage.vue?vue&type=script&lang=js
















/* harmony default export */ var FormatMessagevue_type_script_lang_js = ({
  name: 'FormatMessage',
  components: {
    SvgIcon: SvgIcon
  },
  props: {
    content: {
      type: [String, Number],
      required: true
    },
    deleted: {
      type: Boolean,
      "default": false
    },
    users: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    linkify: {
      type: Boolean,
      "default": true
    },
    singleLine: {
      type: Boolean,
      "default": false
    },
    reply: {
      type: Boolean,
      "default": false
    },
    textFormatting: {
      type: Boolean,
      required: true
    },
    linkOptions: {
      type: Object,
      required: true
    }
  },
  computed: {
    linkifiedMessage: function linkifiedMessage() {
      var _this = this;

      var message = format_string(this.formatTags(this.content), this.linkify && !this.linkOptions.disabled, this.linkOptions);
      message.forEach(function (m) {
        m.url = _this.checkType(m, 'url');
        m.bold = _this.checkType(m, 'bold');
        m.italic = _this.checkType(m, 'italic');
        m.strike = _this.checkType(m, 'strike');
        m.underline = _this.checkType(m, 'underline');
        m.inline = _this.checkType(m, 'inline-code');
        m.multiline = _this.checkType(m, 'multiline-code');
        m.tag = _this.checkType(m, 'tag');
        m.image = _this.checkImageType(m);
      });
      return message;
    },
    formattedContent: function formattedContent() {
      return this.formatTags(this.content);
    }
  },
  methods: {
    checkType: function checkType(message, type) {
      return message.types.indexOf(type) !== -1;
    },
    checkImageType: function checkImageType(message) {
      var index = message.value.lastIndexOf('.');
      var slashIndex = message.value.lastIndexOf('/');
      if (slashIndex > index) index = -1;
      var type = message.value.substring(index + 1, message.value.length);
      var isMedia = index > 0 && constants["d" /* IMAGE_TYPES */].some(function (t) {
        return type.toLowerCase().includes(t);
      });
      if (isMedia) this.setImageSize(message);
      return isMedia;
    },
    setImageSize: function setImageSize(message) {
      var image = new Image();
      image.src = message.value;
      image.addEventListener('load', onLoad);

      function onLoad(img) {
        var ratio = img.path[0].width / 150;
        message.height = Math.round(img.path[0].height / ratio) + 'px';
        image.removeEventListener('load', onLoad);
      }
    },
    formatTags: function formatTags(content) {
      // this.users.forEach(user => {
      // 	const index = content.indexOf(user._id)
      // 	const isTag = content.substring(index - 9, index) === '<usertag>'
      // 	if (isTag) content = content.replace(user._id, `@${user.username}`)
      // })
      return content;
    },
    openTag: function openTag(message) {
      if (!this.singleLine && this.checkType(message, 'tag')) {
        var user = this.users.find(function (u) {
          return message.value.indexOf(u.username) !== -1;
        });
        this.$emit('open-user-tag', user);
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/FormatMessage/FormatMessage.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/components/FormatMessage/FormatMessage.vue





const FormatMessage_exports_ = /*#__PURE__*/exportHelper_default()(FormatMessagevue_type_script_lang_js, [['render',FormatMessagevue_type_template_id_8c35a6fe_render]])

/* harmony default export */ var FormatMessage = (FormatMessage_exports_);
// CONCATENATED MODULE: ./src/utils/typing-text.js





/* harmony default export */ var typing_text = (function (room, currentUserId, textMessages) {
  if (room.typingUsers && room.typingUsers.length) {
    var typingUsers = room.users.filter(function (user) {
      if (user._id === currentUserId) return;
      if (room.typingUsers.indexOf(user._id) === -1) return;
      if (user.status && user.status.state === 'offline') return;
      return true;
    });
    if (!typingUsers.length) return;

    if (room.users.length === 2) {
      return textMessages.IS_TYPING;
    } else {
      return typingUsers.map(function (user) {
        return user.username;
      }).join(', ') + ' ' + textMessages.IS_TYPING;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/RoomsList/RoomContent/RoomContent.vue?vue&type=script&lang=js










var _require = __webpack_require__("bd43"),
    isAudioFile = _require.isAudioFile;

/* harmony default export */ var RoomContentvue_type_script_lang_js = ({
  name: 'RoomsContent',
  directives: {
    clickOutside: v_click_outside_umd_default.a.directive
  },
  components: {
    SvgIcon: SvgIcon,
    FormatMessage: FormatMessage
  },
  props: {
    currentUserId: {
      type: [String, Number],
      required: true
    },
    room: {
      type: Object,
      required: true
    },
    textFormatting: {
      type: Boolean,
      required: true
    },
    linkOptions: {
      type: Object,
      required: true
    },
    textMessages: {
      type: Object,
      required: true
    },
    roomActions: {
      type: Array,
      required: true
    }
  },
  data: function data() {
    return {
      roomMenuOpened: null
    };
  },
  computed: {
    getLastMessage: function getLastMessage() {
      var _this = this;

      var isTyping = this.typingUsers;
      if (isTyping) return isTyping;
      var content = this.room.lastMessage.deleted ? this.textMessages.MESSAGE_DELETED : this.room.lastMessage.content;

      if (this.room.users.length <= 2) {
        return content;
      }

      var user = this.room.users.find(function (user) {
        return user._id === _this.room.lastMessage.senderId;
      });

      if (this.room.lastMessage.username) {
        return "".concat(this.room.lastMessage.username, " - ").concat(content);
      } else if (!user || user._id === this.currentUserId) {
        return content;
      }

      return "".concat(user.username, " - ").concat(content);
    },
    userStatus: function userStatus() {
      var _this2 = this;

      if (!this.room.users || this.room.users.length !== 2) return;
      var user = this.room.users.find(function (u) {
        return u._id !== _this2.currentUserId;
      });
      if (user && user.status) return user.status.state;
      return null;
    },
    typingUsers: function typingUsers() {
      return typing_text(this.room, this.currentUserId, this.textMessages);
    },
    isMessageCheckmarkVisible: function isMessageCheckmarkVisible() {
      return !this.typingUsers && this.room.lastMessage && !this.room.lastMessage.deleted && this.room.lastMessage.senderId === this.currentUserId && (this.room.lastMessage.saved || this.room.lastMessage.distributed || this.room.lastMessage.seen);
    },
    formattedDuration: function formattedDuration() {
      var file = this.room.lastMessage.file;

      if (!file.duration) {
        return "".concat(file.name, ".").concat(file.extension);
      }

      var s = Math.floor(file.duration);
      return (s - (s %= 60)) / 60 + (s > 9 ? ':' : ':0') + s;
    },
    isAudio: function isAudio() {
      return isAudioFile(this.room.lastMessage.file);
    }
  },
  methods: {
    roomActionHandler: function roomActionHandler(action) {
      this.closeRoomMenu();
      this.$emit('room-action-handler', {
        action: action,
        roomId: this.room.roomId
      });
    },
    closeRoomMenu: function closeRoomMenu() {
      this.roomMenuOpened = null;
    }
  }
});
// CONCATENATED MODULE: ./src/lib/RoomsList/RoomContent/RoomContent.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/lib/RoomsList/RoomContent/RoomContent.vue





const RoomContent_exports_ = /*#__PURE__*/exportHelper_default()(RoomContentvue_type_script_lang_js, [['render',RoomContentvue_type_template_id_24ecd0b8_render]])

/* harmony default export */ var RoomContent = (RoomContent_exports_);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.starts-with.js
var es_string_starts_with = __webpack_require__("2ca0");

// CONCATENATED MODULE: ./src/utils/filter-items.js







/* harmony default export */ var filter_items = (function (items, prop, val) {
  var startsWith = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (!val || val === '') return items;
  return items.filter(function (v) {
    if (startsWith) return formatString(v[prop]).startsWith(formatString(val));
    return formatString(v[prop]).includes(formatString(val));
  });
});

function formatString(string) {
  return string.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/RoomsList/RoomsList.vue?vue&type=script&lang=js






/* harmony default export */ var RoomsListvue_type_script_lang_js = ({
  name: 'RoomsList',
  components: {
    InfiniteLoading: components_InfiniteLoading,
    Loader: Loader,
    RoomsSearch: RoomsSearch,
    RoomContent: RoomContent
  },
  props: {
    currentUserId: {
      type: [String, Number],
      required: true
    },
    textMessages: {
      type: Object,
      required: true
    },
    showRoomsList: {
      type: Boolean,
      required: true
    },
    showSearch: {
      type: Boolean,
      required: true
    },
    showAddRoom: {
      type: Boolean,
      required: true
    },
    textFormatting: {
      type: Boolean,
      required: true
    },
    linkOptions: {
      type: Object,
      required: true
    },
    isMobile: {
      type: Boolean,
      required: true
    },
    rooms: {
      type: Array,
      required: true
    },
    loadingRooms: {
      type: Boolean,
      required: true
    },
    roomsLoaded: {
      type: Boolean,
      required: true
    },
    room: {
      type: Object,
      required: true
    },
    roomActions: {
      type: Array,
      required: true
    }
  },
  data: function data() {
    return {
      filteredRooms: this.rooms || [],
      infiniteState: null,
      loadingMoreRooms: false,
      selectedRoomId: ''
    };
  },
  watch: {
    rooms: function rooms(newVal, oldVal) {
      this.filteredRooms = newVal;

      if (this.infiniteState && (newVal.length !== oldVal.length || this.roomsLoaded)) {
        this.infiniteState.loaded();
        this.loadingMoreRooms = false;
      }
    },
    loadingRooms: function loadingRooms(val) {
      if (val) this.infiniteState = null;
    },
    loadingMoreRooms: function loadingMoreRooms(val) {
      this.$emit('loading-more-rooms', val);
    },
    roomsLoaded: function roomsLoaded(val) {
      if (val && this.infiniteState) {
        this.loadingMoreRooms = false;
        this.infiniteState.complete();
      }
    },
    room: {
      immediate: true,
      handler: function handler(val) {
        if (val && !this.isMobile) this.selectedRoomId = val.roomId;
      }
    }
  },
  methods: {
    searchRoom: function searchRoom(ev) {
      this.filteredRooms = filter_items(this.rooms, 'roomName', ev.target.value);
    },
    openRoom: function openRoom(room) {
      if (room.roomId === this.room.roomId && !this.isMobile) return;
      if (!this.isMobile) this.selectedRoomId = room.roomId;
      this.$emit('fetch-room', {
        room: room
      });
    },
    loadMoreRooms: function loadMoreRooms(infiniteState) {
      if (this.loadingMoreRooms) return;

      if (this.roomsLoaded) {
        this.loadingMoreRooms = false;
        return infiniteState.complete();
      }

      this.infiniteState = infiniteState;
      this.$emit('fetch-more-rooms');
      this.loadingMoreRooms = true;
    }
  }
});
// CONCATENATED MODULE: ./src/lib/RoomsList/RoomsList.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/lib/RoomsList/RoomsList.vue





const RoomsList_exports_ = /*#__PURE__*/exportHelper_default()(RoomsListvue_type_script_lang_js, [['render',RoomsListvue_type_template_id_b4f89796_render]])

/* harmony default export */ var RoomsList = (RoomsList_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/Room/Room.vue?vue&type=template&id=41b8b406



var Roomvue_type_template_id_41b8b406_hoisted_1 = {
  "class": "vac-col-messages"
};
var Roomvue_type_template_id_41b8b406_hoisted_2 = {
  "class": "vac-container-center vac-room-empty"
};
var Roomvue_type_template_id_41b8b406_hoisted_3 = {
  "class": "vac-messages-container"
};
var Roomvue_type_template_id_41b8b406_hoisted_4 = {
  key: 0,
  "class": "vac-text-started"
};
var Roomvue_type_template_id_41b8b406_hoisted_5 = {
  key: 1,
  "class": "vac-text-started"
};

var Roomvue_type_template_id_41b8b406_hoisted_6 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, null, -1);

var Roomvue_type_template_id_41b8b406_hoisted_7 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, null, -1);

var Roomvue_type_template_id_41b8b406_hoisted_8 = {
  key: 2
};
var Roomvue_type_template_id_41b8b406_hoisted_9 = {
  key: 0,
  "class": "vac-badge-counter vac-messages-count"
};
var Roomvue_type_template_id_41b8b406_hoisted_10 = {
  ref: "roomFooter",
  "class": "vac-room-footer"
};
var Roomvue_type_template_id_41b8b406_hoisted_11 = {
  key: 0,
  "class": "vac-icon-textarea-left"
};

var Roomvue_type_template_id_41b8b406_hoisted_12 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
  "class": "vac-dot-audio-record"
}, null, -1);

var Roomvue_type_template_id_41b8b406_hoisted_13 = {
  "class": "vac-dot-audio-record-time"
};
var _hoisted_14 = {
  "class": "vac-media-container"
};
var _hoisted_15 = {
  "class": "vac-media-file"
};
var _hoisted_16 = ["src"];
var _hoisted_17 = {
  "class": "vac-media-container"
};
var _hoisted_18 = {
  ref: "mediaFile",
  "class": "vac-media-file"
};
var _hoisted_19 = {
  width: "100%",
  height: "100%",
  controls: ""
};
var _hoisted_20 = ["src"];
var _hoisted_21 = {
  "class": "vac-icon-file"
};
var _hoisted_22 = {
  "class": "vac-file-message"
};
var _hoisted_23 = ["placeholder"];
var _hoisted_24 = {
  "class": "vac-icon-textarea"
};
var _hoisted_25 = ["accept"];
function Roomvue_type_template_id_41b8b406_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_room_header = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("room-header");

  var _component_loader = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("loader");

  var _component_infinite_loading = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("infinite-loading");

  var _component_message = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("message");

  var _component_svg_icon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("svg-icon");

  var _component_room_message_reply = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("room-message-reply");

  var _component_room_emojis = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("room-emojis");

  var _component_room_users_tag = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("room-users-tag");

  var _component_emoji_picker = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("emoji-picker");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", Roomvue_type_template_id_41b8b406_hoisted_1, [$options.showNoRoom ? Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "no-room-selected", {
    key: 0
  }, function () {
    return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", Roomvue_type_template_id_41b8b406_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($props.textMessages.ROOM_EMPTY), 1)])];
  }) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_room_header, {
    key: 1,
    "current-user-id": $props.currentUserId,
    "text-messages": $props.textMessages,
    "single-room": $props.singleRoom,
    "show-rooms-list": $props.showRoomsList,
    "is-mobile": $props.isMobile,
    "room-info": $props.roomInfo,
    "menu-actions": $props.menuActions,
    room: $options.room,
    onToggleRoomsList: _cache[0] || (_cache[0] = function ($event) {
      return _ctx.$emit('toggle-rooms-list');
    }),
    onRoomInfo: _cache[1] || (_cache[1] = function ($event) {
      return _ctx.$emit('room-info');
    }),
    onMenuActionHandler: _cache[2] || (_cache[2] = function ($event) {
      return _ctx.$emit('menu-action-handler', $event);
    })
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createSlots"])({
    _: 2
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.$slots, function (i, name) {
    return {
      name: name,
      fn: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function (data) {
        return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, name, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeProps"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["guardReactiveProps"])(data)))];
      })
    };
  })]), 1032, ["current-user-id", "text-messages", "single-room", "show-rooms-list", "is-mobile", "room-info", "menu-actions", "room"])), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    ref: "scrollContainer",
    "class": "vac-container-scroll",
    onScroll: _cache[4] || (_cache[4] = function () {
      return $options.onContainerScroll && $options.onContainerScroll.apply($options, arguments);
    })
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_loader, {
    show: $data.loadingMessages
  }, null, 8, ["show"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", Roomvue_type_template_id_41b8b406_hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    "class": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])({
      'vac-messages-hidden': $data.loadingMessages
    })
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Transition"], {
    name: "vac-fade-message"
  }, {
    "default": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      return [$options.showNoMessages ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", Roomvue_type_template_id_41b8b406_hoisted_4, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "messages-empty", {}, function () {
        return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($props.textMessages.MESSAGES_EMPTY), 1)];
      })])) : $options.showMessagesStarted ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", Roomvue_type_template_id_41b8b406_hoisted_5, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($props.textMessages.CONVERSATION_STARTED) + " " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($props.messages[0].date), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)];
    }),
    _: 3
  }), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Transition"], {
    name: "vac-fade-message"
  }, {
    "default": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      return [$props.messages.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_infinite_loading, {
        key: 0,
        "class": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])({
          'vac-infinite-loading': !$props.messagesLoaded
        }),
        "force-use-infinite-wrapper": ".vac-container-scroll",
        "web-component-name": "vue-advanced-chat",
        direction: "top",
        distance: 40,
        onInfinite: $options.loadMoreMessages
      }, {
        spinner: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
          return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_loader, {
            show: true,
            infinite: true
          })];
        }),
        "no-results": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
          return [Roomvue_type_template_id_41b8b406_hoisted_6];
        }),
        "no-more": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
          return [Roomvue_type_template_id_41b8b406_hoisted_7];
        }),
        _: 1
      }, 8, ["class", "onInfinite"])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)];
    }),
    _: 1
  }), (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["TransitionGroup"], {
    key: $props.roomId,
    name: "vac-fade-message",
    tag: "span"
  }, {
    "default": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      return [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])($props.messages, function (m, i) {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
          key: m.indexId || m._id
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_message, {
          "current-user-id": $props.currentUserId,
          message: m,
          index: i,
          messages: $props.messages,
          "edited-message": $data.editedMessage,
          "message-actions": $props.messageActions,
          "room-users": $options.room.users,
          "text-messages": $props.textMessages,
          "room-footer-ref": _ctx.$refs.roomFooter,
          "new-messages": $data.newMessages,
          "show-reaction-emojis": $props.showReactionEmojis,
          "show-new-messages-divider": $props.showNewMessagesDivider,
          "text-formatting": $props.textFormatting,
          "link-options": $props.linkOptions,
          "emojis-list": $options.emojisList,
          "hide-options": $data.hideOptions,
          "force-username": $props.forceUsername,
          "room-readonly": $options.room.readonly,
          onMessageAdded: $options.onMessageAdded,
          onMessageActionHandler: $options.messageActionHandler,
          onOpenFile: $options.openFile,
          onOpenUserTag: $options.openUserTag,
          onSendMessageReaction: $options.sendMessageReaction,
          onHideOptions: _cache[3] || (_cache[3] = function ($event) {
            return $data.hideOptions = $event;
          })
        }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createSlots"])({
          _: 2
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.$slots, function (idx, name) {
          return {
            name: name,
            fn: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function (data) {
              return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, name, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeProps"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["guardReactiveProps"])(data)))];
            })
          };
        })]), 1032, ["current-user-id", "message", "index", "messages", "edited-message", "message-actions", "room-users", "text-messages", "room-footer-ref", "new-messages", "show-reaction-emojis", "show-new-messages-divider", "text-formatting", "link-options", "emojis-list", "hide-options", "force-username", "room-readonly", "onMessageAdded", "onMessageActionHandler", "onOpenFile", "onOpenUserTag", "onSendMessageReaction"])]);
      }), 128))];
    }),
    _: 3
  }))], 2)])], 544), !$data.loadingMessages ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", Roomvue_type_template_id_41b8b406_hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Transition"], {
    name: "vac-bounce"
  }, {
    "default": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      return [$data.scrollIcon ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
        key: 0,
        "class": "vac-icon-scroll",
        onClick: _cache[5] || (_cache[5] = function () {
          return $options.scrollToBottom && $options.scrollToBottom.apply($options, arguments);
        })
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Transition"], {
        name: "vac-bounce"
      }, {
        "default": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
          return [$data.scrollMessagesCount ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", Roomvue_type_template_id_41b8b406_hoisted_9, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($data.scrollMessagesCount), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)];
        }),
        _: 1
      }), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "scroll-icon", {}, function () {
        return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_svg_icon, {
          name: "dropdown",
          param: "scroll"
        })];
      })])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)];
    }),
    _: 3
  })])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", Roomvue_type_template_id_41b8b406_hoisted_10, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_room_message_reply, {
    room: $options.room,
    "message-reply": $data.messageReply,
    "text-formatting": $props.textFormatting,
    "link-options": $props.linkOptions,
    onResetMessage: $options.resetMessage
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createSlots"])({
    _: 2
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.$slots, function (i, name) {
    return {
      name: name,
      fn: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function (data) {
        return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, name, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeProps"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["guardReactiveProps"])(data)))];
      })
    };
  })]), 1032, ["room", "message-reply", "text-formatting", "link-options", "onResetMessage"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_room_emojis, {
    "filtered-emojis": $data.filteredEmojis,
    onSelectEmoji: _cache[6] || (_cache[6] = function ($event) {
      return $options.selectEmoji($event);
    })
  }, null, 8, ["filtered-emojis"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_room_users_tag, {
    "filtered-users-tag": $data.filteredUsersTag,
    onSelectUserTag: _cache[7] || (_cache[7] = function ($event) {
      return $options.selectUserTag($event);
    })
  }, null, 8, ["filtered-users-tag"]), !$options.room.readonly ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 0,
    "class": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["vac-box-footer", {
      'vac-app-box-shadow': $data.filteredEmojis.length || $data.filteredUsersTag.length
    }])
  }, [$props.showAudio && !$data.imageFile && !$data.videoFile ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", Roomvue_type_template_id_41b8b406_hoisted_11, [$data.isRecording ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], {
    key: 0
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    "class": "vac-svg-button vac-icon-audio-stop",
    onClick: _cache[8] || (_cache[8] = function () {
      return $options.stopRecorder && $options.stopRecorder.apply($options, arguments);
    })
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "audio-stop-icon", {}, function () {
    return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_svg_icon, {
      name: "close-outline"
    })];
  })]), Roomvue_type_template_id_41b8b406_hoisted_12, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", Roomvue_type_template_id_41b8b406_hoisted_13, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($options.recordedTime), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    "class": "vac-svg-button vac-icon-audio-confirm",
    onClick: _cache[9] || (_cache[9] = function ($event) {
      return $options.toggleRecorder(false);
    })
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "audio-stop-icon", {}, function () {
    return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_svg_icon, {
      name: "checkmark"
    })];
  })])], 64)) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 1,
    "class": "vac-svg-button",
    onClick: _cache[10] || (_cache[10] = function ($event) {
      return $options.toggleRecorder(true);
    })
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "microphone-icon", {}, function () {
    return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_svg_icon, {
      name: "microphone",
      "class": "vac-icon-microphone"
    })];
  })]))])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), $data.imageFile ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 1,
    "class": "vac-file-container",
    style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
      'min-height': "".concat($data.mediaDimensions ? $data.mediaDimensions.height : 20, "px"),
      'padding-left': "".concat($data.mediaDimensions ? $data.mediaDimensions.width - 10 : 12, "px")
    })
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_14, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    "class": "vac-svg-button vac-icon-media",
    onClick: _cache[11] || (_cache[11] = function () {
      return $options.resetMediaFile && $options.resetMediaFile.apply($options, arguments);
    })
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "image-close-icon", {}, function () {
    return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_svg_icon, {
      name: "close",
      param: "image"
    })];
  })]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_15, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
    ref: "mediaFile",
    src: $data.imageFile,
    onLoad: _cache[12] || (_cache[12] = function () {
      return $options.onMediaLoad && $options.onMediaLoad.apply($options, arguments);
    })
  }, null, 40, _hoisted_16)])])], 4)) : $data.videoFile ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 2,
    "class": "vac-file-container",
    style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
      'min-height': "".concat($data.mediaDimensions ? $data.mediaDimensions.height : 20, "px"),
      'padding-left': "".concat($data.mediaDimensions ? $data.mediaDimensions.width - 10 : 12, "px")
    })
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_17, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    "class": "vac-svg-button vac-icon-media",
    onClick: _cache[13] || (_cache[13] = function () {
      return $options.resetMediaFile && $options.resetMediaFile.apply($options, arguments);
    })
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "image-close-icon", {}, function () {
    return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_svg_icon, {
      name: "close",
      param: "image"
    })];
  })]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_18, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("video", _hoisted_19, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("source", {
    src: $data.videoFile
  }, null, 8, _hoisted_20)])], 512)])], 4)) : $data.file ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 3,
    "class": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["vac-file-container", {
      'vac-file-container-edit': $data.editedMessage._id
    }])
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_21, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "file-icon", {}, function () {
    return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_svg_icon, {
      name: "file"
    })];
  })]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_22, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($data.file.audio ? $data.file.name : $data.message), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    "class": "vac-svg-button vac-icon-remove",
    onClick: _cache[14] || (_cache[14] = function ($event) {
      return $options.resetMessage(null, true);
    })
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "file-close-icon", {}, function () {
    return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_svg_icon, {
      name: "close"
    })];
  })])], 2)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("textarea", {
    ref: "roomTextarea",
    "onUpdate:modelValue": _cache[15] || (_cache[15] = function ($event) {
      return $data.message = $event;
    }),
    placeholder: $props.textMessages.TYPE_MESSAGE,
    "class": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["vac-textarea", {
      'vac-textarea-outline': $data.editedMessage._id
    }]),
    style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
      'min-height': "".concat($data.mediaDimensions ? $data.mediaDimensions.height : 20, "px"),
      'padding-left': "".concat($data.mediaDimensions ? $data.mediaDimensions.width - 10 : 12, "px")
    }),
    onInput: _cache[16] || (_cache[16] = function () {
      return $options.onChangeInput && $options.onChangeInput.apply($options, arguments);
    }),
    onKeydown: [_cache[17] || (_cache[17] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withKeys"])(function () {
      return $options.escapeTextarea && $options.escapeTextarea.apply($options, arguments);
    }, ["esc"])), _cache[18] || (_cache[18] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withKeys"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(function () {}, ["exact", "prevent"]), ["enter"]))]
  }, null, 46, _hoisted_23), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], !$data.file], [external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], $data.message]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_24, [$data.editedMessage._id ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 0,
    "class": "vac-svg-button",
    onClick: _cache[19] || (_cache[19] = function () {
      return $options.resetMessage && $options.resetMessage.apply($options, arguments);
    })
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "edit-close-icon", {}, function () {
    return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_svg_icon, {
      name: "close-outline"
    })];
  })])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), $props.showEmojis && !$data.file ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_emoji_picker, {
    key: 1,
    "emoji-opened": $data.emojiOpened,
    "position-top": true,
    onAddEmoji: $options.addEmoji,
    onOpenEmoji: _cache[20] || (_cache[20] = function ($event) {
      return $data.emojiOpened = $event;
    })
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createSlots"])({
    _: 2
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.$slots, function (i, name) {
    return {
      name: name,
      fn: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function (data) {
        return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, name, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeProps"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["guardReactiveProps"])(data)))];
      })
    };
  })]), 1032, ["emoji-opened", "onAddEmoji"])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), $props.showFiles ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 2,
    "class": "vac-svg-button",
    onClick: _cache[21] || (_cache[21] = function () {
      return $options.launchFilePicker && $options.launchFilePicker.apply($options, arguments);
    })
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "paperclip-icon", {}, function () {
    return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_svg_icon, {
      name: "paperclip"
    })];
  })])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), $props.textareaAction ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 3,
    "class": "vac-svg-button",
    onClick: _cache[22] || (_cache[22] = function () {
      return $options.textareaActionHandler && $options.textareaActionHandler.apply($options, arguments);
    })
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "custom-action-icon", {}, function () {
    return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_svg_icon, {
      name: "deleted"
    })];
  })])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), $props.showFiles ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("input", {
    key: 4,
    ref: "file",
    type: "file",
    accept: $props.acceptedFiles,
    style: {
      "display": "none"
    },
    onChange: _cache[23] || (_cache[23] = function ($event) {
      return $options.onFileChange($event.target.files);
    })
  }, null, 40, _hoisted_25)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), $props.showSendIcon ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 5,
    "class": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["vac-svg-button", {
      'vac-send-disabled': $options.isMessageEmpty
    }]),
    onClick: _cache[24] || (_cache[24] = function () {
      return $options.sendMessage && $options.sendMessage.apply($options, arguments);
    })
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "send-icon", {}, function () {
    return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_svg_icon, {
      name: "send",
      param: $options.isMessageEmpty ? 'disabled' : ''
    }, null, 8, ["param"])];
  })], 2)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])], 2)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], Object.keys($options.room).length && $props.showFooter]])], 512)), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], $props.isMobile && !$props.showRoomsList || !$props.isMobile || $props.singleRoom]]);
}
// CONCATENATED MODULE: ./src/lib/Room/Room.vue?vue&type=template&id=41b8b406

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.async-iterator.js
var es_symbol_async_iterator = __webpack_require__("b636");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.to-string-tag.js
var es_symbol_to_string_tag = __webpack_require__("944a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.json.to-string-tag.js
var es_json_to_string_tag = __webpack_require__("0c47");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.math.to-string-tag.js
var es_math_to_string_tag = __webpack_require__("23dc");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.create.js
var es_object_create = __webpack_require__("b8bf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-prototype-of.js
var es_object_get_prototype_of = __webpack_require__("3410");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.set-prototype-of.js
var es_object_set_prototype_of = __webpack_require__("131a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__("e6cf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.reverse.js
var es_array_reverse = __webpack_require__("26e9");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__("53ca");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/regeneratorRuntime.js
























function _regeneratorRuntime() {
  "use strict";
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  _regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  };

  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == Object(esm_typeof["a" /* default */])(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) {
            if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
          }

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      }
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js



function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__("498a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.date.to-iso-string.js
var es_date_to_iso_string = __webpack_require__("accc");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url.js
var web_url = __webpack_require__("2b3d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.url-search-params.js
var web_url_search_params = __webpack_require__("9861");

// CONCATENATED MODULE: ./src/components/EmojiPicker/emojis.js
/* harmony default export */ var EmojiPicker_emojis = ({
  'Frequently used': {
    'thumbs_up': '👍',
    '-1': '👎',
    'sob': '😭',
    'confused': '😕',
    'neutral_face': '😐',
    'blush': '😊',
    'heart_eyes': '😍'
  },
  'People': {
    'smile': '😄',
    'smiley': '😃',
    'grinning': '😀',
    'blush': '😊',
    'wink': '😉',
    'heart_eyes': '😍',
    'kissing_heart': '😘',
    'kissing_closed_eyes': '😚',
    'kissing': '😗',
    'kissing_smiling_eyes': '😙',
    'stuck_out_tongue_winking_eye': '😜',
    'stuck_out_tongue_closed_eyes': '😝',
    'stuck_out_tongue': '😛',
    'flushed': '😳',
    'grin': '😁',
    'pensive': '😔',
    'relieved': '😌',
    'unamused': '😒',
    'disappointed': '😞',
    'persevere': '😣',
    'cry': '😢',
    'joy': '😂',
    'sob': '😭',
    'sleepy': '😪',
    'disappointed_relieved': '😥',
    'cold_sweat': '😰',
    'sweat_smile': '😅',
    'sweat': '😓',
    'weary': '😩',
    'tired_face': '😫',
    'fearful': '😨',
    'scream': '😱',
    'angry': '😠',
    'rage': '😡',
    'triumph': '😤',
    'confounded': '😖',
    'laughing': '😆',
    'yum': '😋',
    'mask': '😷',
    'sunglasses': '😎',
    'sleeping': '😴',
    'dizzy_face': '😵',
    'astonished': '😲',
    'worried': '😟',
    'frowning': '😦',
    'anguished': '😧',
    'imp': '👿',
    'open_mouth': '😮',
    'grimacing': '😬',
    'neutral_face': '😐',
    'confused': '😕',
    'hushed': '😯',
    'smirk': '😏',
    'expressionless': '😑',
    'man_with_gua_pi_mao': '👲',
    'man_with_turban': '👳',
    'cop': '👮',
    'construction_worker': '👷',
    'guardsman': '💂',
    'baby': '👶',
    'boy': '👦',
    'girl': '👧',
    'man': '👨',
    'woman': '👩',
    'older_man': '👴',
    'older_woman': '👵',
    'person_with_blond_hair': '👱',
    'angel': '👼',
    'princess': '👸',
    'smiley_cat': '😺',
    'smile_cat': '😸',
    'heart_eyes_cat': '😻',
    'kissing_cat': '😽',
    'smirk_cat': '😼',
    'scream_cat': '🙀',
    'crying_cat_face': '😿',
    'joy_cat': '😹',
    'pouting_cat': '😾',
    'japanese_ogre': '👹',
    'japanese_goblin': '👺',
    'see_no_evil': '🙈',
    'hear_no_evil': '🙉',
    'speak_no_evil': '🙊',
    'skull': '💀',
    'alien': '👽',
    'hankey': '💩',
    'fire': '🔥',
    'sparkles': '✨',
    'star2': '🌟',
    'dizzy': '💫',
    'boom': '💥',
    'anger': '💢',
    'sweat_drops': '💦',
    'droplet': '💧',
    'zzz': '💤',
    'dash': '💨',
    'ear': '👂',
    'eyes': '👀',
    'nose': '👃',
    'tongue': '👅',
    'lips': '👄',
    'thumbs_up': '👍',
    '-1': '👎',
    'ok_hand': '👌',
    'facepunch': '👊',
    'fist': '✊',
    'wave': '👋',
    'hand': '✋',
    'open_hands': '👐',
    'point_up_2': '👆',
    'point_down': '👇',
    'point_right': '👉',
    'point_left': '👈',
    'raised_hands': '🙌',
    'pray': '🙏',
    'clap': '👏',
    'muscle': '💪',
    'walking': '🚶',
    'runner': '🏃',
    'dancer': '💃',
    'couple': '👫',
    'family': '👪',
    'couplekiss': '💏',
    'couple_with_heart': '💑',
    'dancers': '👯',
    'ok_woman': '🙆',
    'no_good': '🙅',
    'information_desk_person': '💁',
    'raising_hand': '🙋',
    'massage': '💆',
    'haircut': '💇',
    'nail_care': '💅',
    'bride_with_veil': '👰',
    'person_with_pouting_face': '🙎',
    'person_frowning': '🙍',
    'bow': '🙇',
    'tophat': '🎩',
    'crown': '👑',
    'womans_hat': '👒',
    'athletic_shoe': '👟',
    'mans_shoe': '👞',
    'sandal': '👡',
    'high_heel': '👠',
    'boot': '👢',
    'shirt': '👕',
    'necktie': '👔',
    'womans_clothes': '👚',
    'dress': '👗',
    'running_shirt_with_sash': '🎽',
    'jeans': '👖',
    'kimono': '👘',
    'bikini': '👙',
    'briefcase': '💼',
    'handbag': '👜',
    'pouch': '👝',
    'purse': '👛',
    'eyeglasses': '👓',
    'ribbon': '🎀',
    'closed_umbrella': '🌂',
    'lipstick': '💄',
    'yellow_heart': '💛',
    'blue_heart': '💙',
    'purple_heart': '💜',
    'green_heart': '💚',
    'broken_heart': '💔',
    'heartpulse': '💗',
    'heartbeat': '💓',
    'two_hearts': '💕',
    'sparkling_heart': '💖',
    'revolving_hearts': '💞',
    'cupid': '💘',
    'love_letter': '💌',
    'kiss': '💋',
    'ring': '💍',
    'gem': '💎',
    'bust_in_silhouette': '👤',
    'speech_balloon': '💬',
    'footprints': '👣'
  },
  'Nature': {
    'dog': '🐶',
    'wolf': '🐺',
    'cat': '🐱',
    'mouse': '🐭',
    'hamster': '🐹',
    'rabbit': '🐰',
    'frog': '🐸',
    'tiger': '🐯',
    'koala': '🐨',
    'bear': '🐻',
    'pig': '🐷',
    'pig_nose': '🐽',
    'cow': '🐮',
    'boar': '🐗',
    'monkey_face': '🐵',
    'monkey': '🐒',
    'horse': '🐴',
    'sheep': '🐑',
    'elephant': '🐘',
    'panda_face': '🐼',
    'penguin': '🐧',
    'bird': '🐦',
    'baby_chick': '🐤',
    'hatched_chick': '🐥',
    'hatching_chick': '🐣',
    'chicken': '🐔',
    'snake': '🐍',
    'turtle': '🐢',
    'bug': '🐛',
    'bee': '🐝',
    'ant': '🐜',
    'beetle': '🐞',
    'snail': '🐌',
    'octopus': '🐙',
    'shell': '🐚',
    'tropical_fish': '🐠',
    'fish': '🐟',
    'dolphin': '🐬',
    'whale': '🐳',
    'racehorse': '🐎',
    'dragon_face': '🐲',
    'blowfish': '🐡',
    'camel': '🐫',
    'poodle': '🐩',
    'feet': '🐾',
    'bouquet': '💐',
    'cherry_blossom': '🌸',
    'tulip': '🌷',
    'four_leaf_clover': '🍀',
    'rose': '🌹',
    'sunflower': '🌻',
    'hibiscus': '🌺',
    'maple_leaf': '🍁',
    'leaves': '🍃',
    'fallen_leaf': '🍂',
    'herb': '🌿',
    'ear_of_rice': '🌾',
    'mushroom': '🍄',
    'cactus': '🌵',
    'palm_tree': '🌴',
    'chestnut': '🌰',
    'seedling': '🌱',
    'blossom': '🌼',
    'new_moon': '🌑',
    'first_quarter_moon': '🌓',
    'moon': '🌔',
    'full_moon': '🌕',
    'first_quarter_moon_with_face': '🌛',
    'crescent_moon': '🌙',
    'earth_asia': '🌏',
    'volcano': '🌋',
    'milky_way': '🌌',
    'stars': '🌠',
    'partly_sunny': '⛅',
    'snowman': '⛄',
    'cyclone': '🌀',
    'foggy': '🌁',
    'rainbow': '🌈',
    'ocean': '🌊'
  },
  'Objects': {
    'bamboo': '🎍',
    'gift_heart': '💝',
    'dolls': '🎎',
    'school_satchel': '🎒',
    'mortar_board': '🎓',
    'flags': '🎏',
    'fireworks': '🎆',
    'sparkler': '🎇',
    'wind_chime': '🎐',
    'rice_scene': '🎑',
    'jack_o_lantern': '🎃',
    'ghost': '👻',
    'santa': '🎅',
    'christmas_tree': '🎄',
    'gift': '🎁',
    'tanabata_tree': '🎋',
    'tada': '🎉',
    'confetti_ball': '🎊',
    'balloon': '🎈',
    'crossed_flags': '🎌',
    'crystal_ball': '🔮',
    'movie_camera': '🎥',
    'camera': '📷',
    'video_camera': '📹',
    'vhs': '📼',
    'cd': '💿',
    'dvd': '📀',
    'minidisc': '💽',
    'floppy_disk': '💾',
    'computer': '💻',
    'iphone': '📱',
    'telephone_receiver': '📞',
    'pager': '📟',
    'fax': '📠',
    'satellite': '📡',
    'tv': '📺',
    'radio': '📻',
    'loud_sound': '🔊',
    'bell': '🔔',
    'loudspeaker': '📢',
    'mega': '📣',
    'hourglass_flowing_sand': '⏳',
    'hourglass': '⌛',
    'alarm_clock': '⏰',
    'watch': '⌚',
    'unlock': '🔓',
    'lock': '🔒',
    'lock_with_ink_pen': '🔏',
    'closed_lock_with_key': '🔐',
    'key': '🔑',
    'mag_right': '🔎',
    'bulb': '💡',
    'flashlight': '🔦',
    'electric_plug': '🔌',
    'battery': '🔋',
    'mag': '🔍',
    'bath': '🛀',
    'toilet': '🚽',
    'wrench': '🔧',
    'nut_and_bolt': '🔩',
    'hammer': '🔨',
    'door': '🚪',
    'smoking': '🚬',
    'bomb': '💣',
    'gun': '🔫',
    'hocho': '🔪',
    'pill': '💊',
    'syringe': '💉',
    'moneybag': '💰',
    'yen': '💴',
    'dollar': '💵',
    'credit_card': '💳',
    'money_with_wings': '💸',
    'calling': '📲',
    'e-mail': '📧',
    'inbox_tray': '📥',
    'outbox_tray': '📤',
    'envelope_with_arrow': '📩',
    'incoming_envelope': '📨',
    'mailbox': '📫',
    'mailbox_closed': '📪',
    'postbox': '📮',
    'package': '📦',
    'memo': '📝',
    'page_facing_up': '📄',
    'page_with_curl': '📃',
    'bookmark_tabs': '📑',
    'bar_chart': '📊',
    'chart_with_upwards_trend': '📈',
    'chart_with_downwards_trend': '📉',
    'scroll': '📜',
    'clipboard': '📋',
    'date': '📅',
    'calendar': '📆',
    'card_index': '📇',
    'file_folder': '📁',
    'open_file_folder': '📂',
    'pushpin': '📌',
    'paperclip': '📎',
    'straight_ruler': '📏',
    'triangular_ruler': '📐',
    'closed_book': '📕',
    'green_book': '📗',
    'blue_book': '📘',
    'orange_book': '📙',
    'notebook': '📓',
    'notebook_with_decorative_cover': '📔',
    'ledger': '📒',
    'books': '📚',
    'book': '📖',
    'bookmark': '🔖',
    'name_badge': '📛',
    'newspaper': '📰',
    'art': '🎨',
    'clapper': '🎬',
    'microphone': '🎤',
    'headphones': '🎧',
    'musical_score': '🎼',
    'musical_note': '🎵',
    'notes': '🎶',
    'musical_keyboard': '🎹',
    'violin': '🎻',
    'trumpet': '🎺',
    'saxophone': '🎷',
    'guitar': '🎸',
    'space_invader': '👾',
    'video_game': '🎮',
    'black_joker': '🃏',
    'flower_playing_cards': '🎴',
    'mahjong': '🀄',
    'game_die': '🎲',
    'dart': '🎯',
    'football': '🏈',
    'basketball': '🏀',
    'soccer': '⚽',
    'baseball': '⚾',
    'tennis': '🎾',
    '8ball': '🎱',
    'bowling': '🎳',
    'golf': '⛳',
    'checkered_flag': '🏁',
    'trophy': '🏆',
    'ski': '🎿',
    'snowboarder': '🏂',
    'swimmer': '🏊',
    'surfer': '🏄',
    'fishing_pole_and_fish': '🎣',
    'tea': '🍵',
    'sake': '🍶',
    'beer': '🍺',
    'beers': '🍻',
    'cocktail': '🍸',
    'tropical_drink': '🍹',
    'wine_glass': '🍷',
    'fork_and_knife': '🍴',
    'pizza': '🍕',
    'hamburger': '🍔',
    'fries': '🍟',
    'poultry_leg': '🍗',
    'meat_on_bone': '🍖',
    'spaghetti': '🍝',
    'curry': '🍛',
    'fried_shrimp': '🍤',
    'bento': '🍱',
    'sushi': '🍣',
    'fish_cake': '🍥',
    'rice_ball': '🍙',
    'rice_cracker': '🍘',
    'rice': '🍚',
    'ramen': '🍜',
    'stew': '🍲',
    'oden': '🍢',
    'dango': '🍡',
    'egg': '🍳',
    'bread': '🍞',
    'doughnut': '🍩',
    'custard': '🍮',
    'icecream': '🍦',
    'ice_cream': '🍨',
    'shaved_ice': '🍧',
    'birthday': '🎂',
    'cake': '🍰',
    'cookie': '🍪',
    'chocolate_bar': '🍫',
    'candy': '🍬',
    'lollipop': '🍭',
    'honey_pot': '🍯',
    'apple': '🍎',
    'green_apple': '🍏',
    'tangerine': '🍊',
    'cherries': '🍒',
    'grapes': '🍇',
    'watermelon': '🍉',
    'strawberry': '🍓',
    'peach': '🍑',
    'melon': '🍈',
    'banana': '🍌',
    'pineapple': '🍍',
    'sweet_potato': '🍠',
    'eggplant': '🍆',
    'tomato': '🍅',
    'corn': '🌽'
  },
  'Places': {
    'house': '🏠',
    'house_with_garden': '🏡',
    'school': '🏫',
    'office': '🏢',
    'post_office': '🏣',
    'hospital': '🏥',
    'bank': '🏦',
    'convenience_store': '🏪',
    'love_hotel': '🏩',
    'hotel': '🏨',
    'wedding': '💒',
    'church': '⛪',
    'department_store': '🏬',
    'city_sunrise': '🌇',
    'city_sunset': '🌆',
    'japanese_castle': '🏯',
    'european_castle': '🏰',
    'tent': '⛺',
    'factory': '🏭',
    'tokyo_tower': '🗼',
    'japan': '🗾',
    'mount_fuji': '🗻',
    'sunrise_over_mountains': '🌄',
    'sunrise': '🌅',
    'night_with_stars': '🌃',
    'statue_of_liberty': '🗽',
    'bridge_at_night': '🌉',
    'carousel_horse': '🎠',
    'ferris_wheel': '🎡',
    'fountain': '⛲',
    'roller_coaster': '🎢',
    'ship': '🚢',
    'boat': '⛵',
    'speedboat': '🚤',
    'rocket': '🚀',
    'seat': '💺',
    'station': '🚉',
    'bullettrain_side': '🚄',
    'bullettrain_front': '🚅',
    'metro': '🚇',
    'railway_car': '🚃',
    'bus': '🚌',
    'blue_car': '🚙',
    'car': '🚗',
    'taxi': '🚕',
    'truck': '🚚',
    'rotating_light': '🚨',
    'police_car': '🚓',
    'fire_engine': '🚒',
    'ambulance': '🚑',
    'bike': '🚲',
    'barber': '💈',
    'busstop': '🚏',
    'ticket': '🎫',
    'traffic_light': '🚥',
    'construction': '🚧',
    'beginner': '🔰',
    'fuelpump': '⛽',
    'izakaya_lantern': '🏮',
    'slot_machine': '🎰',
    'moyai': '🗿',
    'circus_tent': '🎪',
    'performing_arts': '🎭',
    'round_pushpin': '📍',
    'triangular_flag_on_post': '🚩'
  },
  'Symbols': {
    'keycap_ten': '🔟',
    '1234': '🔢',
    'symbols': '🔣',
    'capital_abcd': '🔠',
    'abcd': '🔡',
    'abc': '🔤',
    'arrow_up_small': '🔼',
    'arrow_down_small': '🔽',
    'rewind': '⏪',
    'fast_forward': '⏩',
    'arrow_double_up': '⏫',
    'arrow_double_down': '⏬',
    'ok': '🆗',
    'new': '🆕',
    'up': '🆙',
    'cool': '🆒',
    'free': '🆓',
    'ng': '🆖',
    'signal_strength': '📶',
    'cinema': '🎦',
    'koko': '🈁',
    'u6307': '🈯',
    'u7a7a': '🈳',
    'u6e80': '🈵',
    'u5408': '🈴',
    'u7981': '🈲',
    'ideograph_advantage': '🉐',
    'u5272': '🈹',
    'u55b6': '🈺',
    'u6709': '🈶',
    'u7121': '🈚',
    'restroom': '🚻',
    'mens': '🚹',
    'womens': '🚺',
    'baby_symbol': '🚼',
    'wc': '🚾',
    'no_smoking': '🚭',
    'u7533': '🈸',
    'accept': '🉑',
    'cl': '🆑',
    'sos': '🆘',
    'id': '🆔',
    'no_entry_sign': '🚫',
    'underage': '🔞',
    'no_entry': '⛔',
    'negative_squared_cross_mark': '❎',
    'white_check_mark': '✅',
    'heart_decoration': '💟',
    'vs': '🆚',
    'vibration_mode': '📳',
    'mobile_phone_off': '📴',
    'ab': '🆎',
    'diamond_shape_with_a_dot_inside': '💠',
    'ophiuchus': '⛎',
    'six_pointed_star': '🔯',
    'atm': '🏧',
    'chart': '💹',
    'heavy_dollar_sign': '💲',
    'currency_exchange': '💱',
    'x': '❌',
    'exclamation': '❗',
    'question': '❓',
    'grey_exclamation': '❕',
    'grey_question': '❔',
    'o': '⭕',
    'top': '🔝',
    'end': '🔚',
    'back': '🔙',
    'on': '🔛',
    'soon': '🔜',
    'arrows_clockwise': '🔃',
    'clock12': '🕛',
    'clock1': '🕐',
    'clock2': '🕑',
    'clock3': '🕒',
    'clock4': '🕓',
    'clock5': '🕔',
    'clock6': '🕕',
    'clock7': '🕖',
    'clock8': '🕗',
    'clock9': '🕘',
    'clock10': '🕙',
    'clock11': '🕚',
    'heavy_plus_sign': '➕',
    'heavy_minus_sign': '➖',
    'heavy_division_sign': '➗',
    'white_flower': '💮',
    '100': '💯',
    'radio_button': '🔘',
    'link': '🔗',
    'curly_loop': '➰',
    'trident': '🔱',
    'small_red_triangle': '🔺',
    'black_square_button': '🔲',
    'white_square_button': '🔳',
    'red_circle': '🔴',
    'large_blue_circle': '🔵',
    'small_red_triangle_down': '🔻',
    'white_large_square': '⬜',
    'black_large_square': '⬛',
    'large_orange_diamond': '🔶',
    'large_blue_diamond': '🔷',
    'small_orange_diamond': '🔸',
    'small_blue_diamond': '🔹'
  }
});
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__("841c");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/EmojiPicker/EmojiPicker.vue?vue&type=template&id=3cb43438



var EmojiPickervue_type_template_id_3cb43438_hoisted_1 = {
  "class": "vac-wrapper"
};
var EmojiPickervue_type_template_id_3cb43438_hoisted_2 = ["onClick"];
var EmojiPickervue_type_template_id_3cb43438_hoisted_3 = {
  "class": "vac-emoji-picker__search"
};
var EmojiPickervue_type_template_id_3cb43438_hoisted_4 = {
  key: 0
};
var EmojiPickervue_type_template_id_3cb43438_hoisted_5 = {
  key: 1,
  "class": "vac-emojis"
};
var EmojiPickervue_type_template_id_3cb43438_hoisted_6 = ["title", "onClick"];
function EmojiPickervue_type_template_id_3cb43438_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_svg_icon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("svg-icon");

  var _component_emoji_picker_base = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("emoji-picker-base");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", EmojiPickervue_type_template_id_3cb43438_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_emoji_picker_base, {
    search: $data.search,
    onEmoji: $options.append
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createSlots"])({
    "emoji-invoker": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function (_ref) {
      var clickEvent = _ref.events.click;
      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
        "class": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["vac-svg-button", {
          'vac-emoji-reaction': $props.emojiReaction
        }]),
        onClick: [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(clickEvent, ["stop"]), _cache[0] || (_cache[0] = function () {
          return $options.openEmoji && $options.openEmoji.apply($options, arguments);
        })]
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "emoji-picker-icon", {}, function () {
        return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_svg_icon, {
          name: "emoji",
          param: $props.emojiReaction ? 'reaction' : ''
        }, null, 8, ["param"])];
      })], 10, EmojiPickervue_type_template_id_3cb43438_hoisted_2)];
    }),
    _: 2
  }, [$props.emojiOpened ? {
    name: "emoji-picker",
    fn: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function (_ref2) {
      var emojis = _ref2.emojis,
          insert = _ref2.insert;
      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Transition"], {
        name: "vac-slide-up",
        appear: ""
      }, {
        "default": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
          return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
            "class": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["vac-emoji-picker", {
              'vac-picker-reaction': $props.emojiReaction
            }]),
            style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
              height: "".concat($data.emojiPickerHeight, "px"),
              top: $props.positionTop ? $data.emojiPickerHeight : "".concat($data.emojiPickerTop, "px"),
              right: $data.emojiPickerRight,
              display: $data.emojiPickerTop || !$props.emojiReaction ? 'initial' : 'none'
            })
          }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", EmojiPickervue_type_template_id_3cb43438_hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
            "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
              return $data.search = $event;
            }),
            type: "text"
          }, null, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], $data.search]])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", null, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(emojis, function (emojiGroup, category) {
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
              key: category
            }, [category !== 'Frequently used' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("h5", EmojiPickervue_type_template_id_3cb43438_hoisted_4, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(category), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), category !== 'Frequently used' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", EmojiPickervue_type_template_id_3cb43438_hoisted_5, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(emojiGroup, function (emoji, emojiName) {
              return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
                key: emojiName,
                title: emojiName,
                onClick: function onClick($event) {
                  return insert({
                    emoji: emoji,
                    emojiName: emojiName
                  });
                }
              }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(emoji), 9, EmojiPickervue_type_template_id_3cb43438_hoisted_6);
            }), 128))])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]);
          }), 128))])], 6)];
        }),
        _: 2
      }, 1024)];
    })
  } : undefined]), 1032, ["search", "onEmoji"])]);
}
// CONCATENATED MODULE: ./src/components/EmojiPicker/EmojiPicker.vue?vue&type=template&id=3cb43438

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/EmojiPicker/components/EmojiPickerBase.vue?vue&type=template&id=4aab81a8

var EmojiPickerBasevue_type_template_id_4aab81a8_hoisted_1 = {
  key: 0
};
function EmojiPickerBasevue_type_template_id_4aab81a8_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_click_outside = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("click-outside");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "emoji-invoker", {
    events: {
      click: function click(e) {
        return $options.toggle(e);
      }
    }
  }), $data.display.visible ? Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", EmojiPickerBasevue_type_template_id_4aab81a8_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "emoji-picker", {
    emojis: $options.emojis,
    insert: $options.insert,
    display: $data.display
  })])), [[_directive_click_outside, $options.hide]]) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]);
}
// CONCATENATED MODULE: ./src/components/EmojiPicker/components/EmojiPickerBase.vue?vue&type=template&id=4aab81a8

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/EmojiPicker/components/EmojiPickerBase.vue?vue&type=script&lang=js










 // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping

var escapeRegExp = function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/* harmony default export */ var EmojiPickerBasevue_type_script_lang_js = ({
  directives: {
    clickOutside: v_click_outside_umd_default.a.directive
  },
  props: {
    search: {
      type: String,
      required: false,
      "default": ''
    },
    emojiTable: {
      type: Object,
      required: false,
      "default": function _default() {
        return EmojiPicker_emojis;
      }
    }
  },
  data: function data() {
    return {
      display: {
        x: 0,
        y: 0,
        visible: false
      }
    };
  },
  computed: {
    emojis: function emojis() {
      if (this.search) {
        var obj = {};

        for (var category in this.emojiTable) {
          obj[category] = {};

          for (var emoji in this.emojiTable[category]) {
            if (new RegExp(".*".concat(escapeRegExp(this.search), ".*")).test(emoji)) {
              obj[category][emoji] = this.emojiTable[category][emoji];
            }
          }

          if (Object.keys(obj[category]).length === 0) {
            delete obj[category];
          }
        }

        return obj;
      }

      return this.emojiTable;
    }
  },
  mounted: function mounted() {
    document.addEventListener('keyup', this.escape);
  },
  unmounted: function unmounted() {
    document.removeEventListener('keyup', this.escape);
  },
  methods: {
    insert: function insert(emoji) {
      this.$emit('emoji', emoji);
    },
    toggle: function toggle(e) {
      this.display.visible = !this.display.visible;
      this.display.x = e.clientX;
      this.display.y = e.clientY;
    },
    hide: function hide() {
      this.display.visible = false;
    },
    escape: function escape(e) {
      if (this.display.visible === true && e.keyCode === 27) {
        this.display.visible = false;
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/EmojiPicker/components/EmojiPickerBase.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/components/EmojiPicker/components/EmojiPickerBase.vue





const EmojiPickerBase_exports_ = /*#__PURE__*/exportHelper_default()(EmojiPickerBasevue_type_script_lang_js, [['render',EmojiPickerBasevue_type_template_id_4aab81a8_render]])

/* harmony default export */ var EmojiPickerBase = (EmojiPickerBase_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/EmojiPicker/EmojiPicker.vue?vue&type=script&lang=js



/* harmony default export */ var EmojiPickervue_type_script_lang_js = ({
  components: {
    EmojiPickerBase: EmojiPickerBase,
    SvgIcon: SvgIcon
  },
  props: {
    emojiOpened: {
      type: Boolean,
      "default": false
    },
    emojiReaction: {
      type: Boolean,
      "default": false
    },
    roomFooterRef: {
      type: HTMLDivElement,
      "default": null
    },
    positionTop: {
      type: Boolean,
      "default": false
    },
    positionRight: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {
      search: '',
      emojiPickerHeight: 320,
      emojiPickerTop: 0,
      emojiPickerRight: ''
    };
  },
  methods: {
    append: function append(_ref) {
      var emoji = _ref.emoji,
          emojiName = _ref.emojiName;
      this.$emit('add-emoji', {
        icon: emoji,
        name: emojiName
      });
    },
    openEmoji: function openEmoji(ev) {
      this.$emit('open-emoji', true);
      this.setEmojiPickerPosition(ev.clientY, ev.view.innerWidth, ev.view.innerHeight);
    },
    setEmojiPickerPosition: function setEmojiPickerPosition(clientY, innerWidth, innerHeight) {
      var _this = this;

      setTimeout(function () {
        var mobileSize = innerWidth < 500 || innerHeight < 700;

        if (!_this.roomFooterRef) {
          if (mobileSize) _this.emojiPickerRight = '0px';
          return;
        }

        if (mobileSize) {
          _this.emojiPickerRight = innerWidth / 2 - 120 + 'px';
          _this.emojiPickerTop = 100;
          _this.emojiPickerHeight = innerHeight - 200;
        } else {
          var roomFooterTop = _this.roomFooterRef.getBoundingClientRect().top;

          var pickerTopPosition = roomFooterTop - clientY > _this.emojiPickerHeight - 50;
          if (pickerTopPosition) _this.emojiPickerTop = clientY + 10;else _this.emojiPickerTop = clientY - _this.emojiPickerHeight - 10;
          _this.emojiPickerRight = _this.positionTop ? '-50px' : _this.positionRight ? '60px' : '';
        }
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/EmojiPicker/EmojiPicker.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/components/EmojiPicker/EmojiPicker.vue





const EmojiPicker_exports_ = /*#__PURE__*/exportHelper_default()(EmojiPickervue_type_script_lang_js, [['render',EmojiPickervue_type_template_id_3cb43438_render]])

/* harmony default export */ var EmojiPicker = (EmojiPicker_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/Room/RoomHeader/RoomHeader.vue?vue&type=template&id=7d349216


var RoomHeadervue_type_template_id_7d349216_hoisted_1 = {
  "class": "vac-room-header vac-app-border-b"
};
var RoomHeadervue_type_template_id_7d349216_hoisted_2 = {
  "class": "vac-room-wrapper"
};
var RoomHeadervue_type_template_id_7d349216_hoisted_3 = {
  "class": "vac-text-ellipsis"
};
var RoomHeadervue_type_template_id_7d349216_hoisted_4 = {
  "class": "vac-room-name vac-text-ellipsis"
};
var RoomHeadervue_type_template_id_7d349216_hoisted_5 = {
  key: 0,
  "class": "vac-room-info vac-text-ellipsis"
};
var RoomHeadervue_type_template_id_7d349216_hoisted_6 = {
  key: 1,
  "class": "vac-room-info vac-text-ellipsis"
};
var RoomHeadervue_type_template_id_7d349216_hoisted_7 = {
  key: 0,
  "class": "vac-menu-options"
};
var RoomHeadervue_type_template_id_7d349216_hoisted_8 = {
  "class": "vac-menu-list"
};
var RoomHeadervue_type_template_id_7d349216_hoisted_9 = ["onClick"];
function RoomHeadervue_type_template_id_7d349216_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_svg_icon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("svg-icon");

  var _directive_click_outside = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("click-outside");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", RoomHeadervue_type_template_id_7d349216_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "room-header", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeProps"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["guardReactiveProps"])({
    room: $props.room,
    typingUsers: $options.typingUsers,
    userStatus: $options.userStatus
  })), function () {
    return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", RoomHeadervue_type_template_id_7d349216_hoisted_2, [!$props.singleRoom ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
      key: 0,
      "class": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["vac-svg-button vac-toggle-button", {
        'vac-rotate-icon': !$props.showRoomsList && !$props.isMobile
      }]),
      onClick: _cache[0] || (_cache[0] = function ($event) {
        return _ctx.$emit('toggle-rooms-list');
      })
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "toggle-icon", {}, function () {
      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_svg_icon, {
        name: "toggle"
      })];
    })], 2)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
      "class": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["vac-info-wrapper", {
        'vac-item-clickable': $props.roomInfo
      }]),
      onClick: _cache[1] || (_cache[1] = function ($event) {
        return _ctx.$emit('room-info');
      })
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "room-header-avatar", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeProps"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["guardReactiveProps"])({
      room: $props.room
    })), function () {
      return [$props.room.avatar ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
        key: 0,
        "class": "vac-avatar",
        style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
          'background-image': "url('".concat($props.room.avatar, "')")
        })
      }, null, 4)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)];
    }), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "room-header-info", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeProps"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["guardReactiveProps"])({
      room: $props.room,
      typingUsers: $options.typingUsers,
      userStatus: $options.userStatus
    })), function () {
      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", RoomHeadervue_type_template_id_7d349216_hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", RoomHeadervue_type_template_id_7d349216_hoisted_4, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($props.room.roomName), 1), $options.typingUsers ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", RoomHeadervue_type_template_id_7d349216_hoisted_5, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($options.typingUsers), 1)) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", RoomHeadervue_type_template_id_7d349216_hoisted_6, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($options.userStatus), 1))])];
    })], 2), $props.room.roomId ? Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "room-options", {
      key: 1
    }, function () {
      return [$props.menuActions.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
        key: 0,
        "class": "vac-svg-button vac-room-options",
        onClick: _cache[2] || (_cache[2] = function ($event) {
          return $data.menuOpened = !$data.menuOpened;
        })
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "menu-icon", {}, function () {
        return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_svg_icon, {
          name: "menu"
        })];
      })])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), $props.menuActions.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Transition"], {
        key: 1,
        name: "vac-slide-left"
      }, {
        "default": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
          return [$data.menuOpened ? Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", RoomHeadervue_type_template_id_7d349216_hoisted_7, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", RoomHeadervue_type_template_id_7d349216_hoisted_8, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])($props.menuActions, function (action) {
            return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
              key: action.name
            }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
              "class": "vac-menu-item",
              onClick: function onClick($event) {
                return $options.menuActionHandler(action);
              }
            }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(action.title), 9, RoomHeadervue_type_template_id_7d349216_hoisted_9)]);
          }), 128))])])), [[_directive_click_outside, $options.closeMenu]]) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)];
        }),
        _: 1
      })) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)];
    }) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])];
  })]);
}
// CONCATENATED MODULE: ./src/lib/Room/RoomHeader/RoomHeader.vue?vue&type=template&id=7d349216

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/Room/RoomHeader/RoomHeader.vue?vue&type=script&lang=js






/* harmony default export */ var RoomHeadervue_type_script_lang_js = ({
  name: 'RoomHeader',
  directives: {
    clickOutside: v_click_outside_umd_default.a.directive
  },
  components: {
    SvgIcon: SvgIcon
  },
  props: {
    currentUserId: {
      type: [String, Number],
      required: true
    },
    textMessages: {
      type: Object,
      required: true
    },
    singleRoom: {
      type: Boolean,
      required: true
    },
    showRoomsList: {
      type: Boolean,
      required: true
    },
    isMobile: {
      type: Boolean,
      required: true
    },
    roomInfo: {
      type: Function,
      "default": null
    },
    menuActions: {
      type: Array,
      required: true
    },
    room: {
      type: Object,
      required: true
    }
  },
  data: function data() {
    return {
      menuOpened: false
    };
  },
  computed: {
    typingUsers: function typingUsers() {
      return typing_text(this.room, this.currentUserId, this.textMessages);
    },
    userStatus: function userStatus() {
      var _this = this;

      if (!this.room.users || this.room.users.length !== 2) return;
      var user = this.room.users.find(function (u) {
        return u._id !== _this.currentUserId;
      });
      if (!user.status) return;
      var text = '';

      if (user.status.state === 'online') {
        text = this.textMessages.IS_ONLINE;
      } else if (user.status.lastChanged) {
        text = this.textMessages.LAST_SEEN + user.status.lastChanged;
      }

      return text;
    }
  },
  methods: {
    menuActionHandler: function menuActionHandler(action) {
      this.closeMenu();
      this.$emit('menu-action-handler', action);
    },
    closeMenu: function closeMenu() {
      this.menuOpened = false;
    }
  }
});
// CONCATENATED MODULE: ./src/lib/Room/RoomHeader/RoomHeader.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/lib/Room/RoomHeader/RoomHeader.vue





const RoomHeader_exports_ = /*#__PURE__*/exportHelper_default()(RoomHeadervue_type_script_lang_js, [['render',RoomHeadervue_type_template_id_7d349216_render]])

/* harmony default export */ var RoomHeader = (RoomHeader_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/Room/RoomMessageReply/RoomMessageReply.vue?vue&type=template&id=1e0cd92c

var RoomMessageReplyvue_type_template_id_1e0cd92c_hoisted_1 = {
  "class": "vac-reply-box"
};
var RoomMessageReplyvue_type_template_id_1e0cd92c_hoisted_2 = ["src"];
var RoomMessageReplyvue_type_template_id_1e0cd92c_hoisted_3 = {
  "class": "vac-reply-info"
};
var RoomMessageReplyvue_type_template_id_1e0cd92c_hoisted_4 = {
  "class": "vac-reply-username"
};
var RoomMessageReplyvue_type_template_id_1e0cd92c_hoisted_5 = {
  "class": "vac-reply-content"
};
var RoomMessageReplyvue_type_template_id_1e0cd92c_hoisted_6 = {
  "class": "vac-icon-reply"
};
function RoomMessageReplyvue_type_template_id_1e0cd92c_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_format_message = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("format-message");

  var _component_svg_icon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("svg-icon");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Transition"], {
    name: "vac-slide-up"
  }, {
    "default": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      return [$props.messageReply ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
        key: 0,
        "class": "vac-reply-container",
        style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
          bottom: "".concat(_ctx.$parent.$refs.roomFooter.clientHeight, "px")
        })
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", RoomMessageReplyvue_type_template_id_1e0cd92c_hoisted_1, [$options.isImageFile ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("img", {
        key: 0,
        src: $props.messageReply.file.url,
        "class": "vac-image-reply"
      }, null, 8, RoomMessageReplyvue_type_template_id_1e0cd92c_hoisted_2)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", RoomMessageReplyvue_type_template_id_1e0cd92c_hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", RoomMessageReplyvue_type_template_id_1e0cd92c_hoisted_4, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($props.messageReply.username), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", RoomMessageReplyvue_type_template_id_1e0cd92c_hoisted_5, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_format_message, {
        content: $props.messageReply.content,
        users: $props.room.users,
        "text-formatting": $props.textFormatting,
        "link-options": $props.linkOptions,
        reply: true
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createSlots"])({
        _: 2
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.$slots, function (i, name) {
        return {
          name: name,
          fn: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function (data) {
            return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, name, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeProps"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["guardReactiveProps"])(data)))];
          })
        };
      })]), 1032, ["content", "users", "text-formatting", "link-options"])])])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", RoomMessageReplyvue_type_template_id_1e0cd92c_hoisted_6, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
        "class": "vac-svg-button",
        onClick: _cache[0] || (_cache[0] = function ($event) {
          return _ctx.$emit('reset-message');
        })
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "reply-close-icon", {}, function () {
        return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_svg_icon, {
          name: "close-outline"
        })];
      })])])], 4)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)];
    }),
    _: 3
  });
}
// CONCATENATED MODULE: ./src/lib/Room/RoomMessageReply/RoomMessageReply.vue?vue&type=template&id=1e0cd92c

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/Room/RoomMessageReply/RoomMessageReply.vue?vue&type=script&lang=js



var RoomMessageReplyvue_type_script_lang_js_require = __webpack_require__("bd43"),
    _isImageFile = RoomMessageReplyvue_type_script_lang_js_require.isImageFile;

/* harmony default export */ var RoomMessageReplyvue_type_script_lang_js = ({
  name: 'RoomMessageReply',
  components: {
    SvgIcon: SvgIcon,
    FormatMessage: FormatMessage
  },
  props: {
    room: {
      type: Object,
      required: true
    },
    messageReply: {
      type: Object,
      "default": null
    },
    textFormatting: {
      type: Boolean,
      required: true
    },
    linkOptions: {
      type: Object,
      required: true
    }
  },
  computed: {
    isImageFile: function isImageFile() {
      return _isImageFile(this.messageReply.file);
    }
  }
});
// CONCATENATED MODULE: ./src/lib/Room/RoomMessageReply/RoomMessageReply.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/lib/Room/RoomMessageReply/RoomMessageReply.vue





const RoomMessageReply_exports_ = /*#__PURE__*/exportHelper_default()(RoomMessageReplyvue_type_script_lang_js, [['render',RoomMessageReplyvue_type_template_id_1e0cd92c_render]])

/* harmony default export */ var RoomMessageReply = (RoomMessageReply_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/Room/RoomUsersTag/RoomUsersTag.vue?vue&type=template&id=2af3aeb1

var RoomUsersTagvue_type_template_id_2af3aeb1_hoisted_1 = ["onClick"];
var RoomUsersTagvue_type_template_id_2af3aeb1_hoisted_2 = {
  "class": "vac-tags-info"
};
var RoomUsersTagvue_type_template_id_2af3aeb1_hoisted_3 = {
  "class": "vac-tags-username"
};
function RoomUsersTagvue_type_template_id_2af3aeb1_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Transition"], {
    name: "vac-slide-up"
  }, {
    "default": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      return [$props.filteredUsersTag.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
        key: 0,
        "class": "vac-tags-container vac-app-box-shadow",
        style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
          bottom: "".concat(_ctx.$parent.$refs.roomFooter.clientHeight, "px")
        })
      }, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])($props.filteredUsersTag, function (user) {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
          key: user._id,
          "class": "vac-tags-box",
          onClick: function onClick($event) {
            return _ctx.$emit('select-user-tag', user);
          }
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", RoomUsersTagvue_type_template_id_2af3aeb1_hoisted_2, [user.avatar ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
          key: 0,
          "class": "vac-avatar vac-tags-avatar",
          style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
            'background-image': "url('".concat(user.avatar, "')")
          })
        }, null, 4)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", RoomUsersTagvue_type_template_id_2af3aeb1_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(user.username), 1)])], 8, RoomUsersTagvue_type_template_id_2af3aeb1_hoisted_1);
      }), 128))], 4)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)];
    }),
    _: 1
  });
}
// CONCATENATED MODULE: ./src/lib/Room/RoomUsersTag/RoomUsersTag.vue?vue&type=template&id=2af3aeb1

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/Room/RoomUsersTag/RoomUsersTag.vue?vue&type=script&lang=js
/* harmony default export */ var RoomUsersTagvue_type_script_lang_js = ({
  name: 'RoomUsersTag',
  props: {
    filteredUsersTag: {
      type: Array,
      required: true
    }
  }
});
// CONCATENATED MODULE: ./src/lib/Room/RoomUsersTag/RoomUsersTag.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/lib/Room/RoomUsersTag/RoomUsersTag.vue





const RoomUsersTag_exports_ = /*#__PURE__*/exportHelper_default()(RoomUsersTagvue_type_script_lang_js, [['render',RoomUsersTagvue_type_template_id_2af3aeb1_render]])

/* harmony default export */ var RoomUsersTag = (RoomUsersTag_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/Room/RoomEmojis/RoomEmojis.vue?vue&type=template&id=2c412d91

var RoomEmojisvue_type_template_id_2c412d91_hoisted_1 = ["onClick"];
function RoomEmojisvue_type_template_id_2c412d91_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Transition"], {
    name: "vac-slide-up"
  }, {
    "default": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      return [$props.filteredEmojis.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
        key: 0,
        "class": "vac-emojis-container vac-app-box-shadow",
        style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
          bottom: "".concat(_ctx.$parent.$refs.roomFooter.clientHeight, "px")
        })
      }, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])($props.filteredEmojis, function (emoji) {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
          key: emoji,
          "class": "vac-emoji-element",
          onClick: function onClick($event) {
            return _ctx.$emit('select-emoji', emoji);
          }
        }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(emoji), 9, RoomEmojisvue_type_template_id_2c412d91_hoisted_1);
      }), 128))], 4)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)];
    }),
    _: 1
  });
}
// CONCATENATED MODULE: ./src/lib/Room/RoomEmojis/RoomEmojis.vue?vue&type=template&id=2c412d91

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/Room/RoomEmojis/RoomEmojis.vue?vue&type=script&lang=js
/* harmony default export */ var RoomEmojisvue_type_script_lang_js = ({
  name: 'RoomEmojis',
  props: {
    filteredEmojis: {
      type: Array,
      required: true
    }
  }
});
// CONCATENATED MODULE: ./src/lib/Room/RoomEmojis/RoomEmojis.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/lib/Room/RoomEmojis/RoomEmojis.vue





const RoomEmojis_exports_ = /*#__PURE__*/exportHelper_default()(RoomEmojisvue_type_script_lang_js, [['render',RoomEmojisvue_type_template_id_2c412d91_render]])

/* harmony default export */ var RoomEmojis = (RoomEmojis_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/Message/Message.vue?vue&type=template&id=9a087efa

var Messagevue_type_template_id_9a087efa_hoisted_1 = ["id"];
var Messagevue_type_template_id_9a087efa_hoisted_2 = {
  key: 0,
  "class": "vac-card-info vac-card-date"
};
var Messagevue_type_template_id_9a087efa_hoisted_3 = {
  key: 1,
  "class": "vac-line-new"
};
var Messagevue_type_template_id_9a087efa_hoisted_4 = {
  key: 2,
  "class": "vac-card-info vac-card-system"
};
var Messagevue_type_template_id_9a087efa_hoisted_5 = {
  key: 2
};
var Messagevue_type_template_id_9a087efa_hoisted_6 = {
  key: 5,
  "class": "vac-video-container"
};
var Messagevue_type_template_id_9a087efa_hoisted_7 = {
  width: "100%",
  height: "100%",
  controls: ""
};
var Messagevue_type_template_id_9a087efa_hoisted_8 = ["src"];
var Messagevue_type_template_id_9a087efa_hoisted_9 = {
  key: 7,
  "class": "vac-file-message"
};
var Messagevue_type_template_id_9a087efa_hoisted_10 = {
  "class": "vac-file-info"
};
var Messagevue_type_template_id_9a087efa_hoisted_11 = {
  "class": "vac-file-name"
};
var Messagevue_type_template_id_9a087efa_hoisted_12 = {
  "class": "vac-file-size"
};
var Messagevue_type_template_id_9a087efa_hoisted_13 = {
  key: 8,
  "class": "vac-progress-time"
};
var Messagevue_type_template_id_9a087efa_hoisted_14 = {
  "class": "vac-text-timestamp"
};
var Messagevue_type_template_id_9a087efa_hoisted_15 = {
  key: 0,
  "class": "vac-icon-edited"
};
var Messagevue_type_template_id_9a087efa_hoisted_16 = {
  key: 1
};
function Messagevue_type_template_id_9a087efa_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_format_message = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("format-message");

  var _component_message_reply = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("message-reply");

  var _component_svg_icon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("svg-icon");

  var _component_message_image = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("message-image");

  var _component_audio_player = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("audio-player");

  var _component_message_actions = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("message-actions");

  var _component_message_reactions = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("message-reactions");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    id: $props.message._id,
    ref: 'msg' + $props.message._id,
    "class": "vac-message-wrapper"
  }, [$options.showDate ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", Messagevue_type_template_id_9a087efa_hoisted_2, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($props.message.date), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), $data.newMessage._id === $props.message._id ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", Messagevue_type_template_id_9a087efa_hoisted_3, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($props.textMessages.NEW_MESSAGES), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), $props.message.system ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", Messagevue_type_template_id_9a087efa_hoisted_4, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_format_message, {
    content: $props.message.content,
    users: $props.roomUsers,
    "text-formatting": $props.textFormatting,
    "link-options": $props.linkOptions,
    onOpenUserTag: $options.openUserTag
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createSlots"])({
    _: 2
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.$slots, function (i, name) {
    return {
      name: name,
      fn: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function (data) {
        return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, name, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeProps"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["guardReactiveProps"])(data)))];
      })
    };
  })]), 1032, ["content", "users", "text-formatting", "link-options", "onOpenUserTag"])])) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 3,
    "class": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["vac-message-box", {
      'vac-offset-current': $props.message.senderId === $props.currentUserId
    }])
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "message", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeProps"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["guardReactiveProps"])({
    message: $props.message
  })), function () {
    return [$props.message.avatar && $props.message.senderId !== $props.currentUserId ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
      key: 0,
      "class": "vac-avatar",
      style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
        'background-image': "url('".concat($props.message.avatar, "')")
      })
    }, null, 4)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
      "class": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["vac-message-container", {
        'vac-message-container-offset': $options.messageOffset
      }])
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
      "class": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["vac-message-card", {
        'vac-message-highlight': $options.isMessageHover,
        'vac-message-current': $props.message.senderId === $props.currentUserId,
        'vac-message-deleted': $props.message.deleted
      }]),
      onMouseover: _cache[8] || (_cache[8] = function () {
        return $options.onHoverMessage && $options.onHoverMessage.apply($options, arguments);
      }),
      onMouseleave: _cache[9] || (_cache[9] = function () {
        return $options.onLeaveMessage && $options.onLeaveMessage.apply($options, arguments);
      })
    }, [($props.roomUsers.length > 2 || $props.forceUsername) && $props.message.senderId !== $props.currentUserId ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
      key: 0,
      "class": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["vac-text-username", {
        'vac-username-reply': !$props.message.deleted && $props.message.replyMessage
      }])
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($props.message.username), 1)], 2)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), !$props.message.deleted && $props.message.replyMessage ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_message_reply, {
      key: 1,
      message: $props.message,
      "room-users": $props.roomUsers,
      "text-formatting": $props.textFormatting,
      "link-options": $props.linkOptions
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createSlots"])({
      _: 2
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.$slots, function (i, name) {
      return {
        name: name,
        fn: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function (data) {
          return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, name, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeProps"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["guardReactiveProps"])(data)))];
        })
      };
    })]), 1032, ["message", "room-users", "text-formatting", "link-options"])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), $props.message.deleted ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", Messagevue_type_template_id_9a087efa_hoisted_5, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "deleted-icon", {}, function () {
      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_svg_icon, {
        name: "deleted",
        "class": "vac-icon-deleted"
      })];
    }), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($props.textMessages.MESSAGE_DELETED), 1)])) : !$props.message.file ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_format_message, {
      key: 3,
      content: $props.message.content,
      users: $props.roomUsers,
      "text-formatting": $props.textFormatting,
      "link-options": $props.linkOptions,
      onOpenUserTag: $options.openUserTag
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createSlots"])({
      _: 2
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.$slots, function (i, name) {
      return {
        name: name,
        fn: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function (data) {
          return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, name, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeProps"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["guardReactiveProps"])(data)))];
        })
      };
    })]), 1032, ["content", "users", "text-formatting", "link-options", "onOpenUserTag"])) : $options.isImage ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_message_image, {
      key: 4,
      "current-user-id": $props.currentUserId,
      message: $props.message,
      "room-users": $props.roomUsers,
      "text-formatting": $props.textFormatting,
      "link-options": $props.linkOptions,
      "image-hover": $data.imageHover,
      onOpenFile: $options.openFile
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createSlots"])({
      _: 2
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.$slots, function (i, name) {
      return {
        name: name,
        fn: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function (data) {
          return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, name, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeProps"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["guardReactiveProps"])(data)))];
        })
      };
    })]), 1032, ["current-user-id", "message", "room-users", "text-formatting", "link-options", "image-hover", "onOpenFile"])) : $options.isVideo ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", Messagevue_type_template_id_9a087efa_hoisted_6, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("video", Messagevue_type_template_id_9a087efa_hoisted_7, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("source", {
      src: $props.message.file.url
    }, null, 8, Messagevue_type_template_id_9a087efa_hoisted_8)])])) : $options.isAudio ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_audio_player, {
      key: 6,
      src: $props.message.file.url,
      onUpdateProgressTime: _cache[0] || (_cache[0] = function ($event) {
        return $data.progressTime = $event;
      }),
      onHoverAudioProgress: _cache[1] || (_cache[1] = function ($event) {
        return $data.hoverAudioProgress = $event;
      })
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createSlots"])({
      _: 2
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.$slots, function (i, name) {
      return {
        name: name,
        fn: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function (data) {
          return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, name, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeProps"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["guardReactiveProps"])(data)))];
        })
      };
    })]), 1032, ["src"])) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", Messagevue_type_template_id_9a087efa_hoisted_9, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", Messagevue_type_template_id_9a087efa_hoisted_10, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
      "class": "vac-svg-button vac-icon-file",
      onClick: _cache[2] || (_cache[2] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(function ($event) {
        return $options.openFile('download');
      }, ["stop"]))
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "document-icon", {}, function () {
      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_svg_icon, {
        name: "document"
      })];
    })]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", Messagevue_type_template_id_9a087efa_hoisted_11, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($props.message.content), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", Messagevue_type_template_id_9a087efa_hoisted_12, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($options.fileSize), 1)])), $options.isAudio && !$props.message.deleted ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", Messagevue_type_template_id_9a087efa_hoisted_13, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($data.progressTime), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", Messagevue_type_template_id_9a087efa_hoisted_14, [$props.message.edited && !$props.message.deleted ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", Messagevue_type_template_id_9a087efa_hoisted_15, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "pencil-icon", {}, function () {
      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_svg_icon, {
        name: "pencil"
      })];
    })])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($props.message.timestamp), 1), $options.isCheckmarkVisible ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", Messagevue_type_template_id_9a087efa_hoisted_16, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "checkmark-icon", Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeProps"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["guardReactiveProps"])({
      message: $props.message
    })), function () {
      return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_svg_icon, {
        name: $props.message.distributed ? 'double-checkmark' : 'checkmark',
        param: $props.message.seen ? 'seen' : '',
        "class": "vac-icon-check"
      }, null, 8, ["name", "param"])];
    })])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), !$props.roomReadonly ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_message_actions, {
      key: 9,
      "current-user-id": $props.currentUserId,
      message: $props.message,
      "message-actions": $props.messageActions,
      "room-footer-ref": $props.roomFooterRef,
      "show-reaction-emojis": $props.showReactionEmojis,
      "hide-options": $props.hideOptions,
      "message-hover": $data.messageHover,
      "hover-message-id": $data.hoverMessageId,
      "hover-audio-progress": $data.hoverAudioProgress,
      onHideOptions: _cache[3] || (_cache[3] = function ($event) {
        return _ctx.$emit('hide-options', false);
      }),
      onUpdateMessageHover: _cache[4] || (_cache[4] = function ($event) {
        return $data.messageHover = $event;
      }),
      onUpdateOptionsOpened: _cache[5] || (_cache[5] = function ($event) {
        return $data.optionsOpened = $event;
      }),
      onUpdateEmojiOpened: _cache[6] || (_cache[6] = function ($event) {
        return $data.emojiOpened = $event;
      }),
      onMessageActionHandler: $options.messageActionHandler,
      onSendMessageReaction: _cache[7] || (_cache[7] = function ($event) {
        return $options.sendMessageReaction($event);
      })
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createSlots"])({
      _: 2
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.$slots, function (i, name) {
      return {
        name: name,
        fn: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function (data) {
          return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, name, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeProps"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["guardReactiveProps"])(data)))];
        })
      };
    })]), 1032, ["current-user-id", "message", "message-actions", "room-footer-ref", "show-reaction-emojis", "hide-options", "message-hover", "hover-message-id", "hover-audio-progress", "onMessageActionHandler"])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 34), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_message_reactions, {
      "current-user-id": $props.currentUserId,
      message: $props.message,
      "emojis-list": $props.emojisList,
      onSendMessageReaction: _cache[10] || (_cache[10] = function ($event) {
        return $options.sendMessageReaction($event);
      })
    }, null, 8, ["current-user-id", "message", "emojis-list"])], 2)];
  })], 2))], 8, Messagevue_type_template_id_9a087efa_hoisted_1);
}
// CONCATENATED MODULE: ./src/lib/Message/Message.vue?vue&type=template&id=9a087efa

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.to-fixed.js
var es_number_to_fixed = __webpack_require__("b680");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.reduce.js
var es_array_reduce = __webpack_require__("13d5");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/Message/MessageReply/MessageReply.vue?vue&type=template&id=1d339754

var MessageReplyvue_type_template_id_1d339754_hoisted_1 = {
  "class": "vac-reply-message"
};
var MessageReplyvue_type_template_id_1d339754_hoisted_2 = {
  "class": "vac-reply-username"
};
var MessageReplyvue_type_template_id_1d339754_hoisted_3 = {
  key: 0,
  "class": "vac-image-reply-container"
};
var MessageReplyvue_type_template_id_1d339754_hoisted_4 = {
  key: 1,
  "class": "vac-video-reply-container"
};
var MessageReplyvue_type_template_id_1d339754_hoisted_5 = {
  width: "100%",
  height: "100%",
  controls: ""
};
var MessageReplyvue_type_template_id_1d339754_hoisted_6 = ["src"];
var MessageReplyvue_type_template_id_1d339754_hoisted_7 = {
  "class": "vac-reply-content"
};
function MessageReplyvue_type_template_id_1d339754_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_audio_player = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("audio-player");

  var _component_format_message = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("format-message");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", MessageReplyvue_type_template_id_1d339754_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", MessageReplyvue_type_template_id_1d339754_hoisted_2, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($options.replyUsername), 1), $options.isImage ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", MessageReplyvue_type_template_id_1d339754_hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    "class": "vac-message-image vac-message-image-reply",
    style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
      'background-image': "url('".concat($props.message.replyMessage.file.url, "')")
    })
  }, null, 4)])) : $options.isVideo ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", MessageReplyvue_type_template_id_1d339754_hoisted_4, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("video", MessageReplyvue_type_template_id_1d339754_hoisted_5, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("source", {
    src: $props.message.replyMessage.file.url
  }, null, 8, MessageReplyvue_type_template_id_1d339754_hoisted_6)])])) : $options.isAudio ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_audio_player, {
    key: 2,
    src: $props.message.replyMessage.file.url,
    onUpdateProgressTime: _cache[0] || (_cache[0] = function ($event) {
      return _ctx.progressTime = $event;
    }),
    onHoverAudioProgress: _cache[1] || (_cache[1] = function ($event) {
      return _ctx.hoverAudioProgress = $event;
    })
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createSlots"])({
    _: 2
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.$slots, function (i, name) {
    return {
      name: name,
      fn: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function (data) {
        return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, name, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeProps"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["guardReactiveProps"])(data)))];
      })
    };
  })]), 1032, ["src"])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", MessageReplyvue_type_template_id_1d339754_hoisted_7, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_format_message, {
    content: $props.message.replyMessage.content,
    users: $props.roomUsers,
    "text-formatting": $props.textFormatting,
    "link-options": $props.linkOptions,
    reply: true
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createSlots"])({
    _: 2
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.$slots, function (i, name) {
    return {
      name: name,
      fn: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function (data) {
        return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, name, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeProps"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["guardReactiveProps"])(data)))];
      })
    };
  })]), 1032, ["content", "users", "text-formatting", "link-options"])])]);
}
// CONCATENATED MODULE: ./src/lib/Message/MessageReply/MessageReply.vue?vue&type=template&id=1d339754

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/Message/AudioPlayer/AudioPlayer.vue?vue&type=template&id=706d5ffd

var AudioPlayervue_type_template_id_706d5ffd_hoisted_1 = {
  "class": "vac-audio-player"
};
var AudioPlayervue_type_template_id_706d5ffd_hoisted_2 = ["id", "src"];
function AudioPlayervue_type_template_id_706d5ffd_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_svg_icon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("svg-icon");

  var _component_audio_control = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("audio-control");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", null, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", AudioPlayervue_type_template_id_706d5ffd_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    "class": "vac-svg-button",
    onClick: _cache[0] || (_cache[0] = function () {
      return $options.playback && $options.playback.apply($options, arguments);
    })
  }, [$data.isPlaying ? Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "audio-pause-icon", {
    key: 0
  }, function () {
    return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_svg_icon, {
      name: "audio-pause"
    })];
  }) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "audio-play-icon", {
    key: 1
  }, function () {
    return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_svg_icon, {
      name: "audio-play"
    })];
  })]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_audio_control, {
    percentage: $data.progress,
    onChangeLinehead: $options.onUpdateProgress,
    onHoverAudioProgress: _cache[1] || (_cache[1] = function ($event) {
      return _ctx.$emit('hover-audio-progress', $event);
    })
  }, null, 8, ["percentage", "onChangeLinehead"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("audio", {
    id: $options.playerUniqId,
    src: $options.audioSource
  }, null, 8, AudioPlayervue_type_template_id_706d5ffd_hoisted_2)])]);
}
// CONCATENATED MODULE: ./src/lib/Message/AudioPlayer/AudioPlayer.vue?vue&type=template&id=706d5ffd

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/Message/AudioControl/AudioControl.vue?vue&type=template&id=d1701864

var AudioControlvue_type_template_id_d1701864_hoisted_1 = {
  "class": "vac-player-progress"
};
var AudioControlvue_type_template_id_d1701864_hoisted_2 = {
  "class": "vac-line-container"
};
function AudioControlvue_type_template_id_d1701864_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    ref: "progress",
    "class": "vac-player-bar",
    onMousedown: _cache[0] || (_cache[0] = function () {
      return $options.onMouseDown && $options.onMouseDown.apply($options, arguments);
    }),
    onMouseover: _cache[1] || (_cache[1] = function ($event) {
      return _ctx.$emit('hover-audio-progress', true);
    }),
    onMouseout: _cache[2] || (_cache[2] = function ($event) {
      return _ctx.$emit('hover-audio-progress', false);
    })
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", AudioControlvue_type_template_id_d1701864_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", AudioControlvue_type_template_id_d1701864_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    "class": "vac-line-progress",
    style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
      width: "".concat($props.percentage, "%")
    })
  }, null, 4), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    "class": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["vac-line-dot", {
      'vac-line-dot__active': $data.isMouseDown
    }]),
    style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
      left: "".concat($props.percentage, "%")
    })
  }, null, 6)])])], 544);
}
// CONCATENATED MODULE: ./src/lib/Message/AudioControl/AudioControl.vue?vue&type=template&id=d1701864

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/Message/AudioControl/AudioControl.vue?vue&type=script&lang=js

/* harmony default export */ var AudioControlvue_type_script_lang_js = ({
  props: {
    percentage: {
      type: Number,
      "default": 0
    }
  },
  data: function data() {
    return {
      isMouseDown: false
    };
  },
  methods: {
    onMouseDown: function onMouseDown(ev) {
      this.isMouseDown = true;
      var seekPos = this.calculateLineHeadPosition(ev, this.$refs['progress']);
      this.$emit('change-linehead', seekPos);
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    },
    onMouseUp: function onMouseUp(ev) {
      this.isMouseDown = false;
      document.removeEventListener('mouseup', this.onMouseUp);
      document.removeEventListener('mousemove', this.onMouseMove);
      var seekPos = this.calculateLineHeadPosition(ev, this.$refs['progress']);
      this.$emit('change-linehead', seekPos);
    },
    onMouseMove: function onMouseMove(ev) {
      var seekPos = this.calculateLineHeadPosition(ev, this.$refs['progress']);
      this.$emit('change-linehead', seekPos);
    },
    calculateLineHeadPosition: function calculateLineHeadPosition(ev, element) {
      var progressWidth = element.getBoundingClientRect().width;
      var leftPosition = element.getBoundingClientRect().left;
      var pos = (ev.clientX - leftPosition) / progressWidth;
      pos = pos < 0 ? 0 : pos;
      pos = pos > 1 ? 1 : pos;
      return pos;
    }
  }
});
// CONCATENATED MODULE: ./src/lib/Message/AudioControl/AudioControl.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/lib/Message/AudioControl/AudioControl.vue





const AudioControl_exports_ = /*#__PURE__*/exportHelper_default()(AudioControlvue_type_script_lang_js, [['render',AudioControlvue_type_template_id_d1701864_render]])

/* harmony default export */ var AudioControl = (AudioControl_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/Message/AudioPlayer/AudioPlayer.vue?vue&type=script&lang=js






/* harmony default export */ var AudioPlayervue_type_script_lang_js = ({
  name: 'AudioPlayer',
  components: {
    SvgIcon: SvgIcon,
    AudioControl: AudioControl
  },
  props: {
    src: {
      type: String,
      "default": null
    }
  },
  data: function data() {
    return {
      isPlaying: false,
      duration: this.convertTimeMMSS(0),
      playedTime: this.convertTimeMMSS(0),
      progress: 0,
      _uid: 1
    };
  },
  computed: {
    playerUniqId: function playerUniqId() {
      return "audio-player".concat(this._uid);
    },
    audioSource: function audioSource() {
      if (this.src) return this.src;
      this.resetProgress();
      return null;
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.player = document.getElementById(this.playerUniqId);
    this.player.addEventListener('ended', function () {
      _this.isPlaying = false;
    });
    this.player.addEventListener('loadeddata', function () {
      _this.resetProgress();

      _this.duration = _this.convertTimeMMSS(_this.player.duration);

      _this.updateProgressTime();
    });
    this.player.addEventListener('timeupdate', this.onTimeUpdate);
  },
  methods: {
    convertTimeMMSS: function convertTimeMMSS(seconds) {
      return new Date(seconds * 1000).toISOString().substr(14, 5);
    },
    playback: function playback() {
      var _this2 = this;

      if (!this.audioSource) return;
      if (this.isPlaying) this.player.pause();else setTimeout(function () {
        return _this2.player.play();
      });
      this.isPlaying = !this.isPlaying;
    },
    resetProgress: function resetProgress() {
      if (this.isPlaying) this.player.pause();
      this.duration = this.convertTimeMMSS(0);
      this.playedTime = this.convertTimeMMSS(0);
      this.progress = 0;
      this.isPlaying = false;
      this.updateProgressTime();
    },
    onTimeUpdate: function onTimeUpdate() {
      this.playedTime = this.convertTimeMMSS(this.player.currentTime);
      this.progress = this.player.currentTime / this.player.duration * 100;
      this.updateProgressTime();
    },
    onUpdateProgress: function onUpdateProgress(pos) {
      if (pos) this.player.currentTime = pos * this.player.duration;
    },
    updateProgressTime: function updateProgressTime() {
      this.$emit('update-progress-time', this.progress > 1 ? this.playedTime : this.duration);
    }
  }
});
// CONCATENATED MODULE: ./src/lib/Message/AudioPlayer/AudioPlayer.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/lib/Message/AudioPlayer/AudioPlayer.vue





const AudioPlayer_exports_ = /*#__PURE__*/exportHelper_default()(AudioPlayervue_type_script_lang_js, [['render',AudioPlayervue_type_template_id_706d5ffd_render]])

/* harmony default export */ var AudioPlayer = (AudioPlayer_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/Message/MessageReply/MessageReply.vue?vue&type=script&lang=js





var MessageReplyvue_type_script_lang_js_require = __webpack_require__("bd43"),
    MessageReplyvue_type_script_lang_js_isAudioFile = MessageReplyvue_type_script_lang_js_require.isAudioFile,
    isImageFile = MessageReplyvue_type_script_lang_js_require.isImageFile,
    isVideoFile = MessageReplyvue_type_script_lang_js_require.isVideoFile;

/* harmony default export */ var MessageReplyvue_type_script_lang_js = ({
  name: 'MessageReply',
  components: {
    AudioPlayer: AudioPlayer,
    FormatMessage: FormatMessage
  },
  props: {
    message: {
      type: Object,
      required: true
    },
    textFormatting: {
      type: Boolean,
      required: true
    },
    linkOptions: {
      type: Object,
      required: true
    },
    roomUsers: {
      type: Array,
      required: true
    }
  },
  computed: {
    replyUsername: function replyUsername() {
      var senderId = this.message.replyMessage.senderId;
      var replyUser = this.roomUsers.find(function (user) {
        return user._id === senderId;
      });
      return replyUser ? replyUser.username : '';
    },
    isAudio: function isAudio() {
      return MessageReplyvue_type_script_lang_js_isAudioFile(this.message.replyMessage.file);
    },
    isImage: function isImage() {
      return isImageFile(this.message.replyMessage.file);
    },
    isVideo: function isVideo() {
      return isVideoFile(this.message.replyMessage.file);
    }
  }
});
// CONCATENATED MODULE: ./src/lib/Message/MessageReply/MessageReply.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/lib/Message/MessageReply/MessageReply.vue





const MessageReply_exports_ = /*#__PURE__*/exportHelper_default()(MessageReplyvue_type_script_lang_js, [['render',MessageReplyvue_type_template_id_1d339754_render]])

/* harmony default export */ var MessageReply = (MessageReply_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/Message/MessageImage/MessageImage.vue?vue&type=template&id=f911d8da

var MessageImagevue_type_template_id_f911d8da_hoisted_1 = {
  ref: "imageRef",
  "class": "vac-image-container"
};
var MessageImagevue_type_template_id_f911d8da_hoisted_2 = {
  key: 0,
  "class": "vac-image-buttons"
};
function MessageImagevue_type_template_id_f911d8da_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_loader = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("loader");

  var _component_svg_icon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("svg-icon");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", MessageImagevue_type_template_id_f911d8da_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_loader, {
    style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
      top: "".concat($data.imageResponsive.loaderTop, "px")
    }),
    show: $options.isImageLoading
  }, null, 8, ["style", "show"]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    "class": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["vac-message-image", {
      'vac-image-loading': $options.isImageLoading && $props.message.senderId === $props.currentUserId
    }]),
    style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
      'background-image': "url('".concat($options.imageBackground, "')"),
      'max-height': "".concat($data.imageResponsive.maxHeight, "px")
    }),
    onClick: _cache[1] || (_cache[1] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(function ($event) {
      return _ctx.$emit('open-file', 'preview');
    }, ["stop"]))
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Transition"], {
    name: "vac-fade-image"
  }, {
    "default": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      return [$props.imageHover && !$options.isImageLoading ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", MessageImagevue_type_template_id_f911d8da_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
        "class": "vac-svg-button vac-button-download",
        onClick: _cache[0] || (_cache[0] = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withModifiers"])(function ($event) {
          return _ctx.$emit('open-file', 'download');
        }, ["stop"]))
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "document-icon", {}, function () {
        return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_svg_icon, {
          name: "document"
        })];
      })])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)];
    }),
    _: 3
  })], 6)], 512);
}
// CONCATENATED MODULE: ./src/lib/Message/MessageImage/MessageImage.vue?vue&type=template&id=f911d8da

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/Message/MessageImage/MessageImage.vue?vue&type=script&lang=js



 // import FormatMessage from '../../../components/FormatMessage/FormatMessage'

var MessageImagevue_type_script_lang_js_require = __webpack_require__("bd43"),
    MessageImagevue_type_script_lang_js_isImageFile = MessageImagevue_type_script_lang_js_require.isImageFile;

/* harmony default export */ var MessageImagevue_type_script_lang_js = ({
  name: 'MessageImage',
  components: {
    SvgIcon: SvgIcon,
    Loader: Loader
  },
  props: {
    currentUserId: {
      type: [String, Number],
      required: true
    },
    message: {
      type: Object,
      required: true
    },
    // roomUsers: { type: Array, required: true },
    // textFormatting: { type: Boolean, required: true },
    // linkOptions: { type: Object, required: true },
    imageHover: {
      type: Boolean,
      required: true
    }
  },
  data: function data() {
    return {
      imageLoading: false,
      imageResponsive: ''
    };
  },
  computed: {
    isImageLoading: function isImageLoading() {
      return this.message.file.url.indexOf('blob:http') !== -1 || this.imageLoading;
    },
    imageBackground: function imageBackground() {
      return this.isImageLoading ? this.message.file.preview || this.message.file.url : this.message.file.url;
    }
  },
  watch: {
    message: {
      immediate: true,
      handler: function handler() {
        this.checkImgLoad();
      }
    }
  },
  mounted: function mounted() {
    this.imageResponsive = {
      maxHeight: this.$refs.imageRef.clientWidth - 18,
      loaderTop: this.$refs.imageRef.clientWidth / 2
    };
  },
  methods: {
    checkImgLoad: function checkImgLoad() {
      var _this = this;

      if (!MessageImagevue_type_script_lang_js_isImageFile(this.message.file)) return;
      this.imageLoading = true;
      var image = new Image();
      image.src = this.message.file.url;
      image.addEventListener('load', function () {
        return _this.imageLoading = false;
      });
    }
  }
});
// CONCATENATED MODULE: ./src/lib/Message/MessageImage/MessageImage.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/lib/Message/MessageImage/MessageImage.vue





const MessageImage_exports_ = /*#__PURE__*/exportHelper_default()(MessageImagevue_type_script_lang_js, [['render',MessageImagevue_type_template_id_f911d8da_render]])

/* harmony default export */ var MessageImage = (MessageImage_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/Message/MessageActions/MessageActions.vue?vue&type=template&id=1c41aa97


var MessageActionsvue_type_template_id_1c41aa97_hoisted_1 = {
  "class": "vac-message-actions-wrapper"
};
var MessageActionsvue_type_template_id_1c41aa97_hoisted_2 = {
  "class": "vac-menu-list"
};
var MessageActionsvue_type_template_id_1c41aa97_hoisted_3 = ["onClick"];
function MessageActionsvue_type_template_id_1c41aa97_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_svg_icon = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("svg-icon");

  var _component_emoji_picker = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("emoji-picker");

  var _directive_click_outside = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveDirective"])("click-outside");

  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", MessageActionsvue_type_template_id_1c41aa97_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    "class": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["vac-options-container", {
      'vac-options-image': $options.isImage && !$props.message.replyMessage
    }]),
    style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
      display: $props.hoverAudioProgress ? 'none' : 'initial',
      width: $options.filteredMessageActions.length && $props.showReactionEmojis ? '70px' : '45px'
    })
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(external_commonjs_vue_commonjs2_vue_root_Vue_["TransitionGroup"], {
    name: "vac-slide-left",
    tag: "span"
  }, {
    "default": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      return [$options.isMessageActions || $options.isMessageReactions ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
        key: "1",
        "class": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["vac-blur-container", {
          'vac-options-me': $props.message.senderId === $props.currentUserId
        }])
      }, null, 2)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), $options.isMessageActions ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
        ref: "actionIcon",
        key: "2",
        "class": "vac-svg-button vac-message-options",
        onClick: _cache[0] || (_cache[0] = function () {
          return $options.openOptions && $options.openOptions.apply($options, arguments);
        })
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "dropdown-icon", {}, function () {
        return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_svg_icon, {
          name: "dropdown",
          param: "message"
        })];
      })], 512)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), $options.isMessageReactions ? Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_emoji_picker, {
        key: "3",
        "class": "vac-message-emojis",
        style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
          right: $options.isMessageActions ? '30px' : '5px'
        }),
        "emoji-opened": $data.emojiOpened,
        "emoji-reaction": true,
        "room-footer-ref": $props.roomFooterRef,
        "position-right": $props.message.senderId === $props.currentUserId,
        onAddEmoji: $options.sendMessageReaction,
        onOpenEmoji: $options.openEmoji
      }, {
        "emoji-picker-icon": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
          return [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "emoji-picker-reaction-icon")];
        }),
        _: 3
      }, 8, ["style", "emoji-opened", "room-footer-ref", "position-right", "onAddEmoji", "onOpenEmoji"])), [[_directive_click_outside, $options.closeEmoji]]) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)];
    }),
    _: 3
  })], 6), $options.filteredMessageActions.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Transition"], {
    key: 0,
    name: $props.message.senderId === $props.currentUserId ? 'vac-slide-left' : 'vac-slide-right'
  }, {
    "default": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      return [$data.optionsOpened ? Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
        key: 0,
        ref: "menuOptions",
        "class": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["vac-menu-options", {
          'vac-menu-left': $props.message.senderId !== $props.currentUserId
        }]),
        style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
          top: "".concat($data.menuOptionsTop, "px")
        })
      }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", MessageActionsvue_type_template_id_1c41aa97_hoisted_2, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])($options.filteredMessageActions, function (action) {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
          key: action.name
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
          "class": "vac-menu-item",
          onClick: function onClick($event) {
            return $options.messageActionHandler(action);
          }
        }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(action.title), 9, MessageActionsvue_type_template_id_1c41aa97_hoisted_3)]);
      }), 128))])], 6)), [[_directive_click_outside, $options.closeOptions]]) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)];
    }),
    _: 1
  }, 8, ["name"])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]);
}
// CONCATENATED MODULE: ./src/lib/Message/MessageActions/MessageActions.vue?vue&type=template&id=1c41aa97

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/Message/MessageActions/MessageActions.vue?vue&type=script&lang=js









var MessageActionsvue_type_script_lang_js_require = __webpack_require__("bd43"),
    MessageActionsvue_type_script_lang_js_isImageFile = MessageActionsvue_type_script_lang_js_require.isImageFile;

/* harmony default export */ var MessageActionsvue_type_script_lang_js = ({
  name: 'MessageActions',
  directives: {
    clickOutside: v_click_outside_umd_default.a.directive
  },
  components: {
    SvgIcon: SvgIcon,
    EmojiPicker: EmojiPicker
  },
  props: {
    currentUserId: {
      type: [String, Number],
      required: true
    },
    message: {
      type: Object,
      required: true
    },
    messageActions: {
      type: Array,
      required: true
    },
    roomFooterRef: {
      type: HTMLDivElement,
      "default": null
    },
    showReactionEmojis: {
      type: Boolean,
      required: true
    },
    hideOptions: {
      type: Boolean,
      required: true
    },
    messageHover: {
      type: Boolean,
      required: true
    },
    hoverMessageId: {
      type: [String, Number],
      "default": null
    },
    hoverAudioProgress: {
      type: Boolean,
      required: true
    }
  },
  data: function data() {
    return {
      menuOptionsTop: 0,
      optionsOpened: false,
      optionsClosing: false,
      emojiOpened: false
    };
  },
  computed: {
    isImage: function isImage() {
      return MessageActionsvue_type_script_lang_js_isImageFile(this.message.file);
    },
    isMessageActions: function isMessageActions() {
      return this.filteredMessageActions.length && this.messageHover && !this.message.deleted && !this.message.disableActions && !this.hoverAudioProgress;
    },
    isMessageReactions: function isMessageReactions() {
      return this.showReactionEmojis && this.messageHover && !this.message.deleted && !this.message.disableReactions && !this.hoverAudioProgress;
    },
    filteredMessageActions: function filteredMessageActions() {
      var _this = this;

      return this.message.senderId === this.currentUserId ? this.messageActions.filter(function (action) {
        return !action.timeout || new Date() - _this.message.createdDate < 1000 * action.timeout;
      }) : this.messageActions.filter(function (action) {
        return !action.onlyMe;
      });
    }
  },
  watch: {
    emojiOpened: function emojiOpened(val) {
      this.$emit('update-emoji-opened', val);
      if (val) this.optionsOpened = false;
    },
    hideOptions: function hideOptions(val) {
      if (val) {
        this.closeEmoji();
        this.closeOptions();
      }
    },
    optionsOpened: function optionsOpened(val) {
      this.$emit('update-options-opened', val);
    }
  },
  methods: {
    openOptions: function openOptions() {
      var _this2 = this;

      if (this.optionsClosing) return;
      this.optionsOpened = !this.optionsOpened;
      if (!this.optionsOpened) return;
      this.$emit('hide-options', false);
      setTimeout(function () {
        if (!_this2.roomFooterRef || !_this2.$refs.menuOptions || !_this2.$refs.actionIcon) {
          return;
        }

        var menuOptionsTop = _this2.$refs.menuOptions.getBoundingClientRect().height;

        var actionIconTop = _this2.$refs.actionIcon.getBoundingClientRect().top;

        var roomFooterTop = _this2.roomFooterRef.getBoundingClientRect().top;

        var optionsTopPosition = roomFooterTop - actionIconTop > menuOptionsTop + 50;
        if (optionsTopPosition) _this2.menuOptionsTop = 30;else _this2.menuOptionsTop = -menuOptionsTop;
      });
    },
    closeOptions: function closeOptions() {
      var _this3 = this;

      this.optionsOpened = false;
      this.optionsClosing = true;
      this.updateMessageHover();
      setTimeout(function () {
        return _this3.optionsClosing = false;
      }, 100);
    },
    openEmoji: function openEmoji() {
      this.emojiOpened = !this.emojiOpened;
      this.$emit('hide-options', false);
    },
    closeEmoji: function closeEmoji() {
      this.emojiOpened = false;
      this.updateMessageHover();
    },
    updateMessageHover: function updateMessageHover() {
      if (this.hoverMessageId !== this.message._id) {
        this.$emit('update-message-hover', false);
      }
    },
    messageActionHandler: function messageActionHandler(action) {
      this.closeOptions();
      this.$emit('message-action-handler', action);
    },
    sendMessageReaction: function sendMessageReaction(emoji, reaction) {
      this.$emit('send-message-reaction', {
        emoji: emoji,
        reaction: reaction
      });
      this.closeEmoji();
    }
  }
});
// CONCATENATED MODULE: ./src/lib/Message/MessageActions/MessageActions.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/lib/Message/MessageActions/MessageActions.vue





const MessageActions_exports_ = /*#__PURE__*/exportHelper_default()(MessageActionsvue_type_script_lang_js, [['render',MessageActionsvue_type_template_id_1c41aa97_render]])

/* harmony default export */ var MessageActions = (MessageActions_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/Message/MessageReactions/MessageReactions.vue?vue&type=template&id=00ecf2a5


var MessageReactionsvue_type_template_id_00ecf2a5_hoisted_1 = ["onClick"];
function MessageReactionsvue_type_template_id_00ecf2a5_render(_ctx, _cache, $props, $setup, $data, $options) {
  return !$props.message.deleted ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["TransitionGroup"], {
    key: 0,
    name: "vac-slide-left",
    tag: "span"
  }, {
    "default": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(function () {
      return [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])($props.message.reactions, function (reaction, key) {
        return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])((Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
          key: key + 0,
          "class": Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["vac-button-reaction", {
            'vac-reaction-me': reaction.indexOf($props.currentUserId) !== -1
          }]),
          style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
            "float": $props.message.senderId === $props.currentUserId ? 'right' : 'left'
          }),
          onClick: function onClick($event) {
            return $options.sendMessageReaction({
              name: key
            }, reaction);
          }
        }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])($options.getEmojiByName(key)), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(reaction.length), 1)], 14, MessageReactionsvue_type_template_id_00ecf2a5_hoisted_1)), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], reaction.length]]);
      }), 128))];
    }),
    _: 1
  })) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true);
}
// CONCATENATED MODULE: ./src/lib/Message/MessageReactions/MessageReactions.vue?vue&type=template&id=00ecf2a5

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/Message/MessageReactions/MessageReactions.vue?vue&type=script&lang=js

/* harmony default export */ var MessageReactionsvue_type_script_lang_js = ({
  name: 'MessageReactions',
  props: {
    currentUserId: {
      type: [String, Number],
      required: true
    },
    message: {
      type: Object,
      required: true
    },
    emojisList: {
      type: Object,
      required: true
    }
  },
  methods: {
    getEmojiByName: function getEmojiByName(emojiName) {
      return this.emojisList[emojiName];
    },
    sendMessageReaction: function sendMessageReaction(emoji, reaction) {
      this.$emit('send-message-reaction', {
        emoji: emoji,
        reaction: reaction
      });
    }
  }
});
// CONCATENATED MODULE: ./src/lib/Message/MessageReactions/MessageReactions.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/lib/Message/MessageReactions/MessageReactions.vue





const MessageReactions_exports_ = /*#__PURE__*/exportHelper_default()(MessageReactionsvue_type_script_lang_js, [['render',MessageReactionsvue_type_template_id_00ecf2a5_render]])

/* harmony default export */ var MessageReactions = (MessageReactions_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/Message/Message.vue?vue&type=script&lang=js














var Messagevue_type_script_lang_js_require = __webpack_require__("4c1d"),
    messagesValidation = Messagevue_type_script_lang_js_require.messagesValidation;

var _require2 = __webpack_require__("bd43"),
    Messagevue_type_script_lang_js_isImageFile = _require2.isImageFile,
    Messagevue_type_script_lang_js_isVideoFile = _require2.isVideoFile,
    Messagevue_type_script_lang_js_isAudioFile = _require2.isAudioFile;

/* harmony default export */ var Messagevue_type_script_lang_js = ({
  name: 'Message',
  components: {
    SvgIcon: SvgIcon,
    FormatMessage: FormatMessage,
    AudioPlayer: AudioPlayer,
    MessageReply: MessageReply,
    MessageImage: MessageImage,
    MessageActions: MessageActions,
    MessageReactions: MessageReactions
  },
  props: {
    currentUserId: {
      type: [String, Number],
      required: true
    },
    textMessages: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    message: {
      type: Object,
      required: true
    },
    messages: {
      type: Array,
      required: true
    },
    editedMessage: {
      type: Object,
      required: true
    },
    roomUsers: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    messageActions: {
      type: Array,
      required: true
    },
    roomFooterRef: {
      type: HTMLDivElement,
      "default": null
    },
    newMessages: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    showReactionEmojis: {
      type: Boolean,
      required: true
    },
    showNewMessagesDivider: {
      type: Boolean,
      required: true
    },
    textFormatting: {
      type: Boolean,
      required: true
    },
    linkOptions: {
      type: Object,
      required: true
    },
    emojisList: {
      type: Object,
      required: true
    },
    hideOptions: {
      type: Boolean,
      required: true
    },
    forceUsername: {
      type: Boolean,
      "default": false
    },
    roomReadonly: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {
      hoverMessageId: null,
      imageHover: false,
      messageHover: false,
      optionsOpened: false,
      emojiOpened: false,
      newMessage: {},
      progressTime: '- : -',
      hoverAudioProgress: false
    };
  },
  computed: {
    fileSize: function fileSize() {
      var size = this.message.file.size;
      var count = 0;

      while (size >= 1024 && count < 2) {
        size /= 1024;
        count++;
      }

      switch (count) {
        case 0:
          return "".concat(size.toFixed(2), " B");

        case 1:
          return "".concat(size.toFixed(2), " KB");

        default:
          return "".concat(size.toFixed(2), " MB");
      }
    },
    showDate: function showDate() {
      return this.index > 0 && this.message.date !== this.messages[this.index - 1].date;
    },
    messageOffset: function messageOffset() {
      return this.index > 0 && this.message.senderId !== this.messages[this.index - 1].senderId;
    },
    isMessageHover: function isMessageHover() {
      return this.editedMessage._id === this.message._id || this.hoverMessageId === this.message._id;
    },
    isImage: function isImage() {
      return Messagevue_type_script_lang_js_isImageFile(this.message.file);
    },
    isVideo: function isVideo() {
      return Messagevue_type_script_lang_js_isVideoFile(this.message.file);
    },
    isAudio: function isAudio() {
      return Messagevue_type_script_lang_js_isAudioFile(this.message.file);
    },
    isCheckmarkVisible: function isCheckmarkVisible() {
      return this.message.senderId === this.currentUserId && !this.message.deleted && (this.message.saved || this.message.distributed || this.message.seen);
    }
  },
  watch: {
    newMessages: {
      immediate: true,
      handler: function handler(val) {
        if (!val.length || !this.showNewMessagesDivider) {
          return this.newMessage = {};
        }

        this.newMessage = val.reduce(function (res, obj) {
          return obj.index < res.index ? obj : res;
        });
      }
    }
  },
  mounted: function mounted() {
    messagesValidation(this.message);
    this.$emit('message-added', {
      message: this.message,
      index: this.index,
      ref: this.$refs['msg' + this.message._id]
    });
  },
  methods: {
    onHoverMessage: function onHoverMessage() {
      this.imageHover = true;
      this.messageHover = true;
      if (this.canEditMessage()) this.hoverMessageId = this.message._id;
    },
    canEditMessage: function canEditMessage() {
      return !this.message.deleted;
    },
    onLeaveMessage: function onLeaveMessage() {
      this.imageHover = false;
      if (!this.optionsOpened && !this.emojiOpened) this.messageHover = false;
      this.hoverMessageId = null;
    },
    openFile: function openFile(action) {
      this.$emit('open-file', {
        message: this.message,
        action: action
      });
    },
    openUserTag: function openUserTag(user) {
      this.$emit('open-user-tag', {
        user: user
      });
    },
    messageActionHandler: function messageActionHandler(action) {
      var _this = this;

      this.messageHover = false;
      this.hoverMessageId = null;
      setTimeout(function () {
        _this.$emit('message-action-handler', {
          action: action,
          message: _this.message
        });
      }, 300);
    },
    sendMessageReaction: function sendMessageReaction(_ref) {
      var emoji = _ref.emoji,
          reaction = _ref.reaction;
      this.$emit('send-message-reaction', {
        messageId: this.message._id,
        reaction: emoji,
        remove: reaction && reaction.indexOf(this.currentUserId) !== -1
      });
      this.messageHover = false;
    }
  }
});
// CONCATENATED MODULE: ./src/lib/Message/Message.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/lib/Message/Message.vue





const Message_exports_ = /*#__PURE__*/exportHelper_default()(Messagevue_type_script_lang_js, [['render',Messagevue_type_template_id_9a087efa_render]])

/* harmony default export */ var Message = (Message_exports_);
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js


function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js


function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.parse-float.js
var es_parse_float = __webpack_require__("acd8");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array-buffer.slice.js
var es_array_buffer_slice = __webpack_require__("ace4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.int8-array.js
var es_typed_array_int8_array = __webpack_require__("fd87");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.at.js
var es_typed_array_at = __webpack_require__("907a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.copy-within.js
var es_typed_array_copy_within = __webpack_require__("9a8c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.every.js
var es_typed_array_every = __webpack_require__("a975");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.fill.js
var es_typed_array_fill = __webpack_require__("735e");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.filter.js
var es_typed_array_filter = __webpack_require__("c1ac");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.find.js
var es_typed_array_find = __webpack_require__("d139");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.find-index.js
var es_typed_array_find_index = __webpack_require__("3a7b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.for-each.js
var es_typed_array_for_each = __webpack_require__("d5d6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.includes.js
var es_typed_array_includes = __webpack_require__("82f8");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.index-of.js
var es_typed_array_index_of = __webpack_require__("e91f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.iterator.js
var es_typed_array_iterator = __webpack_require__("60bd");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.join.js
var es_typed_array_join = __webpack_require__("5f96");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.last-index-of.js
var es_typed_array_last_index_of = __webpack_require__("3280");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.map.js
var es_typed_array_map = __webpack_require__("3fcc");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.reduce.js
var es_typed_array_reduce = __webpack_require__("ca91");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.reduce-right.js
var es_typed_array_reduce_right = __webpack_require__("25a1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.reverse.js
var es_typed_array_reverse = __webpack_require__("cd26");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.set.js
var es_typed_array_set = __webpack_require__("3c5d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.slice.js
var es_typed_array_slice = __webpack_require__("2954");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.some.js
var es_typed_array_some = __webpack_require__("649e");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.sort.js
var es_typed_array_sort = __webpack_require__("219c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.subarray.js
var es_typed_array_subarray = __webpack_require__("170b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.to-locale-string.js
var es_typed_array_to_locale_string = __webpack_require__("b39a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.to-string.js
var es_typed_array_to_string = __webpack_require__("72f7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.date.now.js
var es_date_now = __webpack_require__("6eba");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.float32-array.js
var es_typed_array_float32_array = __webpack_require__("cfc3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.typed-array.int16-array.js
var es_typed_array_int16_array = __webpack_require__("8b09");

// CONCATENATED MODULE: ./src/utils/mp3-encoder.js








































// Credits to https://github.com/grishkovelli/vue-audio-recorder
var lamejs;

try {
  lamejs = __webpack_require__("db18");
} catch (_) {
  lamejs = {
    missing: true
  };
}

var _lamejs = lamejs,
    Mp3Encoder = _lamejs.Mp3Encoder;

var mp3_encoder_default = /*#__PURE__*/function () {
  function _default(config) {
    _classCallCheck(this, _default);

    if (lamejs.missing) {
      throw new Error('You must add lamejs in your dependencies to use the audio recorder. Please run "npm install lamejs --save"');
    }

    this.bitRate = config.bitRate;
    this.sampleRate = config.sampleRate;
    this.dataBuffer = [];
    this.encoder = new Mp3Encoder(1, this.sampleRate, this.bitRate);
  }

  _createClass(_default, [{
    key: "encode",
    value: function encode(arrayBuffer) {
      var maxSamples = 1152;

      var samples = this._convertBuffer(arrayBuffer);

      var remaining = samples.length;

      for (var i = 0; remaining >= 0; i += maxSamples) {
        var left = samples.subarray(i, i + maxSamples);
        var buffer = this.encoder.encodeBuffer(left);
        this.dataBuffer.push(new Int8Array(buffer));
        remaining -= maxSamples;
      }
    }
  }, {
    key: "finish",
    value: function finish() {
      this.dataBuffer.push(this.encoder.flush());
      var blob = new Blob(this.dataBuffer, {
        type: 'audio/mp3'
      });
      this.dataBuffer = [];
      return {
        id: Date.now(),
        blob: blob,
        url: URL.createObjectURL(blob)
      };
    }
  }, {
    key: "_floatTo16BitPCM",
    value: function _floatTo16BitPCM(input, output) {
      for (var i = 0; i < input.length; i++) {
        var s = Math.max(-1, Math.min(1, input[i]));
        output[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
      }
    }
  }, {
    key: "_convertBuffer",
    value: function _convertBuffer(arrayBuffer) {
      var data = new Float32Array(arrayBuffer);
      var out = new Int16Array(arrayBuffer.length);

      this._floatTo16BitPCM(data, out);

      return out;
    }
  }]);

  return _default;
}();


// CONCATENATED MODULE: ./src/utils/recorder.js








// Credits to https://github.com/grishkovelli/vue-audio-recorder


var recorder_default = /*#__PURE__*/function () {
  function _default() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, _default);

    this.beforeRecording = options.beforeRecording;
    this.pauseRecording = options.pauseRecording;
    this.afterRecording = options.afterRecording;
    this.micFailed = options.micFailed;
    this.encoderOptions = {
      bitRate: 128,
      sampleRate: 44100
    };
    this.bufferSize = 4096;
    this.records = [];
    this.isPause = false;
    this.isRecording = false;
    this.duration = 0;
    this.volume = 0;
    this._duration = 0;
  }

  _createClass(_default, [{
    key: "start",
    value: function start() {
      var constraints = {
        video: false,
        audio: {
          channelCount: 1,
          echoCancellation: false
        }
      };
      this.beforeRecording && this.beforeRecording('start recording');
      navigator.mediaDevices.getUserMedia(constraints).then(this._micCaptured.bind(this))["catch"](this._micError.bind(this));
      this.isPause = false;
      this.isRecording = true;

      if (!this.lameEncoder) {
        this.lameEncoder = new mp3_encoder_default(this.encoderOptions);
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      this.stream.getTracks().forEach(function (track) {
        return track.stop();
      });
      this.input.disconnect();
      this.processor.disconnect();
      this.context.close();
      var record = null;
      record = this.lameEncoder.finish();
      record.duration = this.duration;
      this.records.push(record);
      this._duration = 0;
      this.duration = 0;
      this.isPause = false;
      this.isRecording = false;
      this.afterRecording && this.afterRecording(record);
    }
  }, {
    key: "pause",
    value: function pause() {
      this.stream.getTracks().forEach(function (track) {
        return track.stop();
      });
      this.input.disconnect();
      this.processor.disconnect();
      this._duration = this.duration;
      this.isPause = true;
      this.pauseRecording && this.pauseRecording('pause recording');
    }
  }, {
    key: "_micCaptured",
    value: function _micCaptured(stream) {
      var _this = this;

      this.context = new (window.AudioContext || window.webkitAudioContext)();
      this.duration = this._duration;
      this.input = this.context.createMediaStreamSource(stream);
      this.processor = this.context.createScriptProcessor(this.bufferSize, 1, 1);
      this.stream = stream;

      this.processor.onaudioprocess = function (ev) {
        var sample = ev.inputBuffer.getChannelData(0);
        var sum = 0.0;

        if (_this.lameEncoder) {
          _this.lameEncoder.encode(sample);
        }

        for (var i = 0; i < sample.length; ++i) {
          sum += sample[i] * sample[i];
        }

        _this.duration = parseFloat(_this._duration) + parseFloat(_this.context.currentTime.toFixed(2));
        _this.volume = Math.sqrt(sum / sample.length).toFixed(2);
      };

      this.input.connect(this.processor);
      this.processor.connect(this.context.destination);
    }
  }, {
    key: "_micError",
    value: function _micError(error) {
      this.micFailed && this.micFailed(error);
    }
  }]);

  return _default;
}();


// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/Room/Room.vue?vue&type=script&lang=js












































var Roomvue_type_script_lang_js_require = __webpack_require__("1a98"),
    detectMobile = Roomvue_type_script_lang_js_require.detectMobile,
    iOSDevice = Roomvue_type_script_lang_js_require.iOSDevice;

var Roomvue_type_script_lang_js_require2 = __webpack_require__("bd43"),
    Roomvue_type_script_lang_js_isImageFile = Roomvue_type_script_lang_js_require2.isImageFile,
    Roomvue_type_script_lang_js_isVideoFile = Roomvue_type_script_lang_js_require2.isVideoFile;

/* harmony default export */ var Roomvue_type_script_lang_js = ({
  name: 'Room',
  components: {
    InfiniteLoading: components_InfiniteLoading,
    Loader: Loader,
    SvgIcon: SvgIcon,
    EmojiPicker: EmojiPicker,
    RoomHeader: RoomHeader,
    RoomMessageReply: RoomMessageReply,
    RoomUsersTag: RoomUsersTag,
    RoomEmojis: RoomEmojis,
    Message: Message
  },
  props: {
    currentUserId: {
      type: [String, Number],
      required: true
    },
    textMessages: {
      type: Object,
      required: true
    },
    singleRoom: {
      type: Boolean,
      required: true
    },
    showRoomsList: {
      type: Boolean,
      required: true
    },
    isMobile: {
      type: Boolean,
      required: true
    },
    rooms: {
      type: Array,
      required: true
    },
    roomId: {
      type: [String, Number],
      required: true
    },
    loadFirstRoom: {
      type: Boolean,
      required: true
    },
    messages: {
      type: Array,
      required: true
    },
    roomMessage: {
      type: String,
      "default": null
    },
    messagesLoaded: {
      type: Boolean,
      required: true
    },
    menuActions: {
      type: Array,
      required: true
    },
    messageActions: {
      type: Array,
      required: true
    },
    showSendIcon: {
      type: Boolean,
      required: true
    },
    showFiles: {
      type: Boolean,
      required: true
    },
    showAudio: {
      type: Boolean,
      required: true
    },
    showEmojis: {
      type: Boolean,
      required: true
    },
    showReactionEmojis: {
      type: Boolean,
      required: true
    },
    showNewMessagesDivider: {
      type: Boolean,
      required: true
    },
    showFooter: {
      type: Boolean,
      required: true
    },
    acceptedFiles: {
      type: String,
      required: true
    },
    textFormatting: {
      type: Boolean,
      required: true
    },
    linkOptions: {
      type: Object,
      required: true
    },
    loadingRooms: {
      type: Boolean,
      required: true
    },
    roomInfo: {
      type: Function,
      "default": null
    },
    textareaAction: {
      type: Function,
      "default": null
    },
    forceUsername: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {
      message: '',
      editedMessage: {},
      messageReply: null,
      infiniteState: null,
      loadingMessages: false,
      loadingMoreMessages: false,
      file: null,
      imageFile: null,
      videoFile: null,
      mediaDimensions: null,
      fileDialog: false,
      emojiOpened: false,
      hideOptions: true,
      scrollIcon: false,
      scrollMessagesCount: 0,
      newMessages: [],
      keepKeyboardOpen: false,
      filteredEmojis: [],
      filteredUsersTag: [],
      selectedUsersTag: [],
      textareaCursorPosition: null,
      cursorRangePosition: null,
      recorder: this.initRecorder(),
      isRecording: false,
      format: 'mp3'
    };
  },
  computed: {
    emojisList: function emojisList() {
      var emojisTable = Object.keys(EmojiPicker_emojis).map(function (key) {
        return EmojiPicker_emojis[key];
      });
      return Object.assign.apply(Object, [{}].concat(_toConsumableArray(emojisTable)));
    },
    room: function room() {
      var _this = this;

      return this.rooms.find(function (room) {
        return room.roomId === _this.roomId;
      }) || {};
    },
    showNoMessages: function showNoMessages() {
      return this.room.roomId && !this.messages.length && !this.loadingMessages && !this.loadingRooms;
    },
    showNoRoom: function showNoRoom() {
      var noRoomSelected = !this.rooms.length && !this.loadingRooms || !this.room.roomId && !this.loadFirstRoom;

      if (noRoomSelected) {
        this.loadingMessages = false;
        /* eslint-disable-line vue/no-side-effects-in-computed-properties */
      }

      return noRoomSelected;
    },
    showMessagesStarted: function showMessagesStarted() {
      return this.messages.length && this.messagesLoaded;
    },
    isMessageEmpty: function isMessageEmpty() {
      return !this.file && !this.message.trim();
    },
    recordedTime: function recordedTime() {
      return new Date(this.recorder.duration * 1000).toISOString().substr(14, 5);
    }
  },
  watch: {
    loadingMessages: function loadingMessages(val) {
      if (val) {
        this.infiniteState = null;
      } else {
        if (this.infiniteState) this.infiniteState.loaded();
        this.focusTextarea(true);
      }
    },
    room: {
      immediate: true,
      handler: function handler(newVal, oldVal) {
        if (newVal.roomId && (!oldVal || newVal.roomId !== oldVal.roomId)) {
          this.onRoomChanged();
        }
      }
    },
    roomMessage: {
      immediate: true,
      handler: function handler(val) {
        if (val) this.message = this.roomMessage;
      }
    },
    messages: function messages(newVal, oldVal) {
      var _this2 = this;

      newVal.forEach(function (message, i) {
        if (_this2.showNewMessagesDivider && !message.seen && message.senderId !== _this2.currentUserId) {
          _this2.newMessages.push({
            _id: message._id,
            index: i
          });
        }
      });

      if ((oldVal === null || oldVal === void 0 ? void 0 : oldVal.length) === (newVal === null || newVal === void 0 ? void 0 : newVal.length) - 1) {
        this.newMessages = [];
      }

      if (this.infiniteState) {
        this.infiniteState.loaded();
      }

      setTimeout(function () {
        return _this2.loadingMoreMessages = false;
      });
    },
    messagesLoaded: function messagesLoaded(val) {
      if (val) this.loadingMessages = false;
      if (this.infiniteState) this.infiniteState.complete();
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    this.newMessages = [];
    var isMobile = detectMobile();
    window.addEventListener('keyup', function (e) {
      if (e.key === 'Enter' && !e.shiftKey && !_this3.fileDialog) {
        if (isMobile) {
          _this3.message = _this3.message + '\n';
          setTimeout(function () {
            return _this3.onChangeInput();
          });
        } else {
          _this3.sendMessage();
        }
      }

      _this3.updateFooterList('@');

      _this3.updateFooterList(':');
    }); // this.$refs['roomTextarea'].addEventListener('click', () => {
    // 	if (isMobile) this.keepKeyboardOpen = true
    // 	this.updateFooterList('@')
    // 	this.updateFooterList(':')
    // })
    // this.$refs['roomTextarea'].addEventListener('blur', () => {
    // 	this.resetFooterList()
    // 	if (isMobile) setTimeout(() => (this.keepKeyboardOpen = false))
    // })
  },
  beforeUnmount: function beforeUnmount() {
    this.stopRecorder();
  },
  methods: {
    onRoomChanged: function onRoomChanged() {
      var _this4 = this;

      this.loadingMessages = true;
      this.scrollIcon = false;
      this.scrollMessagesCount = 0;
      this.resetMessage(true, null, true);

      if (this.roomMessage) {
        this.message = this.roomMessage;
        setTimeout(function () {
          return _this4.onChangeInput();
        });
      }

      if (!this.messages.length && this.messagesLoaded) {
        this.loadingMessages = false;
      }

      var unwatch = this.$watch(function () {
        return _this4.messages;
      }, function (val) {
        if (!val || !val.length) return;
        var element = _this4.$refs.scrollContainer;
        if (!element) return;
        unwatch();
        setTimeout(function () {
          element.scrollTo({
            top: element.scrollHeight
          });
          _this4.loadingMessages = false;
        });
      });
    },
    onMessageAdded: function onMessageAdded(_ref) {
      var _this5 = this;

      var message = _ref.message,
          index = _ref.index,
          ref = _ref.ref;
      if (index !== this.messages.length - 1) return;
      var autoScrollOffset = ref.offsetHeight + 60;
      setTimeout(function () {
        if (_this5.getBottomScroll(_this5.$refs.scrollContainer) < autoScrollOffset) {
          _this5.scrollToBottom();
        } else {
          if (message.senderId === _this5.currentUserId) {
            _this5.scrollToBottom();
          } else {
            _this5.scrollIcon = true;
            _this5.scrollMessagesCount++;
          }
        }
      });
    },
    onContainerScroll: function onContainerScroll(e) {
      // this.hideOptions = true;
      if (!e.target) return;
      var bottomScroll = this.getBottomScroll(e.target);
      if (bottomScroll < 60) this.scrollMessagesCount = 0;
      this.scrollIcon = bottomScroll > 500 || this.scrollMessagesCount;
    },
    updateFooterList: function updateFooterList(tagChar) {
      if (!this.$refs['roomTextarea']) return;

      if (tagChar === '@' && (!this.room.users || this.room.users.length <= 2)) {
        return;
      }

      if (this.textareaCursorPosition === this.$refs['roomTextarea'].selectionStart) {
        return;
      }

      this.textareaCursorPosition = this.$refs['roomTextarea'].selectionStart;
      var position = this.textareaCursorPosition;

      while (position > 0 && this.message.charAt(position - 1) !== tagChar && this.message.charAt(position - 1) !== ' ') {
        position--;
      }

      var beforeTag = this.message.charAt(position - 2);
      var notLetterNumber = !beforeTag.match(/^[0-9a-zA-Z]+$/);

      if (this.message.charAt(position - 1) === tagChar && (!beforeTag || beforeTag === ' ' || notLetterNumber)) {
        var query = this.message.substring(position, this.textareaCursorPosition);

        if (tagChar === ':') {
          this.updateEmojis(query);
        } else if (tagChar === '@') {
          this.updateShowUsersTag(query);
        }
      } else {
        this.resetFooterList();
      }
    },
    getCharPosition: function getCharPosition(tagChar) {
      var cursorPosition = this.$refs['roomTextarea'].selectionStart;
      var position = cursorPosition;

      while (position > 0 && this.message.charAt(position - 1) !== tagChar) {
        position--;
      }

      var endPosition = position;

      while (this.message.charAt(endPosition) && this.message.charAt(endPosition).trim()) {
        endPosition++;
      }

      return {
        position: position,
        endPosition: endPosition
      };
    },
    updateEmojis: function updateEmojis(query) {
      var _this6 = this;

      if (!query) return;
      var emojisListKeys = Object.keys(this.emojisList);
      var matchingKeys = emojisListKeys.filter(function (key) {
        return key.startsWith(query);
      });
      this.filteredEmojis = matchingKeys.map(function (key) {
        return _this6.emojisList[key];
      });
    },
    selectEmoji: function selectEmoji(emoji) {
      var _this$getCharPosition = this.getCharPosition(':'),
          position = _this$getCharPosition.position,
          endPosition = _this$getCharPosition.endPosition;

      this.message = this.message.substr(0, position - 1) + emoji + this.message.substr(endPosition, this.message.length - 1);
      this.cursorRangePosition = position;
      this.focusTextarea();
    },
    updateShowUsersTag: function updateShowUsersTag(query) {
      var _this7 = this;

      this.filteredUsersTag = filter_items(this.room.users, 'username', query, true).filter(function (user) {
        return user._id !== _this7.currentUserId;
      });
    },
    selectUserTag: function selectUserTag(user) {
      var _this$getCharPosition2 = this.getCharPosition('@'),
          position = _this$getCharPosition2.position,
          endPosition = _this$getCharPosition2.endPosition;

      var space = this.message.substr(endPosition, endPosition).length ? '' : ' ';
      this.message = this.message.substr(0, position) + user.username + space + this.message.substr(endPosition, this.message.length - 1);
      this.selectedUsersTag = [].concat(_toConsumableArray(this.selectedUsersTag), [_objectSpread2({}, user)]);
      this.cursorRangePosition = position + user.username.length + space.length + 1;
      this.focusTextarea();
    },
    resetFooterList: function resetFooterList() {
      this.filteredEmojis = [];
      this.filteredUsersTag = [];
      this.textareaCursorPosition = null;
    },
    onMediaLoad: function onMediaLoad() {
      var height = this.$refs.mediaFile.clientHeight;
      if (height < 30) height = 30;
      this.mediaDimensions = {
        height: this.$refs.mediaFile.clientHeight - 10,
        width: this.$refs.mediaFile.clientWidth + 26
      };
    },
    escapeTextarea: function escapeTextarea() {
      if (this.filteredEmojis.length) this.filteredEmojis = [];else if (this.filteredUsersTag.length) this.filteredUsersTag = [];else this.resetMessage();
    },
    resetMessage: function resetMessage() {
      var _this8 = this;

      var disableMobileFocus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var editFile = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var initRoom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (!initRoom) {
        this.$emit('typing-message', null);
      }

      if (editFile) {
        this.file = null;
        this.message = '';
        this.preventKeyboardFromClosing();
        setTimeout(function () {
          return _this8.focusTextarea(disableMobileFocus);
        });
        return;
      }

      this.selectedUsersTag = [];
      this.resetFooterList();
      this.resetTextareaSize();
      this.message = '';
      this.editedMessage = {};
      this.messageReply = null;
      this.file = null;
      this.mediaDimensions = null;
      this.imageFile = null;
      this.videoFile = null;
      this.emojiOpened = false;
      this.preventKeyboardFromClosing();
      setTimeout(function () {
        return _this8.focusTextarea(disableMobileFocus);
      });
    },
    resetMediaFile: function resetMediaFile() {
      this.mediaDimensions = null;
      this.imageFile = null;
      this.videoFile = null;
      this.editedMessage.file = null;
      this.file = null;
      this.message = '';
      this.focusTextarea();
    },
    resetTextareaSize: function resetTextareaSize() {
      if (!this.$refs['roomTextarea']) return;
      this.$refs['roomTextarea'].style.height = '20px';
    },
    focusTextarea: function focusTextarea(disableMobileFocus) {
      var _this9 = this;

      if (detectMobile() && disableMobileFocus) return;
      if (!this.$refs['roomTextarea']) return;
      this.$refs['roomTextarea'].focus();

      if (this.cursorRangePosition) {
        setTimeout(function () {
          _this9.$refs['roomTextarea'].setSelectionRange(_this9.cursorRangePosition, _this9.cursorRangePosition);

          _this9.cursorRangePosition = null;
        });
      }
    },
    preventKeyboardFromClosing: function preventKeyboardFromClosing() {
      if (this.keepKeyboardOpen) this.$refs['roomTextarea'].focus();
    },
    sendMessage: function sendMessage() {
      var message = this.message.trim();
      if (!this.file && !message) return;
      this.selectedUsersTag.forEach(function (user) {
        message = message.replace("@".concat(user.username), "<usertag>".concat(user._id, "</usertag>"));
      });

      if (this.editedMessage._id) {
        if (this.editedMessage.content !== message || this.file) {
          this.$emit('edit-message', {
            messageId: this.editedMessage._id,
            newContent: message,
            file: this.file,
            replyMessage: this.messageReply,
            usersTag: this.selectedUsersTag
          });
        }
      } else {
        this.$emit('send-message', {
          content: message,
          file: this.file,
          replyMessage: this.messageReply,
          usersTag: this.selectedUsersTag
        });
      }

      this.resetMessage(true);
    },
    loadMoreMessages: function loadMoreMessages(infiniteState) {
      var _this10 = this;

      // FIX for fast room changing (infinite-loading setTimeout-nature)
      if (!this.messages.length) return;

      if (this.loadingMessages) {
        this.infiniteState = infiniteState;
        return;
      }

      setTimeout(function () {
        if (_this10.loadingMoreMessages) return;

        if (_this10.messagesLoaded || !_this10.room.roomId) {
          return infiniteState.complete();
        }

        _this10.infiniteState = infiniteState;

        _this10.$emit('fetch-messages');

        _this10.loadingMoreMessages = true;
      }, // prevent scroll bouncing issue on iOS devices
      iOSDevice() ? 500 : 0);
    },
    messageActionHandler: function messageActionHandler(_ref2) {
      var action = _ref2.action,
          message = _ref2.message;

      switch (action.name) {
        case 'replyMessage':
          return this.replyMessage(message);

        case 'editMessage':
          return this.editMessage(message);

        case 'deleteMessage':
          return this.$emit('delete-message', message);

        default:
          return this.$emit('message-action-handler', {
            action: action,
            message: message
          });
      }
    },
    sendMessageReaction: function sendMessageReaction(messageReaction) {
      this.$emit('send-message-reaction', messageReaction);
    },
    replyMessage: function replyMessage(message) {
      this.messageReply = message;
      this.focusTextarea();
    },
    editMessage: function editMessage(message) {
      var _this11 = this;

      this.resetMessage();
      this.editedMessage = _objectSpread2({}, message);
      this.file = message.file;

      if (Roomvue_type_script_lang_js_isImageFile(this.file)) {
        this.imageFile = message.file.url;
        setTimeout(function () {
          return _this11.onMediaLoad();
        });
      } else if (Roomvue_type_script_lang_js_isVideoFile(this.file)) {
        this.videoFile = message.file.url;
        setTimeout(function () {
          return _this11.onMediaLoad();
        }, 50);
      }

      this.message = message.content;
    },
    getBottomScroll: function getBottomScroll(element) {
      var scrollHeight = element.scrollHeight,
          clientHeight = element.clientHeight,
          scrollTop = element.scrollTop;
      return scrollHeight - clientHeight - scrollTop;
    },
    scrollToBottom: function scrollToBottom() {
      var _this12 = this;

      setTimeout(function () {
        var element = _this12.$refs.scrollContainer;
        if (!element) return; // fix for fast leaving the page

        element.classList.add('vac-scroll-smooth');
        element.scrollTo({
          top: element.scrollHeight,
          behavior: 'smooth'
        });
        setTimeout(function () {
          return element.classList.remove('vac-scroll-smooth');
        });
      }, 50);
    },
    onChangeInput: function onChangeInput() {
      this.keepKeyboardOpen = true;
      this.resizeTextarea();
      this.$emit('typing-message', this.message);
    },
    resizeTextarea: function resizeTextarea() {
      var el = this.$refs['roomTextarea'];
      if (!el) return;
      var padding = window.getComputedStyle(el, null).getPropertyValue('padding-top').replace('px', '');
      el.style.height = 0;
      el.style.height = el.scrollHeight - padding * 2 + 'px';
    },
    addEmoji: function addEmoji(emoji) {
      this.message += emoji.icon;
      this.focusTextarea(true);
    },
    launchFilePicker: function launchFilePicker() {
      this.$refs.file.value = '';
      this.$refs.file.click();
    },
    onFileChange: function onFileChange(files) {
      var _this13 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var file, fileURL, blobFile, typeIndex;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this13.fileDialog = true;

                _this13.resetMediaFile();

                file = files[0];
                fileURL = URL.createObjectURL(file);
                _context.next = 6;
                return fetch(fileURL).then(function (res) {
                  return res.blob();
                });

              case 6:
                blobFile = _context.sent;
                typeIndex = file.name.lastIndexOf('.');
                _this13.file = {
                  blob: blobFile,
                  name: file.name.substring(0, typeIndex),
                  size: file.size,
                  type: file.type,
                  extension: file.name.substring(typeIndex + 1),
                  url: fileURL
                };

                if (Roomvue_type_script_lang_js_isImageFile(_this13.file)) {
                  _this13.imageFile = fileURL;
                } else if (Roomvue_type_script_lang_js_isVideoFile(_this13.file)) {
                  _this13.videoFile = fileURL;
                  setTimeout(function () {
                    return _this13.onMediaLoad();
                  }, 50);
                } else {
                  _this13.message = file.name;
                }

                setTimeout(function () {
                  return _this13.fileDialog = false;
                }, 500);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    initRecorder: function initRecorder() {
      this.isRecording = false;
      return new recorder_default({
        beforeRecording: null,
        afterRecording: null,
        pauseRecording: null,
        micFailed: this.micFailed
      });
    },
    micFailed: function micFailed() {
      this.isRecording = false;
      this.recorder = this.initRecorder();
    },
    toggleRecorder: function toggleRecorder(recording) {
      var _this14 = this;

      this.isRecording = recording;

      if (!this.recorder.isRecording) {
        setTimeout(function () {
          return _this14.recorder.start();
        }, 200);
      } else {
        try {
          this.recorder.stop();
          var record = this.recorder.records[0];
          this.file = {
            blob: record.blob,
            name: "audio.".concat(this.format),
            size: record.blob.size,
            duration: record.duration,
            type: record.blob.type,
            audio: true,
            url: URL.createObjectURL(record.blob)
          };
          this.recorder = this.initRecorder();
          this.sendMessage();
        } catch (_unused) {
          setTimeout(function () {
            return _this14.stopRecorder();
          }, 100);
        }
      }
    },
    stopRecorder: function stopRecorder() {
      var _this15 = this;

      if (this.recorder.isRecording) {
        try {
          this.recorder.stop();
          this.recorder = this.initRecorder();
        } catch (_unused2) {
          setTimeout(function () {
            return _this15.stopRecorder();
          }, 100);
        }
      }
    },
    openFile: function openFile(_ref3) {
      var message = _ref3.message,
          action = _ref3.action;
      this.$emit('open-file', {
        message: message,
        action: action
      });
    },
    openUserTag: function openUserTag(user) {
      this.$emit('open-user-tag', user);
    },
    textareaActionHandler: function textareaActionHandler() {
      this.$emit('textarea-action-handler', this.message);
    }
  }
});
// CONCATENATED MODULE: ./src/lib/Room/Room.vue?vue&type=script&lang=js
 
// CONCATENATED MODULE: ./src/lib/Room/Room.vue





const Room_exports_ = /*#__PURE__*/exportHelper_default()(Roomvue_type_script_lang_js, [['render',Roomvue_type_template_id_41b8b406_render]])

/* harmony default export */ var Room = (Room_exports_);
// CONCATENATED MODULE: ./src/locales/index.js
/* harmony default export */ var locales = ({
  ROOMS_EMPTY: 'No rooms',
  ROOM_EMPTY: 'No room selected',
  NEW_MESSAGES: 'New Messages',
  MESSAGE_DELETED: 'This message was deleted',
  MESSAGES_EMPTY: 'No messages',
  CONVERSATION_STARTED: 'Conversation started on:',
  TYPE_MESSAGE: 'Type message',
  SEARCH: 'Search',
  IS_ONLINE: 'is online',
  LAST_SEEN: 'last seen ',
  IS_TYPING: 'is writing...'
});
// CONCATENATED MODULE: ./src/themes/index.js


var defaultThemeStyles = {
  light: {
    general: {
      color: '#0a0a0a',
      backgroundInput: '#fff',
      colorPlaceholder: '#9ca6af',
      colorCaret: '#1976d2',
      colorSpinner: '#333',
      borderStyle: '1px solid #e1e4e8',
      backgroundScrollIcon: '#fff'
    },
    container: {
      border: 'none',
      borderRadius: '4px',
      boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)'
    },
    header: {
      background: '#fff',
      colorRoomName: '#0a0a0a',
      colorRoomInfo: '#9ca6af'
    },
    footer: {
      background: '#f8f9fa',
      borderStyleInput: '1px solid #e1e4e8',
      borderInputSelected: '#1976d2',
      backgroundReply: '#e5e5e6',
      backgroundTagActive: '#e5e5e6',
      backgroundTag: '#f8f9fa'
    },
    content: {
      background: '#f8f9fa'
    },
    sidemenu: {
      background: '#fff',
      backgroundHover: '#f6f6f6',
      backgroundActive: '#e5effa',
      colorActive: '#1976d2',
      borderColorSearch: '#e1e5e8'
    },
    dropdown: {
      background: '#fff',
      backgroundHover: '#f6f6f6'
    },
    message: {
      background: '#fff',
      backgroundMe: '#ccf2cf',
      color: '#0a0a0a',
      colorStarted: '#9ca6af',
      backgroundDeleted: '#dadfe2',
      colorDeleted: '#757e85',
      colorUsername: '#9ca6af',
      colorTimestamp: '#828c94',
      backgroundDate: '#e5effa',
      colorDate: '#505a62',
      backgroundSystem: '#e5effa',
      colorSystem: '#505a62',
      backgroundMedia: 'rgba(0, 0, 0, 0.15)',
      backgroundReply: 'rgba(0, 0, 0, 0.08)',
      colorReplyUsername: '#0a0a0a',
      colorReply: '#6e6e6e',
      colorTag: '#0d579c',
      backgroundImage: '#ddd',
      colorNewMessages: '#1976d2',
      backgroundScrollCounter: '#0696c7',
      colorScrollCounter: '#fff',
      backgroundReaction: '#eee',
      borderStyleReaction: '1px solid #eee',
      backgroundReactionHover: '#fff',
      borderStyleReactionHover: '1px solid #ddd',
      colorReactionCounter: '#0a0a0a',
      backgroundReactionMe: '#cfecf5',
      borderStyleReactionMe: '1px solid #3b98b8',
      backgroundReactionHoverMe: '#cfecf5',
      borderStyleReactionHoverMe: '1px solid #3b98b8',
      colorReactionCounterMe: '#0b59b3',
      backgroundAudioRecord: '#eb4034',
      backgroundAudioLine: 'rgba(0, 0, 0, 0.15)',
      backgroundAudioProgress: '#455247',
      backgroundAudioProgressSelector: '#455247',
      colorFileExtension: '#757e85',
      colorFileSize: '#444'
    },
    markdown: {
      background: 'rgba(239, 239, 239, 0.7)',
      border: 'rgba(212, 212, 212, 0.9)',
      color: '#e01e5a',
      colorMulti: '#0a0a0a'
    },
    room: {
      colorUsername: '#0a0a0a',
      colorMessage: '#67717a',
      colorTimestamp: '#a2aeb8',
      colorStateOnline: '#4caf50',
      colorStateOffline: '#9ca6af',
      backgroundCounterBadge: '#0696c7',
      colorCounterBadge: '#fff'
    },
    emoji: {
      background: '#fff'
    },
    icons: {
      search: '#9ca6af',
      add: '#1976d2',
      toggle: '#0a0a0a',
      menu: '#0a0a0a',
      close: '#9ca6af',
      closeImage: '#fff',
      file: '#939393',
      paperclip: '#1976d2',
      closeOutline: '#000',
      closePreview: '#fff',
      send: '#1976d2',
      sendDisabled: '#9ca6af',
      emoji: '#1976d2',
      emojiReaction: 'rgba(0, 0, 0, 0.3)',
      document: '#1976d2',
      pencil: '#9e9e9e',
      checkmark: '#9e9e9e',
      checkmarkSeen: '#0696c7',
      eye: '#fff',
      dropdownMessage: '#fff',
      dropdownMessageBackground: 'rgba(0, 0, 0, 0.25)',
      dropdownRoom: '#9e9e9e',
      dropdownScroll: '#0a0a0a',
      microphone: '#1976d2',
      audioPlay: '#455247',
      audioPause: '#455247',
      audioCancel: '#eb4034',
      audioConfirm: '#1ba65b'
    }
  },
  dark: {
    general: {
      color: '#fff',
      backgroundInput: '#202223',
      colorPlaceholder: '#596269',
      colorCaret: '#fff',
      colorSpinner: '#fff',
      borderStyle: 'none',
      backgroundScrollIcon: '#fff'
    },
    container: {
      border: 'none',
      borderRadius: '4px',
      boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)'
    },
    header: {
      background: '#181a1b',
      colorRoomName: '#fff',
      colorRoomInfo: '#9ca6af'
    },
    footer: {
      background: '#131415',
      borderStyleInput: 'none',
      borderInputSelected: '#1976d2',
      backgroundReply: '#1b1c1c',
      backgroundTagActive: '#1b1c1c',
      backgroundTag: '#131415'
    },
    content: {
      background: '#131415'
    },
    sidemenu: {
      background: '#181a1b',
      backgroundHover: '#202224',
      backgroundActive: '#151617',
      colorActive: '#fff',
      borderColorSearch: '#181a1b'
    },
    dropdown: {
      background: '#2a2c33',
      backgroundHover: '#26282e'
    },
    message: {
      background: '#22242a',
      backgroundMe: '#1f7e80',
      color: '#fff',
      colorStarted: '#9ca6af',
      backgroundDeleted: '#1b1c21',
      colorDeleted: '#a2a5a8',
      colorUsername: '#b3bac9',
      colorTimestamp: '#ebedf2',
      backgroundDate: 'rgba(0, 0, 0, 0.3)',
      colorDate: '#bec5cc',
      backgroundSystem: 'rgba(0, 0, 0, 0.3)',
      colorSystem: '#bec5cc',
      backgroundMedia: 'rgba(0, 0, 0, 0.18)',
      backgroundReply: 'rgba(0, 0, 0, 0.18)',
      colorReplyUsername: '#fff',
      colorReply: '#d6d6d6',
      colorTag: '#f0c60a',
      backgroundImage: '#ddd',
      colorNewMessages: '#fff',
      backgroundScrollCounter: '#1976d2',
      colorScrollCounter: '#fff',
      backgroundReaction: 'none',
      borderStyleReaction: 'none',
      backgroundReactionHover: '#202223',
      borderStyleReactionHover: 'none',
      colorReactionCounter: '#fff',
      backgroundReactionMe: '#4e9ad1',
      borderStyleReactionMe: 'none',
      backgroundReactionHoverMe: '#4e9ad1',
      borderStyleReactionHoverMe: 'none',
      colorReactionCounterMe: '#fff',
      backgroundAudioRecord: '#eb4034',
      backgroundAudioLine: 'rgba(255, 255, 255, 0.15)',
      backgroundAudioProgress: '#b7d4d3',
      backgroundAudioProgressSelector: '#b7d4d3',
      colorFileExtension: '#a2a5a8',
      colorFileSize: '#444'
    },
    markdown: {
      background: 'rgba(239, 239, 239, 0.7)',
      border: 'rgba(212, 212, 212, 0.9)',
      color: '#e01e5a',
      colorMulti: '#0a0a0a'
    },
    room: {
      colorUsername: '#fff',
      colorMessage: '#6c7278',
      colorTimestamp: '#6c7278',
      colorStateOnline: '#4caf50',
      colorStateOffline: '#596269',
      backgroundCounterBadge: '#1976d2',
      colorCounterBadge: '#fff'
    },
    emoji: {
      background: '#343740'
    },
    icons: {
      search: '#596269',
      add: '#fff',
      toggle: '#fff',
      menu: '#fff',
      close: '#9ca6af',
      closeImage: '#fff',
      file: '#1976d2',
      paperclip: '#fff',
      closeOutline: '#fff',
      closePreview: '#fff',
      send: '#fff',
      sendDisabled: '#646a70',
      emoji: '#fff',
      emojiReaction: '#fff',
      document: '#1976d2',
      pencil: '#ebedf2',
      checkmark: '#ebedf2',
      checkmarkSeen: '#f0d90a',
      eye: '#fff',
      dropdownMessage: '#fff',
      dropdownMessageBackground: 'rgba(0, 0, 0, 0.25)',
      dropdownRoom: '#fff',
      dropdownScroll: '#0a0a0a',
      microphone: '#fff',
      audioPlay: '#b7d4d3',
      audioPause: '#b7d4d3',
      audioCancel: '#eb4034',
      audioConfirm: '#1ba65b'
    }
  }
};
var cssThemeVars = function cssThemeVars(_ref) {
  var general = _ref.general,
      container = _ref.container,
      header = _ref.header,
      footer = _ref.footer,
      sidemenu = _ref.sidemenu,
      content = _ref.content,
      dropdown = _ref.dropdown,
      message = _ref.message,
      markdown = _ref.markdown,
      room = _ref.room,
      emoji = _ref.emoji,
      icons = _ref.icons;
  return {
    // general
    '--chat-color': general.color,
    '--chat-bg-color-input': general.backgroundInput,
    '--chat-color-spinner': general.colorSpinner,
    '--chat-color-placeholder': general.colorPlaceholder,
    '--chat-color-caret': general.colorCaret,
    '--chat-border-style': general.borderStyle,
    '--chat-bg-scroll-icon': general.backgroundScrollIcon,
    // container
    '--chat-container-border': container.border,
    '--chat-container-border-radius': container.borderRadius,
    '--chat-container-box-shadow': container.boxShadow,
    // header
    '--chat-header-bg-color': header.background,
    '--chat-header-color-name': header.colorRoomName,
    '--chat-header-color-info': header.colorRoomInfo,
    // footer
    '--chat-footer-bg-color': footer.background,
    '--chat-border-style-input': footer.borderStyleInput,
    '--chat-border-color-input-selected': footer.borderInputSelected,
    '--chat-footer-bg-color-reply': footer.backgroundReply,
    '--chat-footer-bg-color-tag-active': footer.backgroundTagActive,
    '--chat-footer-bg-color-tag': footer.backgroundTag,
    // content
    '--chat-content-bg-color': content.background,
    // sidemenu
    '--chat-sidemenu-bg-color': sidemenu.background,
    '--chat-sidemenu-bg-color-hover': sidemenu.backgroundHover,
    '--chat-sidemenu-bg-color-active': sidemenu.backgroundActive,
    '--chat-sidemenu-color-active': sidemenu.colorActive,
    '--chat-sidemenu-border-color-search': sidemenu.borderColorSearch,
    // dropdown
    '--chat-dropdown-bg-color': dropdown.background,
    '--chat-dropdown-bg-color-hover': dropdown.backgroundHover,
    // message
    '--chat-message-bg-color': message.background,
    '--chat-message-bg-color-me': message.backgroundMe,
    '--chat-message-color-started': message.colorStarted,
    '--chat-message-bg-color-deleted': message.backgroundDeleted,
    '--chat-message-color-deleted': message.colorDeleted,
    '--chat-message-color-username': message.colorUsername,
    '--chat-message-color-timestamp': message.colorTimestamp,
    '--chat-message-bg-color-date': message.backgroundDate,
    '--chat-message-color-date': message.colorDate,
    '--chat-message-bg-color-system': message.backgroundSystem,
    '--chat-message-color-system': message.colorSystem,
    '--chat-message-color': message.color,
    '--chat-message-bg-color-media': message.backgroundMedia,
    '--chat-message-bg-color-reply': message.backgroundReply,
    '--chat-message-color-reply-username': message.colorReplyUsername,
    '--chat-message-color-reply-content': message.colorReply,
    '--chat-message-color-tag': message.colorTag,
    '--chat-message-bg-color-image': message.backgroundImage,
    '--chat-message-color-new-messages': message.colorNewMessages,
    '--chat-message-bg-color-scroll-counter': message.backgroundScrollCounter,
    '--chat-message-color-scroll-counter': message.colorScrollCounter,
    '--chat-message-bg-color-reaction': message.backgroundReaction,
    '--chat-message-border-style-reaction': message.borderStyleReaction,
    '--chat-message-bg-color-reaction-hover': message.backgroundReactionHover,
    '--chat-message-border-style-reaction-hover': message.borderStyleReactionHover,
    '--chat-message-color-reaction-counter': message.colorReactionCounter,
    '--chat-message-bg-color-reaction-me': message.backgroundReactionMe,
    '--chat-message-border-style-reaction-me': message.borderStyleReactionMe,
    '--chat-message-bg-color-reaction-hover-me': message.backgroundReactionHoverMe,
    '--chat-message-border-style-reaction-hover-me': message.borderStyleReactionHoverMe,
    '--chat-message-color-reaction-counter-me': message.colorReactionCounterMe,
    '--chat-message-bg-color-audio-record': message.backgroundAudioRecord,
    '--chat-message-bg-color-audio-line': message.backgroundAudioLine,
    '--chat-message-bg-color-audio-progress': message.backgroundAudioProgress,
    '--chat-message-bg-color-audio-progress-selector': message.backgroundAudioProgressSelector,
    '--chat-message-color-file-extension': message.colorFileExtension,
    '--chat-message-color-file-size': message.colorFileSize,
    // markdown
    '--chat-markdown-bg': markdown.background,
    '--chat-markdown-border': markdown.border,
    '--chat-markdown-color': markdown.color,
    '--chat-markdown-color-multi': markdown.colorMulti,
    // room
    '--chat-room-color-username': room.colorUsername,
    '--chat-room-color-message': room.colorMessage,
    '--chat-room-color-timestamp': room.colorTimestamp,
    '--chat-room-color-online': room.colorStateOnline,
    '--chat-room-color-offline': room.colorStateOffline,
    '--chat-room-bg-color-badge': room.backgroundCounterBadge,
    '--chat-room-color-badge': room.colorCounterBadge,
    // emoji
    '--chat-emoji-bg-color': emoji.background,
    // icons
    '--chat-icon-color-search': icons.search,
    '--chat-icon-color-add': icons.add,
    '--chat-icon-color-toggle': icons.toggle,
    '--chat-icon-color-menu': icons.menu,
    '--chat-icon-color-close': icons.close,
    '--chat-icon-color-close-image': icons.closeImage,
    '--chat-icon-color-file': icons.file,
    '--chat-icon-color-paperclip': icons.paperclip,
    '--chat-icon-color-close-outline': icons.closeOutline,
    '--chat-icon-color-close-preview': icons.closePreview,
    '--chat-icon-color-send': icons.send,
    '--chat-icon-color-send-disabled': icons.sendDisabled,
    '--chat-icon-color-emoji': icons.emoji,
    '--chat-icon-color-emoji-reaction': icons.emojiReaction,
    '--chat-icon-color-document': icons.document,
    '--chat-icon-color-pencil': icons.pencil,
    '--chat-icon-color-checkmark': icons.checkmark,
    '--chat-icon-color-checkmark-seen': icons.checkmarkSeen,
    '--chat-icon-color-eye': icons.eye,
    '--chat-icon-color-dropdown-message': icons.dropdownMessage,
    '--chat-icon-bg-dropdown-message': icons.dropdownMessageBackground,
    '--chat-icon-color-dropdown-room': icons.dropdownRoom,
    '--chat-icon-color-dropdown-scroll': icons.dropdownScroll,
    '--chat-icon-color-microphone': icons.microphone,
    '--chat-icon-color-audio-play': icons.audioPlay,
    '--chat-icon-color-audio-pause': icons.audioPause,
    '--chat-icon-color-audio-cancel': icons.audioCancel,
    '--chat-icon-color-audio-confirm': icons.audioConfirm
  };
};
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/lib/ChatWindow.vue?vue&type=script&lang=js
















var ChatWindowvue_type_script_lang_js_require = __webpack_require__("4c1d"),
    roomsValidation = ChatWindowvue_type_script_lang_js_require.roomsValidation,
    partcipantsValidation = ChatWindowvue_type_script_lang_js_require.partcipantsValidation;

/* harmony default export */ var ChatWindowvue_type_script_lang_js = ({
  name: 'ChatContainer',
  components: {
    RoomsList: RoomsList,
    Room: Room
  },
  props: {
    height: {
      type: String,
      "default": '600px'
    },
    theme: {
      type: String,
      "default": 'light'
    },
    styles: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    responsiveBreakpoint: {
      type: Number,
      "default": 900
    },
    singleRoom: {
      type: Boolean,
      "default": false
    },
    textMessages: {
      type: Object,
      "default": null
    },
    currentUserId: {
      type: [String, Number],
      "default": ''
    },
    rooms: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    loadingRooms: {
      type: Boolean,
      "default": false
    },
    roomsLoaded: {
      type: Boolean,
      "default": false
    },
    roomId: {
      type: [String, Number],
      "default": null
    },
    loadFirstRoom: {
      type: Boolean,
      "default": true
    },
    messages: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    messagesLoaded: {
      type: Boolean,
      "default": false
    },
    roomActions: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    menuActions: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    messageActions: {
      type: Array,
      "default": function _default() {
        return [{
          name: 'replyMessage',
          title: 'Reply'
        }, {
          name: 'editMessage',
          title: 'Edit Message',
          onlyMe: true
        }, {
          name: 'deleteMessage',
          title: 'Delete Message',
          onlyMe: true
        }];
      }
    },
    showSearch: {
      type: Boolean,
      "default": true
    },
    showAddRoom: {
      type: Boolean,
      "default": true
    },
    showSendIcon: {
      type: Boolean,
      "default": true
    },
    showFiles: {
      type: Boolean,
      "default": true
    },
    showAudio: {
      type: Boolean,
      "default": true
    },
    showEmojis: {
      type: Boolean,
      "default": true
    },
    showReactionEmojis: {
      type: Boolean,
      "default": true
    },
    showNewMessagesDivider: {
      type: Boolean,
      "default": true
    },
    showFooter: {
      type: Boolean,
      "default": true
    },
    textFormatting: {
      type: Boolean,
      "default": true
    },
    linkOptions: {
      type: Object,
      "default": function _default() {
        return {
          disabled: false,
          target: '_blank'
        };
      }
    },
    roomMessage: {
      type: String,
      "default": ''
    },
    acceptedFiles: {
      type: String,
      "default": '*'
    },
    forceUsername: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {
      room: {},
      loadingMoreRooms: false,
      showRoomsList: true,
      isMobile: false,
      imagePreview: false
    };
  },
  computed: {
    t: function t() {
      return _objectSpread2(_objectSpread2({}, locales), this.textMessages);
    },
    cssVars: function cssVars() {
      var _this = this;

      var defaultStyles = defaultThemeStyles[this.theme];
      var customStyles = {};
      Object.keys(defaultStyles).map(function (key) {
        customStyles[key] = _objectSpread2(_objectSpread2({}, defaultStyles[key]), _this.styles[key] || {});
      });
      return cssThemeVars(customStyles);
    },
    orderedRooms: function orderedRooms() {
      return this.rooms.slice().sort(function (a, b) {
        var aVal = a.index || 0;
        var bVal = b.index || 0;
        return aVal > bVal ? -1 : bVal > aVal ? 1 : 0;
      });
    }
  },
  watch: {
    rooms: {
      immediate: true,
      handler: function handler(newVal, oldVal) {
        var _this2 = this;

        if (!newVal[0] || !newVal.find(function (room) {
          return room.roomId === _this2.room.roomId;
        })) {
          this.showRoomsList = true;
        }

        if (!this.loadingMoreRooms && this.loadFirstRoom && newVal[0] && (!oldVal || newVal.length !== oldVal.length)) {
          if (this.roomId) {
            var room = newVal.find(function (r) {
              return r.roomId === _this2.roomId;
            }) || {};
            this.fetchRoom({
              room: room
            });
          } else if (!this.isMobile || this.singleRoom) {
            this.fetchRoom({
              room: this.orderedRooms[0]
            });
          } else {
            this.showRoomsList = true;
          }
        }
      }
    },
    loadingRooms: function loadingRooms(val) {
      if (val) this.room = {};
    },
    roomId: {
      immediate: true,
      handler: function handler(newVal, oldVal) {
        if (newVal && !this.loadingRooms && this.rooms.length) {
          var room = this.rooms.find(function (r) {
            return r.roomId === newVal;
          });
          this.fetchRoom({
            room: room
          });
        } else if (oldVal && !newVal) {
          this.room = {};
        }
      }
    },
    room: function room(val) {
      if (!val || Object.entries(val).length === 0) return;
      roomsValidation(val);
      val.users.forEach(function (user) {
        partcipantsValidation(user);
      });
    }
  },
  created: function created() {
    var _this3 = this;

    this.updateResponsive();
    window.addEventListener('resize', function (ev) {
      if (ev.isTrusted) _this3.updateResponsive();
    });
  },
  methods: {
    updateResponsive: function updateResponsive() {
      this.isMobile = window.innerWidth < this.responsiveBreakpoint;
    },
    toggleRoomsList: function toggleRoomsList() {
      this.showRoomsList = !this.showRoomsList;
      if (this.isMobile) this.room = {};
      this.$emit('toggle-rooms-list', {
        opened: this.showRoomsList
      });
    },
    fetchRoom: function fetchRoom(_ref) {
      var room = _ref.room;
      this.room = room;
      this.fetchMessages({
        reset: true
      });
      if (this.isMobile) this.showRoomsList = false;
    },
    fetchMoreRooms: function fetchMoreRooms() {
      this.$emit('fetch-more-rooms');
    },
    roomInfo: function roomInfo() {
      this.$emit('room-info', this.room);
    },
    addRoom: function addRoom() {
      this.$emit('add-room');
    },
    fetchMessages: function fetchMessages(options) {
      this.$emit('fetch-messages', {
        room: this.room,
        options: options
      });
    },
    sendMessage: function sendMessage(message) {
      this.$emit('send-message', _objectSpread2(_objectSpread2({}, message), {}, {
        roomId: this.room.roomId
      }));
    },
    editMessage: function editMessage(message) {
      this.$emit('edit-message', _objectSpread2(_objectSpread2({}, message), {}, {
        roomId: this.room.roomId
      }));
    },
    deleteMessage: function deleteMessage(message) {
      this.$emit('delete-message', {
        message: message,
        roomId: this.room.roomId
      });
    },
    openFile: function openFile(_ref2) {
      var message = _ref2.message,
          action = _ref2.action;

      if (action === 'preview') {
        this.imagePreview = true;
        this.imagePreviewUrl = message.file.url;
      } else {
        this.$emit('open-file', {
          message: message,
          action: action
        });
      }
    },
    openUserTag: function openUserTag(_ref3) {
      var user = _ref3.user;
      this.$emit('open-user-tag', {
        user: user
      });
    },
    menuActionHandler: function menuActionHandler(ev) {
      this.$emit('menu-action-handler', {
        action: ev,
        roomId: this.room.roomId
      });
    },
    roomActionHandler: function roomActionHandler(_ref4) {
      var action = _ref4.action,
          roomId = _ref4.roomId;
      this.$emit('room-action-handler', {
        action: action,
        roomId: roomId
      });
    },
    messageActionHandler: function messageActionHandler(ev) {
      this.$emit('message-action-handler', _objectSpread2(_objectSpread2({}, ev), {}, {
        roomId: this.room.roomId
      }));
    },
    sendMessageReaction: function sendMessageReaction(messageReaction) {
      this.$emit('send-message-reaction', _objectSpread2(_objectSpread2({}, messageReaction), {}, {
        roomId: this.room.roomId
      }));
    },
    typingMessage: function typingMessage(message) {
      this.$emit('typing-message', {
        message: message,
        roomId: this.room.roomId
      });
    },
    textareaActionHandler: function textareaActionHandler(message) {
      this.$emit('textarea-action-handler', {
        message: message,
        roomId: this.room.roomId
      });
    }
  }
});
// CONCATENATED MODULE: ./src/lib/ChatWindow.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./src/lib/ChatWindow.vue?vue&type=style&index=0&id=607979cc&lang=scss
var ChatWindowvue_type_style_index_0_id_607979cc_lang_scss = __webpack_require__("9e69");

// CONCATENATED MODULE: ./src/lib/ChatWindow.vue







const ChatWindow_exports_ = /*#__PURE__*/exportHelper_default()(ChatWindowvue_type_script_lang_js, [['render',render]])

/* harmony default export */ var ChatWindow = (ChatWindow_exports_);
// CONCATENATED MODULE: ./src/lib/index.js


Object.defineProperty(ChatWindow, 'install', {
  configurable: false,
  enumerable: false,
  value: function value(Vue) {
    Vue.component('ChatWindow', ChatWindow);
  }
});
/* harmony default export */ var lib = (ChatWindow);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (lib);



/***/ }),

/***/ "fb6a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var isArray = __webpack_require__("e8b5");
var isConstructor = __webpack_require__("68ee");
var isObject = __webpack_require__("861d");
var toAbsoluteIndex = __webpack_require__("23cb");
var lengthOfArrayLike = __webpack_require__("07fa");
var toIndexedObject = __webpack_require__("fc6a");
var createProperty = __webpack_require__("8418");
var wellKnownSymbol = __webpack_require__("b622");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var un$Slice = __webpack_require__("f36a");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

var SPECIES = wellKnownSymbol('species');
var Array = global.Array;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = lengthOfArrayLike(O);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (isConstructor(Constructor) && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return un$Slice(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),

/***/ "fc6a":
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__("44ad");
var requireObjectCoercible = __webpack_require__("1d80");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "fce3":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var global = __webpack_require__("da84");

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});


/***/ }),

/***/ "fd87":
/***/ (function(module, exports, __webpack_require__) {

var createTypedArrayConstructor = __webpack_require__("74e8");

// `Int8Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Int8', function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "fdbc":
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ "fdbf":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable es-x/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__("4930");

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ })

/******/ });