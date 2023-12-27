import words from "./internal/mnemonic-words.mjs";

/**
 * Recovers an antelope based private key from BIP39 mnemonic.
 * @param {Array<String>} recoveryPhrase 32 bytes of data.
 * @returns {Uint8Array}
 * import recoverMnemonic from "antelope-ecc/mnemonic-recover.mjs"
 *
 * recoverMnemonic([your, twenty, four, words, go, here, ]).then(console.log)
 * ```
 * The logged output was [abandon, busy, …].
 */
export default async function recoverMnemonic(recoveryPhrase) {
  recoveryPhrase = recoveryPhrase.normalize("NFKD").trim().toLowerCase();

  let ints = [];
  recoveryPhrase.split(/[\s,:-]+/gmu).forEach((word) => {
    let index = words.indexOf(word);
    if (index < 0) throw new Error(`unknown word: '${word}'`);
    ints.push(index);
  });

  let digits = ints.map((n) => n.toString(2).padStart(11, "0")).join("");
  let sumBitLen = Math.floor(digits.length / 32);
  let bitLen = digits.length - sumBitLen;

  let bytesArr = [];
  for (let bit = 0; bit < bitLen; bit += 8) {
    let bytestring = digits.slice(bit, bit + 8);
    let n = parseInt(bytestring, 2);
    if (n >= 0) {
      bytesArr.push(n);
    }
  }

  // the original random bytes used to generate the 12-24 words
  let entropyBytes = Uint8Array.from(bytesArr);

  return entropyBytes;
}
