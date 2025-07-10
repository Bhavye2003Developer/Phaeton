"use client";

import { useEffect, useState } from "react";
import { MessageData } from "@/lib/types";
import { Timer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import clsx from "clsx";

export default function ViewPage({ messageId }: { messageId: string }) {
  const [messageData, setMessageData] = useState<MessageData | null>(null);
  const [burnTime, setBurnTime] = useState<number | null>(null);
  const [isBurned, setIsBurned] = useState(false);
  const [showBurnedMessage, setShowBurnedMessage] = useState(false);

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
      const request = await fetch(`/api/view?message_id=${messageId}`);
      const response = await request.json();
      if (response.status !== 200) return;

      const data: MessageData = response.data;
      setMessageData(data);
      initiateBurnTimer(data.config.burnTime);
    } catch (err) {
      console.error("Failed to fetch message:", err);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-2xl h-[65vh] flex flex-col justify-between shadow-md rounded-2xl border border-muted transition-all duration-700">
        <CardContent className="p-6 flex flex-col justify-between h-full">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              Secure Message
            </h2>
            {burnTime !== null && burnTime > 0 && !isBurned && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Timer className="w-4 h-4 mr-1" />
                <span>{burnTime}s</span>
              </div>
            )}
          </div>

          <div className="mt-6 flex-grow flex items-center justify-center">
            <div
              className={clsx(
                "text-base text-muted-foreground whitespace-pre-wrap break-words text-center leading-relaxed max-w-xl transition-opacity duration-700",
                {
                  "opacity-0": isBurned,
                  "opacity-100": !isBurned,
                }
              )}
            >
              {messageData?.content}
            </div>

            {showBurnedMessage && (
              <p className="text-red-500 font-medium text-center text-base transition-opacity duration-700">
                This message has been burned.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
