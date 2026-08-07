import { rm } from "node:fs/promises";

// Keep this allowlist synchronized with TypeScript files under src/. Only
// compiler outputs are removed; source, tests, and package metadata are never
// selected by this script.
const generated_module_stems = [
  "index",
  "internal/mnemonic-words",
  "internal/random_bytes",
  "internal/sign_graphene_compatible",
  "keys/legacy_from_private_key",
  "keys/legacy_from_public_key",
  "keys/legacy_to_private_key",
  "keys/legacy_to_public_key",
  "keys/private_key_from_wif",
  "keys/private_key_to_wif",
  "keys/public_key_from_private_wif",
  "keys/public_key_from_wif",
  "keys/public_key_to_wif",
  "keys/validate_private_key",
  "keys/validate_public_key",
  "mnemonic_create",
  "mnemonic_recover",
  "new_keys",
  "recover_public_key",
  "sign_packed_txn",
  "sign",
];

const generated_files = generated_module_stems.flatMap((stem) => [
  `${stem}.js`,
  `${stem}.d.ts`,
]);

await Promise.all(
  generated_files.map((file) =>
    rm(new URL(`../${file}`, import.meta.url), { force: true }),
  ),
);
