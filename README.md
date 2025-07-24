# Webpack Plugin Conceal

**webpack-plugin-conceal** is a Webpack loader that helps obscure JavaScript object arrays in your source code. At build time, it transforms your data into Base64-encoded strings, reducing the visibility of raw values in the final bundle. At runtime, it seamlessly decodes the data back into usable JavaScript objects.

[![NPM version](https://img.shields.io/npm/v/webpack-plugin-conceal.svg)](https://www.npmjs.com/package/webpack-plugin-conceal)
[![License: ISC](https://img.shields.io/badge/license-ISC-blue.svg)](https://opensource.org/licenses/ISC)

---

## What It Does

Imagine this source file:

```js
// data.loader.js
var base64data = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 }
];
module.exports = base64data;
```

Instead of including the raw names "Alice" and "Bob" in your production bundle, the plugin will encode them during build like this:

```js
module.exports = [
  { name: "\"QWxpY2U=\"", age: "MzA=" },
  { name: "\"Qm9i\"", age: "MjU=" }
];
```

Then, at runtime, you can decode them like this:

```js
import decode from 'webpack-plugin-conceal/decode';
import data from './data.loader';

console.log(decode(data));
// Output:
// [
//   { name: 'Alice', age: 30 },
//   { name: 'Bob', age: 25 }
// ]
```

This makes it harder for tools or users inspecting your production JavaScript to directly read your raw data.

---

## Features

- Encodes JavaScript object arrays using Base64-encoded JSON
- Automatically decodes data at runtime
- Works with any `.loader.js` or custom-matched files
- Lightweight and easy to integrate

---

## Installation

```bash
npm install webpack-plugin-conceal
```

---

## Usage

### 1. Create a `.loader.js` file

```js
var base64data = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 }
];

module.exports = base64data;
```

### 2. Import and decode in runtime

```js
import decode from 'webpack-plugin-conceal/decode';
import data from './data.loader';

const decoded = decode(data);
```

### 3. Add the loader to Webpack config

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.loader\.js$/,
        use: [
          {
            loader: 'webpack-plugin-conceal',
          }
        ]
      }
    ]
  }
};
```

---

## API

### `encode(data: any[]): Record<string, string>[]`

Encodes an array of objects into Base64-encoded strings.

### `decode(source: any[]): any[]`

Decodes an array of Base64-encoded object properties back to JavaScript values.

---

## Caveats

- Only supports CommonJS modules with a `module.exports` assignment to an array
- Input file must export a variable named `base64data`
- Intended for basic obfuscation, not for secure encryption

---

## License

ISC © 2025 Dmitrii Zakharov
