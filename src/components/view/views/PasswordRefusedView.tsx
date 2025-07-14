import { LoadingState } from "@/lib/types";
import { AlertTriangle, Lock } from "lucide-react";

export default function PasswordRefusedView({
  loadingState,
  passwordRefused,
}: {
  loadingState: LoadingState;
  passwordRefused: boolean;
}) {
  return (
    <>
      {loadingState === "success" && passwordRefused && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/20 dark:to-red-800/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              <span className="hidden sm:inline">Authentication Required</span>
              <span className="sm:hidden">Auth Required</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-4">
              <span className="hidden sm:inline">
                This message is password protected and requires authentication
                to view its contents.
              </span>
              <span className="sm:hidden">
                Password protected message requires authentication.
              </span>
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-xl border border-red-200 dark:border-red-800">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-medium">
                Access Denied
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
