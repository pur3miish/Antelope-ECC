'use strict'

const base58_to_binary = require('base58-js/public/base58_to_binary')
const ripemd160 = require('ripemd160-js')

/**
 * Converts an EOS wallet import format (WIF) public key to public key.
 * @kind function
 * @name wif_to_public_key
 * @param {string} wif_public_key Base58 WIF public key.
 * @returns {Uint8Array} Compressed secp256k1 public key.
 * @ignore
 */
async function wif_to_public_key(wif_public_key) {
  if (!wif_public_key.startsWith('EOS'))
    throw new Error('Public key should start with EOS')

  const whole = base58_to_binary(wif_public_key.replace('EOS', ''))
  const raw_public_key = whole.slice(0, -4)
  const checksum = whole.slice(-4)

  const hash = await ripemd160(raw_public_key)
  hash.slice(0, 4).forEach((i, x) => {
    if (i != checksum[x]) throw new Error('Invalid public key checksum.')
  })

  return raw_public_key
}

module.exports = wif_to_public_key
