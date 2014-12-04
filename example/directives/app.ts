/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../lib/illya.d.ts" />

class FooDirective extends Illya.Directive {
    protected update(value: string) {
        $(this.el).text('v-foo: ' + value);
    }
}

class App extends Illya {
    foo = 'foo';

    constructor() {
        super({
            directives: {
                foo: FooDirective
            }
        });
    }
}

var app = new App();
app.track('body');
