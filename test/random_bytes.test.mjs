import { ok } from "assert";

import random_bytes from "../internal/random_bytes.mjs";

export default (tests) => {
  tests.add("Random bytes", async () => {
    const bytes_web = await random_bytes();
    ok(bytes_web.length == 32);
  });
};
