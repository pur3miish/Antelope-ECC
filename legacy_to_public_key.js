'use strict'
const { base58_to_binary, binary_to_base58 } = require('base58-js')
const ripemd160 = require('ripemd160-js')

/**
 * Converts an EOSIO legacy key to PUB_K1 format
 * @param {string} legacy legacy public key
 * @returns {string} public key PUB_K1 format
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
