![eos ecc logo](https://raw.githubusercontent.com/pur3miish/eos-ecc/main/static/eos-ecc.svg)

# EOS-ECC

[![NPM Package](https://img.shields.io/npm/v/eos-ecc.svg)](https://www.npmjs.org/package/eos-ecc) [![CI status](https://github.com/pur3miish/eos-ecc/workflows/CI/badge.svg)](https://github.com/pur3miish/eos-ecc/actions) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/pur3miish/eos-ecc/blob/main/LICENSE)

A [universal](https://en.wikipedia.org/wiki/Isomorphic_JavaScript) JavaScript [ECDSA](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm) package for the EOSIO blockchain.

# Support

We support all browsers that can handle [WebAssembly](https://caniuse.com/wasm).

- Node.js `^12.20.1 || >= 13.2`
- Browser `defaults, no IE 11`

**NB** For testing purposes you will need [webcrypto](https://nodejs.org/api/webcrypto.html#webcrypto_class_subtlecrypto) a Node.js v15 feature.

# API

- [function generate_eos_signature](#function-generate_eos_signature)
- [function new_eos_keys](#function-new_eos_keys)
- [function public_key_from_private](#function-public_key_from_private)
- [type KeyPair](#type-keypair)

## function generate_eos_signature

Generate an EOS encoded signature.

| Parameter | Type | Description |
| :-- | :-- | :-- |
| `arg` | object | Argument. |
| `arg.hex` | string \| Uint8Array | Data to sign. |
| `arg.wif_private_key` | string | An EOS wallet import format private key. |

**Returns:** string — EOS encoded signature.

### Examples

_Ways to `import`._

> ```js
> import { generate_eos_signature } from 'eos-ecc'
> ```

_Ways to `require`._

> ```js
> const { generate_eos_signature } = require('eos-ecc')
> ```

_Usage of `generate_eos_signature`._

> ```js
> import crypto from 'crypto'
>
> generate_eos_signature({
>   data: hello,
>   wif_private_key: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'
> }).then(console.log)
> ```
>
> The logged output will be SIG_K1_JxMN(…)NJ.

---

## function new_eos_keys

Generate a new cryptographically random EOS key pair.

| Parameter | Type | Description |
| :-- | :-- | :-- |
| `seed` | Uint8Array? | A 32 byte array to seed a private key (seed < curve order n). |

**Returns:** [KeyPair](#type-keypair) — Key pair.

### Examples

_Ways to `import`._

> ```js
> import { new_eos_keys } from 'eos-ecc'
> ```
>
> ```js
> import new_eos_keys from 'eos-ecc/public/new_eos_keys.js'
> ```

_Ways to `require`._

> ```js
> const { new_eos_keys } = require('eos-ecc')
> ```
>
> ```js
> const new_eos_keys = require('eos-ecc/public/new_eos_keys.js')
> ```

_Usage `new_eos_keys`._

> ```js
> new_eos_keys().then(console.log)
> ```
>
> The logged output will be an object containing EOS wif public & private keys.

---

## function public_key_from_private

Convert an EOS WIF private key to a WIF public key.

| Parameter         | Type   | Description                   |
| :---------------- | :----- | :---------------------------- |
| `wif_private_key` | string | EOS wallet import format key. |

**Returns:** string — EOS wallet import format public key.

### Examples

_Ways to `import`._

> ```js
> import { public_key_from_private } from 'eos-ecc'
> ```
>
> ```js
> import public_key_from_private from 'eos-ecc/public/public_key_from_private.js'
> ```

_Ways to `require`._

> ```js
> const { public_key_from_private } = require('eos-ecc')
> ```
>
> ```js
> const public_key_from_private = require('eos-ecc/public/public_key_from_private.js')
> ```

_Usage `public_key_from_private`._

> ```js
> public_key_from_private(
>   '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'
> ).then(console.log)
> ```
>
> The logged output will be EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV.

---

## type KeyPair

An EOS wallet import formatted (WIF) public & private key pair.

| Property      | Type   | Description          |
| :------------ | :----- | :------------------- |
| `public_key`  | string | EOS WIF public key.  |
| `private_key` | string | EOS WIF private key. |
