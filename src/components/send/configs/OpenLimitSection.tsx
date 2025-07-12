import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useMessageStore from "@/lib/useMessageStore";
import { CheckCircle2, Users } from "lucide-react";
import { useMemo } from "react";

export default function OpenLimitSection() {
  const {
    config: { openLimit },
    updateOpenLimit,
  } = useMessageStore();

  const limits = useMemo(() => [1, 2, 3, 5, 10, "NA"], []);
  const selectedLimit = openLimit === 10e5 ? "NA" : String(openLimit);

  return (
    <div className="space-y-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
            <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Open Limit
          </span>
        </div>
        <Select
          value={selectedLimit}
          onValueChange={(val) => {
            const numeric = val === "NA" ? 10e5 : Number(val);
            updateOpenLimit(numeric);
          }}
        >
          <SelectTrigger className="w-32 rounded-lg border border-blue-200 dark:border-blue-700 shadow-sm focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {limits.map((v) => (
              <SelectItem key={v} value={String(v)}>
                {v === "NA" ? "No Limit" : v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400">
        <CheckCircle2 className="w-3 h-3" />
        <span>
          Number of times this message can be opened. Select "No Limit" to allow
          unlimited views.
        </span>
      </div>
    </div>
  );
}
