import public_key_to_wif from "./public_key_to_wif.mjs";
import wif_to_public_key from "./wif_to_public_key.mjs";

export default async function public_key_to_legacy(legacy_key) {
  return public_key_to_wif(await wif_to_public_key(legacy_key));
}
