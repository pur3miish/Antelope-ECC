import { deepStrictEqual, rejects } from 'assert'
import new_eos_keys from '../new_eos_keys.js'
import public_key_from_private from '../public_key_from_private.js'

export default tests => {
  tests.add('recover public key from signature', async () => {
    const { public_key, private_key } = await new_eos_keys()
    deepStrictEqual(await public_key_from_private(private_key), public_key)

    const keys = await new_eos_keys(new Uint8Array(32).fill(44))

    deepStrictEqual(
      keys,
      {
        public_key: 'EOS5ycP1kWLBCXMSE61vMEPScB1KgZ6XyciygPgHBJvkbiaGDdMdS',
        private_key: '5J9jujTFx4m5UxT3dHnz5p83gjZhcFEFd3HYXAxM98bvZHtfbhT'
      },
      'Expected keys from seed.'
    )

    rejects(
      async () => new_eos_keys(new Uint8Array(32).fill(255)),
      'Private key seed is larger than n curve order.'
    )
  })

  // deepStrictEqual(await public_key_from_private(private_key), public_key)
}
