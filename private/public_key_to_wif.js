'use strict'

const ripemd160 = require('@relocke/ripemd160')
const binary_to_base58 = require('base58-js/public/binary_to_base58')

const public_key_to_wif = async raw_public_key => {
  const checksum = ripemd160(raw_public_key).slice(0, 4)
  return (
    'EOS' + binary_to_base58(new Uint8Array([...raw_public_key, ...checksum]))
  )
}

module.exports = public_key_to_wif
