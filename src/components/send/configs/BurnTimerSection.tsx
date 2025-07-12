import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useMessageStore from "@/lib/useMessageStore";
import { Clock, Timer } from "lucide-react";
import { useMemo } from "react";

export default function BurnTimerSection() {
  const {
    config: { burnTime },
    updateBurnTime,
  } = useMessageStore();

  const burnLimits = useMemo(() => [10, 30, 60, 120, 300, "NA"], []);
  const selectedTime = burnTime === 10e5 ? "NA" : String(burnTime);

  return (
    <div className="space-y-3 p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-orange-100 dark:bg-orange-900/40 rounded-lg">
            <Timer className="w-4 h-4 text-orange-600 dark:text-orange-400" />
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Burn Time
          </span>
        </div>
        <Select
          value={selectedTime}
          onValueChange={(val) => {
            const numeric = val === "NA" ? 10e5 : Number(val);
            updateBurnTime(numeric);
          }}
        >
          <SelectTrigger className="w-32 rounded-lg border border-orange-200 dark:border-orange-700 shadow-sm focus:ring-2 focus:ring-orange-500 bg-white dark:bg-slate-800">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {burnLimits.map((v) => (
              <SelectItem key={v} value={String(v)}>
                {v === "NA" ? "No Limit" : `${v}s`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2 text-xs text-orange-600 dark:text-orange-400">
        <Clock className="w-3 h-3" />
        <span>
          {burnTime === 10e5
            ? ""
            : `Message will self-destruct after ${burnTime} seconds`}
          {/* {formatTime(burnTime === 10e5 ? "NA" : burnTime)} once viewed. */}
        </span>
      </div>
    </div>
  );
}
