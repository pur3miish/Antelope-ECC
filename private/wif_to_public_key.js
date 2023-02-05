'use strict'

const { base58_to_binary } = require('base58-js')
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
  let suffix = [],
    whole
  if (wif_public_key.startsWith('PUB_K1_')) {
    suffix = [75, 49]
    whole = base58_to_binary(wif_public_key.replace('PUB_K1_', ''))
  } else if (wif_public_key.startsWith('EOS'))
    whole = base58_to_binary(wif_public_key.replace('EOS', ''))
  else throw new Error('Invalid public key format')

  const raw_public_key = whole.slice(0, -4)
  const checksum = whole.slice(-4)

  const hash = await ripemd160(Uint8Array.from([...raw_public_key, ...suffix]))

  hash.slice(0, 4).forEach((i, x) => {
    if (i != checksum[x]) throw new Error('Invalid public key checksum.')
  })

  return raw_public_key
}

module.exports = wif_to_public_key
