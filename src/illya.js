var Vue = require('vue');

var LIFECYCLE_METHODS_KEYS = [
    'created', 'beforeCompile', 'compiled', 'ready',
    'attached', 'detached', 'beforeDestroy', 'destroyed'
];

var RESERVED_DATA_KEYS = [
    // Data
    'el',
    
    // DOM
    'template', 'replace',
    
    // Assets
    'components',

    // Others
    'mixins'
];

var RESERVED_METHODS_KEYS = ['constructor'].concat(LIFECYCLE_METHODS_KEYS);

function Illya() {
}

extendClassMember(Illya, Vue);

var p = Illya.prototype = Vue.prototype;

p.track = function (element) {
    var options = {
        // Data
        data: trackData(this),
        computed: {},
        methods: trackMethods(this),

        // DOM
        template: this.template,
        replace: this.replace,

        // Assets
        components: this.components,

        // Others
        mixins: this.mixins
    };

    trackLifecycle(this, options);

    if (!element) {
        element = this.el;
    }

    this.constructor.options = Vue.options;
    this._init(options);
    
    if (element) {
        this.$mount(element);
    }
};

function trackData(obj) {
    var keys = Object.keys(obj);
    var data = {};

    for (var i = 0; i < keys.length; ++i) {
        if (RESERVED_DATA_KEYS.indexOf(keys[i]) < 0) {
            data[keys[i]] = obj[keys[i]];
        }
    }

    return data;
}

function trackMethods(obj) {
    var proto = Object.getPrototypeOf(obj);
    var keys = Object.keys(proto);
    var methods = {};

    for (var i = 0; i < keys.length; ++i) {
        var descriptor = Object.getOwnPropertyDescriptor(proto, keys[i]);

        if (typeof descriptor.value === 'function') {
            if (RESERVED_METHODS_KEYS.indexOf(keys[i]) < 0) {
                methods[keys[i]] = descriptor.value;
            }
        }
    }

    return methods;
}

function trackLifecycle(obj, options) {
    var proto = Object.getPrototypeOf(obj);
    var keys = LIFECYCLE_METHODS_KEYS;

    for (var i = 0; i < keys.length; ++i) {
        if (typeof proto[keys[i]] === 'function') {
            options[keys[i]] = proto[keys[i]];
        }
    }
}  

function extendClassMember(dest, src) {
    var keys = Object.keys(src);
    
    for (var i = 0; i < keys.length; ++i) {
        dest[keys[i]] = src[keys[i]];
    }
}

module.exports = Illya;