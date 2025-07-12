import BurnTimerSection from "./configs/BurnTimerSection";
import EncryptionSection from "./configs/EncryptionSection";
import OpenLimitSection from "./configs/OpenLimitSection";
import PasswordSection from "./configs/PasswordSection";

export default function ConfigSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium">Configuration</h2>
      </div>

      <div className="space-y-2">
        {/* <EncryptionSection /> */}
        <OpenLimitSection />
        <BurnTimerSection />
        <PasswordSection />
      </div>
    </div>
  );
}
