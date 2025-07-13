"use client";

import useMessageStore from "@/lib/useMessageStore";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useCallback, useState } from "react";
import { SafeContentAndConfig } from "@/lib/cryptolib";
import {
  Link2,
  Send,
  Copy,
  CheckCircle2,
  Shield,
  Sparkles,
  Loader2,
} from "lucide-react";
import QRCodeSection from "./QRCodeSection";

export default function LinkGenerator() {
  const SEND_API = "/api/send";
  const BASE_URL = typeof window !== undefined ? window?.location.origin : "";
  const { content, config } = useMessageStore();
  const [link, setLink] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const generateLink = useCallback(async () => {
    if (content.trim() === "") {
      toast.error("You can't send empty message!");
      return;
    }
    if (config.password.isEnabled && config.password.value === "") {
      toast.error("You can't have an empty password!");
      return;
    }

    setIsGenerating(true);

    try {
      const { messageBytes, safeConfig } = await SafeContentAndConfig(
        content,
        config
      );

      const request = await fetch(SEND_API, {
        method: "POST",
        body: JSON.stringify({ messageBytes, config: safeConfig }),
      });
      const response = await request.json();
      setLink(response.data.id);
      toast.success("Secure link generated successfully!");
    } catch (error) {
      console.error("Error generating link:", error);
      toast.error("Failed to generate link. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [content, config]);

  const copyToClipboard = useCallback(async () => {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(`${BASE_URL}/view/${link}`);
      setIsCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy link");
    }
  }, [link]);

  return (
    <div className="w-full space-y-6">
      <div>
        <Button
          className="w-full h-14 bg-[#0f0f0f] text-white font-semibold text-lg rounded-xl border border-[#333] hover:bg-[#1a1a1a] transition-all duration-200"
          onClick={generateLink}
          disabled={isGenerating}
        >
          <div className="flex items-center justify-center gap-3">
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating Secure Link...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Generate Secure Link</span>
                <Sparkles className="w-4 h-4 opacity-70" />
              </>
            )}
          </div>
        </Button>
      </div>

      {link && (
        <div className="bg-black/[0.96] rounded-xl p-6 text-neutral-200 shadow-lg space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#1f1f1f] rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">
                Secure Link Generated
              </h3>
              <p className="text-sm text-neutral-400">
                Your message is now ready to share
              </p>
            </div>
          </div>

          <div className="bg-black/[0.96] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Link2 className="w-4 h-4 text-neutral-400" />
              <span className="text-sm font-medium text-neutral-400">
                Generated Link
              </span>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-[#1e1e1e] rounded-full text-xs text-green-500 border border-green-700">
                <Shield className="w-3 h-3" />
                <span>Encrypted</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-[#0a0a0a] rounded-lg border border-[#333]">
              <input
                type="text"
                value={`${BASE_URL}/view/${link}`}
                readOnly
                className="flex-1 text-sm text-neutral-200 font-mono bg-transparent border-none outline-none select-all"
              />
              <button
                onClick={copyToClipboard}
                className="p-2 text-neutral-400 hover:text-green-400 transition-colors duration-200 rounded-lg hover:bg-[#1e1e1e]"
                title="Copy link"
              >
                {isCopied ? (
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="mt-3">
              <QRCodeSection link={`${BASE_URL}/view/${link}`} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
