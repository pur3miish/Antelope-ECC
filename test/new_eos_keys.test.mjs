import { deepStrictEqual, ok, rejects } from "assert";

import new_eos_keys from "../new_eos_keys.mjs";
import new_keys from "../new_keys.mjs";
import public_key_from_private from "../public_key_from_private.mjs";
import recover_public_key from "../recover_public_key_from_signature.mjs";
import sign_txn from "../sign_txn.mjs";

export default (tests) => {
  tests.add("recover public key from signature", async () => {
    const { public_key, private_key } = await new_eos_keys();
    deepStrictEqual(await public_key_from_private(private_key), public_key);

    const keys = await new_eos_keys(new Uint8Array(32).fill(44));

    deepStrictEqual(
      keys,
      {
        public_key: "EOS5ycP1kWLBCXMSE61vMEPScB1KgZ6XyciygPgHBJvkbiaGDdMdS",
        private_key: "5J9jujTFx4m5UxT3dHnz5p83gjZhcFEFd3HYXAxM98bvZHtfbhT",
      },
      "Expected keys from seed."
    );

    rejects(
      async () => new_eos_keys(new Uint8Array(32).fill(255)),
      "Private key seed is larger than n curve order."
    );

    const { public_key: PUB, private_key: PVT } = await new_keys();
    ok(PUB.startsWith("PUB_K1_"), "Invalid public key");
    ok(PVT.startsWith("PVT_K1_"), "Invalid private key");

    deepStrictEqual(
      {
        public_key: "PUB_K1_7ctPksfNcaA5W47DSwFY8DnRTwnuDPMFQJXBgwVD5p9XHmKxTt",
        private_key: "PVT_K1_SkB92YpWm4Q1NLo8prcWuTogeiEehW583FT8APBTPSeMiZnh",
      },
      await new_keys(
        Uint8Array.from([
          1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21,
          22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
        ])
      )
    );

    const SIG = await sign_txn({
      hex: "aaaa",
      wif_private_key:
        "PVT_K1_SkB92YpWm4Q1NLo8prcWuTogeiEehW583FT8APBTPSeMiZnh",
    });
    // "SIG_K1_Jxs1bijGCYdB3JRdzgkacECTMr9qVYEog3K4gLuiTZPNUTpoubENbWY5D4xRqhe91bQax1D6ZKpt3g5bGVeKrnkyDib4nK"

    deepStrictEqual(
      "PUB_K1_7ctPksfNcaA5W47DSwFY8DnRTwnuDPMFQJXBgwVD5p9XHmKxTt",
      await recover_public_key({
        signature: SIG,
        hex: "aaaa",
      }),
      "Valid signature"
    );
  });

  // deepStrictEqual(await public_key_from_private(private_key), public_key)
};
