const keyHex = import.meta.env.VITE_ENCRYPTION_KEY;

async function decrypt(
  encryptedData: string,
  ivHex: string,
): Promise<string> {
  // Validate inputs
  if (!encryptedData || typeof encryptedData !== 'string') {
    throw new Error('Invalid encrypted data');
  }
  if (!ivHex || typeof ivHex !== 'string') {
    throw new Error('Invalid IV');
  }
  if (!keyHex || typeof keyHex !== 'string') {
    throw new Error('Invalid key');
  }

  try {
    // Convert hex strings to ArrayBuffers
    const iv = hexToArrayBuffer(ivHex);
    const keyData = hexToArrayBuffer(keyHex);
    const encryptedBuffer = hexToArrayBuffer(encryptedData);

    // Validate IV length (16 bytes for AES-CBC)
    if (iv.byteLength !== 16) {
      throw new Error('IV must be 16 bytes');
    }

    // Import the key
    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'AES-CBC' },
      false,
      ['decrypt']
    );

    // Decrypt the data
    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: 'AES-CBC', iv },
      key,
      encryptedBuffer
    );

    // Convert decrypted ArrayBuffer to string and parse JSON
    const decryptedText = new TextDecoder().decode(decryptedBuffer);
    return decryptedText;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Unknown decryption error';
    throw new Error(`Decryption failed: ${message}`);
  }
}

// Helper function to convert hex string to ArrayBuffer
function hexToArrayBuffer(hex: string): ArrayBuffer {
  if (!hex || typeof hex !== 'string') {
    throw new Error('Hex string is empty or invalid');
  }

  const matches = hex.match(/.{1,2}/g);
  if (!matches) {
    throw new Error('Hex string has invalid format');
  }

  const bytes = new Uint8Array(matches.map((byte) => Number.parseInt(byte, 16)));
  return bytes.buffer;
}

export default decrypt;