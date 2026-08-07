import get_public_key from "isomorphic-secp256k1-js/get_public_key.js";

import random_bytes from "./internal/random_bytes.js";
import private_key_to_wif from "./keys/private_key_to_wif.js";
import public_key_to_wif from "./keys/public_key_to_wif.js";

type NewAntelopeKeysReturn = {
  public_key: string;
  private_key: string;
};

const MAX_KEY_GENERATION_ATTEMPTS = 1024;

/**
 * Generate a new Antelope K1 public/private key pair.
 *
 * If a seed is not provided, a cryptographically secure private key
 * is generated using the Web Crypto API.
 *
 * @param seed Optional 32-byte secp256k1 private key.
 * @returns Antelope PUB_K1_ and PVT_K1_ keys.
 *
 * @example
 * ```ts
 * import { new_keys } from "antelope-ecc";
 *
 * const keys = new_keys();
 *
 * console.log(keys.public_key);
 * console.log(keys.private_key);
 * ```
 */
export default function new_keys(seed?: Uint8Array): NewAntelopeKeysReturn {
  if (seed) {
    const private_key = Uint8Array.from(seed);
    const public_key = get_public_key(private_key);

    return {
      public_key: public_key_to_wif(public_key),
      private_key: private_key_to_wif(private_key),
    };
  }

  for (let attempt = 0; attempt < MAX_KEY_GENERATION_ATTEMPTS; attempt += 1) {
    const private_key = random_bytes();

    try {
      const public_key = get_public_key(private_key);

      return {
        public_key: public_key_to_wif(public_key),
        private_key: private_key_to_wif(private_key),
      };
    } catch (error) {
      if (error instanceof RangeError) continue;
      throw error;
    }
  }

  throw new Error(
    `Failed to generate a valid secp256k1 private key after ${MAX_KEY_GENERATION_ATTEMPTS} attempts.`,
  );
}
