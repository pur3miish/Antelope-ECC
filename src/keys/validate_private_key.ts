import base58_to_binary from "base58-js/base58_to_binary.js";
import {
  validate_private_key as validate_secp256k1_private_key,
} from "isomorphic-secp256k1-js/utils.js";
import { ripemd160 } from "ripemd160-js";

type PrivateKeyType = "K1" | "R1" | "WA";

const KEY_CODES: Record<PrivateKeyType, Uint8Array> = {
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
 * Validates an Antelope private key and checksum. `PVT_K1_` keys are additionally validated as secp256k1 private scalars.
 *
 * K1 keys are additionally validated as secp256k1 private scalars.
 */
export default function validate_private_key(
  wif_private_key: string,
): boolean {
  if (typeof wif_private_key !== "string") {
    throw new TypeError("Private key must be a string.");
  }

  let key_type: PrivateKeyType;

  if (wif_private_key.startsWith("PVT_K1_")) {
    key_type = "K1";
  } else if (wif_private_key.startsWith("PVT_R1_")) {
    key_type = "R1";
  } else if (wif_private_key.startsWith("PVT_WA_")) {
    key_type = "WA";
  } else {
    throw new Error(
      "Private keys must start with PVT_K1_, PVT_R1_, or PVT_WA_.",
    );
  }

  const encoded = wif_private_key.slice(
    `PVT_${key_type}_`.length,
  );

  const decoded = base58_to_binary(encoded);

  if (decoded.length < 5) {
    throw new RangeError("Private key payload is too short.");
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
    throw new Error("Invalid private key checksum.");
  }

  if (key_type === "K1") {
    validate_secp256k1_private_key(payload);
  }

  if (key_type === "R1" && payload.length !== 32) {
    throw new RangeError(
      "PVT_R1_ private keys must contain exactly 32 key bytes.",
    );
  }

  return true;
}
