"use client";

import { MessageData } from "@/lib/types";
import { useEffect, useState } from "react";

export default function ViewPage({ messageId }: { messageId: string }) {
  const [messageData, setMessageData] = useState<MessageData | null>(null);

  const fetchMessage = async () => {
    const request = await fetch(`/api/view?message_id=${messageId}`);
    const response = await request.json();
    console.log("found response: ", response.data);
    if (response.status !== 200) {
      // setMessageData("Message Not Found");
      console.log("Message not found");
    } else setMessageData(response.data);
  };

  useEffect(() => {
    fetchMessage();
    return () => {
      console.log("unmounting...");
    };
  }, []);

  return <div>Message: {messageData?.content || "no message"}</div>;
}
