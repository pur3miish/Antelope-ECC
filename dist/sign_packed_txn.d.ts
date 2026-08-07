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
export default function sign_packed_txn({ chain_id, transaction_header, transaction_body, wif_private_key, extension, }: sign_packed_txn_args): Promise<string>;
export {};
