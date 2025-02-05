# Antelope ECC Changelog

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
