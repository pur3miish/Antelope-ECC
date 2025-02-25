/**
 * Generates a BIP39 24-word mnemonic representing a 32-byte private key.
 *
 * @param bytes - 32 bytes of data, typically a private key.
 * @returns A Promise that resolves to an array of strings representing the BIP39 mnemonic.
 *
 * @example
 * ```ts
 * import createMnemonic from "antelope-ecc/mnemonic-create.js";
 *
 * const bytes = crypto.randomBytes(32); // The private key
 * createMnemonic(bytes).then(console.log); // BIP39 words.
 * ```
 * The logged output will be an array like: `['abandon', 'busy', …]`.
 */
export default function createMnemonic(bytes: Uint8Array): Promise<string>;
