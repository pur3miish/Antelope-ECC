// @ts-check

import base58_to_binary from "base58-js/base58_to_binary.mjs";
import get_pub from "isomorphic-secp256k1-js/recover_public_key.mjs";

import public_key_to_wif from "./public_key_to_wif.mjs";

/**
 * Recovers an Antelope/EOSIO public key from a signature.
 * @kind function
 * @name recover_public_key
 * @param {object} Arg Argument
 * @param {String} Arg.signature Signature (SIG_K1…).
 * @param {String} Arg.hex Hex data that was used to create signature.
 * @param {Boolean} [Arg.legacy] Returns the key in the legacy format.
 * @returns {Promise<String>} WIF Public key.
 * @example <caption>Usage `public_key_from_private`.</caption>
 * ```js
 * import recover_public_key from 'eosio-ecc/recover_public_key.mjs'
 *
 * recover_public_key({
 *   signature: 'SIG_K1_…',
 *   data: "ff"
 * }).then(console.log)
 * ```
 * The logged output will be PUB_K1….
 */
export default async function recover_public_key({
  signature,
  hex,
  legacy = false,
}) {
  let hex_array;
  if (typeof hex == "string")
    hex_array = Uint8Array.from(
      hex.match(/[a-fA-F0-9]{2}/gmu).map((i) => Number(`0x${i}`))
    );
  else hex_array = hex;

  if (!signature?.startsWith("SIG_K1_"))
    throw new TypeError("Invalid EOS signature, must start with “SIG_K1_”");

  const raw_sig = base58_to_binary(signature.replace("SIG_K1_", "")).slice(
    0,
    -4
  );

  const v = raw_sig.slice(0, 1)[0] - 31;
  const r = raw_sig.slice(1, 33);
  const s = raw_sig.slice(33, 65);

  return public_key_to_wif(
    await get_pub({
      data: hex_array,
      signature: {
        r,
        s,
        v,
      },
    }),
    legacy
  );
}
