import { ok } from 'assert'
import crypto from 'crypto'
import random_bytes from '../private/random_bytes.js'

export default tests => {
  tests.add('Random bytes', async () => {
    const bytes = await random_bytes()
    ok(bytes.length == 32)

    global.window = true
    global.crypto = {
      getRandomValues: crypto.webcrypto.getRandomValues
    }
    const bytes_web = await random_bytes()
    ok(bytes_web.length == 32)
    global.window = undefined
    global.crypto = undefined
  })
}
