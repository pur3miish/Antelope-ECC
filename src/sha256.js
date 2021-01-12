const sha256 = async data => {
  if (!(data instanceof Uint8Array))
    throw new TypeError('Expected Uint8Array input data.')

  if (typeof window == 'undefined') {
    const { createHash } = await import('crypto')
    return new Uint8Array(createHash('sha256').update(data).digest())
  } else return new Uint8Array(await crypto.subtle.digest('SHA-256', data))
}

module.exports = sha256
