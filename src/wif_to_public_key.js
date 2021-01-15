const ripemd160 = require('@relocke/ripemd160')
const base58_to_binary = require('base58-js/public/base58_to_binary')

const wif_to_public_key = async wif_public_key => {
  if (!wif_public_key.startsWith('EOS'))
    throw new Error('Public key should start with EOS')

  const whole = base58_to_binary(wif_public_key.replace('EOS', ''))
  const raw_public_key = whole.slice(0, -4)
  const checksum = whole.slice(-4)

  ripemd160(raw_public_key)
    .slice(0, 4)
    .forEach((i, x) => {
      if (i != checksum[x]) throw new Error('Invalid public key checksum.')
    })

  return raw_public_key
}

module.exports = wif_to_public_key
