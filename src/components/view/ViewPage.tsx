"use client";

import { useEffect, useState } from "react";
import { LoadingState, MessageData } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import PasswordModal from "./PasswordModal";
import { decryptMessage } from "@/lib/cryptolib";
import { toast } from "sonner";
import Loader from "./renderOps/Loader";
import MessageNotFoundSection from "./renderOps/MessageNotFoundSection";
import NetworkErrorSection from "./renderOps/NetworkErrorSection";
import GenericErrorSection from "./renderOps/GenericErrorSection";
import { VIEW_API } from "@/lib/constants";
import Header from "./Header";
import DecryptedMessageView from "./views/DecryptedMessageView";
import PasswordRefusedView from "./views/PasswordRefusedView";
import BurnedMessage from "./views/BurnedMessage";
import DecryptingStateView from "./views/DecryptingStateView";

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
  });

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

  return (
    <div className="min-h-screen bg-black/[0.96] bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-2 sm:p-4 md:p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-2xl animate-pulse delay-500"></div>
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

      <Card className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl min-h-[60vh] sm:min-h-[70vh] bg-black/[0.96] backdrop-blur-xl dark:bg-slate-900/80 shadow-2xl border-0 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden relative z-10">
        <CardContent className="p-0 h-full">
          <Header
            loadingState={loadingState}
            burnTime={burnTime}
            isBurned={isBurned}
          />

          {/* Content Section */}
          <div className="p-3 sm:p-6 md:p-8 min-h-[40vh] sm:min-h-[50vh] flex flex-col relative">
            {loadingState === "loading" && <Loader />}
            {loadingState === "not_found" && (
              <MessageNotFoundSection messageId={messageId} />
            )}
            {loadingState === "network_error" && <NetworkErrorSection />}
            {loadingState === "error" && <GenericErrorSection />}

            <DecryptingStateView
              loadingState={loadingState}
              isDecrypting={isDecrypting}
            />

            <DecryptedMessageView
              loadingState={loadingState}
              isDecrypting={isDecrypting}
              decryptedText={decryptedText}
              isBurned={isBurned}
            />

            <PasswordRefusedView
              loadingState={loadingState}
              passwordRefused={passwordRefused}
            />

            <BurnedMessage
              showBurnedMessage={showBurnedMessage}
              messageData={messageData}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
