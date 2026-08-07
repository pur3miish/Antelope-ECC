import base58_to_binary from "base58-js/base58_to_binary.js";
import recover_public from "isomorphic-secp256k1-js/recover_public_key.js";
import { ripemd160 } from "ripemd160-js";

import public_key_to_wif from "./keys/public_key_to_wif.js";

type RecoverPublicKeyArgs = {
  signature: string;
  hash: string | Uint8Array;
};

function is_uint8_array(value: unknown): value is Uint8Array {
  return (
    ArrayBuffer.isView(value) &&
    Object.prototype.toString.call(value) === "[object Uint8Array]"
  );
}

function parse_hash(hash: string | Uint8Array): Uint8Array {
  if (typeof hash === "string") {
    if (!/^[0-9a-fA-F]{64}$/.test(hash)) {
      throw new Error("Hash must be exactly 32 bytes of hexadecimal data.");
    }

    const output = new Uint8Array(32);

    for (let i = 0; i < output.length; i += 1) {
      output[i] = Number.parseInt(hash.slice(i * 2, i * 2 + 2), 16);
    }

    return output;
  }

  if (is_uint8_array(hash)) {
    if (hash.length !== 32) {
      throw new RangeError("Hash must be exactly 32 bytes.");
    }

    return Uint8Array.from(hash);
  }

  throw new TypeError("Hash must be a hexadecimal string or Uint8Array.");
}

function checksum_matches(actual: Uint8Array, expected: Uint8Array): boolean {
  if (actual.length !== expected.length) {
    return false;
  }

  for (let i = 0; i < actual.length; i += 1) {
    if (actual[i] !== expected[i]) {
      return false;
    }
  }

  return true;
}

/**
 * Recovers an Antelope PUB_K1_ public key from a
 * SIG_K1_ signature and exact 32-byte digest.
 */
export default function recover_public_key({
  signature,
  hash,
}: RecoverPublicKeyArgs): string {
  const hash_array = parse_hash(hash);

  if (typeof signature !== "string" || !signature.startsWith("SIG_K1_")) {
    throw new TypeError("Signature must start with SIG_K1_.");
  }

  const decoded = base58_to_binary(signature.slice("SIG_K1_".length));

  // 65-byte compact recoverable signature +
  // 4-byte Antelope checksum.
  if (decoded.length !== 69) {
    throw new RangeError("SIG_K1_ signature must decode to exactly 69 bytes.");
  }

  const raw_signature = decoded.slice(0, 65);

  const checksum = decoded.slice(65);

  const expected_checksum = ripemd160(
    Uint8Array.from([...raw_signature, 75, 49]),
  ).slice(0, 4);

  if (!checksum_matches(checksum, expected_checksum)) {
    throw new Error("Invalid SIG_K1_ signature checksum.");
  }

  const v = raw_signature[0] - 31;
  const r = raw_signature.slice(1, 33);
  const s = raw_signature.slice(33, 65);

  return public_key_to_wif(
    recover_public({
      hash: hash_array,
      signature: { r, s, v },
    }),
  );
}
