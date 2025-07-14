import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QRCodeCanvas } from "qrcode.react";
import { useState, useEffect } from "react";

export default function QRCodeSection({ link }: { link: string }) {
  const [qrSize, setQrSize] = useState(160);
  const [marginSize, setMarginSize] = useState(3);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 480) {
        setQrSize(100);
        setMarginSize(1);
      } else if (window.innerWidth < 640) {
        setQrSize(120);
        setMarginSize(2);
      } else if (window.innerWidth < 768) {
        setQrSize(140);
        setMarginSize(2);
      } else {
        setQrSize(160);
        setMarginSize(3);
      }
    };

    updateSize();

    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <Card className="rounded-lg sm:rounded-xl md:rounded-2xl border border-[#333] bg-black/[0.96] text-neutral-200 shadow-md">
      <CardHeader className="text-center pb-2 sm:pb-3 md:pb-4 px-3 sm:px-4 md:px-6">
        <CardTitle className="text-xs sm:text-sm md:text-base font-medium text-neutral-400">
          Scan to View Message
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center pb-3 sm:pb-4 md:pb-6 px-3 sm:px-4 md:px-6">
        <div className="bg-white rounded-md sm:rounded-lg shadow-sm transition-transform hover:scale-105 p-1 sm:p-2 md:p-3">
          <QRCodeCanvas
            value={link}
            className="rounded-sm"
            size={qrSize}
            level="H"
            marginSize={marginSize}
          />
        </div>
      </CardContent>
    </Card>
  );
}
