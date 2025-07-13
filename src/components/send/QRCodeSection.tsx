import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QRCodeCanvas } from "qrcode.react";

export default function QRCodeSection({ link }: { link: string }) {
  return (
    <Card className="rounded-2xl border border-[#333] bg-black/[0.96] text-neutral-200 shadow-md">
      <CardHeader className="text-center">
        <CardTitle className="text-md font-medium text-neutral-400">
          Scan to View Message
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-sm transition hover:scale-105">
          <QRCodeCanvas
            value={link}
            className="rounded-sm"
            size={160}
            level="H"
            marginSize={3}
          />
        </div>
      </CardContent>
    </Card>
  );
}
