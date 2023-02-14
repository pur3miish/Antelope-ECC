// @ts-check

import { binary_to_base58 } from "base58-js";
import { sign } from "isomorphic-secp256k1-js";
import ripemd160 from "ripemd160-js";

import wif_to_private_key from "./private/wif_to_private_key.mjs";

/**
 * Generate an Antelope/EOSIO signature.
 * @kind function
 * @name sign_txn
 * @param {object} arg Argument.
 * @param {string | Uint8Array} arg.hex Data to sign.
 * @param {string} arg.wif_private_key An Antelope or EOSIO private key.
 * @returns {Promise<string>} Signature.
 * @example <caption>Usage of `sign_txn`.</caption>
 * ```js
 * import sign_txn  from 'eos-ecc/sign_txn.mjs'
 *
 * sign_txn({
 *   hex: FDFDFDFD,
 *   wif_private_key: 'PUB_K1_43…'
 * }).then(console.log)
 * ```
 * The logged output will be SIG_K1_…
 */
export default async function sign_txn({ hex, wif_private_key }) {
  const private_key = await wif_to_private_key(wif_private_key);

  let hex_array;
  if (typeof hex == "string")
    hex_array = Uint8Array.from(
      hex.match(/[a-fA-F0-9]{2}/gmu).map((i) => Number(`0x${i}`))
    );
  else hex_array = hex;

  const { r, s, v } = await sign({ data: hex_array, private_key });

  const i = 31 + Number(v); // compressed (4) + compact key(27).
  const K1 = [75, 49]; // K1 as ascii
  const raw_sig = [i, ...r, ...s];

  const hash = await ripemd160(Uint8Array.from([...raw_sig, ...K1]));
  const checksum = hash.slice(0, 4);

  const base58_sig = binary_to_base58(
    Uint8Array.from([...raw_sig, ...checksum])
  );

  return "SIG_K1_" + base58_sig;
}
