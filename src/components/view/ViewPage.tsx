"use client";

import { useEffect, useState } from "react";

export default function ViewPage({ messageId }: { messageId: string }) {
  const [messageData, setMessageData] = useState<string>("Loading...");

  const fetchMessage = async () => {
    const request = await fetch(`/api/view?message_id=${messageId}`);
    const response = await request.json();
    if (response.status !== 200) setMessageData("Message Not Found");
    else setMessageData(response.data.content);
    console.log(response);
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  return <div>Message: {messageData}</div>;
}
