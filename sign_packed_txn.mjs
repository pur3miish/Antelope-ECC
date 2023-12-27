import sha256 from "universal-sha256-js/sha256.mjs";

import sign_tnx from "./sign_txn.mjs";

/**
 * Generate an Antelope/EOSIO signature for a packed transaction object.
 * @kind function
 * @name sign_packed_txn
 * @param {object} PackedTxn Packed transaction object.
 * @param {String} PackedTxn.chain_id ID specifiying what chain.
 * @param {String} PackedTxn.transaction_header Serialised transaction header.
 * @param {String} PackedTxn.transaction_body Serialised transaction body.
 * @param {String} PackedTxn.wif_private_key Private key (wallet import format).
 * @param {String} [PackedTxn.extension] Extension
 * @returns {Promise<String>} Signature
 */
export default async function sign_packed_txn({
  chain_id,
  transaction_header,
  transaction_body,
  wif_private_key,
  extension = "0000000000000000000000000000000000000000000000000000000000000000",
}) {
  return sign_tnx({
    hash: await sha256(
      Uint8Array.from(
        String(chain_id + transaction_header + transaction_body + extension)
          .match(/[a-fA-F0-9]{2}/gmu)
          .map((i) => Number(`0x${i}`))
      )
    ),
    wif_private_key,
  });
}
