import { ok } from "assert";

import random_bytes from "../src/internal/random_bytes";

it("Random bytes", async () => {
  const bytes_web = await random_bytes();
  ok(bytes_web instanceof Uint8Array);
  ok(bytes_web.length == 32);
});
