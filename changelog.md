# eos-ecc changelog

# 4.2.0

## Minor

- Added legacy public key conversion to PUB_K1 format.

# 4.1.0

## Minor

- Support for (PUB_K1 & PVT_K1) key validation.

# 4.0.0

## Major

- Minium support node 16
- Updates to the recover public key, now recovers PUB_K1 by default inplace of legacy key.
- Added new keys function to return `K1` keys.

## Patch

- Depen updated
- Fixed generate public key bug, diff between legacy key and new PUB_K1

# 3.2.0

## Minor

- Added support for `PUB_K1` and `PVT_K1` Antelope & EOSIO keys.

# 3.1.0

## Minor

- Added `sign_packed_txn` function for intuative `EOSIO` signature generation.

# 3.0.0

## Major

- Change import/require structure

- Now supporting Node >=15

## Minor

- Added public key recovery from signature

## Patch

- dependency updates.

- now using `isomorphic-secp256k1-js` instead of `universal-ecdsa`.

## Patch

- Dependency updates.

# v 2.1.0

- Minor

- Added public and private key check.

# v 2.0.4

- Updated dependencies.

# v 2.0.3

## Patch

- Updated dependencies.

- Added sign hash test.

# v 2.0.2

## Patch

- Bug fix for invalid `racid` by updating `universal-ecdsa`.

# v 2.0.1

## Minor

- Updated ripemd160-js depen.

## V 2.0.0

### Major

- Added `universal-ecdsa` package.

- Removed signature validation.

- Fix for invalid signature.

- Renamed `generate_signature` to `sign_txn`.

### Minor

- `new eos keys` function now contains a seed argument.

- Removed `hard-coverage`.

- Removed `isomorphic-secp256k1`.

- added seed to `new_eos_keys`.

### Patch

- Updated dependencies.

## 0.0.0-rc

Initial Release.
