import base58_to_binary from "base58-js/base58_to_binary.js";
/**
 * Converts an Antelope based public key into its binary representation.
 * @param {String} wif_public_key Antelope based public key
 * @returns {Uint8Array} Compressed Binary representation of the secp256k1 WIF public key.
 */
export default function public_key_from_wif(wif_public_key) {
    if (!wif_public_key.startsWith("PUB_K1_"))
        throw new Error("Expected public key to start with PUB_K1_");
    return base58_to_binary(wif_public_key.replace("PUB_K1_", "")).slice(0, -4);
}
