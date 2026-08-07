import { deepStrictEqual, rejects } from "assert";
import sha256 from "isomorphic-secp256k1-js/sha256.js";

import legacy_to_private_key from "../src/keys/legacy_to_private_key.js";
import private_key_to_wif from "../src/keys/private_key_to_wif.js";
import sign from "../src/sign.js";
import sign_packed_txn from "../src/sign_packed_txn.js";

const wif_private_key = private_key_to_wif(
  legacy_to_private_key("5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"),
);

it("signs an exact 32-byte digest", async () => {
  const digest = Uint8Array.from([
    201, 144, 10, 60, 10, 246, 220, 228, 85, 27, 162, 73, 106, 240, 88, 79, 157,
    232, 216, 136, 3, 147, 89, 15, 177, 237, 241, 81, 136, 194, 29, 5,
  ]);

  await sign({
    hash: digest,
    wif_private_key: "PVT_K1_MQqJDpAxdoNLLbv3XF9F3vSVzRThY4Uj6MQuNCJzYtee6QzY9",
  });
});

it("rejects malformed hash strings", async () => {
  await rejects(() =>
    sign({
      hash: "00000000000000000000000000000000000000000000000000000000000000zz",
      wif_private_key,
    }),
  );

  await rejects(() =>
    sign({
      hash: "ff",
      wif_private_key,
    }),
  );
});

describe("Antelope K1 signature tests", () => {
  it("matches the known signature vector", async () => {
    const signature = await sign({
      hash: await sha256(Uint8Array.from([255])),
      wif_private_key,
    });

    deepStrictEqual(
      signature,
      "SIG_K1_KkdPezk36k4k6jaPHUuvux7ZFvnp5gXSazvUHWRBpJ15Wyys5gEXm56QrzwtyWfd4Abe13DHS7Z1b7kfKxJScT5q9C237S",
    );
  });

  it("signs a packed transaction", async () => {
    const signature = await sign_packed_txn({
      transaction_header: "deb555655ee3d7020892000000",

      transaction_body:
        "000100a6823403ea3055000000572d3ccdcd0100118d474144a3ba00000000a8ed32322100118d474144a3ba309d69484144a3bae80300000000000004454f53000000000000",

      chain_id:
        "73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d",

      wif_private_key:
        "PVT_K1_2bfGi9rYsXQSXXTvJbDAPhHLQUojjaNLomdm3cEJ1XTzMqUt3V",
    });

    deepStrictEqual(
      signature,
      "SIG_K1_K6eKz25ymDHuxoGHDeKyaajPaoL7dUaVKnXRGVgBgsBgQGcMpxmeDKRF46shV3zqgovBhrgTBP6Z3L5S8rxaHjW1amPj2C",
    );
  });

  it("rejects malformed packed transaction hex", async () => {
    await rejects(() =>
      sign_packed_txn({
        transaction_header: "deb555655ee3d7020892000000",

        transaction_body: "zz",

        chain_id:
          "73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d",

        wif_private_key,
      }),
    );

    await rejects(() =>
      sign_packed_txn({
        transaction_header: "deb555655ee3d7020892000000",

        transaction_body: "",

        chain_id: "abcd",

        wif_private_key,
      }),
    );
  });

  it("matches signature vector 2", async () => {
    const signature = await sign({
      hash: await sha256(Uint8Array.from([23, 23, 123, 244])),

      wif_private_key,
    });

    deepStrictEqual(
      signature,
      "SIG_K1_Kdy8vw8s887hzEQjGaoFWnMSC3wsWZpTTz7jvGTQqBAjenJExwpYZ4XgjtnUT56aoxoijSW5K8LJaq86wpTZyH5Az2pbH5",
    );
  });
});
