/**
 * Validate an Antelope private key.
 * @name validate_private_key
 * @kind function
 * @param {String} wif_private_key base58 private key
 * @returns {Promise<boolean>} validation message.
 */
export default function validate_private_key(wif_private_key: string): Promise<boolean>;
