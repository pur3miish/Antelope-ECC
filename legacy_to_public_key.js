'use strict'
const { base58_to_binary, binary_to_base58 } = require('base58-js')
const ripemd160 = require('ripemd160-js')

/**
 * Converts an EOSIO legacy key to PUB_K1 format
 * @name legacy_to_public_key
 * @kind function
 * @param {string} legacy legacy public key
 * @returns {string} public key PUB_K1 format
 * @example <caption>Ways to `import`.</caption>
 * ```js
 * import { legacy_to_public_key } from 'eos-ecc'
 * ```
 * @example <caption>Ways to `require`.</caption>
 * ```js
 * const { legacy_to_public_key } = require('eos-ecc')
 * ```
 * @example <caption>Usage `legacy_to_public_key`.</caption>
 * ```js
 * legacy_to_public_key("EOS53jowyaGC1WrYJefSHTTmGvZcySUFkEpmCDmEd8txunDChput7").then(console.log)
 * ```
 * The logged output was PUB_K1_53jowyaGC1WrYJefSHTTmGvZcySUFkEpmCDmEd8txunDCqCCVR.
 */
async function legacy_to_public_key(legacy) {
  const public_key = base58_to_binary(legacy.replace('EOS', '')).slice(0, -4)
  const checksum = await ripemd160(Uint8Array.from([...public_key, 75, 49]))

  return (
    'PUB_K1_' +
    binary_to_base58(Uint8Array.from([...public_key, ...checksum.slice(0, 4)]))
  )
}

module.exports = legacy_to_public_key
