var _ = require('underscore');
var clone = require('clone');

function mixin(dest, src) {
    'use strict';

    _.each(Object.keys(src), function (key) {
        dest[key] = src[key];
    });
}

function extend() {
    'use strict';

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
    'use strict';

    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];

    /*jshint validthis: true */
    //  Possible strict violation.
    function __() { this.constructor = d; }
    /*jshint validthis: false */

    __.prototype = b.prototype;

    /*jshint -W055 */
    // A constructor name should start with an uppercase letter.
    d.prototype = new __();
    /*jshint +W055 */
}

module.exports = {
    mixin: mixin,
    extendTypeScript: extendTypeScript
};