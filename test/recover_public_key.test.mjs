import { deepStrictEqual, rejects } from "assert";
import sha256 from "universal-sha256-js/sha256.mjs";

import legacy_from_public_key from "../keys/legacy_from_public_key.mjs";
import legacy_to_public_key from "../keys/legacy_to_public_key.mjs";
import public_key_from_wif from "../keys/public_key_from_wif.mjs";
import public_key_to_wif from "../keys/public_key_to_wif.mjs";
import recover_public_key from "../recover_public_key.mjs";

export default (tests) => {
  tests.add("recover public keys", async () => {
    const pub_key = await recover_public_key({
      signature:
        "SIG_K1_KkdPezk36k4k6jaPHUuvux7ZFvnp5gXSazvUHWRBpJ15Wyys5gEXm56QrzwtyWfd4Abe13DHS7Z1b7kfKxJScT5q9C237S",
      hash: await sha256(Uint8Array.from([255])),
    });

    const public_key = await public_key_to_wif(
      await legacy_to_public_key(
        "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV"
      )
    );

    deepStrictEqual(
      await legacy_from_public_key(
        await public_key_from_wif(
          "PUB_K1_6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5BoDq63"
        ),
        "EOS"
      ),
      "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV"
    );

    deepStrictEqual(
      public_key,
      pub_key,
      "Expected recover public key from signature"
    );

    rejects(() =>
      recover_public_key({ signature: "NOT_GONNA_WORK", data: "ff" })
    );
  });
};
