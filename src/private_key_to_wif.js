const binary_to_base58 = require('@relocke/base58/src/binary_to_base58')
const sha256 = require('./sha256')

const private_key_to_wif = async private_key => {
  private_key = new Uint8Array([128, ...private_key])
  const checksum = await sha256(await sha256(private_key))
  const array = [...private_key, ...checksum.slice(0, 4)]
  return binary_to_base58(new Uint8Array(array))
}

module.exports = private_key_to_wif
