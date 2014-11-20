illya.js
--------

This project is pre-alpha phase.

## Example

### app.html
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8" />
</head>
<body>
    <p>
        <input type="text" size="20" v-model="firstName" />
        <input type="text" size="20" v-model="lastName" />
    </p>
    <p>Your name: {{ name }}</p>
    
    <button type="button"v-on="click: hello">Hello</button>
    
    <script src="illya.js"></script>
    <script src="app.js"></script>
</body>
</html>
```

### app.ts
```ts
/// <reference path="illya.d.ts" />

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