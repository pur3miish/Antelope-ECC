import { deepStrictEqual, throws } from "assert";
import sha256 from "isomorphic-secp256k1-js/sha256.js";

import legacy_from_public_key from "../src/keys/legacy_from_public_key.js";
import legacy_to_public_key from "../src/keys/legacy_to_public_key.js";
import public_key_from_wif from "../src/keys/public_key_from_wif.js";
import public_key_to_wif from "../src/keys/public_key_to_wif.js";
import recover_public_key from "../src/recover_public_key.js";

const VALID_SIGNATURE =
  "SIG_K1_KkdPezk36k4k6jaPHUuvux7ZFvnp5gXSazvUHWRBpJ15Wyys5gEXm56QrzwtyWfd4Abe13DHS7Z1b7kfKxJScT5q9C237S";

it("recovers secp256k1 public keys", async () => {
  const hash = await sha256(Uint8Array.from([255]));

  const recovered = recover_public_key({
    signature: VALID_SIGNATURE,
    hash,
  });

  const expected = public_key_to_wif(
    legacy_to_public_key(
      "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
    ),
  );

  deepStrictEqual(
    legacy_from_public_key(
      public_key_from_wif(
        "PUB_K1_6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5BoDq63",
      ),
      "EOS",
    ),
    "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
  );

  deepStrictEqual(recovered, expected);
});

it("rejects malformed signatures", () => {
  throws(() =>
    recover_public_key({
      signature: "NOT_GONNA_WORK",
      hash: new Uint8Array(32),
    }),
  );
});

it("rejects corrupted SIG_K1 checksums", async () => {
  const hash = await sha256(Uint8Array.from([255]));

  const final_character = VALID_SIGNATURE.at(-1);

  const corrupted =
    VALID_SIGNATURE.slice(0, -1) + (final_character === "1" ? "2" : "1");

  throws(() =>
    recover_public_key({
      signature: corrupted,
      hash,
    }),
  );
});
