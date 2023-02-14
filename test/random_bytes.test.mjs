import assert from "assert";
import crypto from "crypto";

import random_bytes from "../private/random_bytes.mjs";

const { ok } = assert;

export default (tests) => {
  tests.add("Random bytes", async () => {
    const bytes_web = await random_bytes();
    ok(bytes_web.length == 32);

    global.window = true;
    global.crypto = crypto.webcrypto;

    const bytes = await random_bytes();
    ok(bytes.length == 32);
    global.window = undefined;
    global.crypto = undefined;
  });
};
