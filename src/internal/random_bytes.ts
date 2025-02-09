/**
 * Universally generates a pseudorandom byte array.
 * @param {number} bytes - The length of the random byte array to generate.
 * @returns {Promise<Uint8Array>} A Promise that resolves to a Uint8Array of random bytes.
 */
export default async function random_bytes(
  bytes: number = 32
): Promise<Uint8Array> {
  if (typeof window == "undefined") {
    let crypto;
    try {
      // eslint-disable-next-line
      crypto = require("crypto"); // Works in `pkg`
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_err) {
      crypto = await import("crypto"); // Works in ESM
    }
    return Uint8Array.from([...crypto.randomBytes(bytes)]);
  } else return window.crypto.getRandomValues(new Uint8Array(bytes));
}
