/**
 * Universally generates a pseudorandom byte array.
 * @param {number} bytes - The length of the random byte array to generate.
 * @returns {Promise<Uint8Array>} A Promise that resolves to a Uint8Array of random bytes.
 */
export default async function random_bytes(bytes = 32) {
  if (typeof window == "undefined") {
    const { randomBytes } = await import("crypto");
    return Uint8Array.from([...randomBytes(bytes)]);
  } else return window.crypto.getRandomValues(new Uint8Array(bytes));
}
