/**
 * Generates cryptographically secure random bytes.
 *
 * Uses the standard Web Crypto API available in modern browsers
 * and Node.js 22+.
 *
 * @param bytes Number of random bytes to generate.
 * @returns Cryptographically secure random bytes.
 */
export default function random_bytes(bytes: number = 32): Uint8Array {
  if (!Number.isSafeInteger(bytes) || bytes < 0) {
    throw new RangeError("bytes must be a non-negative safe integer");
  }

  if (
    typeof globalThis.crypto === "undefined" ||
    typeof globalThis.crypto.getRandomValues !== "function"
  ) {
    throw new Error(
      "Cryptographically secure random number generation is unavailable.",
    );
  }

  const output = new Uint8Array(bytes);

  // Web Crypto limits getRandomValues() to 65,536 bytes per call.
  for (let offset = 0; offset < output.length; offset += 65_536) {
    globalThis.crypto.getRandomValues(
      output.subarray(offset, Math.min(offset + 65_536, output.length)),
    );
  }

  return output;
}
