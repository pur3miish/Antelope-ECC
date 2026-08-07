import sha256 from "isomorphic-secp256k1-js/sha256.js";

import words from "./internal/mnemonic-words.js";
import random_bytes from "./internal/random_bytes.js";

const VALID_ENTROPY_LENGTHS = new Set([16, 20, 24, 28, 32]);

function is_uint8_array(value: unknown): value is Uint8Array {
  return (
    ArrayBuffer.isView(value) &&
    Object.prototype.toString.call(value) === "[object Uint8Array]"
  );
}

function bytes_to_bits(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(2).padStart(8, "0")).join(
    "",
  );
}

/**
 * Creates a BIP39 mnemonic from entropy.
 *
 * Supports the standard BIP39 entropy sizes:
 * 128, 160, 192, 224, and 256 bits.
 *
 * When entropy is omitted, 256 bits of secure random
 * entropy are generated, producing a 24-word mnemonic.
 */
export default async function mnemonic_create(
  bytes: Uint8Array = random_bytes(32),
): Promise<string> {
  if (!is_uint8_array(bytes)) {
    throw new TypeError("Mnemonic entropy must be a Uint8Array.");
  }

  const entropy = Uint8Array.from(bytes);

  if (!VALID_ENTROPY_LENGTHS.has(entropy.length)) {
    throw new RangeError("BIP39 entropy must be 16, 20, 24, 28, or 32 bytes.");
  }

  const hash = await sha256(entropy);

  const checksum_bit_length = entropy.length / 4;

  const checksum_bits = hash[0]
    .toString(2)
    .padStart(8, "0")
    .slice(0, checksum_bit_length);

  const bits = bytes_to_bits(entropy) + checksum_bits;

  const mnemonic_words: string[] = [];

  for (let offset = 0; offset < bits.length; offset += 11) {
    const index = Number.parseInt(bits.slice(offset, offset + 11), 2);

    mnemonic_words.push(words[index]);
  }

  return mnemonic_words.join(" ");
}
