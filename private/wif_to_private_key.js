'use strict'

const { base58_to_binary } = require('base58-js')
const sha256 = require('universal-sha256-js')

/**
 * Converts an EOS wallet import format (WIF) private key to private key.
 * @kind function
 * @name wif_to_private_key
 * @param {string} wif_private_key WIF is a base 58 string.
 * @returns {Uint8Array} Secp256k1 private key.
 * @ignore
 */
async function wif_to_private_key(wif_private_key) {
  const priv_key = base58_to_binary(wif_private_key)
  const raw_priv_key = priv_key.slice(0, 33)
  const checksum = priv_key.slice(-4)
  const checksum_hash = await sha256(await sha256(raw_priv_key))

  if (checksum_hash.slice(0, 4).filter((x, i) => x != checksum[i]).length)
    throw new Error('Invalid wif private key - checksum mismatch')

  return raw_priv_key.slice(1, 33)
}

module.exports = wif_to_private_key
