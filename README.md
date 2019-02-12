# data-settings

[![NPM version](http://img.shields.io/npm/v/data-settings.svg?style=flat)](https://www.npmjs.org/package/data-settings)
[![Build Status](https://img.shields.io/travis/paulzi/data-settings/master.svg)](https://travis-ci.org/paulzi/data-settings)
[![Downloads](https://img.shields.io/npm/dt/data-settings.svg)](https://www.npmjs.org/package/data-settings)
![License](https://img.shields.io/npm/l/data-settings.svg)

Getting data from data-attributes in DOM

[Russian readme](https://github.com/paulzi/data-settings/blob/master/README.ru.md)

## Install

```sh
npm install data-settings
```

## Usage

Simple get data:

```html
<div class="component" data-component='{"format": "Y-m-d"}'></div>
```

```javascript
import dataSettings from 'data-settings';

let element = document.querySelector('.component');
let data = dataSettings(element, 'component'); // { format: 'Y-m-d' }
```

Path in namespace:

```html
<div class="component" data-component='{"value": 10, "subComponent": {"format": "Y-m-d"}}'></div>
```

```javascript
import dataSettings from 'data-settings';

let element = document.querySelector('.component');
let data = dataSettings(element, 'component.subComponent'); // { format: 'Y-m-d' }
```

Shorthands usage:

```html
<div class="component" data-component='{"value": 10}' data-component-format="Y-m-d" rel="group"></div>
```

```javascript
import dataSettings from 'data-settings';

let element = document.querySelector('.component');
let data = dataSettings(element, 'component', null, {
    format: 'format',
    '@rel': 'group',
});
// { value: 10, format: 'Y-m-d', group: 'group' }
```

Strict mode:

```html
<div class="component" data-component="test"></div>
```

```javascript
import dataSettings from 'data-settings';

let element = document.querySelector('.component');
let data1 = dataSettings(element, 'component'); // 'test'
let data2 = dataSettings(element, 'component', null, null, true); // throw Error
```

## Documentation

`dataSettings(element, namespace[, defaultValue[, shorthands[, strict]]])`

- `element {HTMLElement}` - DOM element
- `namespace {string}` - namespace
- `defaultValue {*} [undefinded]` - value if data is not found
- `shorthands {Object} [undefinded]` - shorthands list
- `strict {boolean} [false]` - enable strict mode
 

## Testing

To run tests, use: 

```sh
npm test
```

If necessary, you can install launchers for other browsers and activate them in `karma.conf.js`: 

```sh
npm i --save-dev karma-ie-launcher
```

## Browser support

- Internet Explorer 11+
- Other modern browsers
