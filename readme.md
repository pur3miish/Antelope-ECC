![antelope ecc logo](static/antelope-ecc.svg)

# Antelope ECC

[![NPM Package](https://img.shields.io/npm/v/antelope-ecc.svg)](https://www.npmjs.org/package/antelope-ecc) [![CI status](https://github.com/pur3miish/antelope-ecc/workflows/CI/badge.svg)](https://github.com/pur3miish/antelope-ecc/actions) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/pur3miish/antelope-ecc/blob/main/LICENSE)

A lightweight [universal](https://en.wikipedia.org/wiki/Isomorphic_JavaScript) JavaScript digital signature and cryptokey utilty package for Antelope based blockchains.

## Requirements

Supported runtime environments:

- [Node.js](https://nodejs.org) versions `>=18.0.0`.
- Browsers matching the [Browserslist](https://browsersl.ist) query [`> 0.5%, not OperaMini all, not dead`](https://browsersl.ist/?q=%3E+0.5%25%2C+not+OperaMini+all%2C+not+dead).

## Installation

For [Node.js](https://nodejs.org), to install [`antelope-ecc`](https://npm.im/antelope-ecc) run:

```sh
npm i antelope-ecc
```

_Ways to import in ESM_

```js
import { sign } from "antelope-ecc"; // Tree shaking capabilities.
```

_As default exports_

```js
import AntelopeECC from "antelope-ecc";
```

_Ways to require/import in Common JS_

```js
const AntelopeECC = import("antelope-ecc");
AntelopeECC.then(({ sign }) => {
  // As import is async
});
```

**Sign a message digest.**

```js
import { sign } from "anteope-ecc";
import { createHash } from "crypto";

await sign({
  hash: createHash("sha256")
    .update(Uint8Array.from([1, 2, 3, 4, 5]))
    .digest()
    .toString("hex"), // Uint8Array | string
  wif_private_key: "PVT_K1_43…",
}).then(console.log);
```

The logged output will be SIG_K1…

**An example of how to create a pair keys.**

```js
import { new_keys } from "antelope-ecc";

new_keys().then(console.log);
```

> The logged output will be an object containing PUB_K1 and PVT_K1 wif keys.

**Recover public key from signature.**

```js
import { recover_public_key } from "antelope-ecc";

const hash = Uint8Array.from(
  crypto.createHash("sha256").update(Buffer.from("ff", "hex")).digest()
); // Data signed with private key

recover_public_key({
  signature: "SIG_K1_…",
  hash,
}).then(console.log);
```

> The logged output will contain the public key “PUB_K1…” used to sign the hash.

## Exports

ECMAScript modules deep exports are avaialble via [`package.json`](./package.json) field [`exports`](https://nodejs.org/api/packages.html#exports):

- [`legacy_from_private_key.js`](./keys/legacy_from_private_key.js)
- [`legacy_from_public_key.js`](./keys/legacy_from_public_key.js)
- [`legacy_to_private_key.js`](./keys/legacy_to_private_key.js)
- [`private_key_from_wif.js`](./keys/private_key_from_wif.js)
- [`private_key_to_wif.js`](./keys/private_key_to_wif.js)
- [`public_key_from_private_wif.js`](./keys/public_key_from_private_wif.js)
- [`public_key_from_wif.js`](./keys/public_key_from_wif.js)
- [`public_key_to_wif.js`](./keys/public_key_to_wif.js)
- [`validate_private_key.js`](./keys/validate_private_key.js)
- [`validate_public_key.js`](./keys/validate_public_key.js)
- [`mnemonic-create.js`](./mnemonic-create.js)
- [`mnemonic-recover.js`](./mnemonic-recover.js)
- [`new_keys.js`](./new_keys.js)
- [`sign_packed_txn.js`](./sign_packed_txn.js)
- [`sign.js`](./sign.js)
