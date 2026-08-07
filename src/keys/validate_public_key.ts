import base58_to_binary from "base58-js/base58_to_binary.js";
import {
  validate_public_key as validate_secp256k1_public_key,
} from "isomorphic-secp256k1-js/utils.js";
import { ripemd160 } from "ripemd160-js";

type PublicKeyType = "K1" | "R1" | "WA";

const KEY_CODES: Record<PublicKeyType, Uint8Array> = {
  K1: Uint8Array.of(75, 49),
  R1: Uint8Array.of(82, 49),
  WA: Uint8Array.of(87, 65),
};

function checksum_matches(
  actual: Uint8Array,
  expected: Uint8Array,
): boolean {
  if (actual.length !== expected.length) return false;

  for (let i = 0; i < actual.length; i += 1) {
    if (actual[i] !== expected[i]) return false;
  }

  return true;
}

/**
 * Validates an Antelope public key and its checksum.
 *
 * K1 keys are additionally validated as compressed SEC 1
 * secp256k1 public keys.
 */
export default function validate_public_key(
  wif_public_key: string,
): boolean {
  if (typeof wif_public_key !== "string") {
    throw new TypeError("Public key must be a string.");
  }

  let key_type: PublicKeyType;

  if (wif_public_key.startsWith("PUB_K1_")) {
    key_type = "K1";
  } else if (wif_public_key.startsWith("PUB_R1_")) {
    key_type = "R1";
  } else if (wif_public_key.startsWith("PUB_WA_")) {
    key_type = "WA";
  } else {
    throw new Error(
      "Public keys must start with PUB_K1_, PUB_R1_, or PUB_WA_.",
    );
  }

  const encoded = wif_public_key.slice(
    `PUB_${key_type}_`.length,
  );

  const decoded = base58_to_binary(encoded);

  if (decoded.length < 5) {
    throw new RangeError("Public key payload is too short.");
  }

  const payload = decoded.slice(0, -4);
  const checksum = decoded.slice(-4);

  const expected_checksum = ripemd160(
    Uint8Array.from([
      ...payload,
      ...KEY_CODES[key_type],
    ]),
  ).slice(0, 4);

  if (!checksum_matches(checksum, expected_checksum)) {
    throw new Error("Invalid public key checksum.");
  }

  if (key_type === "K1") {
    if (payload.length !== 33) {
      throw new RangeError(
        "PUB_K1_ public keys must contain exactly 33 compressed key bytes.",
      );
    }

    validate_secp256k1_public_key(payload);
  }

  if (key_type === "R1") {
    if (
      payload.length !== 33 ||
      (payload[0] !== 2 && payload[0] !== 3)
    ) {
      throw new RangeError(
        "PUB_R1_ public keys must contain a compressed 33-byte key.",
      );
    }
  }

  return true;
}
