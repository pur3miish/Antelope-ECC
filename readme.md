![antelope ecc logo](static/antelope-ecc.svg)

# Antelope ECC

[![NPM Package](https://img.shields.io/npm/v/antelope-ecc.svg)](https://www.npmjs.org/package/antelope-ecc) [![CI status](https://github.com/pur3miish/antelope-ecc/workflows/CI/badge.svg)](https://github.com/pur3miish/antelope-ecc/actions) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/pur3miish/antelope-ecc/blob/main/LICENSE)

A lightweight [universal](https://en.wikipedia.org/wiki/Isomorphic_JavaScript) JavaScript digital-signature and cryptographic-key utility package for Antelope-based blockchains.

- Creates recoverable Antelope `SIG_K1_` signatures from 32-byte transaction digests.
- Uses the standards-focused [`isomorphic-secp256k1-js`](https://github.com/pur3miish/isomorphic-secp256k1-js) implementation for secp256k1, ECDSA, and RFC 6979 operations.
- Applies Antelope's historical compact-canonical signing policy, inherited from the Graphene/BitShares `fc` library, only inside this package.
- Creates, validates, converts, and recovers Antelope `PVT_K1_`, `PUB_K1_`, and legacy key representations.

## Requirements

Supported runtime environments:

- [Node.js](https://nodejs.org) versions `>=20.19.0`.
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
import { sign } from "antelope-ecc";
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

### Antelope K1 signing compatibility

The underlying ECDSA signer first creates a deterministic, low-S secp256k1 signature using RFC 6979. Antelope additionally retains a historical signature policy inherited from the Graphene/BitShares [`fc` cryptography library](https://github.com/EOSIO/fc/blob/master/src/crypto/elliptic_common.cpp): the positive DER integer representation of each fixed-width `r` and `s` component must be exactly 32 bytes.

If the first standards-based signature does not have that representation, this package deterministically derives another nonce and signs the original digest again until the Antelope policy is satisfied. This retry rule is implemented only by `antelope-ecc`; it is not an ECDSA, secp256k1, or RFC 6979 security requirement, and it is not exposed by `isomorphic-secp256k1-js`.

The policy exists for compatibility with Antelope/EOSIO signing software and historical signature vectors. Low-S normalization is the separate protection against the usual ECDSA `(r, s)` / `(r, n - s)` malleability.

Applications do not enable this mode or pass a compatibility option. The exported [`sign`](./src/sign.ts) and [`sign_packed_txn`](./src/sign_packed_txn.ts) functions always apply the policy because they return Antelope signatures. Applications that need only the first standards-based RFC 6979 signature should use [`isomorphic-secp256k1-js`](https://github.com/pur3miish/isomorphic-secp256k1-js) directly.

#### Signing sequence

1. Decode and validate the Antelope `PVT_K1_` private key and require an exact 32-byte message digest.
2. Generate the first recoverable secp256k1 ECDSA signature using RFC 6979 deterministic nonce derivation and low-S normalization.
3. Test whether the fixed-width `r` and `s` values satisfy the inherited Graphene/BitShares 32-byte positive-DER-component policy.
4. If necessary, perform the deterministic compatibility retry internally while continuing to sign the original message digest.
5. Verify the resulting signature before serializing the recovery header, `r`, and `s` into the 65-byte Antelope compact representation.
6. Add the `K1` RIPEMD-160 checksum and Base58-encode the result as `SIG_K1_…`.

#### Package boundary

- `isomorphic-secp256k1-js` contains the reusable secp256k1 arithmetic, hashing, RFC 6979 signer, verification, recovery, validation, and low-S handling. It does not expose the Graphene/BitShares retry policy.
- `antelope-ecc` contains the Antelope key formats, `SIG_K1_` encoding, recovery-header conversion, checksum, and inherited Graphene/BitShares compatibility retry.
- The compatibility signer is an internal module and is not listed in the package `exports` map. The supported public entry points remain `sign` and `sign_packed_txn`.

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
  crypto.createHash("sha256").update(Buffer.from("ff", "hex")).digest(),
); // Data signed with private key

recover_public_key({
  signature: "SIG_K1_…",
  hash,
}).then(console.log);
```

> The logged output will contain the public key “PUB_K1…” used to sign the hash.

## Exports

ECMAScript module deep exports are available through the [`package.json`](./package.json) [`exports`](https://nodejs.org/api/packages.html#exports) field. These links open the TypeScript source retained in Git; npm consumers import the corresponding compiled `.js` path:

- [`antelope-ecc/keys/legacy_from_private_key.js`](./src/keys/legacy_from_private_key.ts)
- [`antelope-ecc/keys/legacy_from_public_key.js`](./src/keys/legacy_from_public_key.ts)
- [`antelope-ecc/keys/legacy_to_private_key.js`](./src/keys/legacy_to_private_key.ts)
- [`antelope-ecc/keys/legacy_to_public_key.js`](./src/keys/legacy_to_public_key.ts)
- [`antelope-ecc/keys/private_key_from_wif.js`](./src/keys/private_key_from_wif.ts)
- [`antelope-ecc/keys/private_key_to_wif.js`](./src/keys/private_key_to_wif.ts)
- [`antelope-ecc/keys/public_key_from_private_wif.js`](./src/keys/public_key_from_private_wif.ts)
- [`antelope-ecc/keys/public_key_from_wif.js`](./src/keys/public_key_from_wif.ts)
- [`antelope-ecc/keys/public_key_to_wif.js`](./src/keys/public_key_to_wif.ts)
- [`antelope-ecc/keys/validate_private_key.js`](./src/keys/validate_private_key.ts)
- [`antelope-ecc/keys/validate_public_key.js`](./src/keys/validate_public_key.ts)
- [`antelope-ecc/mnemonic_create.js`](./src/mnemonic_create.ts)
- [`antelope-ecc/mnemonic_recover.js`](./src/mnemonic_recover.ts)
- [`antelope-ecc/new_keys.js`](./src/new_keys.ts)
- [`antelope-ecc/recover_public_key.js`](./src/recover_public_key.ts)
- [`antelope-ecc/sign_packed_txn.js`](./src/sign_packed_txn.ts)
- [`antelope-ecc/sign.js`](./src/sign.ts)

## Development and publishing

The Git repository keeps the TypeScript source under [`src/`](./src/) and does not keep compiler-generated `.js` or `.d.ts` files. The npm package still contains the compiled JavaScript and TypeScript declarations required by consumers.

- `npm run clean` removes only the explicit compiler-output allowlist in [`scripts/clean.mjs`](./scripts/clean.mjs).
- `npm run build` cleans stale outputs and compiles `src/**/*.ts` into the package paths declared by `package.json`.
- `npm pack` and `npm publish` run the tests and build through `prepack`, include the generated files in the tarball, and then remove local generated files through `postpack`.
- Generated root files and the generated root `internal/` and `keys/` directories are ignored by Git. Their TypeScript sources remain under `src/`.

Run `npm pack --dry-run` to inspect the files npm will include without publishing the package.
