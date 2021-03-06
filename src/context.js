'use strict';

const co        = require('co');
const _         = require('lodash');
const console    = require('./console');

module.exports = function (context, source) {

    const resolve = co.wrap(function* (obj) {

        const mapper = co.wrap(function* (item, key) {

            item = yield Promise.resolve(item);
            if (_.isFunction(item)) {
                return resolve(item());
            }
            if (_.isArray(item) || _.isObject(item)) {
                return resolve(item);
            }
            if (_.isString(item) && _.startsWith(item, '@')) {
                const parts  = item.split('.');
                const handle = parts.shift();
                let entity   = source.find(handle);
                if (entity && parts.length) {
                    if (entity.type === 'component') {
                        entity = entity.variants().default();
                    }
                    const entityContext = yield resolve(entity.context);
                    return _.get(entityContext, parts.join('.'), null);
                }
                console.debug(`Could not resolve context reference for ${item}`);
                return null;
            }

            return item;
        });

        const iterator = _.isArray(obj) ? 'map' : 'mapValues';
        return yield _[iterator](obj, mapper);
    });

    return resolve(context);
};
