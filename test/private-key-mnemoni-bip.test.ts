import { deepStrictEqual } from "assert";
import crypto from "crypto";

import generateMnemonic from "../src/mnemonic_create";
import recoverMnemonic from "../src/mnemonic_recover";

it("Mnemonic test", async () => {
  const private_key = crypto.getRandomValues(new Uint8Array(32));

  const words = await generateMnemonic(private_key);
  deepStrictEqual(
    private_key,
    await recoverMnemonic(words),
    "Invalid recovery mnemonic"
  );
});
