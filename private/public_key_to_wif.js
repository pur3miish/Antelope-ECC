'use strict'

const { binary_to_base58 } = require('base58-js')
const ripemd160 = require('ripemd160-js')

/**
 * Converts a public key to an EOS wallet import format (WIF) public key.
 * @kind function
 * @name public_key_to_wif
 * @param {Uint8Array} raw_public_key Compressed public key.
 * @returns {string} WIF public key.
 * @ignore
 */
async function public_key_to_wif(raw_public_key) {
  const hash = await ripemd160(raw_public_key)
  const checksum = hash.slice(0, 4)
  return (
    'EOS' + binary_to_base58(new Uint8Array([...raw_public_key, ...checksum]))
  )
}

module.exports = public_key_to_wif
