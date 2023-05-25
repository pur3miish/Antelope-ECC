import assert from "assert";
const { ok, rejects } = assert;

import validate_private_key from "../validate_private_key.mjs";
import validate_public_key from "../validate_public_key.mjs";

export default async (tests) => {
  tests.add("validate private key", async () => {
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

    valid = await validate_private_key(
      "5JYMyGjWUWZqWqjZRKnG6TcJs5ULisaVxxwSwf2pnmf4ZhjCmC3"
    );
    ok(valid, "Valid private key");

    rejects(() =>
      validate_private_key(
        "5JYMyGjWUWZqWqjZRKnG6TcJs5ULisaVxxwSwf2pnmf4ZhjCmC4"
      )
    );

    rejects(() =>
      validate_private_key(
        "4JYMyGjWUWZqWqjZRKnG6TcJs5ULisaVxxwSwf2pnmf4ZhjCmC4"
      )
    );

    rejects(() => validate_private_key("5J"));

    rejects(() =>
      validate_private_key(
        "5JYLyG0WUWZqWqjZRKnG6TcJs5ULisaVxxwSwf2pnmf4ZhjCmC4"
      )
    );
  });

  tests.add("validate Antelope public key", async () => {
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
        "EOS5GG8V442yUeMsAMwMB3t57wR2eiFvQH1xqFx7DUMnEzdFa3XMP"
      ),
      "valid public key"
    );

    rejects(() =>
      validate_public_key(
        "NOO5GG8V442yUeMsAMwMB3t57wR2eiFvQH1xqFx7DUMnEzdFa3XMP"
      )
    );

    rejects(() =>
      validate_public_key(
        "EOS5GG8V442yUeMsAMwMB3t57wR2eiFvQH1xqFx7DUMn0zdFa3XMP"
      )
    );

    rejects(() => validate_public_key("EOS5GG8V44"));

    rejects(() =>
      validate_public_key(
        "EOS5GG8V442yUeMsAMwMB3t57wR2eiFvQH1xqFx7DUMnEzdFa3XTT"
      )
    );
  });
};
