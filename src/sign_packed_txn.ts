import sha256 from "isomorphic-secp256k1-js/sha256.js";

import sign_tnx from "./sign.js";

type sign_packed_txn_args = {
  /**
   * ID specifying which chain the transaction is for.
   */
  chain_id: string;
  /**
   * Serialised transaction header as hexadecimal string.
   */
  transaction_header: string;
  /**
   * Serialised transaction body as hexadecimal string.
   */
  transaction_body: string;
  /**
   * Private key PVT_K1_ (wallet import format).
   */
  wif_private_key: string;
  extension?: string;
};

/**
 * Generate an Antelope/EOSIO signature for a packed transaction object.
 */
export default async function sign_packed_txn({
  chain_id,
  transaction_header,
  transaction_body,
  wif_private_key,
  extension = "0000000000000000000000000000000000000000000000000000000000000000",
}: sign_packed_txn_args): Promise<string> {
  const inputString =
    chain_id + transaction_header + transaction_body + extension;
  const hashArray = inputString.match(/[a-fA-F0-9]{2}/gmu);
  if (!hashArray)
    throw new Error("Invalid input string, could not generate hash.");

  return sign_tnx({
    hash: await sha256(Uint8Array.from(hashArray.map((i) => Number(`0x${i}`)))),
    wif_private_key,
  });
}
