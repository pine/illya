var _ = require('underscore');
var Path = require('pathjs-amd');

function Router() {
    /*! illya.js - Router */

    this.path = null;
    this.params = {};
    
    Path.rescue(wrapRescureFunction(this));
}

Router.prototype.map = function (path) {
    return new RouteProxy(this, Path.map(path));
};

Router.prototype.root = function (path) {
    Path.root(path);
};

Router.prototype.rescue = function (fn) {
    Path.rescue(wrapRescureFunction(this, fn));
};

Router.prototype.listen = function () {
    Path.listen();
};

/**
 * ルートを設定する際のヘルパークラス
 */
function RouteProxy(router, route) {
    this.router = router;
    this.route = route;
}

RouteProxy.prototype.to = function (fn) {
    this.route.to(getRouteFunctionProxy(this.router, fn));
    return this;
};

RouteProxy.prototype.enter = function (fns) {
    if (!_.isArray(fns)) {
        fns = [fns];
    }

    fns = _.map(fns, _.bind(function (fn) {
        return getRouteFunctionProxy(this.router, fn);
    }, this));

    this.route.enter(fns);
    return this;
};


RouteProxy.prototype.exit = function (fn) {
    this.route.exit(getRouteFunctionProxy(this.router, fn));
    return this;
};

/**
 * ルート関係のイベントハンドラをパラメーを設定して呼ぶようにラップする
 */
function getRouteFunctionProxy(router, fn) {
    return function () {
        router.params = this.params;
        router.path = this.path;

        fn.call(router);
    };
}

/**
 * 設定されたルートが見つからない時に実行される関数をラップする
 */
function wrapRescureFunction(router, fn) {
    return function () {
        router.params = {};
        router.path = null;
        if (fn) { fn.call(router); }
    };
}

module.exports = {
    Router: Router
};