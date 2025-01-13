import assert from "assert";

import legacy_to_public_key from "../src/keys/legacy_to_public_key";
import public_key_to_wif from "../src/keys/public_key_to_wif";
const { ok, rejects } = assert;

import validate_private_key from "../src/keys/validate_private_key";
import validate_public_key from "../src/keys/validate_public_key";

it("validate private key", async () => {
  ok(
    await validate_public_key(
      "PUB_WA_2V1mu6pYpbtBk9bN9iSNgPgjpMgPUgAw8CVLc2P4oVGXoMayZ6vxjaLKM2Q12yVDfU2Z"
    ),
    "Validate WA public key."
  );

  ok(
    await validate_public_key(
      "PUB_R1_8E46r5HiQF84o6V8MWQQg1vPpgfjYA4XDqT6xbtaaebxw7XbLu"
    ),
    "Validate R1 public key."
  );

  let valid;

  valid = await validate_private_key(
    "PVT_K1_zKsh3V5k6W7UvpKLPMViQizDWhMpKj2K2wNgf5STzaL3rYwL9"
  );
  ok(valid, "valid private key");

  rejects(() =>
    validate_private_key(
      "PVT_K1_NfCHnJ8QKQJqjSxERawfiErvbpy9sx4BKFiKnJaPJ4ndBDeg"
    )
  );

  valid = await validate_private_key(
    "PVT_K1_NfCHnJ8QKQJqjSxERawfiErvbpy9sx4BKFiKnJaPJ4ndBDehg"
  );
  ok(valid, "Valid private key");

  rejects(() =>
    validate_private_key("5JYMyGjWUWZqWqjZRKnG6TcJs5ULisaVxxwSwf2pnmf4ZhjCmC4")
  );

  rejects(() =>
    validate_private_key("4JYMyGjWUWZqWqjZRKnG6TcJs5ULisaVxxwSwf2pnmf4ZhjCmC4")
  );

  rejects(() => validate_private_key("5J"));

  rejects(() =>
    validate_private_key("5JYLyG0WUWZqWqjZRKnG6TcJs5ULisaVxxwSwf2pnmf4ZhjCmC4")
  );
});

it("validate Antelope public key", async () => {
  ok(
    await validate_private_key(
      "PVT_K1_2Y3XHkP5iwZhtrNvUufJFR1sTBXcm4CuN1VXuGpGFzcUa8vu23"
    ),
    "validate 57 character length PVT key"
  );

  ok(
    await validate_public_key(
      "PUB_K1_82GQM4rE4uwQke8d49WfdMgH7zfR1MY2VULwC7BXkRGH5kgcvH"
    ),
    "valid public key"
  );

  rejects(() =>
    validate_public_key(
      "PUB_K1_82GQM4rE4uwQke8d49WfdMgH7zfR1MY2VULwC7BXkRGH5kgc"
    )
  );

  ok(
    await validate_public_key(
      await public_key_to_wif(
        await legacy_to_public_key(
          "EOS5GG8V442yUeMsAMwMB3t57wR2eiFvQH1xqFx7DUMnEzdFa3XMP"
        )
      )
    ),
    "valid public key"
  );

  rejects(() =>
    validate_public_key("NOO5GG8V442yUeMsAMwMB3t57wR2eiFvQH1xqFx7DUMnEzdFa3XMP")
  );

  rejects(() =>
    validate_public_key("EOS5GG8V442yUeMsAMwMB3t57wR2eiFvQH1xqFx7DUMn0zdFa3XMP")
  );

  rejects(() => validate_public_key("EOS5GG8V44"));

  rejects(() =>
    validate_public_key("EOS5GG8V442yUeMsAMwMB3t57wR2eiFvQH1xqFx7DUMnEzdFa3XTT")
  );
});
