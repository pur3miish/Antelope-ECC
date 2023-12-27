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

  const assertation = await navigator.credentials.get({
    publicKey: {
      timeout: 6e4,
      allowCredentials: credential_ids.map((id) => ({
        id: Uint8Array.from(
          window
            .atob(id.replace(/-/gmu, "+").replace(/_/gmu, "/"))
            .split("")
            .map((i) => i.charCodeAt())
        ),
        type: "public-key",
      })),
      challenge,
    },
  });

  return antelopeWebAuthnSignature(assertation.response);
}
