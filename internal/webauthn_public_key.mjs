import binary_to_base58 from "base58-js/binary_to_base58.mjs";
import ripemd160 from "ripemd160-js/ripemd160.mjs";
import sha256 from "universal-sha256-js/sha256.mjs";

import decodeCBOR from "./cbor-decode.mjs";

export default async function createAntelopeWebAuthnPublicKey({
  attestationObject,
  clientDataJSON,
}) {
  const { authData } = decodeCBOR(attestationObject);

  const clientData = JSON.parse(
    new Uint8Array(clientDataJSON).reduce(
      (acc, i) => (acc += String.fromCharCode(i)),
      ""
    )
  );

  const rpid = new URL(clientData.origin).hostname;
  const rpid_hash = authData.slice(0, 32);

  const ripid_chars = [];
  for (let i = 0; i < rpid.length; i++) ripid_chars.push(rpid[i].charCodeAt(0));

  const check_hash = await sha256(Uint8Array.from(ripid_chars));

  new Uint8Array(check_hash).forEach((i, x) => {
    if (i != rpid_hash[x]) throw new Error("Invalid rpid hash");
  });

  const CredIDLenBuffer = new Uint16Array(authData.slice(53, 55));
  const credIDLen = (CredIDLenBuffer[0] << 8) | CredIDLenBuffer[1]; // readUInt16BE
  const COSEPublicKey = authData.slice(55 + credIDLen, authData.length);
  const public_key = decodeCBOR(new Uint8Array(COSEPublicKey).buffer);

  const x = public_key[-2];

  const prefix = public_key[-3].slice(-1) & 1 ? 3 : 2;

  const webauthn_public_key = [
    prefix,
    ...x,
    2,
    ripid_chars.length,
    ...ripid_chars,
  ];

  const checksum = await ripemd160(
    Uint8Array.from([...webauthn_public_key, 87, 65]) // 87, 65 -> WA ascii
  );

  const antelope_public_key =
    "PUB_WA_" +
    binary_to_base58(
      Uint8Array.from([...webauthn_public_key, ...checksum.slice(0, 4)])
    );

  return antelope_public_key;
}
