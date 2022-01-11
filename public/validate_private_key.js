'use strict'

const { base58_to_binary } = require('base58-js')
const { sha256 } = require('universal-ecdsa')

/**
 * Validates an EOS private key.
 * @kind typedef
 * @name validation_obj
 * @prop {bool} valid Determins if the private key
 * @prop {string} [message] Description of invalidation.
 */

/**
 * Validate an EOS private key.
 * @name validate_private_key
 * @kind function
 * @param {string} wif_private_key base58 private key
 * @returns {validation_obj} validation message.
 */
async function validate_private_key(wif_private_key) {
  if (wif_private_key[0] != '5')
    return {
      valid: false,
      message: 'Private key must start with 5.'
    }

  if (wif_private_key.match(/[0IOl]+/gmu))
    return {
      valid: false,
      message: `“${
        wif_private_key.match(/[0IOl]+/gmu)[0]
      }” is an invalid base58 character.`
    }

  if (wif_private_key.length != 51)
    return {
      valid: false,
      message: 'EOS private keys need to be 51 characters long.'
    }

  const base58_str = base58_to_binary(wif_private_key)
  const checksum_check = base58_str.slice(-4)
  const checksum = await sha256(await sha256(base58_str.slice(0, -4)))
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

module.exports = validate_private_key
