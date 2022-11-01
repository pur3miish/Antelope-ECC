'use strict'

const sign_tnx = require('./sign_txn.js')

/**
 * Generate an EOSIO signature for a packed transaction object.
 * @kind function
 * @name sign_packed_txn
 * @param {object} PackedTxn Packed EOSIO transaction object.
 * @param {string} PackedTxn.chain_id ID specifiying what chain we are operating on.
 * @param {string} PackedTxn.transaction_header Serialised transaction header.
 * @param {string} PackedTxn.transaction_body Serialised transaction body.
 * @param {string} PackedTxn.wif_private_key EOSIO private key (wallet import format).
 * @returns {string} Signature
 * @example <caption>Ways to `import`.</caption>
 * ```js
 * import { sign_packed_txn } from 'eos-ecc'
 * ```
 * @example <caption>Ways to `require`.</caption>
 * ```js
 * const { sign_packed_txn } = require('eos-ecc')
 * ```
 * @example <caption>Usage `sign_packed_txn`.</caption>
 * ```js
 * sign_packed_txn(
 *  {
 *    chain_id: '2a02a0053…',
 *    transaction_header: 'fa123232…',
 *    transaction_body: 'fa45ffa2…',
 *    wif_private_key: '5f…'
 *  }
 *)
 * ```
 * The logged output was SIG_K1_….
 */
async function sign_packed_txn({
  chain_id,
  transaction_header,
  transaction_body,
  wif_private_key
}) {
  return sign_tnx({
    hex: chain_id + transaction_header + transaction_body,
    wif_private_key
  })
}

module.exports = sign_packed_txn
