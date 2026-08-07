# Antelope ECC Changelog

## 6.0.0 - 2026-08-07

### Breaking Changes

- Updated `isomorphic-secp256k1-js` to v6.
- `new_keys()` is now synchronous and returns its key pair directly instead of `Promise<{ public_key, private_key }>`.
- `recover_public_key()` is now synchronous and returns the recovered `PUB_K1_` key directly instead of `Promise<string>`.
- Public-key derivation APIs no longer introduce unnecessary Promise wrappers.
- Existing callers using `await` remain compatible, but callers using `.then()` or explicit Promise typings must update.
- Updated the minimum supported Node.js version from Node.js 20 to **Node.js 22**.
- Migrated `ripemd160-js` from v3 to **v4** and adopted its new synchronous `Uint8Array → Uint8Array` API.
- Updated `eosio-wasm-js` to **v6**.
- Standardized the package as **native ESM** with explicit named exports and supported deep-import paths.
- Removed legacy/default package export behavior. Consumers should use named imports or documented deep imports.
- Renamed the `sign_packed_txn()` `extension` argument to `context_free_data_hash` to correctly describe its role in the Antelope transaction signing digest.
- Package build artifacts are now generated under `dist/` rather than alongside source files.

### Added

- Added a root ESM entry point exposing the supported Antelope ECC API through named exports.
- Added TypeScript declaration generation for the complete published API.
- Added explicit package `exports` for root imports and supported deep imports.
- Added npm package smoke testing that:

  - builds the package;
  - creates the actual npm tarball;
  - installs the tarball into an isolated consumer project;
  - verifies root imports;
  - verifies deep imports;
  - performs runtime cryptographic operations against the packaged artifact.

- Added a committed npm lockfile for reproducible CI installations.
- Added modern ESLint flat configuration.
- Added automated formatting and lint-fix scripts.
- Added CI coverage across Node.js 22, 24, and 26 on Linux and macOS.
- Added explicit validation and documentation for cryptographically secure random-byte generation.

### Changed

- Migrated RIPEMD-160 imports from the legacy deep import:

  ```js
  import ripemd160 from "ripemd160-js/ripemd160.js";
  ```

  to the v4 package API:

  ```js
  import { ripemd160 } from "ripemd160-js";
  ```

- Updated Antelope private-key, public-key, and signature checksum operations to use the synchronous RIPEMD-160 implementation.

- Removed unnecessary asynchronous RIPEMD-160 checksum handling.

- Updated key validation and conversion functions for the new RIPEMD-160 byte-oriented API.

- Replaced environment-specific Node.js random-byte handling with the standard Web Crypto API:

  ```js
  globalThis.crypto.getRandomValues(...)
  ```

- Removed the previous `require("crypto")` and dynamic `import("crypto")` fallback logic.

- Random-byte generation now uses the same standards-based implementation in Node.js and modern browsers.

- Random-byte generation supports requests larger than the Web Crypto 65,536-byte per-call limit by filling the result in chunks.

- Updated `sign_packed_txn()` terminology so the final 32-byte component of the signing preimage is correctly identified as `context_free_data_hash`.

- `context_free_data_hash` defaults to 32 zero bytes when no context-free data is present, matching the standard Antelope transaction signing format.

- Clarified that `context_free_data_hash` is unrelated to Antelope `transaction_extensions`, which are serialized as part of the transaction itself.

- Retained the Antelope/Graphene compact-canonical signature compatibility policy inside `antelope-ecc`.

- Kept generic secp256k1 functionality isolated in `isomorphic-secp256k1-js`, with Antelope-specific signing compatibility remaining at the Antelope package boundary.

- Updated TypeScript compilation to use `NodeNext` module and resolution semantics.

- TypeScript source now lives exclusively under `src/`.

- Compiled JavaScript and `.d.ts` files are generated exclusively under `dist/`.

- Updated the npm package to publish only the compiled `dist/` distribution.

- Updated package metadata and dependency versions.

- Updated README documentation for the v6 API, ESM usage, deep imports, Node.js requirements, Web Crypto support, package structure, development workflow, and security considerations.

### Tooling

- Updated TypeScript to v6.
- Migrated from legacy `.eslintrc` configuration to ESLint flat config.
- Updated ESLint to v10.
- Updated Prettier to v3.
- Updated `typescript-eslint`.
- Updated `eslint-plugin-simple-import-sort`.
- Updated test and development dependencies.
- CI now uses `npm ci` instead of mutable dependency installation.
- Updated GitHub Actions workflow and Node.js test matrix.
- Simplified the build cleanup process to remove only generated `dist/` output.

### Package Structure

Source files are now maintained as TypeScript:

```text
src/
├── index.ts
├── sign.ts
├── sign_packed_txn.ts
├── new_keys.ts
├── keys/
└── internal/
```

TypeScript generates the npm distribution:

```text
dist/
├── index.js
├── index.d.ts
├── sign.js
├── sign.d.ts
├── sign_packed_txn.js
├── sign_packed_txn.d.ts
├── keys/
└── internal/
```

Generated JavaScript is no longer stored alongside TypeScript source files.

### Dependencies

Updated runtime dependencies include:

- `base58-js` v3
- `eosio-wasm-js` v6
- `isomorphic-secp256k1-js` v5
- `ripemd160-js` v4

### Removed

- Removed support for Node.js versions below 22.
- Removed support for `ripemd160-js` v3.
- Removed the legacy `ripemd160-js/ripemd160.js` deep import.
- Removed Node-specific `require("crypto")` random-byte handling.
- Removed dynamic Node `crypto` import fallback logic.
- Removed legacy ESLint `.eslintrc` configuration.
- Removed generated JavaScript from the TypeScript source tree.
- Removed obsolete root-level compiler output and cleanup behavior.
- Removed stale CommonJS and default-import documentation.

### Migration Notes

Applications upgrading from v5 should:

- run on Node.js 22 or later;
- update any default package imports to named imports;
- use documented package exports for deep imports;
- update `sign_packed_txn()` calls from `extension` to `context_free_data_hash`;
- account for functions that no longer need asynchronous RIPEMD-160 checksum handling;
- review any code relying specifically on previous Promise-based checksum behavior.

Typical package imports now use:

```js
import {
  new_keys,
  sign,
  sign_packed_txn,
  validate_private_key,
  validate_public_key,
} from "antelope-ecc";
```

or an explicitly exported deep module:

```js
import sign from "antelope-ecc/sign.js";
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
