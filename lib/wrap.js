'use strict';

const isFunction = (thing) => typeof thing === 'function';
const isAPromise = (promise) => !!(promise
     && promise.then
     && isFunction(promise.then));

function wrap(fn) {
  const result = function funct(description, cbOrTimeout, timeout) {
    let cb = isFunction(description)
      ? description
      : cbOrTimeout;
    if (!isFunction(cb)) {
      cb = () => {};
    }

    const callback = (done) => {
      const promise = cb(done);
      if (isAPromise(promise)) {
        promise.then(() => done(), done.fail);
      } else if (cb.length === 0) {
        done();
      }
    };

    if (isFunction(description)) {
      return fn(callback, cbOrTimeout);
    }

    return fn(description, callback, timeout);
  };

  if (fn.spec) {
    result.spec = fn.spec;
  }

  return result;
}

module.exports = wrap;
