import { create } from "zustand";
import { ConfigState, Encryption, PasswordType } from "./types";

interface MessageState {
  content: string;
  config: ConfigState;
  updateContent: (updatedContent: string) => void;
  updateEncryption: (encryption: Encryption) => void;
  updateOpenLimit: (limit: number) => void;
  updateBurnTime: (burnLimit: number) => void;
  updatePasswordConfig: (passwordConfig: {
    isEnabled: boolean;
    type: PasswordType;
    value: string;
  }) => void;
}

const useMessageStore = create<MessageState>((set) => ({
  content: "",
  config: {
    encryption: Encryption["AES-GCM"],
    openLimit: 5,
    burnTime: 10,
    password: {
      isEnabled: false,
      type: PasswordType.text,
      value: "",
    },
  },
  updateContent: (updatedContent) => {
    set(() => ({ content: updatedContent }));
  },
  updateEncryption: (encryption) => {
    set((state) => ({ config: { ...state.config, encryption } }));
  },
  updateOpenLimit: (limit) => {
    console.log("Inside upateopenlimit: ", limit);
    set((state) => ({ config: { ...state.config, openLimit: limit } }));
  },
  updateBurnTime: (burnLimit) => {
    set((state) => ({ config: { ...state.config, burnTime: burnLimit } }));
  },
  updatePasswordConfig: (passwordConfig) => {
    set((state) => ({ config: { ...state.config, password: passwordConfig } }));
  },
}));

export default useMessageStore;
