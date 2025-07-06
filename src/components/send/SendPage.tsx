"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import ConfigSection from "./ConfigSection";
import LinkGenerator from "./LinkGenerator";
import useMessageStore from "@/lib/useMessageStore";

export default function SendPage() {
  const { content, updateContent } = useMessageStore();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="shadow-xl rounded-2xl border border-muted">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold">
            Secure Message
          </CardTitle>
          <CardDescription>
            Your message will be end-to-end encrypted and deleted after being
            read once.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <label
              htmlFor="message"
              className="text-sm font-medium text-muted-foreground"
            >
              Message
            </label>
            <Textarea
              id="message"
              className="resize-none focus-visible:ring-1 focus-visible:ring-ring h-64 overflow-auto"
              placeholder="Type your secure message..."
              autoFocus
              value={content}
              onChange={(e) => updateContent(e.target.value)}
            />
          </div>
          <div>
            <ConfigSection />
          </div>
        </CardContent>
        <CardFooter>
          <LinkGenerator />
        </CardFooter>
      </Card>
    </div>
  );
}
