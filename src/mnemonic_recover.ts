import sha256 from "isomorphic-secp256k1-js/sha256.js";

import words from "./internal/mnemonic-words.js";

const VALID_WORD_COUNTS = new Set([12, 15, 18, 21, 24]);

/**
 * Recovers and validates BIP39 entropy from a mnemonic.
 *
 * The BIP39 checksum is verified before entropy is returned.
 */
export default async function mnemonic_recover(
  recoveryPhrase: string,
): Promise<Uint8Array> {
  if (typeof recoveryPhrase !== "string") {
    throw new TypeError("Recovery phrase must be a string.");
  }

  const normalized = recoveryPhrase.normalize("NFKD").trim().toLowerCase();

  const mnemonic_words = normalized.split(/\s+/u);

  if (!VALID_WORD_COUNTS.has(mnemonic_words.length)) {
    throw new RangeError(
      "BIP39 mnemonics must contain 12, 15, 18, 21, or 24 words.",
    );
  }

  const indices = mnemonic_words.map((word) => {
    const index = words.indexOf(word);

    if (index < 0) {
      throw new Error(`Unknown BIP39 word: '${word}'.`);
    }

    return index;
  });

  const bits = indices
    .map((index) => index.toString(2).padStart(11, "0"))
    .join("");

  const checksum_bit_length = mnemonic_words.length / 3;

  const entropy_bit_length = bits.length - checksum_bit_length;

  const entropy = new Uint8Array(entropy_bit_length / 8);

  for (let offset = 0; offset < entropy_bit_length; offset += 8) {
    entropy[offset / 8] = Number.parseInt(bits.slice(offset, offset + 8), 2);
  }

  const supplied_checksum = bits.slice(entropy_bit_length);

  const hash = await sha256(entropy);

  const expected_checksum = hash[0]
    .toString(2)
    .padStart(8, "0")
    .slice(0, checksum_bit_length);

  if (supplied_checksum !== expected_checksum) {
    throw new Error("Invalid BIP39 mnemonic checksum.");
  }

  return entropy;
}
