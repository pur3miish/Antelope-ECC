import base58_to_binary from "base58-js/base58_to_binary.mjs";
import sha256 from "universal-sha256-js/sha256.mjs";

import solveForY from "./internal/solve-y-coordinate-secp256r1.mjs";

function base64UrlEncode(uint8Array) {
  const base64String =
    typeof btoa !== "undefined"
      ? btoa(String.fromCharCode.apply(null, uint8Array))
      : Buffer.from(uint8Array).toString("base64");

  return base64String
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function bigintToUint8Array(bigint) {
  const length = Math.ceil(bigint.toString(2).length / 8);
  const buffer = new ArrayBuffer(length);
  const view = new DataView(buffer);

  for (let i = length - 1; i >= 0; i--) {
    view.setUint8(i, Number(bigint & 0xffn));
    bigint >>= 8n;
  }

  return new Uint8Array(buffer);
}

function decodeLEB128(bytes) {
  let result = 0;
  let shift = 0;
  let byte;

  do {
    byte = bytes.shift();
    result |= (byte & 0x7f) << shift;
    shift += 7;
  } while (byte & 0x80);

  if (shift < 32 && byte & 0x40) result |= -1 << shift;

  return result;
}

export default async function verifyWebAuthnSignature(signature, public_key) {
  const sig = base58_to_binary(signature.replace("SIG_WA_", "")).slice(0, -4);

  const r = sig.slice(1, 33);
  const s = sig.slice(33, 65);

  const authenticatorData_len_bytes = [];
  let authenticatorData_len_pos = 65;
  authenticatorData_len_bytes.push(sig[authenticatorData_len_pos]);
  do {
    authenticatorData_len_bytes.push(sig[authenticatorData_len_pos]);
    authenticatorData_len_pos += 1;
  } while (sig[authenticatorData_len_pos] & 0x80);

  const authenticatorData_len = decodeLEB128(authenticatorData_len_bytes);
  const authenticatorData = sig.slice(66, 66 + authenticatorData_len);

  const clientData_length_bytes = [];
  let clientData_length_pos = 66 + authenticatorData_len;
  clientData_length_bytes.push(sig[clientData_length_pos]);

  do {
    clientData_length_pos += 1;
    clientData_length_bytes.push(sig[clientData_length_pos]);
  } while (sig[clientData_length_pos] & 0x80);
  const clientData_length = decodeLEB128(clientData_length_bytes);
  const clientDataJSON = sig.slice(-clientData_length);
  const clientDataHash = new Uint8Array(
    await sha256(new Uint8Array(clientDataJSON))
  );

  const signedData = new Uint8Array(
    authenticatorData.length + clientDataHash.length
  );

  signedData.set(authenticatorData);
  signedData.set(clientDataHash, authenticatorData.length);

  const prefix_x_coordinate = base58_to_binary(
    public_key.replace("PUB_WA_", "")
  );

  const x_array = prefix_x_coordinate.slice(1, 33);
  const prefix = prefix_x_coordinate[0];

  const y_array = bigintToUint8Array(
    solveForY(
      BigInt(
        x_array.reduce(
          (acc, i) => (acc += String(i.toString("16")).padStart(2, "0")),
          "0x"
        )
      ),
      prefix
    )
  );

  const x = base64UrlEncode(x_array);
  const y = base64UrlEncode(y_array);

  const key = await crypto.subtle.importKey(
    "jwk",
    { kty: "EC", crv: "P-256", x, y },
    { name: "ECDSA", namedCurve: "P-256", hash: { name: "SHA-256" } },
    false,
    ["verify"]
  );

  return await crypto.subtle.verify(
    { name: "ECDSA", namedCurve: "P-256", hash: { name: "SHA-256" } },
    key,
    Uint8Array.from([...r, ...s]),
    signedData.buffer
  );
}
