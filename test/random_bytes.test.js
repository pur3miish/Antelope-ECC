'use strict'

const { ok } = require('assert')
const crypto = require('crypto')
const random_bytes = require('../private/random_bytes.js')

module.exports = tests => {
  tests.add('Random bytes', async () => {
    global.window = true

    global.crypto = {
      getRandomValues: crypto.webcrypto.getRandomValues
    }
    const bytes = await random_bytes()
    ok(bytes.length == 32)

    const bytes_web = await random_bytes()
    ok(bytes_web.length == 32)
    global.window = undefined
    global.crypto = undefined
  })
}
