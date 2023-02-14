import { deepStrictEqual, rejects } from "assert";

import recover_EOS_public_key from "../recover_public_key_from_signature.mjs";

export default (tests) => {
  tests.add("new eos keys", async () => {
    const pub_key = await recover_EOS_public_key({
      signature:
        "SIG_K1_KkdPezk36k4k6jaPHUuvux7ZFvnp5gXSazvUHWRBpJ15Wyys5gEXm56QrzwtyWfd4Abe13DHS7Z1b7kfKxJScT5q9C237S",
      hex: "FF",
      legacy: true,
    });

    const public_key = "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV";

    deepStrictEqual(
      public_key,
      pub_key,
      "Expected recover public key from signature"
    );

    rejects(() =>
      recover_EOS_public_key({ signature: "NOT_GONNA_WORK", data: "ff" })
    );
  });
};
