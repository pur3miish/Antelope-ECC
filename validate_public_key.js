'use strict'

const { base58_to_binary } = require('base58-js')
const ripemd160 = require('ripemd160-js')

/**
 * Validate EOS public key.
 * @name validate_public_key
 * @kind function
 * @param {string} wif_public_key wallet import format EOS public key.
 * @returns {validation_obj} validation object
 */
async function validate_public_key(wif_public_key) {
  const legacy = wif_public_key.startsWith('EOS')

  if (
    !wif_public_key.startsWith('EOS') &&
    !wif_public_key.startsWith('PUB_K1_')
  )
    return {
      valid: false,
      message: 'Public keys need to start with PUB_K1 or for legacy keys EOS'
    }

  if (legacy && wif_public_key.length != 53)
    return {
      valid: false,
      message: 'Legacy public keys need to be 53 characters long.'
    }

  if (!legacy && wif_public_key.startsWith('PUB_K1_'))
    if (wif_public_key.length != 57)
      return {
        valid: false,
        message: 'Public key needs to be 57 characters long.'
      }

  let public_key = wif_public_key?.replace('EOS', '').replace('PUB_K1_', '')

  if (public_key.match(/[0IOl]+/gmu))
    return {
      valid: false,
      message: 'Invalid base58 character.'
    }

  const base58_str = base58_to_binary(public_key)
  const checksum_check = base58_str.slice(-4)

  const checksum = legacy
    ? await ripemd160(base58_str.slice(0, -4))
    : await ripemd160(Uint8Array.from([...base58_str.slice(0, -4), 75, 49]))

  let invalid_checksum

  for (let i = 0; i < 4; i++)
    if (checksum[i] != checksum_check[i]) {
      invalid_checksum = true
      break
    }

  if (invalid_checksum)
    return {
      valid: false,
      message: 'Invalid checksum'
    }
  return {
    valid: true
  }
}

module.exports = validate_public_key
