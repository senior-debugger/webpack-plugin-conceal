# Webpack Plugin Conceal

**webpack-plugin-conceal** is a Webpack loader that helps obscure JavaScript object arrays in your source code. At build time, it transforms your data into Base64-encoded strings, reducing the visibility of raw values in the final bundle. At runtime, it seamlessly decodes the data back into usable JavaScript objects.

[![NPM version](https://img.shields.io/npm/v/webpack-plugin-conceal.svg)](https://www.npmjs.com/package/webpack-plugin-conceal)
[![License: ISC](https://img.shields.io/badge/license-ISC-blue.svg)](https://opensource.org/licenses/ISC)

---

## What It Does

Imagine this source file:

```ts
// users.conceal.ts
export default [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 }
];
```

Instead of including the raw names "Alice" and "Bob" directly in your production bundle, the plugin will transform it during build into:

```ts
import { decode } from 'webpack-plugin-conceal';

export default decode([
  { name: "\"QWxpY2U=\"", age: "MzA=" },
  { name: "\"Qm9i\"", age: "MjU=" }
]);
```

Then, at runtime, the `decode()` function will automatically decode the Base64 strings and parse them back to their original values:

```js
[
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 }
]
```

This makes it harder for tools or users inspecting your production JavaScript to directly read your raw data.

---

## Features

- Transform any pattern of files (e.g.: `.conceal.js`, `.conceal.ts`, `.conceal.jsx`, `.conceal.tsx`)
- Encodes JavaScript object arrays using Base64-encoded JSON
- Automatically decodes data at runtime
- Lightweight and easy to configure

---

## Installation

```bash
npm install webpack-plugin-conceal
# or
yarn add webpack-plugin-conceal
```

---

## Usage

### 1. Add the loader to `Webpack config`

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.conceal\.(js | ts)$/,
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

### 2. Create a `.conceal.ts` or `.conceal.js` file

```js
// data.conceal.ts
export default [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 }
];
```

### 3. Import created before file(s) somewhere in the application.

```ts
import usersData from './users.conceal';

console.log(usersData);
```

---

## How It Works

1. The plugin identifies files matching the configured pattern.
2. It evaluates the file content to extract the default export (must be an array of objects).
3. Each object is encoded by:
  - Serializing each value to JSON
  - Encoding each JSON string using Base64
4. A transformed module is generated that decodes the data at runtime.

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
