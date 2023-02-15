// @ts-check

import private_key_to_wif from "./private_key_to_wif.mjs";
import wif_to_private_key from "./wif_to_private_key.mjs";

/**
 * Converts an Antelope/EOSIO legacy private key to PVT_K1 format.
 * @name legacy_to_public_key
 * @kind function
 * @param {String} legacy legacy private key
 * @returns {Promise<String>} public key PVT_K1 format
 * @example <caption>Usage `legacy_to_public_key`.</caption>
 * ```js
 * legacy_to_public_key("5KML6yCUABWYxuEexgMZPJA9641SptvHdB5Gm5KZW8rFeGf5uak").then(console.log)
 * ```
 * The logged output was PVT_K1_2Y3XHkP5iwZhtrNvUufJFR1sTBXcm4CuN1VXuGpGFzcUa8vu23.
 */
export default async function legacy_to_private_key(legacy) {
  const PVT = await wif_to_private_key(legacy);
  return private_key_to_wif(PVT, false);
}
