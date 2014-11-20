/// <reference path="../src/illya.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        _super.apply(this, arguments);
        this.firstName = 'first';
        this.lastName = 'last';
    }
    App.prototype.hello = function () {
        alert('Hello ' + this.name);
    };
    Object.defineProperty(App.prototype, "name", {
        get: function () {
            return this.firstName + ' ' + this.lastName;
        },
        enumerable: true,
        configurable: true
    });
    return App;
})(Illya);
var app = new App();
app.track('body');
