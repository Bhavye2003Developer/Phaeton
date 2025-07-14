import { WifiOff } from "lucide-react";

export default function NetworkErrorSection() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center p-8 max-w-md">
        <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/20 dark:to-red-800/20 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <WifiOff className="w-10 h-10 text-red-500 dark:text-red-400" />
        </div>

        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">
          Connection Error
        </h3>

        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
          We&apos;re having trouble connecting to our servers. Please check your
          internet connection and try again.
        </p>
      </div>
    </div>
  );
}
