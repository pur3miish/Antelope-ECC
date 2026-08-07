import base58_to_binary from "base58-js/base58_to_binary.js";
import recover_public from "isomorphic-secp256k1-js/recover_public_key.js";

import public_key_to_wif from "./keys/public_key_to_wif.js";

type RecoverPublicKeyArgs = {
  signature: string;
  hash: string | Uint8Array;
};

/**
 * Recovers an Antelope secp256k1 public key from a K1 signature.
 */
export default function recover_public_key({
  signature,
  hash,
}: RecoverPublicKeyArgs): string {
  let hash_array: Uint8Array;

  if (typeof hash === "string") {
    if (!/^[0-9a-fA-F]{64}$/.test(hash)) {
      throw new Error("Hash must be exactly 32 bytes of hexadecimal data.");
    }

    hash_array = Uint8Array.from(
      hash.match(/.{2}/g)!.map((byte) => Number.parseInt(byte, 16)),
    );
  } else if (hash instanceof Uint8Array) {
    if (hash.length !== 32) {
      throw new Error("Hash must be exactly 32 bytes.");
    }

    hash_array = hash;
  } else {
    throw new TypeError("Hash must be a hexadecimal string or Uint8Array.");
  }

  if (!signature.startsWith("SIG_K1_")) {
    throw new TypeError("Signature must start with SIG_K1_.");
  }

  const raw_sig = base58_to_binary(signature.replace("SIG_K1_", "")).slice(
    0,
    -4,
  );

  const v = raw_sig[0] - 31;
  const r = raw_sig.slice(1, 33);
  const s = raw_sig.slice(33, 65);

  return public_key_to_wif(
    recover_public({
      hash: hash_array,
      signature: { r, s, v },
    }),
  );
}
