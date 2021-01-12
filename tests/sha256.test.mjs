import { deepStrictEqual, rejects } from 'assert'
import crypto from 'crypto'
import sha256 from '../src/sha256.js'

export default tests => {
  tests.add('sha256', async () => {
    const ssr = await sha256(new Uint8Array([255, 255]))
    global.window = true
    global.crypto = {
      subtle: crypto.webcrypto.subtle
    }
    const client = await sha256(new Uint8Array([255, 255]))
    deepStrictEqual(client, ssr, 'sha256 client and server quality')
    global.window = undefined
    global.crypt = undefined

    rejects(() => sha256(''), 'extected rejection')
  })
}
