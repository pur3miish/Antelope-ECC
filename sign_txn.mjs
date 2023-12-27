import binary_to_base58 from "base58-js/binary_to_base58.mjs";
import sign from "isomorphic-secp256k1-js/sign.mjs";
import ripemd160 from "ripemd160-js/ripemd160.mjs";

import wif_to_private_key from "./keys/private_key_from_wif.mjs";

/**
 * Generate an Antelope K1 signature.
 * @kind function
 * @name sign_txn
 * @param {object} arg Argument.
 * @param {String | Uint8Array} arg.hash 32 bytes message digest to sign.
 * @param {String} arg.wif_private_key An Antelope private key.
 * @returns {Promise<String>} Signature SIG_K1.
 */
export default async function sign_txn({ hash, wif_private_key }) {
  const private_key = await wif_to_private_key(wif_private_key);

  const _hash =
    typeof hash == "string"
      ? Uint8Array.from(
          hash.match(/[a-fA-F0-9]{2}/gmu).map((i) => Number(`0x${i}`))
        )
      : hash;

  const { r, s, v } = await sign({
    hash: _hash,
    private_key,
  });

  const i = 31 + Number(v); // compressed (4) + compact key(27).
  const K1 = [75, 49]; // K1 as ascii
  const raw_sig = [i, ...r, ...s];

  const ripe_hash = await ripemd160(Uint8Array.from([...raw_sig, ...K1]));
  const checksum = ripe_hash.slice(0, 4);

  const base58_sig = binary_to_base58(
    // @ts-ignore
    Uint8Array.from([...raw_sig, ...checksum])
  );

  return "SIG_K1_" + base58_sig;
}
