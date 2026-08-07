# Antelope ECC Changelog

## 6.0.0 - 2026-08-07

### Breaking Changes

- Updated the minimum supported Node.js version to Node.js 22.
- Migrated `ripemd160-js` from v3 to v4.
- Updated `isomorphic-secp256k1-js` to v6.
- Standardized the package as native ESM.
- Removed legacy/default package export behavior.
- Package build artifacts are now generated under `dist/`.
- Renamed the `sign_packed_txn()` `extension` argument to `context_free_data_hash`.
- Multiple public APIs that previously returned unnecessary Promises are now synchronous.
- `new_keys()` now returns its key pair directly.
- `recover_public_key()` now returns the recovered `PUB_K1_` key directly.
- RIPEMD-backed key conversion and validation APIs now return their results directly where no asynchronous operation is required.
- Existing callers using `await` remain compatible, but callers relying on `.then()`, `.catch()`, or explicit Promise typings for newly synchronous functions must update.

### Added

- Added a side-effect-free root ESM entry point with named exports.
- Added explicit supported deep-import paths.
- Added TypeScript declaration generation for the published API.
- Added npm package smoke testing against the actual packed npm artifact.
- Added a reproducible npm lockfile.
- Added ESLint flat configuration.
- Added CI coverage across Node.js 22, 24, and 26 on Linux and macOS.
- Added strict secp256k1 scalar validation for `PVT_K1_` private keys.
- Added strict compressed SEC 1 point validation for `PUB_K1_` public keys.
- Added checksum validation when decoding K1 keys.
- Added checksum validation when recovering `SIG_K1_` signatures.
- Added strict 32-byte digest validation for signing and recovery.
- Added strict hexadecimal validation for packed transaction signing inputs.
- Added BIP39 checksum validation during mnemonic recovery.
- Added validation of standard BIP39 entropy sizes and mnemonic word counts.

### Changed

- RIPEMD-160 imports now use:

  ```js
  import { ripemd160 } from "ripemd160-js";
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
