/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../lib/illya.d.ts" />

class App extends Illya {
    public firstName = 'first';
    public lastName = 'last';
    
    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }
}

var app = new App();
app.track($('body'));
