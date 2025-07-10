import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useMessageStore from "@/lib/useMessageStore";
import { useMemo } from "react";

export default function BurnTimerSection() {
  const {
    config: { burnTime },
    updateBurnTime,
  } = useMessageStore();

  const burnLimits = useMemo(() => [10, 30, 60, 120, 300, "NA"], []);
  const selectedTime = burnTime === 10e5 ? "NA" : String(burnTime);

  return (
    <div className="flex flex-col gap-1 text-sm text-muted-foreground">
      <div className="flex items-center justify-between">
        <span className="font-medium text-muted-foreground">Burn Time</span>
        <Select
          value={selectedTime}
          onValueChange={(val) => {
            const numeric = val === "NA" ? 10e5 : Number(val);
            updateBurnTime(numeric);
          }}
        >
          <SelectTrigger className="w-28 rounded-md border border-input shadow-sm focus:ring-1 focus:ring-ring">
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
      <p className="text-xs text-muted-foreground text-right">
        Message will self-destruct after this many seconds once viewed.
      </p>
    </div>
  );
}
