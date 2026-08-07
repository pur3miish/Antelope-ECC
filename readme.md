![Antelope ECC logo](static/antelope-ecc.svg)

# Antelope ECC

[![npm](https://img.shields.io/npm/v/antelope-ecc.svg)](https://www.npmjs.com/package/antelope-ecc) [![CI](https://github.com/pur3miish/Antelope-ECC/.github/workflows/node.js.yml/badge.svg)](https://github.com/pur3miish/Antelope-ECC/actions) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) [![Node.js](https://img.shields.io/badge/Node.js-%3E%3D22-339933?logo=node.js&logoColor=white)](https://nodejs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-ready-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![ESM](https://img.shields.io/badge/ESM-native-blue)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

A lightweight JavaScript and TypeScript library for Antelope-compatible secp256k1 cryptography, key management, and transaction signing.

`antelope-ecc` provides utilities for:

- generating Antelope K1 key pairs;
- creating `SIG_K1_` signatures;
- signing packed Antelope transactions;
- converting and validating `PVT_K1_` and `PUB_K1_` keys;
- converting legacy EOSIO key formats;
- recovering public keys from signatures;
- creating and recovering mnemonic-based keys.

The package is native ESM, side-effect free, tree-shakeable, and designed for both modern browsers and Node.js.

## Requirements

- Node.js `>=22`
- Native ECMAScript modules
- Modern browsers with the Web Crypto API

This package does not provide a CommonJS `require()` entry point.

## Installation

```sh
npm install antelope-ecc
```

## Importing

### Named imports

The package root exposes named exports:

```js
import {
  new_keys,
  sign,
  sign_packed_txn,
  validate_private_key,
  validate_public_key,
} from "antelope-ecc";
```

There is no default package export.

### Deep imports

Individual modules can also be imported directly:

```js
import sign from "antelope-ecc/sign.js";
import new_keys from "antelope-ecc/new_keys.js";
import validate_private_key from "antelope-ecc/keys/validate_private_key.js";
```

Deep imports allow consumers to explicitly depend on individual modules.

The package is also marked:

```json
{
  "sideEffects": false
}
```

so modern bundlers can tree-shake unused modules when using named root imports.

## Generate a key pair

```js
import { new_keys } from "antelope-ecc";

const keys = new_keys();

console.log(keys.public_key);
console.log(keys.private_key);
```

The result contains an Antelope K1 key pair:

```js
{
  public_key: "PUB_K1_...",
  private_key: "PVT_K1_..."
}
```

Secure random key material is generated using the standard Web Crypto API.

An existing 32-byte private key can also be supplied:

```js
import { new_keys } from "antelope-ecc";

const privateKey = new Uint8Array(32);

// Populate privateKey with valid secure key material.

const keys = new_keys(privateKey);
```

Do not construct cryptographic private keys from predictable values in production.

## Sign a digest

`sign()` signs an exact 32-byte message digest.

```js
import { sign } from "antelope-ecc";

const message = new TextEncoder().encode("Hello Antelope");

const digest = new Uint8Array(
  await globalThis.crypto.subtle.digest("SHA-256", message),
);

const signature = await sign({
  hash: digest,
  wif_private_key: "PVT_K1_...",
});

console.log(signature);
```

The returned value is an Antelope signature:

```text
SIG_K1_...
```

A hexadecimal 32-byte digest can also be supplied:

```js
const signature = await sign({
  hash: "0123456789abcdef...",
  wif_private_key: "PVT_K1_...",
});
```

`sign()` expects a digest, not an arbitrary un-hashed message.

## Sign a packed transaction

`sign_packed_txn()` constructs the Antelope signing digest from the chain ID, serialized transaction data, and context-free-data hash before producing a `SIG_K1_` signature.

```js
import { sign_packed_txn } from "antelope-ecc";

const signature = await sign_packed_txn({
  chain_id: "...",
  transaction_header: "...",
  transaction_body: "...",
  wif_private_key: "PVT_K1_...",
});

console.log(signature);
```

When no context-free data is present, `context_free_data_hash` defaults to the standard 32-byte zero value.

A custom context_free_data_hash can be provided when required:

```js
const signature = await sign_packed_txn({
  chain_id: "...",
  transaction_header: "...",
  transaction_body: "...",
  context_free_data_hash: "...",
  wif_private_key: "PVT_K1_...",
});
```

## Key utilities

The package exposes the following modern K1 key utilities.

### Private keys

```js
import {
  private_key_from_wif,
  private_key_to_wif,
  validate_private_key,
} from "antelope-ecc";
```

#### `private_key_to_wif()`

Converts a 32-byte private key into an Antelope `PVT_K1_` key.

```js
const privateKey = new Uint8Array(32);

const encoded = private_key_to_wif(privateKey);
```

#### `private_key_from_wif()`

Converts an Antelope private-key string into its binary representation.

```js
const privateKey = private_key_from_wif("PVT_K1_...");
```

#### `validate_private_key()`

Validates an Antelope private key and checksum. `PVT_K1_` keys are additionally validated as secp256k1 private scalars.

```js
const valid = validate_private_key("PVT_K1_...");
```

### Public keys

```js
import {
  public_key_from_private_wif,
  public_key_from_wif,
  public_key_to_wif,
  validate_public_key,
} from "antelope-ecc";
```

These utilities convert between binary public-key data and Antelope `PUB_K1_` representations, derive public keys from private keys, and validate public-key checksums.

## Legacy EOSIO key conversion

Legacy EOSIO key formats are supported through explicit conversion utilities:

```js
import {
  legacy_from_private_key,
  legacy_from_public_key,
  legacy_to_private_key,
  legacy_to_public_key,
} from "antelope-ecc";
```

These functions are intended for interoperability with older EOSIO key representations.

New applications should generally prefer modern:

```text
PVT_K1_...
PUB_K1_...
SIG_K1_...
```

formats.

## Public API

The package root exports:

### Signing

```text
sign
sign_packed_txn
recover_public_key
```

### Key generation

```text
new_keys
```

### Modern K1 keys

```text
private_key_from_wif
private_key_to_wif
public_key_from_private_wif
public_key_from_wif
public_key_to_wif
validate_private_key
validate_public_key
```

### Legacy key conversion

```text
legacy_from_private_key
legacy_from_public_key
legacy_to_private_key
legacy_to_public_key
```

### Mnemonics

```text
mnemonic_create
mnemonic_recover
```

## Antelope K1 signing compatibility

Antelope K1 signatures retain a historical compact-canonical signature policy inherited from the Graphene/BitShares `fc` cryptography implementation.

The underlying secp256k1 operation produces deterministic, low-S ECDSA signatures. Antelope additionally requires the fixed-width `r` and `s` components to satisfy its historical compact representation rules.

`antelope-ecc` applies this compatibility policy automatically when producing Antelope signatures.

Consumers do not need to configure or enable it.

This behavior exists specifically for Antelope protocol compatibility and should not be interpreted as a general ECDSA security requirement.

## Cryptographic dependencies

The package separates generic cryptographic primitives from Antelope-specific encoding and compatibility behavior.

Core functionality uses:

- [`isomorphic-secp256k1-js`](https://github.com/pur3miish/isomorphic-secp256k1-js) for secp256k1 operations;
- [`ripemd160-js`](https://github.com/pur3miish/ripemd160-js) for RIPEMD-160 checksums;
- [`base58-js`](https://github.com/pur3miish/base58-js) for Base58 encoding and decoding;

Antelope-specific compact-canonical signing behavior remains inside `antelope-ecc` rather than the generic secp256k1 implementation.

## Browser support

`antelope-ecc` is designed to operate without Node-specific cryptographic APIs in application code.

Cryptographically secure random bytes use:

```js
globalThis.crypto.getRandomValues(...)
```

which is provided by Node.js 22+ and modern browsers.

This avoids environment-specific `require("crypto")` or conditional Node.js crypto imports.

## TypeScript

TypeScript declarations are included with the published package.

```ts
import { sign } from "antelope-ecc";
```

No separate `@types/antelope-ecc` package is required.

## Package structure

Source code is maintained as TypeScript under:

```text
src/
```

Published JavaScript and TypeScript declarations are generated into:

```text
dist/
```

Only the compiled distribution is included in the npm package.

The package exposes both the root API and explicitly supported deep-import paths through the `exports` map.

## Development

Clone the repository and install dependencies:

```sh
npm install
```

Run the complete test suite:

```sh
npm test
```

This performs linting, formatting checks, TypeScript compilation, and unit tests.

### Formatting

Check formatting:

```sh
npm run prettier
```

Format the repository:

```sh
npm run prettier:fix
```

### ESLint

Check:

```sh
npm run eslint
```

Automatically fix supported issues:

```sh
npm run eslint:fix
```

### Build

```sh
npm run build
```

The generated package is written to:

```text
dist/
```

### Package smoke test

```sh
npm run smoke
```

The smoke test builds and tests the project, creates the actual npm tarball, installs that tarball into an isolated consumer project, and verifies that the published package can be imported and executed.

Before publishing, npm automatically runs the package's release checks.

## Security

Private keys are sensitive cryptographic material.

Applications using this library should:

- generate private keys only from cryptographically secure randomness;
- avoid logging private keys or mnemonics;
- avoid transmitting private keys to remote services;
- avoid storing unencrypted private keys;
- verify transaction contents before signing;
- treat mnemonic phrases with the same sensitivity as private keys.

`antelope-ecc` provides cryptographic primitives and Antelope-compatible serialization utilities. Secure key storage and application-level authorization remain the responsibility of the consuming application.

If you believe you have discovered a security issue, avoid publishing private-key material or exploit details in a public issue.

## Version 6

Version 6 modernizes the package architecture and runtime requirements.

Notable changes include:

- Node.js 22 or later;
- native ESM package structure;
- TypeScript source and generated declarations;
- compiled npm artifacts under `dist/`;
- named root exports;
- explicit supported deep imports;
- Web Crypto based random-byte generation;
- `ripemd160-js` v4;
- modern ESLint and Prettier tooling;
- npm package smoke testing.

Applications upgrading from older versions should review the changelog for breaking API and runtime changes.

## License

[MIT](LICENSE)
