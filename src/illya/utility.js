var _ = require('underscore');

function mixin(dest, src) {
    _.each(Object.keys(src), function (key) {
        dest[key] = src[key];
    });
}

module.exports = {
    mixin: mixin
};