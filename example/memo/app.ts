/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../src/illya.d.ts" />

class App extends Illya {
    memos: string[] = [];
    memo: string;

    insert() {
        this.memos.push(this.memo);
        this.memo = '';
    }
}

var app = new App();
app.track('body');
