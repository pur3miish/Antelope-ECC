// eslint-disable-next-line node/no-missing-import
import TestDirector from 'test-director'
import new_eos_keysTestMjs from './new_eos_keys.test.mjs'
import public_key_from_privateTestMjs from './public_key_from_private.test.mjs'
import random_bytesTestMjs from './random_bytes.test.js'
import recover_publickey from './recover_public_key.test.mjs'
import sign_txn from './sign_txn.test.mjs'
import validate_keys from './validate.test.mjs'
import wif_to_private_keyTestMjs from './wif_to_private_key.test.mjs'
import wif_to_public_keyTestMjs from './wif_to_public_key.test.mjs'

const tests = new TestDirector()

recover_publickey(tests)
public_key_from_privateTestMjs(tests)
new_eos_keysTestMjs(tests)
random_bytesTestMjs(tests)
wif_to_private_keyTestMjs(tests)
wif_to_public_keyTestMjs(tests)
sign_txn(tests)
validate_keys(tests)
tests.run()
