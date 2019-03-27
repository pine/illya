illya.js
--------
[![Build Status](https://travis-ci.org/pine613/illya.svg?branch=master)](https://travis-ci.org/pine613/illya) [![Greenkeeper badge](https://badges.greenkeeper.io/pine/illya.svg)](https://greenkeeper.io/)

This project is pre-alpha phase.
illya.js is based on [Vue.js](https://github.com/yyx990803/vue).


## Examples
### Basic example
#### HTML
```html
<p>
    <input type="text" size="20" v-model="firstName" />
    <input type="text" size="20" v-model="lastName" />
</p>
<p>Your name: {{ name }}</p>

<button type="button" v-on="click: hello">Hello</button>
```

#### TypeScript
```ts
class App extends Illya {
    // Data binding
    public firstName = 'firstName';
    public lastName = 'lastName';
    
    // Computed propery
    get name() {
        return this.firstName + ' ' + this.lastName;
    }
    
    // Methods
    hello() {
        alert('Hello ' + this.name);
    }
    
    // Lifecycle
    ready() {
        console.log('ready');
    }
}

var app = new App();
app.track('body');
```

### Example of multi components
#### HTML

```html
<div v-component="foo">
    {{ name }}
</div>

<div v-component="bar">
    <button type="button" v-on="click: clicked">Button</button>
</div>
```

#### TypeScript

```ts

class FooVM extends Illya {
    firstName = 'firstName';
    lastName = 'lastName';
    
    get name() {
        return this.firstName + ' ' + this.lastName;
    }
}

class BarVM extends Illya {
    clicked() {
        console.log('clicked');
    }
}

class App extends Illya {
    constructor() {
        super({ components: { foo: FooVM, bar: BarVM }});
    }
}

var app = new App();
app.track('body');
```

## Usage
### For Browserify, webpack users

```
$ npm install illya
```

```ts
import Illya = require('illya');

class App extends Illya {
    ...
}
```