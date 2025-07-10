export enum Encryption {
  "AES-GCM" = "AES-GCM",
  "XChaCha20" = "XChaCha20",
}

export interface ConfigState {
  encryption: Encryption;
  openLimit: number;
}

export interface MessageData {
  content: string;
  config: ConfigState;
}
