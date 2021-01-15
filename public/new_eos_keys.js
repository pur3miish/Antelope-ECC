'use strict'

const generate_key_pair = require('isomorphic-secp256k1/public/generate_key_pair')
const private_key_to_wif = require('../private/private_key_to_wif')
const public_key_to_wif = require('../private/public_key_to_wif')

const new_eos_keys = async () => {
  const { private_key, public_key } = await generate_key_pair()
  return {
    public_key: await public_key_to_wif(public_key),
    private_key: await private_key_to_wif(private_key)
  }
}

module.exports = new_eos_keys
