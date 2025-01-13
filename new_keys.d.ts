/**
 * Generate a new pair of Antelope public and private keys (PUB_K1 and PVT_K1).
 * @example <caption>Usage `new_keys`.</caption>
 * ```js
 * import newAntelopeKeys from 'antelope-ecc/new_keys'
 * new_keys().then(console.log)
 * ```
 * The logged output will be an object containing PUB_K1 and PVT_K1 wif keys.
 */
export default function new_keys(seed?: Uint8Array): Promise<newAntelopeKeysReturn>;
type newAntelopeKeysReturn = {
    public_key: string;
    private_key: string;
};
export {};
