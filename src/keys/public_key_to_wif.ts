import binary_to_base58 from "base58-js/binary_to_base58.js";
import {
  validate_public_key as validate_secp256k1_public_key,
} from "isomorphic-secp256k1-js/utils.js";
import { ripemd160 } from "ripemd160-js";

/**
 * Converts a compressed 33-byte secp256k1 public key
 * into an Antelope PUB_K1_ public key.
 */
export default function public_key_to_wif(
  public_key: Uint8Array,
): string {
  if (public_key.length !== 33) {
    throw new RangeError(
      "Antelope K1 public keys must use the 33-byte compressed SEC 1 encoding.",
    );
  }

  validate_secp256k1_public_key(public_key);

  const checksum = ripemd160(
    Uint8Array.from([
      ...public_key,
      75,
      49,
    ]),
  ).slice(0, 4);

  return (
    "PUB_K1_" +
    binary_to_base58(
      Uint8Array.from([
        ...public_key,
        ...checksum,
      ]),
    )
  );
}
