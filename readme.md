![eos ecc logo](https://raw.githubusercontent.com/pur3miish/eos-ecc/main/static/eos-ecc.svg)

# EOS-ECC

[![NPM Package](https://img.shields.io/npm/v/eos-ecc.svg)](https://www.npmjs.org/package/eos-ecc) [![CI status](https://github.com/pur3miish/eos-ecc/workflows/CI/badge.svg)](https://github.com/pur3miish/eos-ecc/actions) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/pur3miish/eos-ecc/blob/main/LICENSE)

A lightweight (\~6 KB) [universal](https://en.wikipedia.org/wiki/Isomorphic_JavaScript) JavaScript Antelope and EOSIO digital signature and cryptokey utilty package.

## Features

- Public & private key creation
- Digital signatures
- Signature verification
- Legacy support

# Setup

```shell
npm i eos-ecc
```

# Support

We support all browsers that can handle [WebAssembly](https://caniuse.com/wasm).

- Node.js `>= 16`
- Browser `defaults, no IE 11`

# API

- [function legacy_to_public_key](#function-legacy_to_public_key)
- [function legacy_to_public_key](#function-legacy_to_public_key-1)
- [function new_eos_keys](#function-new_eos_keys)
- [function new_keys](#function-new_keys)
- [function public_key_from_private](#function-public_key_from_private)
- [function recover_public_key](#function-recover_public_key)
- [function sign_packed_txn](#function-sign_packed_txn)
- [function sign_txn](#function-sign_txn)
- [function validate_private_key](#function-validate_private_key)
- [function validate_public_key](#function-validate_public_key)
- [type KeyPair](#type-keypair)
- [type validation_obj](#type-validation_obj)

## function legacy_to_public_key

Converts an EOSIO legacy key to PUB_K1 format

| Parameter | Type   | Description       |
| :-------- | :----- | :---------------- |
| `legacy`  | string | legacy public key |

**Returns:** string — public key PUB_K1 format

### Examples

_Ways to `import`._

> ```js
> import { legacy_to_public_key } from "eos-ecc";
> ```

_Ways to `require`._

> ```js
> const { legacy_to_public_key } = require("eos-ecc");
> ```

_Usage `legacy_to_public_key`._

> ```js
> legacy_to_public_key(
>   "EOS53jowyaGC1WrYJefSHTTmGvZcySUFkEpmCDmEd8txunDChput7"
> ).then(console.log);
> ```
>
> The logged output was PUB_K1_53jowyaGC1WrYJefSHTTmGvZcySUFkEpmCDmEd8txunDCqCCVR.

---

## function legacy_to_public_key

Converts an Antelope/EOSIO legacy priate key to PVT_K1 format

| Parameter | Type   | Description        |
| :-------- | :----- | :----------------- |
| `legacy`  | string | legacy private key |

**Returns:** string — public key PVT_K1 format

### Examples

_Usage `legacy_to_public_key`._

> ```js
> import { legacy_to_private_key } from "eos-ecc/legacy_to_private_key.mjs";
> legacy_to_public_key(
>   "5KML6yCUABWYxuEexgMZPJA9641SptvHdB5Gm5KZW8rFeGf5uak"
> ).then(console.log);
> ```
>
> The logged output was PVT_K1_2Y3XHkP5iwZhtrNvUufJFR1sTBXcm4CuN1VXuGpGFzcUa8vu23.

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
> import { new_eos_keys } from "eos-ecc";
> ```

_Ways to `require`._

> ```js
> const { new_eos_keys } = require("eos-ecc");
> ```

_Usage `new_eos_keys`._

> ```js
> new_eos_keys().then(console.log);
> ```
>
> The logged output will be an object containing EOS wif public & private keys.

---

## function new_keys

Generate a new pair of crypto keys for an antelope or EOSIO based blockchain.

| Parameter | Type | Description |
| :-- | :-- | :-- |
| `seed` | Uint8Array? | A 32 byte array to seed a private key (seed < curve order n). |

**Returns:** [KeyPair](#type-keypair) — Key pair.

### Examples

_Ways to `import`._

> ```js
> import { new_keys } from "eos-ecc";
> ```

_Ways to `require`._

> ```js
> const { new_keys } = require("eos-ecc");
> ```

_Usage `new_eos_keys`._

> ```js
> new_keys().then(console.log);
> ```
>
> The logged output will be an object containing PUB_K1 and PVT_K1 wif keys.

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
> import { public_key_from_private } from "eos-ecc";
> ```

_Ways to `require`._

> ```js
> const { public_key_from_private } = require("eos-ecc");
> ```

_Usage `public_key_from_private`._

> ```js
> public_key_from_private(
>   "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"
> ).then(console.log);
> ```
>
> The logged output will be EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV.

---

## function recover_public_key

Recovers EOS Wallet import format (WIF) public key from signature.

| Parameter       | Type    | Description                                 |
| :-------------- | :------ | :------------------------------------------ |
| `Arg`           | obeject | Argument                                    |
| `Arg.signature` | string  | EOS signature.                              |
| `Arg.hex`       | string  | Hex data that was used to create signature. |
| `Arg.legacy`    | bool?   | Returns the key in the legacy format.       |

**Returns:** string — WIF Public key.

### Examples

_Ways to `import`._

> ```js
> import { recover_public_key } from "eos-ecc";
> ```

_Ways to `require`._

> ```js
> const { recover_public_key } = require("eos-ecc");
> ```

_Usage `public_key_from_private`._

> ```js
> recover_public_key({
>   signature: "SIG_K1_…",
>   data: "ff",
> }).then(console.log);
> ```
>
> The logged output will be EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV.

---

## function sign_packed_txn

Generate an EOSIO signature for a packed transaction object.

| Parameter | Type | Description |
| :-- | :-- | :-- |
| `PackedTxn` | object | Packed EOSIO transaction object. |
| `PackedTxn.chain_id` | string | ID specifiying what chain we are operating on. |
| `PackedTxn.transaction_header` | string | Serialised transaction header. |
| `PackedTxn.transaction_body` | string | Serialised transaction body. |
| `PackedTxn.wif_private_key` | string | EOSIO private key (wallet import format). |

**Returns:** string — Signature

### Examples

_Ways to `import`._

> ```js
> import { sign_packed_txn } from "eos-ecc";
> ```

_Ways to `require`._

> ```js
> const { sign_packed_txn } = require("eos-ecc");
> ```

_Usage `sign_packed_txn`._

> ```js
> sign_packed_txn({
>   chain_id: "2a02a0053…",
>   transaction_header: "fa123232…",
>   transaction_body: "fa45ffa2…",
>   wif_private_key: "5f…",
> });
> ```
>
> The logged output was SIG_K1\_….

---

## function sign_txn

Generate an EOS encoded signature.

| Parameter | Type | Description |
| :-- | :-- | :-- |
| `arg` | object | Argument. |
| `arg.hex` | string \| Uint8Array | Data to sign. |
| `arg.wif_private_key` | string | An Antelope or EOSIO private key. |

**Returns:** string — Signature.

### Examples

_Usage of `sign_txn`._

> ```js
> import sign_txn from "eos-ecc/sign_txn.mjs";
>
> sign_txn({
>   hex: FDFDFDFD,
>   wif_private_key: "PUB_K1_43…",
> }).then(console.log);
> ```
>
> The logged output will be SIG_K1\_…

---

## function validate_private_key

Validate an EOS private key.

| Parameter         | Type   | Description        |
| :---------------- | :----- | :----------------- |
| `wif_private_key` | string | base58 private key |

**Returns:** [validation_obj](#type-validation_obj) — validation message.

---

## function validate_public_key

Validate EOS public key.

| Parameter        | Type   | Description                          |
| :--------------- | :----- | :----------------------------------- |
| `wif_public_key` | string | wallet import format EOS public key. |

**Returns:** [validation_obj](#type-validation_obj) — validation object

---

## type KeyPair

An Antelope/EOSIO wallet import formatted (WIF) public & private key pair.

| Property      | Type   | Description      |
| :------------ | :----- | :--------------- |
| `public_key`  | string | WIF public key.  |
| `private_key` | string | WIF private key. |

---

## type validation_obj

Validates an EOS private key.

| Property  | Type    | Description                  |
| :-------- | :------ | :--------------------------- |
| `valid`   | boolean | Determins if the private key |
| `message` | string? | Description of invalidation. |
