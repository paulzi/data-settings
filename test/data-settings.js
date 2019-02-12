import dataSettings from '../src';

const chai   = require('chai');
const assert = chai.assert;

describe("data-settings tests", function() {
    let node = document.createElement('div');
    document.body.appendChild(node);

    afterEach(() => {
        node.innerHTML = '';
    });

    it('basic', function() {
        let el;

        node.innerHTML = `<div id="component1" data-component='{"key1": "123", "key2": "456"}'></div>`;
        el = document.getElementById('component1');
        assert.deepEqual(dataSettings(el, 'component'), {key1: '123', key2: '456'});

        node.innerHTML = `<div id="component2" data-component-words='{"key1": "123", "key2": {"key3": [1, 2, 3]}}'></div>`;
        el = document.getElementById('component2');
        assert.deepEqual(dataSettings(el, 'component-words'), {key1: '123', key2: {key3: [1, 2, 3]}});
    });

    it('strict', function() {
        let el;

        node.innerHTML = `<div id="component1" data-component='test'></div>`;
        el = document.getElementById('component1');
        assert.throws(() => { return dataSettings(el, 'component', undefined, null, true); });

        node.innerHTML = `<div id="component1" data-component='123.'></div>`;
        el = document.getElementById('component1');
        assert.throws(() => { return dataSettings(el, 'component', undefined, null, true); });
    });

    it('different types', function() {
        let el;

        node.innerHTML = `<div id="component1" data-component="5"></div>`;
        el = document.getElementById('component1');
        assert.strictEqual(dataSettings(el, 'component'), 5);

        node.innerHTML = `<div id="component2" data-component="false"></div>`;
        el = document.getElementById('component2');
        assert.strictEqual(dataSettings(el, 'component'), false);

        node.innerHTML = `<div id="component3" data-component="null"></div>`;
        el = document.getElementById('component3');
        assert.isNull(dataSettings(el, 'component'));

        node.innerHTML = `<div id="component4"></div>`;
        el = document.getElementById('component4');
        assert.isUndefined(dataSettings(el, 'component'));

        node.innerHTML = `<div id="component5" data-component='"test"'></div>`;
        el = document.getElementById('component5');
        assert.strictEqual(dataSettings(el, 'component'), 'test');

        node.innerHTML = `<div id="component6" data-component='test'></div>`;
        el = document.getElementById('component6');
        assert.strictEqual(dataSettings(el, 'component'), 'test');

        node.innerHTML = `<div id="component7" data-component='[1, 2, "test"]'></div>`;
        el = document.getElementById('component7');
        assert.deepEqual(dataSettings(el, 'component'), [1, 2, 'test']);
    });

    it('path', function() {
        let el;

        node.innerHTML = `<div id="component1" data-component='{"key1": "123", "key2": {"key3": [1, 2, 3]}}'></div>`;
        el = document.getElementById('component1');
        assert.deepEqual(dataSettings(el, 'component.key2'), {key3: [1, 2, 3]});

        node.innerHTML = `<div id="component2" data-component-words='{"key1": "123", "key2.2": {"key3": [1, 2, 3]}}'></div>`;
        el = document.getElementById('component2');
        assert.deepEqual(dataSettings(el, 'component-words.key2\\.2.key3'), [1, 2, 3]);
    });

    it('default value', function() {
        let el;

        node.innerHTML = `<div id="component1" data-component='false'></div>`;
        el = document.getElementById('component1');
        assert.deepEqual(dataSettings(el, 'component', null), false);

        node.innerHTML = `<div id="component2"></div>`;
        el = document.getElementById('component2');
        assert.isUndefined(dataSettings(el, 'component'));

        node.innerHTML = `<div id="component3"></div>`;
        el = document.getElementById('component3');
        assert.isNull(dataSettings(el, 'component', null));

        node.innerHTML = `<div id="component4"></div>`;
        el = document.getElementById('component4');
        assert.strictEqual(dataSettings(el, 'component', false), false);

        node.innerHTML = `<div id="component5"></div>`;
        el = document.getElementById('component5');
        assert.isNaN(dataSettings(el, 'component', NaN));

        node.innerHTML = `<div id="component6"></div>`;
        el = document.getElementById('component6');
        assert.deepEqual(dataSettings(el, 'component', {}), {});
    });

    it('shorthands', function() {
        let el;

        node.innerHTML = `<div id="component1" data-component='{"key1": "123", "key2": {"key3": [1, 2, 3]}}' data-component-key4="true"></div>`;
        el = document.getElementById('component1');
        assert.deepEqual(dataSettings(el, 'component', null, {'@data-component-key4': 'key4'}), {key1: '123', key2: {key3: [1, 2, 3]}, key4: true});

        node.innerHTML = `<div id="component2" data-component='{"key1": "123", "key2": {"key3": [1, 2, 3]}}' data-component-key3="test"></div>`;
        el = document.getElementById('component2');
        assert.deepEqual(dataSettings(el, 'component', null, {'key3': 'key2'}), {key1: '123', key2: 'test'});

        node.innerHTML = `<div id="component3"></div>`;
        el = document.getElementById('component3');
        assert.isNull(dataSettings(el, 'component', null, {'@data-component-key5': 'key5'}));

        node.innerHTML = `<div id="component4" data-component-key2='{"test": 10}'></div>`;
        el = document.getElementById('component4');
        assert.deepEqual(dataSettings(el, 'component', null, ['key2']), {key2: {'test': 10}});
    });

    it('shorthands with types', function() {
        let el;
        let shorthands = {
            'key2': {
                'object': 'key2',
                'other': 'key2.enabled',
            }
        };

        node.innerHTML = `<div id="component1" data-component='{"key1": 1}' data-component-key2='2'></div>`;
        el = document.getElementById('component1');
        assert.deepEqual(dataSettings(el, 'component', {}, shorthands), {key1: 1, key2: {enabled: 2}});

        node.innerHTML = `<div id="component2" data-component='{"key1": 1}' data-component-key2='{"enabled": false, "option": "test"}'></div>`;
        el = document.getElementById('component2');
        assert.deepEqual(dataSettings(el, 'component', {}, shorthands), {key1: 1, key2: {enabled: false, option: 'test'}});
    });
});