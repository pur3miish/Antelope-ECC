'use strict'

const { binary_to_base58 } = require('base58-js')
const ripemd160 = require('ripemd160-js')
const sha256 = require('universal-sha256-js')

/**
 * Converts a private key to an EOS wallet import format (WIF) private key.
 * @kind function
 * @name private_key_to_wif
 * @param {Uint8Array} private_key Compressed public key.
 * @param {boolean} legacy Will return legacy keys if true.
 * @returns {string} WIF private key.
 * @ignore
 */
async function private_key_to_wif(private_key, legacy) {
  if (legacy) {
    const checksum = await ripemd160(Uint8Array.from([...private_key, 75, 49]))
    return (
      'PVT_K1_' +
      binary_to_base58(
        new Uint8Array([...private_key, ...checksum.slice(0, 4)])
      )
    )
  } else {
    private_key = new Uint8Array([128, ...private_key])
    const checksum = await sha256(await sha256(private_key))
    const array = [...private_key, ...checksum.slice(0, 4)]
    return binary_to_base58(new Uint8Array(array))
  }
}

module.exports = private_key_to_wif
