/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../lib/illya.d.ts" />

class MemoVM extends Illya {
    memos: string[] = [];
    memo: string = null;

    constructor() {
        super();
    }

    insert() {
        this.memos.push(this.memo);
        this.memo = '';
    }
}

class App extends Illya {
    constructor() {
        super({
            components: {
                memo: MemoVM
            }
        });
    }
}

var app = new App();
app.track('body');
