import { ConfigState, Encryption } from "./types";

const enc = new TextEncoder();
const dec = new TextDecoder("utf-8");

const DEFAULT_PASSWORD = process.env.NEXT_PUBLIC_DEFAULT_PASSWORD;

export async function SafeContentAndConfig(
  content: string,
  config: ConfigState
) {
  const safeConfig = structuredClone(config);

  const password =
    safeConfig.password.isEnabled && safeConfig.password.value.trim() !== ""
      ? safeConfig.password.value
      : DEFAULT_PASSWORD!;

  const safeContent = await encryptMessage(content, password);

  if (safeConfig.password.isEnabled)
    safeConfig.password.value = await hashContent(password);
  else safeConfig.password.value = "";

  const messageBytes = new Uint8Array(safeContent);

  return { messageBytes, safeConfig };
}

export async function hashContent(content: string) {
  const msgBuffer = enc.encode(content);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

function generateKey(password: string, keyUsage: KeyUsage) {
  const key = new Uint8Array(16);

  for (let index = 0; index < 16; ++index) {
    key[index] = password.charCodeAt(index % password.length);
  }

  const encodedKey = crypto.subtle.importKey(
    "raw",
    key.buffer,
    "AES-GCM",
    false,
    [keyUsage]
  );
  return encodedKey;
}

async function encryptMessage(message: string, password: string) {
  const encoded = enc.encode(message);
  const iv = enc.encode(password);
  const cryptoKey = await generateKey(password, "encrypt");
  console.log(cryptoKey);

  const encryptedMessage = await crypto.subtle.encrypt(
    {
      name: Encryption["AES-GCM"],
      iv,
    },
    cryptoKey,
    encoded
  );
  return encryptedMessage;
}

export async function decryptMessage(
  cipherText: ArrayBuffer,
  MessagePassword: string
) {
  const password = MessagePassword !== "" ? MessagePassword : DEFAULT_PASSWORD!;

  const iv = enc.encode(password);
  const cryptoKey = await generateKey(password, "decrypt");
  const decryptedMessageBuffer = await crypto.subtle.decrypt(
    { name: Encryption["AES-GCM"], iv },
    cryptoKey,
    cipherText
  );

  const message = dec.decode(decryptedMessageBuffer);
  return message;
}

export async function checkPassword(
  password: string,
  originalHashedPassword: string
) {
  const userHashedPassword = await hashContent(password);
  if (userHashedPassword === originalHashedPassword) return true;
  return false;
}
