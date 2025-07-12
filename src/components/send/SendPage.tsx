"use client";

import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import ConfigSection from "./ConfigSection";
import LinkGenerator from "./LinkGenerator";
import useMessageStore from "@/lib/useMessageStore";
import { Shield, Lock, Send, FileText } from "lucide-react";

export default function SendPage() {
  const { content, updateContent } = useMessageStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <Card className="w-full max-w-4xl backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 shadow-2xl border-0 rounded-3xl overflow-hidden relative z-10">
        <CardContent className="p-0 h-full">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-8 py-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm"></div>
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-xl -translate-x-16 -translate-y-16 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl translate-x-12 translate-y-12 animate-pulse delay-1000"></div>

            <div className="flex items-center gap-4 relative z-10">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/20 shadow-lg">
                <Send className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold mb-1 flex items-center gap-2">
                  Create Secure Message
                  <div className="flex items-center gap-1 px-2 py-1 bg-white/20 rounded-full text-xs">
                    <Shield className="w-3 h-3" />
                    <span>Protected</span>
                  </div>
                </CardTitle>
                <CardDescription className="text-blue-100 text-sm opacity-90">
                  Your message will be end-to-end encrypted and deleted after
                  being read once.
                </CardDescription>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-slate-600 dark:text-slate-400"
                >
                  Message Content
                </label>
                <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/20 rounded-full text-xs text-blue-700 dark:text-blue-300">
                  <Lock className="w-3 h-3" />
                  <span>Encrypted</span>
                </div>
              </div>

              <div className="relative group">
                <Textarea
                  id="message"
                  className="resize-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 h-64 overflow-auto rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-2 border-slate-200 dark:border-slate-700 shadow-xl transition-all duration-300 p-6 text-lg leading-relaxed"
                  placeholder="Type your secure message here..."
                  autoFocus
                  value={content}
                  onChange={(e) => updateContent(e.target.value)}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-50"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-50"></div>
              </div>
            </div>

            <div className="relative">
              <Separator className="bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent blur-sm"></div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl"></div>
              <div className="relative z-10">
                <ConfigSection />
              </div>
            </div>
          </div>

          <div className="px-8 pb-8">
            <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg relative overflow-hidden">
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
