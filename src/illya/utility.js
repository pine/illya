var _ = require('underscore');
var clone = require('clone');

function mixin(dest, src) {
    _.each(Object.keys(src), function (key) {
        dest[key] = src[key];
    });
}

function extend() {
    var val = {};

    for (var i = 0; i < arguments.length; ++i) {
        for(var key in arguments[i]){
            if(arguments[i].hasOwnProperty(key)){
                val[key] = arguments[i][key];
            }
        }
    }

    return val;
}

function extendTypeScript(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;

    d.prototype = new __();
}

function extendAfter(klass, parent) {
    var originProto = extend(klass.prototype);

    extendTypeScript(klass, parent);
    mixin(klass.prototype, originProto);
}

module.exports = {
    mixin: mixin,
    extendAfter: extendAfter
};