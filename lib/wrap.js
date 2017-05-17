const isFunction = thing => typeof thing === 'function';
const isAPromise = promise =>
  !!(promise &&
     promise.then &&
     isFunction(promise.then));

function itFactory(itFn) {
  return function funct(description, cbOrTimeout, timeout) {
    const cb = isFunction(description) ? description : cbOrTimeout;

    const callback = (done) => {
      const promise = cb(done);
      if (isAPromise(promise)) {
        promise.then(done, done.fail);
      } else if (cb.length === 0) {
        done();
      }
    };

    if (isFunction(description)) {
      itFn(callback, cbOrTimeout);
    } else {
      itFn(description, callback, timeout);
    }
  };
}

module.exports = itFactory;
