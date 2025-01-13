/**
 * Convert an Antelope private key to a public key.
 * @example <caption>Usage `public_key_from_private`.</caption>
 * ```js
 * import public_key_from_private from 'antelope-ecc/public_key_from_private'
 *
 * public_key_from_private(
 *   'PVT_K1_asdf…'
 * ).then(console.log)
 * ```
 * The logged output will be PUB_K1_….
 */
export default function public_key_from_private_key(
  wif_private_key: string
): Promise<string>;
