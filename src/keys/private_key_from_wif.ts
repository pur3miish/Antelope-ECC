import base58_to_binary from "base58-js/base58_to_binary";

/**
 * Converts an Antelope WIF private key (PVT_K1) into its corresponding 32 byte binary representation.
 */
export default function private_key_from_wif(private_key: string): Uint8Array {
  if (!private_key.startsWith("PVT_K1_"))
    throw new Error("Antelope private key must start with “PVT_K1_”");
  return base58_to_binary(private_key.replace("PVT_K1_", "")).slice(0, -4);
}
