var _ = require('underscore');
var clone = require('clone');
var Vue = require('vue');

var element = require('./element');

var LIFECYCLE_METHODS_KEYS = [
    'created', 'beforeCompile', 'compiled', 'ready',
    'attached', 'detached', 'beforeDestroy', 'destroyed'
];

var RESERVED_METHODS_KEYS = ['constructor'].concat(LIFECYCLE_METHODS_KEYS);

function track(vm, path, options, ctorOptionsWM) {
    'use strict';

    options = compileOptions(vm, options, ctorOptionsWM);

    vm.constructor.options = Illya.options;
    vm._init(options);

    var elem = element.resolveElement(vm, path);
    if (elem) {
        vm.$mount(elem);
    }
}

function compileOptions(vm, trackOptions, ctorOptionsWM) {
    'use strict';

    var options = trackOptions || {};
    var ctorOptions = {};

    if (ctorOptionsWM.has(vm)) {
        ctorOptions = ctorOptionsWM.get(vm);
    }

    options.data = trackData(vm);
    options.methods = trackMethods(vm);
    options.directives = [];

    trackLifecycle(vm, options);
    trackComponents(vm, options, ctorOptions, ctorOptionsWM);

    return options;
}

function trackData(obj) {
    'use strict';

    var keys = Object.keys(obj);
    var data = {};

    for (var i = 0; i < keys.length; ++i) {
        var c = keys[i].charAt(0);

        if (c !== '$' && c !== '_') {
            console.log('track data', keys[i]);
            data[keys[i]] = obj[keys[i]];
        }
    }

    return data;
}

function trackMethods(obj) {
    'use strict';

    var proto = Object.getPrototypeOf(obj);
    var keys = Object.keys(proto);
    var methods = {};

    for (var i = 0; i < keys.length; ++i) {
        var descriptor = Object.getOwnPropertyDescriptor(proto, keys[i]);

        if (typeof descriptor.value === 'function') {
            if (!_.contains(RESERVED_METHODS_KEYS, keys[i])) {
                console.log('track method', keys[i]);
                methods[keys[i]] = descriptor.value;
            }
        }
    }

    return methods;
}

function trackLifecycle(obj, options) {
    'use strict';

    var proto = Object.getPrototypeOf(obj);
    var keys = LIFECYCLE_METHODS_KEYS;

    for (var i = 0; i < keys.length; ++i) {
        if (typeof proto[keys[i]] === 'function') {
            options[keys[i]] = proto[keys[i]];
        }
    }
}

function trackComponents(vm, options, ctorOptions, ctorOptionsWM) {
    'use strict';

    if (!ctorOptions) return;
    if (!ctorOptions.components) return;

    options.components = {};

    /*jshint -W055 */
    for (var key in ctorOptions.components) {
        if (ctorOptions.components.hasOwnProperty(key)) {
            var componentCtor = ctorOptions.components[key];
            var sub = new componentCtor();
            var subOptions = compileOptions(sub, {}, ctorOptionsWM);

            copyComponent(options, key, componentCtor, subOptions);
        }
    }

    /*jshint +W055 */
}

function copyComponent(options, componentName, componentCtor, componentOptions) {
    'use strict';

    var component = options.components[componentName] = {};
    var keys = Object.keys(componentOptions);

    _.each(keys, function (key) {
        if (key !== 'data') {
            component[key] = componentOptions[key];
        }
    });

    if (componentOptions.data) {
        component.data = function () {
            return clone(componentOptions.data);
        };
    }
}

module.exports = {
    track: track
};