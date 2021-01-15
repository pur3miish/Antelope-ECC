'use strict'

const ripemd160 = require('@relocke/ripemd160')
const binary_to_base58 = require('base58-js/public/binary_to_base58.js')
const sign_hash = require('isomorphic-secp256k1/public/sign_hash')
const wif_to_private_key = require('../private/wif_to_private_key')

/**
 * Create an EOS signature.
 * @param {object} arg Arg object.
 * @param {string} arg.hex The hex string of a serialised EOS transaciton.
 * @param {string} arg.wif_private_key An EOS wallet import format private key.
 * @returns {string} EOS signature.
 */
const generate_eos_signature = async ({ hex, wif_private_key }) => {
  const { der_signature } = await sign_hash({
    hex,
    private_key: await wif_to_private_key(wif_private_key)
  })

  const [, , , r_length, ...bytes] = der_signature
  const r = bytes.slice(0, r_length)
  const [, , ...s] = bytes.slice(r_length)
  const i = 31 // signifies compressed & compact key.
  const K1 = [75, 49] // K1 as ascii
  const raw_sig = new Uint8Array([i, ...r, ...s])
  const checksum = ripemd160([...raw_sig, ...K1]).slice(0, 4)
  const base58_sig = binary_to_base58(new Uint8Array([...raw_sig, ...checksum]))
  return 'SIG_K1_' + base58_sig
}

module.exports = generate_eos_signature
