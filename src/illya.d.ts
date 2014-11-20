declare class Illya {
    // Vue.js
    // Instance Properties
    // http://vuejs.org/api/instance-properties.html
    public $el: HTMLElement;
    public $data: Object;
    public $options: Object;
    public $parent: Illya;
    public $root: Illya;
    public $: Object;
    public $$: Object;

    // Instance Methods
    // http://vuejs.org/api/instance-methods.html
    //public $watch

    // illya.js
    public el: string;
    public template: string;
    public replace: boolean;
    public components: { [key: string]: Illya };

    public track(): void;
    public track(element: HTMLElement): void;
    public track(selector: string): void;
}

declare module "illya" {
    export = Illya;
}