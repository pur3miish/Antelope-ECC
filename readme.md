![eos ecc logo](static/eosio-ecc.svg)

# EOSIO ECC

[![NPM Package](https://img.shields.io/npm/v/eosio-ecc.svg)](https://www.npmjs.org/package/eosio-ecc) [![CI status](https://github.com/pur3miish/eosio_ecc/workflows/CI/badge.svg)](https://github.com/pur3miish/eosio_ecc/actions) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/pur3miish/eosio_ecc/blob/main/LICENSE)

A lightweight (\~6 KB) [universal](https://en.wikipedia.org/wiki/Isomorphic_JavaScript) JavaScript Antelope and EOSIO digital signature and cryptokey utilty package.

## Installation

For [Node.js](https://nodejs.org), to install [`eosio-ecc`](https://npm.im/isomorphic-secp256k1-js) run:

```sh
npm i eosio-ecc
```

For [Deno.js](https://deno.land), to use [eosio_ecc](https://deno.land/x/eosio_ecc) Add these import paths to your `deno.json` file:

```json
{
  "imports": {
    "universal-sha256-js/": "https://deno.land/x/sha256js/",
    "universal-hmac-sha256-js/": "https://deno.land/x/hmacsha256/",
    "universal-hmac-sha256-js/hmac-sha256-node.mjs": "https://deno.land/x/hmacsha256/hmac-sha256-deno.mjs",
    "base58-js/": "https://deno.land/x/base58/",
    "isomorphic-secp256k1-js/": "https://deno.land/x/secp256k1js/",
    "ripemd160-js/": "https://deno.land/x/ripemd160js@v2.0.3/"
  }
}
```

## Examples

Signing a packed transaction.

```js
import sign_packed_txn from "eosio-ecc/sign_packed_txn.mjs";

sign_packed_txn({
  chain_id: "2a02a0053…",
  transaction_header: "fa123232…",
  transaction_body: "fa45ffa2…",
  wif_private_key: "5f…",
}).then(console.log);
```

> The logged output will be SIG_K1\_…

An example of how to create a pair keys.

```js
import new_keys from "eosio-ecc/new_keys.mjs";

new_keys().then(console.log);
```

> The logged output will be an object containing PUB_K1 and PVT_K1 wif keys.

Recover public key from signature.

```js
import recover_public_key from "eosio-ecc/recover_public_key.mjs";

recover_public_key({
  signature: "SIG_K1_…", // Signature
  data: "ff", // Data that was used to create signature.
}).then(console.log);
```

> The logged output will be PUB_K1….

Ways to require in CJS

> **Note**
>
> As this package is [ESM](https://nodejs.org/docs/latest-v16.x/api/esm.html) if you need to require it in a [Common JS](https://nodejs.org/docs/latest-v16.x/api/modules.html) package, then you can require like this:

```js
(async function () {
  const { default: new_keys } = await import("eosio-ecc/new_keys.mjs");
  const key_pair = await new_keys();
  console.log(key_pair);
})();
```

> the logged output was: { public_key: PUB_K1_6…, private_key: PVT_K1_ge…}

## Requirements

Supported runtime environments:

- [Node.js](https://nodejs.org) versions `>=16.0.0`.
- Browsers matching the [Browserslist](https://browsersl.ist) query [`> 0.5%, not OperaMini all, not dead`](https://browsersl.ist/?q=%3E+0.5%25%2C+not+OperaMini+all%2C+not+dead).
- [Deno](https://deno.land) version `^1.30.0`.

## Exports

The [npm](https://npmjs.com) package [`eosio-ecc`](https://npm.im/eosio-ecc) features [optimal JavaScript module design](https://jaydenseric.com/blog/optimal-javascript-module-design). It doesn’t have a main index module, so use deep imports from the ECMAScript modules that are exported via the [`package.json`](./package.json) field [`exports`](https://nodejs.org/api/packages.html#exports):

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
