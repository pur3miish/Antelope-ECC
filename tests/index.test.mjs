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

// public_key_from_private(
//   '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'
// ).then(console.log)

// eos_signature({
//   hex: new Uint8Array([
//     0x2c,
//     0xf2,
//     0x4d,
//     0xba,
//     0x5f,
//     0xb0,
//     0xa3,
//     0x0e,
//     0x26,
//     0xe8,
//     0x3b,
//     0x2a,
//     0xc5,
//     0xb9,
//     0xe2,
//     0x9e,
//     0x1b,
//     0x16,
//     0x1e,
//     0x5c,
//     0x1f,
//     0xa7,
//     0x42,
//     0x5e,
//     0x73,
//     0x04,
//     0x33,
//     0x62,
//     0x93,
//     0x8b,
//     0x98,
//     0x24
//   ]),
//   wif_private_key: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'
// }).then(console.log) // SIG_K1_JxMNpqjtD1bdwUASSncg3DNE3Vy9GWMjFUhFQ6QqwN8Dypfhsk7EN47cJ8BD43iXeNBSQ5u8A1Z4TYzeNeDnyvCoNWyyNJ
