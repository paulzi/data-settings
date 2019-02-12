# data-settings

[![NPM version](http://img.shields.io/npm/v/data-settings.svg?style=flat)](https://www.npmjs.org/package/data-settings)
[![Build Status](https://img.shields.io/travis/paulzi/data-settings/master.svg)](https://travis-ci.org/paulzi/data-settings)
[![Downloads](https://img.shields.io/npm/dt/data-settings.svg)](https://www.npmjs.org/package/data-settings)
![License](https://img.shields.io/npm/l/data-settings.svg)

Получение структуры данных из data-атрибутов в DOM

[English readme](https://github.com/paulzi/data-settings/)

## Установка

```sh
npm install data-settings
```

## Использование

Простое получение данных:

```html
<div class="component" data-component='{"format": "Y-m-d"}'></div>
```

```javascript
import dataSettings from 'data-settings';

let element = document.querySelector('.component');
let data = dataSettings(element, 'component'); // { format: 'Y-m-d' }
```

Путь в пространстве имён:

```html
<div class="component" data-component='{"value": 10, "subComponent": {"format": "Y-m-d"}}'></div>
```

```javascript
import dataSettings from 'data-settings';

let element = document.querySelector('.component');
let data = dataSettings(element, 'component.subComponent'); // { format: 'Y-m-d' }
```

Использование ярлыков:

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

Строгий режим:

```html
<div class="component" data-component="test"></div>
```

```javascript
import dataSettings from 'data-settings';

let element = document.querySelector('.component');
let data1 = dataSettings(element, 'component'); // 'test'
let data2 = dataSettings(element, 'component', null, null, true); // throw Error
```

## Документация

`dataSettings(element, namespace[, defaultValue[, shorthands[, strict]]])`

- `element {HTMLElement}` - DOM элемент
- `namespace {string}` - пространство имён
- `defaultValue {*} [undefinded]` - значение если данные не найдены
- `shorthands {Object} [undefinded]` - набор ярлыков
- `strict {boolean} [false]` - включить строгое соответствие JSON
 

## Тестирование

Для запуска тестов используйте:

```sh
npm test
```

При необходимости установите ланчеры для других браузеров и активируйте их в `karma.conf.js`:

```sh
npm i --save-dev karma-ie-launcher
```

## Поддержка браузерами

- Internet Explorer 11+
- Другие современные браузеры
