import { getByPath, setByPath } from 'access-by-path';

/**
 * @param {String} str
 * @param {boolean} [strict]
 * @returns {*}
 */
function jsonParse(str, strict) {
    try {
        str = JSON.parse(str);
    } catch (e) {
        if (strict) {
            throw e;
        }
    }
    return str;
}

/**
 * @param {String} name
 * @returns {String}
 */
function camelToHyphen(name) {
    return name.replace(/[A-Z]/g, match => '-' + match.toLowerCase());
}

/**
 * Get setting from data-attribute
 * @param {HTMLElement} element
 * @param {String} namespace
 * @param {*} [defaultValue]
 * @param {{}|null} [shorthands]
 * @param {boolean} [strict]
 * @returns {{}}
 */
export default function(element, namespace, defaultValue, shorthands, strict) {
    let data;
    let split = namespace.split('.');
    let base  = 'data-' + camelToHyphen(split.shift());
    let path  = split.join('.');
    if (element.hasAttribute(base)) {
        data = jsonParse(element.getAttribute(base), strict);
        if (path) {
            data = getByPath(data, path, defaultValue);
        }
    } else {
        data = defaultValue;
    }

    if (shorthands) {
        let isArray = Array.isArray(shorthands);
        let keys = isArray ? shorthands : Object.keys(shorthands);
        keys.forEach(key => {
            let path = isArray ? key : shorthands[key];
            key = key.charAt(0) === '@' ? key.substr(1) : base + '-' + key;
            if (element.hasAttribute(key)) {
                let value = jsonParse(element.getAttribute(key), strict);
                path = typeof path === 'string' ? path : path[typeof value] || path['other'];
                if (path) {
                    data = data || {};
                    setByPath(data, path, value);
                }
            }
        });
    }

    return data;
}