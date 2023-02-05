import { ok } from 'assert'
import validate_private_key from '../validate_private_key.js'
import validate_public_key from '../validate_public_key.js'

export default async tests => {
  tests.add('validate private key', async () => {
    let valid

    valid = (
      await validate_private_key(
        'PVT_K1_zKsh3V5k6W7UvpKLPMViQizDWhMpKj2K2wNgf5STzaL3rYwL9'
      )
    ).valid
    ok(valid, 'valid private key')

    valid = (
      await validate_private_key(
        'PVT_K1_NfCHnJ8QKQJqjSxERawfiErvbpy9sx4BKFiKnJaPJ4ndBDeg'
      )
    ).valid
    ok(!valid, 'invalid private key')

    valid = (
      await validate_private_key(
        'PVT_K1_NfCHnJ8QKQJqjSxERawfiErvbpy9sx4BKFiKnJaPJ4ndBDehg'
      )
    ).valid
    ok(valid, 'Valid private key')

    valid = (
      await validate_private_key(
        '5JYMyGjWUWZqWqjZRKnG6TcJs5ULisaVxxwSwf2pnmf4ZhjCmC3'
      )
    ).valid
    ok(valid, 'Valid private key')

    valid = (
      await validate_private_key(
        '5JYMyGjWUWZqWqjZRKnG6TcJs5ULisaVxxwSwf2pnmf4ZhjCmC4'
      )
    ).valid

    ok(!valid, 'Invalid checksum')

    valid = (
      await validate_private_key(
        '4JYMyGjWUWZqWqjZRKnG6TcJs5ULisaVxxwSwf2pnmf4ZhjCmC4'
      )
    ).valid

    ok(!valid, 'Invalid prefix')
    valid = (await validate_private_key('5J')).valid
    ok(!valid, 'Invalid length')

    valid = (
      await validate_private_key(
        '5JYLyG0WUWZqWqjZRKnG6TcJs5ULisaVxxwSwf2pnmf4ZhjCmC4'
      )
    ).valid

    ok(!valid, 'Invalid base58 char')
  })

  tests.add('validate EOSIO public key', async () => {
    ok(
      (
        await validate_private_key(
          'PVT_K1_2Y3XHkP5iwZhtrNvUufJFR1sTBXcm4CuN1VXuGpGFzcUa8vu23'
        )
      ).valid,
      'validate 57 character length PVT key'
    )

    ok(
      (
        await validate_public_key(
          'PUB_K1_82GQM4rE4uwQke8d49WfdMgH7zfR1MY2VULwC7BXkRGH5kgcvH'
        )
      ).valid,
      'valid public key'
    )
    ok(
      !(
        await validate_public_key(
          'PUB_K1_82GQM4rE4uwQke8d49WfdMgH7zfR1MY2VULwC7BXkRGH5kgc'
        )
      ).valid,
      'expected invalid public key'
    )

    ok(
      (
        await validate_public_key(
          'EOS5GG8V442yUeMsAMwMB3t57wR2eiFvQH1xqFx7DUMnEzdFa3XMP'
        )
      ).valid,
      'valid public key'
    )

    ok(
      !(
        await validate_public_key(
          'NOO5GG8V442yUeMsAMwMB3t57wR2eiFvQH1xqFx7DUMnEzdFa3XMP'
        )
      ).valid,
      'Invalid prefix'
    )

    ok(
      !(
        await validate_public_key(
          'EOS5GG8V442yUeMsAMwMB3t57wR2eiFvQH1xqFx7DUMn0zdFa3XMP'
        )
      ).valid,
      'Invalid base58'
    )

    ok(!(await validate_public_key('EOS5GG8V44')).valid, 'Invalid length')

    ok(
      !(
        await validate_public_key(
          'EOS5GG8V442yUeMsAMwMB3t57wR2eiFvQH1xqFx7DUMnEzdFa3XTT'
        )
      ).valid,
      'Invalid checksum'
    )
  })
}
