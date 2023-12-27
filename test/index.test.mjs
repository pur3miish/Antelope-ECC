// @ts-check

import TestDirector from "test-director";

import legacy_to_public_keyTetMjs from "./legacy_to_public.test.mjs";
import new_keysTestMjs from "./new_keys.test.mjs";
import PK_Mnemonic from "./private-key-mnemoni-bip.test.mjs";
import public_key_from_privateTestMjs from "./public_key_from_private.test.mjs";
import random_bytesTestMjs from "./random_bytes.test.mjs";
import recover_publickey from "./recover_public_key.test.mjs";
import sign_txn from "./sign_txn.test.mjs";
import validate_keys from "./validate.test.mjs";
import webauthn from "./webauth.test.mjs";
import wif_to_private_keyTestMjs from "./wif_to_private_key.test.mjs";
import wif_to_public_keyTestMjs from "./wif_to_public_key.test.mjs";

const tests = new TestDirector();

legacy_to_public_keyTetMjs(tests);
new_keysTestMjs(tests);
webauthn(tests);
random_bytesTestMjs(tests);
recover_publickey(tests);
public_key_from_privateTestMjs(tests);
wif_to_public_keyTestMjs(tests);
sign_txn(tests);
validate_keys(tests);
PK_Mnemonic(tests);
wif_to_private_keyTestMjs(tests);
tests.run();
