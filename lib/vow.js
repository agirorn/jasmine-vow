'use strict';

const wrap = require('./wrap');

const toWrap = ['it', 'beforeEach', 'afterEach', 'beforeAll', 'afterAll'];

function vow(jasmine) {
  toWrap.forEach((fn) => {
    // eslint-disable-next-line no-param-reassign
    jasmine.getEnv()[fn] = wrap(jasmine.getEnv()[fn]);
  });
}

module.exports = vow;
