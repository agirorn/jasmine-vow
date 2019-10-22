'use strict';

const vow = require('../');

const orginal = {
  it: jasmine.getEnv().it,
  beforeEach: jasmine.getEnv().beforeEach,
  afterEach: jasmine.getEnv().afterEach,
  beforeAll: jasmine.getEnv().beforeAll,
  afterAll: jasmine.getEnv().afterAll,
};

vow(jasmine);

describe('vow', () => {
  const defer = (time) => new Promise((resolve) => setTimeout(resolve, time));
  const delay = (time, cb) => { setTimeout(cb, time); };

  describe('it returning a promise', () => {
    let resolved;
    beforeEach(() => { resolved = false; });

    it('accepts returning a promise', () => defer(0).then(() => { resolved = true; }));

    afterEach(() => expect(resolved).toBeTruthy());
  });

  describe('it calling done', () => {
    let DONE;
    beforeEach(() => { DONE = jasmine.createSpy('done'); });

    it('ends test when done is called', (done) => {
      DONE.and.callFake(done);
      delay(0, DONE);
    });

    afterEach(() => expect(DONE).toHaveBeenCalled());
  });

  [
    'it',
    'beforeEach',
    'afterEach',
    'beforeAll',
    'afterAll',
  ].forEach((fn) => {
    it(`wraps ${fn}`, () => {
      expect(jasmine.getEnv()[fn]).not.toEqual(orginal[fn]);
    });
  });

  it('should not fail test that resolve with a Error', () => Promise.resolve(new Error('')));

  // pending spec should work
  it('should be pending');
  xit('should be pending');
  describe('is not pending', () => {
    xit('should be pending');
  });

  xdescribe('should be pending', () => {
    it('should be pending');
  });
});
