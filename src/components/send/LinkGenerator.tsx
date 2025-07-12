"use client";

import useMessageStore from "@/lib/useMessageStore";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useCallback, useState } from "react";
import { SafeContentAndConfig } from "@/lib/cryptolib";

const SEND_API = "/api/send";

export default function LinkGenerator() {
  const { content, config } = useMessageStore();
  const [link, setLink] = useState("");

  const generateLink = useCallback(async () => {
    console.log("Generating link...", content, config);

    if (content.trim() === "")
      return toast.error("You can't send empty message!");

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
  }, [content, config]);

  return (
    <div className="w-full">
      <Button className="w-full" onClick={generateLink}>
        Generate Link
      </Button>
      Generated Link: {`/${link}`}
    </div>
  );
}
