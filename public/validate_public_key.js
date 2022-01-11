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
  if (!wif_public_key.startsWith('EOS'))
    return {
      valid: false,
      message: 'Public key need to start with EOS.'
    }

  let public_key = wif_public_key.slice(3)

  if (public_key.slice(3).match(/[0IOl]+/gmu))
    return {
      valid: false,
      message: 'Invalid base58 character.'
    }

  if (public_key.length != 50)
    return {
      valid: false,
      message: 'Public key should be 53 characters long.'
    }

  const base58_str = base58_to_binary(public_key)
  const checksum_check = base58_str.slice(-4)
  const checksum = await ripemd160(base58_str.slice(0, -4))

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
