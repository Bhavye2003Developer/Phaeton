import { create } from "zustand";

export enum Encryption {
  "AES-GCM" = "AES-GCM",
  "XChaCha20" = "XChaCha20",
}

interface ConfigState {
  encryption: Encryption;
  openLimit: number;
}

interface MessageState {
  content: string;
  configs: ConfigState;
  updateContent: (updatedContent: string) => void;
  updateEncryption: (encryption: Encryption) => void;
  updateOpenLimit: (limit: number) => void;
}

const useMessageStore = create<MessageState>((set, get) => ({
  content: "",
  configs: {
    encryption: Encryption["AES-GCM"],
    openLimit: 5,
  },
  updateContent: (updatedContent) => {
    set(() => ({ content: updatedContent }));
  },
  updateEncryption: (encryption) => {
    set((state) => ({ configs: { ...state.configs, encryption } }));
  },
  updateOpenLimit: (limit) => {
    set((state) => ({ configs: { ...state.configs, openLimit: limit } }));
  },
}));

export default useMessageStore;
