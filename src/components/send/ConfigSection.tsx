import { Shield } from "lucide-react";
import BurnTimerSection from "./configs/BurnTimerSection";
import OpenLimitSection from "./configs/OpenLimitSection";
import PasswordSection from "./configs/PasswordSection";

export default function ConfigSection() {
  return (
    <div className="bg-black/[0.96] text-neutral-200 rounded-2xl glass">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl shadow-md">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Configuration</h2>
            <p className="text-sm text-neutral-400">Secure message settings</p>
          </div>
        </div>

        <OpenLimitSection />
        <BurnTimerSection />
        <PasswordSection />
      </div>
    </div>
  );
}
