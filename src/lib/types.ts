export enum Encryption {
  "AES-GCM" = "AES-GCM",
}

export enum PasswordType {
  "text",
  "number",
}

export interface ConfigState {
  encryption: Encryption;
  openLimit: number;
  burnTime: number;
  password: Password;
}

export interface MessageData {
  id: string;
  contentBytes: object;
  config: ConfigState;
}

export type Password = {
  isEnabled: boolean;
  type: PasswordType;
  value: string;
};
