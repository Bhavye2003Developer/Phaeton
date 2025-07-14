"use client";

import { useEffect, useState } from "react";
import { MessageData } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import clsx from "clsx";
import PasswordModal from "./PasswordModal";
import { decryptMessage } from "@/lib/cryptolib";
import {
  Shield,
  Clock,
  Flame,
  Lock,
  CheckCircle2,
  AlertTriangle,
  FileText,
} from "lucide-react";
import { formatTime } from "@/lib/utils";
import { toast } from "sonner";
import Loader from "./renderOps/Loader";
import MessageNotFoundSection from "./renderOps/MessageNotFoundSection";
import NetworkErrorSection from "./renderOps/NetworkErrorSection";
import GenericErrorSection from "./renderOps/GenericErrorSection";
import { VIEW_API } from "@/lib/constants";

type LoadingState =
  | "idle"
  | "loading"
  | "success"
  | "not_found"
  | "error"
  | "network_error";

export default function ViewPage({ messageId }: { messageId: string }) {
  const [messageData, setMessageData] = useState<MessageData | null>(null);
  const [burnTime, setBurnTime] = useState<number | null>(null);
  const [isBurned, setIsBurned] = useState(false);
  const [showBurnedMessage, setShowBurnedMessage] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [hasUserUnlocked, setHasUserUnlocked] = useState(false);
  const [decryptedText, setDecryptedText] = useState("");
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [passwordRefused, setPasswordRefused] = useState(false);
  const [originalPassword, setOriginalPassword] = useState("");
  const [loadingState, setLoadingState] = useState<LoadingState>("loading");

  const initiateBurnTimer = (initial: number) => {
    setBurnTime(initial);
    let remaining = initial;

    const timerId = setInterval(() => {
      remaining -= 1;
      setBurnTime(remaining);

      if (remaining <= 0) {
        clearInterval(timerId);
        setIsBurned(true);
        setTimeout(() => {
          setMessageData(null);
          setShowBurnedMessage(true);
        }, 800);
      }
    }, 1000);
  };

  const fetchMessage = async () => {
    try {
      setLoadingState("loading");
      const request = await fetch(`${VIEW_API}?message_id=${messageId}`);
      const response = await request.json();

      if (response.status === 404) {
        setLoadingState("not_found");
        return;
      }

      if (response.status !== 200) {
        setLoadingState("error");
        toast.error("Failed to load message");
        return;
      }

      const data: MessageData = response.data;
      setMessageData(data);
      setLoadingState("success");

      if (data.config.password.isEnabled) {
        setIsPasswordModalOpen(true);
      } else {
        setHasUserUnlocked(true);
      }
    } catch (err) {
      console.error("Failed to fetch message:", err);
      setLoadingState("network_error");
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  const initiateDecryption = async () => {
    if (!messageData) return;
    setIsDecrypting(true);

    try {
      console.log("Inside decryption...", messageData);
      const messageUint = new Uint8Array(
        Object.values(messageData.contentBytes)
      );
      const decrypted = await decryptMessage(
        messageUint.buffer,
        originalPassword
      );
      console.log("Decryption: ", decrypted);
      setDecryptedText(decrypted);
      if (messageData.config.burnTime !== 10e5)
        initiateBurnTimer(messageData.config.burnTime);
    } catch (err) {
      setDecryptedText("Failed to decrypt message.");
      console.log("Errror: ", err);
    } finally {
      setIsDecrypting(false);
    }
  };

  useEffect(() => {
    if (hasUserUnlocked) {
      initiateDecryption();
    }
  }, [hasUserUnlocked]);

  const handleCloseModal = () => {
    setIsPasswordModalOpen(false);
    if (!hasUserUnlocked) {
      setPasswordRefused(true);
    }
  };

  const getTimeColor = () => {
    if (!burnTime) return "text-green-400";
    if (burnTime > 60) return "text-green-400";
    if (burnTime > 30) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen bg-black/[0.96] bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-2 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {messageData && messageData.config.password.isEnabled && (
        <PasswordModal
          isOpen={isPasswordModalOpen}
          passwordData={messageData.config.password}
          toggleOpenPasswordModal={handleCloseModal}
          userUnlocked={(password: string) => {
            setPasswordRefused(false);
            setHasUserUnlocked(true);
            setOriginalPassword(password);
          }}
        />
      )}

      <Card className="w-full max-w-4xl min-h-[70vh] bg-black/[0.96] backdrop-blur-xl dark:bg-slate-900/80 shadow-2xl border-0 rounded-3xl overflow-hidden relative z-10">
        <CardContent className="p-0 h-full">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-8 py-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm"></div>
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-xl -translate-x-16 -translate-y-16 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl translate-x-12 translate-y-12 animate-pulse delay-1000"></div>

            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/20 shadow-lg">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
                    Secure Message
                    {loadingState === "success" && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-white/20 rounded-full text-xs">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Protected</span>
                      </div>
                    )}
                  </h2>
                  <p className="text-blue-100 text-sm opacity-90">
                    {loadingState === "loading" &&
                      "Connecting to secure server..."}
                    {loadingState === "success" &&
                      "Password protected message with view limitations"}
                    {loadingState === "not_found" &&
                      "Message could not be located"}
                    {loadingState === "network_error" &&
                      "Connection issues detected"}
                    {loadingState === "error" && "Server error encountered"}
                  </p>
                </div>
              </div>

              {burnTime !== null && burnTime > 0 && !isBurned && (
                <div
                  className={`flex items-center gap-3 bg-white/20 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/20 shadow-lg transition-all duration-300 ${
                    burnTime <= 30 ? "animate-pulse" : ""
                  }`}
                >
                  <Clock className={`w-5 h-5 ${getTimeColor()}`} />
                  <div>
                    <div className={`text-lg font-bold ${getTimeColor()}`}>
                      {formatTime(burnTime)}
                    </div>
                    <div className="text-xs text-white/70">
                      {burnTime > 60
                        ? "Safe"
                        : burnTime > 30
                        ? "Warning"
                        : "Critical"}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-8 min-h-[50vh] flex flex-col relative">
            {loadingState === "loading" && <Loader />}
            {loadingState === "not_found" && (
              <MessageNotFoundSection messageId={messageId} />
            )}
            {loadingState === "network_error" && <NetworkErrorSection />}
            {loadingState === "error" && <GenericErrorSection />}

            {loadingState === "success" && isDecrypting && (
              <div className="flex flex-col items-center justify-center space-y-6 flex-1">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 shadow-lg"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur animate-pulse"></div>
                </div>
                <div className="text-center">
                  <p className="text-slate-700 dark:text-slate-200 text-lg font-medium animate-pulse">
                    Decrypting your message...
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    Please wait while we retrieve your content
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-700 dark:text-blue-300">
                    Processing securely
                  </span>
                </div>
              </div>
            )}

            {loadingState === "success" && !isDecrypting && decryptedText && (
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Message Content
                  </span>
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/20 rounded-full text-xs text-green-700 dark:text-green-300">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Loaded</span>
                  </div>
                </div>

                <div
                  className={clsx(
                    "flex-1 p-8 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-2 border-slate-200 dark:border-slate-700 shadow-xl transition-all duration-700 overflow-auto relative group",
                    {
                      "opacity-0 scale-95 blur-sm": isBurned,
                      "opacity-100 scale-100 blur-0": !isBurned,
                    }
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="text-slate-800 dark:text-slate-100 text-lg leading-relaxed whitespace-pre-wrap break-words text-left relative z-10 font-medium">
                    {decryptedText}
                  </div>

                  <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-50"></div>
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-50"></div>
                </div>
              </div>
            )}

            {loadingState === "success" && passwordRefused && (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center p-8 max-w-md">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/20 dark:to-red-800/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                    Authentication Required
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                    This message is password protected and requires
                    authentication to view its contents.
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-xl border border-red-200 dark:border-red-800">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm font-medium">Access Denied</span>
                  </div>
                </div>
              </div>
            )}

            {showBurnedMessage && (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center p-8 max-w-md">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-200 dark:from-orange-900/20 dark:to-red-800/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Flame className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                    Message No Longer Available
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                    {messageData?.config.openLimit &&
                    messageData.config.openLimit > 0
                      ? "This message has reached its maximum number of views and is no longer accessible."
                      : "This message has burned after the timer expired and is no longer accessible."}
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 rounded-xl border border-orange-200 dark:border-orange-800">
                    <Flame className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {messageData?.config.openLimit &&
                      messageData.config.openLimit > 0
                        ? "View Limit Reached"
                        : "Burn Timer Expired"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
