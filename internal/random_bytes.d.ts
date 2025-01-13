/**
 * Universally generates a pseudorandom byte array.
 * @param {number} bytes - The length of the random byte array to generate.
 * @returns {Promise<Uint8Array>} A Promise that resolves to a Uint8Array of random bytes.
 */
export default function random_bytes(bytes?: number): Promise<Uint8Array>;
