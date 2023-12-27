import { deepStrictEqual } from "assert";
import crypto from "crypto";

import generateMnemonic from "../mnemonic_create.mjs";
import recoverMnemonic from "../mnemonic_recover.mjs";

export default (tests) => {
  tests.add("Mnemonic test", async () => {
    const private_key = crypto.getRandomValues(new Uint8Array(32));

    const words = await generateMnemonic(private_key);
    deepStrictEqual(
      private_key,
      await recoverMnemonic(words),
      "Invalid recovery mnemonic"
    );
  });
};
