import binary_to_base58 from "base58-js/binary_to_base58.js";
import { ripemd160 } from "ripemd160-js";

import sign_graphene_compatible from "./internal/sign_graphene_compatible.js";
import private_key_from_wif from "./keys/private_key_from_wif.js";

type SignArgs = {
  /**
   * Exact 32-byte message digest.
   *
   * May be supplied as a Uint8Array or 64-character
   * hexadecimal string.
   */
  hash: string | Uint8Array;

  /**
   * Antelope PVT_K1_ private key.
   */
  wif_private_key: string;
};

function is_uint8_array(
  value: unknown,
): value is Uint8Array {
  return (
    ArrayBuffer.isView(value) &&
    Object.prototype.toString.call(value) ===
      "[object Uint8Array]"
  );
}

function parse_hash(
  hash: string | Uint8Array,
): Uint8Array {
  if (typeof hash === "string") {
    if (!/^[0-9a-fA-F]{64}$/.test(hash)) {
      throw new Error(
        "Hash must be exactly 32 bytes of hexadecimal data.",
      );
    }

    const output = new Uint8Array(32);

    for (let i = 0; i < output.length; i += 1) {
      output[i] = Number.parseInt(
        hash.slice(i * 2, i * 2 + 2),
        16,
      );
    }

    return output;
  }

  if (is_uint8_array(hash)) {
    if (hash.length !== 32) {
      throw new RangeError(
        "Hash must be exactly 32 bytes.",
      );
    }

    return Uint8Array.from(hash);
  }

  throw new TypeError(
    "Hash must be a hexadecimal string or Uint8Array.",
  );
}

/**
 * Generates an Antelope SIG_K1_ signature for an exact
 * 32-byte message digest.
 *
 * Antelope's historical Graphene/BitShares compact-canonical
 * compatibility policy is applied automatically.
 */
export default async function sign({
  hash,
  wif_private_key,
}: SignArgs): Promise<string> {
  const private_key =
    private_key_from_wif(wif_private_key);

  const hash_array = parse_hash(hash);

  const { r, s, v } =
    await sign_graphene_compatible({
      hash: hash_array,
      private_key,
    });

  const recovery_byte = 31 + Number(v);
  const K1 = [75, 49];

  const raw_signature = [
    recovery_byte,
    ...r,
    ...s,
  ];

  const checksum = ripemd160(
    Uint8Array.from([
      ...raw_signature,
      ...K1,
    ]),
  ).slice(0, 4);

  return (
    "SIG_K1_" +
    binary_to_base58(
      Uint8Array.from([
        ...raw_signature,
        ...checksum,
      ]),
    )
  );
}
