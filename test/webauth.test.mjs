import { deepStrictEqual, ok } from "assert";

// import { webcrypto } from "crypto";
import webauthPublicKey from "../internal/webauthn_public_key.mjs";
import sign from "../internal/webauthn_signature.mjs";
import verify from "../verify_wa_signature.mjs";

export default async (tests) => {
  tests.add("validate webauthn antelope key and sig", async () => {
    const clientDataJSON = [
      123, 34, 116, 121, 112, 101, 34, 58, 34, 119, 101, 98, 97, 117, 116, 104,
      110, 46, 103, 101, 116, 34, 44, 34, 99, 104, 97, 108, 108, 101, 110, 103,
      101, 34, 58, 34, 87, 52, 117, 67, 111, 82, 86, 118, 106, 78, 55, 118, 103,
      73, 90, 110, 105, 57, 103, 45, 53, 104, 52, 88, 88, 57, 120, 90, 56, 116,
      110, 114, 51, 122, 72, 53, 50, 52, 71, 68, 55, 72, 89, 34, 44, 34, 111,
      114, 105, 103, 105, 110, 34, 58, 34, 104, 116, 116, 112, 115, 58, 47, 47,
      119, 101, 98, 97, 117, 116, 104, 46, 99, 111, 109, 34, 44, 34, 99, 114,
      111, 115, 115, 79, 114, 105, 103, 105, 110, 34, 58, 102, 97, 108, 115,
      101, 44, 34, 111, 116, 104, 101, 114, 95, 107, 101, 121, 115, 95, 99, 97,
      110, 95, 98, 101, 95, 97, 100, 100, 101, 100, 95, 104, 101, 114, 101, 34,
      58, 34, 100, 111, 32, 110, 111, 116, 32, 99, 111, 109, 112, 97, 114, 101,
      32, 99, 108, 105, 101, 110, 116, 68, 97, 116, 97, 74, 83, 79, 78, 32, 97,
      103, 97, 105, 110, 115, 116, 32, 97, 32, 116, 101, 109, 112, 108, 97, 116,
      101, 46, 32, 83, 101, 101, 32, 104, 116, 116, 112, 115, 58, 47, 47, 103,
      111, 111, 46, 103, 108, 47, 121, 97, 98, 80, 101, 120, 34, 125,
    ];

    const authenticatorData = [
      35, 170, 155, 217, 51, 14, 35, 138, 106, 223, 213, 96, 26, 73, 92, 62, 7,
      157, 140, 122, 125, 7, 209, 133, 166, 116, 156, 52, 108, 166, 151, 191, 5,
      0, 0, 0, 0,
    ];

    const signature = [
      48, 68, 2, 32, 98, 23, 185, 136, 164, 118, 87, 116, 202, 178, 253, 78, 27,
      203, 249, 188, 245, 2, 174, 18, 213, 184, 238, 0, 85, 5, 243, 225, 100,
      41, 88, 34, 2, 32, 106, 2, 216, 163, 149, 173, 181, 155, 84, 251, 144,
      221, 115, 177, 219, 25, 153, 32, 248, 194, 82, 130, 131, 68, 174, 173, 55,
      34, 74, 6, 44, 145,
    ];

    const web_auth_sig = await sign(
      { authenticatorData, signature, clientDataJSON },
      "PUB_WA_2V1mu6pYpbtBk9bN9iSNgPgjpMgPUgAw8CVLc2P4oVGXoMayZ6vxjaLKM2Q12yVDfU2Z"
    );

    deepStrictEqual(
      web_auth_sig,
      "SIG_WA_7ZpZih73nsY7M4UtWotGNLQkDcyVnmeGkpf9XFBP1Wszmgscbo6XLSkkSrZTZAkR1ihgSv7B37GyPMYPBJxCevfy7NZyowDYeSsNjrng4F9nW8JQEKkziXPWuDQsU1NXUSHwEF8xRUTMH7dgz2dmnxYc2vXvBc9wTR8bJMPk5B4jma7paM9Ld8KWYzwy2ov2YNB8BawtsFNjFRxB5qeMr41LvchJS6BDDwUFM7VdW5bxXLJvSk7CCWqiitb499F9ckcJbTd8iXtW4LimBz5dBSNSstuU7mbQLzBoNJyEj4ucZzpDG4aUmLExdGNZHbKV2fMzNZYQu21rS35G5AgoccGymQ8bmLHTcKgdyWh3evoUP3uRkbvgjoEtqgTMEvEkd3WrHVY5NR53rSotpZns3Qr7wTPZcEUyCVeSjiAkjuiqo3KGYfz8dLWbir2J4Q178QqNPZ5EnPdDYcw42NsPFVhc6ur7NF",
      "web auth signature"
    );

    const authenticatorData3 = [
      35, 170, 155, 217, 51, 14, 35, 138, 106, 223, 213, 96, 26, 73, 92, 62, 7,
      157, 140, 122, 125, 7, 209, 133, 166, 116, 156, 52, 108, 166, 151, 191, 5,
      0, 0, 0, 0,
    ];

    const signature3 = [
      48, 70, 2, 33, 0, 134, 65, 184, 5, 1, 187, 184, 134, 32, 82, 150, 234,
      243, 78, 159, 169, 76, 51, 251, 77, 190, 41, 242, 252, 130, 93, 85, 82,
      121, 9, 9, 27, 2, 33, 0, 201, 38, 109, 115, 60, 236, 121, 80, 118, 187,
      77, 99, 138, 119, 233, 229, 144, 102, 196, 147, 99, 226, 164, 235, 26,
      133, 22, 232, 199, 11, 115, 130,
    ];

    const clientDataJSON3 = [
      123, 34, 116, 121, 112, 101, 34, 58, 34, 119, 101, 98, 97, 117, 116, 104,
      110, 46, 103, 101, 116, 34, 44, 34, 99, 104, 97, 108, 108, 101, 110, 103,
      101, 34, 58, 34, 121, 117, 53, 79, 121, 122, 100, 57, 95, 102, 49, 54, 81,
      106, 114, 87, 53, 50, 119, 48, 84, 98, 66, 121, 49, 69, 66, 56, 119, 86,
      100, 81, 105, 51, 115, 69, 72, 70, 81, 115, 79, 122, 56, 34, 44, 34, 111,
      114, 105, 103, 105, 110, 34, 58, 34, 104, 116, 116, 112, 115, 58, 47, 47,
      119, 101, 98, 97, 117, 116, 104, 46, 99, 111, 109, 34, 44, 34, 99, 114,
      111, 115, 115, 79, 114, 105, 103, 105, 110, 34, 58, 102, 97, 108, 115,
      101, 125,
    ];

    deepStrictEqual(
      await sign({
        authenticatorData: authenticatorData3,
        signature: signature3,
        clientDataJSON: clientDataJSON3,
      }),
      "SIG_WA_CoMvwPMX7j4jLosSqEmCVsWUv79oixev3XVhztVzEzQRK6MAq6JMbZKYx55mBmz2LBCsyzxa3hpbq1FXdsxbCY2fbdLtJrwG9Xf43ZDtUcZYhhbNxk6Z2KofKFnaKM981Tdh6zYSDCsXzTkHs3X6f93ktiVSRzJnmL9r6sjHbr3HGcmDgDHF8CLt1wKGpnkC7LpdFStKusom9TcWpaAmn3CnaSkgtWgt41waW9TrruYP2NvyHU7anJKgTU7zvsvjwkEuQp84KBDMtyrkNiEB2iw1YzNs8NkUpFv6dJsqjmhbhBstEHoyBnXPbLWEgqpYmFNVvL9Sg",
      "web auth signature 3"
    );

    const authenticatorData2 = Uint8Array.from([
      35, 170, 155, 217, 51, 14, 35, 138, 106, 223, 213, 96, 26, 73, 92, 62, 7,
      157, 140, 122, 125, 7, 209, 133, 166, 116, 156, 52, 108, 166, 151, 191, 5,
      0, 0, 0, 0,
    ]);

    const clientDataJSON2 = [
      123, 34, 116, 121, 112, 101, 34, 58, 34, 119, 101, 98, 97, 117, 116, 104,
      110, 46, 103, 101, 116, 34, 44, 34, 99, 104, 97, 108, 108, 101, 110, 103,
      101, 34, 58, 34, 56, 74, 71, 82, 100, 97, 120, 51, 101, 120, 95, 50, 84,
      53, 56, 48, 102, 65, 52, 57, 97, 89, 103, 69, 102, 108, 90, 113, 118, 119,
      81, 106, 112, 110, 49, 82, 97, 51, 70, 68, 87, 51, 69, 34, 44, 34, 111,
      114, 105, 103, 105, 110, 34, 58, 34, 104, 116, 116, 112, 115, 58, 47, 47,
      119, 101, 98, 97, 117, 116, 104, 46, 99, 111, 109, 34, 44, 34, 99, 114,
      111, 115, 115, 79, 114, 105, 103, 105, 110, 34, 58, 102, 97, 108, 115,
      101, 125,
    ];

    const signature2 = [
      48, 70, 2, 33, 0, 227, 12, 3, 44, 25, 239, 25, 8, 211, 32, 222, 216, 181,
      168, 250, 91, 56, 175, 195, 79, 153, 124, 169, 174, 21, 116, 225, 52, 213,
      168, 160, 42, 2, 33, 0, 239, 0, 187, 95, 119, 12, 207, 8, 92, 38, 39, 68,
      241, 8, 172, 76, 85, 254, 207, 24, 244, 237, 80, 90, 232, 102, 20, 146,
      166, 231, 134, 146,
    ];

    //

    deepStrictEqual(
      await sign({
        authenticatorData: authenticatorData2,
        signature: signature2,
        clientDataJSON: clientDataJSON2,
      }),
      "SIG_WA_CwEK4WMpnkJW5WGZcY2F4TjkqD4vVg3iR6EzNF15BerQf1TZyCgXwcuLEe9Qzcya5msLHDGY5j3fvBPeAr5SDou1K2d5FwkfkFaPF2NCH2YfKL3QaSWg8CevZjB6L3JGNwXJohUGq8Mu8Dg6SYiJudGqbiptSJ78Y2CZvP9q9MunhtfqbDG3nQVAvXnKVNjaowHhf53Xk9uRRvXkTjUEy23pikEww9EDiGmjxSrYaeiSkUCtRf3P5GhRgT9gh2x6AD6a6JrgKUAnmNuShGFRvwdUveDxFQtNiX1Ksrv4nCNTHLgV3ygfo7QobcSTMYTWTFMd3RYNg"
    );
  });

  tests.add("webauth signatures", async () => {
    const clientDataJSON = Uint8Array.from([
      123, 34, 116, 121, 112, 101, 34, 58, 34, 119, 101, 98, 97, 117, 116, 104,
      110, 46, 99, 114, 101, 97, 116, 101, 34, 44, 34, 99, 104, 97, 108, 108,
      101, 110, 103, 101, 34, 58, 34, 103, 109, 53, 51, 102, 118, 102, 104, 88,
      114, 73, 80, 114, 49, 81, 119, 111, 70, 121, 103, 98, 118, 121, 115, 49,
      70, 81, 55, 104, 72, 86, 98, 56, 75, 107, 52, 56, 83, 113, 120, 80, 54,
      52, 34, 44, 34, 111, 114, 105, 103, 105, 110, 34, 58, 34, 104, 116, 116,
      112, 115, 58, 47, 47, 119, 101, 98, 97, 117, 116, 104, 46, 99, 111, 109,
      34, 44, 34, 99, 114, 111, 115, 115, 79, 114, 105, 103, 105, 110, 34, 58,
      102, 97, 108, 115, 101, 125,
    ]).buffer;

    const attestationObject = Uint8Array.from([
      163, 99, 102, 109, 116, 100, 110, 111, 110, 101, 103, 97, 116, 116, 83,
      116, 109, 116, 160, 104, 97, 117, 116, 104, 68, 97, 116, 97, 88, 164, 35,
      170, 155, 217, 51, 14, 35, 138, 106, 223, 213, 96, 26, 73, 92, 62, 7, 157,
      140, 122, 125, 7, 209, 133, 166, 116, 156, 52, 108, 166, 151, 191, 69, 0,
      0, 0, 0, 173, 206, 0, 2, 53, 188, 198, 10, 100, 139, 11, 37, 241, 240, 85,
      3, 0, 32, 11, 194, 92, 201, 199, 149, 79, 54, 143, 48, 113, 185, 156, 192,
      195, 83, 115, 228, 104, 232, 241, 231, 56, 0, 193, 219, 154, 177, 25, 194,
      118, 31, 165, 1, 2, 3, 38, 32, 1, 33, 88, 32, 46, 175, 195, 31, 30, 152,
      18, 7, 50, 106, 73, 28, 200, 200, 78, 121, 215, 10, 225, 145, 164, 172,
      28, 84, 166, 127, 83, 168, 146, 180, 46, 76, 34, 88, 32, 234, 170, 15, 21,
      186, 187, 173, 233, 66, 130, 130, 59, 116, 199, 229, 24, 138, 136, 139,
      48, 183, 214, 155, 73, 166, 58, 62, 58, 247, 237, 98, 90,
    ]).buffer;

    deepStrictEqual(
      await webauthPublicKey({ attestationObject, clientDataJSON }),
      "PUB_WA_2ZTU7dUiALKzd4CXXRzAqtmzvP9N9873VEgUhwFajs2BFZXSSL6Eu3Y3mUrm59Mf9MC9",
      "Webauth public key generated"
    );
  });

  tests.add("verify webauth sign", async () => {
    const pubkey =
      "PUB_WA_7xt1U9Vu7ZBMAK7r3omQBgGG1cEdETKmUyRzMYsQ2guyRS498fXkxZtwZwUDzzUWc";
    const websig =
      "SIG_WA_56vmevFFLd7pzDcLVfqa2yYeKNzbJNT8suPrfaEBSAztVmR9sKmDVswfTAFeFjcDw3548wsPh5FFx4cggjXii4PrkVjw6AWkVjcpzQoJcob9Db4FHcrQpBumbmopX6FM4WwjCCVQaqjSLgjp1qZ9CX68X8i816bmrGHyqnoM7aoqxB4vhM9zzAuooSnTcoTmtmagYEDMgUpw4GCibHE6PcHYT2Fw7pykfFWUvV3omBpPzRSweXQQuGB8urAnsVmULzJsgZTSoS74fePyGoXDHwFWWvvQDyFTEcE8GNYaT1sEgg3HU3tXuqGm84fz8trBALcmVQfkZkvt";

    const p = await verify(websig, pubkey);
    ok(p);
  });
};
