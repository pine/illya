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

    trackLifecycle(vm, options);
    trackComponents(vm, options, ctorOptions, ctorOptionsWM);
    trackDirectives(vm, options, ctorOptions);

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

    for (var key in ctorOptions.components) {
        if (ctorOptions.components.hasOwnProperty(key)) {
            var componentCtor = ctorOptions.components[key];

            /*jshint -W055 */
            // A constructor name should start with an uppercase letter.
            var sub = new componentCtor();
            /*jshint +W055 */

            var subOptions = compileOptions(sub, {}, ctorOptionsWM);
            copyComponent(options, key, componentCtor, subOptions);
        }
    }
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


function trackDirectives(vm, options, ctorOptions) {
    'use strict';

    if (!ctorOptions) return;
    if (!ctorOptions.directives) return;

    options.directives = {};

    for (var key in ctorOptions.directives) {
        if (ctorOptions.directives.hasOwnProperty(key)) {
            var directiveCtor = ctorOptions.directives[key];

            /*jshint -W055 */
            // A constructor name should start with an uppercase letter.
            var dir = new directiveCtor();
            /*jshint +W055 */

            options.directives[key] = dir;
        }
    }
}


module.exports = {
    track: track
};