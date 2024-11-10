import antelopeWebAuthnSignature from "./internal/webauthn_signature.mjs";

/**
 * Create antelope webauthn signature.
 * @param {Array<string>} credential_ids
 * @param {Uint8Array| String} hash
 * @returns
 */
export default async function createWebAuthnSignature(credential_ids, hash) {
  const challenge =
    typeof hash == "string"
      ? Uint8Array.from(
          hash.match(/[a-fA-F0-9]{2}/gmu).map((x) => Number(`0x${x}`))
        )
      : hash;

  const allowCredentials = credential_ids.map((id) => ({
    id: Uint8Array.from(
      window
        .atob(id.replace(/-/gmu, "+").replace(/_/gmu, "/"))
        .split("")
        .map((i) => i.charCodeAt())
    ),
    type: "public-key",
    alg: -7,
  }));

  const assertation = await window.navigator.credentials.get({
    publicKey: {
      userVerification: "required",
      timeout: 6e4,
      allowCredentials,
      challenge,
    },
  });

  return antelopeWebAuthnSignature(assertation.response);
}
