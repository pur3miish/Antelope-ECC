import { type Signature } from "isomorphic-secp256k1-js/utils.js";
type SignGrapheneCompatibleArgs = {
    private_key: Uint8Array;
    hash: Uint8Array;
};
/**
 * Sign using standard RFC 6979 ECDSA first, then apply Antelope's inherited
 * Graphene/BitShares rejection-and-retry policy when the first signature does
 * not have the historical component encoding shape.
 */
export default function sign_graphene_compatible({ private_key, hash, }: SignGrapheneCompatibleArgs): Promise<Signature>;
export {};
