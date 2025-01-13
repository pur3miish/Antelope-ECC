/**
 * Recovers an antelope based private key from BIP39 mnemonic.
 *
 * @param recoveryPhrase 32 bytes of data.
 * import recoverMnemonic from "antelope-ecc/mnemonic-recover"
 *
 * recoverMnemonic([your, twenty, four, words, go, here, …]).then(console.log)
 * ```
 * The logged output was [abandon, busy, …].
 */
export default function recoverMnemonic(
  recoveryPhrase: string
): Promise<Uint8Array<ArrayBuffer>>;
