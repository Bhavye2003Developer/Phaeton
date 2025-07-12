import { Shield } from "lucide-react";
import BurnTimerSection from "./configs/BurnTimerSection";
import OpenLimitSection from "./configs/OpenLimitSection";
import PasswordSection from "./configs/PasswordSection";

export default function ConfigSection() {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                  Configuration
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Configure your secure message settings
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <OpenLimitSection />
            <BurnTimerSection />
            <PasswordSection />
          </div>
        </div>
      </div>
    </div>
  );
}
