/**
 * Convert an Antelope private key WIF to a public key WIF.
 * @example <caption>Usage `public_key_from_private_wif`.</caption>
 * ```js
 * import public_key_from_private_wif from 'antelope-ecc/public_key_from_private_wif'
 *
 * public_key_from_private_wif(
 *   'PVT_K1_asdf…'
 * ).then(console.log)
 * ```
 * The logged output will be PUB_K1_….
 */
export default function public_key_from_private_wif(wif_private_key: string): Promise<string>;
