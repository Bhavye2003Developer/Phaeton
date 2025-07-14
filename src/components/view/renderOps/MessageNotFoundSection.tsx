import { AlertTriangle, Search } from "lucide-react";

export default function MessageNotFoundSection({
  messageId,
}: {
  messageId: string;
}) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center p-8 max-w-md">
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Search className="w-10 h-10 text-slate-400 dark:text-slate-500" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">
          Message Not Found
        </h3>

        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
          The message you&apos;re looking for doesn&apos;t exist or may have
          already expired. This could happen if the message was burned or the
          link is incorrect.
        </p>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-700">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">
              Message ID: {messageId.slice(0, 8)}...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
