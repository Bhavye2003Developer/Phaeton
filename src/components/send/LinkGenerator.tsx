"use client";

import { Button } from "../ui/button";

export default function LinkGenerator() {
  const generateLink = () => {
    console.log("Generating link...");

    const SEND_API = "/api/send";

    fetch(SEND_API, {
      method: "POST",
      body: JSON.stringify({
        content: "Hello bhavye",
      }),
    });
  };

  return (
    <div className="w-full">
      <Button className="w-full" onClick={generateLink}>
        Generate Link
      </Button>
    </div>
  );
}
