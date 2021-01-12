const base58_to_binary = require('@relocke/base58/src/base58_to_binary')
const ripemd160 = require('@relocke/ripemd160')
const verify_signature = require('secp256k1-js/src/verify_signature')
const sha256 = require('./sha256')
const wif_to_public_key = require('./wif_to_public_key')

const verify_eos_signature = async ({ wif_public_key, signature, hash }) => {
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
