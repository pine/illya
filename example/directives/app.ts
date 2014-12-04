/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../src/illya.d.ts" />

class TestDirective extends Illya.Directive {
    protected update(value: string) {
        console.log(value);
        console.log(this);
    }

}

class App extends Illya {
    constructor() {
        super({
            directives: {
                test: TestDirective
            }
        });
    }
}

var app = new App();
app.track('body');
