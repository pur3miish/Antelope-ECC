import { deepStrictEqual, rejects } from 'assert'
import wif_to_public_key from '../private/wif_to_public_key.js'

export default tests => {
  tests.add('wif to public key', async () => {
    // prettier-ignore
    const public_key = new Uint8Array([
      2, 192, 222, 210, 188,  31,  19,   5,
      251,  15, 170, 197, 230, 192,  62, 227,
      161, 146,  66,  52, 152,  84,  39, 182,
       22, 124, 165, 105, 209,  61, 244,  53,
      207

    ])

    deepStrictEqual(
      public_key,
      await wif_to_public_key(
        'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV',
        'Expected output'
      )
    )

    rejects(async () => {
      await wif_to_public_key(
        'PUB6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDWAAA'
      )
    }, 'Expected rejection - missing EOS prefix')
    rejects(async () => {
      await wif_to_public_key(
        'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDWAAA'
      )
    }, 'Expected rejection - Invalid checksum')
    rejects(async () => {
      await wif_to_public_key(
        'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDWAAA'
      )
    }, 'Expected rejection - Invalid checksum')
  })
}
