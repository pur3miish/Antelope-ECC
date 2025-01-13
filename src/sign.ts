import binary_to_base58 from "base58-js/binary_to_base58.js";
import sign_secp256k1 from "isomorphic-secp256k1-js/sign.js";
import ripemd160 from "ripemd160-js/ripemd160.js";

import wif_to_private_key from "./keys/private_key_from_wif.js";

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
export default async function sign({
  hash,
  wif_private_key,
}: sign_txn_args): Promise<string> {
  const private_key = wif_to_private_key(wif_private_key);
  let hash_array: Uint8Array;
  // Handle the case where hash is a string
  if (typeof hash === "string") {
    const hashMatches = hash.match(/[a-fA-F0-9]{2}/gmu);
    if (hashMatches)
      hash_array = Uint8Array.from(
        hashMatches.map((i) => Number(`0x${i}`))
      ) as Uint8Array;
    else throw new Error("Invalid hash format.");
  } else if (hash instanceof Uint8Array) hash_array = hash;
  else throw new Error("Hash must be a string or a Uint8Array.");

  const { r, s, v } = await sign_secp256k1({ hash: hash_array, private_key });

  const i = 31 + Number(v); // compressed (4) + compact key(27).
  const K1 = [75, 49]; // K1 as ascii
  const raw_sig = [i, ...r, ...s];

  const ripe_hash = await ripemd160(Uint8Array.from([...raw_sig, ...K1]));
  const checksum = ripe_hash.slice(0, 4);

  const base58_sig = binary_to_base58(
    Uint8Array.from([...raw_sig, ...checksum])
  );

  return "SIG_K1_" + base58_sig;
}
