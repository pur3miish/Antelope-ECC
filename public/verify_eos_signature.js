'use strict'

const ripemd160 = require('@relocke/ripemd160')
const base58_to_binary = require('base58-js/public/base58_to_binary')
const verify_signature = require('isomorphic-secp256k1/public/verify_signature')
const sha256 = require('../private/sha256')
const wif_to_public_key = require('../private/wif_to_public_key')

/**
 * Validates and EOS signature from the message digest and public key.
 * @kind function
 * @name verify_eos_signature
 * @param {object} arg Argument.
 * @param {string} arg.wif_public_key EOS public key.
 * @param {string} arg.signature EOS encoded signature.
 * @param {string} arg.hash The `sha256` message digest.
 * @returns {boolena} Will be `true` & `false` for valid & invalid signatures respectively.
 * @example
 */
async function verify_eos_signature({ wif_public_key, signature, hash }) {
  if (!signature.startsWith('SIG_K1_'))
    throw new Error('Signature should start with “SIG_K1”')
  const raw_sig = base58_to_binary(signature.replace('SIG_K1_', ''))
  const checksum = raw_sig.slice(-4)
  const sig = raw_sig.slice(0, -4)
  ripemd160([...sig, 75, 49])
    .slice(0, 4)
    .forEach((i, x) => {
      if (i != checksum[x]) throw new Error('Invalid checksum for signature')
    })
  const s1 = sig.slice(1, 33)
  const s2 = sig.slice(33)
  const der_signature = new Uint8Array([48, 68, 2, 32, ...s1, 2, 32, ...s2])

  return verify_signature({
    der_signature,
    hash: await sha256(hash),
    public_key: await wif_to_public_key(wif_public_key)
  })
}

module.exports = verify_eos_signature
