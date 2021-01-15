'use strict'

/**
 * Isomorphic sha256 message digest function.
 * @kind function
 * @name sha256
 * @param {Uint8Array} data Binary data to hash.
 * @returns {Uint8Array} Message digest.
 * @ignore
 */
async function sha256(data) {
  if (!(data instanceof Uint8Array))
    throw new TypeError('Expected Uint8Array input data.')

  if (typeof window == 'undefined') {
    // https://github.com/mysticatea/eslint-plugin-node/issues/250
    // eslint-disable-next-line
    const { createHash } = await import('crypto')
    return new Uint8Array(createHash('sha256').update(data).digest())
  } else return new Uint8Array(await crypto.subtle.digest('SHA-256', data))
}

module.exports = sha256
