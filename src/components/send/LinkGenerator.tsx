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

const SEND_API = "/api/send";
const BASE_URL = window.location.origin;

export default function LinkGenerator() {
  const { content, config } = useMessageStore();
  const [link, setLink] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const generateLink = useCallback(async () => {
    console.log("Generating link...", content, config);

    if (content.trim() === "") {
      toast.error("You can't send empty message!");
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
        body: JSON.stringify({
          messageBytes: messageBytes,
          config: safeConfig,
        }),
      });
      const response = await request.json();
      console.log(response);
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
      <div className="relative">
        <Button
          className="w-full h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold text-lg rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl border-0 relative overflow-hidden group"
          onClick={generateLink}
          disabled={isGenerating}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="flex items-center justify-center gap-3 relative z-10">
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

          <div className="absolute top-0 left-0 w-8 h-8 bg-white/10 rounded-full blur-sm -translate-x-4 -translate-y-4 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-white/10 rounded-full blur-sm translate-x-3 translate-y-3 animate-pulse delay-500"></div>
        </Button>
      </div>

      {link && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border-2 border-green-200 dark:border-green-800 shadow-lg relative overflow-hidden transition-all duration-500 animate-in slide-in-from-bottom-4">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-2xl"></div>
          <div className="absolute top-2 right-2 w-3 h-3 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full opacity-60"></div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-green-800 dark:text-green-200">
                  Secure Link Generated
                </h3>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Your message is now ready to share
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-green-200 dark:border-green-700 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Link2 className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Generated Link
                </span>
                <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/20 rounded-full text-xs text-green-700 dark:text-green-300">
                  <Shield className="w-3 h-3" />
                  <span>Encrypted</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 group">
                <input
                  type="text"
                  value={`${BASE_URL}/view/${link}`}
                  readOnly
                  className="flex-1 text-sm text-slate-700 dark:text-slate-300 font-mono bg-transparent border-none outline-none select-all cursor-pointer"
                />
                <button
                  onClick={copyToClipboard}
                  className="p-2 text-slate-500 hover:text-green-600 dark:text-slate-400 dark:hover:text-green-400 transition-colors duration-200 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20"
                  title="Copy link"
                >
                  {isCopied ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-3"></div>

            <div className="flex items-center justify-center gap-6 text-xs text-green-600 dark:text-green-400 pt-2">
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>End-to-End Encrypted</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Self-Destructing</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
