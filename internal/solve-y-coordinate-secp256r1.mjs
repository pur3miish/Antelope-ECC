const b = 0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604bn;
const p = 0xffffffff00000001000000000000000000000000ffffffffffffffffffffffffn;
const a = (-3n + p) % p;

function calculateYSquared(x) {
  const xCubed = (((x * x) % p) * x) % p;
  const ax = (a * x) % p;
  const ySquared = (xCubed + ax + b) % p;

  return ySquared;
}

function modPow(base, exponent, modulus) {
  let result = BigInt(1);
  while (exponent > 0n) {
    if (exponent % 2n === 1n) {
      result = (result * base) % modulus;
    }
    base = (base * base) % modulus;
    exponent = exponent >> 1n;
  }
  return result;
}

function legendreSymbol(a, p) {
  // If a is divisible by p, return 0
  if (a % p === 0n) {
    return 0;
  }
  // Compute the Legendre symbol using Euler's criterion
  const symbol = modPow(a, (p - 1n) / 2n, p);
  // If symbol is 1, it's a quadratic residue; if p-1, it's a non-residue
  return symbol === 1n ? 1 : symbol === p - 1n ? -1 : 0;
}

function tonelliShanksAlgorithm(ySquared, p) {
  if (legendreSymbol(ySquared, p) !== 1) {
    throw new Error("No square root exists");
  }

  let q = p - 1n;
  let s = 0n;

  while (q % 2n === 0n) {
    q = q >> 1n;
    s += 1n;
  }

  let z = 2n;
  while (modPow(z, (p - 1n) >> 1n, p) !== p - 1n) {
    z += 1n;
  }

  let c = modPow(z, q, p);
  let r = modPow(ySquared, (q + 1n) >> 1n, p);
  let t = modPow(ySquared, q, p);

  let m = s;
  while (t !== 1n) {
    let temp = t;
    let i = 1n;

    while (temp !== 1n && i < m) {
      temp = (temp * temp) % p;
      i += 1n;
    }

    let b = modPow(c, BigInt(2 ** (m - i - 1n)), p);
    r = (r * b) % p;
    t = (t * b * b) % p;
    c = (b * b) % p;
    m = i;
  }

  return r;
}

export function caculateRecID(r) {
  const ySquared = calculateYSquared(r);
  const y = tonelliShanksAlgorithm(ySquared, p);
  return Number(y % 2n);
}

export function calculateRecID(r) {
  // Step 1: Calculate y^2 = r^3 - 3r + 7 mod p
  const ySquared = calculateYSquared(r);

  // Step 2: Check if y^2 is a quadratic residue modulo p
  if (legendreSymbol(ySquared, p) === p - 1n) {
    throw new Error("No valid y-coordinate found for r");
  }
  const y = tonelliShanksAlgorithm(ySquared, p);

  const T = y > p / 2n ? p - y : y;
  return Number(T % 2n);
}

export default function calculateY(x, prefix) {
  const ySquared = calculateYSquared(x);
  const y = tonelliShanksAlgorithm(ySquared, p);

  if (prefix == 2 && y % 2n) return p - y;
  if (prefix == 3 && !(y % 2n)) return p - y;

  return y;
}
