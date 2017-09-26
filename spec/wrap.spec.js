'use strict';

const wrap = require('../lib/wrap.js');

describe('Wrap', () => {
  describe('wraping it', () => {
    describe('calls done when not returning a promise or calling done', () => {
      let DONE;

      beforeEach(() => {
        DONE = jasmine.createSpy('done');
        const it = (describe, cb) => { cb(DONE); };
        const IT = wrap(it);
        IT(null, () => { });
      });

      it('called done', () => {
        expect(DONE).toHaveBeenCalled();
      });
    });


    describe('calls done from callback', () => {
      let DONE;

      beforeEach((done) => {
        DONE = jasmine.createSpy('done').and.callFake(done);
        const it = (describe, cb) => { cb(DONE); };
        const IT = wrap(it);
        IT(null, (innerDone) => { innerDone(); });
      });

      it('called done', () => {
        expect(DONE).toHaveBeenCalled();
      });
    });

    describe('calls done when returned promise is resolved', () => {
      let DONE;

      beforeEach((done) => {
        DONE = jasmine.createSpy('done').and.callFake(done);
        const it = (describe, cb) => {
          cb(DONE);
        };
        const IT = wrap(it);

        IT(null, () => Promise.resolve());
      });

      it('called done', () => {
        expect(DONE).toHaveBeenCalled();
      });
    });

    describe('calls done.faill when promise is rejected', () => {
      const DONE = {
        fail: () => {},
      };

      beforeEach((done) => {
        spyOn(DONE, 'fail').and.callFake(done);
        const it = (describe, cb) => {
          cb(DONE);
        };
        const IT = wrap(it);

        IT(null, () => Promise.reject());
      });

      it('called done', () => {
        expect(DONE.fail).toHaveBeenCalled();
      });
    });

    it('calls the original function with correct args after wrapping', () => {
      const orginal = jasmine.createSpy('Wraped');
      const wrapped = wrap(orginal);
      wrapped('description', 'function', 'timeout');

      expect(orginal).toHaveBeenCalledWith(
        'description', jasmine.any(Function), 'timeout');
    });
  });

  describe('wraping beforeEach', () => {
    describe('calls done when not returning a promise or calling done', () => {
      let DONE;

      beforeEach(() => {
        DONE = jasmine.createSpy('done');
        const beforeEach = (cb) => { cb(DONE); };
        const BEFORE_EACH = wrap(beforeEach);
        BEFORE_EACH(() => { });
      });

      it('called done', () => {
        expect(DONE).toHaveBeenCalled();
      });
    });
  });
});
