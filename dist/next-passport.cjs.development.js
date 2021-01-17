'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var crypto = require('crypto');
var nanoid = require('nanoid');
var SecurePasswordLib = _interopDefault(require('secure-password'));
var cookieSession = _interopDefault(require('cookie-session'));
var passport = _interopDefault(require('passport'));
var b64Lite = require('b64-lite');
var cookie = _interopDefault(require('cookie'));
var dateFns = require('date-fns');
var jsonwebtoken = require('jsonwebtoken');
var apiUtils = require('next/dist/next-server/server/api-utils');

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
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  it = o[Symbol.iterator]();
  return it.next.bind(it);
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var AuthenticationError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(AuthenticationError, _Error);

  function AuthenticationError(message) {
    var _this;

    if (message === void 0) {
      message = 'You must be logged in to access this';
    }

    _this = _Error.call(this, message) || this;
    _this.name = 'AuthenticationError';
    _this.statusCode = 401;
    return _this;
  }

  _createClass(AuthenticationError, [{
    key: "_clearStack",
    get: function get() {
      return true;
    }
  }]);

  return AuthenticationError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
var CSRFTokenMismatchError = /*#__PURE__*/function (_Error2) {
  _inheritsLoose(CSRFTokenMismatchError, _Error2);

  function CSRFTokenMismatchError() {
    var _this2;

    _this2 = _Error2.apply(this, arguments) || this;
    _this2.name = 'CSRFTokenMismatchError';
    _this2.statusCode = 401;
    return _this2;
  }

  _createClass(CSRFTokenMismatchError, [{
    key: "_clearStack",
    get: function get() {
      return true;
    }
  }]);

  return CSRFTokenMismatchError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
var AuthorizationError = /*#__PURE__*/function (_Error3) {
  _inheritsLoose(AuthorizationError, _Error3);

  function AuthorizationError(message) {
    var _this3;

    if (message === void 0) {
      message = 'You are not authorized to access this';
    }

    _this3 = _Error3.call(this, message) || this;
    _this3.name = 'AuthorizationError';
    _this3.statusCode = 403;
    return _this3;
  }

  _createClass(AuthorizationError, [{
    key: "_clearStack",
    get: function get() {
      return true;
    }
  }]);

  return AuthorizationError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

var hash256 = function hash256(input) {
  if (input === void 0) {
    input = '';
  }

  return crypto.createHash('sha256').update(input).digest('hex');
};
var generateToken = function generateToken(numberOfCharacters) {
  if (numberOfCharacters === void 0) {
    numberOfCharacters = 32;
  }

  return nanoid.nanoid(numberOfCharacters);
};

var SP = function SP() {
  return new SecurePasswordLib();
};

var SecurePassword = /*#__PURE__*/_extends({}, SecurePasswordLib, {
  hash: function hash(password) {
    return _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      var hashedBuffer;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (password) {
                _context.next = 2;
                break;
              }

              throw new AuthenticationError();

            case 2:
              _context.next = 4;
              return SP().hash(Buffer.from(password));

            case 4:
              hashedBuffer = _context.sent;
              return _context.abrupt("return", hashedBuffer.toString('base64'));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  verify: function verify(hashedPassword, password) {
    return _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
      var result;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!hashedPassword || !password)) {
                _context2.next = 2;
                break;
              }

              throw new AuthenticationError();

            case 2:
              _context2.prev = 2;
              _context2.next = 5;
              return SP().verify(Buffer.from(password), Buffer.from(hashedPassword, 'base64'));

            case 5:
              result = _context2.sent;
              _context2.t0 = result;
              _context2.next = _context2.t0 === SecurePassword.VALID ? 9 : _context2.t0 === SecurePassword.VALID_NEEDS_REHASH ? 9 : 10;
              break;

            case 9:
              return _context2.abrupt("return", result);

            case 10:
              throw new AuthenticationError();

            case 13:
              _context2.prev = 13;
              _context2.t1 = _context2["catch"](2);
              throw new AuthenticationError();

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[2, 13]]);
    }))();
  }
});
var hashPassword = /*#__PURE__*/function () {
  var _ref = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(password) {
    var hashedBuffer;
    return runtime_1.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return SP().hash(Buffer.from(password));

          case 2:
            hashedBuffer = _context3.sent;
            return _context3.abrupt("return", hashedBuffer.toString('base64'));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function hashPassword(_x) {
    return _ref.apply(this, arguments);
  };
}();
var verifyPassword = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(hashedPassword, password) {
    return runtime_1.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return SP().verify(Buffer.from(password), Buffer.from(hashedPassword, 'base64'));

          case 3:
            return _context4.abrupt("return", _context4.sent);

          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](0);
            console.error(_context4.t0);
            return _context4.abrupt("return", false);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 6]]);
  }));

  return function verifyPassword(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
var authenticateUser = /*#__PURE__*/function () {
  var _ref3 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(prisma, email, password) {
    var user, improvedHash, rest;
    return runtime_1.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return prisma.user.findFirst({
              where: {
                email: email.toLowerCase()
              }
            });

          case 2:
            user = _context5.sent;

            if (!(!user || !user.hashedPassword)) {
              _context5.next = 5;
              break;
            }

            throw new AuthenticationError();

          case 5:
            _context5.next = 7;
            return verifyPassword(user.hashedPassword, password);

          case 7:
            _context5.t0 = _context5.sent;
            _context5.next = _context5.t0 === SecurePassword.VALID ? 10 : _context5.t0 === SecurePassword.VALID_NEEDS_REHASH ? 11 : 17;
            break;

          case 10:
            return _context5.abrupt("break", 18);

          case 11:
            _context5.next = 13;
            return hashPassword(password);

          case 13:
            improvedHash = _context5.sent;
            _context5.next = 16;
            return prisma.user.update({
              where: {
                id: user.id
              },
              data: {
                hashedPassword: improvedHash
              }
            });

          case 16:
            return _context5.abrupt("break", 18);

          case 17:
            throw new AuthenticationError();

          case 18:
            rest = _objectWithoutPropertiesLoose(user, ["hashedPassword"]);
            return _context5.abrupt("return", rest);

          case 20:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function authenticateUser(_x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

function getAllMiddlewareForModule(resolverModule) {
  var middleware = [];

  if (resolverModule.middleware) {
    if (!Array.isArray(resolverModule.middleware)) {
      throw new Error("'middleware' exported from " + resolverModule._meta.name + " must be an array");
    }

    middleware.push.apply(middleware, resolverModule.middleware);
  }

  return middleware;
}
function handleRequestWithMiddleware(_x, _x2, _x3, _x4) {
  return _handleRequestWithMiddleware.apply(this, arguments);
} // -------------------------------------------------------------------------------
// This takes an array of middleware and composes them into a single middleware fn
// This is what makes `next()` and `await next()` work
// -------------------------------------------------------------------------------

function _handleRequestWithMiddleware() {
  _handleRequestWithMiddleware = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(req, res, middleware, _temp) {
    var _ref, _ref$throwOnError, throwOnError, _ref$stackPrintOnErro, stackPrintOnError, handler;

    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref = _temp === void 0 ? {} : _temp, _ref$throwOnError = _ref.throwOnError, throwOnError = _ref$throwOnError === void 0 ? true : _ref$throwOnError, _ref$stackPrintOnErro = _ref.stackPrintOnError, stackPrintOnError = _ref$stackPrintOnErro === void 0 ? true : _ref$stackPrintOnErro;

            if (!res.blitzCtx) {
              res.blitzCtx = {};
            }

            if (!res._blitz) {
              res._blitz = {};
            }

            if (Array.isArray(middleware)) {
              handler = compose(middleware);
            } else {
              handler = middleware;
            }

            _context.prev = 4;
            _context.next = 7;
            return handler(req, res, function (error) {
              if (error) {
                throw error;
              }
            });

          case 7:
            _context.next = 16;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](4);

            if (req.method === 'GET') {
              // This GET method check is so we don't .end() the request for SSR requests
              console.log('Error while processing the request');
            } else if (res.writableFinished) {
              console.log('Error occured in middleware after the response was already sent to the browser');
            } else {
              res.statusCode = _context.t0.statusCode || _context.t0.status || 500;
              res.end(_context.t0.message || res.statusCode.toString());
              console.log('Error while processing the request');
            }

            if (_context.t0._clearStack) {
              delete _context.t0.stack;
            }

            if (stackPrintOnError) {
              console.log(_context.t0);
            } else {
              console.log(_context.t0, true, false, false);
            }

            if (!throwOnError) {
              _context.next = 16;
              break;
            }

            throw _context.t0;

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 9]]);
  }));
  return _handleRequestWithMiddleware.apply(this, arguments);
}

function compose(middleware) {
  if (!Array.isArray(middleware)) {
    throw new TypeError('Middleware stack must be an array!');
  }

  for (var _iterator = _createForOfIteratorHelperLoose(middleware), _step; !(_step = _iterator()).done;) {
    var handler = _step.value;

    if (typeof handler !== 'function') {
      throw new TypeError('Middleware must be composed of functions!');
    }
  } // Return a single middleware function that composes everything passed in


  return function (req, res, next) {
    // last called middleware #
    var index = -1;

    function dispatch(i, error) {
      if (error) {
        return Promise.reject(error);
      }

      if (i <= index) throw new Error('next() called multiple times');
      index = i;
      var handler = middleware[i];

      if (!handler) {
        return Promise.resolve();
      }

      try {
        return Promise.resolve(handler(req, res, dispatch.bind(null, i + 1)));
      } catch (error) {
        return Promise.reject(error);
      }
    } // const result = await dispatch(0)
    // return next(result as any)


    return dispatch(0).then(next);
  };
}
/**
 * If the middleware function doesn't declare receiving the `next` callback
 * assume that it's synchronous and invoke `next` ourselves
 */

function noCallbackHandler(req, res, next, middleware) {
  // Cast to any to call with two arguments for connect compatibility
  middleware(req, res);
  return next();
}
/**
 * The middleware function does include the `next` callback so only resolve
 * the Promise when it's called. If it's never called, the middleware stack
 * completion will stall
 */


function withCallbackHandler(req, res, next, middleware) {
  return new Promise(function (resolve, reject) {
    // Rule doesn't matter since we are inside new Promise()
    //eslint-disable-next-line @typescript-eslint/no-floating-promises
    middleware(req, res, function (err) {
      if (err) reject(err);else resolve(next());
    });
  });
}
/**
 * Returns a Blitz middleware function that varies its async logic based on if the
 * given middleware function declares at least 3 parameters, i.e. includes
 * the `next` callback function
 */


function connectMiddleware(middleware) {
  var handler = middleware.length < 3 ? noCallbackHandler : withCallbackHandler;
  return function connectHandler(req, res, next) {
    return handler(req, res, next, middleware);
  };
}

var secureProxyMiddleware = function secureProxyMiddleware(req, _res, next) {
  req.protocol = getProtocol(req);
  next();
};

function getProtocol(req) {
  // @ts-ignore
  // For some reason there is no encrypted on socket while it is expected
  if (req.connection.encrypted) {
    return "https";
  }

  var forwardedProto = req.headers && req.headers["x-forwarded-proto"];

  if (forwardedProto) {
    return forwardedProto.split(/\s*,\s*/)[0];
  }

  return "http";
}

function isLocalhost(req) {
  var host = req.headers.host;
  var localhost = false;

  if (host) {
    host = host.split(':')[0];
    localhost = host === 'localhost';
  }

  return localhost;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

var isVerifyCallbackResult = function isVerifyCallbackResult(value) {
  return typeof value === 'object' && value !== null && 'publicData' in value;
};

var INTERNAL_REDIRECT_URL_KEY = '_redirectUrl';
function passportAuth(config) {
  return /*#__PURE__*/function () {
    var _authHandler = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(req, res) {
      var cookieSessionMiddleware, passportMiddleware, middleware, blitzStrategy, strategy, authenticateOptions, strategyName, globalMiddleware;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              cookieSessionMiddleware = cookieSession({
                secret: process.env.SESSION_SECRET_KEY || 'default-dev-secret',
                secure: "development" === 'production' 
              });
              passportMiddleware = passport.initialize();
              middleware = [connectMiddleware(cookieSessionMiddleware), connectMiddleware(passportMiddleware), connectMiddleware(passport.session())];

              if (config.secureProxy) {
                middleware.push(secureProxyMiddleware);
              }

              if (req.query.auth.length) {
                _context3.next = 6;
                break;
              }

              return _context3.abrupt("return", res.status(404).end());

            case 6:
              assert(config.strategies.length, 'No Passport strategies found! Please add at least one strategy.');
              blitzStrategy = config.strategies.find(function (_ref) {
                var strategy = _ref.strategy;
                return strategy.name === req.query.auth[0];
              });
              assert(blitzStrategy, "A passport strategy was not found for: " + req.query.auth[0]);
              strategy = blitzStrategy.strategy, authenticateOptions = blitzStrategy.authenticateOptions;
              passport.use(strategy);
              strategyName = strategy.name;

              if (req.query.auth.length === 1) {
                console.log("Starting authentication via " + strategyName + "...");

                if (req.query.redirectUrl) {
                  middleware.push( /*#__PURE__*/function () {
                    var _ref2 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(req, res, next) {
                      var _session$setPublicDat;

                      var session;
                      return runtime_1.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              session = res.blitzCtx.session;
                              assert(session, 'Missing Blitz sessionMiddleware!');
                              _context.next = 4;
                              return session.setPublicData((_session$setPublicDat = {}, _session$setPublicDat[INTERNAL_REDIRECT_URL_KEY] = req.query.redirectUrl, _session$setPublicDat));

                            case 4:
                              return _context.abrupt("return", next());

                            case 5:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee);
                    }));

                    return function (_x3, _x4, _x5) {
                      return _ref2.apply(this, arguments);
                    };
                  }());
                }

                middleware.push(connectMiddleware(passport.authenticate(strategyName, _extends({}, authenticateOptions))));
              } else if (req.query.auth[1] === 'callback') {
                console.log("Processing callback for " + strategyName + "...");
                middleware.push(connectMiddleware(function (req, res, next) {
                  var session = res.blitzCtx.session;
                  assert(session, 'Missing Blitz sessionMiddleware!');
                  passport.authenticate(strategyName, /*#__PURE__*/function () {
                    var _ref3 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(err, result) {
                      var error, redirectUrlFromVerifyResult, redirectUrl;
                      return runtime_1.wrap(function _callee2$(_context2) {
                        while (1) {
                          switch (_context2.prev = _context2.next) {
                            case 0:
                              _context2.prev = 0;
                              error = err;

                              if (!error) {
                                if (result === false) {
                                  console.log("Login via " + strategyName + " failed - usually this means the user did not authenticate properly with the provider");
                                  error = "Login failed";
                                }

                                assert(typeof result === 'object' && result !== null, "Your '" + strategyName + "' passport verify callback returned empty data. Ensure you call 'done(null, {publicData: {userId: 1, roles: ['myRole']}})')");
                                assert(result.publicData, "'publicData' is missing from your '" + strategyName + "' passport verify callback. Ensure you call 'done(null, {publicData: {userId: 1, roles: ['myRole']}})')");
                              }

                              redirectUrlFromVerifyResult = result && typeof result === 'object' && result.redirectUrl;
                              redirectUrl = redirectUrlFromVerifyResult || session.publicData[INTERNAL_REDIRECT_URL_KEY] || (error ? config.errorRedirectUrl : config.successRedirectUrl) || '/';

                              if (!error) {
                                _context2.next = 11;
                                break;
                              }

                              redirectUrl += '?authError=' + encodeURIComponent(error.toString());
                              res.setHeader('Location', redirectUrl);
                              res.statusCode = 302;
                              res.end();
                              return _context2.abrupt("return");

                            case 11:
                              assert(isVerifyCallbackResult(result), 'Passport verify callback is invalid');
                              delete result.publicData[INTERNAL_REDIRECT_URL_KEY];
                              _context2.next = 15;
                              return session.create(result.publicData, result.privateData);

                            case 15:
                              res.setHeader('Location', redirectUrl);
                              res.statusCode = 302;
                              res.end();
                              _context2.next = 25;
                              break;

                            case 20:
                              _context2.prev = 20;
                              _context2.t0 = _context2["catch"](0);
                              console.error(_context2.t0);
                              res.statusCode = 500;
                              res.end();

                            case 25:
                            case "end":
                              return _context2.stop();
                          }
                        }
                      }, _callee2, null, [[0, 20]]);
                    }));

                    return function (_x6, _x7) {
                      return _ref3.apply(this, arguments);
                    };
                  }())(req, res, next);
                }));
              }

              globalMiddleware = getAllMiddlewareForModule({});
              _context3.next = 16;
              return handleRequestWithMiddleware(req, res, [].concat(globalMiddleware, middleware));

            case 16:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function authHandler(_x, _x2) {
      return _authHandler.apply(this, arguments);
    }

    return authHandler;
  }();
}

// regarding tokens
var TOKEN_SEPARATOR = ";";
var HANDLE_SEPARATOR = ":";
var SESSION_TYPE_OPAQUE_TOKEN_SIMPLE = "ots";
var SESSION_TYPE_ANONYMOUS_JWT = "ajwt";
var SESSION_TOKEN_VERSION_0 = "v0";
var COOKIE_ANONYMOUS_SESSION_TOKEN = "sAnonymousSessionToken";
var COOKIE_SESSION_TOKEN = "sSessionToken";
var COOKIE_REFRESH_TOKEN = "sIdRefreshToken";
var COOKIE_CSRF_TOKEN = "sAntiCrfToken";
var COOKIE_PUBLIC_DATA_TOKEN = "sPublicDataToken"; // Headers always all lower case

var HEADER_CSRF = "anti-csrf";
var HEADER_PUBLIC_DATA_TOKEN = "public-data-token";
var HEADER_SESSION_REVOKED = "session-revoked";
var HEADER_CSRF_ERROR = "csrf-error";

function assert$1(condition, message) {
  if (!condition) throw new Error(message);
}

var defaultConfig = function defaultConfig(prisma) {
  return {
    sessionExpiryMinutes: 30 * 24 * 60,
    method: 'essential',
    sameSite: 'lax',
    getSession: function getSession(handle) {
      return prisma.session.findFirst({
        where: {
          handle: handle
        }
      });
    },
    getSessions: function getSessions(userId) {
      return prisma.session.findMany({
        where: {
          userId: userId
        }
      });
    },
    createSession: function createSession(session) {
      var user;

      if (session.userId) {
        user = {
          connect: {
            id: session.userId
          }
        };
      }

      return prisma.session.create({
        data: _extends({}, session, {
          userId: undefined,
          user: user
        })
      });
    },
    updateSession: function () {
      var _updateSession = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(handle, session) {
        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return prisma.session.update({
                  where: {
                    handle: handle
                  },
                  data: session
                });

              case 3:
                return _context.abrupt("return", _context.sent);

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);

                if (!(_context.t0.code === 'P2016')) {
                  _context.next = 12;
                  break;
                }

                console.log("Could not update session because it's not in the DB");
                _context.next = 13;
                break;

              case 12:
                throw _context.t0;

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 6]]);
      }));

      function updateSession(_x, _x2) {
        return _updateSession.apply(this, arguments);
      }

      return updateSession;
    }(),
    deleteSession: function deleteSession(handle) {
      return prisma.session["delete"]({
        where: {
          handle: handle
        }
      });
    },
    isAuthorized: function isAuthorized() {
      throw new Error('No isAuthorized implementation provided');
    }
  };
};

var isNextApiRequest = function isNextApiRequest(req) {
  return 'cookies' in req;
};

var isMiddlewareApResponse = function isMiddlewareApResponse(res) {
  return 'blitzCtx' in res;
};

function getSessionContext(_x3, _x4, _x5) {
  return _getSessionContext.apply(this, arguments);
}

function _getSessionContext() {
  _getSessionContext = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(prisma, req, res) {
    var config, sessionKernel, sessionContext;
    return runtime_1.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            config = defaultConfig(prisma);

            if (!('cookies' in req)) {
              // Cookie parser isn't include inside getServerSideProps, so we have to add it
              req.cookies = apiUtils.getCookieParser(req)();
            }

            assert$1(isNextApiRequest(req), "[getSessionContext]: Request type isn't NextApiRequest");

            if (!(isMiddlewareApResponse(res) && res.blitzCtx.session)) {
              _context6.next = 5;
              break;
            }

            return _context6.abrupt("return", res.blitzCtx.session);

          case 5:
            _context6.next = 7;
            return getSession(config, req, res);

          case 7:
            sessionKernel = _context6.sent;

            if (sessionKernel) {
              console.log('Got existing session', sessionKernel);
            }

            if (sessionKernel) {
              _context6.next = 14;
              break;
            }

            console.log('No session found, creating anonymous session');
            _context6.next = 13;
            return createAnonymousSession(config, req, res);

          case 13:
            sessionKernel = _context6.sent;

          case 14:
            sessionContext = new SessionContextClass(config, req, res, sessionKernel);

            if (!('blitzCtx' in res)) {
              res.blitzCtx = {};
            }

            res.blitzCtx.session = sessionContext;
            return _context6.abrupt("return", sessionContext);

          case 18:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _getSessionContext.apply(this, arguments);
}

var SessionContextClass = /*#__PURE__*/function () {
  function SessionContextClass(config, req, res, kernel) {
    this.config = config;
    this._req = req;
    this._res = res;
    this._kernel = kernel;
  }

  var _proto = SessionContextClass.prototype;

  _proto.authorize = function authorize(input) {
    var e = new AuthenticationError();
    Error.captureStackTrace(e, this.authorize);
    if (!this.userId) throw e;

    if (!this.isAuthorized(input)) {
      var _e = new AuthorizationError();

      Error.captureStackTrace(_e, this.authorize);
      throw _e;
    }
  };

  _proto.isAuthorized = function isAuthorized(input) {
    if (!this.userId) return false;
    return this.config.isAuthorized(this.roles, input);
  };

  _proto.create = /*#__PURE__*/function () {
    var _create = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(publicData, privateData) {
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return createNewSession(this.config, this._req, this._res, publicData, privateData, {
                jwtPayload: this._kernel.jwtPayload
              });

            case 2:
              this._kernel = _context2.sent;

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function create(_x6, _x7) {
      return _create.apply(this, arguments);
    }

    return create;
  }();

  _proto.revoke = function revoke() {
    return revokeSession(this.config, this._req, this._res, this.handle);
  };

  _proto.revokeAll = /*#__PURE__*/function () {
    var _revokeAll = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3() {
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (this.publicData.userId) {
                _context3.next = 2;
                break;
              }

              throw new Error('session.revokeAll() cannot be used with anonymous sessions');

            case 2:
              _context3.next = 4;
              return revokeAllSessionsForUser(this.config, this._req, this._res, this.publicData.userId);

            case 4:
              return _context3.abrupt("return");

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function revokeAll() {
      return _revokeAll.apply(this, arguments);
    }

    return revokeAll;
  }();

  _proto.setPublicData = /*#__PURE__*/function () {
    var _setPublicData2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(data) {
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(this.userId && data.roles)) {
                _context4.next = 3;
                break;
              }

              _context4.next = 3;
              return updateAllPublicDataRolesForUser(this.config, this.userId, data.roles);

            case 3:
              _context4.next = 5;
              return _setPublicData(this.config, this._req, this._res, this._kernel, data);

            case 5:
              this._kernel.publicData = _context4.sent;

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function setPublicData(_x8) {
      return _setPublicData2.apply(this, arguments);
    }

    return setPublicData;
  }();

  _proto.getPrivateData = /*#__PURE__*/function () {
    var _getPrivateData2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5() {
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _getPrivateData(this.config, this.handle);

            case 2:
              _context5.t0 = _context5.sent;

              if (_context5.t0) {
                _context5.next = 5;
                break;
              }

              _context5.t0 = {};

            case 5:
              return _context5.abrupt("return", _context5.t0);

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function getPrivateData() {
      return _getPrivateData2.apply(this, arguments);
    }

    return getPrivateData;
  }();

  _proto.setPrivateData = function setPrivateData(data) {
    return _setPrivateData(this.config, this._kernel, data);
  };

  _createClass(SessionContextClass, [{
    key: "handle",
    get: function get() {
      return this._kernel.handle;
    }
  }, {
    key: "userId",
    get: function get() {
      return this._kernel.publicData.userId;
    }
  }, {
    key: "roles",
    get: function get() {
      return this._kernel.publicData.roles;
    }
  }, {
    key: "publicData",
    get: function get() {
      return this._kernel.publicData;
    }
  }]);

  return SessionContextClass;
}(); // --------------------------------
// Token/handle utils
// --------------------------------

var TOKEN_LENGTH = 32;
var generateEssentialSessionHandle = function generateEssentialSessionHandle() {
  return generateToken(TOKEN_LENGTH) + HANDLE_SEPARATOR + SESSION_TYPE_OPAQUE_TOKEN_SIMPLE;
};
var generateAnonymousSessionHandle = function generateAnonymousSessionHandle() {
  return generateToken(TOKEN_LENGTH) + HANDLE_SEPARATOR + SESSION_TYPE_ANONYMOUS_JWT;
};
var createSessionToken = function createSessionToken(handle, publicData) {
  // We store the hashed public data in the opaque token so that when we verify,
  // we can detect changes in it and return a new set of tokens if necessary.
  var publicDataString;

  if (typeof publicData === 'string') {
    publicDataString = publicData;
  } else {
    publicDataString = JSON.stringify(publicData);
  }

  return b64Lite.toBase64([handle, generateToken(TOKEN_LENGTH), hash256(publicDataString), SESSION_TOKEN_VERSION_0].join(TOKEN_SEPARATOR));
};
var parseSessionToken = function parseSessionToken(token) {
  var _fromBase64$split = b64Lite.fromBase64(token).split(TOKEN_SEPARATOR),
      handle = _fromBase64$split[0],
      id = _fromBase64$split[1],
      hashedPublicData = _fromBase64$split[2],
      version = _fromBase64$split[3];

  if (!handle || !id || !hashedPublicData || !version) {
    throw new AuthenticationError('Failed to parse session token');
  }

  return {
    handle: handle,
    id: id,
    hashedPublicData: hashedPublicData,
    version: version
  };
};
var createPublicDataToken = function createPublicDataToken(publicData) {
  var payload = typeof publicData === 'string' ? publicData : JSON.stringify(publicData);
  return b64Lite.toBase64(payload);
};
var createAntiCSRFToken = function createAntiCSRFToken() {
  return generateToken(TOKEN_LENGTH);
};
var getSessionSecretKey = function getSessionSecretKey() {
  {
    return process.env.SESSION_SECRET_KEY || 'default-dev-secret';
  }
};
var JWT_NAMESPACE = 'blitzjs';
var JWT_ISSUER = 'blitzjs';
var JWT_AUDIENCE = 'blitzjs';
var JWT_ANONYMOUS_SUBJECT = 'anonymous';
var JWT_ALGORITHM = 'HS256';
var createAnonymousSessionToken = function createAnonymousSessionToken(payload) {
  var _jwtSign;

  return jsonwebtoken.sign((_jwtSign = {}, _jwtSign[JWT_NAMESPACE] = payload, _jwtSign), getSessionSecretKey(), {
    algorithm: JWT_ALGORITHM,
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
    subject: JWT_ANONYMOUS_SUBJECT
  });
};
var parseAnonymousSessionToken = function parseAnonymousSessionToken(token) {
  // This must happen outside the try/catch because it could throw an error
  // about a missing environment variable
  var secret = getSessionSecretKey();

  try {
    var fullPayload = jsonwebtoken.verify(token, secret, {
      algorithms: [JWT_ALGORITHM],
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
      subject: JWT_ANONYMOUS_SUBJECT
    });

    if (typeof fullPayload === 'object') {
      return fullPayload[JWT_NAMESPACE];
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
var setCookie = function setCookie(res, cookie) {
  append(res, 'Set-Cookie', cookie);
};
var setHeader = function setHeader(res, name, value) {
  res.setHeader(name, value);

  if ('_blitz' in res) {
    res._blitz[name] = value;
  }
};
var removeHeader = function removeHeader(res, name) {
  res.removeHeader(name);

  if ('_blitz' in res) {
    delete res._blitz[name];
  }
};
var setSessionCookie = function setSessionCookie(config, req, res, sessionToken, expiresAt) {
  setCookie(res, cookie.serialize(COOKIE_SESSION_TOKEN, sessionToken, {
    path: '/',
    httpOnly: true,
    secure: !process.env.DISABLE_SECURE_COOKIES && "development" === 'production' && !isLocalhost(req),
    sameSite: config.sameSite,
    domain: config.domain,
    expires: expiresAt
  }));
};
var setAnonymousSessionCookie = function setAnonymousSessionCookie(config, req, res, token, expiresAt) {
  setCookie(res, cookie.serialize(COOKIE_ANONYMOUS_SESSION_TOKEN, token, {
    path: '/',
    httpOnly: true,
    secure: !process.env.DISABLE_SECURE_COOKIES && "development" === 'production' && !isLocalhost(req),
    sameSite: config.sameSite,
    domain: config.domain,
    expires: expiresAt
  }));
};
var setCSRFCookie = function setCSRFCookie(config, req, res, antiCSRFToken, expiresAt) {
  console.log('setCSRFCookie', antiCSRFToken);
  setCookie(res, cookie.serialize(COOKIE_CSRF_TOKEN, antiCSRFToken, {
    path: '/',
    secure: !process.env.DISABLE_SECURE_COOKIES && "development" === 'production' && !isLocalhost(req),
    sameSite: config.sameSite,
    domain: config.domain,
    expires: expiresAt
  }));
};
var setPublicDataCookie = function setPublicDataCookie(config, req, res, publicDataToken, expiresAt) {
  setHeader(res, HEADER_PUBLIC_DATA_TOKEN, 'updated');
  setCookie(res, cookie.serialize(COOKIE_PUBLIC_DATA_TOKEN, publicDataToken, {
    path: '/',
    secure: !process.env.DISABLE_SECURE_COOKIES && "development" === 'production' && !isLocalhost(req),
    sameSite: config.sameSite,
    domain: config.domain,
    expires: expiresAt
  }));
}; // --------------------------------
// Get Session
// --------------------------------

function getSession(_x9, _x10, _x11) {
  return _getSession.apply(this, arguments);
} // --------------------------------
// Create Session
// --------------------------------

function _getSession() {
  _getSession = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(config, req, res) {
    var anonymousSessionToken, sessionToken, idRefreshToken, enableCsrfProtection, antiCSRFToken, _parseSessionToken, handle, version, hashedPublicData, persistedSession, hasPublicDataChanged, hasQuarterExpiryTimePassed, payload;

    return runtime_1.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            anonymousSessionToken = req.cookies[COOKIE_ANONYMOUS_SESSION_TOKEN];
            sessionToken = req.cookies[COOKIE_SESSION_TOKEN]; // for essential method

            idRefreshToken = req.cookies[COOKIE_REFRESH_TOKEN]; // for advanced method

            enableCsrfProtection = req.method !== 'GET' && req.method !== 'OPTIONS' && !process.env.DISABLE_CSRF_PROTECTION;
            antiCSRFToken = req.headers[HEADER_CSRF];

            if (!sessionToken) {
              _context7.next = 42;
              break;
            }

            console.log('[getSession] Request has sessionToken');
            _parseSessionToken = parseSessionToken(sessionToken), handle = _parseSessionToken.handle, version = _parseSessionToken.version, hashedPublicData = _parseSessionToken.hashedPublicData;

            if (handle) {
              _context7.next = 11;
              break;
            }

            console.log('No handle in sessionToken');
            return _context7.abrupt("return", null);

          case 11:
            if (!(version !== SESSION_TOKEN_VERSION_0)) {
              _context7.next = 14;
              break;
            }

            console.log(new AuthenticationError('Session token version is not ' + SESSION_TOKEN_VERSION_0));
            return _context7.abrupt("return", null);

          case 14:
            _context7.next = 16;
            return config.getSession(handle);

          case 16:
            persistedSession = _context7.sent;

            if (persistedSession) {
              _context7.next = 20;
              break;
            }

            console.log('Session not found in DB');
            return _context7.abrupt("return", null);

          case 20:
            if (!(persistedSession.hashedSessionToken !== hash256(sessionToken))) {
              _context7.next = 25;
              break;
            }

            console.log('sessionToken hash did not match');
            console.log('persisted: ', persistedSession.hashedSessionToken);
            console.log('in req: ', hash256(sessionToken));
            return _context7.abrupt("return", null);

          case 25:
            if (!(persistedSession.expiresAt && dateFns.isPast(persistedSession.expiresAt))) {
              _context7.next = 28;
              break;
            }

            console.log('Session expired');
            return _context7.abrupt("return", null);

          case 28:
            if (!(enableCsrfProtection && persistedSession.antiCSRFToken !== antiCSRFToken)) {
              _context7.next = 31;
              break;
            }

            // await revokeSession(req, res, handle)
            setHeader(res, HEADER_CSRF_ERROR, 'true');
            throw new CSRFTokenMismatchError();

          case 31:
            if (!(req.method !== 'GET')) {
              _context7.next = 39;
              break;
            }

            // The publicData in the DB could have been updated since this client last made
            // a request. If so, then we generate a new access token
            hasPublicDataChanged = hash256(persistedSession.publicData) !== hashedPublicData;

            if (hasPublicDataChanged) {
              console.log('PublicData has changed since the last request');
            } // Check if > 1/4th of the expiry time has passed
            // (since we are doing a rolling expiry window).


            hasQuarterExpiryTimePassed = persistedSession.expiresAt && dateFns.differenceInMinutes(persistedSession.expiresAt, new Date()) < 0.75 * config.sessionExpiryMinutes;

            if (hasQuarterExpiryTimePassed) {
              console.log('quarter expiry time has passed');
              console.log('Persisted expire time', persistedSession.expiresAt);
            }

            if (!(hasPublicDataChanged || hasQuarterExpiryTimePassed)) {
              _context7.next = 39;
              break;
            }

            _context7.next = 39;
            return refreshSession(config, req, res, {
              handle: handle,
              publicData: JSON.parse(persistedSession.publicData || ''),
              jwtPayload: null,
              antiCSRFToken: antiCSRFToken,
              sessionToken: sessionToken
            }, {
              publicDataChanged: hasPublicDataChanged
            });

          case 39:
            return _context7.abrupt("return", {
              handle: handle,
              publicData: JSON.parse(persistedSession.publicData || ''),
              jwtPayload: null,
              antiCSRFToken: antiCSRFToken,
              sessionToken: sessionToken
            });

          case 42:
            if (!idRefreshToken) {
              _context7.next = 46;
              break;
            }

            return _context7.abrupt("return", null);

          case 46:
            if (!anonymousSessionToken) {
              _context7.next = 56;
              break;
            }

            console.log('Request has anonymousSessionToken');
            payload = parseAnonymousSessionToken(anonymousSessionToken);

            if (payload) {
              _context7.next = 52;
              break;
            }

            console.log('Payload empty');
            return _context7.abrupt("return", null);

          case 52:
            if (!(enableCsrfProtection && payload.antiCSRFToken !== antiCSRFToken)) {
              _context7.next = 55;
              break;
            }

            // await revokeSession(req, res, payload.handle, true)
            setHeader(res, HEADER_CSRF_ERROR, 'true');
            throw new CSRFTokenMismatchError();

          case 55:
            return _context7.abrupt("return", {
              handle: payload.handle,
              publicData: payload.publicData,
              jwtPayload: payload,
              antiCSRFToken: antiCSRFToken,
              anonymousSessionToken: anonymousSessionToken
            });

          case 56:
            return _context7.abrupt("return", null);

          case 57:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _getSession.apply(this, arguments);
}

function createNewSession(_x12, _x13, _x14, _x15, _x16, _x17) {
  return _createNewSession.apply(this, arguments);
}

function _createNewSession() {
  _createNewSession = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8(config, req, res, publicData, privateData, opts) {
    var antiCSRFToken, handle, payload, anonymousSessionToken, publicDataToken, expiresAt, _opts$jwtPayload, _opts$jwtPayload2, newPublicData, existingPrivateData, session, newPrivateData, _expiresAt, _handle, sessionToken, _publicDataToken;

    return runtime_1.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            if (privateData === void 0) {
              privateData = {};
            }

            if (opts === void 0) {
              opts = {};
            }

            assert$1(publicData.userId !== undefined, 'You must provide publicData.userId');
            assert$1(publicData.roles, 'You must provide publicData.roles');
            antiCSRFToken = createAntiCSRFToken();

            if (!opts.anonymous) {
              _context8.next = 19;
              break;
            }

            console.log('Creating new anonymous session');
            handle = generateAnonymousSessionHandle();
            payload = {
              isAnonymous: true,
              handle: handle,
              publicData: publicData,
              antiCSRFToken: antiCSRFToken
            };
            anonymousSessionToken = createAnonymousSessionToken(payload);
            publicDataToken = createPublicDataToken(publicData);
            expiresAt = dateFns.addYears(new Date(), 30);
            setAnonymousSessionCookie(config, req, res, anonymousSessionToken, expiresAt);
            setCSRFCookie(config, req, res, antiCSRFToken, expiresAt);
            setPublicDataCookie(config, req, res, publicDataToken, expiresAt); // Clear the essential session cookie in case it was previously set

            setSessionCookie(config, req, res, '', new Date(0));
            return _context8.abrupt("return", {
              handle: handle,
              publicData: publicData,
              jwtPayload: payload,
              antiCSRFToken: antiCSRFToken,
              anonymousSessionToken: anonymousSessionToken
            });

          case 19:
            if (!(config.method === 'essential')) {
              _context8.next = 47;
              break;
            }

            console.log('Creating new session');
            newPublicData = _extends({}, ((_opts$jwtPayload = opts.jwtPayload) == null ? void 0 : _opts$jwtPayload.publicData) || {}, publicData);
            assert$1(newPublicData.userId, 'You must provide a non-empty userId as publicData.userId'); // This carries over any private data from the anonymous session

            existingPrivateData = {};

            if (!((_opts$jwtPayload2 = opts.jwtPayload) != null && _opts$jwtPayload2.isAnonymous)) {
              _context8.next = 32;
              break;
            }

            _context8.next = 27;
            return config.getSession(opts.jwtPayload.handle);

          case 27:
            session = _context8.sent;

            if (!session) {
              _context8.next = 32;
              break;
            }

            if (session.privateData) {
              existingPrivateData = JSON.parse(session.privateData);
            } // Delete the previous anonymous session


            _context8.next = 32;
            return config.deleteSession(opts.jwtPayload.handle);

          case 32:
            newPrivateData = _extends({}, existingPrivateData, privateData);
            _expiresAt = dateFns.addMinutes(new Date(), config.sessionExpiryMinutes);
            _handle = generateEssentialSessionHandle();
            sessionToken = createSessionToken(_handle, newPublicData);
            _publicDataToken = createPublicDataToken(newPublicData);
            _context8.next = 39;
            return config.createSession({
              expiresAt: _expiresAt,
              handle: _handle,
              userId: newPublicData.userId,
              hashedSessionToken: hash256(sessionToken),
              antiCSRFToken: antiCSRFToken,
              publicData: JSON.stringify(newPublicData),
              privateData: JSON.stringify(newPrivateData)
            });

          case 39:
            setSessionCookie(config, req, res, sessionToken, _expiresAt);
            setCSRFCookie(config, req, res, antiCSRFToken, _expiresAt);
            setPublicDataCookie(config, req, res, _publicDataToken, _expiresAt); // Clear the anonymous session cookie in case it was previously set

            setAnonymousSessionCookie(config, req, res, '', new Date(0));
            removeHeader(res, HEADER_SESSION_REVOKED);
            return _context8.abrupt("return", {
              handle: _handle,
              publicData: newPublicData,
              jwtPayload: null,
              antiCSRFToken: antiCSRFToken,
              sessionToken: sessionToken
            });

          case 47:
            if (!(config.method === 'advanced')) {
              _context8.next = 51;
              break;
            }

            throw new Error('The advanced method is not yet supported');

          case 51:
            throw new Error("Session management method " + config.method + " is invalid. Supported methods are \"essential\" and \"advanced\"");

          case 52:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _createNewSession.apply(this, arguments);
}

function createAnonymousSession(_x18, _x19, _x20) {
  return _createAnonymousSession.apply(this, arguments);
} // --------------------------------
// Session/DB utils
// --------------------------------

function _createAnonymousSession() {
  _createAnonymousSession = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee9(config, req, res) {
    return runtime_1.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return createNewSession(config, req, res, {
              userId: null,
              roles: []
            }, undefined, {
              anonymous: true
            });

          case 2:
            return _context9.abrupt("return", _context9.sent);

          case 3:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _createAnonymousSession.apply(this, arguments);
}

function refreshSession(_x21, _x22, _x23, _x24, _x25) {
  return _refreshSession.apply(this, arguments);
}

function _refreshSession() {
  _refreshSession = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee10(config, req, res, sessionKernel, _ref) {
    var _sessionKernel$jwtPay;

    var publicDataChanged, payload, anonymousSessionToken, publicDataToken, expiresAt, _expiresAt2, _publicDataToken2, sessionToken;

    return runtime_1.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            publicDataChanged = _ref.publicDataChanged;
            console.log('Refreshing session', sessionKernel);

            if (!((_sessionKernel$jwtPay = sessionKernel.jwtPayload) != null && _sessionKernel$jwtPay.isAnonymous)) {
              _context10.next = 12;
              break;
            }

            payload = _extends({}, sessionKernel.jwtPayload, {
              publicData: sessionKernel.publicData
            });
            anonymousSessionToken = createAnonymousSessionToken(payload);
            publicDataToken = createPublicDataToken(sessionKernel.publicData);
            expiresAt = dateFns.addYears(new Date(), 30);
            setAnonymousSessionCookie(config, req, res, anonymousSessionToken, expiresAt);
            setPublicDataCookie(config, req, res, publicDataToken, expiresAt);
            setCSRFCookie(config, req, res, sessionKernel.antiCSRFToken, expiresAt);
            _context10.next = 31;
            break;

          case 12:
            if (!(config.method === 'essential' && 'sessionToken' in sessionKernel)) {
              _context10.next = 29;
              break;
            }

            _expiresAt2 = dateFns.addMinutes(new Date(), config.sessionExpiryMinutes);
            _publicDataToken2 = createPublicDataToken(sessionKernel.publicData);

            // Only generate new session token if public data actually changed
            // Otherwise if new session token is generated just for refresh, then
            // we have race condition bugs
            if (publicDataChanged) {
              sessionToken = createSessionToken(sessionKernel.handle, sessionKernel.publicData);
            } else {
              sessionToken = sessionKernel.sessionToken;
            }

            setSessionCookie(config, req, res, sessionToken, _expiresAt2);
            setPublicDataCookie(config, req, res, _publicDataToken2, _expiresAt2);
            setCSRFCookie(config, req, res, sessionKernel.antiCSRFToken, _expiresAt2);
            console.log('Updating session in db with', {
              expiresAt: _expiresAt2
            });

            if (!publicDataChanged) {
              _context10.next = 25;
              break;
            }

            _context10.next = 23;
            return config.updateSession(sessionKernel.handle, {
              expiresAt: _expiresAt2,
              hashedSessionToken: hash256(sessionToken),
              publicData: JSON.stringify(sessionKernel.publicData)
            });

          case 23:
            _context10.next = 27;
            break;

          case 25:
            _context10.next = 27;
            return config.updateSession(sessionKernel.handle, {
              expiresAt: _expiresAt2
            });

          case 27:
            _context10.next = 31;
            break;

          case 29:
            if (!(config.method === 'advanced')) {
              _context10.next = 31;
              break;
            }

            throw new Error('refreshSession() not implemented for advanced method');

          case 31:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _refreshSession.apply(this, arguments);
}

function updateAllPublicDataRolesForUser(_x28, _x29, _x30) {
  return _updateAllPublicDataRolesForUser.apply(this, arguments);
}

function _updateAllPublicDataRolesForUser() {
  _updateAllPublicDataRolesForUser = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee12(config, userId, roles) {
    var sessions, _iterator, _step, session, publicData;

    return runtime_1.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return config.getSessions(userId);

          case 2:
            sessions = _context12.sent;
            _iterator = _createForOfIteratorHelperLoose(sessions);

          case 4:
            if ((_step = _iterator()).done) {
              _context12.next = 11;
              break;
            }

            session = _step.value;
            publicData = JSON.stringify(_extends({}, session.publicData ? JSON.parse(session.publicData) : {}, {
              roles: roles
            }));
            _context12.next = 9;
            return config.updateSession(session.handle, {
              publicData: publicData
            });

          case 9:
            _context12.next = 4;
            break;

          case 11:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));
  return _updateAllPublicDataRolesForUser.apply(this, arguments);
}

function revokeSession(_x31, _x32, _x33, _x34, _x35) {
  return _revokeSession.apply(this, arguments);
}

function _revokeSession() {
  _revokeSession = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee13(config, req, res, handle, anonymous) {
    return runtime_1.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            if (anonymous === void 0) {
              anonymous = false;
            }

            console.log('Revoking session', handle);

            if (anonymous) {
              _context13.next = 10;
              break;
            }

            _context13.prev = 3;
            _context13.next = 6;
            return config.deleteSession(handle);

          case 6:
            _context13.next = 10;
            break;

          case 8:
            _context13.prev = 8;
            _context13.t0 = _context13["catch"](3);

          case 10:
            // This is used on the frontend to clear localstorage
            setHeader(res, HEADER_SESSION_REVOKED, 'true'); // Clear all cookies

            setSessionCookie(config, req, res, '', new Date(0));
            setAnonymousSessionCookie(config, req, res, '', new Date(0));
            setCSRFCookie(config, req, res, '', new Date(0));

          case 14:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[3, 8]]);
  }));
  return _revokeSession.apply(this, arguments);
}

function revokeMultipleSessions(_x36, _x37, _x38, _x39) {
  return _revokeMultipleSessions.apply(this, arguments);
}

function _revokeMultipleSessions() {
  _revokeMultipleSessions = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee14(config, req, res, sessionHandles) {
    var revoked, _iterator2, _step2, handle;

    return runtime_1.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            revoked = [];
            _iterator2 = _createForOfIteratorHelperLoose(sessionHandles);

          case 2:
            if ((_step2 = _iterator2()).done) {
              _context14.next = 9;
              break;
            }

            handle = _step2.value;
            _context14.next = 6;
            return revokeSession(config, req, res, handle);

          case 6:
            revoked.push(handle);

          case 7:
            _context14.next = 2;
            break;

          case 9:
            return _context14.abrupt("return", revoked);

          case 10:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));
  return _revokeMultipleSessions.apply(this, arguments);
}

function revokeAllSessionsForUser(_x40, _x41, _x42, _x43) {
  return _revokeAllSessionsForUser.apply(this, arguments);
}

function _revokeAllSessionsForUser() {
  _revokeAllSessionsForUser = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee15(config, req, res, userId) {
    var sessionHandles;
    return runtime_1.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return config.getSessions(userId);

          case 2:
            sessionHandles = _context15.sent.map(function (session) {
              return session.handle;
            });
            return _context15.abrupt("return", revokeMultipleSessions(config, req, res, sessionHandles));

          case 4:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));
  return _revokeAllSessionsForUser.apply(this, arguments);
}

function getPublicData(_x44, _x45) {
  return _getPublicData.apply(this, arguments);
}

function _getPublicData() {
  _getPublicData = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee16(config, sessionKernel) {
    var _sessionKernel$jwtPay2;

    var _sessionKernel$jwtPay3, session;

    return runtime_1.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            if (!((_sessionKernel$jwtPay2 = sessionKernel.jwtPayload) != null && _sessionKernel$jwtPay2.publicData)) {
              _context16.next = 4;
              break;
            }

            return _context16.abrupt("return", (_sessionKernel$jwtPay3 = sessionKernel.jwtPayload) == null ? void 0 : _sessionKernel$jwtPay3.publicData);

          case 4:
            _context16.next = 6;
            return config.getSession(sessionKernel.handle);

          case 6:
            session = _context16.sent;

            if (session) {
              _context16.next = 9;
              break;
            }

            throw new Error("getPublicData() failed because handle doesn't exist " + sessionKernel.handle);

          case 9:
            if (!session.publicData) {
              _context16.next = 13;
              break;
            }

            return _context16.abrupt("return", JSON.parse(session.publicData));

          case 13:
            return _context16.abrupt("return", {});

          case 14:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  }));
  return _getPublicData.apply(this, arguments);
}

function _getPrivateData(_x46, _x47) {
  return _getPrivateData3.apply(this, arguments);
}

function _getPrivateData3() {
  _getPrivateData3 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee17(config, handle) {
    var session;
    return runtime_1.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return config.getSession(handle);

          case 2:
            session = _context17.sent;

            if (!(session && session.privateData)) {
              _context17.next = 7;
              break;
            }

            return _context17.abrupt("return", JSON.parse(session.privateData));

          case 7:
            return _context17.abrupt("return", null);

          case 8:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  }));
  return _getPrivateData3.apply(this, arguments);
}

function _setPrivateData(_x48, _x49, _x50) {
  return _setPrivateData2.apply(this, arguments);
}

function _setPrivateData2() {
  _setPrivateData2 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee18(config, sessionKernel, data) {
    var existingPrivateData, privateData;
    return runtime_1.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.next = 2;
            return _getPrivateData(config, sessionKernel.handle);

          case 2:
            existingPrivateData = _context18.sent;

            if (!(existingPrivateData === null)) {
              _context18.next = 12;
              break;
            }

            _context18.prev = 4;
            _context18.next = 7;
            return config.createSession({
              handle: sessionKernel.handle
            });

          case 7:
            _context18.next = 11;
            break;

          case 9:
            _context18.prev = 9;
            _context18.t0 = _context18["catch"](4);

          case 11:
            existingPrivateData = {};

          case 12:
            privateData = JSON.stringify(_extends({}, existingPrivateData, data));
            _context18.next = 15;
            return config.updateSession(sessionKernel.handle, {
              privateData: privateData
            });

          case 15:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, null, [[4, 9]]);
  }));
  return _setPrivateData2.apply(this, arguments);
}

function _setPublicData(_x51, _x52, _x53, _x54, _x55) {
  return _setPublicData3.apply(this, arguments);
}
/**
 * Append additional header `field` with value `val`.
 *
 * Example:
 *
 *    append(res, 'Set-Cookie', 'foo=bar; Path=/; HttpOnly');
 *
 * @param {ServerResponse} res
 * @param {string} field
 * @param {string| string[]} val
 */


function _setPublicData3() {
  _setPublicData3 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee19(config, req, res, sessionKernel, data) {
    var publicData;
    return runtime_1.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            // Don't allow updating userId
            delete data.userId;
            _context19.t0 = _extends;
            _context19.t1 = {};
            _context19.next = 5;
            return getPublicData(config, sessionKernel);

          case 5:
            _context19.t2 = _context19.sent;
            _context19.t3 = data;
            publicData = (0, _context19.t0)(_context19.t1, _context19.t2, _context19.t3);
            _context19.next = 10;
            return refreshSession(config, req, res, _extends({}, sessionKernel, {
              publicData: publicData
            }), {
              publicDataChanged: true
            });

          case 10:
            return _context19.abrupt("return", publicData);

          case 11:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19);
  }));
  return _setPublicData3.apply(this, arguments);
}
function append(res, field, val) {
  var prev = res.getHeader(field);
  var value = val;

  if (prev !== undefined) {
    // concat the new and prev vals
    value = Array.isArray(prev) ? prev.concat(val) : Array.isArray(val) ? [prev].concat(val) : [prev, val];
  }

  value = Array.isArray(value) ? value.map(String) : String(value);
  res.setHeader(field, value);
  return res;
}

exports.AuthenticationError = AuthenticationError;
exports.authenticateUser = authenticateUser;
exports.getSessionContext = getSessionContext;
exports.hashPassword = hashPassword;
exports.passportAuth = passportAuth;
exports.verifyPassword = verifyPassword;
//# sourceMappingURL=next-passport.cjs.development.js.map
