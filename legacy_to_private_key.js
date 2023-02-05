'use strict'

const private_key_to_wif = require('./private/private_key_to_wif.js')
const wif_to_private_key = require('./private/wif_to_private_key.js')

/**
 * Converts an Antelope/EOSIO legacy priate key to PVT_K1 format
 * @name legacy_to_public_key
 * @kind function
 * @param {string} legacy legacy private key
 * @returns {string} public key PVT_K1 format
 * @example <caption>Ways to `import`.</caption>
 * ```js
 * import { legacy_to_private_key } from 'eos-ecc'
 * ```
 * @example <caption>Ways to `require`.</caption>
 * ```js
 * const { legacy_to_public_key } = require('eos-ecc')
 * ```
 * @example <caption>Usage `legacy_to_public_key`.</caption>
 * ```js
 * legacy_to_public_key("5KML6yCUABWYxuEexgMZPJA9641SptvHdB5Gm5KZW8rFeGf5uak").then(console.log)
 * ```
 * The logged output was PVT_K1_2Y3XHkP5iwZhtrNvUufJFR1sTBXcm4CuN1VXuGpGFzcUa8vu23.
 */
async function legacy_to_private_key(legacy) {
  const PVT = await wif_to_private_key(legacy)
  return private_key_to_wif(PVT, false)
}

module.exports = legacy_to_private_key
