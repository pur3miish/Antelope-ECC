export default function encodeDerPublic_key(xCoordinate, yCoordinate) {
  // Concatenate X and Y coordinates
  const concatenatedCoordinates = Buffer.concat([xCoordinate, yCoordinate]);

  // Uncompressed point format (0x04)
  const uncompressedPrefix = Buffer.from("04", "hex");

  // Create the DER-encoded public key
  const derEncodedPublicKey = Buffer.concat([
    uncompressedPrefix,
    concatenatedCoordinates,
  ]);

  // If the length is greater than 127, use multi-byte length encoding
  const totalLength = derEncodedPublicKey.length;
  const lengthBuffer =
    totalLength <= 127
      ? Buffer.from([totalLength])
      : Buffer.from([0x81, totalLength]);

  // Combine length and DER-encoded public key
  const finalDEREncoding = Buffer.concat([lengthBuffer, derEncodedPublicKey]);

  return finalDEREncoding.toString("hex");
}
