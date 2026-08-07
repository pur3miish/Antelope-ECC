import binary_to_base58 from "base58-js/binary_to_base58.js";
import { validate_private_key as validate_secp256k1_private_key } from "isomorphic-secp256k1-js/utils.js";
import { ripemd160 } from "ripemd160-js";

/**
 * Converts a 32-byte secp256k1 private key into
 * an Antelope PVT_K1_ private key.
 */
export default function private_key_to_wif(private_key: Uint8Array): string {
  validate_secp256k1_private_key(private_key);

  const checksum = ripemd160(Uint8Array.from([...private_key, 75, 49])).slice(
    0,
    4,
  );

  return (
    "PVT_K1_" + binary_to_base58(Uint8Array.from([...private_key, ...checksum]))
  );
}
