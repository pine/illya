function Directive(update) {
    if (update) {
        this.update = update;
    }
}

Directive.prototype.isLiteral = false;
Directive.prototype.twoWay = false;
Directive.prototype.acceptStatement = false;
Directive.prototype.deep = false;

module.exports = {
    Directive: Directive
};