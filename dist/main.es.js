function __$$styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

import { Component, createElement } from 'react';
import _react__default from 'react';
import reactDom from 'react-dom';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};



function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

var emptyFunction_1 = emptyFunction;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

{
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

var invariant_1 = invariant;

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction_1;

{
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var warning_1 = warning;

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

{
  var invariant$2 = invariant_1;
  var warning$2 = warning_1;
  var ReactPropTypesSecret$2 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant$2(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, _typeof(typeSpecs[typeSpecName]));
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$2);
        } catch (ex) {
          error = ex;
        }
        warning$2(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error === 'undefined' ? 'undefined' : _typeof(error));
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning$2(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

var checkPropTypes_1 = checkPropTypes;

var factoryWithTypeCheckers = function factoryWithTypeCheckers(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret_1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant_1(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
        } else if ("development" !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (!manualPropTypeCallCache[cacheKey] &&
          // Avoid spamming the console because they are often not actionable except for lib authors
          manualPropTypeWarningCount < 3) {
            warning_1(false, 'You are manually calling a React.PropTypes validation ' + 'function for the `%s` prop on `%s`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.', propFullName, componentName);
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction_1.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      warning_1(false, 'Invalid argument supplied to oneOf, expected an instance of array.');
      return emptyFunction_1.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      warning_1(false, 'Invalid argument supplied to oneOfType, expected an instance of array.');
      return emptyFunction_1.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning_1(false, 'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received %s at index %s.', getPostfixForTypeWarning(checker), i);
        return emptyFunction_1.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = objectAssign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue)) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes_1;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var propTypes = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  {
    var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

    var isValidElement = function isValidElement(object) {
      return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    };

    // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod
    var throwOnDirectAccess = true;
    module.exports = factoryWithTypeCheckers(isValidElement, throwOnDirectAccess);
  }
});

var tabbable_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = findTabbableDescendants;
  /*!
   * Adapted from jQuery UI core
   *
   * http://jqueryui.com
   *
   * Copyright 2014 jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   *
   * http://api.jqueryui.com/category/ui-core/
   */

  var tabbableNode = /input|select|textarea|button|object/;

  function hidesContents(element) {
    var zeroSize = element.offsetWidth <= 0 && element.offsetHeight <= 0;

    // If the node is empty, this is good enough
    if (zeroSize && !element.innerHTML) return true;

    // Otherwise we need to check some styles
    var style = window.getComputedStyle(element);
    return zeroSize ? style.getPropertyValue("overflow") !== "visible" : style.getPropertyValue("display") == "none";
  }

  function visible(element) {
    var parentElement = element;
    while (parentElement) {
      if (parentElement === document.body) break;
      if (hidesContents(parentElement)) return false;
      parentElement = parentElement.parentNode;
    }
    return true;
  }

  function focusable(element, isTabIndexNotNaN) {
    var nodeName = element.nodeName.toLowerCase();
    var res = tabbableNode.test(nodeName) && !element.disabled || (nodeName === "a" ? element.href || isTabIndexNotNaN : isTabIndexNotNaN);
    return res && visible(element);
  }

  function tabbable(element) {
    var tabIndex = element.getAttribute("tabindex");
    if (tabIndex === null) tabIndex = undefined;
    var isTabIndexNaN = isNaN(tabIndex);
    return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
  }

  function findTabbableDescendants(element) {
    return [].slice.call(element.querySelectorAll("*"), 0).filter(tabbable);
  }
  module.exports = exports["default"];
});

unwrapExports(tabbable_1);

var focusManager = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.handleBlur = handleBlur;
  exports.handleFocus = handleFocus;
  exports.markForFocusLater = markForFocusLater;
  exports.returnFocus = returnFocus;
  exports.popWithoutFocus = popWithoutFocus;
  exports.setupScopedFocus = setupScopedFocus;
  exports.teardownScopedFocus = teardownScopedFocus;

  var _tabbable2 = _interopRequireDefault(tabbable_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var focusLaterElements = [];
  var modalElement = null;
  var needToFocus = false;

  function handleBlur() {
    needToFocus = true;
  }

  function handleFocus() {
    if (needToFocus) {
      needToFocus = false;
      if (!modalElement) {
        return;
      }
      // need to see how jQuery shims document.on('focusin') so we don't need the
      // setTimeout, firefox doesn't support focusin, if it did, we could focus
      // the element outside of a setTimeout. Side-effect of this implementation
      // is that the document.body gets focus, and then we focus our element right
      // after, seems fine.
      setTimeout(function () {
        if (modalElement.contains(document.activeElement)) {
          return;
        }
        var el = (0, _tabbable2.default)(modalElement)[0] || modalElement;
        el.focus();
      }, 0);
    }
  }

  function markForFocusLater() {
    focusLaterElements.push(document.activeElement);
  }

  /* eslint-disable no-console */
  function returnFocus() {
    var toFocus = null;
    try {
      if (focusLaterElements.length !== 0) {
        toFocus = focusLaterElements.pop();
        toFocus.focus();
      }
      return;
    } catch (e) {
      console.warn(["You tried to return focus to", toFocus, "but it is not in the DOM anymore"].join(" "));
    }
  }
  /* eslint-enable no-console */

  function popWithoutFocus() {
    focusLaterElements.length > 0 && focusLaterElements.pop();
  }

  function setupScopedFocus(element) {
    modalElement = element;

    if (window.addEventListener) {
      window.addEventListener("blur", handleBlur, false);
      document.addEventListener("focus", handleFocus, true);
    } else {
      window.attachEvent("onBlur", handleBlur);
      document.attachEvent("onFocus", handleFocus);
    }
  }

  function teardownScopedFocus() {
    modalElement = null;

    if (window.addEventListener) {
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("focus", handleFocus);
    } else {
      window.detachEvent("onBlur", handleBlur);
      document.detachEvent("onFocus", handleFocus);
    }
  }
});

unwrapExports(focusManager);
var focusManager_1 = focusManager.handleBlur;
var focusManager_2 = focusManager.handleFocus;
var focusManager_3 = focusManager.markForFocusLater;
var focusManager_4 = focusManager.returnFocus;
var focusManager_5 = focusManager.popWithoutFocus;
var focusManager_6 = focusManager.setupScopedFocus;
var focusManager_7 = focusManager.teardownScopedFocus;

var scopeTab_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = scopeTab;

  var _tabbable2 = _interopRequireDefault(tabbable_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function scopeTab(node, event) {
    var tabbable = (0, _tabbable2.default)(node);

    if (!tabbable.length) {
      // Do nothing, since there are no elements that can receive focus.
      event.preventDefault();
      return;
    }

    var shiftKey = event.shiftKey;
    var head = tabbable[0];
    var tail = tabbable[tabbable.length - 1];

    // proceed with default browser behavior
    if (node === document.activeElement) {
      return;
    }

    var target;
    if (tail === document.activeElement && !shiftKey) {
      target = head;
    }

    if (head === document.activeElement && shiftKey) {
      target = tail;
    }

    if (target) {
      event.preventDefault();
      target.focus();
      return;
    }

    // Safari radio issue.
    //
    // Safari does not move the focus to the radio button,
    // so we need to force it to really walk through all elements.
    //
    // This is very error prune, since we are trying to guess
    // if it is a safari browser from the first occurence between
    // chrome or safari.
    //
    // The chrome user agent contains the first ocurrence
    // as the 'chrome/version' and later the 'safari/version'.
    var checkSafari = /(\bChrome\b|\bSafari\b)\//.exec(navigator.userAgent);
    var isSafariDesktop = checkSafari != null && checkSafari[1] != "Chrome" && /\biPod\b|\biPad\b/g.exec(navigator.userAgent) == null;

    // If we are not in safari desktop, let the browser control
    // the focus
    if (!isSafariDesktop) return;

    var x = tabbable.indexOf(document.activeElement);

    if (x > -1) {
      x += shiftKey ? -1 : 1;
    }

    event.preventDefault();

    tabbable[x].focus();
  }
  module.exports = exports["default"];
});

unwrapExports(scopeTab_1);

/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning$3 = function warning() {};

{
  warning$3 = function warning(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.length < 10 || /^[s\W]*$/.test(format)) {
      throw new Error('The warning format should be able to uniquely identify this ' + 'warning. Please, use a more descriptive format than: ' + format);
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    }
  };
}

var browser = warning$3;

var ariaAppHider = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.assertNodeList = assertNodeList;
  exports.setElement = setElement;
  exports.validateElement = validateElement;
  exports.hide = hide;
  exports.show = show;
  exports.documentNotReadyOrSSRTesting = documentNotReadyOrSSRTesting;
  exports.resetForTesting = resetForTesting;

  var _warning2 = _interopRequireDefault(browser);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var globalElement = null;

  function assertNodeList(nodeList, selector) {
    if (!nodeList || !nodeList.length) {
      throw new Error("react-modal: No elements were found for selector " + selector + ".");
    }
  }

  function setElement(element) {
    var useElement = element;
    if (typeof useElement === "string") {
      var el = document.querySelectorAll(useElement);
      assertNodeList(el, useElement);
      useElement = "length" in el ? el[0] : el;
    }
    globalElement = useElement || globalElement;
    return globalElement;
  }

  function validateElement(appElement) {
    if (!appElement && !globalElement) {
      (0, _warning2.default)(false, ["react-modal: App element is not defined.", "Please use `Modal.setAppElement(el)` or set `appElement={el}`.", "This is needed so screen readers don't see main content", "when modal is opened. It is not recommended, but you can opt-out", "by setting `ariaHideApp={false}`."].join(" "));

      return false;
    }

    return true;
  }

  function hide(appElement) {
    if (validateElement(appElement)) {
      (appElement || globalElement).setAttribute("aria-hidden", "true");
    }
  }

  function show(appElement) {
    if (validateElement(appElement)) {
      (appElement || globalElement).removeAttribute("aria-hidden");
    }
  }

  function documentNotReadyOrSSRTesting() {
    globalElement = null;
  }

  function resetForTesting() {
    globalElement = null;
  }
});

unwrapExports(ariaAppHider);
var ariaAppHider_1 = ariaAppHider.assertNodeList;
var ariaAppHider_2 = ariaAppHider.setElement;
var ariaAppHider_3 = ariaAppHider.validateElement;
var ariaAppHider_4 = ariaAppHider.hide;
var ariaAppHider_5 = ariaAppHider.show;
var ariaAppHider_6 = ariaAppHider.documentNotReadyOrSSRTesting;
var ariaAppHider_7 = ariaAppHider.resetForTesting;

var refCount = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.get = get;
  exports.add = add;
  exports.remove = remove;
  exports.totalCount = totalCount;
  var classListMap = {};

  function get() {
    return classListMap;
  }

  function add(bodyClass) {
    // Set variable and default if none
    if (!classListMap[bodyClass]) {
      classListMap[bodyClass] = 0;
    }
    classListMap[bodyClass] += 1;
    return bodyClass;
  }

  function remove(bodyClass) {
    if (classListMap[bodyClass]) {
      classListMap[bodyClass] -= 1;
    }
    return bodyClass;
  }

  function totalCount() {
    return Object.keys(classListMap).reduce(function (acc, curr) {
      return acc + classListMap[curr];
    }, 0);
  }
});

unwrapExports(refCount);
var refCount_1 = refCount.get;
var refCount_2 = refCount.add;
var refCount_3 = refCount.remove;
var refCount_4 = refCount.totalCount;

var bodyClassList = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.add = add;
  exports.remove = remove;

  var refCount$$1 = _interopRequireWildcard(refCount);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }newObj.default = obj;return newObj;
    }
  }

  function add(bodyClass) {
    // Increment class(es) on refCount tracker and add class(es) to body
    bodyClass.split(" ").map(refCount$$1.add).forEach(function (className) {
      return document.body.classList.add(className);
    });
  }

  function remove(bodyClass) {
    var classListMap = refCount$$1.get();
    // Decrement class(es) from the refCount tracker
    // and remove unused class(es) from body
    bodyClass.split(" ").map(refCount$$1.remove).filter(function (className) {
      return classListMap[className] === 0;
    }).forEach(function (className) {
      return document.body.classList.remove(className);
    });
  }
});

unwrapExports(bodyClassList);
var bodyClassList_1 = bodyClassList.add;
var bodyClassList_2 = bodyClassList.remove;

var exenv = createCommonjsModule(function (module) {
	/*!
   Copyright (c) 2015 Jed Watson.
   Based on code that is Copyright 2013-2015, Facebook, Inc.
   All rights reserved.
 */
	/* global define */

	(function () {
		var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

		var ExecutionEnvironment = {

			canUseDOM: canUseDOM,

			canUseWorkers: typeof Worker !== 'undefined',

			canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

			canUseViewport: canUseDOM && !!window.screen

		};

		if (typeof undefined === 'function' && _typeof(undefined.amd) === 'object' && undefined.amd) {
			undefined(function () {
				return ExecutionEnvironment;
			});
		} else if ('object' !== 'undefined' && module.exports) {
			module.exports = ExecutionEnvironment;
		} else {
			window.ExecutionEnvironment = ExecutionEnvironment;
		}
	})();
});

var safeHTMLElement = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.canUseDOM = undefined;

  var _exenv2 = _interopRequireDefault(exenv);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var EE = _exenv2.default;

  var SafeHTMLElement = EE.canUseDOM ? window.HTMLElement : {};

  var canUseDOM = exports.canUseDOM = EE.canUseDOM;

  exports.default = SafeHTMLElement;
});

unwrapExports(safeHTMLElement);
var safeHTMLElement_1 = safeHTMLElement.canUseDOM;

var ModalPortal_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _extends$$1 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }return target;
  };

  var _typeof$$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
  };

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  var _react2 = _interopRequireDefault(_react__default);

  var _propTypes2 = _interopRequireDefault(propTypes);

  var focusManager$$1 = _interopRequireWildcard(focusManager);

  var _scopeTab2 = _interopRequireDefault(scopeTab_1);

  var ariaAppHider$$1 = _interopRequireWildcard(ariaAppHider);

  var refCount$$1 = _interopRequireWildcard(refCount);

  var bodyClassList$$1 = _interopRequireWildcard(bodyClassList);

  var _safeHTMLElement2 = _interopRequireDefault(safeHTMLElement);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }newObj.default = obj;return newObj;
    }
  }

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  // so that our CSS is statically analyzable
  var CLASS_NAMES = {
    overlay: "ReactModal__Overlay",
    content: "ReactModal__Content"
  };

  var TAB_KEY = 9;
  var ESC_KEY = 27;

  var ModalPortal = function (_Component) {
    _inherits(ModalPortal, _Component);

    function ModalPortal(props) {
      _classCallCheck(this, ModalPortal);

      var _this = _possibleConstructorReturn(this, (ModalPortal.__proto__ || Object.getPrototypeOf(ModalPortal)).call(this, props));

      _this.setFocusAfterRender = function (focus) {
        _this.focusAfterRender = _this.props.shouldFocusAfterRender && focus;
      };

      _this.setOverlayRef = function (overlay) {
        _this.overlay = overlay;
      };

      _this.setContentRef = function (content) {
        _this.content = content;
      };

      _this.afterClose = function () {
        var _this$props = _this.props,
            appElement = _this$props.appElement,
            ariaHideApp = _this$props.ariaHideApp;

        // Remove body class

        bodyClassList$$1.remove(_this.props.bodyOpenClassName);

        // Reset aria-hidden attribute if all modals have been removed
        if (ariaHideApp && refCount$$1.totalCount() < 1) {
          ariaAppHider$$1.show(appElement);
        }

        if (_this.props.shouldFocusAfterRender) {
          if (_this.props.shouldReturnFocusAfterClose) {
            focusManager$$1.returnFocus();
            focusManager$$1.teardownScopedFocus();
          } else {
            focusManager$$1.popWithoutFocus();
          }
        }
      };

      _this.open = function () {
        _this.beforeOpen();
        if (_this.state.afterOpen && _this.state.beforeClose) {
          clearTimeout(_this.closeTimer);
          _this.setState({ beforeClose: false });
        } else {
          if (_this.props.shouldFocusAfterRender) {
            focusManager$$1.setupScopedFocus(_this.node);
            focusManager$$1.markForFocusLater();
          }

          _this.setState({ isOpen: true }, function () {
            _this.setState({ afterOpen: true });

            if (_this.props.isOpen && _this.props.onAfterOpen) {
              _this.props.onAfterOpen();
            }
          });
        }
      };

      _this.close = function () {
        if (_this.props.closeTimeoutMS > 0) {
          _this.closeWithTimeout();
        } else {
          _this.closeWithoutTimeout();
        }
      };

      _this.focusContent = function () {
        return _this.content && !_this.contentHasFocus() && _this.content.focus();
      };

      _this.closeWithTimeout = function () {
        var closesAt = Date.now() + _this.props.closeTimeoutMS;
        _this.setState({ beforeClose: true, closesAt: closesAt }, function () {
          _this.closeTimer = setTimeout(_this.closeWithoutTimeout, _this.state.closesAt - Date.now());
        });
      };

      _this.closeWithoutTimeout = function () {
        _this.setState({
          beforeClose: false,
          isOpen: false,
          afterOpen: false,
          closesAt: null
        }, _this.afterClose);
      };

      _this.handleKeyDown = function (event) {
        if (event.keyCode === TAB_KEY) {
          (0, _scopeTab2.default)(_this.content, event);
        }

        if (_this.props.shouldCloseOnEsc && event.keyCode === ESC_KEY) {
          event.stopPropagation();
          _this.requestClose(event);
        }
      };

      _this.handleOverlayOnClick = function (event) {
        if (_this.shouldClose === null) {
          _this.shouldClose = true;
        }

        if (_this.shouldClose && _this.props.shouldCloseOnOverlayClick) {
          if (_this.ownerHandlesClose()) {
            _this.requestClose(event);
          } else {
            _this.focusContent();
          }
        }
        _this.shouldClose = null;
        _this.moveFromContentToOverlay = null;
      };

      _this.handleOverlayOnMouseUp = function () {
        if (_this.moveFromContentToOverlay === null) {
          _this.shouldClose = false;
        }
      };

      _this.handleContentOnMouseUp = function () {
        _this.shouldClose = false;
      };

      _this.handleOverlayOnMouseDown = function (event) {
        if (!_this.props.shouldCloseOnOverlayClick && event.target == _this.overlay) {
          event.preventDefault();
        }
        _this.moveFromContentToOverlay = false;
      };

      _this.handleContentOnClick = function () {
        _this.shouldClose = false;
      };

      _this.handleContentOnMouseDown = function () {
        _this.shouldClose = false;
        _this.moveFromContentToOverlay = false;
      };

      _this.requestClose = function (event) {
        return _this.ownerHandlesClose() && _this.props.onRequestClose(event);
      };

      _this.ownerHandlesClose = function () {
        return _this.props.onRequestClose;
      };

      _this.shouldBeClosed = function () {
        return !_this.state.isOpen && !_this.state.beforeClose;
      };

      _this.contentHasFocus = function () {
        return document.activeElement === _this.content || _this.content.contains(document.activeElement);
      };

      _this.buildClassName = function (which, additional) {
        var classNames = (typeof additional === "undefined" ? "undefined" : _typeof$$1(additional)) === "object" ? additional : {
          base: CLASS_NAMES[which],
          afterOpen: CLASS_NAMES[which] + "--after-open",
          beforeClose: CLASS_NAMES[which] + "--before-close"
        };
        var className = classNames.base;
        if (_this.state.afterOpen) {
          className = className + " " + classNames.afterOpen;
        }
        if (_this.state.beforeClose) {
          className = className + " " + classNames.beforeClose;
        }
        return typeof additional === "string" && additional ? className + " " + additional : className;
      };

      _this.ariaAttributes = function (items) {
        return Object.keys(items).reduce(function (acc, name) {
          acc["aria-" + name] = items[name];
          return acc;
        }, {});
      };

      _this.state = {
        afterOpen: false,
        beforeClose: false
      };

      _this.shouldClose = null;
      _this.moveFromContentToOverlay = null;
      return _this;
    }

    _createClass(ModalPortal, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        // Focus needs to be set when mounting and already open
        if (this.props.isOpen) {
          this.setFocusAfterRender(true);
          this.open();
        }
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(newProps) {
        {
          if (newProps.bodyOpenClassName !== this.props.bodyOpenClassName) {
            // eslint-disable-next-line no-console
            console.warn('React-Modal: "bodyOpenClassName" prop has been modified. ' + "This may cause unexpected behavior when multiple modals are open.");
          }
        }
        // Focus only needs to be set once when the modal is being opened
        if (!this.props.isOpen && newProps.isOpen) {
          this.setFocusAfterRender(true);
          this.open();
        } else if (this.props.isOpen && !newProps.isOpen) {
          this.close();
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        if (this.focusAfterRender) {
          this.focusContent();
          this.setFocusAfterRender(false);
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.afterClose();
        clearTimeout(this.closeTimer);
      }
    }, {
      key: "beforeOpen",
      value: function beforeOpen() {
        var _props = this.props,
            appElement = _props.appElement,
            ariaHideApp = _props.ariaHideApp,
            bodyOpenClassName = _props.bodyOpenClassName;
        // Add body class

        bodyClassList$$1.add(bodyOpenClassName);
        // Add aria-hidden to appElement
        if (ariaHideApp) {
          ariaAppHider$$1.hide(appElement);
        }
      }

      // Don't steal focus from inner elements

    }, {
      key: "render",
      value: function render() {
        var _props2 = this.props,
            className = _props2.className,
            overlayClassName = _props2.overlayClassName,
            defaultStyles = _props2.defaultStyles;

        var contentStyles = className ? {} : defaultStyles.content;
        var overlayStyles = overlayClassName ? {} : defaultStyles.overlay;

        return this.shouldBeClosed() ? null : _react2.default.createElement("div", {
          ref: this.setOverlayRef,
          className: this.buildClassName("overlay", overlayClassName),
          style: _extends$$1({}, overlayStyles, this.props.style.overlay),
          onClick: this.handleOverlayOnClick,
          onMouseDown: this.handleOverlayOnMouseDown,
          onMouseUp: this.handleOverlayOnMouseUp,
          "aria-modal": "true"
        }, _react2.default.createElement("div", _extends$$1({
          ref: this.setContentRef,
          style: _extends$$1({}, contentStyles, this.props.style.content),
          className: this.buildClassName("content", className),
          tabIndex: "-1",
          onKeyDown: this.handleKeyDown,
          onMouseDown: this.handleContentOnMouseDown,
          onMouseUp: this.handleContentOnMouseUp,
          onClick: this.handleContentOnClick,
          role: this.props.role,
          "aria-label": this.props.contentLabel
        }, this.ariaAttributes(this.props.aria || {})), this.props.children));
      }
    }]);

    return ModalPortal;
  }(_react__default.Component);

  ModalPortal.defaultProps = {
    style: {
      overlay: {},
      content: {}
    }
  };
  ModalPortal.propTypes = {
    isOpen: _propTypes2.default.bool.isRequired,
    defaultStyles: _propTypes2.default.shape({
      content: _propTypes2.default.object,
      overlay: _propTypes2.default.object
    }),
    style: _propTypes2.default.shape({
      content: _propTypes2.default.object,
      overlay: _propTypes2.default.object
    }),
    className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
    overlayClassName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
    bodyOpenClassName: _propTypes2.default.string,
    ariaHideApp: _propTypes2.default.bool,
    appElement: _propTypes2.default.instanceOf(_safeHTMLElement2.default),
    onAfterOpen: _propTypes2.default.func,
    onRequestClose: _propTypes2.default.func,
    closeTimeoutMS: _propTypes2.default.number,
    shouldFocusAfterRender: _propTypes2.default.bool,
    shouldCloseOnOverlayClick: _propTypes2.default.bool,
    shouldReturnFocusAfterClose: _propTypes2.default.bool,
    role: _propTypes2.default.string,
    contentLabel: _propTypes2.default.string,
    aria: _propTypes2.default.object,
    children: _propTypes2.default.node,
    shouldCloseOnEsc: _propTypes2.default.bool
  };
  exports.default = ModalPortal;
  module.exports = exports["default"];
});

unwrapExports(ModalPortal_1);

var Modal_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.bodyOpenClassName = exports.portalClassName = undefined;

  var _extends$$1 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }return target;
  };

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  var _react2 = _interopRequireDefault(_react__default);

  var _reactDom2 = _interopRequireDefault(reactDom);

  var _propTypes2 = _interopRequireDefault(propTypes);

  var _ModalPortal2 = _interopRequireDefault(ModalPortal_1);

  var ariaAppHider$$1 = _interopRequireWildcard(ariaAppHider);

  var _safeHTMLElement2 = _interopRequireDefault(safeHTMLElement);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }newObj.default = obj;return newObj;
    }
  }

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var portalClassName = exports.portalClassName = "ReactModalPortal";
  var bodyOpenClassName = exports.bodyOpenClassName = "ReactModal__Body--open";

  var isReact16 = _reactDom2.default.createPortal !== undefined;
  var createPortal = isReact16 ? _reactDom2.default.createPortal : _reactDom2.default.unstable_renderSubtreeIntoContainer;

  function getParentElement(parentSelector) {
    return parentSelector();
  }

  var Modal = function (_Component) {
    _inherits(Modal, _Component);

    function Modal() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Modal);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Modal.__proto__ || Object.getPrototypeOf(Modal)).call.apply(_ref, [this].concat(args))), _this), _this.removePortal = function () {
        !isReact16 && _reactDom2.default.unmountComponentAtNode(_this.node);
        var parent = getParentElement(_this.props.parentSelector);
        parent.removeChild(_this.node);
      }, _this.portalRef = function (ref) {
        _this.portal = ref;
      }, _this.renderPortal = function (props) {
        var portal = createPortal(_this, _react2.default.createElement(_ModalPortal2.default, _extends$$1({ defaultStyles: Modal.defaultStyles }, props)), _this.node);
        _this.portalRef(portal);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Modal, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        if (!safeHTMLElement.canUseDOM) return;

        if (!isReact16) {
          this.node = document.createElement("div");
        }
        this.node.className = this.props.portalClassName;

        var parent = getParentElement(this.props.parentSelector);
        parent.appendChild(this.node);

        !isReact16 && this.renderPortal(this.props);
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(newProps) {
        if (!safeHTMLElement.canUseDOM) return;
        var isOpen = newProps.isOpen;
        // Stop unnecessary renders if modal is remaining closed

        if (!this.props.isOpen && !isOpen) return;

        var currentParent = getParentElement(this.props.parentSelector);
        var newParent = getParentElement(newProps.parentSelector);

        if (newParent !== currentParent) {
          currentParent.removeChild(this.node);
          newParent.appendChild(this.node);
        }

        !isReact16 && this.renderPortal(newProps);
      }
    }, {
      key: "componentWillUpdate",
      value: function componentWillUpdate(newProps) {
        if (!safeHTMLElement.canUseDOM) return;
        if (newProps.portalClassName !== this.props.portalClassName) {
          this.node.className = newProps.portalClassName;
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (!safeHTMLElement.canUseDOM || !this.node || !this.portal) return;

        var state = this.portal.state;
        var now = Date.now();
        var closesAt = state.isOpen && this.props.closeTimeoutMS && (state.closesAt || now + this.props.closeTimeoutMS);

        if (closesAt) {
          if (!state.beforeClose) {
            this.portal.closeWithTimeout();
          }

          setTimeout(this.removePortal, closesAt - now);
        } else {
          this.removePortal();
        }
      }
    }, {
      key: "render",
      value: function render() {
        if (!safeHTMLElement.canUseDOM || !isReact16) {
          return null;
        }

        if (!this.node && isReact16) {
          this.node = document.createElement("div");
        }

        return createPortal(_react2.default.createElement(_ModalPortal2.default, _extends$$1({
          ref: this.portalRef,
          defaultStyles: Modal.defaultStyles
        }, this.props)), this.node);
      }
    }], [{
      key: "setAppElement",
      value: function setAppElement(element) {
        ariaAppHider$$1.setElement(element);
      }

      /* eslint-disable react/no-unused-prop-types */

      /* eslint-enable react/no-unused-prop-types */

    }]);

    return Modal;
  }(_react__default.Component);

  Modal.propTypes = {
    isOpen: _propTypes2.default.bool.isRequired,
    style: _propTypes2.default.shape({
      content: _propTypes2.default.object,
      overlay: _propTypes2.default.object
    }),
    portalClassName: _propTypes2.default.string,
    bodyOpenClassName: _propTypes2.default.string,
    className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
      base: _propTypes2.default.string.isRequired,
      afterOpen: _propTypes2.default.string.isRequired,
      beforeClose: _propTypes2.default.string.isRequired
    })]),
    overlayClassName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
      base: _propTypes2.default.string.isRequired,
      afterOpen: _propTypes2.default.string.isRequired,
      beforeClose: _propTypes2.default.string.isRequired
    })]),
    appElement: _propTypes2.default.instanceOf(_safeHTMLElement2.default),
    onAfterOpen: _propTypes2.default.func,
    onRequestClose: _propTypes2.default.func,
    closeTimeoutMS: _propTypes2.default.number,
    ariaHideApp: _propTypes2.default.bool,
    shouldFocusAfterRender: _propTypes2.default.bool,
    shouldCloseOnOverlayClick: _propTypes2.default.bool,
    shouldReturnFocusAfterClose: _propTypes2.default.bool,
    parentSelector: _propTypes2.default.func,
    aria: _propTypes2.default.object,
    role: _propTypes2.default.string,
    contentLabel: _propTypes2.default.string,
    shouldCloseOnEsc: _propTypes2.default.bool
  };
  Modal.defaultProps = {
    isOpen: false,
    portalClassName: portalClassName,
    bodyOpenClassName: bodyOpenClassName,
    ariaHideApp: true,
    closeTimeoutMS: 0,
    shouldFocusAfterRender: true,
    shouldCloseOnEsc: true,
    shouldCloseOnOverlayClick: true,
    shouldReturnFocusAfterClose: true,
    parentSelector: function parentSelector() {
      return document.body;
    }
  };
  Modal.defaultStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.75)"
    },
    content: {
      position: "absolute",
      top: "40px",
      left: "40px",
      right: "40px",
      bottom: "40px",
      border: "1px solid #ccc",
      background: "#fff",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "4px",
      outline: "none",
      padding: "20px"
    }
  };
  exports.default = Modal;
});

unwrapExports(Modal_1);
var Modal_2 = Modal_1.bodyOpenClassName;
var Modal_3 = Modal_1.portalClassName;

var lib = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Modal2 = _interopRequireDefault(Modal_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  exports.default = _Modal2.default;
  module.exports = exports["default"];
});

var ReactModal = unwrapExports(lib);

var arrays = function shallowEqualArrays(arrA, arrB) {
  if (arrA === arrB) {
    return true;
  }

  var len = arrA.length;

  if (arrB.length !== len) {
    return false;
  }

  for (var i = 0; i < len; i++) {
    if (arrA[i] !== arrB[i]) {
      return false;
    }
  }

  return true;
};

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var dist = function dist(_ref) {
  var data = _ref.data;
  var multiSection = _ref.multiSection;

  function nextNonEmptySectionIndex(sectionIndex) {
    if (sectionIndex === null) {
      sectionIndex = 0;
    } else {
      sectionIndex++;
    }

    while (sectionIndex < data.length && data[sectionIndex] === 0) {
      sectionIndex++;
    }

    return sectionIndex === data.length ? null : sectionIndex;
  }

  function prevNonEmptySectionIndex(sectionIndex) {
    if (sectionIndex === null) {
      sectionIndex = data.length - 1;
    } else {
      sectionIndex--;
    }

    while (sectionIndex >= 0 && data[sectionIndex] === 0) {
      sectionIndex--;
    }

    return sectionIndex === -1 ? null : sectionIndex;
  }

  function next(position) {
    var _position = _slicedToArray(position, 2);

    var sectionIndex = _position[0];
    var itemIndex = _position[1];

    if (multiSection) {
      if (itemIndex === null || itemIndex === data[sectionIndex] - 1) {
        sectionIndex = nextNonEmptySectionIndex(sectionIndex);

        if (sectionIndex === null) {
          return [null, null];
        }

        return [sectionIndex, 0];
      }

      return [sectionIndex, itemIndex + 1];
    }

    if (data === 0 || itemIndex === data - 1) {
      return [null, null];
    }

    if (itemIndex === null) {
      return [null, 0];
    }

    return [null, itemIndex + 1];
  }

  function prev(position) {
    var _position2 = _slicedToArray(position, 2);

    var sectionIndex = _position2[0];
    var itemIndex = _position2[1];

    if (multiSection) {
      if (itemIndex === null || itemIndex === 0) {
        sectionIndex = prevNonEmptySectionIndex(sectionIndex);

        if (sectionIndex === null) {
          return [null, null];
        }

        return [sectionIndex, data[sectionIndex] - 1];
      }

      return [sectionIndex, itemIndex - 1];
    }

    if (data === 0 || itemIndex === 0) {
      return [null, null];
    }

    if (itemIndex === null) {
      return [null, data - 1];
    }

    return [null, itemIndex - 1];
  }

  function isLast(position) {
    return next(position)[1] === null;
  }

  return {
    next: next,
    prev: prev,
    isLast: isLast
  };
};

var propIsEnumerable$1 = Object.prototype.propertyIsEnumerable;

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function ownEnumerableKeys(obj) {
	var keys = Object.getOwnPropertyNames(obj);

	if (Object.getOwnPropertySymbols) {
		keys = keys.concat(Object.getOwnPropertySymbols(obj));
	}

	return keys.filter(function (key) {
		return propIsEnumerable$1.call(obj, key);
	});
}

var objectAssign$2 = Object.assign || function (target, source) {
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = ownEnumerableKeys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			to[keys[i]] = from[keys[i]];
		}
	}

	return to;
};

var dist$2 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;_e = err;
      } finally {
        try {
          if (!_n && _i['return']) _i['return']();
        } finally {
          if (_d) throw _e;
        }
      }return _arr;
    }return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError('Invalid attempt to destructure non-iterable instance');
      }
    };
  }();

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
  }

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }return arr2;
    } else {
      return Array.from(arr);
    }
  }

  var _objectAssign2 = _interopRequireDefault(objectAssign$2);

  var truthy = function truthy(x) {
    return x;
  };

  exports['default'] = function (input) {
    var _ref = Array.isArray(input) && input.length === 2 ? input : [input, null];

    var _ref2 = _slicedToArray(_ref, 2);

    var theme = _ref2[0];
    var classNameDecorator = _ref2[1];

    return function (key) {
      for (var _len = arguments.length, names = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        names[_key - 1] = arguments[_key];
      }

      var styles = names.map(function (name) {
        return theme[name];
      }).filter(truthy);

      return typeof styles[0] === 'string' || typeof classNameDecorator === 'function' ? { key: key, className: classNameDecorator ? classNameDecorator.apply(undefined, _toConsumableArray(styles)) : styles.join(' ') } : { key: key, style: _objectAssign2['default'].apply(undefined, [{}].concat(_toConsumableArray(styles))) };
    };
  };

  module.exports = exports['default'];
});

unwrapExports(dist$2);

var compareObjects_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof$$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
  };

  exports.default = compareObjects;
  function compareObjects(objA, objB) {
    var keys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    if (objA === objB) {
      return false;
    }

    var aKeys = Object.keys(objA);
    var bKeys = Object.keys(objB);

    if (aKeys.length !== bKeys.length) {
      return true;
    }

    var keysMap = {};
    var i = void 0,
        len = void 0;

    for (i = 0, len = keys.length; i < len; i++) {
      keysMap[keys[i]] = true;
    }

    for (i = 0, len = aKeys.length; i < len; i++) {
      var key = aKeys[i];
      var aValue = objA[key];
      var bValue = objB[key];

      if (aValue === bValue) {
        continue;
      }

      if (!keysMap[key] || aValue === null || bValue === null || (typeof aValue === 'undefined' ? 'undefined' : _typeof$$1(aValue)) !== 'object' || (typeof bValue === 'undefined' ? 'undefined' : _typeof$$1(bValue)) !== 'object') {
        return true;
      }

      var aValueKeys = Object.keys(aValue);
      var bValueKeys = Object.keys(bValue);

      if (aValueKeys.length !== bValueKeys.length) {
        return true;
      }

      for (var n = 0, length = aValueKeys.length; n < length; n++) {
        var aValueKey = aValueKeys[n];

        if (aValue[aValueKey] !== bValue[aValueKey]) {
          return true;
        }
      }
    }

    return false;
  }
});

unwrapExports(compareObjects_1);

var SectionTitle_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  var _react2 = _interopRequireDefault(_react__default);

  var _propTypes2 = _interopRequireDefault(propTypes);

  var _compareObjects2 = _interopRequireDefault(compareObjects_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var SectionTitle = function (_Component) {
    _inherits(SectionTitle, _Component);

    function SectionTitle() {
      _classCallCheck(this, SectionTitle);

      return _possibleConstructorReturn(this, (SectionTitle.__proto__ || Object.getPrototypeOf(SectionTitle)).apply(this, arguments));
    }

    _createClass(SectionTitle, [{
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps) {
        return (0, _compareObjects2.default)(nextProps, this.props);
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            section = _props.section,
            renderSectionTitle = _props.renderSectionTitle,
            theme = _props.theme,
            sectionKeyPrefix = _props.sectionKeyPrefix;

        var sectionTitle = renderSectionTitle(section);

        if (!sectionTitle) {
          return null;
        }

        return _react2.default.createElement('div', theme(sectionKeyPrefix + 'title', 'sectionTitle'), sectionTitle);
      }
    }]);

    return SectionTitle;
  }(_react__default.Component);

  SectionTitle.propTypes = {
    section: _propTypes2.default.any.isRequired,
    renderSectionTitle: _propTypes2.default.func.isRequired,
    theme: _propTypes2.default.func.isRequired,
    sectionKeyPrefix: _propTypes2.default.string.isRequired
  };
  exports.default = SectionTitle;
});

unwrapExports(SectionTitle_1);

var Item_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _extends$$1 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }return target;
  };

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  var _react2 = _interopRequireDefault(_react__default);

  var _propTypes2 = _interopRequireDefault(propTypes);

  var _compareObjects2 = _interopRequireDefault(compareObjects_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function _objectWithoutProperties(obj, keys) {
    var target = {};for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
    }return target;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Item = function (_Component) {
    _inherits(Item, _Component);

    function Item() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Item);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Item.__proto__ || Object.getPrototypeOf(Item)).call.apply(_ref, [this].concat(args))), _this), _this.storeItemReference = function (item) {
        if (item !== null) {
          _this.item = item;
        }
      }, _this.onMouseEnter = function (event) {
        var _this$props = _this.props,
            sectionIndex = _this$props.sectionIndex,
            itemIndex = _this$props.itemIndex;

        _this.props.onMouseEnter(event, { sectionIndex: sectionIndex, itemIndex: itemIndex });
      }, _this.onMouseLeave = function (event) {
        var _this$props2 = _this.props,
            sectionIndex = _this$props2.sectionIndex,
            itemIndex = _this$props2.itemIndex;

        _this.props.onMouseLeave(event, { sectionIndex: sectionIndex, itemIndex: itemIndex });
      }, _this.onMouseDown = function (event) {
        var _this$props3 = _this.props,
            sectionIndex = _this$props3.sectionIndex,
            itemIndex = _this$props3.itemIndex;

        _this.props.onMouseDown(event, { sectionIndex: sectionIndex, itemIndex: itemIndex });
      }, _this.onClick = function (event) {
        var _this$props4 = _this.props,
            sectionIndex = _this$props4.sectionIndex,
            itemIndex = _this$props4.itemIndex;

        _this.props.onClick(event, { sectionIndex: sectionIndex, itemIndex: itemIndex });
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Item, [{
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps) {
        return (0, _compareObjects2.default)(nextProps, this.props, ['renderItemData']);
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            isHighlighted = _props.isHighlighted,
            item = _props.item,
            renderItem = _props.renderItem,
            renderItemData = _props.renderItemData,
            restProps = _objectWithoutProperties(_props, ['isHighlighted', 'item', 'renderItem', 'renderItemData']);

        delete restProps.sectionIndex;
        delete restProps.itemIndex;

        if (typeof restProps.onMouseEnter === 'function') {
          restProps.onMouseEnter = this.onMouseEnter;
        }

        if (typeof restProps.onMouseLeave === 'function') {
          restProps.onMouseLeave = this.onMouseLeave;
        }

        if (typeof restProps.onMouseDown === 'function') {
          restProps.onMouseDown = this.onMouseDown;
        }

        if (typeof restProps.onClick === 'function') {
          restProps.onClick = this.onClick;
        }

        return _react2.default.createElement('li', _extends$$1({ role: 'option' }, restProps, { ref: this.storeItemReference }), renderItem(item, _extends$$1({ isHighlighted: isHighlighted }, renderItemData)));
      }
    }]);

    return Item;
  }(_react__default.Component);

  Item.propTypes = {
    sectionIndex: _propTypes2.default.number,
    isHighlighted: _propTypes2.default.bool.isRequired,
    itemIndex: _propTypes2.default.number.isRequired,
    item: _propTypes2.default.any.isRequired,
    renderItem: _propTypes2.default.func.isRequired,
    renderItemData: _propTypes2.default.object.isRequired,
    onMouseEnter: _propTypes2.default.func,
    onMouseLeave: _propTypes2.default.func,
    onMouseDown: _propTypes2.default.func,
    onClick: _propTypes2.default.func
  };
  exports.default = Item;
});

unwrapExports(Item_1);

var ItemsList_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _extends$$1 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }return target;
  };

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  var _react2 = _interopRequireDefault(_react__default);

  var _propTypes2 = _interopRequireDefault(propTypes);

  var _Item2 = _interopRequireDefault(Item_1);

  var _compareObjects2 = _interopRequireDefault(compareObjects_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var ItemsList = function (_Component) {
    _inherits(ItemsList, _Component);

    function ItemsList() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, ItemsList);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ItemsList.__proto__ || Object.getPrototypeOf(ItemsList)).call.apply(_ref, [this].concat(args))), _this), _this.storeHighlightedItemReference = function (highlightedItem) {
        _this.props.onHighlightedItemChange(highlightedItem === null ? null : highlightedItem.item);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ItemsList, [{
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps) {
        return (0, _compareObjects2.default)(nextProps, this.props, ['itemProps']);
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            items = _props.items,
            itemProps = _props.itemProps,
            renderItem = _props.renderItem,
            renderItemData = _props.renderItemData,
            sectionIndex = _props.sectionIndex,
            highlightedItemIndex = _props.highlightedItemIndex,
            getItemId = _props.getItemId,
            theme = _props.theme,
            keyPrefix = _props.keyPrefix;

        var sectionPrefix = sectionIndex === null ? keyPrefix : keyPrefix + 'section-' + sectionIndex + '-';
        var isItemPropsFunction = typeof itemProps === 'function';

        return _react2.default.createElement('ul', _extends$$1({ role: 'listbox' }, theme(sectionPrefix + 'items-list', 'itemsList')), items.map(function (item, itemIndex) {
          var isFirst = itemIndex === 0;
          var isHighlighted = itemIndex === highlightedItemIndex;
          var itemKey = sectionPrefix + 'item-' + itemIndex;
          var itemPropsObj = isItemPropsFunction ? itemProps({ sectionIndex: sectionIndex, itemIndex: itemIndex }) : itemProps;
          var allItemProps = _extends$$1({
            id: getItemId(sectionIndex, itemIndex)
          }, theme(itemKey, 'item', isFirst && 'itemFirst', isHighlighted && 'itemHighlighted'), itemPropsObj);

          if (isHighlighted) {
            allItemProps.ref = _this2.storeHighlightedItemReference;
          }

          // `key` is provided by theme()
          /* eslint-disable react/jsx-key */
          return _react2.default.createElement(_Item2.default, _extends$$1({}, allItemProps, {
            sectionIndex: sectionIndex,
            isHighlighted: isHighlighted,
            itemIndex: itemIndex,
            item: item,
            renderItem: renderItem,
            renderItemData: renderItemData
          }));
          /* eslint-enable react/jsx-key */
        }));
      }
    }]);

    return ItemsList;
  }(_react__default.Component);

  ItemsList.propTypes = {
    items: _propTypes2.default.array.isRequired,
    itemProps: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func]),
    renderItem: _propTypes2.default.func.isRequired,
    renderItemData: _propTypes2.default.object.isRequired,
    sectionIndex: _propTypes2.default.number,
    highlightedItemIndex: _propTypes2.default.number,
    onHighlightedItemChange: _propTypes2.default.func.isRequired,
    getItemId: _propTypes2.default.func.isRequired,
    theme: _propTypes2.default.func.isRequired,
    keyPrefix: _propTypes2.default.string.isRequired
  };
  ItemsList.defaultProps = {
    sectionIndex: null
  };
  exports.default = ItemsList;
});

unwrapExports(ItemsList_1);

var Autowhatever_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _extends$$1 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }return target;
  };

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;_e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }return _arr;
    }return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  var _react2 = _interopRequireDefault(_react__default);

  var _propTypes2 = _interopRequireDefault(propTypes);

  var _sectionIterator2 = _interopRequireDefault(dist);

  var _reactThemeable2 = _interopRequireDefault(dist$2);

  var _SectionTitle2 = _interopRequireDefault(SectionTitle_1);

  var _ItemsList2 = _interopRequireDefault(ItemsList_1);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var emptyObject = {};
  var defaultRenderInputComponent = function defaultRenderInputComponent(props) {
    return _react2.default.createElement('input', props);
  };
  var defaultRenderItemsContainer = function defaultRenderItemsContainer(_ref) {
    var containerProps = _ref.containerProps,
        children = _ref.children;
    return _react2.default.createElement('div', containerProps, children);
  };
  var defaultTheme = {
    container: 'react-autowhatever__container',
    containerOpen: 'react-autowhatever__container--open',
    input: 'react-autowhatever__input',
    inputOpen: 'react-autowhatever__input--open',
    inputFocused: 'react-autowhatever__input--focused',
    itemsContainer: 'react-autowhatever__items-container',
    itemsContainerOpen: 'react-autowhatever__items-container--open',
    itemsList: 'react-autowhatever__items-list',
    item: 'react-autowhatever__item',
    itemFirst: 'react-autowhatever__item--first',
    itemHighlighted: 'react-autowhatever__item--highlighted',
    sectionContainer: 'react-autowhatever__section-container',
    sectionContainerFirst: 'react-autowhatever__section-container--first',
    sectionTitle: 'react-autowhatever__section-title'
  };

  var Autowhatever = function (_Component) {
    _inherits(Autowhatever, _Component);

    function Autowhatever(props) {
      _classCallCheck(this, Autowhatever);

      var _this = _possibleConstructorReturn(this, (Autowhatever.__proto__ || Object.getPrototypeOf(Autowhatever)).call(this, props));

      _this.storeInputReference = function (input) {
        if (input !== null) {
          _this.input = input;
        }
      };

      _this.storeItemsContainerReference = function (itemsContainer) {
        if (itemsContainer !== null) {
          _this.itemsContainer = itemsContainer;
        }
      };

      _this.onHighlightedItemChange = function (highlightedItem) {
        _this.highlightedItem = highlightedItem;
      };

      _this.getItemId = function (sectionIndex, itemIndex) {
        if (itemIndex === null) {
          return null;
        }

        var id = _this.props.id;

        var section = sectionIndex === null ? '' : 'section-' + sectionIndex;

        return 'react-autowhatever-' + id + '-' + section + '-item-' + itemIndex;
      };

      _this.onFocus = function (event) {
        var inputProps = _this.props.inputProps;

        _this.setState({
          isInputFocused: true
        });

        inputProps.onFocus && inputProps.onFocus(event);
      };

      _this.onBlur = function (event) {
        var inputProps = _this.props.inputProps;

        _this.setState({
          isInputFocused: false
        });

        inputProps.onBlur && inputProps.onBlur(event);
      };

      _this.onKeyDown = function (event) {
        var _this$props = _this.props,
            inputProps = _this$props.inputProps,
            highlightedSectionIndex = _this$props.highlightedSectionIndex,
            highlightedItemIndex = _this$props.highlightedItemIndex;

        switch (event.key) {
          case 'ArrowDown':
          case 'ArrowUp':
            {
              var nextPrev = event.key === 'ArrowDown' ? 'next' : 'prev';

              var _this$sectionIterator = _this.sectionIterator[nextPrev]([highlightedSectionIndex, highlightedItemIndex]),
                  _this$sectionIterator2 = _slicedToArray(_this$sectionIterator, 2),
                  newHighlightedSectionIndex = _this$sectionIterator2[0],
                  newHighlightedItemIndex = _this$sectionIterator2[1];

              inputProps.onKeyDown(event, { newHighlightedSectionIndex: newHighlightedSectionIndex, newHighlightedItemIndex: newHighlightedItemIndex });
              break;
            }

          default:
            inputProps.onKeyDown(event, { highlightedSectionIndex: highlightedSectionIndex, highlightedItemIndex: highlightedItemIndex });
        }
      };

      _this.highlightedItem = null;

      _this.state = {
        isInputFocused: false
      };

      _this.setSectionsItems(props);
      _this.setSectionIterator(props);
      _this.setTheme(props);
      return _this;
    }

    _createClass(Autowhatever, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.ensureHighlightedItemIsVisible();
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (nextProps.items !== this.props.items) {
          this.setSectionsItems(nextProps);
        }

        if (nextProps.items !== this.props.items || nextProps.multiSection !== this.props.multiSection) {
          this.setSectionIterator(nextProps);
        }

        if (nextProps.theme !== this.props.theme) {
          this.setTheme(nextProps);
        }
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        this.ensureHighlightedItemIsVisible();
      }
    }, {
      key: 'setSectionsItems',
      value: function setSectionsItems(props) {
        if (props.multiSection) {
          this.sectionsItems = props.items.map(function (section) {
            return props.getSectionItems(section);
          });
          this.sectionsLengths = this.sectionsItems.map(function (items) {
            return items.length;
          });
          this.allSectionsAreEmpty = this.sectionsLengths.every(function (itemsCount) {
            return itemsCount === 0;
          });
        }
      }
    }, {
      key: 'setSectionIterator',
      value: function setSectionIterator(props) {
        this.sectionIterator = (0, _sectionIterator2.default)({
          multiSection: props.multiSection,
          data: props.multiSection ? this.sectionsLengths : props.items.length
        });
      }
    }, {
      key: 'setTheme',
      value: function setTheme(props) {
        this.theme = (0, _reactThemeable2.default)(props.theme);
      }
    }, {
      key: 'renderSections',
      value: function renderSections() {
        var _this2 = this;

        if (this.allSectionsAreEmpty) {
          return null;
        }

        var theme = this.theme;
        var _props = this.props,
            id = _props.id,
            items = _props.items,
            renderItem = _props.renderItem,
            renderItemData = _props.renderItemData,
            renderSectionTitle = _props.renderSectionTitle,
            highlightedSectionIndex = _props.highlightedSectionIndex,
            highlightedItemIndex = _props.highlightedItemIndex,
            itemProps = _props.itemProps;

        return items.map(function (section, sectionIndex) {
          var keyPrefix = 'react-autowhatever-' + id + '-';
          var sectionKeyPrefix = keyPrefix + 'section-' + sectionIndex + '-';
          var isFirstSection = sectionIndex === 0;

          // `key` is provided by theme()
          /* eslint-disable react/jsx-key */
          return _react2.default.createElement('div', theme(sectionKeyPrefix + 'container', 'sectionContainer', isFirstSection && 'sectionContainerFirst'), _react2.default.createElement(_SectionTitle2.default, {
            section: section,
            renderSectionTitle: renderSectionTitle,
            theme: theme,
            sectionKeyPrefix: sectionKeyPrefix
          }), _react2.default.createElement(_ItemsList2.default, {
            items: _this2.sectionsItems[sectionIndex],
            itemProps: itemProps,
            renderItem: renderItem,
            renderItemData: renderItemData,
            sectionIndex: sectionIndex,
            highlightedItemIndex: highlightedSectionIndex === sectionIndex ? highlightedItemIndex : null,
            onHighlightedItemChange: _this2.onHighlightedItemChange,
            getItemId: _this2.getItemId,
            theme: theme,
            keyPrefix: keyPrefix,
            ref: _this2.storeItemsListReference
          }));
          /* eslint-enable react/jsx-key */
        });
      }
    }, {
      key: 'renderItems',
      value: function renderItems() {
        var items = this.props.items;

        if (items.length === 0) {
          return null;
        }

        var theme = this.theme;
        var _props2 = this.props,
            id = _props2.id,
            renderItem = _props2.renderItem,
            renderItemData = _props2.renderItemData,
            highlightedSectionIndex = _props2.highlightedSectionIndex,
            highlightedItemIndex = _props2.highlightedItemIndex,
            itemProps = _props2.itemProps;

        return _react2.default.createElement(_ItemsList2.default, {
          items: items,
          itemProps: itemProps,
          renderItem: renderItem,
          renderItemData: renderItemData,
          highlightedItemIndex: highlightedSectionIndex === null ? highlightedItemIndex : null,
          onHighlightedItemChange: this.onHighlightedItemChange,
          getItemId: this.getItemId,
          theme: theme,
          keyPrefix: 'react-autowhatever-' + id + '-'
        });
      }
    }, {
      key: 'ensureHighlightedItemIsVisible',
      value: function ensureHighlightedItemIsVisible() {
        var highlightedItem = this.highlightedItem;

        if (!highlightedItem) {
          return;
        }

        var itemsContainer = this.itemsContainer;

        var itemOffsetRelativeToContainer = highlightedItem.offsetParent === itemsContainer ? highlightedItem.offsetTop : highlightedItem.offsetTop - itemsContainer.offsetTop;

        var scrollTop = itemsContainer.scrollTop; // Top of the visible area

        if (itemOffsetRelativeToContainer < scrollTop) {
          // Item is off the top of the visible area
          scrollTop = itemOffsetRelativeToContainer;
        } else if (itemOffsetRelativeToContainer + highlightedItem.offsetHeight > scrollTop + itemsContainer.offsetHeight) {
          // Item is off the bottom of the visible area
          scrollTop = itemOffsetRelativeToContainer + highlightedItem.offsetHeight - itemsContainer.offsetHeight;
        }

        if (scrollTop !== itemsContainer.scrollTop) {
          itemsContainer.scrollTop = scrollTop;
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var theme = this.theme;
        var _props3 = this.props,
            id = _props3.id,
            multiSection = _props3.multiSection,
            renderInputComponent = _props3.renderInputComponent,
            renderItemsContainer = _props3.renderItemsContainer,
            highlightedSectionIndex = _props3.highlightedSectionIndex,
            highlightedItemIndex = _props3.highlightedItemIndex;
        var isInputFocused = this.state.isInputFocused;

        var renderedItems = multiSection ? this.renderSections() : this.renderItems();
        var isOpen = renderedItems !== null;
        var ariaActivedescendant = this.getItemId(highlightedSectionIndex, highlightedItemIndex);
        var containerProps = theme('react-autowhatever-' + id + '-container', 'container', isOpen && 'containerOpen');
        var itemsContainerId = 'react-autowhatever-' + id;
        var inputComponent = renderInputComponent(_extends$$1({
          type: 'text',
          value: '',
          autoComplete: 'off',
          role: 'combobox',
          'aria-autocomplete': 'list',
          'aria-owns': itemsContainerId,
          'aria-expanded': isOpen,
          'aria-haspopup': isOpen,
          'aria-activedescendant': ariaActivedescendant
        }, theme('react-autowhatever-' + id + '-input', 'input', isOpen && 'inputOpen', isInputFocused && 'inputFocused'), this.props.inputProps, {
          onFocus: this.onFocus,
          onBlur: this.onBlur,
          onKeyDown: this.props.inputProps.onKeyDown && this.onKeyDown,
          ref: this.storeInputReference
        }));
        var itemsContainer = renderItemsContainer({
          containerProps: _extends$$1({
            id: itemsContainerId
          }, theme('react-autowhatever-' + id + '-items-container', 'itemsContainer', isOpen && 'itemsContainerOpen'), {
            ref: this.storeItemsContainerReference
          }),
          children: renderedItems
        });

        return _react2.default.createElement('div', containerProps, inputComponent, itemsContainer);
      }
    }]);

    return Autowhatever;
  }(_react__default.Component);

  Autowhatever.propTypes = {
    id: _propTypes2.default.string, // Used in aria-* attributes. If multiple Autowhatever's are rendered on a page, they must have unique ids.
    multiSection: _propTypes2.default.bool, // Indicates whether a multi section layout should be rendered.
    renderInputComponent: _propTypes2.default.func, // When specified, it is used to render the input element.
    renderItemsContainer: _propTypes2.default.func, // Renders the items container.
    items: _propTypes2.default.array.isRequired, // Array of items or sections to render.
    renderItem: _propTypes2.default.func, // This function renders a single item.
    renderItemData: _propTypes2.default.object, // Arbitrary data that will be passed to renderItem()
    renderSectionTitle: _propTypes2.default.func, // This function gets a section and renders its title.
    getSectionItems: _propTypes2.default.func, // This function gets a section and returns its items, which will be passed into `renderItem` for rendering.
    inputProps: _propTypes2.default.object, // Arbitrary input props
    itemProps: _propTypes2.default.oneOfType([// Arbitrary item props
    _propTypes2.default.object, _propTypes2.default.func]),
    highlightedSectionIndex: _propTypes2.default.number, // Section index of the highlighted item
    highlightedItemIndex: _propTypes2.default.number, // Highlighted item index (within a section)
    theme: _propTypes2.default.oneOfType([// Styles. See: https://github.com/markdalgleish/react-themeable
    _propTypes2.default.object, _propTypes2.default.array])
  };
  Autowhatever.defaultProps = {
    id: '1',
    multiSection: false,
    renderInputComponent: defaultRenderInputComponent,
    renderItemsContainer: defaultRenderItemsContainer,
    renderItem: function renderItem() {
      throw new Error('`renderItem` must be provided');
    },
    renderItemData: emptyObject,
    renderSectionTitle: function renderSectionTitle() {
      throw new Error('`renderSectionTitle` must be provided');
    },
    getSectionItems: function getSectionItems() {
      throw new Error('`getSectionItems` must be provided');
    },
    inputProps: emptyObject,
    itemProps: emptyObject,
    highlightedSectionIndex: null,
    highlightedItemIndex: null,
    theme: defaultTheme
  };
  exports.default = Autowhatever;
});

unwrapExports(Autowhatever_1);

var dist$3 = Autowhatever_1.default;

var theme = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var defaultTheme = exports.defaultTheme = {
    container: 'react-autosuggest__container',
    containerOpen: 'react-autosuggest__container--open',
    input: 'react-autosuggest__input',
    inputOpen: 'react-autosuggest__input--open',
    inputFocused: 'react-autosuggest__input--focused',
    suggestionsContainer: 'react-autosuggest__suggestions-container',
    suggestionsContainerOpen: 'react-autosuggest__suggestions-container--open',
    suggestionsList: 'react-autosuggest__suggestions-list',
    suggestion: 'react-autosuggest__suggestion',
    suggestionFirst: 'react-autosuggest__suggestion--first',
    suggestionHighlighted: 'react-autosuggest__suggestion--highlighted',
    sectionContainer: 'react-autosuggest__section-container',
    sectionContainerFirst: 'react-autosuggest__section-container--first',
    sectionTitle: 'react-autosuggest__section-title'
  };

  var mapToAutowhateverTheme = exports.mapToAutowhateverTheme = function mapToAutowhateverTheme(theme) {
    var result = {};

    for (var key in theme) {
      switch (key) {
        case 'suggestionsContainer':
          result['itemsContainer'] = theme[key];
          break;

        case 'suggestionsContainerOpen':
          result['itemsContainerOpen'] = theme[key];
          break;

        case 'suggestion':
          result['item'] = theme[key];
          break;

        case 'suggestionFirst':
          result['itemFirst'] = theme[key];
          break;

        case 'suggestionHighlighted':
          result['itemHighlighted'] = theme[key];
          break;

        case 'suggestionsList':
          result['itemsList'] = theme[key];
          break;

        default:
          result[key] = theme[key];
      }
    }

    return result;
  };
});

unwrapExports(theme);
var theme_1 = theme.defaultTheme;
var theme_2 = theme.mapToAutowhateverTheme;

var Autosuggest_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _extends$$1 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }return target;
  };

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  var _react2 = _interopRequireDefault(_react__default);

  var _propTypes2 = _interopRequireDefault(propTypes);

  var _arrays2 = _interopRequireDefault(arrays);

  var _reactAutowhatever2 = _interopRequireDefault(dist$3);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var alwaysTrue = function alwaysTrue() {
    return true;
  };
  var defaultShouldRenderSuggestions = function defaultShouldRenderSuggestions(value) {
    return value.trim().length > 0;
  };
  var defaultRenderSuggestionsContainer = function defaultRenderSuggestionsContainer(_ref) {
    var containerProps = _ref.containerProps,
        children = _ref.children;
    return _react2.default.createElement('div', containerProps, children);
  };

  var Autosuggest = function (_Component) {
    _inherits(Autosuggest, _Component);

    function Autosuggest(_ref2) {
      var alwaysRenderSuggestions = _ref2.alwaysRenderSuggestions;

      _classCallCheck(this, Autosuggest);

      var _this = _possibleConstructorReturn(this, (Autosuggest.__proto__ || Object.getPrototypeOf(Autosuggest)).call(this));

      _initialiseProps.call(_this);

      _this.state = {
        isFocused: false,
        isCollapsed: !alwaysRenderSuggestions,
        highlightedSectionIndex: null,
        highlightedSuggestionIndex: null,
        valueBeforeUpDown: null
      };

      _this.justPressedUpDown = false;
      return _this;
    }

    _createClass(Autosuggest, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        document.addEventListener('mousedown', this.onDocumentMouseDown);

        this.input = this.autowhatever.input;
        this.suggestionsContainer = this.autowhatever.itemsContainer;
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if ((0, _arrays2.default)(nextProps.suggestions, this.props.suggestions)) {
          if (nextProps.highlightFirstSuggestion && nextProps.suggestions.length > 0 && this.justPressedUpDown === false) {
            this.highlightFirstSuggestion();
          }
        } else {
          if (this.willRenderSuggestions(nextProps)) {
            if (nextProps.highlightFirstSuggestion) {
              this.highlightFirstSuggestion();
            }

            if (this.state.isCollapsed && !this.justSelectedSuggestion) {
              this.revealSuggestions();
            }
          } else {
            this.resetHighlightedSuggestion();
          }
        }
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps, prevState) {
        var onSuggestionHighlighted = this.props.onSuggestionHighlighted;

        if (!onSuggestionHighlighted) {
          return;
        }

        var _state = this.state,
            highlightedSectionIndex = _state.highlightedSectionIndex,
            highlightedSuggestionIndex = _state.highlightedSuggestionIndex;

        if (highlightedSectionIndex !== prevState.highlightedSectionIndex || highlightedSuggestionIndex !== prevState.highlightedSuggestionIndex) {
          var suggestion = this.getHighlightedSuggestion();

          onSuggestionHighlighted({ suggestion: suggestion });
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        document.removeEventListener('mousedown', this.onDocumentMouseDown);
      }
    }, {
      key: 'updateHighlightedSuggestion',
      value: function updateHighlightedSuggestion(sectionIndex, suggestionIndex, prevValue) {
        this.setState(function (state) {
          var valueBeforeUpDown = state.valueBeforeUpDown;

          if (suggestionIndex === null) {
            valueBeforeUpDown = null;
          } else if (valueBeforeUpDown === null && typeof prevValue !== 'undefined') {
            valueBeforeUpDown = prevValue;
          }

          return {
            highlightedSectionIndex: sectionIndex,
            highlightedSuggestionIndex: suggestionIndex,
            valueBeforeUpDown: valueBeforeUpDown
          };
        });
      }
    }, {
      key: 'resetHighlightedSuggestion',
      value: function resetHighlightedSuggestion() {
        var shouldResetValueBeforeUpDown = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        this.setState(function (state) {
          var valueBeforeUpDown = state.valueBeforeUpDown;

          return {
            highlightedSectionIndex: null,
            highlightedSuggestionIndex: null,
            valueBeforeUpDown: shouldResetValueBeforeUpDown ? null : valueBeforeUpDown
          };
        });
      }
    }, {
      key: 'revealSuggestions',
      value: function revealSuggestions() {
        this.setState({
          isCollapsed: false
        });
      }
    }, {
      key: 'closeSuggestions',
      value: function closeSuggestions() {
        this.setState({
          highlightedSectionIndex: null,
          highlightedSuggestionIndex: null,
          valueBeforeUpDown: null,
          isCollapsed: true
        });
      }
    }, {
      key: 'getSuggestion',
      value: function getSuggestion(sectionIndex, suggestionIndex) {
        var _props = this.props,
            suggestions = _props.suggestions,
            multiSection = _props.multiSection,
            getSectionSuggestions = _props.getSectionSuggestions;

        if (multiSection) {
          return getSectionSuggestions(suggestions[sectionIndex])[suggestionIndex];
        }

        return suggestions[suggestionIndex];
      }
    }, {
      key: 'getHighlightedSuggestion',
      value: function getHighlightedSuggestion() {
        var _state2 = this.state,
            highlightedSectionIndex = _state2.highlightedSectionIndex,
            highlightedSuggestionIndex = _state2.highlightedSuggestionIndex;

        if (highlightedSuggestionIndex === null) {
          return null;
        }

        return this.getSuggestion(highlightedSectionIndex, highlightedSuggestionIndex);
      }
    }, {
      key: 'getSuggestionValueByIndex',
      value: function getSuggestionValueByIndex(sectionIndex, suggestionIndex) {
        var getSuggestionValue = this.props.getSuggestionValue;

        return getSuggestionValue(this.getSuggestion(sectionIndex, suggestionIndex));
      }
    }, {
      key: 'getSuggestionIndices',
      value: function getSuggestionIndices(suggestionElement) {
        var sectionIndex = suggestionElement.getAttribute('data-section-index');
        var suggestionIndex = suggestionElement.getAttribute('data-suggestion-index');

        return {
          sectionIndex: typeof sectionIndex === 'string' ? parseInt(sectionIndex, 10) : null,
          suggestionIndex: parseInt(suggestionIndex, 10)
        };
      }
    }, {
      key: 'findSuggestionElement',
      value: function findSuggestionElement(startNode) {
        var node = startNode;

        do {
          if (node.getAttribute('data-suggestion-index') !== null) {
            return node;
          }

          node = node.parentNode;
        } while (node !== null);

        console.error('Clicked element:', startNode); // eslint-disable-line no-console
        throw new Error("Couldn't find suggestion element");
      }
    }, {
      key: 'maybeCallOnChange',
      value: function maybeCallOnChange(event, newValue, method) {
        var _props$inputProps = this.props.inputProps,
            value = _props$inputProps.value,
            onChange = _props$inputProps.onChange;

        if (newValue !== value) {
          onChange(event, { newValue: newValue, method: method });
        }
      }
    }, {
      key: 'willRenderSuggestions',
      value: function willRenderSuggestions(props) {
        var suggestions = props.suggestions,
            inputProps = props.inputProps,
            shouldRenderSuggestions = props.shouldRenderSuggestions;
        var value = inputProps.value;

        return suggestions.length > 0 && shouldRenderSuggestions(value);
      }
    }, {
      key: 'getQuery',
      value: function getQuery() {
        var inputProps = this.props.inputProps;
        var value = inputProps.value;
        var valueBeforeUpDown = this.state.valueBeforeUpDown;

        return (valueBeforeUpDown || value).trim();
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props2 = this.props,
            suggestions = _props2.suggestions,
            renderInputComponent = _props2.renderInputComponent,
            onSuggestionsFetchRequested = _props2.onSuggestionsFetchRequested,
            renderSuggestion = _props2.renderSuggestion,
            inputProps = _props2.inputProps,
            multiSection = _props2.multiSection,
            renderSectionTitle = _props2.renderSectionTitle,
            id = _props2.id,
            getSectionSuggestions = _props2.getSectionSuggestions,
            theme$$1 = _props2.theme,
            getSuggestionValue = _props2.getSuggestionValue,
            alwaysRenderSuggestions = _props2.alwaysRenderSuggestions;
        var _state3 = this.state,
            isFocused = _state3.isFocused,
            isCollapsed = _state3.isCollapsed,
            highlightedSectionIndex = _state3.highlightedSectionIndex,
            highlightedSuggestionIndex = _state3.highlightedSuggestionIndex,
            valueBeforeUpDown = _state3.valueBeforeUpDown;

        var shouldRenderSuggestions = alwaysRenderSuggestions ? alwaysTrue : this.props.shouldRenderSuggestions;
        var value = inputProps.value,
            _onFocus = inputProps.onFocus,
            _onKeyDown = inputProps.onKeyDown;

        var willRenderSuggestions = this.willRenderSuggestions(this.props);
        var isOpen = alwaysRenderSuggestions || isFocused && !isCollapsed && willRenderSuggestions;
        var items = isOpen ? suggestions : [];
        var autowhateverInputProps = _extends$$1({}, inputProps, {
          onFocus: function onFocus(event) {
            if (!_this2.justSelectedSuggestion && !_this2.justClickedOnSuggestionsContainer) {
              var shouldRender = shouldRenderSuggestions(value);

              _this2.setState({
                isFocused: true,
                isCollapsed: !shouldRender
              });

              _onFocus && _onFocus(event);

              if (shouldRender) {
                onSuggestionsFetchRequested({ value: value, reason: 'input-focused' });
              }
            }
          },
          onBlur: function onBlur(event) {
            if (_this2.justClickedOnSuggestionsContainer) {
              _this2.input.focus();
              return;
            }

            _this2.blurEvent = event;

            if (!_this2.justSelectedSuggestion) {
              _this2.onBlur();
              _this2.onSuggestionsClearRequested();
            }
          },
          onChange: function onChange(event) {
            var value = event.target.value;

            var shouldRender = shouldRenderSuggestions(value);

            _this2.maybeCallOnChange(event, value, 'type');

            _this2.setState({
              highlightedSectionIndex: null,
              highlightedSuggestionIndex: null,
              valueBeforeUpDown: null,
              isCollapsed: !shouldRender
            });

            if (shouldRender) {
              onSuggestionsFetchRequested({ value: value, reason: 'input-changed' });
            } else {
              _this2.onSuggestionsClearRequested();
            }
          },
          onKeyDown: function onKeyDown(event, data) {
            var keyCode = event.keyCode;

            switch (keyCode) {
              case 40: // ArrowDown
              case 38:
                // ArrowUp
                if (isCollapsed) {
                  if (shouldRenderSuggestions(value)) {
                    onSuggestionsFetchRequested({
                      value: value,
                      reason: 'suggestions-revealed'
                    });
                    _this2.revealSuggestions();
                  }
                } else if (suggestions.length > 0) {
                  var newHighlightedSectionIndex = data.newHighlightedSectionIndex,
                      newHighlightedItemIndex = data.newHighlightedItemIndex;

                  var newValue = void 0;

                  if (newHighlightedItemIndex === null) {
                    // valueBeforeUpDown can be null if, for example, user
                    // hovers on the first suggestion and then pressed Up.
                    // If that happens, use the original input value.
                    newValue = valueBeforeUpDown === null ? value : valueBeforeUpDown;
                  } else {
                    newValue = _this2.getSuggestionValueByIndex(newHighlightedSectionIndex, newHighlightedItemIndex);
                  }

                  _this2.updateHighlightedSuggestion(newHighlightedSectionIndex, newHighlightedItemIndex, value);
                  _this2.maybeCallOnChange(event, newValue, keyCode === 40 ? 'down' : 'up');
                }

                event.preventDefault(); // Prevents the cursor from moving

                _this2.justPressedUpDown = true;

                setTimeout(function () {
                  _this2.justPressedUpDown = false;
                });

                break;

              // Enter
              case 13:
                {
                  // See #388
                  if (event.keyCode === 229) {
                    break;
                  }

                  var highlightedSuggestion = _this2.getHighlightedSuggestion();

                  if (isOpen && !alwaysRenderSuggestions) {
                    _this2.closeSuggestions();
                  }

                  if (highlightedSuggestion !== null) {
                    var _newValue = getSuggestionValue(highlightedSuggestion);

                    _this2.maybeCallOnChange(event, _newValue, 'enter');

                    _this2.onSuggestionSelected(event, {
                      suggestion: highlightedSuggestion,
                      suggestionValue: _newValue,
                      suggestionIndex: highlightedSuggestionIndex,
                      sectionIndex: highlightedSectionIndex,
                      method: 'enter'
                    });

                    _this2.justSelectedSuggestion = true;

                    setTimeout(function () {
                      _this2.justSelectedSuggestion = false;
                    });
                  }

                  break;
                }

              // Escape
              case 27:
                {
                  if (isOpen) {
                    // If input.type === 'search', the browser clears the input
                    // when Escape is pressed. We want to disable this default
                    // behaviour so that, when suggestions are shown, we just hide
                    // them, without clearing the input.
                    event.preventDefault();
                  }

                  var willCloseSuggestions = isOpen && !alwaysRenderSuggestions;

                  if (valueBeforeUpDown === null) {
                    // Didn't interact with Up/Down
                    if (!willCloseSuggestions) {
                      var _newValue2 = '';

                      _this2.maybeCallOnChange(event, _newValue2, 'escape');

                      if (shouldRenderSuggestions(_newValue2)) {
                        onSuggestionsFetchRequested({
                          value: _newValue2,
                          reason: 'escape-pressed'
                        });
                      } else {
                        _this2.onSuggestionsClearRequested();
                      }
                    }
                  } else {
                    // Interacted with Up/Down
                    _this2.maybeCallOnChange(event, valueBeforeUpDown, 'escape');
                  }

                  if (willCloseSuggestions) {
                    _this2.onSuggestionsClearRequested();
                    _this2.closeSuggestions();
                  } else {
                    _this2.resetHighlightedSuggestion();
                  }

                  break;
                }
            }

            _onKeyDown && _onKeyDown(event);
          }
        });
        var renderSuggestionData = {
          query: this.getQuery()
        };

        return _react2.default.createElement(_reactAutowhatever2.default, {
          multiSection: multiSection,
          items: items,
          renderInputComponent: renderInputComponent,
          renderItemsContainer: this.renderSuggestionsContainer,
          renderItem: renderSuggestion,
          renderItemData: renderSuggestionData,
          renderSectionTitle: renderSectionTitle,
          getSectionItems: getSectionSuggestions,
          highlightedSectionIndex: highlightedSectionIndex,
          highlightedItemIndex: highlightedSuggestionIndex,
          inputProps: autowhateverInputProps,
          itemProps: this.itemProps,
          theme: (0, theme.mapToAutowhateverTheme)(theme$$1),
          id: id,
          ref: this.storeAutowhateverRef
        });
      }
    }]);

    return Autosuggest;
  }(_react__default.Component);

  Autosuggest.propTypes = {
    suggestions: _propTypes2.default.array.isRequired,
    onSuggestionsFetchRequested: function onSuggestionsFetchRequested(props, propName) {
      var onSuggestionsFetchRequested = props[propName];

      if (typeof onSuggestionsFetchRequested !== 'function') {
        throw new Error("'onSuggestionsFetchRequested' must be implemented. See: https://github.com/moroshko/react-autosuggest#onSuggestionsFetchRequestedProp");
      }
    },
    onSuggestionsClearRequested: function onSuggestionsClearRequested(props, propName) {
      var onSuggestionsClearRequested = props[propName];

      if (props.alwaysRenderSuggestions === false && typeof onSuggestionsClearRequested !== 'function') {
        throw new Error("'onSuggestionsClearRequested' must be implemented. See: https://github.com/moroshko/react-autosuggest#onSuggestionsClearRequestedProp");
      }
    },
    onSuggestionSelected: _propTypes2.default.func,
    onSuggestionHighlighted: _propTypes2.default.func,
    renderInputComponent: _propTypes2.default.func,
    renderSuggestionsContainer: _propTypes2.default.func,
    getSuggestionValue: _propTypes2.default.func.isRequired,
    renderSuggestion: _propTypes2.default.func.isRequired,
    inputProps: function inputProps(props, propName) {
      var inputProps = props[propName];

      if (!inputProps.hasOwnProperty('value')) {
        throw new Error("'inputProps' must have 'value'.");
      }

      if (!inputProps.hasOwnProperty('onChange')) {
        throw new Error("'inputProps' must have 'onChange'.");
      }
    },
    shouldRenderSuggestions: _propTypes2.default.func,
    alwaysRenderSuggestions: _propTypes2.default.bool,
    multiSection: _propTypes2.default.bool,
    renderSectionTitle: function renderSectionTitle(props, propName) {
      var renderSectionTitle = props[propName];

      if (props.multiSection === true && typeof renderSectionTitle !== 'function') {
        throw new Error("'renderSectionTitle' must be implemented. See: https://github.com/moroshko/react-autosuggest#renderSectionTitleProp");
      }
    },
    getSectionSuggestions: function getSectionSuggestions(props, propName) {
      var getSectionSuggestions = props[propName];

      if (props.multiSection === true && typeof getSectionSuggestions !== 'function') {
        throw new Error("'getSectionSuggestions' must be implemented. See: https://github.com/moroshko/react-autosuggest#getSectionSuggestionsProp");
      }
    },
    focusInputOnSuggestionClick: _propTypes2.default.bool,
    highlightFirstSuggestion: _propTypes2.default.bool,
    theme: _propTypes2.default.object,
    id: _propTypes2.default.string
  };
  Autosuggest.defaultProps = {
    renderSuggestionsContainer: defaultRenderSuggestionsContainer,
    shouldRenderSuggestions: defaultShouldRenderSuggestions,
    alwaysRenderSuggestions: false,
    multiSection: false,
    focusInputOnSuggestionClick: true,
    highlightFirstSuggestion: false,
    theme: theme.defaultTheme,
    id: '1'
  };

  var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.onDocumentMouseDown = function (event) {
      _this3.justClickedOnSuggestionsContainer = false;

      var node = event.detail && event.detail.target || // This is for testing only. Please show me a better way to emulate this.
      event.target;

      while (node !== null && node !== document) {
        if (node.getAttribute('data-suggestion-index') !== null) {
          // Suggestion was clicked
          return;
        }

        if (node === _this3.suggestionsContainer) {
          // Something else inside suggestions container was clicked
          _this3.justClickedOnSuggestionsContainer = true;
          return;
        }

        node = node.parentNode;
      }
    };

    this.storeAutowhateverRef = function (autowhatever) {
      if (autowhatever !== null) {
        _this3.autowhatever = autowhatever;
      }
    };

    this.onSuggestionMouseEnter = function (event, _ref3) {
      var sectionIndex = _ref3.sectionIndex,
          itemIndex = _ref3.itemIndex;

      _this3.updateHighlightedSuggestion(sectionIndex, itemIndex);
    };

    this.highlightFirstSuggestion = function () {
      _this3.updateHighlightedSuggestion(_this3.props.multiSection ? 0 : null, 0);
    };

    this.onSuggestionMouseDown = function () {
      _this3.justSelectedSuggestion = true;
    };

    this.onSuggestionsClearRequested = function () {
      var onSuggestionsClearRequested = _this3.props.onSuggestionsClearRequested;

      onSuggestionsClearRequested && onSuggestionsClearRequested();
    };

    this.onSuggestionSelected = function (event, data) {
      var _props3 = _this3.props,
          alwaysRenderSuggestions = _props3.alwaysRenderSuggestions,
          onSuggestionSelected = _props3.onSuggestionSelected,
          onSuggestionsFetchRequested = _props3.onSuggestionsFetchRequested;

      onSuggestionSelected && onSuggestionSelected(event, data);

      if (alwaysRenderSuggestions) {
        onSuggestionsFetchRequested({
          value: data.suggestionValue,
          reason: 'suggestion-selected'
        });
      } else {
        _this3.onSuggestionsClearRequested();
      }

      _this3.resetHighlightedSuggestion();
    };

    this.onSuggestionClick = function (event) {
      var _props4 = _this3.props,
          alwaysRenderSuggestions = _props4.alwaysRenderSuggestions,
          focusInputOnSuggestionClick = _props4.focusInputOnSuggestionClick;

      var _getSuggestionIndices = _this3.getSuggestionIndices(_this3.findSuggestionElement(event.target)),
          sectionIndex = _getSuggestionIndices.sectionIndex,
          suggestionIndex = _getSuggestionIndices.suggestionIndex;

      var clickedSuggestion = _this3.getSuggestion(sectionIndex, suggestionIndex);
      var clickedSuggestionValue = _this3.props.getSuggestionValue(clickedSuggestion);

      _this3.maybeCallOnChange(event, clickedSuggestionValue, 'click');
      _this3.onSuggestionSelected(event, {
        suggestion: clickedSuggestion,
        suggestionValue: clickedSuggestionValue,
        suggestionIndex: suggestionIndex,
        sectionIndex: sectionIndex,
        method: 'click'
      });

      if (!alwaysRenderSuggestions) {
        _this3.closeSuggestions();
      }

      if (focusInputOnSuggestionClick === true) {
        _this3.input.focus();
      } else {
        _this3.onBlur();
      }

      setTimeout(function () {
        _this3.justSelectedSuggestion = false;
      });
    };

    this.onBlur = function () {
      var _props5 = _this3.props,
          inputProps = _props5.inputProps,
          shouldRenderSuggestions = _props5.shouldRenderSuggestions;
      var value = inputProps.value,
          onBlur = inputProps.onBlur;

      var highlightedSuggestion = _this3.getHighlightedSuggestion();
      var shouldRender = shouldRenderSuggestions(value);

      _this3.setState({
        isFocused: false,
        highlightedSectionIndex: null,
        highlightedSuggestionIndex: null,
        valueBeforeUpDown: null,
        isCollapsed: !shouldRender
      });

      onBlur && onBlur(_this3.blurEvent, { highlightedSuggestion: highlightedSuggestion });
    };

    this.resetHighlightedSuggestionOnMouseLeave = function () {
      _this3.resetHighlightedSuggestion(false); // shouldResetValueBeforeUpDown
    };

    this.itemProps = function (_ref4) {
      var sectionIndex = _ref4.sectionIndex,
          itemIndex = _ref4.itemIndex;

      return {
        'data-section-index': sectionIndex,
        'data-suggestion-index': itemIndex,
        onMouseEnter: _this3.onSuggestionMouseEnter,
        onMouseLeave: _this3.resetHighlightedSuggestionOnMouseLeave,
        onMouseDown: _this3.onSuggestionMouseDown,
        onTouchStart: _this3.onSuggestionMouseDown, // Because on iOS `onMouseDown` is not triggered
        onClick: _this3.onSuggestionClick
      };
    };

    this.renderSuggestionsContainer = function (_ref5) {
      var containerProps = _ref5.containerProps,
          children = _ref5.children;
      var renderSuggestionsContainer = _this3.props.renderSuggestionsContainer;

      return renderSuggestionsContainer({
        containerProps: containerProps,
        children: children,
        query: _this3.getQuery()
      });
    };
  };

  exports.default = Autosuggest;
});

unwrapExports(Autosuggest_1);

var dist$5 = Autosuggest_1.default;

var parse = function parse(text, matches) {
  var result = [];

  if (matches.length === 0) {
    result.push({
      text: text,
      highlight: false
    });
  } else {
    if (matches[0][0] > 0) {
      result.push({
        text: text.slice(0, matches[0][0]),
        highlight: false
      });
    }
  }

  matches.forEach(function (match, i) {
    var startIndex = match[0];
    var endIndex = match[1];

    result.push({
      text: text.slice(startIndex, endIndex),
      highlight: true
    });

    if (i === matches.length - 1) {
      if (endIndex < text.length) {
        result.push({
          text: text.slice(endIndex, text.length),
          highlight: false
        });
      }
    } else if (endIndex < matches[i + 1][0]) {
      result.push({
        text: text.slice(endIndex, matches[i + 1][0]),
        highlight: false
      });
    }
  });

  return result;
};

var fuse = createCommonjsModule(function (module, exports) {
  /*!
   * Fuse.js v3.2.0 - Lightweight fuzzy-search (http://fusejs.io)
   * 
   * Copyright (c) 2012-2017 Kirollos Risk (http://kiro.me)
   * All Rights Reserved. Apache Software License 2.0
   * 
   * http://www.apache.org/licenses/LICENSE-2.0
   */
  (function webpackUniversalModuleDefinition(root, factory) {
    module.exports = factory();
  })(commonjsGlobal, function () {
    return (/******/function (modules) {
        // webpackBootstrap
        /******/ // The module cache
        /******/var installedModules = {};
        /******/
        /******/ // The require function
        /******/function __webpack_require__(moduleId) {
          /******/
          /******/ // Check if module is in cache
          /******/if (installedModules[moduleId]) {
            /******/return installedModules[moduleId].exports;
            /******/
          }
          /******/ // Create a new module (and put it into the cache)
          /******/var module = installedModules[moduleId] = {
            /******/i: moduleId,
            /******/l: false,
            /******/exports: {}
            /******/ };
          /******/
          /******/ // Execute the module function
          /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
          /******/
          /******/ // Flag the module as loaded
          /******/module.l = true;
          /******/
          /******/ // Return the exports of the module
          /******/return module.exports;
          /******/
        }
        /******/
        /******/
        /******/ // expose the modules object (__webpack_modules__)
        /******/__webpack_require__.m = modules;
        /******/
        /******/ // expose the module cache
        /******/__webpack_require__.c = installedModules;
        /******/
        /******/ // identity function for calling harmony imports with the correct context
        /******/__webpack_require__.i = function (value) {
          return value;
        };
        /******/
        /******/ // define getter function for harmony exports
        /******/__webpack_require__.d = function (exports, name, getter) {
          /******/if (!__webpack_require__.o(exports, name)) {
            /******/Object.defineProperty(exports, name, {
              /******/configurable: false,
              /******/enumerable: true,
              /******/get: getter
              /******/ });
            /******/
          }
          /******/
        };
        /******/
        /******/ // getDefaultExport function for compatibility with non-harmony modules
        /******/__webpack_require__.n = function (module) {
          /******/var getter = module && module.__esModule ?
          /******/function getDefault() {
            return module['default'];
          } :
          /******/function getModuleExports() {
            return module;
          };
          /******/__webpack_require__.d(getter, 'a', getter);
          /******/return getter;
          /******/
        };
        /******/
        /******/ // Object.prototype.hasOwnProperty.call
        /******/__webpack_require__.o = function (object, property) {
          return Object.prototype.hasOwnProperty.call(object, property);
        };
        /******/
        /******/ // __webpack_public_path__
        /******/__webpack_require__.p = "";
        /******/
        /******/ // Load entry module and return exports
        /******/return __webpack_require__(__webpack_require__.s = 8);
        /******/
      }(
      /************************************************************************/
      /******/[
      /* 0 */
      /***/function (module, exports, __webpack_require__) {

        module.exports = function (obj) {
          return Object.prototype.toString.call(obj) === '[object Array]';
        };

        /***/
      },
      /* 1 */
      /***/function (module, exports, __webpack_require__) {

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
            }
          }return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
          };
        }();

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var bitapRegexSearch = __webpack_require__(5);
        var bitapSearch = __webpack_require__(7);
        var patternAlphabet = __webpack_require__(4);

        var Bitap = function () {
          function Bitap(pattern, _ref) {
            var _ref$location = _ref.location,
                location = _ref$location === undefined ? 0 : _ref$location,
                _ref$distance = _ref.distance,
                distance = _ref$distance === undefined ? 100 : _ref$distance,
                _ref$threshold = _ref.threshold,
                threshold = _ref$threshold === undefined ? 0.6 : _ref$threshold,
                _ref$maxPatternLength = _ref.maxPatternLength,
                maxPatternLength = _ref$maxPatternLength === undefined ? 32 : _ref$maxPatternLength,
                _ref$isCaseSensitive = _ref.isCaseSensitive,
                isCaseSensitive = _ref$isCaseSensitive === undefined ? false : _ref$isCaseSensitive,
                _ref$tokenSeparator = _ref.tokenSeparator,
                tokenSeparator = _ref$tokenSeparator === undefined ? / +/g : _ref$tokenSeparator,
                _ref$findAllMatches = _ref.findAllMatches,
                findAllMatches = _ref$findAllMatches === undefined ? false : _ref$findAllMatches,
                _ref$minMatchCharLeng = _ref.minMatchCharLength,
                minMatchCharLength = _ref$minMatchCharLeng === undefined ? 1 : _ref$minMatchCharLeng;

            _classCallCheck(this, Bitap);

            this.options = {
              location: location,
              distance: distance,
              threshold: threshold,
              maxPatternLength: maxPatternLength,
              isCaseSensitive: isCaseSensitive,
              tokenSeparator: tokenSeparator,
              findAllMatches: findAllMatches,
              minMatchCharLength: minMatchCharLength
            };

            this.pattern = this.options.isCaseSensitive ? pattern : pattern.toLowerCase();

            if (this.pattern.length <= maxPatternLength) {
              this.patternAlphabet = patternAlphabet(this.pattern);
            }
          }

          _createClass(Bitap, [{
            key: 'search',
            value: function search(text) {
              if (!this.options.isCaseSensitive) {
                text = text.toLowerCase();
              }

              // Exact match
              if (this.pattern === text) {
                return {
                  isMatch: true,
                  score: 0,
                  matchedIndices: [[0, text.length - 1]]
                };
              }

              // When pattern length is greater than the machine word length, just do a a regex comparison
              var _options = this.options,
                  maxPatternLength = _options.maxPatternLength,
                  tokenSeparator = _options.tokenSeparator;

              if (this.pattern.length > maxPatternLength) {
                return bitapRegexSearch(text, this.pattern, tokenSeparator);
              }

              // Otherwise, use Bitap algorithm
              var _options2 = this.options,
                  location = _options2.location,
                  distance = _options2.distance,
                  threshold = _options2.threshold,
                  findAllMatches = _options2.findAllMatches,
                  minMatchCharLength = _options2.minMatchCharLength;

              return bitapSearch(text, this.pattern, this.patternAlphabet, {
                location: location,
                distance: distance,
                threshold: threshold,
                findAllMatches: findAllMatches,
                minMatchCharLength: minMatchCharLength
              });
            }
          }]);

          return Bitap;
        }();

        // let x = new Bitap("od mn war", {})
        // let result = x.search("Old Man's War")
        // console.log(result)

        module.exports = Bitap;

        /***/
      },
      /* 2 */
      /***/function (module, exports, __webpack_require__) {

        var isArray = __webpack_require__(0);

        var deepValue = function deepValue(obj, path, list) {
          if (!path) {
            // If there's no path left, we've gotten to the object we care about.
            list.push(obj);
          } else {
            var dotIndex = path.indexOf('.');
            var firstSegment = path;
            var remaining = null;

            if (dotIndex !== -1) {
              firstSegment = path.slice(0, dotIndex);
              remaining = path.slice(dotIndex + 1);
            }

            var value = obj[firstSegment];

            if (value !== null && value !== undefined) {
              if (!remaining && (typeof value === 'string' || typeof value === 'number')) {
                list.push(value.toString());
              } else if (isArray(value)) {
                // Search each item in the array.
                for (var i = 0, len = value.length; i < len; i += 1) {
                  deepValue(value[i], remaining, list);
                }
              } else if (remaining) {
                // An object. Recurse further.
                deepValue(value, remaining, list);
              }
            }
          }

          return list;
        };

        module.exports = function (obj, path) {
          return deepValue(obj, path, []);
        };

        /***/
      },
      /* 3 */
      /***/function (module, exports, __webpack_require__) {

        module.exports = function () {
          var matchmask = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
          var minMatchCharLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

          var matchedIndices = [];
          var start = -1;
          var end = -1;
          var i = 0;

          for (var len = matchmask.length; i < len; i += 1) {
            var match = matchmask[i];
            if (match && start === -1) {
              start = i;
            } else if (!match && start !== -1) {
              end = i - 1;
              if (end - start + 1 >= minMatchCharLength) {
                matchedIndices.push([start, end]);
              }
              start = -1;
            }
          }

          // (i-1 - start) + 1 => i - start
          if (matchmask[i - 1] && i - start >= minMatchCharLength) {
            matchedIndices.push([start, i - 1]);
          }

          return matchedIndices;
        };

        /***/
      },
      /* 4 */
      /***/function (module, exports, __webpack_require__) {

        module.exports = function (pattern) {
          var mask = {};
          var len = pattern.length;

          for (var i = 0; i < len; i += 1) {
            mask[pattern.charAt(i)] = 0;
          }

          for (var _i = 0; _i < len; _i += 1) {
            mask[pattern.charAt(_i)] |= 1 << len - _i - 1;
          }

          return mask;
        };

        /***/
      },
      /* 5 */
      /***/function (module, exports, __webpack_require__) {

        var SPECIAL_CHARS_REGEX = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;

        module.exports = function (text, pattern) {
          var tokenSeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : / +/g;

          var regex = new RegExp(pattern.replace(SPECIAL_CHARS_REGEX, '\\$&').replace(tokenSeparator, '|'));
          var matches = text.match(regex);
          var isMatch = !!matches;
          var matchedIndices = [];

          if (isMatch) {
            for (var i = 0, matchesLen = matches.length; i < matchesLen; i += 1) {
              var match = matches[i];
              matchedIndices.push([text.indexOf(match), match.length - 1]);
            }
          }

          return {
            // TODO: revisit this score
            score: isMatch ? 0.5 : 1,
            isMatch: isMatch,
            matchedIndices: matchedIndices
          };
        };

        /***/
      },
      /* 6 */
      /***/function (module, exports, __webpack_require__) {

        module.exports = function (pattern, _ref) {
          var _ref$errors = _ref.errors,
              errors = _ref$errors === undefined ? 0 : _ref$errors,
              _ref$currentLocation = _ref.currentLocation,
              currentLocation = _ref$currentLocation === undefined ? 0 : _ref$currentLocation,
              _ref$expectedLocation = _ref.expectedLocation,
              expectedLocation = _ref$expectedLocation === undefined ? 0 : _ref$expectedLocation,
              _ref$distance = _ref.distance,
              distance = _ref$distance === undefined ? 100 : _ref$distance;

          var accuracy = errors / pattern.length;
          var proximity = Math.abs(expectedLocation - currentLocation);

          if (!distance) {
            // Dodge divide by zero error.
            return proximity ? 1.0 : accuracy;
          }

          return accuracy + proximity / distance;
        };

        /***/
      },
      /* 7 */
      /***/function (module, exports, __webpack_require__) {

        var bitapScore = __webpack_require__(6);
        var matchedIndices = __webpack_require__(3);

        module.exports = function (text, pattern, patternAlphabet, _ref) {
          var _ref$location = _ref.location,
              location = _ref$location === undefined ? 0 : _ref$location,
              _ref$distance = _ref.distance,
              distance = _ref$distance === undefined ? 100 : _ref$distance,
              _ref$threshold = _ref.threshold,
              threshold = _ref$threshold === undefined ? 0.6 : _ref$threshold,
              _ref$findAllMatches = _ref.findAllMatches,
              findAllMatches = _ref$findAllMatches === undefined ? false : _ref$findAllMatches,
              _ref$minMatchCharLeng = _ref.minMatchCharLength,
              minMatchCharLength = _ref$minMatchCharLeng === undefined ? 1 : _ref$minMatchCharLeng;

          var expectedLocation = location;
          // Set starting location at beginning text and initialize the alphabet.
          var textLen = text.length;
          // Highest score beyond which we give up.
          var currentThreshold = threshold;
          // Is there a nearby exact match? (speedup)
          var bestLocation = text.indexOf(pattern, expectedLocation);

          var patternLen = pattern.length;

          // a mask of the matches
          var matchMask = [];
          for (var i = 0; i < textLen; i += 1) {
            matchMask[i] = 0;
          }

          if (bestLocation !== -1) {
            var score = bitapScore(pattern, {
              errors: 0,
              currentLocation: bestLocation,
              expectedLocation: expectedLocation,
              distance: distance
            });
            currentThreshold = Math.min(score, currentThreshold);

            // What about in the other direction? (speed up)
            bestLocation = text.lastIndexOf(pattern, expectedLocation + patternLen);

            if (bestLocation !== -1) {
              var _score = bitapScore(pattern, {
                errors: 0,
                currentLocation: bestLocation,
                expectedLocation: expectedLocation,
                distance: distance
              });
              currentThreshold = Math.min(_score, currentThreshold);
            }
          }

          // Reset the best location
          bestLocation = -1;

          var lastBitArr = [];
          var finalScore = 1;
          var binMax = patternLen + textLen;

          var mask = 1 << patternLen - 1;

          for (var _i = 0; _i < patternLen; _i += 1) {
            // Scan for the best match; each iteration allows for one more error.
            // Run a binary search to determine how far from the match location we can stray
            // at this error level.
            var binMin = 0;
            var binMid = binMax;

            while (binMin < binMid) {
              var _score3 = bitapScore(pattern, {
                errors: _i,
                currentLocation: expectedLocation + binMid,
                expectedLocation: expectedLocation,
                distance: distance
              });

              if (_score3 <= currentThreshold) {
                binMin = binMid;
              } else {
                binMax = binMid;
              }

              binMid = Math.floor((binMax - binMin) / 2 + binMin);
            }

            // Use the result from this iteration as the maximum for the next.
            binMax = binMid;

            var start = Math.max(1, expectedLocation - binMid + 1);
            var finish = findAllMatches ? textLen : Math.min(expectedLocation + binMid, textLen) + patternLen;

            // Initialize the bit array
            var bitArr = Array(finish + 2);

            bitArr[finish + 1] = (1 << _i) - 1;

            for (var j = finish; j >= start; j -= 1) {
              var currentLocation = j - 1;
              var charMatch = patternAlphabet[text.charAt(currentLocation)];

              if (charMatch) {
                matchMask[currentLocation] = 1;
              }

              // First pass: exact match
              bitArr[j] = (bitArr[j + 1] << 1 | 1) & charMatch;

              // Subsequent passes: fuzzy match
              if (_i !== 0) {
                bitArr[j] |= (lastBitArr[j + 1] | lastBitArr[j]) << 1 | 1 | lastBitArr[j + 1];
              }

              if (bitArr[j] & mask) {
                finalScore = bitapScore(pattern, {
                  errors: _i,
                  currentLocation: currentLocation,
                  expectedLocation: expectedLocation,
                  distance: distance
                });

                // This match will almost certainly be better than any existing match.
                // But check anyway.
                if (finalScore <= currentThreshold) {
                  // Indeed it is
                  currentThreshold = finalScore;
                  bestLocation = currentLocation;

                  // Already passed `loc`, downhill from here on in.
                  if (bestLocation <= expectedLocation) {
                    break;
                  }

                  // When passing `bestLocation`, don't exceed our current distance from `expectedLocation`.
                  start = Math.max(1, 2 * expectedLocation - bestLocation);
                }
              }
            }

            // No hope for a (better) match at greater error levels.
            var _score2 = bitapScore(pattern, {
              errors: _i + 1,
              currentLocation: expectedLocation,
              expectedLocation: expectedLocation,
              distance: distance
            });

            if (_score2 > currentThreshold) {
              break;
            }

            lastBitArr = bitArr;
          }

          // Count exact matches (those with a score of 0) to be "almost" exact
          return {
            isMatch: bestLocation >= 0,
            score: finalScore === 0 ? 0.001 : finalScore,
            matchedIndices: matchedIndices(matchMask, minMatchCharLength)
          };
        };

        /***/
      },
      /* 8 */
      /***/function (module, exports, __webpack_require__) {

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
            }
          }return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
          };
        }();

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var Bitap = __webpack_require__(1);
        var deepValue = __webpack_require__(2);
        var isArray = __webpack_require__(0);

        var Fuse = function () {
          function Fuse(list, _ref) {
            var _ref$location = _ref.location,
                location = _ref$location === undefined ? 0 : _ref$location,
                _ref$distance = _ref.distance,
                distance = _ref$distance === undefined ? 100 : _ref$distance,
                _ref$threshold = _ref.threshold,
                threshold = _ref$threshold === undefined ? 0.6 : _ref$threshold,
                _ref$maxPatternLength = _ref.maxPatternLength,
                maxPatternLength = _ref$maxPatternLength === undefined ? 32 : _ref$maxPatternLength,
                _ref$caseSensitive = _ref.caseSensitive,
                caseSensitive = _ref$caseSensitive === undefined ? false : _ref$caseSensitive,
                _ref$tokenSeparator = _ref.tokenSeparator,
                tokenSeparator = _ref$tokenSeparator === undefined ? / +/g : _ref$tokenSeparator,
                _ref$findAllMatches = _ref.findAllMatches,
                findAllMatches = _ref$findAllMatches === undefined ? false : _ref$findAllMatches,
                _ref$minMatchCharLeng = _ref.minMatchCharLength,
                minMatchCharLength = _ref$minMatchCharLeng === undefined ? 1 : _ref$minMatchCharLeng,
                _ref$id = _ref.id,
                id = _ref$id === undefined ? null : _ref$id,
                _ref$keys = _ref.keys,
                keys = _ref$keys === undefined ? [] : _ref$keys,
                _ref$shouldSort = _ref.shouldSort,
                shouldSort = _ref$shouldSort === undefined ? true : _ref$shouldSort,
                _ref$getFn = _ref.getFn,
                getFn = _ref$getFn === undefined ? deepValue : _ref$getFn,
                _ref$sortFn = _ref.sortFn,
                sortFn = _ref$sortFn === undefined ? function (a, b) {
              return a.score - b.score;
            } : _ref$sortFn,
                _ref$tokenize = _ref.tokenize,
                tokenize = _ref$tokenize === undefined ? false : _ref$tokenize,
                _ref$matchAllTokens = _ref.matchAllTokens,
                matchAllTokens = _ref$matchAllTokens === undefined ? false : _ref$matchAllTokens,
                _ref$includeMatches = _ref.includeMatches,
                includeMatches = _ref$includeMatches === undefined ? false : _ref$includeMatches,
                _ref$includeScore = _ref.includeScore,
                includeScore = _ref$includeScore === undefined ? false : _ref$includeScore,
                _ref$verbose = _ref.verbose,
                verbose = _ref$verbose === undefined ? false : _ref$verbose;

            _classCallCheck(this, Fuse);

            this.options = {
              location: location,
              distance: distance,
              threshold: threshold,
              maxPatternLength: maxPatternLength,
              isCaseSensitive: caseSensitive,
              tokenSeparator: tokenSeparator,
              findAllMatches: findAllMatches,
              minMatchCharLength: minMatchCharLength,
              id: id,
              keys: keys,
              includeMatches: includeMatches,
              includeScore: includeScore,
              shouldSort: shouldSort,
              getFn: getFn,
              sortFn: sortFn,
              verbose: verbose,
              tokenize: tokenize,
              matchAllTokens: matchAllTokens
            };

            this.setCollection(list);
          }

          _createClass(Fuse, [{
            key: 'setCollection',
            value: function setCollection(list) {
              this.list = list;
              return list;
            }
          }, {
            key: 'search',
            value: function search(pattern) {
              this._log('---------\nSearch pattern: "' + pattern + '"');

              var _prepareSearchers2 = this._prepareSearchers(pattern),
                  tokenSearchers = _prepareSearchers2.tokenSearchers,
                  fullSearcher = _prepareSearchers2.fullSearcher;

              var _search2 = this._search(tokenSearchers, fullSearcher),
                  weights = _search2.weights,
                  results = _search2.results;

              this._computeScore(weights, results);

              if (this.options.shouldSort) {
                this._sort(results);
              }

              return this._format(results);
            }
          }, {
            key: '_prepareSearchers',
            value: function _prepareSearchers() {
              var pattern = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

              var tokenSearchers = [];

              if (this.options.tokenize) {
                // Tokenize on the separator
                var tokens = pattern.split(this.options.tokenSeparator);
                for (var i = 0, len = tokens.length; i < len; i += 1) {
                  tokenSearchers.push(new Bitap(tokens[i], this.options));
                }
              }

              var fullSearcher = new Bitap(pattern, this.options);

              return { tokenSearchers: tokenSearchers, fullSearcher: fullSearcher };
            }
          }, {
            key: '_search',
            value: function _search() {
              var tokenSearchers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
              var fullSearcher = arguments[1];

              var list = this.list;
              var resultMap = {};
              var results = [];

              // Check the first item in the list, if it's a string, then we assume
              // that every item in the list is also a string, and thus it's a flattened array.
              if (typeof list[0] === 'string') {
                // Iterate over every item
                for (var i = 0, len = list.length; i < len; i += 1) {
                  this._analyze({
                    key: '',
                    value: list[i],
                    record: i,
                    index: i
                  }, {
                    resultMap: resultMap,
                    results: results,
                    tokenSearchers: tokenSearchers,
                    fullSearcher: fullSearcher
                  });
                }

                return { weights: null, results: results };
              }

              // Otherwise, the first item is an Object (hopefully), and thus the searching
              // is done on the values of the keys of each item.
              var weights = {};
              for (var _i = 0, _len = list.length; _i < _len; _i += 1) {
                var item = list[_i];
                // Iterate over every key
                for (var j = 0, keysLen = this.options.keys.length; j < keysLen; j += 1) {
                  var key = this.options.keys[j];
                  if (typeof key !== 'string') {
                    weights[key.name] = {
                      weight: 1 - key.weight || 1
                    };
                    if (key.weight <= 0 || key.weight > 1) {
                      throw new Error('Key weight has to be > 0 and <= 1');
                    }
                    key = key.name;
                  } else {
                    weights[key] = {
                      weight: 1
                    };
                  }

                  this._analyze({
                    key: key,
                    value: this.options.getFn(item, key),
                    record: item,
                    index: _i
                  }, {
                    resultMap: resultMap,
                    results: results,
                    tokenSearchers: tokenSearchers,
                    fullSearcher: fullSearcher
                  });
                }
              }

              return { weights: weights, results: results };
            }
          }, {
            key: '_analyze',
            value: function _analyze(_ref2, _ref3) {
              var key = _ref2.key,
                  _ref2$arrayIndex = _ref2.arrayIndex,
                  arrayIndex = _ref2$arrayIndex === undefined ? -1 : _ref2$arrayIndex,
                  value = _ref2.value,
                  record = _ref2.record,
                  index = _ref2.index;
              var _ref3$tokenSearchers = _ref3.tokenSearchers,
                  tokenSearchers = _ref3$tokenSearchers === undefined ? [] : _ref3$tokenSearchers,
                  _ref3$fullSearcher = _ref3.fullSearcher,
                  fullSearcher = _ref3$fullSearcher === undefined ? [] : _ref3$fullSearcher,
                  _ref3$resultMap = _ref3.resultMap,
                  resultMap = _ref3$resultMap === undefined ? {} : _ref3$resultMap,
                  _ref3$results = _ref3.results,
                  results = _ref3$results === undefined ? [] : _ref3$results;

              // Check if the texvaluet can be searched
              if (value === undefined || value === null) {
                return;
              }

              var exists = false;
              var averageScore = -1;
              var numTextMatches = 0;

              if (typeof value === 'string') {
                this._log('\nKey: ' + (key === '' ? '-' : key));

                var mainSearchResult = fullSearcher.search(value);
                this._log('Full text: "' + value + '", score: ' + mainSearchResult.score);

                if (this.options.tokenize) {
                  var words = value.split(this.options.tokenSeparator);
                  var scores = [];

                  for (var i = 0; i < tokenSearchers.length; i += 1) {
                    var tokenSearcher = tokenSearchers[i];

                    this._log('\nPattern: "' + tokenSearcher.pattern + '"');

                    // let tokenScores = []
                    var hasMatchInText = false;

                    for (var j = 0; j < words.length; j += 1) {
                      var word = words[j];
                      var tokenSearchResult = tokenSearcher.search(word);
                      var obj = {};
                      if (tokenSearchResult.isMatch) {
                        obj[word] = tokenSearchResult.score;
                        exists = true;
                        hasMatchInText = true;
                        scores.push(tokenSearchResult.score);
                      } else {
                        obj[word] = 1;
                        if (!this.options.matchAllTokens) {
                          scores.push(1);
                        }
                      }
                      this._log('Token: "' + word + '", score: ' + obj[word]);
                      // tokenScores.push(obj)
                    }

                    if (hasMatchInText) {
                      numTextMatches += 1;
                    }
                  }

                  averageScore = scores[0];
                  var scoresLen = scores.length;
                  for (var _i2 = 1; _i2 < scoresLen; _i2 += 1) {
                    averageScore += scores[_i2];
                  }
                  averageScore = averageScore / scoresLen;

                  this._log('Token score average:', averageScore);
                }

                var finalScore = mainSearchResult.score;
                if (averageScore > -1) {
                  finalScore = (finalScore + averageScore) / 2;
                }

                this._log('Score average:', finalScore);

                var checkTextMatches = this.options.tokenize && this.options.matchAllTokens ? numTextMatches >= tokenSearchers.length : true;

                this._log('\nCheck Matches: ' + checkTextMatches);

                // If a match is found, add the item to <rawResults>, including its score
                if ((exists || mainSearchResult.isMatch) && checkTextMatches) {
                  // Check if the item already exists in our results
                  var existingResult = resultMap[index];
                  if (existingResult) {
                    // Use the lowest score
                    // existingResult.score, bitapResult.score
                    existingResult.output.push({
                      key: key,
                      arrayIndex: arrayIndex,
                      value: value,
                      score: finalScore,
                      matchedIndices: mainSearchResult.matchedIndices
                    });
                  } else {
                    // Add it to the raw result list
                    resultMap[index] = {
                      item: record,
                      output: [{
                        key: key,
                        arrayIndex: arrayIndex,
                        value: value,
                        score: finalScore,
                        matchedIndices: mainSearchResult.matchedIndices
                      }]
                    };

                    results.push(resultMap[index]);
                  }
                }
              } else if (isArray(value)) {
                for (var _i3 = 0, len = value.length; _i3 < len; _i3 += 1) {
                  this._analyze({
                    key: key,
                    arrayIndex: _i3,
                    value: value[_i3],
                    record: record,
                    index: index
                  }, {
                    resultMap: resultMap,
                    results: results,
                    tokenSearchers: tokenSearchers,
                    fullSearcher: fullSearcher
                  });
                }
              }
            }
          }, {
            key: '_computeScore',
            value: function _computeScore(weights, results) {
              this._log('\n\nComputing score:\n');

              for (var i = 0, len = results.length; i < len; i += 1) {
                var output = results[i].output;
                var scoreLen = output.length;

                var totalScore = 0;
                var bestScore = 1;

                for (var j = 0; j < scoreLen; j += 1) {
                  var weight = weights ? weights[output[j].key].weight : 1;
                  var score = weight === 1 ? output[j].score : output[j].score || 0.001;
                  var nScore = score * weight;

                  if (weight !== 1) {
                    bestScore = Math.min(bestScore, nScore);
                  } else {
                    output[j].nScore = nScore;
                    totalScore += nScore;
                  }
                }

                results[i].score = bestScore === 1 ? totalScore / scoreLen : bestScore;

                this._log(results[i]);
              }
            }
          }, {
            key: '_sort',
            value: function _sort(results) {
              this._log('\n\nSorting....');
              results.sort(this.options.sortFn);
            }
          }, {
            key: '_format',
            value: function _format(results) {
              var finalOutput = [];

              this._log('\n\nOutput:\n\n', JSON.stringify(results));

              var transformers = [];

              if (this.options.includeMatches) {
                transformers.push(function (result, data) {
                  var output = result.output;
                  data.matches = [];

                  for (var i = 0, len = output.length; i < len; i += 1) {
                    var item = output[i];

                    if (item.matchedIndices.length === 0) {
                      continue;
                    }

                    var obj = {
                      indices: item.matchedIndices,
                      value: item.value
                    };
                    if (item.key) {
                      obj.key = item.key;
                    }
                    if (item.hasOwnProperty('arrayIndex') && item.arrayIndex > -1) {
                      obj.arrayIndex = item.arrayIndex;
                    }
                    data.matches.push(obj);
                  }
                });
              }

              if (this.options.includeScore) {
                transformers.push(function (result, data) {
                  data.score = result.score;
                });
              }

              for (var i = 0, len = results.length; i < len; i += 1) {
                var result = results[i];

                if (this.options.id) {
                  result.item = this.options.getFn(result.item, this.options.id)[0];
                }

                if (!transformers.length) {
                  finalOutput.push(result.item);
                  continue;
                }

                var data = {
                  item: result.item
                };

                for (var j = 0, _len2 = transformers.length; j < _len2; j += 1) {
                  transformers[j](result, data);
                }

                finalOutput.push(data);
              }

              return finalOutput;
            }
          }, {
            key: '_log',
            value: function _log() {
              if (this.options.verbose) {
                var _console;

                (_console = console).log.apply(_console, arguments);
              }
            }
          }]);

          return Fuse;
        }();

        module.exports = Fuse;

        /***/
      }]
      /******/)
    );
  });
  
});

var Fuse = unwrapExports(fuse);
var fuse_1 = fuse.Fuse;

var mousetrap = createCommonjsModule(function (module) {
    /*global define:false */
    /**
     * Copyright 2012-2017 Craig Campbell
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     *
     * Mousetrap is a simple keyboard shortcut library for Javascript with
     * no external dependencies
     *
     * @version 1.6.1
     * @url craig.is/killing/mice
     */
    (function (window, document, undefined) {

        // Check if mousetrap is used inside browser, if not, return
        if (!window) {
            return;
        }

        /**
         * mapping of special keycodes to their corresponding keys
         *
         * everything in this dictionary cannot use keypress events
         * so it has to be here to map to the correct keycodes for
         * keyup/keydown events
         *
         * @type {Object}
         */
        var _MAP = {
            8: 'backspace',
            9: 'tab',
            13: 'enter',
            16: 'shift',
            17: 'ctrl',
            18: 'alt',
            20: 'capslock',
            27: 'esc',
            32: 'space',
            33: 'pageup',
            34: 'pagedown',
            35: 'end',
            36: 'home',
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down',
            45: 'ins',
            46: 'del',
            91: 'meta',
            93: 'meta',
            224: 'meta'
        };

        /**
         * mapping for special characters so they can support
         *
         * this dictionary is only used incase you want to bind a
         * keyup or keydown event to one of these keys
         *
         * @type {Object}
         */
        var _KEYCODE_MAP = {
            106: '*',
            107: '+',
            109: '-',
            110: '.',
            111: '/',
            186: ';',
            187: '=',
            188: ',',
            189: '-',
            190: '.',
            191: '/',
            192: '`',
            219: '[',
            220: '\\',
            221: ']',
            222: '\''
        };

        /**
         * this is a mapping of keys that require shift on a US keypad
         * back to the non shift equivelents
         *
         * this is so you can use keyup events with these keys
         *
         * note that this will only work reliably on US keyboards
         *
         * @type {Object}
         */
        var _SHIFT_MAP = {
            '~': '`',
            '!': '1',
            '@': '2',
            '#': '3',
            '$': '4',
            '%': '5',
            '^': '6',
            '&': '7',
            '*': '8',
            '(': '9',
            ')': '0',
            '_': '-',
            '+': '=',
            ':': ';',
            '\"': '\'',
            '<': ',',
            '>': '.',
            '?': '/',
            '|': '\\'
        };

        /**
         * this is a list of special strings you can use to map
         * to modifier keys when you specify your keyboard shortcuts
         *
         * @type {Object}
         */
        var _SPECIAL_ALIASES = {
            'option': 'alt',
            'command': 'meta',
            'return': 'enter',
            'escape': 'esc',
            'plus': '+',
            'mod': /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl'
        };

        /**
         * variable to store the flipped version of _MAP from above
         * needed to check if we should use keypress or not when no action
         * is specified
         *
         * @type {Object|undefined}
         */
        var _REVERSE_MAP;

        /**
         * loop through the f keys, f1 to f19 and add them to the map
         * programatically
         */
        for (var i = 1; i < 20; ++i) {
            _MAP[111 + i] = 'f' + i;
        }

        /**
         * loop through to map numbers on the numeric keypad
         */
        for (i = 0; i <= 9; ++i) {

            // This needs to use a string cause otherwise since 0 is falsey
            // mousetrap will never fire for numpad 0 pressed as part of a keydown
            // event.
            //
            // @see https://github.com/ccampbell/mousetrap/pull/258
            _MAP[i + 96] = i.toString();
        }

        /**
         * cross browser add event method
         *
         * @param {Element|HTMLDocument} object
         * @param {string} type
         * @param {Function} callback
         * @returns void
         */
        function _addEvent(object, type, callback) {
            if (object.addEventListener) {
                object.addEventListener(type, callback, false);
                return;
            }

            object.attachEvent('on' + type, callback);
        }

        /**
         * takes the event and returns the key character
         *
         * @param {Event} e
         * @return {string}
         */
        function _characterFromEvent(e) {

            // for keypress events we should return the character as is
            if (e.type == 'keypress') {
                var character = String.fromCharCode(e.which);

                // if the shift key is not pressed then it is safe to assume
                // that we want the character to be lowercase.  this means if
                // you accidentally have caps lock on then your key bindings
                // will continue to work
                //
                // the only side effect that might not be desired is if you
                // bind something like 'A' cause you want to trigger an
                // event when capital A is pressed caps lock will no longer
                // trigger the event.  shift+a will though.
                if (!e.shiftKey) {
                    character = character.toLowerCase();
                }

                return character;
            }

            // for non keypress events the special maps are needed
            if (_MAP[e.which]) {
                return _MAP[e.which];
            }

            if (_KEYCODE_MAP[e.which]) {
                return _KEYCODE_MAP[e.which];
            }

            // if it is not in the special map

            // with keydown and keyup events the character seems to always
            // come in as an uppercase character whether you are pressing shift
            // or not.  we should make sure it is always lowercase for comparisons
            return String.fromCharCode(e.which).toLowerCase();
        }

        /**
         * checks if two arrays are equal
         *
         * @param {Array} modifiers1
         * @param {Array} modifiers2
         * @returns {boolean}
         */
        function _modifiersMatch(modifiers1, modifiers2) {
            return modifiers1.sort().join(',') === modifiers2.sort().join(',');
        }

        /**
         * takes a key event and figures out what the modifiers are
         *
         * @param {Event} e
         * @returns {Array}
         */
        function _eventModifiers(e) {
            var modifiers = [];

            if (e.shiftKey) {
                modifiers.push('shift');
            }

            if (e.altKey) {
                modifiers.push('alt');
            }

            if (e.ctrlKey) {
                modifiers.push('ctrl');
            }

            if (e.metaKey) {
                modifiers.push('meta');
            }

            return modifiers;
        }

        /**
         * prevents default for this event
         *
         * @param {Event} e
         * @returns void
         */
        function _preventDefault(e) {
            if (e.preventDefault) {
                e.preventDefault();
                return;
            }

            e.returnValue = false;
        }

        /**
         * stops propogation for this event
         *
         * @param {Event} e
         * @returns void
         */
        function _stopPropagation(e) {
            if (e.stopPropagation) {
                e.stopPropagation();
                return;
            }

            e.cancelBubble = true;
        }

        /**
         * determines if the keycode specified is a modifier key or not
         *
         * @param {string} key
         * @returns {boolean}
         */
        function _isModifier(key) {
            return key == 'shift' || key == 'ctrl' || key == 'alt' || key == 'meta';
        }

        /**
         * reverses the map lookup so that we can look for specific keys
         * to see what can and can't use keypress
         *
         * @return {Object}
         */
        function _getReverseMap() {
            if (!_REVERSE_MAP) {
                _REVERSE_MAP = {};
                for (var key in _MAP) {

                    // pull out the numeric keypad from here cause keypress should
                    // be able to detect the keys from the character
                    if (key > 95 && key < 112) {
                        continue;
                    }

                    if (_MAP.hasOwnProperty(key)) {
                        _REVERSE_MAP[_MAP[key]] = key;
                    }
                }
            }
            return _REVERSE_MAP;
        }

        /**
         * picks the best action based on the key combination
         *
         * @param {string} key - character for key
         * @param {Array} modifiers
         * @param {string=} action passed in
         */
        function _pickBestAction(key, modifiers, action) {

            // if no action was picked in we should try to pick the one
            // that we think would work best for this key
            if (!action) {
                action = _getReverseMap()[key] ? 'keydown' : 'keypress';
            }

            // modifier keys don't work as expected with keypress,
            // switch to keydown
            if (action == 'keypress' && modifiers.length) {
                action = 'keydown';
            }

            return action;
        }

        /**
         * Converts from a string key combination to an array
         *
         * @param  {string} combination like "command+shift+l"
         * @return {Array}
         */
        function _keysFromString(combination) {
            if (combination === '+') {
                return ['+'];
            }

            combination = combination.replace(/\+{2}/g, '+plus');
            return combination.split('+');
        }

        /**
         * Gets info for a specific key combination
         *
         * @param  {string} combination key combination ("command+s" or "a" or "*")
         * @param  {string=} action
         * @returns {Object}
         */
        function _getKeyInfo(combination, action) {
            var keys;
            var key;
            var i;
            var modifiers = [];

            // take the keys from this pattern and figure out what the actual
            // pattern is all about
            keys = _keysFromString(combination);

            for (i = 0; i < keys.length; ++i) {
                key = keys[i];

                // normalize key names
                if (_SPECIAL_ALIASES[key]) {
                    key = _SPECIAL_ALIASES[key];
                }

                // if this is not a keypress event then we should
                // be smart about using shift keys
                // this will only work for US keyboards however
                if (action && action != 'keypress' && _SHIFT_MAP[key]) {
                    key = _SHIFT_MAP[key];
                    modifiers.push('shift');
                }

                // if this key is a modifier then add it to the list of modifiers
                if (_isModifier(key)) {
                    modifiers.push(key);
                }
            }

            // depending on what the key combination is
            // we will try to pick the best event for it
            action = _pickBestAction(key, modifiers, action);

            return {
                key: key,
                modifiers: modifiers,
                action: action
            };
        }

        function _belongsTo(element, ancestor) {
            if (element === null || element === document) {
                return false;
            }

            if (element === ancestor) {
                return true;
            }

            return _belongsTo(element.parentNode, ancestor);
        }

        function Mousetrap(targetElement) {
            var self = this;

            targetElement = targetElement || document;

            if (!(self instanceof Mousetrap)) {
                return new Mousetrap(targetElement);
            }

            /**
             * element to attach key events to
             *
             * @type {Element}
             */
            self.target = targetElement;

            /**
             * a list of all the callbacks setup via Mousetrap.bind()
             *
             * @type {Object}
             */
            self._callbacks = {};

            /**
             * direct map of string combinations to callbacks used for trigger()
             *
             * @type {Object}
             */
            self._directMap = {};

            /**
             * keeps track of what level each sequence is at since multiple
             * sequences can start out with the same sequence
             *
             * @type {Object}
             */
            var _sequenceLevels = {};

            /**
             * variable to store the setTimeout call
             *
             * @type {null|number}
             */
            var _resetTimer;

            /**
             * temporary state where we will ignore the next keyup
             *
             * @type {boolean|string}
             */
            var _ignoreNextKeyup = false;

            /**
             * temporary state where we will ignore the next keypress
             *
             * @type {boolean}
             */
            var _ignoreNextKeypress = false;

            /**
             * are we currently inside of a sequence?
             * type of action ("keyup" or "keydown" or "keypress") or false
             *
             * @type {boolean|string}
             */
            var _nextExpectedAction = false;

            /**
             * resets all sequence counters except for the ones passed in
             *
             * @param {Object} doNotReset
             * @returns void
             */
            function _resetSequences(doNotReset) {
                doNotReset = doNotReset || {};

                var activeSequences = false,
                    key;

                for (key in _sequenceLevels) {
                    if (doNotReset[key]) {
                        activeSequences = true;
                        continue;
                    }
                    _sequenceLevels[key] = 0;
                }

                if (!activeSequences) {
                    _nextExpectedAction = false;
                }
            }

            /**
             * finds all callbacks that match based on the keycode, modifiers,
             * and action
             *
             * @param {string} character
             * @param {Array} modifiers
             * @param {Event|Object} e
             * @param {string=} sequenceName - name of the sequence we are looking for
             * @param {string=} combination
             * @param {number=} level
             * @returns {Array}
             */
            function _getMatches(character, modifiers, e, sequenceName, combination, level) {
                var i;
                var callback;
                var matches = [];
                var action = e.type;

                // if there are no events related to this keycode
                if (!self._callbacks[character]) {
                    return [];
                }

                // if a modifier key is coming up on its own we should allow it
                if (action == 'keyup' && _isModifier(character)) {
                    modifiers = [character];
                }

                // loop through all callbacks for the key that was pressed
                // and see if any of them match
                for (i = 0; i < self._callbacks[character].length; ++i) {
                    callback = self._callbacks[character][i];

                    // if a sequence name is not specified, but this is a sequence at
                    // the wrong level then move onto the next match
                    if (!sequenceName && callback.seq && _sequenceLevels[callback.seq] != callback.level) {
                        continue;
                    }

                    // if the action we are looking for doesn't match the action we got
                    // then we should keep going
                    if (action != callback.action) {
                        continue;
                    }

                    // if this is a keypress event and the meta key and control key
                    // are not pressed that means that we need to only look at the
                    // character, otherwise check the modifiers as well
                    //
                    // chrome will not fire a keypress if meta or control is down
                    // safari will fire a keypress if meta or meta+shift is down
                    // firefox will fire a keypress if meta or control is down
                    if (action == 'keypress' && !e.metaKey && !e.ctrlKey || _modifiersMatch(modifiers, callback.modifiers)) {

                        // when you bind a combination or sequence a second time it
                        // should overwrite the first one.  if a sequenceName or
                        // combination is specified in this call it does just that
                        //
                        // @todo make deleting its own method?
                        var deleteCombo = !sequenceName && callback.combo == combination;
                        var deleteSequence = sequenceName && callback.seq == sequenceName && callback.level == level;
                        if (deleteCombo || deleteSequence) {
                            self._callbacks[character].splice(i, 1);
                        }

                        matches.push(callback);
                    }
                }

                return matches;
            }

            /**
             * actually calls the callback function
             *
             * if your callback function returns false this will use the jquery
             * convention - prevent default and stop propogation on the event
             *
             * @param {Function} callback
             * @param {Event} e
             * @returns void
             */
            function _fireCallback(callback, e, combo, sequence) {

                // if this event should not happen stop here
                if (self.stopCallback(e, e.target || e.srcElement, combo, sequence)) {
                    return;
                }

                if (callback(e, combo) === false) {
                    _preventDefault(e);
                    _stopPropagation(e);
                }
            }

            /**
             * handles a character key event
             *
             * @param {string} character
             * @param {Array} modifiers
             * @param {Event} e
             * @returns void
             */
            self._handleKey = function (character, modifiers, e) {
                var callbacks = _getMatches(character, modifiers, e);
                var i;
                var doNotReset = {};
                var maxLevel = 0;
                var processedSequenceCallback = false;

                // Calculate the maxLevel for sequences so we can only execute the longest callback sequence
                for (i = 0; i < callbacks.length; ++i) {
                    if (callbacks[i].seq) {
                        maxLevel = Math.max(maxLevel, callbacks[i].level);
                    }
                }

                // loop through matching callbacks for this key event
                for (i = 0; i < callbacks.length; ++i) {

                    // fire for all sequence callbacks
                    // this is because if for example you have multiple sequences
                    // bound such as "g i" and "g t" they both need to fire the
                    // callback for matching g cause otherwise you can only ever
                    // match the first one
                    if (callbacks[i].seq) {

                        // only fire callbacks for the maxLevel to prevent
                        // subsequences from also firing
                        //
                        // for example 'a option b' should not cause 'option b' to fire
                        // even though 'option b' is part of the other sequence
                        //
                        // any sequences that do not match here will be discarded
                        // below by the _resetSequences call
                        if (callbacks[i].level != maxLevel) {
                            continue;
                        }

                        processedSequenceCallback = true;

                        // keep a list of which sequences were matches for later
                        doNotReset[callbacks[i].seq] = 1;
                        _fireCallback(callbacks[i].callback, e, callbacks[i].combo, callbacks[i].seq);
                        continue;
                    }

                    // if there were no sequence matches but we are still here
                    // that means this is a regular match so we should fire that
                    if (!processedSequenceCallback) {
                        _fireCallback(callbacks[i].callback, e, callbacks[i].combo);
                    }
                }

                // if the key you pressed matches the type of sequence without
                // being a modifier (ie "keyup" or "keypress") then we should
                // reset all sequences that were not matched by this event
                //
                // this is so, for example, if you have the sequence "h a t" and you
                // type "h e a r t" it does not match.  in this case the "e" will
                // cause the sequence to reset
                //
                // modifier keys are ignored because you can have a sequence
                // that contains modifiers such as "enter ctrl+space" and in most
                // cases the modifier key will be pressed before the next key
                //
                // also if you have a sequence such as "ctrl+b a" then pressing the
                // "b" key will trigger a "keypress" and a "keydown"
                //
                // the "keydown" is expected when there is a modifier, but the
                // "keypress" ends up matching the _nextExpectedAction since it occurs
                // after and that causes the sequence to reset
                //
                // we ignore keypresses in a sequence that directly follow a keydown
                // for the same character
                var ignoreThisKeypress = e.type == 'keypress' && _ignoreNextKeypress;
                if (e.type == _nextExpectedAction && !_isModifier(character) && !ignoreThisKeypress) {
                    _resetSequences(doNotReset);
                }

                _ignoreNextKeypress = processedSequenceCallback && e.type == 'keydown';
            };

            /**
             * handles a keydown event
             *
             * @param {Event} e
             * @returns void
             */
            function _handleKeyEvent(e) {

                // normalize e.which for key events
                // @see http://stackoverflow.com/questions/4285627/javascript-keycode-vs-charcode-utter-confusion
                if (typeof e.which !== 'number') {
                    e.which = e.keyCode;
                }

                var character = _characterFromEvent(e);

                // no character found then stop
                if (!character) {
                    return;
                }

                // need to use === for the character check because the character can be 0
                if (e.type == 'keyup' && _ignoreNextKeyup === character) {
                    _ignoreNextKeyup = false;
                    return;
                }

                self.handleKey(character, _eventModifiers(e), e);
            }

            /**
             * called to set a 1 second timeout on the specified sequence
             *
             * this is so after each key press in the sequence you have 1 second
             * to press the next key before you have to start over
             *
             * @returns void
             */
            function _resetSequenceTimer() {
                clearTimeout(_resetTimer);
                _resetTimer = setTimeout(_resetSequences, 1000);
            }

            /**
             * binds a key sequence to an event
             *
             * @param {string} combo - combo specified in bind call
             * @param {Array} keys
             * @param {Function} callback
             * @param {string=} action
             * @returns void
             */
            function _bindSequence(combo, keys, callback, action) {

                // start off by adding a sequence level record for this combination
                // and setting the level to 0
                _sequenceLevels[combo] = 0;

                /**
                 * callback to increase the sequence level for this sequence and reset
                 * all other sequences that were active
                 *
                 * @param {string} nextAction
                 * @returns {Function}
                 */
                function _increaseSequence(nextAction) {
                    return function () {
                        _nextExpectedAction = nextAction;
                        ++_sequenceLevels[combo];
                        _resetSequenceTimer();
                    };
                }

                /**
                 * wraps the specified callback inside of another function in order
                 * to reset all sequence counters as soon as this sequence is done
                 *
                 * @param {Event} e
                 * @returns void
                 */
                function _callbackAndReset(e) {
                    _fireCallback(callback, e, combo);

                    // we should ignore the next key up if the action is key down
                    // or keypress.  this is so if you finish a sequence and
                    // release the key the final key will not trigger a keyup
                    if (action !== 'keyup') {
                        _ignoreNextKeyup = _characterFromEvent(e);
                    }

                    // weird race condition if a sequence ends with the key
                    // another sequence begins with
                    setTimeout(_resetSequences, 10);
                }

                // loop through keys one at a time and bind the appropriate callback
                // function.  for any key leading up to the final one it should
                // increase the sequence. after the final, it should reset all sequences
                //
                // if an action is specified in the original bind call then that will
                // be used throughout.  otherwise we will pass the action that the
                // next key in the sequence should match.  this allows a sequence
                // to mix and match keypress and keydown events depending on which
                // ones are better suited to the key provided
                for (var i = 0; i < keys.length; ++i) {
                    var isFinal = i + 1 === keys.length;
                    var wrappedCallback = isFinal ? _callbackAndReset : _increaseSequence(action || _getKeyInfo(keys[i + 1]).action);
                    _bindSingle(keys[i], wrappedCallback, action, combo, i);
                }
            }

            /**
             * binds a single keyboard combination
             *
             * @param {string} combination
             * @param {Function} callback
             * @param {string=} action
             * @param {string=} sequenceName - name of sequence if part of sequence
             * @param {number=} level - what part of the sequence the command is
             * @returns void
             */
            function _bindSingle(combination, callback, action, sequenceName, level) {

                // store a direct mapped reference for use with Mousetrap.trigger
                self._directMap[combination + ':' + action] = callback;

                // make sure multiple spaces in a row become a single space
                combination = combination.replace(/\s+/g, ' ');

                var sequence = combination.split(' ');
                var info;

                // if this pattern is a sequence of keys then run through this method
                // to reprocess each pattern one key at a time
                if (sequence.length > 1) {
                    _bindSequence(combination, sequence, callback, action);
                    return;
                }

                info = _getKeyInfo(combination, action);

                // make sure to initialize array if this is the first time
                // a callback is added for this key
                self._callbacks[info.key] = self._callbacks[info.key] || [];

                // remove an existing match if there is one
                _getMatches(info.key, info.modifiers, { type: info.action }, sequenceName, combination, level);

                // add this call back to the array
                // if it is a sequence put it at the beginning
                // if not put it at the end
                //
                // this is important because the way these are processed expects
                // the sequence ones to come first
                self._callbacks[info.key][sequenceName ? 'unshift' : 'push']({
                    callback: callback,
                    modifiers: info.modifiers,
                    action: info.action,
                    seq: sequenceName,
                    level: level,
                    combo: combination
                });
            }

            /**
             * binds multiple combinations to the same callback
             *
             * @param {Array} combinations
             * @param {Function} callback
             * @param {string|undefined} action
             * @returns void
             */
            self._bindMultiple = function (combinations, callback, action) {
                for (var i = 0; i < combinations.length; ++i) {
                    _bindSingle(combinations[i], callback, action);
                }
            };

            // start!
            _addEvent(targetElement, 'keypress', _handleKeyEvent);
            _addEvent(targetElement, 'keydown', _handleKeyEvent);
            _addEvent(targetElement, 'keyup', _handleKeyEvent);
        }

        /**
         * binds an event to mousetrap
         *
         * can be a single key, a combination of keys separated with +,
         * an array of keys, or a sequence of keys separated by spaces
         *
         * be sure to list the modifier keys first to make sure that the
         * correct key ends up getting bound (the last key in the pattern)
         *
         * @param {string|Array} keys
         * @param {Function} callback
         * @param {string=} action - 'keypress', 'keydown', or 'keyup'
         * @returns void
         */
        Mousetrap.prototype.bind = function (keys, callback, action) {
            var self = this;
            keys = keys instanceof Array ? keys : [keys];
            self._bindMultiple.call(self, keys, callback, action);
            return self;
        };

        /**
         * unbinds an event to mousetrap
         *
         * the unbinding sets the callback function of the specified key combo
         * to an empty function and deletes the corresponding key in the
         * _directMap dict.
         *
         * TODO: actually remove this from the _callbacks dictionary instead
         * of binding an empty function
         *
         * the keycombo+action has to be exactly the same as
         * it was defined in the bind method
         *
         * @param {string|Array} keys
         * @param {string} action
         * @returns void
         */
        Mousetrap.prototype.unbind = function (keys, action) {
            var self = this;
            return self.bind.call(self, keys, function () {}, action);
        };

        /**
         * triggers an event that has already been bound
         *
         * @param {string} keys
         * @param {string=} action
         * @returns void
         */
        Mousetrap.prototype.trigger = function (keys, action) {
            var self = this;
            if (self._directMap[keys + ':' + action]) {
                self._directMap[keys + ':' + action]({}, keys);
            }
            return self;
        };

        /**
         * resets the library back to its initial state.  this is useful
         * if you want to clear out the current keyboard shortcuts and bind
         * new ones - for example if you switch to another page
         *
         * @returns void
         */
        Mousetrap.prototype.reset = function () {
            var self = this;
            self._callbacks = {};
            self._directMap = {};
            return self;
        };

        /**
         * should we stop this event before firing off callbacks
         *
         * @param {Event} e
         * @param {Element} element
         * @return {boolean}
         */
        Mousetrap.prototype.stopCallback = function (e, element) {
            var self = this;

            // if the element has the class "mousetrap" then no need to stop
            if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1) {
                return false;
            }

            if (_belongsTo(element, self.target)) {
                return false;
            }

            // stop for input, select, and textarea
            return element.tagName == 'INPUT' || element.tagName == 'SELECT' || element.tagName == 'TEXTAREA' || element.isContentEditable;
        };

        /**
         * exposes _handleKey publicly so it can be overwritten by extensions
         */
        Mousetrap.prototype.handleKey = function () {
            var self = this;
            return self._handleKey.apply(self, arguments);
        };

        /**
         * allow custom key mappings
         */
        Mousetrap.addKeycodes = function (object) {
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    _MAP[key] = object[key];
                }
            }
            _REVERSE_MAP = null;
        };

        /**
         * Init the global mousetrap functions
         *
         * This method is needed to allow the global mousetrap functions to work
         * now that mousetrap is a constructor function.
         */
        Mousetrap.init = function () {
            var documentMousetrap = Mousetrap(document);
            for (var method in documentMousetrap) {
                if (method.charAt(0) !== '_') {
                    Mousetrap[method] = function (method) {
                        return function () {
                            return documentMousetrap[method].apply(documentMousetrap, arguments);
                        };
                    }(method);
                }
            }
        };

        Mousetrap.init();

        // expose mousetrap to the global object
        window.Mousetrap = Mousetrap;

        // expose as a common js module
        if ('object' !== 'undefined' && module.exports) {
            module.exports = Mousetrap;
        }

        // expose mousetrap as an AMD module
        if (typeof undefined === 'function' && undefined.amd) {
            undefined(function () {
                return Mousetrap;
            });
        }
    })(typeof window !== 'undefined' ? window : null, typeof window !== 'undefined' ? document : null);
});

var theme$2 = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)"
  },
  highlight: {
    backgroundColor: "yellow"
  },
  content: {
    boxShadow: "rgb(0, 0, 0) 0px 2px 4px 0px",
    position: "absolute",
    top: "80px",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, 0)",
    border: "0px none",
    background: "rgb(48, 51, 56)",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "10px",
    minWidth: "600px",
    fontFamily: "helvetica, sans-serif",
    fontSize: "12px"
  },
  container: {},
  containerOpen: {},
  input: {
    fontSize: "14px",
    border: "2px solid #2196F3",
    borderRadius: "4px",
    width: "590px",
    padding: "6px",
    outline: "none",
    backgroundColor: "#1f2021",
    color: "#ababab",
    caretColor: "#2196F3"
  },
  inputOpen: {},
  inputFocused: {},
  suggestionsContainer: {
    overflow: "scroll",
    borderTop: "1px solid #111",
    borderBottom: "1px solid #111",
    maxHeight: "315px",
    marginTop: "10px"
  },
  suggestionsContainerOpen: {},
  suggestionsList: {
    listStyle: "none",
    padding: "0",
    marginBottom: "0",
    marginTop: "0"
  },
  suggestion: {
    color: "#ababab",
    border: "1px solid #111",
    borderTop: "0px none",
    backgroundColor: "#2c313a",
    padding: "14px 12px"
  },
  suggestionFirst: {
    color: "#ffffff",
    backgroundColor: "#3a3f4b"
  },
  suggestionHighlighted: {
    color: "#ffffff",
    backgroundColor: "#3a3f4b"
  },
  sectionContainer: {},
  sectionContainerFirst: {},
  sectionTitle: {}
};

var css = ".spinner {\n  color: #FFFFFF;\n}\n.spinner {\n  margin: 60px auto;\n  font-size: 10px;\n  position: relative;\n  text-indent: -9999em;\n  border-top: 0.4em solid rgba(255, 255, 255, 0.2);\n  border-right: 0.4em solid rgba(255, 255, 255, 0.2);\n  border-bottom: 0.4em solid rgba(255, 255, 255, 0.2);\n  border-left: 0.4em solid #ffffff;\n  -webkit-transform: translateZ(0);\n  -ms-transform: translateZ(0);\n  transform: translateZ(0);\n  -webkit-animation: load8 1.1s infinite linear;\n  animation: load8 1.1s infinite linear;\n} \n.spinner,\n.spinner:after {\n  border-radius: 50%;\n  width: 3em;\n  height: 3em;\n}\n@-webkit-keyframes load8 {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n@keyframes load8 {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n";
__$$styleInject(css);

var Spinner = function Spinner() {
  return createElement(
    "div",
    { className: "spinner" },
    "Loading..."
  );
};

// Apply a functions that'll run after the command's function runs
// Monkey patching for the commands
// http://me.dt.in.th/page/JavaScript-override/
function override(object, methodName, callback) {
  var dupe = object;
  dupe[methodName] = callback(object[methodName]);
}

function after(extraBehavior) {
  return function (original) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return function () {
      var returnValue = original.apply(this, args);
      extraBehavior.apply(this, args);
      return returnValue;
    };
  };
}

var allSuggestions = [];

// When suggestion is clicked, Autosuggest needs to populate the input element
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
var getSuggestionValue = function getSuggestionValue(suggestion) {
  return suggestion.item.name;
};

// Use your imagination to define how suggestions are rendered.
//
// The signature is:
//
// function renderSuggestion(suggestion, { query, isHighlighted })
// where:
//
// suggestion - The suggestion to render
// query - Used to highlight the matching string. As user types in the input,
// query will be equal to the trimmed value of the input. Then, if user
// interacts using the Up or Down keys, the input will get the value of the
// highlighted suggestion, but query will remain to be equal to the trimmed
// value of the input prior to the Up and Down interactions.
// isHighlighted - Whether or not the suggestion is highlighted.

// export const RenderSuggestion = (suggestion, { query }) => {
var RenderSuggestion = function RenderSuggestion(suggestion) {
  // whereas fusejs returns matches "m" in
  // "match" as [[0,0]] parts expects it as [[0,1]]. So map over the fuse
  // matches and return the array modified for the format expected by parts
  var matches = function () {
    if (typeof suggestion.matches === "undefined" || !suggestion.matches.length) {
      return [];
    }

    return suggestion.matches[0].indices.map(function (item) {
      return [item[0], item[1] + 1];
    });
  }();

  var parts = parse(suggestion.item.name, matches);

  return createElement(
    "div",
    { className: "item" },
    parts.map(function (part, index) {
      var id = part.text + "_" + index;
      var style = part.highlight ? { fontWeight: "bold", background: "none", color: "#03A9F4" } : null;
      return createElement(
        "span",
        { style: style, key: id },
        part.text
      );
    })
  );
};

var CommandPalette = function (_React$Component) {
  inherits(CommandPalette, _React$Component);

  function CommandPalette() {
    classCallCheck(this, CommandPalette);

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    var _this = possibleConstructorReturn(this, (CommandPalette.__proto__ || Object.getPrototypeOf(CommandPalette)).call(this));

    _this.state = {
      isLoading: false,
      showModal: false,
      value: "",
      suggestions: allSuggestions
    };

    _this.onChange = _this.onChange.bind(_this);
    // eslint-disable-next-line prettier/prettier
    _this.onSuggestionsFetchRequested = _this.onSuggestionsFetchRequested.bind(_this);
    _this.onSuggestionSelected = _this.onSuggestionSelected.bind(_this);
    _this.handleOpenModal = _this.handleOpenModal.bind(_this);
    _this.handleCloseModal = _this.handleCloseModal.bind(_this);
    _this.fetchData = _this.fetchData.bind(_this);
    _this.focusInput = _this.focusInput.bind(_this);
    return _this;
  }

  createClass(CommandPalette, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.fetchData();
      // Use hot key to open command palette
      mousetrap.bind(this.props.hotKeys, function () {
        _this2.handleOpenModal();
        // prevent default which opens Chrome dev tools command palatte
        return false;
      });
    }
  }, {
    key: "onChange",
    value: function onChange(event, _ref) {
      var newValue = _ref.newValue;

      this.setState({
        value: newValue
      });
    }
  }, {
    key: "onSuggestionSelected",
    value: function onSuggestionSelected(event, _ref2) {
      var _this3 = this;

      var suggestion = _ref2.suggestion;

      if (typeof suggestion.item.command === "function") {
        // after the command executes display a spinner
        override(suggestion.item, "command", after(function () {
          _this3.setState({ isLoading: true }, function () {
            // console.log("Show Spinner", that.state.isLoading);
          });
        }));
        return suggestion.item.command();
      }
      throw new Error("command must be a function");
    }

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.

  }, {
    key: "onSuggestionsFetchRequested",
    value: function onSuggestionsFetchRequested(_ref3) {
      var value = _ref3.value;

      this.setState({
        suggestions: this.getSuggestions(value)
      });
    }

    // Teach Autosuggest how to calculate suggestions for any given input value.

  }, {
    key: "getSuggestions",
    value: function getSuggestions() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

      // const filterOptions = this.props.options;
      var filterOptions = this.props.options;

      // return all commands when user didnt suggest a specific term
      if (!value) {
        return this.allCommands;
      }

      // If the user specified an autosuggest term
      var suggestions = this.allCommands.map(function (suggestion) {
        return suggestion.item;
      });
      var fuse$$1 = new Fuse(suggestions, filterOptions);
      var filteredSuggestions = fuse$$1.search(value);
      if (!filteredSuggestions.length) {
        return this.allCommands;
      }
      return filteredSuggestions;
    }
  }, {
    key: "fetchData",
    value: function fetchData() {
      this.allCommands = this.props.commands.map(function (obj) {
        return {
          item: {
            id: obj.id,
            name: obj.name,
            command: obj.command,
            section: obj.section
          }
        };
      });
      return this.allCommands;
    }
  }, {
    key: "focusInput",
    value: function focusInput() {
      this.commandPaletteInput.input.focus();
    }
  }, {
    key: "handleCloseModal",
    value: function handleCloseModal() {
      this.setState({
        isLoading: false,
        showModal: false
      });
    }
  }, {
    key: "handleOpenModal",
    value: function handleOpenModal() {
      var _this4 = this;

      this.setState({
        showModal: true,
        value: "",
        suggestions: allSuggestions
      }, function () {
        // use callback to set focus, see: https://goo.gl/hUiG4n
        _this4.focusInput();
        // FIXME: apply "esc" on the modal instead of input
        // so that pressing esc on loading spinner works too
        mousetrap(_this4.commandPaletteInput.input).bind(["esc", _this4.props.hotKeys], function () {
          _this4.handleCloseModal();
          return false;
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _state = this.state,
          value = _state.value,
          suggestions = _state.suggestions;
      // Autosuggest will pass through all these props to the input element.

      var inputProps = {
        placeholder: "Type a command",
        value: value,
        onChange: this.onChange,
        onKeyDown: this.onKeyDown
      };
      var modalStyles = {
        content: theme$2.content,
        overlay: theme$2.overlay
      };
      return createElement(
        "div",
        { className: "react-command-palette" },
        createElement(
          "button",
          { className: "ui button", onClick: this.handleOpenModal },
          "Command Palette \xA0",
          createElement(
            "kbd",
            { className: "ui mini horizontal grey label" },
            createElement(
              "span",
              null,
              "Keyboard Shortcut"
            ),
            "\u21E7\u2318P"
          )
        ),
        createElement(
          ReactModal,
          {
            appElement: document.body,
            style: modalStyles,
            isOpen: this.state.showModal,
            onRequestClose: this.handleCloseModal,
            contentLabel: "Command Palette",
            closeTimeoutMS: 1
            /* otherwise the modal is not closed when
            suggestion is selected by pressing Enter */

          },
          this.state.isLoading ? createElement(Spinner, null) : createElement(dist$5, {
            ref: function ref(input) {
              _this5.commandPaletteInput = input;
            },
            suggestions: suggestions,
            highlightFirstSuggestion: true,
            onSuggestionSelected: this.onSuggestionSelected,
            onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.onSuggestionsClearRequested,
            getSuggestionValue: getSuggestionValue,
            renderSuggestion: RenderSuggestion,
            inputProps: inputProps,
            alwaysRenderSuggestions: true,
            theme: theme$2
          })
        )
      );
    }
  }]);
  return CommandPalette;
}(Component);

CommandPalette.defaultProps = {
  hotKeys: "command+shift+p",
  options: {
    shouldSort: true,
    tokenize: true,
    matchAllTokens: true,
    findAllMatches: true,
    includeMatches: true,
    threshold: 0.3,
    location: 0,
    distance: 1,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["name", "section"]
  }
};

CommandPalette.propTypes = {
  commands: propTypes.array,
  hotKeys: propTypes.string,
  options: propTypes.object
};

export { RenderSuggestion };
export default CommandPalette;
//# sourceMappingURL=main.es.js.map
