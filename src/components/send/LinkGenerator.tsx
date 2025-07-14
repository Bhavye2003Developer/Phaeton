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
import { SEND_API } from "@/lib/constants";

export default function LinkGenerator() {
  const BASE_URL = typeof window !== undefined ? window.location.origin : "";
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
  }, [content, config, BASE_URL]);

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
    <div className="w-full space-y-4 sm:space-y-6 px-4 sm:px-0">
      <div>
        <Button
          className="w-full h-12 sm:h-14 bg-[#0f0f0f] text-white font-semibold text-base sm:text-lg rounded-xl border border-[#333] hover:bg-[#1a1a1a] transition-all duration-200"
          onClick={generateLink}
          disabled={isGenerating}
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                <span className="hidden xs:inline">
                  Generating Secure Link...
                </span>
                <span className="xs:hidden">Generating...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline">Generate Secure Link</span>
                <span className="xs:hidden">Generate</span>
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 opacity-70" />
              </>
            )}
          </div>
        </Button>
      </div>

      {link && (
        <div className="bg-black/[0.96] rounded-xl p-4 sm:p-6 text-neutral-200 shadow-lg space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-[#1f1f1f] rounded-xl">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-white text-sm sm:text-base">
                Secure Link Generated
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 truncate">
                Your message is now ready to share
              </p>
            </div>
          </div>

          <div className="bg-black/[0.96] rounded-xl p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-2 sm:mb-3 flex-wrap">
              <Link2 className="w-3 h-3 sm:w-4 sm:h-4 text-neutral-400" />
              <span className="text-xs sm:text-sm font-medium text-neutral-400">
                Generated Link
              </span>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-[#1e1e1e] rounded-full text-xs text-green-500 border border-green-700">
                <Shield className="w-3 h-3" />
                <span className="xs:inline">Encrypted</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 sm:p-3 bg-[#0a0a0a] rounded-lg border border-[#333]">
              <input
                type="text"
                value={`${BASE_URL}/view/${link}`}
                readOnly
                className="flex-1 text-xs sm:text-sm text-neutral-200 font-mono bg-transparent border-none outline-none select-all min-w-0"
              />
              <button
                onClick={copyToClipboard}
                className="p-1.5 sm:p-2 text-neutral-400 hover:text-green-400 transition-colors duration-200 rounded-lg hover:bg-[#1e1e1e] flex-shrink-0"
                title="Copy link"
              >
                {isCopied ? (
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="mt-3 sm:mt-4">
              <QRCodeSection link={`${BASE_URL}/view/${link}`} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
