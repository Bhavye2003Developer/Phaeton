import { LoadingState } from "@/lib/types";
import { formatTime, getTimeColor } from "@/lib/utils";
import { CheckCircle2, Clock, Shield } from "lucide-react";

export default function Header({
  loadingState,
  burnTime,
  isBurned,
}: {
  loadingState: LoadingState;
  burnTime: number | null;
  isBurned: boolean;
}) {
  return (
    <div className="py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm"></div>
      <div className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white/10 rounded-full blur-xl -translate-x-8 -translate-y-8 sm:-translate-x-12 sm:-translate-y-12 md:-translate-x-16 md:-translate-y-16 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-12 h-12 sm:w-18 sm:h-18 md:w-24 md:h-24 bg-white/10 rounded-full blur-xl translate-x-6 translate-y-6 sm:translate-x-9 sm:translate-y-9 md:translate-x-12 md:translate-y-12 animate-pulse delay-1000"></div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="p-2 sm:p-3 bg-white/20 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/20 shadow-lg">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
              <span>Secure Message</span>
              {loadingState === "success" && (
                <div className="flex items-center gap-1 px-2 py-1 bg-white/20 rounded-full text-xs">
                  <CheckCircle2 className="w-3 h-3" />
                  <span className="xs:inline">Protected</span>
                </div>
              )}
            </h2>
            <p className="text-blue-100 text-xs sm:text-sm opacity-90 max-w-xs sm:max-w-none">
              {loadingState === "loading" && "Connecting..."}
              {loadingState === "success" && (
                <span className="hidden sm:inline">
                  Password protected message with view limitations
                </span>
              )}
              {loadingState === "success" && (
                <span className="sm:hidden">Protected message</span>
              )}
              {loadingState === "not_found" && "Message not found"}
              {loadingState === "network_error" && "Connection issues"}
              {loadingState === "error" && "Server error"}
            </p>
          </div>
        </div>

        {burnTime !== null && burnTime > 0 && !isBurned && (
          <div
            className={`flex items-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-sm px-3 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl border border-white/20 shadow-lg transition-all duration-300 ${
              burnTime <= 30 ? "animate-pulse" : ""
            }`}
          >
            <Clock
              className={`w-4 h-4 sm:w-5 sm:h-5 ${getTimeColor(burnTime)}`}
            />
            <div className="text-center sm:text-left">
              <div
                className={`text-sm sm:text-lg font-bold ${getTimeColor(
                  burnTime
                )}`}
              >
                {formatTime(burnTime)}
              </div>
              <div className="text-xs text-white/70 hidden sm:block">
                {burnTime > 60
                  ? "Safe"
                  : burnTime > 30
                  ? "Warning"
                  : "Critical"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
