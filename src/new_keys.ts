import get_public_key from "isomorphic-secp256k1-js/get_public_key.js";

import random_bytes from "./internal/random_bytes.js";
import private_key_to_wif from "./keys/private_key_to_wif.js";
import public_key_to_wif from "./keys/public_key_to_wif.js";

type NewAntelopeKeysReturn = {
  public_key: string;
  private_key: string;
};

/**
 * Generate a new Antelope K1 public/private key pair.
 *
 * If a seed is not provided, a cryptographically secure 32-byte private key
 * is generated using the Web Crypto API.
 *
 * @param seed Optional 32-byte private key.
 * @returns Antelope PUB_K1_ and PVT_K1_ keys.
 *
 * @example
 * ```ts
 * import { new_keys } from "antelope-ecc";
 *
 * const keys = await new_keys();
 *
 * console.log(keys.public_key);
 * console.log(keys.private_key);
 * ```
 */
export default async function new_keys(
  seed?: Uint8Array,
): Promise<NewAntelopeKeysReturn> {
  const private_key = seed ?? random_bytes();
  const public_key = await get_public_key(private_key);

  return {
    public_key: public_key_to_wif(public_key),
    private_key: private_key_to_wif(private_key),
  };
}
