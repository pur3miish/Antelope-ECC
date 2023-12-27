import assert from "assert";

const { deepStrictEqual, rejects } = assert;

import public_key_from_wif from "../keys/public_key_from_wif.mjs";

export default (tests) => {
  tests.add("wif to public key", async () => {
    deepStrictEqual(
      Uint8Array.from([
        3, 245, 8, 235, 71, 164, 231, 81, 171, 37, 106, 252, 147, 80, 118, 233,
        98, 63, 92, 244, 8, 9, 151, 59, 198, 194, 135, 207, 218, 207, 63, 18,
        13,
      ]),
      await public_key_from_wif(
        "PUB_K1_8h9ch3qgLFZY9DBF3ius7HjJL9SBLgNPFTZZkTfy3r3XCF9V86"
      ),
      "Expected output for wif_to_public_key using PUB_K1"
    );

    rejects(async () => {
      await public_key_from_wif(
        "PUB6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDWAAA"
      );
    }, "Expected rejection");
  });
};
