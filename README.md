# eos-secp256k1

## Work in progress 🚧 🏗️ 👷

# API

## Table of contents

- [function generate_eos_signature](#function-generate_eos_signature)
- [function new_eos_keys](#function-new_eos_keys)
- [function public_key_from_private](#function-public_key_from_private)
- [type KeyPair](#type-keypair)

## function generate_eos_signature

Generate an EOS encoded signature.

| Parameter             | Type   | Description                              |
| :-------------------- | :----- | :--------------------------------------- |
| `arg`                 | object | Argument.                                |
| `arg.hex`             | string | Message digest sha256 to sign.           |
| `arg.wif_private_key` | string | An EOS wallet import format private key. |

**Returns:** string — EOS encoded signature.

### Examples

_Ways to `import`._

> ```js
> import generate_eos_signature from 'eos-secp256k1/public/generate_eos_signature'
> ```
>
> ```js
> import { generate_eos_signature } from 'eos-secp256k1'
> ```

_Ways to `require`._

> ```js
> const generate_eos_signature = require('eos-secp256k1/public/generate_eos_signature')
> ```
>
> ```js
> const { generate_eos_signature } = require('eos-secp256k1')
> ```

_Usage of `generate_eos_signature`_

> ```js
> import crypto from 'crypto'
>
> const message = 'hello'
> const hex = new Uint8Array(
>   crypto.createHash('sha256').update(message).digest()
> )
> generate_eos_signature({
>   hex,
>   wif_private_key: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'
> }).then(console.log)
> ```
>
> The logged output will be SIG_K1_JxMNpqjtD1bdwUASSncg3DNE3Vy9GWMjFUhFQ6QqwN8Dypfhsk7EN47cJ8BD43iXeNBSQ5u8A1Z4TYzeNeDnyvCoNWyyNJ.

---

## function new_eos_keys

Generate a new cryptographically random EOS key pair.

**Returns:** [KeyPair](#type-keypair) — Key pair.

### Examples

_Ways to `import`._

> ```js
> import { new_eos_keys } from 'eos-secp256k1'
> ```
>
> ```js
> import new_eos_keys from 'eos-secp256k1/public/secp256k1'
> ```

_Ways to `require`._

> ```js
> const { new_eos_keys } = require('eos-secp256k1')
> ```
>
> ```js
> const { new_eos_keys } = require('eos-secp256k1/public/secp256k1')
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
> import public_key_from_private from 'eos-secp256k1/public/public_key_from_private'
> ```
>
> ```js
> import { public_key_from_private } from 'eos-secp256k1'
> ```

_Ways to `require`._

> ```js
> const { public_key_from_private } = require('eos-secp256k1')
> ```
>
> ```js
> const public_key_from_private = require('eos-secp256k1/public/public_key_from_private')
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
