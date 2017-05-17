# jasmine-vow

[![npm version](https://badge.fury.io/js/jasmine-vow.svg)](https://badge.fury.io/js/jasmine-vow)
[![Build Status](https://travis-ci.org/agirorn/jasmine-vow.svg?branch=master)](https://travis-ci.org/agirorn/jasmine-vow)

A solemn promise to Jasmine (Making jasmine promise testing great again)

## Install

Get it from npm.

```js
npm i jasmine-vow --save-dev
```
## Setup

```js
const vow = require('jasmine-vow');
vow(jasmine);
```

# Usage

Return your promies from `it`, `beforeAll`, `afterAll`, `beforeEach` and `afterEach` as you would expect it to work out of the box.

```js
const vow = require('jasmine-vow');
vow(jasmine);

describe('test', () => {
  beforeEach((/* NO DONE, IT MUST BE MAGIC */) => {
    return doSomePromiseWork();
  });

  it('is true', () => {
    return getSomeValue().then((value) => {
      expect(value).toBeTruthy();
    });
  });
});
```

## License

ISC
