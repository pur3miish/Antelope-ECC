import { TestDirector } from 'test-director'
import generate_eos_signatureTestMjs from './generate_eos_signature.test.mjs'
import new_eos_keysTestMjs from './new_eos_keys.test.mjs'
import public_key_from_privateTestMjs from './public_key_from_private.test.mjs'
import sha256TestMjs from './sha256.test.mjs'
import verify_signatureTestMjs from './verify_signature.test.mjs'
import wif_to_private_keyTestMjs from './wif_to_private_key.test.mjs'
import wif_to_public_keyTestMjs from './wif_to_public_key.test.mjs'

const tests = new TestDirector()
verify_signatureTestMjs(tests)
generate_eos_signatureTestMjs(tests)
public_key_from_privateTestMjs(tests)
new_eos_keysTestMjs(tests)
sha256TestMjs(tests)
wif_to_private_keyTestMjs(tests)
wif_to_public_keyTestMjs(tests)
tests.run()
