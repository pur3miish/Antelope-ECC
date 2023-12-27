![antelope ecc logo](static/antelope-ecc.svg)

# Antelope ECC

[![NPM Package](https://img.shields.io/npm/v/antelope-ecc.svg)](https://www.npmjs.org/package/antelope-ecc) [![CI status](https://github.com/pur3miish/antelope-ecc/workflows/CI/badge.svg)](https://github.com/pur3miish/antelope-ecc/actions) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/pur3miish/antelope-ecc/blob/main/LICENSE)

A lightweight (\~6 KB) [universal](https://en.wikipedia.org/wiki/Isomorphic_JavaScript) JavaScript digital signature and cryptokey utilty package for Antelope based blockchains.

### Features of package Antelope blokchain

- Generate sep256k1 signatures _(SIG_K1)_ .
- Generate secp256k1 key pair _(private and public keys)_.
- Derive public key from private key.
- Recover public key from siganture.
- Create and recover private key mnemonic _(BIP39)_.
- Legacy key transformation utility functions.
- Create and sign with webauthn keys an signatures _(PUB_WA & SIG_WA)_.

## Installation

For [Node.js](https://nodejs.org), to install [`antelope-ecc`](https://npm.im/antelope-ecc) run:

```sh
npm i antelope-ecc
```

## Examples

Signing a packed transaction.

```js
import sign_packed_txn from "antelope-ecc/sign_packed_txn.mjs";

sign_packed_txn({
  chain_id: "2a02a0053…",
  transaction_header: "fa123232…",
  transaction_body: "fa45ffa2…",
  wif_private_key: "PVT_K1_…",
}).then(console.log);
```

> The logged output will be SIG_K1\_…

Sign a message digest.

```js
import sign_txn from "antelope-ecc/sign_txn.mjs";
import crypto from "crypto";

sign_txn({
  hash: crypto
    .createHash("sha256")
    .update(Uint8Array.from([1, 2, 3, 4, 5]))
    .digest()
    .toString("hex"), // Uint8Array | string
  wif_private_key: "PVT_K1_43…",
}).then(console.log);
```

The logged output will be SIG_K1…

An example of how to create a pair keys.

```js
import new_keys from "antelope-ecc/new_keys.mjs";

new_keys().then(console.log);
```

> The logged output will be an object containing PUB_K1 and PVT_K1 wif keys.

Recover public key from signature.

```js
import recover_public_key from "antelope-ecc/recover_public_key.mjs";

const hash = Uint8Array.from(
  crypto.createHash("sha256").update(Buffer.from("ff", "hex")).digest()
); // Data signed with private key

recover_public_key({
  signature: "SIG_K1_…",
  hash,
}).then(console.log);
```

> The logged output will contain the public key “PUB_K1…” used to sign the hash.

Ways to require in CJS

> **Note**
>
> As this package is [ESM](https://nodejs.org/docs/latest-v16.x/api/esm.html) if you need to require it in a [Common JS](https://nodejs.org/docs/latest-v16.x/api/modules.html) package, then you can require like this:

```js
(async function () {
  const { default: new_keys } = await import("antelope-ecc/new_keys.mjs");
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

The [npm](https://npmjs.com) package [`antelope-ecc`](https://npm.im/antelope-ecc) features [optimal JavaScript module design](https://jaydenseric.com/blog/optimal-javascript-module-design). It doesn’t have a main index module, so use deep imports from the ECMAScript modules that are exported via the [`package.json`](./package.json) field [`exports`](https://nodejs.org/api/packages.html#exports):

- [`legacy_from_private_key.mjs`](./keys/legacy_from_private_key.mjs)
- [`legacy_from_public_key.mjs`](./keys/legacy_from_public_key.mjs)
- [`legacy_to_private_key.mjs`](./keys/legacy_to_private_key.mjs)
- [`private_key_from_wif.mjs`](./keys/private_key_from_wif.mjs)
- [`private_key_to_wif.mjs`](./keys/private_key_to_wif.mjs)
- [`public_key_from_private_wif.mjs`](./keys/public_key_from_private_wif.mjs)
- [`public_key_from_wif.mjs`](./keys/public_key_from_wif.mjs)
- [`public_key_to_wif.mjs`](./keys/public_key_to_wif.mjs)
- [`validate_private_key.mjs`](./keys/validate_private_key.mjs)
- [`validate_public_key.mjs`](./keys/validate_public_key.mjs)
- [`createWebAuthnKey.mjs`](./createWebAuthnKey.mjs)
- [`createWebAuthnSignaure.mjs`](./createWebAuthnSignaure.mjs)
- [`mnemonic-create.mjs`](./mnemonic-create.mjs)
- [`mnemonic-recover.mjs`](./mnemonic-recover.mjs)
- [`new_keys.mjs`](./new_keys.mjs)
- [`sign_packed_txn.mjs`](./sign_packed_txn.mjs)
- [`sign_txn.mjs`](./sign_txn.mjs)
