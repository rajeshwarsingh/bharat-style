const textEncoder = new TextEncoder();

function bytesToHex(bytes: Uint8Array): string {
  let out = '';
  for (let i = 0; i < bytes.length; i++) out += bytes[i].toString(16).padStart(2, '0');
  return out;
}

function countLeadingZeroBits(bytes: Uint8Array): number {
  let bits = 0;
  for (const b of bytes) {
    if (b === 0) {
      bits += 8;
      continue;
    }
    // Count leading zeros in this byte
    for (let i = 7; i >= 0; i--) {
      if (((b >> i) & 1) === 0) bits++;
      else return bits;
    }
  }
  return bits;
}

async function sha256Bytes(input: string): Promise<Uint8Array> {
  const data = textEncoder.encode(input);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return new Uint8Array(digest);
}

export async function sha256Hex(input: string): Promise<string> {
  const bytes = await sha256Bytes(input);
  return bytesToHex(bytes);
}

export async function solveTrackCourierPow(params: {
  challenge: string;
  difficulty: number;
  startNonce?: number;
  maxNonce?: number;
}): Promise<{ nonce: number; hash: string }> {
  const { challenge, difficulty, startNonce = 0, maxNonce = 10_000_000 } = params;

  for (let nonce = startNonce; nonce <= maxNonce; nonce++) {
    const bytes = await sha256Bytes(`${challenge}${nonce}`);
    if (countLeadingZeroBits(bytes) >= difficulty) {
      return { nonce, hash: bytesToHex(bytes) };
    }
  }

  throw new Error(`Failed to solve PoW within nonce range ${startNonce}..${maxNonce}`);
}


