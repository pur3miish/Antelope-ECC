import { deepStrictEqual } from "assert";

import legacy_to_private_key from "../src/keys/legacy_to_private_key.js";
import private_key_from_wif from "../src/keys/private_key_from_wif.js";
import private_key_to_wif from "../src/keys/private_key_to_wif.js";

export default (tests) => {
  tests.add("wif to private key", async () => {
    const private_key = new Uint8Array([
      210, 101, 63, 247, 203, 178, 216, 255, 18, 154, 194, 126, 245, 120, 28,
      230, 139, 37, 88, 196, 26, 116, 175, 31, 45, 220, 166, 53, 203, 238, 240,
      125,
    ]);

    deepStrictEqual(
      private_key,
      await private_key_from_wif(await private_key_to_wif(private_key)),
      "expected non-legacy private keys"
    );

    deepStrictEqual(
      private_key,
      await legacy_to_private_key(
        "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"
      ),
      "Expected result"
    );

    deepStrictEqual(
      Uint8Array.from([
        26, 30, 175, 180, 209, 165, 0, 245, 18, 81, 242, 80, 110, 213, 131, 230,
        203, 195, 169, 218, 178, 16, 77, 238, 211, 129, 171, 215, 41, 48, 243,
        188,
      ]),
      await private_key_from_wif(
        "PVT_K1_CWCRfKc8atzthZbFMfRdFzqFqGf9d3WNAaZd99gwaosw9kfhS",
        "Expected result"
      )
    );

    deepStrictEqual(
      await legacy_to_private_key(
        "5KML6yCUABWYxuEexgMZPJA9641SptvHdB5Gm5KZW8rFeGf5uak"
      ),
      await private_key_from_wif(
        "PVT_K1_2Y3XHkP5iwZhtrNvUufJFR1sTBXcm4CuN1VXuGpGFzcUa8vu23"
      )
    );
  });
};
