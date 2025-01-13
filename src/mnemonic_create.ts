import crypto from "crypto";
import sha256 from "isomorphic-secp256k1-js/sha256.js";

import words from "./internal/mnemonic-words.js";

/**
 * Generates a BIP39 24-word mnemonic representing a 32-byte private key.
 *
 * @param bytes - 32 bytes of data, typically a private key.
 * @returns A Promise that resolves to an array of strings representing the BIP39 mnemonic.
 *
 * @example
 * ```ts
 * import crypto from "crypto";
 * import createMnemonic from "antelope-ecc/mnemonic-create";
 *
 * const bytes = crypto.randomBytes(32); // The private key
 * createMnemonic(bytes).then(console.log); // BIP39 words.
 * ```
 * The logged output will be an array like: `['abandon', 'busy', …]`.
 */
export default async function createMnemonic(
  bytes: Uint8Array = crypto.getRandomValues(new Uint8Array(32))
): Promise<string> {
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

  const seed: number[] = [];

  for (let bit = 0; bit < bitLen + sumBitLen; bit += 11) {
    // 11-bit integer (0-2047)
    let i = parseInt(bits.slice(bit, bit + 11).padStart(8, "0"), 2);
    seed.push(i);
  }

  return seed.map((i) => words[i]).join(" ");
}
