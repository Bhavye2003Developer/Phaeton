import BurnTimerSection from "./configs/BurnTimerSection";
import EncryptionSection from "./configs/EncryptionSection";
import OpenLimitSection from "./configs/OpenLimitSection";

export default function ConfigSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium">Configuration</h2>
      </div>

      <div className="space-y-2">
        {/* <ConfigItem label="Encryption" value="AES-GCM" />
        <ConfigItem label="Open Limit" value="1" />
        <ConfigItem label="Expiry" value="24 hours" /> */}
        <EncryptionSection />
        <OpenLimitSection />
        <BurnTimerSection />
      </div>
    </div>
  );
}
