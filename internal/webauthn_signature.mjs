import binary_to_base58 from "base58-js/binary_to_base58.mjs";
import varuint32 from "eosio-wasm-js/varuint32.mjs";
import ripemd160 from "ripemd160-js/ripemd160.mjs";

import decodeDER from "./decode-der.mjs";
import { calculateRecID } from "./solve-y-coordinate-secp256r1.mjs";

export default async function webAuthSig({
  authenticatorData,
  signature,
  clientDataJSON,
}) {
  const { r, s } = decodeDER(new Uint8Array(signature));

  const r_val = BigInt(
    r.reduce((acc, i) => (acc += i.toString("16").padStart(2, "0")), "0x")
  );

  const recid = calculateRecID(r_val);

  const sig = Uint8Array.from([
    recid + 27 + 4,
    ...r,
    ...s,
    ...varuint32(authenticatorData.length ?? authenticatorData.byteLength)
      .match(/[a-z0-9]{2}/gmu)
      .map((i) => Number(`0x${i}`)),
    ...new Uint8Array(authenticatorData),
    ...varuint32(clientDataJSON.length ?? clientDataJSON.byteLength)
      .match(/[a-z0-9]{2}/gmu)
      .map((i) => Number(`0x${i}`)),
    ...new Uint8Array(clientDataJSON),
  ]);

  const WA = [87, 65];

  const checksum = await (
    await ripemd160(Uint8Array.from([...sig, ...WA]))
  ).slice(0, 4);

  return "SIG_WA_" + binary_to_base58(Uint8Array.from([...sig, ...checksum]));
}
