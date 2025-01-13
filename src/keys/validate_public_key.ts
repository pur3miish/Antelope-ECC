// @ts-check

import base58_to_binary from "base58-js/base58_to_binary";
import ripemd160 from "ripemd160-js/ripemd160.js";

/**
 * Validate Antelope public key.
 * @name validate_public_key
 * @kind function
 * @param {String} wif_public_key wallet import format Antelope public key.
 * @returns {Promise<Boolean>} Returns true if valid
 */
export default async function validate_public_key(
  wif_public_key: string
): Promise<boolean> {
  let key_type;
  const key_code = [
    [75, 49],
    [82, 49],
    [87, 65],
  ];

  if (wif_public_key.startsWith("PUB_K1_")) key_type = 0;
  else if (wif_public_key.startsWith("PUB_R1_")) key_type = 1;
  else if (wif_public_key.startsWith("PUB_WA_")) key_type = 2;
  else
    throw new Error("Public keys need to start with PUB_K1, PUB_R1 or PUB_WA.");

  let public_key = wif_public_key
    .replace("PUB_K1_", "")
    .replace("PUB_R1_", "")
    .replace("PUB_WA_", "");

  const base58_str = base58_to_binary(public_key);
  const checksum_check = base58_str.slice(-4);

  const checksum = await ripemd160(
    Uint8Array.from([...base58_str.slice(0, -4), ...key_code[key_type]])
  );

  for (let i = 0; i < 4; i++)
    if (checksum[i] !== checksum_check[i]) throw new Error("Invalid checksum");

  return true;
}
