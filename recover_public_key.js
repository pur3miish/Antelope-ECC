import base58_to_binary from "base58-js/base58_to_binary.js";
import recover_public from "isomorphic-secp256k1-js/recover_public_key.js";
import public_key_to_wif from "./keys/public_key_to_wif.js";
/**
 * Recovers an Antelope secp256k1 public key from K1 signature.
 */
export default async function recover_public_key({ signature, hash, }) {
    let hash_array;
    // Handle the case where hash is a string
    if (typeof hash === "string") {
        const hashMatches = hash.match(/[a-fA-F0-9]{2}/gmu);
        if (hashMatches) {
            hash_array = Uint8Array.from(hashMatches.map((i) => Number(`0x${i}`)));
        }
        else {
            throw new Error("Invalid hash format.");
        }
    }
    // Handle the case where hash is already a Uint8Array
    else if (hash instanceof Uint8Array) {
        hash_array = hash;
    }
    // Throw an error if hash is neither a string nor Uint8Array
    else {
        throw new Error("Hash must be a string or a Uint8Array.");
    }
    if (!signature?.startsWith("SIG_K1_"))
        throw new TypeError("Signature must start with “SIG_K1_”");
    const raw_sig = base58_to_binary(signature.replace("SIG_K1_", "")).slice(0, -4);
    const v = raw_sig.slice(0, 1)[0] - 31;
    const r = raw_sig.slice(1, 33);
    const s = raw_sig.slice(33, 65);
    return public_key_to_wif(await recover_public({ hash: hash_array, signature: { r, s, v } }));
}
