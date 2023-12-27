export default function decodeDER(der) {
  if (der[0] !== 0x30)
    throw new Error("Expected der encoded signature to start with 0x30");
  if (der[2] !== 0x02)
    throw new Error(
      "Expected 3rd byte of der encoded signature to be 0x02 indicating a number"
    );

  const length_of_sig = der[1];
  const r_len = der[3];
  const r = der.slice(4, 4 + r_len);
  const [int_0x02] = der.slice(4 + r_len, 5 + r_len);
  if (int_0x02 !== 0x02) throw new Error("Invalid DER Encoded signature");

  const s_len_pos = 5 + r_len;
  const [s_length] = der.slice(s_len_pos, s_len_pos + 1);

  if (Number(r_len) + Number(s_length) + 4 !== length_of_sig)
    throw new Error("Invalid DER signature length");

  const s = der.slice(s_len_pos + 1, s_len_pos + s_length + 1);

  return {
    r: r[0] ? r : r.slice(1),
    s: s[0] ? s : s.slice(1),
  };
}
