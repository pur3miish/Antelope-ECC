import { deepStrictEqual, rejects } from 'assert'
import wif_to_private_key from '../private/wif_to_private_key.js'

export default tests => {
  tests.add('wif to private key', async () => {
    // prettier-ignore
    const private_key = new Uint8Array([
      210, 101,  63, 247, 203, 178, 216,
      255,  18, 154, 194, 126, 245, 120,
       28, 230, 139,  37,  88, 196,  26,
      116, 175,  31,  45, 220, 166,  53,
      203, 238, 240, 125
    ])

    deepStrictEqual(
      private_key,
      await wif_to_private_key(
        '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3',
        'Expected result'
      )
    )

    rejects(async () => {
      await wif_to_private_key(
        '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvCCC'
      )
    }, 'Expected rejection - Invalid checksum')
  })
}
