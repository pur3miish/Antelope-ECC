import sha256 from "isomorphic-secp256k1-js/sha256.js";

import sign from "./sign.js";

type SignPackedTransactionArgs = {
  /** 32-byte Antelope chain ID as hexadecimal. */
  chain_id: string;

  /** Serialized transaction header as hexadecimal. */
  transaction_header: string;

  /** Serialized transaction body as hexadecimal. */
  transaction_body: string;

  /** Antelope PVT_K1_ private key. */
  wif_private_key: string;

  /**
   * SHA-256 hash of serialized context-free data.
   *
   * Defaults to 32 zero bytes when no context-free data
   * is present.
   */
  context_free_data_hash?: string;
};

const EMPTY_CONTEXT_FREE_DATA_HASH = "0".repeat(64);

function assert_fixed_hex(
  value: unknown,
  bytes: number,
  name: string,
): asserts value is string {
  if (
    typeof value !== "string" ||
    value.length !== bytes * 2 ||
    !/^[0-9a-fA-F]+$/.test(value)
  ) {
    throw new Error(
      `${name} must be exactly ${bytes} bytes of hexadecimal data.`,
    );
  }
}

function assert_hex_bytes(
  value: unknown,
  name: string,
): asserts value is string {
  if (
    typeof value !== "string" ||
    value.length % 2 !== 0 ||
    !/^[0-9a-fA-F]*$/.test(value)
  ) {
    throw new Error(
      `${name} must contain an even number of hexadecimal characters.`,
    );
  }
}

function hex_to_bytes(hex: string): Uint8Array {
  const output = new Uint8Array(hex.length / 2);

  for (let i = 0; i < output.length; i += 1) {
    output[i] = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }

  return output;
}

/**
 * Generates an Antelope signature for a serialized
 * packed transaction.
 */
export default async function sign_packed_txn({
  chain_id,
  transaction_header,
  transaction_body,
  wif_private_key,
  context_free_data_hash = EMPTY_CONTEXT_FREE_DATA_HASH,
}: SignPackedTransactionArgs): Promise<string> {
  assert_fixed_hex(chain_id, 32, "chain_id");

  assert_fixed_hex(context_free_data_hash, 32, "context_free_data_hash");

  assert_hex_bytes(transaction_header, "transaction_header");

  assert_hex_bytes(transaction_body, "transaction_body");

  const signing_preimage =
    chain_id + transaction_header + transaction_body + context_free_data_hash;

  const digest = await sha256(hex_to_bytes(signing_preimage));

  return sign({
    hash: digest,
    wif_private_key,
  });
}
