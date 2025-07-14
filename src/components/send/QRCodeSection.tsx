import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QRCodeCanvas } from "qrcode.react";

export default function QRCodeSection({ link }: { link: string }) {
  return (
    <Card className="rounded-xl sm:rounded-2xl border border-[#333] bg-black/[0.96] text-neutral-200 shadow-md">
      <CardHeader className="text-center pb-3 sm:pb-4">
        <CardTitle className="text-sm sm:text-base font-medium text-neutral-400">
          Scan to View Message
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center pb-4 sm:pb-6">
        <div className="bg-white rounded-lg shadow-sm transition-transform hover:scale-105 p-2 sm:p-3">
          <QRCodeCanvas
            value={link}
            className="rounded-sm"
            size={window.innerWidth < 640 ? 120 : 160}
            level="H"
            marginSize={window.innerWidth < 640 ? 2 : 3}
          />
        </div>
      </CardContent>
    </Card>
  );
}
