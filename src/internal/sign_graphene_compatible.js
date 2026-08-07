import hmac_sha256 from "isomorphic-secp256k1-js/hmac_sha256.js";
import sha256 from "isomorphic-secp256k1-js/sha256.js";
import sign_standard from "isomorphic-secp256k1-js/sign.js";
import { array_to_number, blinded_multiply, concat_bytes, get_mod, hash_to_scalar, mul_inverse, number_to_array, secp256k1, validate_hash, validate_private_key, verify_signature_point, } from "isomorphic-secp256k1-js/utils.js";
const MAX_GRAPHENE_RETRIES = 1024;
/**
 * Historical Graphene/BitShares policy: the minimally encoded positive DER
 * integer corresponding to a fixed-width component must be exactly 32 bytes.
 * This is an Antelope compatibility rule, not an ECDSA validity requirement.
 */
function has_32_byte_positive_der_encoding(component) {
    return ((component[0] & 0x80) === 0 &&
        !(component[0] === 0 && (component[1] & 0x80) === 0));
}
function satisfies_graphene_policy(signature) {
    return (has_32_byte_positive_der_encoding(signature.r) &&
        has_32_byte_positive_der_encoding(signature.s));
}
async function hmac_and_erase_data(data, key) {
    try {
        return await hmac_sha256(data, key);
    }
    finally {
        data.fill(0);
    }
}
async function sha256_and_erase_data(data) {
    try {
        return await sha256(data);
    }
    finally {
        data.fill(0);
    }
}
/**
 * Reproduce the deterministic retry construction used by Antelope-ECC 4.x.
 * The alternate digest affects RFC 6979 nonce derivation only; ECDSA always
 * signs the original transaction digest.
 */
async function sign_retry(private_key, hash, attempt, private_scalar) {
    let nonce_digest = new Uint8Array(0);
    let seed = new Uint8Array(0);
    let key = new Uint8Array(32);
    let value = new Uint8Array(32).fill(1);
    try {
        nonce_digest = await sha256_and_erase_data(concat_bytes(hash, new Uint8Array(attempt)));
        seed = concat_bytes(private_key, nonce_digest);
        let next_key = await hmac_and_erase_data(concat_bytes(value, Uint8Array.of(0), seed), key);
        key.fill(0);
        key = next_key;
        value = await hmac_and_erase_data(value, key);
        next_key = await hmac_and_erase_data(concat_bytes(value, Uint8Array.of(1), seed), key);
        key.fill(0);
        key = next_key;
        value = await hmac_and_erase_data(value, key);
        const message_scalar = hash_to_scalar(hash);
        const generator = { x: secp256k1.x, y: secp256k1.y };
        for (;;) {
            value = await hmac_and_erase_data(value, key);
            const nonce = array_to_number(value);
            if (nonce > 0n && nonce < secp256k1.n) {
                const nonce_point = blinded_multiply(generator, nonce);
                const r = get_mod(nonce_point.x, secp256k1.n);
                if (r !== 0n) {
                    let s = get_mod(mul_inverse(nonce, secp256k1.n) *
                        (message_scalar + r * private_scalar), secp256k1.n);
                    if (s !== 0n) {
                        let recovery = (nonce_point.x === r ? 0 : 2) | Number(nonce_point.y & 1n);
                        if (s > secp256k1.n / 2n) {
                            s = secp256k1.n - s;
                            recovery ^= 1;
                        }
                        return {
                            r: number_to_array(r),
                            s: number_to_array(s),
                            v: recovery,
                        };
                    }
                }
            }
            next_key = await hmac_and_erase_data(concat_bytes(value, Uint8Array.of(0)), key);
            key.fill(0);
            key = next_key;
            value = await hmac_and_erase_data(value, key);
        }
    }
    finally {
        nonce_digest.fill(0);
        seed.fill(0);
        key.fill(0);
        value.fill(0);
    }
}
/**
 * Sign using standard RFC 6979 ECDSA first, then apply Antelope's inherited
 * Graphene/BitShares rejection-and-retry policy when the first signature does
 * not have the historical component encoding shape.
 */
export default async function sign_graphene_compatible({ private_key, hash, }) {
    const private_key_bytes = Uint8Array.from(private_key);
    const hash_bytes = Uint8Array.from(hash);
    try {
        validate_private_key(private_key_bytes);
        validate_hash(hash_bytes);
        const standard_signature = await sign_standard({
            private_key: private_key_bytes,
            hash: hash_bytes,
        });
        if (satisfies_graphene_policy(standard_signature)) {
            return standard_signature;
        }
        const private_scalar = array_to_number(private_key_bytes);
        const public_point = blinded_multiply({ x: secp256k1.x, y: secp256k1.y }, private_scalar);
        for (let attempt = 1; attempt <= MAX_GRAPHENE_RETRIES; attempt += 1) {
            const signature = await sign_retry(private_key_bytes, hash_bytes, attempt, private_scalar);
            if (!satisfies_graphene_policy(signature))
                continue;
            if (!verify_signature_point(hash_bytes, signature, public_point, true)) {
                throw new Error("Generated Antelope signature failed verification.");
            }
            return signature;
        }
        throw new Error("Antelope signature compatibility retry limit exceeded.");
    }
    finally {
        private_key_bytes.fill(0);
        hash_bytes.fill(0);
    }
}
