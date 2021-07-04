import { ok } from 'assert'
import public_key_from_private from '../public/public_key_from_private.js'

export default tests => {
  tests.add('public_key_from_private', async () => {
    const keys = [
      [
        'EOS5hwG4sTLMy5yx8CW1fLYWkoUG3TAmhdejCAMXEGKR2GRXwtoPx',
        '5K7xR2C8mBzMo4aMPJyBPp7Njc3XvszeJSfTApa51rc2d54rrd3'
      ],
      [
        'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV',
        '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'
      ],
      [
        'EOS6hMLF2sPrxhu9SK4dJ9LaZimfzgfmP7uX1ahUPJUcUpS4p2G39',
        '5JWuEZQHLpUw8na4g8Fr99ZnPiuhtQjrvJLn6xBwUBnQmYBF3Z2'
      ],
      [
        'EOS7Jsktf3uiUxj6uXWDeGE92K7wHXoeRfKkyXCudUftigCucMkXv',
        '5HvQveqBrTYmvr4V73y7QNW51mY5ow2T9vzfKbz7egdHjXYNWkG'
      ],
      [
        'EOS7YqT9B3rw4WvQoAGzupzaGdeMthKUgyGjWQzUJM123WwQLjXBp',
        '5JbbGgbvnDNZrRqKzMWsDhAKCobRFVArgugZxLW9npfKRDAXuRJ'
      ],
      [
        'EOS87U41tTLiEjWX1S8GPAzaX48inKnJ4bnsSk6hGs1Cb3w72dHnQ',
        '5KjykvxKRaFj6CNzWHxecevXsdiFDPXka1aGVGHAFHtT6A1mfBz'
      ]
    ]

    const public_keys = keys.map(key => public_key_from_private(key[1]))
    ok((await public_keys[0]) == keys[0][0], 'Invalid public key 0')
    ok((await public_keys[1]) == keys[1][0], 'Invalid public key 1')
    ok((await public_keys[2]) == keys[2][0], 'Invalid public key 2')
    ok((await public_keys[3]) == keys[3][0], 'Invalid public key 3')
    ok((await public_keys[4]) == keys[4][0], 'Invalid public key 4')
    ok((await public_keys[5]) == keys[5][0], 'Invalid public key 5')
  })
}
