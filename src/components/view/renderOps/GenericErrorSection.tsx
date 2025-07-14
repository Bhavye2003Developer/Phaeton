import { AlertTriangle } from "lucide-react";

export default function GenericErrorSection() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center p-8 max-w-md">
        <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/20 dark:to-orange-800/20 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <AlertTriangle className="w-10 h-10 text-orange-500 dark:text-orange-400" />
        </div>

        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">
          Something Went Wrong
        </h3>

        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
          We encountered an unexpected error while trying to load your message.
          Please try again in a moment.
        </p>
      </div>
    </div>
  );
}
