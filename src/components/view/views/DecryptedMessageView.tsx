import { LoadingState } from "@/lib/types";
import clsx from "clsx";
import { CheckCircle2, FileText } from "lucide-react";

export default function DecryptedMessageView({
  loadingState,
  isDecrypting,
  decryptedText,
  isBurned,
}: {
  loadingState: LoadingState;
  isDecrypting: boolean;
  decryptedText: string;
  isBurned: boolean;
}) {
  return (
    <>
      {loadingState === "success" && !isDecrypting && decryptedText && (
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-slate-400" />
            <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
              Message Content
            </span>
            <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/20 rounded-full text-xs text-green-700 dark:text-green-300">
              <CheckCircle2 className="w-3 h-3" />
              <span className="hidden xs:inline">Loaded</span>
              <span className="xs:hidden">Loaded</span>
            </div>
          </div>

          <div
            className={clsx(
              "flex-1 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-2 border-slate-200 dark:border-slate-700 shadow-xl transition-all duration-700 overflow-auto relative group",
              {
                "opacity-0 scale-95 blur-sm": isBurned,
                "opacity-100 scale-100 blur-0": !isBurned,
              }
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="text-slate-800 dark:text-slate-100 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-wrap break-words text-left relative z-10 font-medium">
              {decryptedText}
            </div>

            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-1 h-1 sm:w-2 sm:h-2 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-50"></div>
            <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-50"></div>
          </div>
        </div>
      )}
    </>
  );
}
