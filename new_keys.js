import get_public_key from "isomorphic-secp256k1-js/get_public_key.js";
import random_bytes from "./internal/random_bytes.js";
import private_key_to_wif from "./keys/private_key_to_wif.js";
import public_key_to_wif from "./keys/public_key_to_wif.js";
/**
 * Generate a new pair of Antelope public and private keys (PUB_K1 and PVT_K1).
 * @example <caption>Usage `new_keys`.</caption>
 * ```js
 * import newAntelopeKeys from 'antelope-ecc/new_keys'
 * new_keys().then(console.log)
 * ```
 * The logged output will be an object containing PUB_K1 and PVT_K1 wif keys.
 */
export default async function new_keys(seed) {
    const private_key = seed ? seed : await random_bytes();
    const public_key = await get_public_key(private_key);
    return {
        public_key: await public_key_to_wif(public_key),
        private_key: await private_key_to_wif(private_key),
    };
}
