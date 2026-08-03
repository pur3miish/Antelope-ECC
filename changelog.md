# Antelope ECC Changelog

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
