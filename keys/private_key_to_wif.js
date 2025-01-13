import binary_to_base58 from "base58-js/binary_to_base58";
import ripemd160 from "ripemd160-js/ripemd160.js";
/**
 * Converts a private key 32 byte binary array into an Antelope based WIF private key.
 * @param {Uint8Array} private_key Binary private key.
 * @returns {String} Antelope based WIF private key.
 */
export default async function private_key_to_wif(private_key) {
    const checksum = await ripemd160(Uint8Array.from([...private_key, 75, 49]));
    return ("PVT_K1_" +
        binary_to_base58(Uint8Array.from([...private_key, ...checksum.slice(0, 4)])));
}
