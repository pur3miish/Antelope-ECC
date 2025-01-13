/**
 * Converts a binary representation of the secp256k1 compressed public key to legacy key for an antelope based blockchain.
 * @param {Uin8Array} public_key compressed secp256k1 public key.
 * @param {String} prefix the prefix to add to the start of the public public key.
 * @returns {String} WIF of legacy public key such as EOS, TELOS, WAX.
 */
export default function legacy_from_public_key(
  public_key: Uint8Array,
  prefix: string
): Promise<string>;
