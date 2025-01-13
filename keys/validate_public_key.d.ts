/**
 * Validate Antelope public key.
 * @name validate_public_key
 * @kind function
 * @param {String} wif_public_key wallet import format Antelope public key.
 * @returns {Promise<Boolean>} Returns true if valid
 */
export default function validate_public_key(wif_public_key: string): Promise<boolean>;
