type recover_public_key_args = {
    signature: string;
    hash: string | Uint8Array;
};
/**
 * Recovers an Antelope secp256k1 public key from K1 signature.
 */
export default function recover_public_key({ signature, hash, }: recover_public_key_args): Promise<string>;
export {};
