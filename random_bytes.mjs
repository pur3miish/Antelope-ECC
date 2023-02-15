// @ts-check

/**
 * Universally generate a psudorandom byte array.
 * @kind function
 * @name random_bytes
 * @param {number} bytes Length of random byte array.
 * @returns {Promise<Uint8Array>} Random bytes array.
 * @ignore
 */
export default async function random_bytes(bytes = 32) {
  if (typeof window == "undefined") {
    const { randomBytes } = await import("crypto");
    return Uint8Array.from([...randomBytes(bytes)]);
  } else return crypto.getRandomValues(new Uint8Array(bytes));
}
