/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../lib/illya.d.ts" />

class TestDirective extends Illya.Directive {
    protected update(value: string) {
        console.log(value);
        console.log(this);
    }

}

class App extends Illya {
    test = "foobar";

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
