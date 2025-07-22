# Base64Coder

[![NPM version](https://img.shields.io/npm/v/base64coder.svg)](https://www.npmjs.com/package/base64coder)

**Base64Coder** is a Webpack loader and utility that allows you to encode JavaScript data into Base64 to obscure it in the final bundle.

---

## 🚀 Installation

Install via [npm](https://www.npmjs.com/package/base64coder):

```bash
npm install base64coder
```

---

## 📖 Overview

This library helps you encode structured data into Base64 format. It can be useful when you want to hide text or other embedded data in your source code.

---

## 🧩 Usage

### 1. Create a data file

Create a file, e.g., `data.loader.js`, and export the data using a variable named `base64data`:

```javascript
const data1 = {
  header: 'What is the best programming language?',
  questions: [
    { text: 'Javascript', isRight: true },
    { text: 'C#', isRight: false }
  ]
};

const data2 = {
  title: 'JS or JSON?',
  text: 'This is a page created for ...'
};

// Required: export a variable named base64data
var base64data = [data1, data2];
module.exports = base64data;
```

---

### 2. Import and decode data

In your controller or application module:

```javascript
import decode from 'base64coder/decode';
import data from './data.loader';

(function showDecoded() {
  console.log('Decoded:', decode(data));
})();
```

---

### 3. Webpack configuration

Add the loader to your Webpack configuration:

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.loader\.js$/,
        use: [
          {
            loader: 'base64coder',
          }
        ]
      }
    ]
  }
};
```

---

## 🧪 Examples

View a working example here:  
[GitHub Example »](https://github.com/senior-debugger/base64Coder/tree/master/examples/1)
