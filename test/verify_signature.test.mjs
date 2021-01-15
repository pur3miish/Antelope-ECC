import { ok, rejects } from 'assert'
import verify_eos_signature from '../public/verify_eos_signature.js'

export default tests => {
  tests.add('verify eos signature', async () => {
    const signature =
      'SIG_K1_JxMNpqjtD1bdwUASSncg3DNE3Vy9GWMjFUhFQ6QqwN8Dypfhsk7EN47cJ8BD43iXeNBSQ5u8A1Z4TYzeNeDnyvCoNWyyNJ'
    const wif_public_key =
      'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV'

    // prettier-ignore
    const hash = new Uint8Array([
      44, 242, 77, 186, 95, 176, 163, 14,
      38, 232, 59, 42, 197, 185, 226, 158,
      27, 22, 30, 92, 31, 167, 66, 94,
      115, 4, 51, 98, 147, 139, 152, 36
    ])

    ok(
      await verify_eos_signature({ signature, wif_public_key, hash }),
      'expected valid signature'
    )

    rejects(
      () =>
        verify_eos_signature({
          signature:
            'JxMNpqjtD1bdwUASSncg3DNE3Vy9GWMjFUhFQ6QqwN8Dypfhsk7EN47cJ8BD43iXeNBSQ5u8A1Z4TYzeNeDnyvCoNWyyNJ',
          wif_public_key,
          hash
        }),
      'Invalid signature missing SIG_K1_'
    )

    rejects(
      () =>
        verify_eos_signature({
          signature:
            'SIG_K1_JxMNpqjtD1bdwUASSncg3DNE3Vy9GWMjFUhFQ6QqwN8Dypfhsk7EN47cJ8BD43iXeNBSQ5u8A1Z4TYzeNeDnyvCoNQQQQ',
          wif_public_key,
          hash
        }),
      'Invalid signature checksum'
    )
  })
}
