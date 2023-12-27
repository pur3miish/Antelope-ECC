import crypto from "crypto";
import sha256 from "universal-sha256-js/sha256.mjs";

import words from "./internal/mnemonic-words.mjs";

/**
 * Generates a BIP39 24 word mnemonic representing a 32 based  private key.
 * @param {Uint8Array} bytes 32 bytes of data.
 * @returns {Array<String>} BIP39 mnemonic.
 * @example <caption>Usage `legacy_to_public_key`.</caption>
 * ```js
 * import crypto from "crypto"
 * import createMnemonic from "antelope-ecc/mnemonic-create.mjs"
 *
 * const bytes = crypto.randomBytes(32) // The private key
 * createMnemonic(bytes).then(console.log) // BIP39 words.
 * ```
 * The logged output was [abandon, busy, …].
 */
export default async function createMnemonic(
  bytes = crypto.getRandomValues(new Uint8Array(32))
) {
  let bitLen = 8 * bytes.length;
  let sumBitLen = bitLen / 32;
  bytes = new Uint8Array(bytes);

  let hashAb = await sha256(bytes);
  let hashBuf = new Uint8Array(hashAb);

  let bits = "";
  bytes.forEach((n) => {
    let b = n.toString(2).padStart(8, "0");
    bits += b;
  });

  let checkByte = hashBuf[0];
  let checkBits = checkByte.toString(2);
  checkBits = checkBits.padStart(8, "0");

  let checksum = checkBits.slice(0, sumBitLen);
  bits += checksum;

  let seed = [];
  for (let bit = 0; bit < bitLen + sumBitLen; bit += 11) {
    // 11-bit integer (0-2047)
    let i = parseInt(bits.slice(bit, bit + 11).padStart(8, "0"), 2);
    seed.push(i);
  }

  return seed.map((i) => words[i]).join(" ");
}
