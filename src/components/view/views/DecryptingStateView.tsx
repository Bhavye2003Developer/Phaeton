import { LoadingState } from "@/lib/types";
import { Shield } from "lucide-react";

export default function DecryptingStateView({
  loadingState,
  isDecrypting,
}: {
  loadingState: LoadingState;
  isDecrypting: boolean;
}) {
  return (
    <>
      {loadingState === "success" && isDecrypting && (
        <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 flex-1">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-blue-200 border-t-blue-600 shadow-lg"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur animate-pulse"></div>
          </div>
          <div className="text-center px-4">
            <p className="text-slate-700 dark:text-slate-200 text-base sm:text-lg font-medium animate-pulse">
              Decrypting your message...
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
              <span className="hidden sm:inline">
                Please wait while we retrieve your content
              </span>
              <span className="sm:hidden">Please wait...</span>
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full">
            <Shield className="w-4 h-4 text-blue-600" />
            <span className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
              <span className="hidden sm:inline">Processing securely</span>
              <span className="sm:hidden">Secure</span>
            </span>
          </div>
        </div>
      )}
    </>
  );
}
