import { MessageData } from "@/lib/types";
import { Flame } from "lucide-react";

export default function BurnedMessage({
  showBurnedMessage,
  messageData,
}: {
  showBurnedMessage: boolean;
  messageData: MessageData | null;
}) {
  return (
    <>
      {showBurnedMessage && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-100 to-red-200 dark:from-orange-900/20 dark:to-red-800/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Flame className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              <span className="hidden sm:inline">
                Message No Longer Available
              </span>
              <span className="sm:hidden">Message Unavailable</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-4">
              {messageData?.config.openLimit &&
              messageData.config.openLimit > 0 ? (
                <>
                  <span className="hidden sm:inline">
                    This message has reached its maximum number of views and is
                    no longer accessible.
                  </span>
                  <span className="sm:hidden">Message view limit reached.</span>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">
                    This message has burned after the timer expired and is no
                    longer accessible.
                  </span>
                  <span className="sm:hidden">Message timer expired.</span>
                </>
              )}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 rounded-xl border border-orange-200 dark:border-orange-800">
              <Flame className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-medium">
                {messageData?.config.openLimit &&
                messageData.config.openLimit > 0 ? (
                  <>
                    <span className="hidden sm:inline">View Limit Reached</span>
                    <span className="sm:hidden">Limit Reached</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Burn Timer Expired</span>
                    <span className="sm:hidden">Timer Expired</span>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
