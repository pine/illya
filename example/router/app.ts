/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../lib/illya.d.ts" />

class App extends Illya.Router {
    message = '';

    constructor() {
        super();

        this.map('#/').to(this.index);
        this.map('#/article(/:id)').to(this.article);
        this.rescue(this.unknown);

        this.root('#/');

        this.listen();
    }

    index() {
        this.message = 'index';
    }

    article() {
        if (this.params['id']) {
            this.message = 'article id = ' + this.params['id'];
        }

        else {
            this.message = 'article index';
        }
    }

    unknown() {
        this.message = 'Error';
    }
}

var app = new App();
app.track('body');

console.log(app);
