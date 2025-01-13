import binary_to_base58 from "base58-js/binary_to_base58.js";
import ripemd160 from "ripemd160-js/ripemd160.js";

/**
 * Converts a binary representation of a compressed secp256k1 public key to Antelope based WIF public key (PUB_K1).
 * @param Binary representation of the secp256k1 WIF public key.
 */
export default async function public_key_to_wif(
  public_key: Uint8Array
): Promise<string> {
  const hash = await ripemd160(Uint8Array.from([...public_key, 75, 49]));
  const checksum = hash.slice(0, 4);
  return (
    "PUB_K1_" +
    binary_to_base58(
      new Uint8Array([
        ...(public_key as Uint8Array),
        ...(checksum as Uint8Array),
      ])
    )
  );
}
