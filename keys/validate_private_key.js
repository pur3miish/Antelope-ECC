// @ts-check
import base58_to_binary from "base58-js/base58_to_binary";
import ripemd160 from "ripemd160-js";
/**
 * Validate an Antelope private key.
 * @name validate_private_key
 * @kind function
 * @param {String} wif_private_key base58 private key
 * @returns {Promise<boolean>} validation message.
 */
export default async function validate_private_key(wif_private_key) {
  let key_type;
  const key_code = [
    [75, 49], // K1
    [82, 49], // R1
    [87, 65], // WA
  ];
  if (wif_private_key.startsWith("PVT_K1")) key_type = 0;
  else if (wif_private_key.startsWith("PVT_R1")) key_type = 1;
  else if (wif_private_key.startsWith("PVT_WA")) key_type = 2;
  else throw new Error("Invalid wif private key");
  const base58_str = base58_to_binary(
    wif_private_key
      .replace("PVT_K1_", "")
      .replace("PVT_R1_", "")
      .replace("PVT_WA_", "")
  );
  const checksum_check = base58_str.slice(-4);
  const checksum = await ripemd160(
    Uint8Array.from([...base58_str.slice(0, -4), ...key_code[key_type]])
  );
  for (let i = 0; i < 4; i++)
    if (checksum[i] !== checksum_check[i]) throw new Error("Invalid checksum");
  return true;
}
