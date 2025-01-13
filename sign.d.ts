/**
 * Generate an Antelope K1 signature for a given hash and wif_private_key
 * @kind function
 * @name sign_txn
 * @param {object} arg Argument.
 * @param {String | Uint8Array} arg.hash
 * @param {String} arg.wif_private_key An Antelope private key.
 * @returns {Promise<String>} Signature SIG_K1.
 */
type sign_txn_args = {
    /**
     * 32 bytes message digest to sign, can be Uint8Array or hexadecimal string.
     */
    hash: string | Uint8Array;
    /**
     * Wallet import format private key, PVT_K1_ format
     */
    wif_private_key: string;
};
/**
 * Generate an Antelope K1 signature for a given hash and wif_private_key
 */
export default function sign({ hash, wif_private_key, }: sign_txn_args): Promise<string>;
export {};
