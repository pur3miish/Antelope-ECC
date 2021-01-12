const get_public_key = require('secp256k1-js/src/get_public_key')
const public_key_to_wif = require('./public_key_to_wif')
const wif_to_private_key = require('./wif_to_private_key')

const public_key_from_private = async wif_private_key => {
  const private_key = await wif_to_private_key(wif_private_key)
  return public_key_to_wif(await get_public_key({ private_key }))
}

module.exports = public_key_from_private
