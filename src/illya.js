var Vue = require('vue');
var clone = require('clone');
var _ = require('underscore');

/*jshint -W079 */
// Redefinition of 'WeakMap'.
var WeakMap = require('es6-weak-map');
/*jshint +W079 */

var track = require('./illya/track');
var utility = require('./illya/utility');
var router = require('./illya/router');

var CtorOptionsWM = new WeakMap(); // >= IE11

function Illya(options) {
    /*! illya.js - Illya: イリヤたんprpr */

    if (options) {
        CtorOptionsWM.set(this, options);
    }
}
var p = Illya.prototype;

p.track = function (el, options) {
    track.track(this, el, options, CtorOptionsWM);
};

Illya.Vue = Vue;

utility.mixin(Illya, Vue);
utility.mixin(Illya.prototype, Vue.prototype);

utility.extendAfter(router.Router, Illya);
Illya.Router = router.Router;
Illya._ = _;

module.exports = Illya;