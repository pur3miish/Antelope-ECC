![eos ecc logo](https://raw.githubusercontent.com/pur3miish/eos-ecc/main/static/eos-ecc.svg)

# EOS-ECC

[![NPM Package](https://img.shields.io/npm/v/eos-ecc.svg)](https://www.npmjs.org/package/eos-ecc) [![CI status](https://github.com/pur3miish/eos-ecc/workflows/CI/badge.svg)](https://github.com/pur3miish/eos-ecc/actions) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/pur3miish/eos-ecc/blob/main/LICENSE)

A lightweight (\~6 KB) [universal](https://en.wikipedia.org/wiki/Isomorphic_JavaScript) JavaScript Antelope and EOSIO digital signature and cryptokey utilty package.

## Installation

For [Node.js](https://nodejs.org), to install [`eos-ecc`](https://npm.im/eos-ecc) run:

```sh
npm install eos-ecc
```

## Examples

An example of signing a packed transaction.

```js
import sign_packed_txn from "eos-ecc/sign_packed_txn.mjs";

sign_packed_txn({
  chain_id: "2a02a0053…",
  transaction_header: "fa123232…",
  transaction_body: "fa45ffa2…",
  wif_private_key: "5f…",
}).then(console.log);
```

> The logged output will be SIG_K1\_…

An example of creating new pair of crypto keys.

```js
import new_keys from "eos-ecc/new_keys.mjs";

new_keys().then(console.log);
```

> The logged output will be an object containing PUB_K1 and PVT_K1 wif keys.

An example of recovering public key from signature.

```js
import recover_public_key from "eos-ecc/recover_public_key.mjs";

recover_public_key({
  signature: "SIG_K1_…",
  data: "ff",
}).then(console.log);
```

> The logged output will be PUB_K1….

## Requirements

Supported runtime environments:

- [Node.js](https://nodejs.org) versions `>=16.0.0`.
- Browsers matching the [Browserslist](https://browsersl.ist) query [`> 0.5%, not OperaMini all, not dead`](https://browsersl.ist/?q=%3E+0.5%25%2C+not+OperaMini+all%2C+not+dead).

## Exports

The [npm](https://npmjs.com) package [`eos-ecc`](https://npm.im/eos-ecc) features [optimal JavaScript module design](https://jaydenseric.com/blog/optimal-javascript-module-design). It doesn’t have a main index module, so use deep imports from the ECMAScript modules that are exported via the [`package.json`](./package.json) field [`exports`](https://nodejs.org/api/packages.html#exports):

- [`legacy_to_private_key.mjs`](./legacy_to_private_key.mjs)
- [`legacy_to_public_key.mjs`](./legacy_to_public_key.mjs)
- [`new_eos_keys.mjs`](./new_eos_keys.mjs)
- [`new_keys.mjs`](./new_keys.mjs)
- [`public_key_to_wif.mjs`](./public_key_to_wif.mjs)
- [`public_key_from_private.mjs`](./public_key_from_private.mjs)
- [`random_bytes.mjs`](./random_bytes.mjs)
- [`recover_public_key_from_signature.mjs`](./recover_public_key_from_signature.mjs)
- [`sign_packed_txn.mjs`](./sign_packed_txn.mjs)
- [`sign_txn.mjs`](./sign_txn.mjs)
- [`validate_private_key.mjs`](./validate_private_key.mjs)
- [`validate_public_key.mjs`](./validate_public_key.mjs)
- [`wif_to_private_key.mjs`](./wif_to_private_key.mjs)
- [`wif_to_public_key.mjs`](./wif_to_public_key.mjs)
