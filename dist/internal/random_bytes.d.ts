/**
 * Generates cryptographically secure random bytes.
 *
 * Uses the standard Web Crypto API available in modern browsers
 * and Node.js 22+.
 *
 * @param bytes Number of random bytes to generate.
 * @returns Cryptographically secure random bytes.
 */
export default function random_bytes(bytes?: number): Uint8Array;
