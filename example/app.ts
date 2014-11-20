/// <reference path="../src/illya.d.ts" />

class App extends Illya {
    public firstName = 'first';
    public lastName = 'last';
    
    hello() {
        alert('Hello ' + this.name);
    }
    
    get name() {
        return this.firstName + ' ' + this.lastName;
    }
    
    ready() {
        console.log('ready');
    }
}

var app = new App();
app.track('body');