import { create } from "zustand";
import { ConfigState, Encryption } from "./types";

interface MessageState {
  content: string;
  config: ConfigState;
  updateContent: (updatedContent: string) => void;
  updateEncryption: (encryption: Encryption) => void;
  updateOpenLimit: (limit: number) => void;
}

const useMessageStore = create<MessageState>((set, get) => ({
  content: "",
  config: {
    encryption: Encryption["AES-GCM"],
    openLimit: 5,
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
}));

export default useMessageStore;
