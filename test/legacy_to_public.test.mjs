import { deepStrictEqual } from "assert";

import legacy_to_private_key from "../legacy_to_private_key.mjs";
import legacy_to_public_key from "../legacy_to_public_key.mjs";

export default (tests) => {
  tests.add("legacy key to public key", async () => {
    deepStrictEqual(
      await legacy_to_public_key(
        "EOS53jowyaGC1WrYJefSHTTmGvZcySUFkEpmCDmEd8txunDChput7"
      ),
      "PUB_K1_53jowyaGC1WrYJefSHTTmGvZcySUFkEpmCDmEd8txunDCqCCVR",
      "Expected converted key to be PUB_K1_53jowyaGC1WrYJefSHTTmGvZcySUFkEpmCDmEd8txunDCqCCVR"
    );

    deepStrictEqual(
      await legacy_to_private_key(
        "5KML6yCUABWYxuEexgMZPJA9641SptvHdB5Gm5KZW8rFeGf5uak"
      ),
      "PVT_K1_2Y3XHkP5iwZhtrNvUufJFR1sTBXcm4CuN1VXuGpGFzcUa8vu23",
      "Expected converted private key."
    );

    deepStrictEqual(
      await legacy_to_public_key(
        "EOS6p9CLAjviu2kMTCRNSh85EmutrH5X2PeBwt4YHKQ1fiJLZDEtZ"
      ),
      "PUB_K1_6p9CLAjviu2kMTCRNSh85EmutrH5X2PeBwt4YHKQ1fiJMHvUqF",
      "Expected converted key to be PUB_K1_6p9CLAjviu2kMTCRNSh85EmutrH5X2PeBwt4YHKQ1fiJMHvUqF"
    );
  });
};
