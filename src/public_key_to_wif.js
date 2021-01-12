const binary_to_base58 = require('@relocke/base58/src/binary_to_base58')
const ripemd160 = require('@relocke/ripemd160')

const public_key_to_wif = async raw_public_key => {
  const checksum = ripemd160(raw_public_key).slice(0, 4)
  return (
    'EOS' + binary_to_base58(new Uint8Array([...raw_public_key, ...checksum]))
  )
}

module.exports = public_key_to_wif
