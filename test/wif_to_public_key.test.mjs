import assert from "assert";

const { deepStrictEqual, rejects } = assert;

import wif_to_public_key from "../private/wif_to_public_key.mjs";

export default (tests) => {
  tests.add("wif to public key", async () => {
    const public_key = new Uint8Array([
      2, 192, 222, 210, 188, 31, 19, 5, 251, 15, 170, 197, 230, 192, 62, 227,
      161, 146, 66, 52, 152, 84, 39, 182, 22, 124, 165, 105, 209, 61, 244, 53,
      207,
    ]);

    deepStrictEqual(
      Uint8Array.from([
        3, 245, 8, 235, 71, 164, 231, 81, 171, 37, 106, 252, 147, 80, 118, 233,
        98, 63, 92, 244, 8, 9, 151, 59, 198, 194, 135, 207, 218, 207, 63, 18,
        13,
      ]),
      await wif_to_public_key(
        "PUB_K1_8h9ch3qgLFZY9DBF3ius7HjJL9SBLgNPFTZZkTfy3r3XCF9V86"
      ),
      "Expected output for wif_to_public_key using PUB_K1"
    );

    deepStrictEqual(
      public_key,
      await wif_to_public_key(
        "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
        "Expected output PUB_K1 key"
      )
    );

    rejects(async () => {
      await wif_to_public_key(
        "PUB6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDWAAA"
      );
    }, "Expected rejection - missing EOS prefix");
    rejects(async () => {
      await wif_to_public_key(
        "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDWAAA"
      );
    }, "Expected rejection - Invalid checksum");
    rejects(async () => {
      await wif_to_public_key(
        "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDWAAA"
      );
    }, "Expected rejection - Invalid checksum");
  });
};
