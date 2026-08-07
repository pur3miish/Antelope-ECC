/**
 * Generate an Antelope K1 signature for a given hash and wif_private_key.
 *
 * Antelope retains the compact-canonical component policy inherited from the
 * Graphene/BitShares fc library. This protocol compatibility rule is applied
 * here, outside the standards-focused isomorphic-secp256k1-js signer.
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
 * Generate an Antelope `SIG_K1_` signature for an exact 32-byte digest.
 * The inherited Graphene/BitShares component policy is automatic and is not a
 * caller-selectable ECDSA mode.
 */
export default function sign({ hash, wif_private_key, }: sign_txn_args): Promise<string>;
export {};
