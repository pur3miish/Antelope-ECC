// @ts-check

import base58_to_binary from "base58-js/base58_to_binary.mjs";
import get_pub from "isomorphic-secp256k1-js/recover_public_key.mjs";

import public_key_to_wif from "./keys/public_key_to_wif.mjs";

/**
 * Recovers an Antelope secp256k1 public key from K1 signature.
 * @kind function
 * @name recover_public_key
 * @param {object} Arg Argument
 * @param {String} Arg.signature Signature (SIG_K1…).
 * @param {String | Uint8Array} Arg.hash hash data that was used to create signature.
 * @param {Boolean} [Arg.legacy] Returns the key in the legacy format.
 * @returns {Promise<String>} WIF Public key.
 */
export default async function recover_public_key({ signature, hash }) {
  let hash_array;
  if (typeof hash == "string")
    hash_array = Uint8Array.from(
      hash.match(/[a-fA-F0-9]{2}/gmu).map((i) => Number(`0x${i}`))
    );
  else hash_array = hash;

  if (!signature?.startsWith("SIG_K1_"))
    throw new TypeError("Signature must start with “SIG_K1_”");

  const raw_sig = base58_to_binary(signature.replace("SIG_K1_", "")).slice(
    0,
    -4
  );

  const v = raw_sig.slice(0, 1)[0] - 31;
  const r = raw_sig.slice(1, 33);
  const s = raw_sig.slice(33, 65);

  return public_key_to_wif(
    await get_pub({
      hash: hash_array,
      signature: {
        r,
        s,
        v,
      },
    })
  );
}
