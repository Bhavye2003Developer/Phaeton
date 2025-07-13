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
    <div className="space-y-3 p-4 rounded-xl border border-[#404040] bg-black/[0.96] transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-neutral-300">
          <Timer className="w-4 h-4" />
          <span className="text-sm font-medium">Burn Timer</span>
        </div>
        <Select
          value={selectedTime}
          onValueChange={(val) => {
            const numeric = val === "NA" ? 10e5 : Number(val);
            updateBurnTime(numeric);
          }}
        >
          <SelectTrigger className="w-28 bg-black/[0.96] border border-[#404040] text-white rounded-lg">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent className="bg-black/[0.96]">
            {burnLimits.map((v) => (
              <SelectItem key={v} value={String(v)}>
                {v === "NA" ? "No Limit" : `${v}s`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {burnTime !== 10e5 && (
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <Clock className="w-3 h-3" />
          <span>Message self-destructs after {burnTime} seconds</span>
        </div>
      )}
    </div>
  );
}
