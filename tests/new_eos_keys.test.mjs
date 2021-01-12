import { deepStrictEqual } from 'assert'
import new_eos_keys from '../src/new_eos_keys.js'
import public_key_from_private from '../src/public_key_from_private.js'

export default tests => {
  tests.add('new eos keys', async () => {
    const { public_key, private_key } = await new_eos_keys()

    deepStrictEqual(await public_key_from_private(private_key), public_key)
  })
}
