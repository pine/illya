var Vue = require('vue');

/*jshint -W079 */
// Redefinition of 'WeakMap'.
var WeakMap = require('es6-weak-map');
/*jshint +W079 */

var track = require('./illya/track');
var utility = require('./illya/utility.js');

var CtorOptionsWM = new WeakMap(); // >= IE11

function Illya(options) {
    /*! illya.js: イリヤたんprpr */

    if (options) {
        CtorOptionsWM.set(this, options);
    }
}

Illya.Vue = Vue;
utility.mixin(Illya, Vue);
utility.mixin(Illya.prototype, Vue.prototype);

var p = Illya.prototype;

p.track = function (el, options) {
    track.track(this, el, options, CtorOptionsWM);
};

module.exports = Illya;