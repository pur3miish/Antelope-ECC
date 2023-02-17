import private_key_to_wif from "./private_key_to_wif.mjs";
import wif_to_private_key from "./wif_to_private_key.mjs";

export default async function private_key_to_legacy(legacy_key) {
  return private_key_to_wif(await wif_to_private_key(legacy_key));
}
