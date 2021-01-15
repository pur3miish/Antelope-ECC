const base58_to_binary = require('base58-js/public/base58_to_binary')
const sha256 = require('./sha256')

const wif_to_private_key = async wif_private_key => {
  const priv_key = base58_to_binary(wif_private_key)
  const raw_priv_key = priv_key.slice(0, 33)
  const checksum = priv_key.slice(-4)
  const checksum_hash = await sha256(await sha256(raw_priv_key))
  if (checksum_hash.slice(0, 4).filter((x, i) => x != checksum[i]).length)
    throw new Error('Invalid wif private key - checksum mismatch')
  return raw_priv_key.slice(1, 33)
}

module.exports = wif_to_private_key
