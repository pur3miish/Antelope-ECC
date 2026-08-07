import { ok, throws } from "assert";
import binary_to_base58 from "base58-js/binary_to_base58.js";
import { ripemd160 } from "ripemd160-js";

import validate_private_key from "../src/keys/validate_private_key.js";
import validate_public_key from "../src/keys/validate_public_key.js";

function encode_k1(prefix: "PVT_K1_" | "PUB_K1_", payload: Uint8Array): string {
  const checksum = ripemd160(Uint8Array.from([...payload, 75, 49])).slice(0, 4);

  return prefix + binary_to_base58(Uint8Array.from([...payload, ...checksum]));
}

it("validates Antelope private keys", () => {
  ok(
    validate_private_key(
      "PVT_K1_zKsh3V5k6W7UvpKLPMViQizDWhMpKj2K2wNgf5STzaL3rYwL9",
    ),
  );

  ok(
    validate_private_key(
      "PVT_K1_NfCHnJ8QKQJqjSxERawfiErvbpy9sx4BKFiKnJaPJ4ndBDehg",
    ),
  );

  ok(
    validate_private_key(
      "PVT_K1_2Y3XHkP5iwZhtrNvUufJFR1sTBXcm4CuN1VXuGpGFzcUa8vu23",
    ),
  );

  throws(() =>
    validate_private_key(
      "PVT_K1_NfCHnJ8QKQJqjSxERawfiErvbpy9sx4BKFiKnJaPJ4ndBDeg",
    ),
  );

  throws(() =>
    validate_private_key("5JYMyGjWUWZqWqjZRKnG6TcJs5ULisaVxxwSwf2pnmf4ZhjCmC4"),
  );

  throws(() => validate_private_key("5J"));

  // Valid Antelope checksum, but invalid secp256k1
  // scalar zero.
  const zero_private_key = encode_k1("PVT_K1_", new Uint8Array(32));

  throws(() => validate_private_key(zero_private_key));
});

it("validates Antelope public keys", () => {
  ok(
    validate_public_key(
      "PUB_K1_82GQM4rE4uwQke8d49WfdMgH7zfR1MY2VULwC7BXkRGH5kgcvH",
    ),
  );

  ok(
    validate_public_key(
      "PUB_R1_8E46r5HiQF84o6V8MWQQg1vPpgfjYA4XDqT6xbtaaebxw7XbLu",
    ),
  );

  ok(
    validate_public_key(
      "PUB_WA_2V1mu6pYpbtBk9bN9iSNgPgjpMgPUgAw8CVLc2P4oVGXoMayZ6vxjaLKM2Q12yVDfU2Z",
    ),
  );

  throws(() =>
    validate_public_key(
      "PUB_K1_82GQM4rE4uwQke8d49WfdMgH7zfR1MY2VULwC7BXkRGH5kgc",
    ),
  );

  throws(() =>
    validate_public_key(
      "NOO5GG8V442yUeMsAMwMB3t57wR2eiFvQH1xqFx7DUMnEzdFa3XMP",
    ),
  );

  // Valid Antelope checksum, but not a valid
  // compressed SEC 1 secp256k1 point.
  const invalid_public_key = encode_k1("PUB_K1_", new Uint8Array(33));

  throws(() => validate_public_key(invalid_public_key));
});
