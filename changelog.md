# Antelope ECC Changelog

## 6.0.0 - 2026-08-07

### Breaking Changes

- Updated the minimum supported Node.js version to **Node.js 22**.
- Migrated `ripemd160-js` from v3 to **v4** and adopted its synchronous `Uint8Array -> Uint8Array` API.
- Updated `isomorphic-secp256k1-js` to **v6**.
- Standardized the package as **native ESM**.
- Removed legacy/default package export behavior. Consumers should use named imports or documented deep imports.
- Package build artifacts are now generated under `dist/` rather than alongside TypeScript source files.
- Renamed the `sign_packed_txn()` `extension` argument to `context_free_data_hash` to correctly describe its role in the Antelope transaction signing preimage.
- `new_keys()` is now synchronous and returns the generated key pair directly instead of `Promise<{ public_key, private_key }>`.
- `recover_public_key()` is now synchronous and returns the recovered `PUB_K1_` key directly instead of `Promise<string>`.
- Public-key derivation and RIPEMD-backed key conversion and validation operations no longer introduce unnecessary Promise wrappers.
- `mnemonic_recover()` is now asynchronous because BIP39 recovery verifies the mnemonic checksum using SHA-256.
- Key decoding and validation are stricter and may now reject malformed, checksum-valid, or structurally invalid key material that older versions accepted.
- Signing now requires an exact 32-byte digest. Malformed, partial, or incorrectly sized hexadecimal input is rejected.
- Existing callers using `await` with newly synchronous APIs remain compatible because JavaScript permits awaiting non-Promise values, but callers using `.then()`, `.catch()`, `Promise.all()`, or explicit `Promise<T>` typings must update their code.

### Added

- Added a side-effect-free root ESM entry point exposing the supported API through named exports.
- Added explicit supported deep-import paths.
- Added TypeScript declaration generation for the complete published API.
- Added npm package smoke testing against the actual tarball produced by `npm pack`.
- Added a committed npm lockfile for reproducible installations and CI.
- Added modern ESLint flat configuration.
- Added automated lint-fix and formatting scripts.
- Added CI coverage across Node.js **22, 24, and 26** on Linux and macOS.
- Added strict secp256k1 scalar validation for `PVT_K1_` private keys.
- Added strict compressed SEC 1 point validation for `PUB_K1_` public keys.
- Added checksum validation when decoding K1 private and public keys.
- Added checksum validation when decoding and recovering `SIG_K1_` signatures.
- Added strict 32-byte digest validation for signing and public-key recovery.
- Added strict hexadecimal validation for packed transaction signing inputs.
- Added validation that `chain_id` and `context_free_data_hash` are exactly 32 bytes.
- Added bounded rejection sampling when generating random secp256k1 private keys.
- Added BIP39 checksum validation during mnemonic recovery.
- Added validation for standard BIP39 entropy sizes of 128, 160, 192, 224, and 256 bits.
- Added validation for standard BIP39 mnemonic lengths of 12, 15, 18, 21, and 24 words.
- Added BIP39 known-vector and invalid-checksum tests.
- Added tests for checksum-valid but cryptographically invalid secp256k1 keys.
- Added smoke-test assertions ensuring synchronous public APIs do not accidentally regress back to returning Promises.

### Changed

- RIPEMD-160 imports now use the v4 package API:

  ```js
  import { ripemd160 } from "ripemd160-js";
  ```

- Updated Antelope private-key, public-key, and signature checksum operations to use synchronous RIPEMD-160.

- Removed unnecessary asynchronous RIPEMD-160 checksum handling.

- Updated K1 key encoding and decoding so cryptographic validity is checked in addition to Antelope Base58 checksum validity.

- `private_key_from_wif()` now validates the `PVT_K1_` checksum and secp256k1 scalar before returning the raw private key.

- `public_key_from_wif()` now validates the `PUB_K1_` checksum and compressed secp256k1 point before returning the raw public key.

- `private_key_to_wif()` now rejects invalid secp256k1 private scalars before encoding them.

- `public_key_to_wif()` now requires a valid compressed 33-byte secp256k1 public key before encoding it.

- `public_key_from_private_wif()` now uses the validated private-key decoding path before deriving the public key.

- `sign()` now validates the supplied `PVT_K1_` private key before signing.

- `sign()` now accepts only:

  - a 32-byte `Uint8Array`; or
  - a hexadecimal string containing exactly 64 hexadecimal characters.

- `recover_public_key()` now validates the full `SIG_K1_` checksum before attempting secp256k1 public-key recovery.

- `recover_public_key()` now requires an exact 32-byte digest.

- `sign_packed_txn()` now validates the complete signing preimage rather than extracting hexadecimal byte pairs from partially valid input.

- `transaction_header` and `transaction_body` must now contain complete, even-length hexadecimal byte strings.

- `chain_id` must contain exactly 32 bytes of hexadecimal data.

- `context_free_data_hash` must contain exactly 32 bytes of hexadecimal data.

- `context_free_data_hash` defaults to 32 zero bytes when no context-free data is present.

- Clarified that `context_free_data_hash` is unrelated to Antelope `transaction_extensions`, which are serialized as part of the transaction itself.

- Replaced environment-specific Node.js random-byte handling with the standard Web Crypto API:

  ```js
  globalThis.crypto.getRandomValues(...)
  ```

- Removed the previous `require("crypto")` and dynamic `import("crypto")` random-byte fallback logic.

- Random-byte generation now uses the same standards-based API in Node.js and modern browsers.

- Random-byte generation supports requests larger than the Web Crypto 65,536-byte per-call limit by filling the result in chunks.

- `new_keys()` now retries random candidates that are outside the valid secp256k1 private-scalar range.

- BIP39 mnemonic creation now validates supported entropy sizes.

- BIP39 mnemonic recovery now verifies checksum bits before returning entropy.

- Retained the historical Antelope/Graphene compact-canonical signature compatibility policy inside `antelope-ecc`.

- Kept generic standards-focused secp256k1 behavior isolated inside `isomorphic-secp256k1-js`.

- Updated TypeScript compilation to use `NodeNext` module and module-resolution semantics.

- TypeScript source now lives exclusively under `src/`.

- Compiled JavaScript and `.d.ts` files are generated exclusively under `dist/`.

- npm now publishes only the compiled `dist/` distribution.

- Updated README documentation for the v6 API, synchronous and asynchronous API boundaries, ESM usage, deep imports, Node.js requirements, Web Crypto support, package structure, signing semantics, and security considerations.

### Async API Boundary

The following APIs remain asynchronous because they perform operations that genuinely require asynchronous Web Crypto primitives:

- `sign()` — RFC 6979 signing uses asynchronous HMAC-SHA-256.
- `sign_packed_txn()` — computes SHA-256 and then signs the resulting digest.
- `legacy_from_private_key()` — performs SHA-256 checksum operations.
- `mnemonic_create()` — computes the BIP39 SHA-256 checksum.
- `mnemonic_recover()` — verifies the BIP39 SHA-256 checksum.

Pure key encoding, decoding, validation, public-key derivation, secure random-byte generation, and public-key recovery operations are synchronous.

### Tooling

- Updated TypeScript to v6.
- Migrated from legacy `.eslintrc` configuration to ESLint flat config.
- Updated ESLint to v10.
- Updated Prettier to v3.
- Updated `typescript-eslint`.
- Updated `eslint-plugin-simple-import-sort`.
- Updated test and development dependencies.
- CI now uses `npm ci`.
- CI now runs the complete npm package smoke test.
- Simplified build cleanup so only generated `dist/` output is removed.

### Package Structure

Source files are maintained under:

```text
src/
├── index.ts
├── sign.ts
├── sign_packed_txn.ts
├── recover_public_key.ts
├── new_keys.ts
├── mnemonic_create.ts
├── mnemonic_recover.ts
├── keys/
└── internal/
```

TypeScript generates the npm distribution under:

```text
dist/
├── index.js
├── index.d.ts
├── sign.js
├── sign.d.ts
├── sign_packed_txn.js
├── sign_packed_txn.d.ts
├── recover_public_key.js
├── recover_public_key.d.ts
├── new_keys.js
├── new_keys.d.ts
├── mnemonic_create.js
├── mnemonic_create.d.ts
├── mnemonic_recover.js
├── mnemonic_recover.d.ts
├── keys/
└── internal/
```

Generated JavaScript is no longer stored alongside TypeScript source files.

### Dependencies

Runtime dependencies are now:

- `base58-js` v3
- `isomorphic-secp256k1-js` v6
- `ripemd160-js` v4

### Removed

- Removed support for Node.js versions below 22.
- Removed support for `ripemd160-js` v3.
- Removed the legacy `ripemd160-js/ripemd160.js` deep import.
- Removed the unused `eosio-wasm-js` runtime dependency.
- Removed Node-specific `require("crypto")` random-byte handling.
- Removed dynamic Node `crypto` import fallback logic.
- Removed legacy ESLint `.eslintrc` configuration.
- Removed generated JavaScript from the TypeScript source tree.
- Removed obsolete root-level compiler output and cleanup behavior.
- Removed stale CommonJS and default-import documentation.
- Removed unnecessary Promise wrappers from synchronous key and recovery operations.

### Migration Notes

Applications upgrading from v5 should:

- run on Node.js 22 or later;
- update default package imports to named imports;
- use documented package exports for deep imports;
- update `sign_packed_txn()` calls from `extension` to `context_free_data_hash`;
- treat `new_keys()` as synchronous;
- treat `recover_public_key()` as synchronous;
- update `.then()` or explicit Promise typings for APIs that now return values directly;
- provide exactly 32-byte digests to `sign()` and `recover_public_key()`;
- expect malformed or cryptographically invalid K1 keys to be rejected more strictly;
- `await mnemonic_recover()` because mnemonic recovery now performs BIP39 checksum verification.

Typical root imports are:

```js
import {
  new_keys,
  recover_public_key,
  sign,
  sign_packed_txn,
  validate_private_key,
  validate_public_key,
} from "antelope-ecc";
```

Individual modules may also be imported through documented package subpaths:

```js
import sign from "antelope-ecc/sign.js";
import new_keys from "antelope-ecc/new_keys.js";
```

## 5.0.1 - 2026-08-03

### Major

- Removed default exports from index.js

### Minor

- Added main [index](index.js)

### Patch

- Removed redundant package.json exports fields.
- Updated `isomorphic-secp256k1-js` to 5.0.2.
- Kept the inherited Graphene/BitShares compact-canonical retry policy inside `antelope-ecc`; the generic secp256k1 dependency remains standards-focused.
- Documented that the retry policy is required for Antelope compatibility and is not an ECDSA or RFC 6979 security requirement.
- Documented the complete signing sequence, package boundary, and that callers do not enable the compatibility policy themselves.
- Added a source-only Git workflow: TypeScript builds the npm artifacts during `prepack`, `postpack` removes them locally, and an explicit cleanup allowlist prevents source deletion.
- Added `src/index.ts` so the root JavaScript entry point and its declaration are generated for npm instead of committed to Git.

## 4.0.5

### Patch

- Now throws an expected error when a a none valid private key is used for [public_key_from_private_wif](keys/public_key_from_private_wif.js).

## 4.0.4

### Patch

- random_bytes import bug fixed.

## 4.0.3

### Patch

- Fixed typos.
- Now works as a pkg compiled binary.

## 4.0.2

### Patch

- Dependency updates.

## 4.0.1

### Patch

- Typo fixes

## 4.0.0

### Major

- Removed `createWebAuthnSignature` and `createWebAuthnPublic` key will be extracted into a new stand alone package.

## 3.0.1

### Patch

- Fixed recid bug that was causing webauthn signatures to fail.

## 3.0.0

### Major

- `sign_txn.mjs` argument changes, now requires message digest of the argument, replaced hex to hash.

### Minor

- `createWebAuthnSignature` now supports hex string for challenge/hash.

### Patch

- Depen updates.

## 2.0.0

### Major

- Key utilities transformations
- Recover public key from siganture now recovers PUB_K1 format as a standard (not legacy key).
- Created a list of key utility functions that convert Antelope based `/keys` between their legacy keys and binary representation for secp256k1 keys.
- Directory refactor

### Minor

- Added webauth signatures and public key support (PUB_WA & SIG_WA).
- Adde dprivate key mnemonic and recovery (BIP39).

## 1.0.0

- Initial release
