import { deepStrictEqual, rejects, strictEqual } from "assert";

import mnemonic_create from "../src/mnemonic_create.js";
import mnemonic_recover from "../src/mnemonic_recover.js";

it("creates and recovers a BIP39 mnemonic", async () => {
  const entropy = globalThis.crypto.getRandomValues(new Uint8Array(32));

  const mnemonic = await mnemonic_create(entropy);

  deepStrictEqual(await mnemonic_recover(mnemonic), entropy);
});

it("matches the 256-bit zero entropy BIP39 vector", async () => {
  const entropy = new Uint8Array(32);

  const mnemonic = await mnemonic_create(entropy);

  const expected = [...Array(23).fill("abandon"), "art"].join(" ");

  strictEqual(mnemonic, expected);

  deepStrictEqual(await mnemonic_recover(mnemonic), entropy);
});

it("rejects a mnemonic with an invalid BIP39 checksum", async () => {
  const invalid = [...Array(24).fill("abandon")].join(" ");

  await rejects(() => mnemonic_recover(invalid), /checksum/i);
});
