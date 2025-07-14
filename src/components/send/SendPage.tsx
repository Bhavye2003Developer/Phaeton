"use client";

import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Textarea } from "../ui/textarea";
import ConfigSection from "./ConfigSection";
import LinkGenerator from "./LinkGenerator";
import useMessageStore from "@/lib/useMessageStore";
import { Shield, Lock, Send, FileText } from "lucide-react";

export default function SendPage() {
  const { content, updateContent } = useMessageStore();

  return (
    <div className="min-h-screen bg-black/[0.96] text-[--text-primary] flex items-center justify-center p-6 relative overflow-hidden font-inter">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <Card className="w-full max-w-4xl glass-strong rounded-3xl border border-[--border-primary] shadow-[--shadow-md] relative z-10 bg-black/[0.96]">
        <CardContent className="p-0">
          <div className="bg-gradient-primary px-8 py-8 text-white relative overflow-hidden rounded-t-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/20 shadow">
                <Send className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold mb-1 flex items-center gap-2">
                  Create Secure Message
                  <span className="flex items-center gap-1 px-2 py-1 bg-white/20 rounded-full text-xs">
                    <Shield className="w-3 h-3" />
                    Protected
                  </span>
                </CardTitle>
                <CardDescription className="text-sm opacity-90 text-[--text-secondary]">
                  Your message will be end-to-end encrypted and deleted after
                  being read once.
                </CardDescription>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-[--text-muted]" />
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-[--text-secondary]"
                >
                  Message Content
                </label>
                <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/20 rounded-full text-xs text-blue-700 dark:text-blue-300">
                  <Lock className="w-3 h-3" />
                  <span>Encrypted (AES-GCM)</span>
                </div>
              </div>

              <div className="relative group">
                <Textarea
                  id="message"
                  className="resize-none focus-visible:ring-2 focus-visible:ring-[--accent-primary] focus-visible:ring-offset-2 h-64 overflow-auto rounded-2xl bg-[--bg-secondary] border border-[--border-primary] shadow-[--shadow-sm] transition-all duration-300 p-6 text-lg leading-relaxed"
                  placeholder="Type your secure message here..."
                  autoFocus
                  value={content}
                  onChange={(e) => updateContent(e.target.value)}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 border border-[--border-primary] shadow-[--shadow-sm] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl"></div>
              <div className="relative z-10">
                <ConfigSection />
              </div>
            </div>
          </div>

          <div className="px-8 pb-8">
            <div className="glass rounded-2xl p-6 border border-[--border-primary] shadow-[--shadow-sm] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl"></div>
              <div className="relative z-10">
                <LinkGenerator />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
