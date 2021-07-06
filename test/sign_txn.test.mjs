import { deepStrictEqual } from 'assert'
import sign_txn from '../public/sign_txn.js'

export default tests => {
  tests.add('generate eos signature', async () => {
    // prettier-ignore
    const hex = new Uint8Array([
      0x2c,0xf2,0x4d,0xba,0x5f,0xb0,0xa3,0x0e,
      0x26,0xe8,0x3b,0x2a,0xc5,0xb9,0xe2,0x9e,
      0x1b,0x16,0x1e,0x5c,0x1f,0xa7,0x42,0x5e,
      0x73,0x04,0x33,0x62,0x93,0x8b,0x98,0x24
    ])

    const sig0 = await sign_txn({
      hex: 'FF',
      wif_private_key: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'
    })

    deepStrictEqual(
      sig0,
      'SIG_K1_KkdPezk36k4k6jaPHUuvux7ZFvnp5gXSazvUHWRBpJ15Wyys5gEXm56QrzwtyWfd4Abe13DHS7Z1b7kfKxJScT5q9C237S',
      'hex string signature example'
    )

    deepStrictEqual(
      await sign_txn({
        hex,
        wif_private_key: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'
      }),
      'SIG_K1_JxMNpqjtD1bdwUASSncg3DNE3Vy9GWMjFUhFQ6QqwN8Dypfhsk7EN47cJ8BD43iXeNBSQ5u8A1Z4TYzeNeDnyvCoNWyyNJ',
      'Expected signature 1.'
    )

    deepStrictEqual(
      await sign_txn({
        hex: Uint8Array.from([23, 23, 123, 244]),
        wif_private_key: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'
      }),
      'SIG_K1_Kdy8vw8s887hzEQjGaoFWnMSC3wsWZpTTz7jvGTQqBAjenJExwpYZ4XgjtnUT56aoxoijSW5K8LJaq86wpTZyH5Az2pbH5',
      'Expected signature 2.'
    )

    deepStrictEqual(
      await sign_txn({
        hex: Uint8Array.from([
          2, 33, 65, 233, 23, 23, 123, 244, 23, 23, 123, 244
        ]),
        wif_private_key: '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'
      }),
      'SIG_K1_K9mUb6kLZN8a9BELwbkdPvwb7W68vfEYUTjVDSSTXsfqVtRh2EfT9rUQKHDwCh2c5ee3rrbS4KVkRsLQyqGYhMJqXY4d81',
      'Expected signature 3.'
    )
  })
}
