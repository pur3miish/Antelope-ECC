import { deepStrictEqual, ok } from "assert";

import public_key_from_private from "../src/keys/public_key_from_private_wif";
import new_keys from "../src/new_keys";

it("generates and derives Antelope secp256k1 keys", () => {
  const random_keys = new_keys();

  ok(
    random_keys.public_key === public_key_from_private(random_keys.private_key),
    "Public key from private key error",
  );

  deepStrictEqual(
    {
      public_key: "PUB_K1_7ctPksfNcaA5W47DSwFY8DnRTwnuDPMFQJXBgwVD5p9XHmKxTt",
      private_key: "PVT_K1_SkB92YpWm4Q1NLo8prcWuTogeiEehW583FT8APBTPSeMiZnh",
    },
    new_keys(
      Uint8Array.from([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21,
        22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
      ]),
    ),
  );

  const random_keys2 = new_keys();

  ok(
    random_keys2.public_key ===
      public_key_from_private(random_keys2.private_key),
  );
});
