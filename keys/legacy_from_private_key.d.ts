/**
 * Converts a private key into a legacy antelope/EOS key.
 * @param {Uint8Array} private_key Compressed private key
 * @returns {String} WIF private key.
 */
export default function legacy_from_private_key(
  private_key: Uint8Array
): Promise<string>;
